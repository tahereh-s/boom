"use client";

import { posts } from "@/lib/mock-data";
import Image from "next/image";



export default function ExplorePage() {
  return (
    <main className="mx-auto max-w-6xl p-4">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            اکسپلور
          </h1>

          <p className="text-sm text-muted-foreground">
            ترندهای امروز 🔥
          </p>
        </div>

      </div>

      {/* GRID */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3">

        {posts.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square overflow-hidden rounded-3xl"
          >

            {/* IMAGE */}
            <Image
              src={post.image}
              alt={post.caption}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />

            {/* INFO */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 text-white transition duration-300 group-hover:translate-y-0">

              <p className="line-clamp-2 text-sm font-medium">
                {post.caption}
              </p>

              <div className="mt-2 flex items-center justify-between text-xs">

                <span>
                  @{post.user}
                </span>

                <span>
                  ❤️ {post.likes}
                </span>

              </div>

            </div>

          </div>
        ))}

      </section>

    </main>
  );
}