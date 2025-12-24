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

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  showCloseButton = true,
  className,
  srOnlyTitle = "Dialog",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={showCloseButton} className={className}>
        <DialogHeader>
          {title ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            <DialogTitle className="sr-only">{srOnlyTitle}</DialogTitle>
          )}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
