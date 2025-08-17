import ArticleCard from "@/components/ArticleCard";
import HomeSectionHeader from "@/components/HomeSectionHeader";
import { relatedArticles } from "../data/mockData";

export default function RelatedArticles() {
    return (
        <div>
            <HomeSectionHeader title="Autres articles" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
                {relatedArticles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                ))}
            </div>
        </div>
    );
} 