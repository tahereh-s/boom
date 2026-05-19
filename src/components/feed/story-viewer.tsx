"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { usePostStore } from "@/store/post-store";
import { useStoryViewer } from "@/store/story-viewer-store";

export default function StoryViewer() {
  const stories = usePostStore((s) => s.stories);

  const {
    activeIndex,
    closeStory,
    nextStory,
    prevStory,
  } = useStoryViewer();

  if (activeIndex === null) return null;

  const story = stories[activeIndex];

  return (
    <div className="fixed inset-0 z-[99999] bg-black">

      {/* IMAGE */}
      <img
        src={story.image}
        alt={story.user}
        className="h-full w-full object-cover"
      />

      {/* TOP */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">

        <div className="text-white font-medium">
          @{story.user}
        </div>

        <button onClick={closeStory}>
          <X className="text-white" />
        </button>

      </div>

      {/* PREV */}
      <button
        onClick={prevStory}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <ChevronLeft className="text-white" size={40} />
      </button>

      {/* NEXT */}
      <button
        onClick={() => nextStory(stories.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <ChevronRight className="text-white" size={40} />
      </button>

    </div>
  );
}