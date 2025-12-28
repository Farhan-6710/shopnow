"use client";

import React from "react";
import {
  Sheet as SheetRoot,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
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
  /** Show the close button */
  showClose?: boolean;
}

const Sheet: React.FC<SheetProps> = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  side = "right",
  className,
  headerClassName,
  showClose = true,
}) => {
  return (
    <SheetRoot open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} className={className}>
        <SheetTitle className="sr-only">{title}</SheetTitle>
        {(title || description) && (
          <SheetHeader className={headerClassName}>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
      </SheetContent>
    </SheetRoot>
  );
};

export default Sheet;
