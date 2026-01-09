"use client";

import { useAuth } from "@/providers/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  CreditCard,
  Settings,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { showToast } from "@/config/ToastConfig";
import { Button } from "@/components/ui/button";

const UserAvatar = () => {
  const { user, signOut } = useAuth();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOutConfirm = async () => {
    try {
      await signOut();
      showToast({
        type: "success",
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
    } catch {
      showToast({
        type: "error",
        title: "Sign Out Failed",
        description: "An error occurred while signing out. Please try again.",
      });
    }
  };

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserName = () => {
    return (
      user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex items-center gap-2 bg-card hover:bg-accent rounded-full transition-all duration-200 pl-1.5!"
            aria-label="User account menu"
          >
            <Avatar className="h-7 w-7">
              <AvatarImage
                src={user?.user_metadata?.avatar_url}
                alt={getUserName()}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                {getInitials(getUserName())}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground max-w-20 truncate">
              {getUserName()}
            </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 p-0">
          {/* User Info Header */}
          <div className="px-3 py-3 bg-muted/50">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url}
                  alt={getUserName()}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  {getInitials(getUserName())}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {getUserName()}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Main Menu Items */}
          <div className="py-1">
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <CreditCard className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Settings</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Support Items */}
          <div className="py-1">
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <HelpCircle className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Help Center</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer px-3 py-2.5 focus:bg-accent">
              <FileText className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Documentation</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />

          {/* Sign Out */}
          <div className="py-1">
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer px-3 py-2.5 text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="text-sm">Sign Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationModal
        open={showSignOutModal}
        onOpenChange={setShowSignOutModal}
        title="Sign Out"
        description="Are you sure you want to sign out?"
        icon={LogOut}
        iconClassName="text-destructive"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={handleSignOutConfirm}
        onCancel={() => setShowSignOutModal(false)}
        variant="destructive"
      />
    </>
  );
};

export default UserAvatar;
