"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { timeout } from "@/utils/timeout";

// Constants
const ROWS_TO_UNLOAD = 2; // Number of rows to remove when unloading
const LOAD_DELAY_AFTER = 50; // Delay after loading to prevent chain loading (ms) - reduced for fast scrolling
const UNLOAD_DELAY_AFTER = 50; // Delay after unloading to prevent rapid unloading (ms) - reduced for fast scrolling
const LOADING_BUFFER_OFFSET = 300; // Extra pixels to trigger loading early (ms)
const UNLOAD_THRESHOLD_MULTIPLIER = 1.5; // Rows distance needed to trigger unload
const SCROLL_THROTTLE = 16; // Throttle scroll events (ms) - ~60fps

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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(0);

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

  // Load more items (adds rows based on initial viewport capacity)
  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || hasLoadedAll) return;

    isLoadingRef.current = true;
    setIsLoadingMore(true);

    // Load same number of rows as initially visible (viewport-based)
    const rowsToLoad = initialRows;
    const remainingItems = items.length - endIndex;
    const itemsInNextRows = Math.min(itemsPerRow * rowsToLoad, remainingItems);

    // Show skeletons
    setSkeletonCount(itemsInNextRows);

    // Wait for loading delay
    await timeout(loadingDelay);

    // Add rows and clear skeletons
    setRenderedRows((prev) => prev + rowsToLoad);
    setSkeletonCount(0);
    setIsLoadingMore(false);

    // Prevent immediate chain loading
    await timeout(LOAD_DELAY_AFTER);
    isLoadingRef.current = false;
  }, [
    items.length,
    endIndex,
    itemsPerRow,
    loadingDelay,
    hasLoadedAll,
    initialRows,
  ]);

  // Unload items when scrolling up (calculates and removes all out-of-view rows)
  const unloadMore = useCallback(
    async (rowsToUnload: number) => {
      if (isUnloadingRef.current || renderedRows <= initialRows) return;

      isUnloadingRef.current = true;

      // Remove the calculated number of rows instantly (no skeletons for unloading)
      setRenderedRows((prev) => Math.max(prev - rowsToUnload, initialRows));

      // Prevent aggressive consecutive unloading
      await timeout(UNLOAD_DELAY_AFTER);
      isUnloadingRef.current = false;
    },
    [renderedRows, initialRows]
  );

  // Handle scroll event - manages loading and unloading
  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll events for performance
      const now = Date.now();
      if (now - lastScrollTimeRef.current < SCROLL_THROTTLE) {
        return;
      }
      lastScrollTimeRef.current = now;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Downward scroll: Load more rows when near bottom
      const distanceFromBottom =
        scrollHeight - scrollTop - clientHeight + LOADING_BUFFER_OFFSET;
      if (!hasLoadedAll && distanceFromBottom <= threshold && !isLoadingRef.current) {
        loadMore();
      }

      // Upward scroll: Calculate how many rows are far out of view and unload them all
      const viewportBottom = scrollTop + clientHeight;
      const lastRowBottom = renderedRows * rowHeight;
      const distanceToLastRow = lastRowBottom - viewportBottom;
      const unloadThreshold = rowHeight * UNLOAD_THRESHOLD_MULTIPLIER;

      if (renderedRows > initialRows && distanceToLastRow > unloadThreshold && !isUnloadingRef.current) {
        // Calculate how many rows are beyond the threshold (handles fast scrolling)
        const rowsBeyondThreshold = Math.floor(
          (distanceToLastRow - unloadThreshold) / rowHeight
        );
        const rowsToUnload = Math.min(
          rowsBeyondThreshold + ROWS_TO_UNLOAD,
          renderedRows - initialRows
        );

        if (rowsToUnload > 0) {
          unloadMore(rowsToUnload);
        }
      }
    };

    // Add scroll end detection to handle final position after fast scrolling
    const handleScrollEnd = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        // Re-check position after scroll momentum stops
        handleScroll();
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScrollEnd, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
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
