import ArticleCard from "@/components/ArticleCard";
import { articles } from "../data/mockData";

export default function MainContent() {
  return (
    <main className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </main>
  );
} 