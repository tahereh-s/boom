import {
  House,
  Search,
  SquarePlus,
  Heart,
  User,
} from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      
      <div className="mx-auto flex h-16 max-w-xl items-center justify-around px-2">

        <button className="flex h-12 w-12 items-center justify-center rounded-xl text-primary transition hover:bg-muted">
          <House size={24} strokeWidth={2.2} />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <Search size={24} />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition hover:scale-105">
          <SquarePlus size={24} />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <Heart size={24} />
        </button>

        <button className="flex h-12 w-12 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <User size={24} />
        </button>

      </div>
    </nav>
  );
}