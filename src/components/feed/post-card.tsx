"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Heart,
  MessageCircle,
  Bookmark,
  BadgeCheck,
} from "lucide-react";

export default function PostCard({ post }: any) {
  const [liked, setLiked] = useState(false);

  const [saved, setSaved] = useState(false);

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
            <button className="transition active:scale-90">

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
                saved
                  ? "fill-foreground"
                  : ""
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
    </div>
  );
}