"use client";

import { useState } from "react";
import { Bell, Search, X } from "lucide-react";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">

          <h1 className="text-lg font-bold">
            Boom
          </h1>

          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <button
              onClick={() => setOpen(true)}
              className="text-muted-foreground"
            >
              <Search size={22} />
            </button>

            {/* NOTIFICATION */}
            <button className="relative text-muted-foreground">
              <Bell size={22} />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-[999999] bg-black/50">

          {/* MODAL */}
          <div className="mx-auto mt-20 w-[90%] max-w-xl rounded-3xl bg-background p-4">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="font-semibold">
                جستجو
              </h2>

              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>

            </div>

            <input
              autoFocus
              type="text"
              placeholder="جستجو..."
              className="w-full rounded-2xl border border-border bg-card p-3 outline-none"
            />

          </div>
        </div>
      )}
    </>
  );
}