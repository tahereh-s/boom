// src/lib/bookmarks.ts

const KEY = "bookmarked-posts";
const EVENT = "bookmarks-changed";

export function getBookmarks(): number[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function toggleBookmark(id: number) {
  const current = getBookmarks();

  const updated = current.includes(id)
    ? current.filter((i) => i !== id)
    : [...current, id];

  localStorage.setItem(KEY, JSON.stringify(updated));

  // 🔥 notify all listeners
  window.dispatchEvent(new Event(EVENT));

  return updated;
}

export function subscribeBookmarks(callback: () => void) {
  const handler = () => callback();

  window.addEventListener(EVENT, handler);

  return () => {
    window.removeEventListener(EVENT, handler);
  };
}