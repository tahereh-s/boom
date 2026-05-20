"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Post = {
  id: number;
  user: string;
  avatar: string;
  verified: boolean;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  likedByMe: boolean;
  product?: {
    name: string;
    price: string;
  } | null;
};

export type Story = {
  id: number;
  user: string;
  avatar: string;
  image: string;
  createdAt: number;
};

type PostStore = {
  posts: Post[];
  stories: Story[];

  setPosts: (posts: Post[]) => void;
  addPosts: (newPosts: Post[]) => void;
  addPost: (post: Post) => void;
  removePost: (id: number) => void;

  addStory: (story: Story) => void;
};

export const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      posts: [],
      stories: [
        {
          id: 1,
          user: "tahereh",
          avatar: "https://i.pravatar.cc/150?img=12",
          image: "https://picsum.photos/500/800?1",
          createdAt: Date.now(),
        },
        {
          id: 2,
          user: "ali",
          avatar: "https://i.pravatar.cc/150?img=15",
          image: "https://picsum.photos/500/800?2",
          createdAt: Date.now(),
        },
      ],

      setPosts: (posts) => set({ posts }),

      addPosts: (newPosts) =>
        set((state) => {
          const existingIds = new Set(state.posts.map((p) => p.id));
          const filtered = newPosts.filter((p) => !existingIds.has(p.id));
          return { posts: [...state.posts, ...filtered] };
        }),

      addPost: (post) =>
        set((state) => ({
          posts: [post, ...state.posts],
        })),

      removePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        })),

      addStory: (story) =>
        set((state) => ({
          stories: [story, ...state.stories],
        })),
    }),
    {
      name: "post-storage",
    }
  )
);