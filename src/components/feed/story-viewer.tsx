"use client";

import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

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

  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // AUTO PROGRESS
  useEffect(() => {
    if (activeIndex === null || paused) return;

    setProgress(0);

    const duration = 5000;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          if (activeIndex >= stories.length - 1) {
            closeStory();
          } else {
            nextStory(stories.length);
          }

          return 100;
        }

        return prev + 2;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [activeIndex, paused]);

  if (activeIndex === null) return null;

  const story = stories[activeIndex];


  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    const isLeftSwipe = distance > minSwipeDistance;

    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextStory(stories.length);
    }

    if (isRightSwipe) {
      prevStory();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black"

      onMouseDown={() => setPaused(true)}
      onMouseUp={() => setPaused(false)}

      onTouchStart={(e) => {
        setPaused(true);

        setTouchEnd(null);

        setTouchStart(e.targetTouches[0].clientX);
      }}

      onTouchMove={(e) => {
        setTouchEnd(e.targetTouches[0].clientX);
      }}

      onTouchEnd={() => {
        setPaused(false);

        handleSwipe();
      }}
    >

      {/* IMAGE */}
      <img
        src={story.image}
        alt={story.user}
        className="h-full w-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* TOP */}
      <div className="absolute left-0 right-0 top-0 z-20 p-4">

        {/* PROGRESS BARS */}
        <div className="mb-4 flex gap-1">

          {stories.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"
            >

              <div
                className="h-full rounded-full bg-white transition-all"
                style={{
                  width:
                    i < activeIndex
                      ? "100%"
                      : i === activeIndex
                        ? `${progress}%`
                        : "0%",
                }}
              />

            </div>
          ))}

        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src={story.avatar}
                alt={story.user}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="text-white">

              <p className="text-sm font-medium">
                @{story.user}
              </p>

              <p className="text-xs text-white/70">
                استوری
              </p>

            </div>

          </div>

          <button onClick={closeStory}>
            <X className="text-white" />
          </button>

        </div>
      </div>

      {/* LEFT */}
      <button
        onClick={prevStory}
        className="absolute left-0 top-0 h-full w-1/2"
      >
        <ChevronLeft
          className="absolute left-4 top-1/2 text-white"
          size={34}
        />
      </button>

      {/* RIGHT */}
      <button
        onClick={() => nextStory(stories.length)}
        className="absolute right-0 top-0 h-full w-1/2"
      >
        <ChevronRight
          className="absolute right-4 top-1/2 text-white"
          size={34}
        />
      </button>

    </div>
  );
}