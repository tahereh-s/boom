"use client";

import Image from "next/image";



import PostCard from "@/components/feed/post-card";
import { posts } from "@/lib/mock-data";

export default function ProfilePage() {
  const userPosts = posts;

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4">

      {/* PROFILE HEADER */}
      <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">

        <div className="flex items-center gap-4">

          {/* AVATAR */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full border">

            <Image
              src="https://i.pravatar.cc/300?img=12"
              alt="profile"
              fill
              className="object-cover"
            />

          </div>

          {/* INFO */}
          <div className="flex-1">

            <h1 className="text-xl font-bold">
              Tahereh
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Frontend Developer & UI Designer ✨
            </p>

            {/* STATS */}
            <div className="mt-4 flex gap-6">

              <div>
                <p className="text-lg font-bold">
                  {userPosts.length}
                </p>

                <p className="text-xs text-muted-foreground">
                  پست
                </p>
              </div>

              <div>
                <p className="text-lg font-bold">
                  12.4k
                </p>

                <p className="text-xs text-muted-foreground">
                  فالوور
                </p>
              </div>

              <div>
                <p className="text-lg font-bold">
                  310
                </p>

                <p className="text-xs text-muted-foreground">
                  دنبال‌شده
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* POSTS */}
      <section className="space-y-5">

        <h2 className="text-lg font-semibold">
          پست‌ها
        </h2>

        {userPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}

      </section>

    </main>
  );
}