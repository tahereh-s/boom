"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Heart,
  MessageCircle,
  Bookmark,
  BadgeCheck,
} from "lucide-react";

export default function PostCard({ post }: any) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const comments = [
    {
      id: 1,
      user: "ali",
      text: "این محصول واقعاً ارزش خرید داره؟",
    },
    {
      id: 2,
      user: "sara",
      text: "من دارمش، کیفیتش عالیه 👌",
    },
  ];

  // 🔒 lock scroll when modal open
  useEffect(() => {
    if (openComments) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openComments]);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">

          {/* AVATAR */}
          <div className="relative h-11 w-11 overflow-hidden rounded-full">
            <Image
              src={post.avatar}
              alt={post.user}
              fill
              className="object-cover"
            />
          </div>

          {/* USER */}
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

        <button className="text-muted-foreground">
          •••
        </button>
      </div>

      {/* IMAGE */}
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={post.image}
          alt="post"
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="space-y-4 p-4">

        {/* ACTIONS */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-5">

            {/* LIKE */}
            <button
              onClick={() => setLiked(!liked)}
              className="transition active:scale-90"
            >
              <Heart
                size={24}
                className={
                  liked
                    ? "fill-red-500 text-red-500"
                    : "text-foreground"
                }
              />
            </button>

            {/* COMMENT */}
            <button
              onClick={() => setOpenComments(true)}
              className="transition active:scale-90"
            >
              <MessageCircle size={23} />
            </button>

          </div>

          {/* SAVE */}
          <button
            onClick={() => setSaved(!saved)}
            className="transition active:scale-90"
          >
            <Bookmark
              size={23}
              className={
                saved ? "fill-foreground" : ""
              }
            />
          </button>

        </div>

        {/* STATS */}
        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium">
            {post.likes} پسند
          </span>

          <span className="text-muted-foreground">
            {post.comments} نظر
          </span>
        </div>

        {/* CAPTION */}
        <p className="text-sm leading-7">
          <span className="ml-2 font-semibold">
            @{post.user}
          </span>
          {post.caption}
        </p>

        {/* PRODUCT */}
        {post.product && (
          <div className="flex items-center justify-between rounded-2xl border border-border bg-accent/20 p-3">

            <div>
              <p className="text-sm font-medium">
                {post.product.name}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                مشاهده محصول
              </p>
            </div>

            <div className="text-sm font-bold text-primary">
              {post.product.price}
            </div>

          </div>
        )}
      </div>

      {/* COMMENTS BOTTOM SHEET */}
      {openComments && (
        <div className="fixed inset-0 z-50">

          {/* BACKDROP */}
          <div
            onClick={() => setOpenComments(false)}
            className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
          />

          {/* SHEET */}
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-background p-4
      animate-in slide-in-from-bottom-5 duration-300">

            {/* HANDLE */}
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-muted" />

            {/* TITLE */}
            <h3 className="mb-4 text-center font-semibold">
              نظرات
            </h3>

            {/* COMMENTS */}
            <div className="max-h-60 space-y-3 overflow-y-auto no-scrollbar">
              {comments.map((c) => (
                <div key={c.id} className="rounded-xl bg-muted p-3">
                  <p className="text-sm font-semibold">@{c.user}</p>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="mt-4 flex gap-2">
              <input
                className="flex-1 rounded-xl border border-border bg-background p-2 text-sm"
                placeholder="نوشتن نظر..."
              />

              <button className="rounded-xl bg-primary px-4 text-sm text-primary-foreground">
                ارسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}