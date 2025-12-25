"use client";

import { CircleUser, ChevronDown, UserPlus, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccountDropdown = () => {
  const router = useRouter();

  return (
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
      <DropdownMenuContent align="end" className="w-[120px]">
        <DropdownMenuItem
          onClick={() => router.push("/signup")}
          className="cursor-pointer"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Sign Up
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/login")}
          className="cursor-pointer"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
