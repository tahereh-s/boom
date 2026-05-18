"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  BadgeCheck,
} from "lucide-react";

import { getBookmarks, toggleBookmark } from "@/lib/bookmarks";
import { addComment, getComments } from "@/lib/comments";

export default function PostCard({ post }: any) {
  const [liked, setLiked] = useState(post.likedByMe || false);
  const [likes, setLikes] = useState(post.likes || 0);

  const [saved, setSaved] = useState(false);

  const [openComments, setOpenComments] = useState(false);
  const [input, setInput] = useState("");

  const [localComments, setLocalComments] = useState<any[]>([]);

  const [showHeart, setShowHeart] = useState(false);
  const [animating, setAnimating] = useState(false);

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = openComments ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openComments]);

  // init data
  useEffect(() => {
    const savedPosts = getBookmarks();
    setSaved(savedPosts.includes(post.id));

    setLocalComments(getComments(post.id) || []);
  }, [post.id]);

  // LIKE
  const toggleLike = () => {
    const newLiked = !liked;

    setLiked(newLiked);
    setLikes((prev: number) => (newLiked ? prev + 1 : prev - 1));

    setAnimating(true);
    setTimeout(() => setAnimating(false), 200);
  };

  // DOUBLE TAP LIKE
  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }

    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 600);
  };

  // SAVE
  const handleSave = () => {
    const updated = toggleBookmark(post.id);
    setSaved(updated.includes(post.id));
  };

  // ADD COMMENT
  const handleAddComment = () => {
    if (!input.trim()) return;

    addComment(post.id, input);

    setLocalComments(getComments(post.id));

    setInput("");
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">

          <div className="relative h-11 w-11 overflow-hidden rounded-full">
            <Image
              src={post.avatar}
              alt={post.user}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">
                @{post.user}
              </span>

              {post.verified && (
                <BadgeCheck
                  size={16}
                  className="fill-sky-500 text-sky-500"
                />
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              ۲ ساعت پیش
            </p>
          </div>

        </div>

        <button className="text-muted-foreground">•••</button>
      </div>

      {/* IMAGE */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-muted"
        onDoubleClick={handleDoubleTap}
      >
        <Image
          src={post.image}
          alt="post"
          fill
          className="object-cover"
        />

        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="h-24 w-24 fill-red-500 text-red-500 animate-in zoom-in-50 fade-in" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="space-y-4 p-4">

        {/* ACTIONS */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-5">

            <button onClick={toggleLike}>
              <Heart
                className={`transition ${liked ? "fill-red-500 text-red-500" : ""
                  } ${animating ? "scale-125" : ""}`}
              />
            </button>

            <button onClick={() => setOpenComments(true)}>
              <MessageCircle />
            </button>

          </div>

          <button onClick={handleSave}>
            <Bookmark className={saved ? "fill-foreground" : ""} />
          </button>

        </div>

        {/* STATS */}
        <div className="text-sm">
          <span className="font-medium">{likes} پسند</span>{" "}
          <span className="text-muted-foreground">
            {localComments.length} نظر
          </span>
        </div>

        {/* CAPTION */}
        <p className="text-sm leading-7">
          <span className="ml-2 font-semibold">@{post.user}</span>
          {post.caption}
        </p>

        {/* PRODUCT */}
        {post.product && (
          <div className="flex items-center justify-between rounded-2xl border border-border bg-accent/20 p-3">
            <div>
              <p className="text-sm font-medium">
                {post.product.name}
              </p>
              <p className="text-xs text-muted-foreground">
                مشاهده محصول
              </p>
            </div>

            <div className="text-sm font-bold text-primary">
              {post.product.price}
            </div>
          </div>
        )}
      </div>

      {/* COMMENTS SHEET */}
      {/* COMMENTS SHEET */}
      {openComments && (
        <div className="fixed inset-0 z-[9999] flex items-end">

          {/* BACKDROP */}
          <div
            onClick={() => setOpenComments(false)}
            className="absolute inset-0 bg-black/50"
          />

          {/* SHEET */}
          <div className="relative w-full bg-background rounded-t-3xl p-4 flex flex-col max-h-[80vh] z-[10000]">

            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-muted" />

            <h3 className="mb-3 text-center font-semibold">
              نظرات
            </h3>

            {/* COMMENTS */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {localComments.map((c) => (
                <div key={c.id} className="rounded-xl bg-muted p-3">
                  <p className="text-sm font-semibold">@{c.user}</p>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="mt-3 flex gap-2 border-t pt-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-xl border p-2 text-sm"
                placeholder="نوشتن نظر..."
              />

              <button
                onClick={handleAddComment}
                className="rounded-xl bg-primary px-4 text-sm text-white"
              >
                ارسال
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}