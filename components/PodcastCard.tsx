// components/PodcastCard.tsx
import Image from 'next/image';

interface PodcastCardProps {
  title: string;
  description: string;
  date: string;
  episode: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  color?: string; // ex: #105154
}

export default function PodcastCard({
  title,
  description,
  date,
  episode,
  tags,
  author,
  color = '#105154',
}: PodcastCardProps) {
  return (
    <div
      className="rounded-2xl p-6 text-white w-full  relative"
      style={{ backgroundColor: color }}
    >
      {/* Tags & Episode */}
      <div className="flex items-center flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`text-sm px-3 py-1 rounded-full font-semibold ${
              tag === 'Design'
                ? 'bg-orange-100 text-orange-700'
                : tag === 'Research'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-white text-gray-700'
            }`}
          >
            {tag}
          </span>
        ))}
        <span className="ml-3 font-bold text-white">EP: {episode}</span>
      </div>

      {/* Date */}
      <p className="text-sm text-white/80 mb-2">{date}</p>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-3">{title}</h2>

      {/* Description */}
      <p className="text-white/90 leading-relaxed mb-6">{description}</p>

      {/* Author + Play */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={author.avatarUrl}
            alt={author.name}
            width={48}
            height={48}
            className="rounded-full border-2 border-white"
          />
          <div>
            <p className="font-semibold text-white">{author.name}</p>
            <p className="text-white/80 text-sm">{author.role}</p>
          </div>
        </div>

        <button className="w-12 h-12 flex items-center justify-center bg-white text-[#105154] rounded-full hover:scale-105 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
