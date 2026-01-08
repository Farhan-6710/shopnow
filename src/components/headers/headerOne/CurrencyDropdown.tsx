"use client";

import {
  BadgeDollarSign,
  ChevronDown,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency, selectCurrency } from "@/redux/slices/cartSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const CurrencyDropdown = () => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-0.5 bg-card text-card-foreground border shadow-xs hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none rounded-md p-1.5 px-2"
          aria-label="Currency selector"
        >
          <BadgeDollarSign
            className="text-primary"
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="text-xs">{currency}</span>
          <ChevronDown size={11} className="opacity-50" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-25">
        <DropdownMenuItem
          onClick={() => dispatch(setCurrency("USD"))}
          className="cursor-pointer"
        >
          <DollarSign className="mr-2 h-4 w-4" />
          USD
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => dispatch(setCurrency("INR"))}
          className="cursor-pointer"
        >
          <IndianRupee className="mr-2 h-4 w-4" />
          INR
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyDropdown;
