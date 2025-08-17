import CategoryCard from '@/components/CategoryCard';
import { categories } from "../data/mockData";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
      {categories.map((category) => (
        <CategoryCard key={category.title} {...category} />
      ))}
    </div>
  );
} 