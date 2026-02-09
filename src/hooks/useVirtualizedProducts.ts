"use client";

import { useEffect, useMemo, useState } from "react";

interface Options<T> {
  items: T[];
  rowHeight: number;
  overscanRows?: number;
}

interface Result<T> {
  visibleItems: T[];
  topSpacerHeight: number;
  bottomSpacerHeight: number;
  itemsPerRow: number;
  renderedItemCount: number;
}

const getItemsPerRow = () => {
  if (typeof window === "undefined") return 2;
  const w = window.innerWidth;
  if (w >= 1450) return 5;
  if (w >= 1280) return 4;
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
};

export function useVirtualizedProducts<T>({
  items,
  rowHeight,
  overscanRows = 2,
}: Options<T>): Result<T> {
  const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow);
  const [scrollTop, setScrollTop] = useState(0);

  const totalRows = Math.ceil(items.length / itemsPerRow);

  useEffect(() => {
    const onResize = () => setItemsPerRow(getItemsPerRow());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () =>
      setScrollTop(
        document.documentElement.scrollTop || document.body.scrollTop
      );
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const viewportHeight =
    typeof window === "undefined" ? 800 : window.innerHeight;

  const startRow = Math.max(
    0,
    Math.floor(scrollTop / rowHeight) - overscanRows
  );

  const endRow = Math.min(
    totalRows,
    Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscanRows
  );

  const startIndex = startRow * itemsPerRow;
  const endIndex = endRow * itemsPerRow;

  const visibleItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  );

  const renderedItemCount = Math.min(endIndex, items.length);

  return {
    visibleItems,
    topSpacerHeight: startRow * rowHeight,
    bottomSpacerHeight: (totalRows - endRow) * rowHeight,
    itemsPerRow,
    renderedItemCount,
  };
}
