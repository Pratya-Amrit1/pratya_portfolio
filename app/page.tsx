'use client';
import dynamic from 'next/dynamic';
import { Home } from "@/components/navPages/Home"

// Lazy load below-the-fold sections — they don't need to block initial render
const Projects = dynamic(() => import('@/components/navPages/Projects').then(m => ({ default: m.Projects })), {
  loading: () => <div className="min-h-[400px]" />,
});
const CodingProfiles = dynamic(() => import('@/components/navPages/CodingProfiles'), {
  loading: () => <div className="min-h-[400px]" />,
});
const SkillsSection = dynamic(() => import('@/components/navPages/Skills'), {
  loading: () => <div className="min-h-[300px]" />,
});
const Contact = dynamic(() => import('@/components/navPages/Contact'), {
  loading: () => <div className="min-h-[300px]" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[60px]" />,
});

export default function HomePage() {
  return (
    <main className={`flex flex-col items-center justify-center scroll-smooth`}>
      <Home/>
      <Projects/>
      <CodingProfiles/>
      <SkillsSection/>
      <Contact/>
      <Footer/>
    </main>
  );
}
