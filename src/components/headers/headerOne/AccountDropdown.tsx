"use client";

import { CircleUser, ChevronDown, UserPlus, LogIn } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/modals/Modal";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/providers/authContext";

const AccountDropdown = () => {
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // Show loading state
  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />;
  }

  // Show user avatar if logged in
  if (user) {
    return <UserAvatar />;
  }

  // Show login/signup dropdown if not logged in
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-0.5 bg-card text-card-foreground border shadow-xs hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none rounded-md p-1.5 px-2"
            aria-label="Account menu"
          >
            <CircleUser
              className="text-primary"
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-xs">Account</span>
            <ChevronDown size={11} className="opacity-50" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-30">
          <DropdownMenuItem
            onClick={() => setShowSignupModal(true)}
            className="cursor-pointer"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowLoginModal(true)}
            className="cursor-pointer"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal
        open={showLoginModal}
        className="max-w-sm! p-8"
        onOpenChange={setShowLoginModal}
        title="Login to Your Account"
        description="Enter your credentials to access your account"
      >
        <LoginForm
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
      </Modal>

      <Modal
        open={showSignupModal}
        className="max-w-sm! p-8"
        onOpenChange={setShowSignupModal}
        title="Create Your Account"
        description="Sign up to start shopping with us"
      >
        <SignUpForm
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
      </Modal>
    </>
  );
};

export default AccountDropdown;
