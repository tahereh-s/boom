"use client";

import { useEffect, useState } from "react";
import { posts } from "@/lib/mock-data";
import { getBookmarks, subscribeBookmarks } from "@/lib/bookmarks";
import PostCard from "@/components/feed/post-card";

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const update = () => {
    setSavedIds(getBookmarks());
  };

  useEffect(() => {
    update(); // initial load

    const unsubscribe = subscribeBookmarks(update);

    return unsubscribe;
  }, []);

  const savedPosts = posts.filter((p) =>
    savedIds.includes(p.id)
  );

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-bold">Saved Posts</h1>

      {savedPosts.length === 0 && (
        <p className="text-muted-foreground">
          هیچ پستی ذخیره نشده
        </p>
      )}

      {savedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}