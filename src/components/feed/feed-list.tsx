"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import PostCard from "./post-card";
import { getPosts } from "@/lib/get-posts";
import { usePostStore } from "@/store/post-store";

export default function FeedList() {
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);
  const addPosts = usePostStore((state) => state.addPosts); // ← New bulk add

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Reset store on mount (important for development)
  useEffect(() => {
    setPosts([]); // Clear persisted posts on fresh load
  }, [setPosts]);

  const loadPosts = useCallback(async (isInitial = false) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const newPosts = await getPosts(page, 2);

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        if (isInitial) {
          setPosts(newPosts);
        } else {
          addPosts(newPosts);           // ← Use bulk add
        }
        setPage((prev) => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, setPosts, addPosts]);

  // Initial load
  useEffect(() => {
    loadPosts(true);
  }, []); // Empty dependency → runs only once

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadPosts(false);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadPosts, loading, hasMore]);

  return (
    <div className="space-y-4 py-4 pb-24">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={loaderRef} className="h-10 flex items-center justify-center">
        {loading && <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>}
        {!hasMore && posts.length > 0 && <p className="text-sm text-muted-foreground">پایان فید</p>}
      </div>
    </div>
  );
}