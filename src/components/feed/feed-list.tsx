"use client";

import PostCard from "./post-card";

import LoadMore from "./load-more";
import { useFeed } from "@/hooks/useFeed";

export default function FeedList() {
  const { posts, loadMore, loading } = useFeed();

  return (
    <div className="space-y-4 py-4 pb-24">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <LoadMore onVisible={loadMore} />

      {loading && (
        <p className="text-center text-sm text-muted-foreground">
          در حال بارگذاری...
        </p>
      )}
    </div>
  );
}