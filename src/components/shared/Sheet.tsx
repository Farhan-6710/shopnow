"use client";

import React from "react";
import {
  Sheet as SheetRoot,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetProps {
  /** Control the open state of the sheet */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** The trigger element that opens the sheet */
  trigger?: React.ReactNode;
  /** The title of the sheet */
  title?: string;
  /** The description of the sheet */
  description?: string;
  /** The content to be displayed inside the sheet */
  children: React.ReactNode;
  /** The side from which the sheet slides in */
  side?: "top" | "right" | "bottom" | "left";
  /** Additional className for the sheet content */
  className?: string;
  /** Additional className for the sheet header */
  headerClassName?: string;
}

const Sheet = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  side = "right",
  className,
  headerClassName,
}: SheetProps) => {
  return (
    <SheetRoot open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} className={className}>
        <SheetHeader className={`${headerClassName} sr-only`}>
          <SheetTitle>{title || "Navigation Menu"}</SheetTitle>
          <SheetDescription>
            {description || "Access navigation links and tools."}
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </SheetRoot>
  );
};

export default Sheet;
