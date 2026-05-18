"use client";

import Image from "next/image";
import PostCard from "@/components/feed/post-card";
import { currentUser } from "@/lib/current-user";
import { usePostStore } from "@/store/post-store";

export default function ProfilePage() {
  const posts = usePostStore((state) => state.posts);
  const userPosts = posts.filter(
    (post) => post.user === currentUser.username
  );

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4">

      {/* PROFILE HEADER */}
      <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">

        <div className="flex items-center gap-4">

          {/* AVATAR */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full border">
            <Image
              src={currentUser.avatar}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>

          {/* INFO */}
          <div className="flex-1">

            <h1 className="text-xl font-bold">
              {currentUser.username}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {currentUser.bio || "Frontend Developer ✨"}
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
                <p className="text-lg font-bold">12.4k</p>
                <p className="text-xs text-muted-foreground">فالوور</p>
              </div>

              <div>
                <p className="text-lg font-bold">310</p>
                <p className="text-xs text-muted-foreground">دنبال‌شده</p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* POSTS */}
      <section className="space-y-5">

        <h2 className="text-lg font-semibold">
          پست‌های من
        </h2>

        {userPosts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            هنوز پستی منتشر نکردی
          </p>
        ) : (
          userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}

      </section>

    </main>
  );
}