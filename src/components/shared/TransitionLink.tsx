"use client";

import React from "react";
import Link from "next/link";
import { useNavigation } from "@/providers/NavigationProvider";

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  children: React.ReactNode;
}

export const TransitionLink = ({
  href,
  children,
  ...props
}: TransitionLinkProps) => {
  const { transitionTo } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    transitionTo(href.toString());
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};
