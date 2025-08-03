import React from 'react';

interface Category {
  name: string;
  count: number;
  color: string; // e.g. 'bg-blue-500'
}

const categories: Category[] = [
  { name: 'UX/UI Design', count: 12, color: 'bg-blue-500' },
  { name: 'Développement', count: 8, color: 'bg-green-500' },
  { name: 'Marketing', count: 6, color: 'bg-purple-500' },
  { name: 'Photography', count: 4, color: 'bg-orange-500' },
];

const CategoryList: React.FC = () => {
  return (
    <div className="">
      <h2 className="font-semibold text-lg mb-6">Catégories</h2>

      <ul className="space-y-3 text-sm text-gray-700">
        {categories.map((cat, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
              <span>{cat.name}</span>
            </div>
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full font-medium">
              {cat.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
