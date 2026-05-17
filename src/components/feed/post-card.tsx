import Image from "next/image";

export default function PostCard({ post }: any) {
  return (
    <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">

      {/* USER HEADER */}
      <div className="flex items-center justify-between p-3">
        <div className="font-medium text-sm">@{post.user}</div>
        <div className="text-xs text-muted-foreground">•••</div>
      </div>

      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-muted">
        <Image
          src={post.image}
          alt="post"
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 space-y-2">

        <p className="text-sm">{post.caption}</p>

        {/* PRODUCT BOX */}
        <div className="flex items-center justify-between bg-accent/30 p-2 rounded-xl">

          <div className="text-sm font-medium">
            {post.product}
          </div>

          <div className="text-primary font-bold text-sm">
            {post.price} تومان
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 text-sm text-muted-foreground pt-2">
          <button>❤️</button>
          <button>💬</button>
          <button>🔖</button>
        </div>

      </div>
    </div>
  );
}