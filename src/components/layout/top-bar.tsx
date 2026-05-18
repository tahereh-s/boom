import { Bell, Search } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">

      <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-3">

        <h1 className="text-lg font-bold tracking-tight">
          Boom
        </h1>

        <div className="flex items-center gap-3">

          <button className="text-muted-foreground hover:text-foreground transition">
            <Search size={22} />
          </button>

          <button className="text-muted-foreground hover:text-foreground transition">
            <Bell size={22} />
          </button>

        </div>
      </div>
    </header>
  );
}