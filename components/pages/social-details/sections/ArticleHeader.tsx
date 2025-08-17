import { articleDetails } from "../data/mockData";

export default function ArticleHeader() {
    return (
        <div className="mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B0063] my-6">
                {articleDetails.title}
            </h1>
            <p className="text-md text-slate-600 leading-relaxed">
                {articleDetails.description}
            </p>
        </div>
    );
} 