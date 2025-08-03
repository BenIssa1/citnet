import ArticleCard from "@/components/ArticleCard";
import TabSection from "./TabSection";
import { socialMediaArticles, socialMediaTabs } from "../data/mockData";

export default function SocialMediaSection() {
    return (
        <TabSection title="Social Media" tabs={socialMediaTabs}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
                {socialMediaArticles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                ))}
            </div>
        </TabSection>
    );
} 