import { create } from "zustand";

type StoryViewerStore = {
  activeIndex: number | null;

  openStory: (index: number) => void;

  closeStory: () => void;

  nextStory: (max: number) => void;

  prevStory: () => void;
};

export const useStoryViewer = create<StoryViewerStore>(
  (set, get) => ({
    activeIndex: null,

    openStory: (index) =>
      set({
        activeIndex: index,
      }),

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
  })
);