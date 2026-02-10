"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
  srOnlyTitle?: string; // For accessibility when no visible title
}

const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  showCloseButton = true,
  className,
}: ModalProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    // Prevent any event propagation when modal state changes
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={showCloseButton} className={className}>
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
