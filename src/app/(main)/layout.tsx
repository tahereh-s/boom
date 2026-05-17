import TopBar from "@/components/layout/top-bar";
import BottomNav from "@/components/layout/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />

      <main className="flex-1 max-w-xl mx-auto w-full px-3">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}