import ArticleCard from "@/components/ArticleCard";
import TabSection from "./TabSection";
import { technologyArticles, technologyTabs } from "../data/mockData";

export default function TechnologySection() {
    return (
        <TabSection title="Technologie" tabs={technologyTabs}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                {technologyArticles.map((article, index) => (
                    <ArticleCard key={index} {...article} />
                ))}
            </div>
        </TabSection>
    );
} 