'use client';
import ArticleCard from "@/components/ArticleCard";
import Header from "@/components/Header";
import HomeArticleCard from "@/components/HomeArticleCard";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import Navbar from "@/components/Navbar";
import PodcastCard from "@/components/PodcastCard";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import VideoPage from "./VideoPage";
import { MarketingCarousel } from "./MarketingCarousel";
import IaPage from "./IaPage";

export default function Home() {
    const articles = [
        {
            image: "/images/home_article.jpg",
            date: "19 Jan 2022",
            title: "Migrating to Linear 101",
            description: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get...",
            tags: ["Design", "Research"]
        },
        {
            image: "/images/home_article_2.png",
            date: "18 Jan 2022",
            title: "Building your API Stack",
            description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and manag...",
            tags: ["Design", "Presentation"]
        },
        {
            image: "/images/home_article.jpg",
            date: "18 Jan 2022",
            title: "Building your API Stack",
            description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and manag...",
            tags: ["Research", "Presentation"]
        },
    ];

    const articlesDatas = [
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
            authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "20 Jan 2022",
        },
    ];

    const [activeTab, setActiveTab] = useState('News')
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
    const tabs = ['News', 'Facebook', 'Tiktok', 'Instagram', 'Twitter']

    useEffect(() => {
        const index = tabs.indexOf(activeTab)
        const currentTab = tabRefs.current[index]
        if (currentTab && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect()
            const tabRect = currentTab.getBoundingClientRect()
            setUnderlineStyle({
                left: tabRect.left - containerRect.left,
                width: tabRect.width,
            })
        }
    }, [activeTab])

    return (
        <div>
            <Header />
            <Navbar />

            <div className="px-4 lg:px-20">
                <div className="flex flex-col lg:flex-row bg-black text-white my-10">
                    {/* LEFT SIDE */}
                    <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
                        <p className="text-green-400 font-semibold mb-2">Nouveau</p>
                        <h1 className="text-pink-500 text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            Case study: The search<br />
                            for work happiness web<br />
                            experience
                        </h1>
                        <p className="text-lg text-gray-200 mb-6">
                            My intention was to bring awareness to these issues in an effort to induce change. It starts with reminding everyone that employees are human beings who deserve...
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm">Design</span>
                            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">Research</span>
                            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">Presentation</span>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="w-full lg:w-1/2">
                        <Image
                            src="/images/home_1.png"
                            alt="People smiling at laptop"
                            width={700}
                            height={500}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-20 py-10 bg-black">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/2">
                        <div className="relative w-full bg-black">
                            {/* Image d'arrière-plan */}
                            <img
                                src="/images/home_bg.png" // Remplace avec ton image
                                alt="UX Review Background"
                                className="w-full object-cover hidden md:block"
                            />

                            {/* Carte de présentation */}
                            <div className="md:absolute md:bottom-8 md:left-8 md:right-8 lg:left-10 lg:right-10 bg-white rounded-xl shadow-xl p-6 md:p-8 space-y-4 mx-auto">
                                <p className="text-sm text-gray-500">20 Jan 2022</p>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">UX review presentations</h1>
                                <p className="text-gray-700 text-base">
                                    How do you create compelling presentations that wow your colleagues and impress your managers?
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full font-medium">Design</span>
                                    <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full font-medium">Research</span>
                                    <span className="bg-yellow-100 text-yellow-600 text-sm px-3 py-1 rounded-full font-medium">Presentation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        {articles.map((article, index) => (
                            <HomeArticleCard key={index} {...article} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-20 my-10">
                <HomeSectionHeader
                    title="Derniers Podcasts"
                    onLinkClick={() => console.log('Voir plus cliqué')}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <PodcastCard
                        title="How to get rich?"
                        description="Specific knowledge is the stuff that feels like play to you but looks like work to others. It’s found by pursuing your innate talents, your genuine curiosity, and your passion.."
                        date="19 Jan 2022"
                        episode="199"
                        tags={["Design", "Research"]}
                        author={{
                            name: "Alec Whitten",
                            role: "Podcaster",
                            avatarUrl: "/images/popular.png", // Ajoute cette image dans /public
                        }}
                        color="#105154"
                    />

                    <PodcastCard
                        title="Think like a creator"
                        description="Specific knowledge is the stuff that feels like play to you but looks like work to others. It’s found by pursuing your innate talents, your genuine curiosity, and your passion."
                        date="22 Feb 2022"
                        episode="200"
                        tags={["Design", "Mindset"]}
                        author={{
                            name: "Sara Gomez",
                            role: "Content Creator",
                            avatarUrl: "/images/popular.png", // Ajoute cette image dans /public
                        }}
                        color="#1C1C1E" // fond sombre (ex. dark mode)
                    />

                    <PodcastCard
                        title="How to get rich?"
                        description="Specific knowledge is the stuff that feels like play to you but looks like work to others. It’s found by pursuing your innate talents, your genuine curiosity, and your passion."
                        date="19 Jan 2022"
                        episode="199"
                        tags={["Design", "Research"]}
                        author={{
                            name: "Alec Whitten",
                            role: "Podcaster",
                            avatarUrl: "/images/popular.png", // Ajoute cette image dans /public
                        }}
                        color="#105154"
                    />

                    <PodcastCard
                        title="Think like a creator"
                        description="Specific knowledge is the stuff that feels like play to you but looks like work to others. It’s found by pursuing your innate talents, your genuine curiosity, and your passion."
                        date="22 Feb 2022"
                        episode="200"
                        tags={["Design", "Mindset"]}
                        author={{
                            name: "Sara Gomez",
                            role: "Content Creator",
                            avatarUrl: "/images/popular.png", // Ajoute cette image dans /public
                        }}
                        color="#1C1C1E" // fond sombre (ex. dark mode)
                    />
                </div>
            </div>

            <div className="px-4 lg:px-20 my-10">
                 <HomeSectionHeader
                    title="Socila Media"
                    onLinkClick={() => console.log('Voir plus cliqué')}
                />
                <div className="border-b border-gray-200">
                    <div ref={containerRef} className="relative">
                        <nav className="flex space-x-6">
                            {tabs.map((tab, idx) => (
                                <button
                                    key={tab}
                                    ref={(el: HTMLButtonElement | null) => {
                                        tabRefs.current[idx] = el
                                    }}
                                    onClick={() => setActiveTab(tab)}
                                    className={clsx(
                                        'pb-2 text-sm transition-colors',
                                        activeTab === tab
                                            ? 'text-black font-semibold'
                                            : 'text-gray-500 hover:text-black'
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                        {/* Barre rose animée */}
                        <span
                            className="absolute bottom-0 h-1 bg-pink-500 transition-all duration-300"
                            style={{
                                left: underlineStyle.left,
                                width: underlineStyle.width,
                            }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    {articlesDatas.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                    ))}
                </div>
            </div>

            <VideoPage />

            <MarketingCarousel />

             <div className="px-4 lg:px-20 my-10">
                 <HomeSectionHeader
                    title="Technologie"
                    onLinkClick={() => console.log('Voir plus cliqué')}
                />
                <div className="border-b border-gray-200">
                    <div ref={containerRef} className="relative">
                        <nav className="flex space-x-6">
                            {tabs.map((tab, idx) => (
                                <button
                                    key={tab}
                                    ref={(el: HTMLButtonElement | null) => {
                                        tabRefs.current[idx] = el
                                    }}
                                    onClick={() => setActiveTab(tab)}
                                    className={clsx(
                                        'pb-2 text-sm transition-colors',
                                        activeTab === tab
                                            ? 'text-black font-semibold'
                                            : 'text-gray-500 hover:text-black'
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                        {/* Barre rose animée */}
                        <span
                            className="absolute bottom-0 h-1 bg-pink-500 transition-all duration-300"
                            style={{
                                left: underlineStyle.left,
                                width: underlineStyle.width,
                            }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    {articlesDatas.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                    ))}
                </div>
            </div>

            <IaPage />
        </div>
    )
}