import { posts } from "@/lib/mock-data";
import PostCard from "./post-card";

export default function FeedList() {
  return (
    <div className="space-y-4 py-4 pb-20">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}