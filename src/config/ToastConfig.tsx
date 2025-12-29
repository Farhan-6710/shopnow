import { toast } from "sonner";
import {
  LucideIcon,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";

interface ToastOptions {
  type?: "success" | "error" | "info" | "warning";
  title: string;
  description: string;
  duration?: number;
}

const getIconAndColor = (
  type: "success" | "error" | "info" | "warning"
): { Icon: LucideIcon; iconColor: string; bgColor: string } => {
  const config = {
    success: {
      Icon: CheckCircle2,
      iconColor: "text-green-500",
      bgColor: "bg-background",
    },
    error: {
      Icon: AlertCircle,
      iconColor: "text-red-500",
      bgColor: "bg-background",
    },
    info: {
      Icon: Info,
      iconColor: "text-blue-500",
      bgColor: "bg-background",
    },
    warning: {
      Icon: AlertTriangle,
      iconColor: "text-yellow-500",
      bgColor: "bg-background",
    },
  };

  return config[type];
};

export const showToast = ({
  type = "info",
  title,
  description,
  duration = 3000,
}: ToastOptions) => {
  const { Icon, iconColor, bgColor } = getIconAndColor(type);

  toast.custom(
    () => (
      <div
        className={`flex items-start gap-3 ${bgColor} border rounded-lg p-4 shadow-md min-w-[320px] max-w-[420px]`}
      >
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={`h-5 w-5 ${iconColor}`} />
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
};
