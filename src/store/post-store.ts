import { create } from "zustand";

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

type PostStore = {
  posts: Post[];
  addPost: (post: Post) => void;
  removePost: (id: number) => void;
  setPosts: (posts: Post[]) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  posts: [],

  setPosts: (posts) => set({ posts }),

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),

  removePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
}));