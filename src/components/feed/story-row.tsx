export default function StoryRow() {
  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto py-4">

      {/* CREATE STORY */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
          +
        </div>

        <span className="text-xs text-muted-foreground">
          استوری شما
        </span>
      </div>

      {/* STORIES */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 shrink-0"
        >
          <div className="rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600 p-[2px]">
            
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card text-sm font-medium">
              U{i + 1}
            </div>

          </div>

          <span className="w-16 truncate text-center text-xs">
            username
          </span>
        </div>
      ))}
    </div>
  );
}