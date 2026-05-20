"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoryViewerStore = {
  activeIndex: number | null;

  seenStories: number[];

  openStory: (storyId: number, index: number) => void;

  closeStory: () => void;

  nextStory: (max: number) => void;

  prevStory: () => void;
};

export const useStoryViewer = create<StoryViewerStore>()(
  persist(
    (set, get) => ({
      activeIndex: null,

      seenStories: [],

      openStory: (storyId, index) =>
        set((state) => ({
          activeIndex: index,

          seenStories: state.seenStories.includes(storyId)
            ? state.seenStories
            : [...state.seenStories, storyId],
        })),

      closeStory: () =>
        set({
          activeIndex: null,
        }),

      nextStory: (max) => {
        const current = get().activeIndex;

        if (current === null) return;

        if (current < max - 1) {
          set({
            activeIndex: current + 1,
          });
        }
      },

      prevStory: () => {
        const current = get().activeIndex;

        if (current === null) return;

        if (current > 0) {
          set({
            activeIndex: current - 1,
          });
        }
      },
    }),
    {
      name: "story-viewer-storage",
    }
  )
);