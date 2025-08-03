'use client';

import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  count: number;
  imageUrl: string;
  overlayColor?: string;
}

export default function CategoryCard({
  title,
  count,
  imageUrl,
  overlayColor = 'bg-black/40',
}: CategoryCardProps) {
  return (
    <div className="relative rounded-xl overflow-hidden h-48 w-full ">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
      />
      <div className={`absolute inset-0 ${overlayColor}`} />
      <div className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-4 mb-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm">{count} postes</p>
      </div>
    </div>
  );
}
