"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Search,
  SquarePlus,
  Heart,
  User,
} from "lucide-react";

const items = [
  {
    href: "/",
    icon: House,
  },
  {
    href: "/explore",
    icon: Search,
  },
  {
    href: "/create",
    icon: SquarePlus,
  },
  {
    href: "/activity",
    icon: Heart,
  },
  {
    href: "/profile",
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-xl items-center justify-around">

        {items.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-12 w-12 items-center justify-center rounded-xl transition
              ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={24} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}