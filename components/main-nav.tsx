"use client";

import { cn } from "@/utils/functions";
import { NavigationMenuLink } from "./ui/navigation-menu";
import React from "react";
import Link from "next/link";
import { Bike } from "lucide-react";

export function MainNav() {
  return (
    <div className="flex gap-4 items-center">
      <Link href="/" title="Dashboard">
        <Bike />
      </Link>
      <Link href="/">
        <h2>Bike Parts Tracker</h2>
      </Link>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      dingens
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
