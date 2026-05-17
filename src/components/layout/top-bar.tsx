export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 h-14 border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4">
        <span className="text-lg font-bold">Boom</span>
        <button>🔍</button>
      </div>
    </header>
  );
}