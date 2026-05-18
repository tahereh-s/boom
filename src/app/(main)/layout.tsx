import BottomNav from "@/components/layout/bottom-nav";
import TopBar from "@/components/layout/top-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">

      <TopBar />

      <main className="flex-1 mx-auto w-full max-w-xl px-3 pt-2 pb-24">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}