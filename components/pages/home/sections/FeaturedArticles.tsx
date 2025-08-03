import HomeArticleCard from "@/components/HomeArticleCard";
import { featuredArticles, featuredCard } from "../data/mockData";
import Tag from "@/components/ui/Tag";

export default function FeaturedArticles() {
    const getTagVariant = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'design':
                return 'design';
            case 'research':
                return 'research';
            case 'presentation':
                return 'presentation';
            default:
                return 'design';
        }
    };

    return (
        <div className="px-4 lg:px-20 py-10 bg-black">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/2">
                    <div className="relative w-full bg-black">
                        {/* Image d'arrière-plan */}
                        <img
                            src={featuredCard.backgroundImage}
                            alt="UX Review Background"
                            className="w-full object-cover hidden md:block"
                        />

                        {/* Carte de présentation */}
                        <div className="md:absolute md:bottom-8 md:left-8 md:right-8 lg:left-10 lg:right-10 bg-white rounded-xl shadow-xl p-6 md:p-8 space-y-4 mx-auto">
                            <p className="text-sm text-gray-500">{featuredCard.date}</p>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{featuredCard.title}</h1>
                            <p className="text-gray-700 text-base">
                                {featuredCard.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {featuredCard.tags.map((tag, index) => (
                                    <Tag key={index} variant={getTagVariant(tag)}>
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    {featuredArticles.map((article, index) => (
                        <HomeArticleCard key={index} {...article} />
                    ))}
                </div>
            </div>
        </div>
    );
} 