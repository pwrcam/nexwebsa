"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export function NavLink({ href, children, className, activeClassName }: NavLinkProps) {
  return (
    <Link href={href} className={cn(className)}>
      {children}
    </Link>
  );
}
