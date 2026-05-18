"use client";

import { useEffect, useState } from "react";
import { posts as initialPosts } from "@/lib/mock-data";

export function useFeed() {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      setPosts((prev) => [
        ...prev,
        ...initialPosts.map((p) => ({
          ...p,
          id: Math.random(),
        })),
      ]);

      setLoading(false);
    }, 800);
  };

  return { posts, loadMore, loading };
}