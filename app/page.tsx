'use client';

import ArticleCard from "@/components/ArticleCard";
import CategoryList from "@/components/CategoryList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroArticleCard from "@/components/HeroArticleCard";
import Navbar from "@/components/Navbar";
import PostItem from "@/components/PostItem";
import Image from "next/image";
import CategoryCard from '@/components/CategoryCard';
import Timeline from "@/components/Timeline";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";

export default function Home() {

  const articles = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "20 Jan 2022",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "20 Jan 2022",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/women/22.jpg",
      date: "20 Jan 2022",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "20 Jan 2022",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "20 Jan 2022",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/women/22.jpg",
      date: "20 Jan 2022",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "20 Jan 2022",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "20 Jan 2022",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      badgeText: "Facebook",
      badgeColor: "bg-pink-100 text-black",
      timeToRead: "8 min lecture",
      title: "Migrating to Linear 101",
      excerpt:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      authorName: "Phoenix Baker",
      authorImage: "https://randomuser.me/api/portraits/women/22.jpg",
      date: "20 Jan 2022",
    },
  ];

  const images = [
    '/images/popular.png',
    '/images/popular.png',
    '/images/popular.png',
    '/images/popular.png',
    '/images/popular.png',
  ];

  const socialIcons = [
    { href: "#", icon: "/icons/x.svg", alt: "Twitter" },
    { href: "#", icon: "/icons/linkedln.svg", alt: "LinkedIn" },
    { href: "#", icon: "/icons/facebook.svg", alt: "Facebook" },
    { href: "#", icon: "/icons/youtube.svg", alt: "YouTube" },
    { href: "#", icon: "/icons/instagram.svg", alt: "Instagram" },
    { href: "#", icon: "/icons/tiktok.svg", alt: "TikTok" },
  ];

  const categories = [
    {
      title: 'SEO',
      count: 300,
      imageUrl: '/images/seo.jpg',
      overlayColor: 'bg-rose-500/50',
    },
    {
      title: 'Contenu',
      count: 300,
      imageUrl: '/images/contenu.jpg',
      overlayColor: 'bg-purple-700/50',
    },
    {
      title: 'Marketing digital',
      count: 300,
      imageUrl: '/images/marketing.jpg',
      overlayColor: 'bg-orange-400/50',
    },
    {
      title: 'IA',
      count: 300,
      imageUrl: '/images/ia.jpg',
      overlayColor: 'bg-indigo-500/50',
    },
    {
      title: 'Technologie',
      count: 300,
      imageUrl: '/images/technologie.jpg',
      overlayColor: 'bg-teal-600/50',
    },
  ];

  const timelineData = [
    {
      id: 1,
      date: "Dec 15, 2016",
      title: "Of course Uber is working on a flying car projet",
      description: "Innovation dans le transport aérien urbain"
    },
    {
      id: 2,
      date: "Dec 12, 2016",
      title: "Sync by 50 wireless headphones review",
      description: "Test complet des derniers écouteurs sans fil"
    },
    {
      id: 3,
      date: "Dec 12, 2016",
      title: "Pay for the power, not for the design",
      description: "Analyse des tendances du marché tech"
    },
    {
      id: 4,
      date: "Dec 12, 2016",
      title: "The Best action camera you can buy",
      description: "Comparatif des meilleures caméras d'action"
    },
    {
      id: 5,
      date: "Dec 12, 2016",
      title: "Honda teases electric concept car with AI-powered emotions",
      description: "L'avenir de l'automobile électrique et intelligente"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div>
      <Header />
      <Navbar />

      <div className="px-20">
        <SectionHeader />
        <HeroArticleCard />

        <div className="flex min-h-screen bg-white">
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </div>
          </main>

          <aside className="w-1/5 px-4 space-y-6">
            <div className="max-w-sm mx-auto">
              <Timeline items={timelineData} />

              <div className="mt-8">
                <h3 className="font-semibold mb-3">Suivez nous</h3>
                <div className="flex justify-between gap-4 text-gray-500 text-xl">
                  <Image src={"/icons/x.svg"} alt={"Twitter"} width={15} height={15} />
                  <Image src={"/icons/linkedln.svg"} alt={"Twitter"} width={15} height={15} />
                  <Image src={"/icons/facebook.svg"} alt={"Twitter"} width={15} height={15} />
                  <Image src={"/icons/youtube.svg"} alt={"Twitter"} width={15} height={15} />
                  <Image src={"/icons/instagram.svg"} alt={"Twitter"} width={15} height={15} />
                  <Image src={"/icons/tiktok.svg"} alt={"Twitter"} width={15} height={15} />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="py-20">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>


      </div>

      <Footer />
    </div>
  );
}
