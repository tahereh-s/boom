import { posts } from "@/lib/mock-data";
import PostCard from "./post-card";
import StoryRow from "./story-row";

export default function FeedList() {
  return (
    <div className="space-y-4 pb-24">

      <StoryRow />

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

    </div>
  );
}