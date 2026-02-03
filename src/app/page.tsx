'use client';

import CustomCursor from '@/components/CustomCursor';
import ThemeToggle from '@/components/ThemeToggle';
import ScrollNav from '@/components/ScrollNav';
import MobileNav from '@/components/MobileNav';
import AIAssistant from '@/components/AIAssistant';
import HeroSection from '@/components/sections/HeroSection';
import OriginSection from '@/components/sections/OriginSection';
import LearningSection from '@/components/sections/LearningSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import WorkSection from '@/components/sections/WorkSection';
import NowSection from '@/components/sections/NowSection';

export default function Home() {
  return (
    <>
      {/* Global UI elements */}
      <CustomCursor />
      <ThemeToggle />
      <ScrollNav />
      <MobileNav />
      <AIAssistant />

      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <OriginSection />
        <LearningSection />
        <ProjectsSection />
        <WorkSection />
        <NowSection />
      </main>
    </>
  );
}
