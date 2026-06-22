import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { PageTransition } from '@/components/animations/page-transition';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="p-6 lg:p-8 pt-16 lg:pt-6">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
