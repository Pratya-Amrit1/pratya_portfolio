'use client';

import dynamic from 'next/dynamic';
import { Navbar } from "@/components/Navbar";

// Lazy load non-critical layout components (client-side only)
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });
const ScrollToTopBtn = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const LightPullThemeSwitcher = dynamic(
  () => import("@/components/ui/light-pull-theme-switcher").then(m => ({ default: m.LightPullThemeSwitcher })),
  { ssr: false }
);
const Cursor = dynamic(
  () => import("@/components/ui/Cursor").then(m => ({ default: m.Cursor })),
  { ssr: false }
);
const Toaster = dynamic(
  () => import("sonner").then(m => ({ default: m.Toaster })),
  { ssr: false }
);

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <LightPullThemeSwitcher />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      {children}
      <Toaster richColors position="bottom-right" />
      <ScrollToTopBtn />
    </>
  );
}
