"use client";

import { usePostStore } from "@/store/post-store";
import { useStoryViewer } from "@/store/story-viewer-store";

export default function StoryRow() {
  const stories = usePostStore((s) => s.stories);

  const openStory = useStoryViewer((s) => s.openStory);

  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto py-4">

      {/* CREATE STORY */}
      <div className="flex shrink-0 flex-col items-center gap-2">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
          +
        </div>

        <span className="text-xs text-muted-foreground">
          استوری شما
        </span>

      </div>

      {/* STORIES */}
      {stories.map((story, index) => (
        <button
          key={story.id}
          onClick={() => openStory(index)}
          className="flex shrink-0 flex-col items-center gap-2"
        >

          <div className="rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600 p-[2px]">

            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-background">

              <img
                src={story.avatar}
                alt={story.user}
                className="h-full w-full object-cover"
              />

            </div>

          </div>

          <span className="w-16 truncate text-center text-xs">
            @{story.user}
          </span>

        </button>
      ))}
    </div>
  );
}