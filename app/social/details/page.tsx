import ArticleCard from "@/components/ArticleCard";
import CommentForm from "@/components/CommentForm";
import CommentsSection from "@/components/CommentsSection";
import Header from "@/components/Header";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import Navbar from "@/components/Navbar";
import PostItem from "@/components/PostItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {

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

    return (
        <div>
            <Header />
            <Navbar />

            <div className="px-6 md:px-10 lg:px-20">
                <div className="mb-12">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B0063] my-6">
                        UX review presentations
                    </h1>
                    <p className="text-md text-slate-600 leading-relaxed">
                        How do you create compelling presentations that wow your colleagues and impress your managers?
                    </p>
                </div>

                <div className="aspect-[16/9] sm:aspect-[21/9] relative overflow-hidden rounded-lg">
                    <img
                        src="/images/details.png"
                        alt="Two women collaborating on UX design work"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Content Footer */}
                <div className="mt-6 mb-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-3">
                            <Badge
                                variant="secondary"
                                className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-4 py-2 text-sm font-medium rounded-full"
                            >
                                Design
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 text-sm font-medium rounded-full"
                            >
                                Research
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-4 py-2 text-sm font-medium rounded-full"
                            >
                                Presentation
                            </Badge>
                        </div>

                        {/* Social Share Buttons */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 p-5 hover:bg-gray-50 transition-colors"
                            >
                                <Image
                                    src="/icons/link-angled.svg"
                                    alt="Link"
                                    width={16}
                                    height={16}
                                />
                                Copier le lien
                            </Button>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-10 h-10.5 p-0 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    <Image
                                        src="/icons/x-blue.svg"
                                        alt="X"
                                        width={16}
                                        height={16}
                                    />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-10 h-10.5 p-0 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    <Image
                                        src="/icons/facebook-blue.svg"
                                        alt="Facebook"
                                        width={16}
                                        height={16}
                                    />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-10 h-10.5 p-0 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    <Image
                                        src="/icons/linkedln-blue.svg"
                                        alt="Linkedln"
                                        width={16}
                                        height={16}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex min-h-scree">
                    <main className="flex-1">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Partager avec vos proche
                            </h2>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2 p-5 hover:bg-gray-50 transition-colors"
                                >
                                    <Image
                                        src="/icons/link-angled.svg"
                                        alt="Link"
                                        width={16}
                                        height={16}
                                    />
                                    Copier le lien
                                </Button>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-10 h-10.5 p-0 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                    >
                                        <Image
                                            src="/icons/x-blue.svg"
                                            alt="X"
                                            width={16}
                                            height={16}
                                        />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-10 h-10.5 p-0 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                    >
                                        <Image
                                            src="/icons/facebook-blue.svg"
                                            alt="Facebook"
                                            width={16}
                                            height={16}
                                        />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-10 h-10.5 p-0 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                    >
                                        <Image
                                            src="/icons/linkedln-blue.svg"
                                            alt="Linkedln"
                                            width={16}
                                            height={16}
                                        />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pr-8 py-10" >
                            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 mx-auto sm:mx-0">
                                <AvatarImage src="/images/popular.png" alt="Olivia Rhye" />
                                <AvatarFallback className="bg-yellow-400 text-black font-semibold text-lg sm:text-xl">
                                    OR
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Olivia Rhye</h3>
                                        <p className="text-sm sm:text-base text-gray-600">Product Designer, Untitled</p>
                                    </div>

                                    <div className="flex justify-center sm:justify-end gap-2">
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="w-8 h-8 sm:w-10 sm:h-10 p-0"
                                        >
                                            <Image
                                                src="/icons/x-blue.svg"
                                                alt="X"
                                                width={16}
                                                height={16}
                                            />
                                        </Button>

                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="w-8 h-8 sm:w-10 sm:h-10 p-0"
                                        >
                                            <Image
                                                src="/icons/facebook-blue.svg"
                                                alt="Facebook"
                                                width={16}
                                                height={16}
                                            />
                                        </Button>

                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="w-8 h-8 sm:w-10 sm:h-10 p-0"
                                        >
                                            <Image
                                                src="/icons/linkedln-blue.svg"
                                                alt="Linkedln"
                                                width={16}
                                                height={16}
                                            />
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.
                                </p>
                            </div>
                        </div>

                        <CommentsSection />
                        <CommentForm />

                        <HomeSectionHeader
                            title="Autres articles"
                            
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                            {articlesDatas.map((article, index) => (
                                <ArticleCard key={index} {...article} />
                            ))}
                        </div>
                    </main>

                    <aside className="w-2/8  space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">Populaire  dans la catégories</h2>
                        <PostItem imageSrc="/images/popular.png" />
                        <PostItem imageSrc="/images/popular.png" />
                        <PostItem imageSrc="/images/popular.png" />
                        <PostItem imageSrc="/images/popular.png" />
                        <PostItem imageSrc="/images/popular.png" />

                        <div className="mt-8">
                            <h3 className="font-semibold mb-3">Suivez nous</h3>
                            <div className="flex gap-6 text-gray-500 text-xl">
                                <Image src={"/icons/x.svg"} alt={"Twitter"} width={20} height={20} />
                                <Image src={"/icons/linkedln.svg"} alt={"Twitter"} width={20} height={20} />
                                <Image src={"/icons/facebook.svg"} alt={"Twitter"} width={20} height={20} />
                                <Image src={"/icons/youtube.svg"} alt={"Twitter"} width={20} height={20} />
                                <Image src={"/icons/instagram.svg"} alt={"Twitter"} width={20} height={20} />
                                <Image src={"/icons/tiktok.svg"} alt={"Twitter"} width={20} height={20} />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}