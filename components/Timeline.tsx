import React from 'react';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-8 border-b-2 border-black pb-4 -mt-10">Les plus consultés</h2>

      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-pink-400 to-pink-300"></div>

        {items.map((item, index) => (
          <div key={item.id} className="relative flex items-start mb-8 group">
            {/* Point coloré */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-3 h-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
              </div>
            </div>

            {/* Contenu */}
            <div className="ml-3 flex-1">
              <div className="text-sm text-[#6E767E] font-medium mb-2">
                {item.date}
              </div>

              <h3 className="text-md font-semibold text-[#0B0063] leading-tight mb-2 group-hover:text-pink-600 transition-colors duration-200">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;