'use client';
import {
  HeroSection,
  FeaturedArticles,
  PodcastSection,
  SocialMediaSection,
  TechnologySection,
  MarketingCarousel,
  IaPage,
  VideoPage
} from "@/components/pages/home";

export default function Home() {
    return (
        <div className="px-4 md:px-10 lg:px-20">
            <HeroSection />
            <FeaturedArticles />
            <PodcastSection />
            <SocialMediaSection />
            <VideoPage />
            <MarketingCarousel />
            <TechnologySection />
            <IaPage />
        </div>
    )
}