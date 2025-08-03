'use client';

import SectionHeader from "@/components/SectionHeader";
import HeroArticleCard from "@/components/HeroArticleCard";
import {
  MainContent,
  Sidebar,
  CategoryGrid,
  PaginationSection
} from "@/components/pages/social";

export default function Social() {
  return (
    <div className="px-4 md:px-6 xl:px-20">
      <SectionHeader />
      <HeroArticleCard />

      <div className="flex  flex-col-reverse lg:flex-row min-h-screen bg-white">
        <MainContent />
        <Sidebar />
      </div>

      <PaginationSection />
      <CategoryGrid />
    </div>
  );
}
