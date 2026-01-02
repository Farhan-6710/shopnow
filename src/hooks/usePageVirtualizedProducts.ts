"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { timeout } from "@/utils/timeout";

// Constants
const ROWS_TO_LOAD = 3; // Number of rows to add when loading
const ROWS_TO_UNLOAD = 2; // Number of rows to remove when unloading
const LOAD_DELAY_AFTER = 100; // Delay after loading to prevent chain loading (ms)
const UNLOAD_DELAY_AFTER = 200; // Delay after unloading to prevent rapid unloading (ms)
const LOADING_BUFFER_OFFSET = 300; // Extra pixels to trigger loading early (ms)
const UNLOAD_THRESHOLD_MULTIPLIER = 1.5; // Rows distance needed to trigger unload

interface UsePageVirtualizedProductsOptions<T> {
  /** All products to virtualize */
  items: T[];
  /** Number of rows to render initially */
  initialRows?: number;
  /** Loading delay in milliseconds */
  loadingDelay?: number;
  /** Distance from bottom (in px) to trigger loading */
  threshold?: number;
  /** Measured row height from product card ref */
  rowHeight?: number;
}

interface UsePageVirtualizedProductsReturn<T> {
  /** Currently visible items */
  visibleItems: T[];
  /** Number of skeleton loaders to show */
  skeletonCount: number;
  /** Whether currently loading more items */
  isLoadingMore: boolean;
  /** Whether all items have been loaded */
  hasLoadedAll: boolean;
  /** Current items per row based on screen size */
  itemsPerRow: number;
  /** Starting row index (for windowing) */
  startRow: number;
}

// Calculate items per row based on Tailwind breakpoints matching the grid
const getItemsPerRow = (): number => {
  if (typeof window === "undefined") return 2;

  const width = window.innerWidth;

  // Match the grid classes: sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
  if (width >= 1450) return 5; // 2xl breakpoint
  if (width >= 1280) return 4; // xl breakpoint
  if (width >= 1024) return 3; // lg breakpoint
  if (width >= 640) return 2; // sm breakpoint
  return 1; // mobile (no prefix)
};

export function usePageVirtualizedProducts<T>({
  items,
  initialRows = 2,
  loadingDelay = 500,
  threshold = 300,
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

  // Update items per row on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerRow(getItemsPerRow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset when items change (e.g., filters applied)
  useEffect(() => {
    if (prevItemsLengthRef.current !== items.length) {
      prevItemsLengthRef.current = items.length;
      // Schedule reset after render
      const timeoutId = setTimeout(() => {
        setStartRow(0);
        setRenderedRows(initialRows);
        setIsLoadingMore(false);
        setSkeletonCount(0);
        isLoadingRef.current = false;
        isUnloadingRef.current = false;
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [items.length, initialRows]);

  // Calculate visible items (windowed from startRow)
  const startIndex = startRow * itemsPerRow;
  const endIndex = (startRow + renderedRows) * itemsPerRow;
  const visibleItems = items.slice(startIndex, endIndex);
  const hasLoadedAll = endIndex >= items.length;

  // Load more items (adds multiple rows at once)
  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || hasLoadedAll) return;

    isLoadingRef.current = true;
    setIsLoadingMore(true);

    // Calculate items needed for the next rows
    const remainingItems = items.length - endIndex;
    const itemsInNextRows = Math.min(
      itemsPerRow * ROWS_TO_LOAD,
      remainingItems
    );

    // Show skeletons
    setSkeletonCount(itemsInNextRows);

    // Wait for loading delay
    await timeout(loadingDelay);

    // Add rows and clear skeletons
    setRenderedRows((prev) => prev + ROWS_TO_LOAD);
    setSkeletonCount(0);
    setIsLoadingMore(false);

    // Prevent immediate chain loading
    await timeout(LOAD_DELAY_AFTER);
    isLoadingRef.current = false;
  }, [items.length, endIndex, itemsPerRow, loadingDelay, hasLoadedAll]);

  // Unload items when scrolling up (removes multiple rows instantly)
  const unloadMore = useCallback(async () => {
    if (isUnloadingRef.current || renderedRows <= initialRows) return;

    isUnloadingRef.current = true;

    // Remove rows instantly (no skeletons for unloading)
    setRenderedRows((prev) => Math.max(prev - ROWS_TO_UNLOAD, initialRows));

    // Prevent aggressive consecutive unloading
    await timeout(UNLOAD_DELAY_AFTER);
    isUnloadingRef.current = false;
  }, [renderedRows, initialRows]);

  // Handle scroll event - manages loading and unloading
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingRef.current || isUnloadingRef.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Downward scroll: Load more rows when near bottom
      const distanceFromBottom =
        scrollHeight - scrollTop - clientHeight + LOADING_BUFFER_OFFSET;
      if (!hasLoadedAll && distanceFromBottom <= threshold) {
        loadMore();
      }

      // Upward scroll: Unload rows when they're far out of view
      const viewportBottom = scrollTop + clientHeight;
      const lastRowBottom = renderedRows * rowHeight;
      const distanceToLastRow = lastRowBottom - viewportBottom;
      const unloadThreshold = rowHeight * UNLOAD_THRESHOLD_MULTIPLIER;

      if (renderedRows > initialRows && distanceToLastRow > unloadThreshold) {
        unloadMore();
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
