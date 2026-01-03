"use client";

import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Modal from "./Modal";
import { LucideIcon } from "lucide-react";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconClassName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "default" | "destructive";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconClassName = "text-destructive",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "destructive",
}) => {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="sm:max-w-[425px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className={`flex-shrink-0 ${iconClassName}`}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              handleCancel();
            }}
            className="sm:flex-1"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={variant}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              handleConfirm();
            }}
            className="sm:flex-1"
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
