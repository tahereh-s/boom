"use client";

import { useEffect, useRef, useState } from "react";
import PostCard from "./post-card";
import { getPosts } from "@/lib/get-posts";

export default function FeedList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // load posts
  const loadPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const newPosts: any = await getPosts(page, 2);

    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  // first load
  useEffect(() => {
    loadPosts();
  }, []);

  // intersection observer (infinite scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadPosts();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loaderRef.current, page, loading]);

  return (
    <div className="space-y-4 py-4 pb-24">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* LOADER TRIGGER */}
      <div ref={loaderRef} className="h-10 flex items-center justify-center">
        {loading && (
          <p className="text-sm text-muted-foreground">
            در حال بارگذاری...
          </p>
        )}
      </div>
    </div>
  );
}