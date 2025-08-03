import Image from 'next/image';

interface ArticleCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
}

const tagColors: Record<string, string> = {
  Design: 'bg-red-100 text-red-600',
  Research: 'bg-green-100 text-green-700',
  Presentation: 'bg-yellow-100 text-yellow-700',
  Default: 'bg-gray-100 text-gray-700',
};

export default function HomeArticleCard({
  image,
  date,
  title,
  description,
  tags,
}: ArticleCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 2xl:mb-12">
      <div className="w-full md:w-1/2 h-[200px] relative rounded-sm overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 text-white">
        <p className="text-sm text-gray-300 mb-1">{date}</p>
        <h3 className="text-lg font-bold text-purple-300 mb-2">{title}</h3>
        <p className="text-sm text-gray-200 mb-4 max-w-[300px] ">{description}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-4 py-1 rounded-full text-sm ${
                tagColors[tag] || tagColors.Default
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
