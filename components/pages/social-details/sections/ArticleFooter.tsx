import { Badge } from "@/components/ui/badge";
import { articleDetails } from "../data/mockData";
import ShareButtons from "./ShareButtons";

export default function ArticleFooter() {
    const getTagColor = (tag: string) => {
        switch (tag) {
            case 'Design':
                return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
            case 'Research':
                return 'bg-green-100 text-green-700 hover:bg-green-200';
            case 'Presentation':
                return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
            default:
                return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
    };

    return (
        <div className="mt-6 mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                    {articleDetails.tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className={`${getTagColor(tag)} px-4 py-2 text-sm font-medium rounded-full`}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Social Share Buttons */}
                <ShareButtons />
            </div>
        </div>
    );
} 