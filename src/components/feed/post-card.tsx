export default function PostCard({ post }: any) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      
      {/* image */}
      <div className="aspect-square bg-muted" />

      {/* content */}
      <div className="p-3 space-y-2">

        <div className="font-medium">@{post.user}</div>

        <p className="text-sm text-foreground/80">
          {post.caption}
        </p>

        {/* product section */}
        <div className="bg-accent/20 p-2 rounded-lg">
          <div className="text-sm font-medium">
            {post.product}
          </div>

          <div className="text-primary font-bold">
            {post.price} تومان
          </div>
        </div>

      </div>
    </div>
  );
}