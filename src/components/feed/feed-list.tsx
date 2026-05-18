"use client";

import { useEffect, useRef, useState } from "react";
import PostCard from "./post-card";
import { getPosts } from "@/lib/get-posts";
import { usePostStore } from "@/store/post-store";

export default function FeedList() {
  const posts = usePostStore((state) => state.posts);
  const addPost = usePostStore((state) => state.addPost);
const setPosts = usePostStore((state) => state.setPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const newPosts = await getPosts(page, 2);

    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      newPosts.forEach((p: any) => addPost(p));
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

useEffect(() => {
  const init = async () => {
    const firstPosts = await getPosts(1, 2);
    setPosts(firstPosts);
    setPage(2);
  };
  init();
}, []);
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