import { create } from "zustand";

import { posts as initialPosts } from "@/lib/mock-data";

const STORAGE_KEY = "boom-posts";

function loadPosts() {
  if (typeof window === "undefined") return initialPosts;

  const saved = localStorage.getItem(STORAGE_KEY);

  return saved ? JSON.parse(saved) : initialPosts;
}

function savePosts(posts: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export const usePostStore = create((set, get) => ({
  posts: loadPosts(),

  addPost: (post: any) => {
    const updated = [post, ...get().posts];

    set({ posts: updated });

    savePosts(updated);
  },
}));