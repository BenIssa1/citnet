import { articleDetails } from "../data/mockData";

export default function ArticleHero() {
    return (
        <div className="aspect-[16/9] sm:aspect-[21/9] relative overflow-hidden rounded-lg">
            <img
                src={articleDetails.image}
                alt="Two women collaborating on UX design work"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
    );
} 