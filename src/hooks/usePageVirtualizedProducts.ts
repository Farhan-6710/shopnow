"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { timeout } from "@/utils/timeout";

// Tuned constants (safe defaults)
const ROWS_TO_UNLOAD = 2;
const LOAD_DELAY_AFTER = 60;
const UNLOAD_DELAY_AFTER = 60;
const SCROLL_THROTTLE = 16; // ~60fps

interface UsePageVirtualizedProductsOptions<T> {
  items: T[];
  initialRows?: number;
  loadingDelay?: number;
  threshold?: number; // px from bottom
  rowHeight?: number;
}

interface UsePageVirtualizedProductsReturn<T> {
  visibleItems: T[];
  skeletonCount: number;
  isLoadingMore: boolean;
  hasLoadedAll: boolean;
  itemsPerRow: number;
  startRow: number;
}

/* -------------------------------------------------- */
/* Helpers                                            */
/* -------------------------------------------------- */

const getItemsPerRow = (): number => {
  if (typeof window === "undefined") return 2;

  const width = window.innerWidth;
  if (width >= 1450) return 5; // 2xl
  if (width >= 1280) return 4; // xl
  if (width >= 1024) return 3; // lg
  if (width >= 640) return 2;  // sm
  return 1;
};

/* -------------------------------------------------- */
/* Hook                                               */
/* -------------------------------------------------- */

export function usePageVirtualizedProducts<T>({
  items,
  initialRows = 3,
  loadingDelay = 500,
  threshold = typeof window === "undefined" ? 400 : window.innerHeight * 0.75,
  rowHeight = 450,
}: UsePageVirtualizedProductsOptions<T>): UsePageVirtualizedProductsReturn<T> {
  const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow);
  const [startRow, setStartRow] = useState(0);
  const [renderedRows, setRenderedRows] = useState(initialRows);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [skeletonCount, setSkeletonCount] = useState(0);

  const isLoadingRef = useRef(false);
  const isUnloadingRef = useRef(false);
  const prevItemsLengthRef = useRef(items.length);
  const lastScrollTimeRef = useRef(0);

  /* ---------------- Resize ---------------- */

  useEffect(() => {
    const handleResize = () => setItemsPerRow(getItemsPerRow());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- Reset on data change ---------------- */

  useEffect(() => {
    if (prevItemsLengthRef.current !== items.length) {
      prevItemsLengthRef.current = items.length;

      setStartRow(0);
      setRenderedRows(initialRows);
      setSkeletonCount(0);
      setIsLoadingMore(false);
      isLoadingRef.current = false;
      isUnloadingRef.current = false;
    }
  }, [items.length, initialRows]);

  /* ---------------- Visible window ---------------- */

  const startIndex = startRow * itemsPerRow;
  const endIndex = (startRow + renderedRows) * itemsPerRow;
  const visibleItems = items.slice(startIndex, endIndex);
  const hasLoadedAll = endIndex >= items.length;

  /* ---------------- Load more ---------------- */

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || hasLoadedAll) return;

    isLoadingRef.current = true;
    setIsLoadingMore(true);

    const rowsToLoad = initialRows;
    const remainingItems = items.length - endIndex;
    const nextItemCount = Math.min(
      rowsToLoad * itemsPerRow,
      remainingItems
    );

    setSkeletonCount(nextItemCount);

    await timeout(loadingDelay);

    setRenderedRows((prev) => prev + rowsToLoad);
    setSkeletonCount(0);
    setIsLoadingMore(false);

    await timeout(LOAD_DELAY_AFTER);
    isLoadingRef.current = false;
  }, [
    items.length,
    endIndex,
    itemsPerRow,
    hasLoadedAll,
    initialRows,
    loadingDelay,
  ]);

  /* ---------------- Unload rows ---------------- */

  const unloadMore = useCallback(
    async (rows: number) => {
      if (isUnloadingRef.current || renderedRows <= initialRows) return;

      isUnloadingRef.current = true;

      setRenderedRows((prev) =>
        Math.max(prev - rows, initialRows)
      );

      await timeout(UNLOAD_DELAY_AFTER);
      isUnloadingRef.current = false;
    },
    [renderedRows, initialRows]
  );

  /* ---------------- Scroll handling ---------------- */

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTimeRef.current < SCROLL_THROTTLE) return;
      lastScrollTimeRef.current = now;

      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const viewportBottom = scrollTop + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // LOAD
      if (
        !hasLoadedAll &&
        docHeight - viewportBottom <= threshold &&
        !isLoadingRef.current
      ) {
        loadMore();
      }

      // UNLOAD (only when far above viewport)
      const renderedBottom = renderedRows * rowHeight;
      if (
        renderedRows > initialRows &&
        viewportBottom + rowHeight * 2 < renderedBottom &&
        !isUnloadingRef.current
      ) {
        unloadMore(ROWS_TO_UNLOAD);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    threshold,
    hasLoadedAll,
    renderedRows,
    initialRows,
    rowHeight,
    loadMore,
    unloadMore,
  ]);

  return {
    visibleItems,
    skeletonCount,
    isLoadingMore,
    hasLoadedAll,
    itemsPerRow,
    startRow,
  };
}
