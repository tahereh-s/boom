import FeedList from "@/components/feed/feed-list";
import StoryRow from "@/components/feed/story-row";
import StoryViewer from "@/components/feed/story-viewer";

export default function Page() {

  return     <div>
      <StoryRow />

      <FeedList />

      <StoryViewer />
    </div>;
}