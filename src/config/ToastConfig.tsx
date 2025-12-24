import { toast } from "sonner";
import { LucideIcon } from "lucide-react";

interface ToastOptions {
  type?: "custom" | "success" | "error" | "info" | "warning";
  title: string;
  description: string;
  icon?: LucideIcon;
  duration?: number;
}

export const showToast = ({
  type = "custom",
  title,
  description,
  icon: Icon,
  duration = 3000,
}: ToastOptions) => {
  if (type === "custom" && Icon) {
    toast.custom(
      (t) => (
        <div className="flex items-center gap-3 bg-background border border-border rounded-lg p-4 shadow-lg min-w-[320px] max-w-[420px]">
          <div className="flex-shrink-0 mt-0.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-none">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ),
      { duration }
    );
  } else {
    // Fallback to default toast types
    const toastFn = toast[type] || toast;
    toastFn(`${title}: ${description}`, { duration });
  }
};