import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ArticleCardProps = {
    imageUrl: string;
    badgeColor?: string;
    badgeText: string;
    timeToRead: string;
    title: string;
    excerpt: string;
    authorName: string;
    authorImage: string;
    date: string;
};

export default function ArticleCard({
    imageUrl,
    badgeColor = "bg-pink-100 text-black",
    badgeText,
    timeToRead,
    title,
    excerpt,
    authorName,
    authorImage,
    date,
}: ArticleCardProps) {
    return (
        <div className="space-y-4">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-80 object-cover rounded-lg"
            />

            <div className={`flex items-center space-x-2 ${badgeColor} w-fit p-1 px-2 rounded-full`}>
                <Badge variant="outline" className="text-xs font-bold bg-white rounded-full">Facebook</Badge>
                <span className="text-xs text-[#731521]">{badgeText}</span>
            </div>

            <h3 className="text-lg font-bold text-blue-900">{title}</h3>

            <p className="text-sm text-gray-600">{excerpt}</p>

            <div className="flex items-center gap-2 pt-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={authorImage} />
                    <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-semibold">{authorName}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                </div>
            </div>
        </div>
    );
}
