import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  name: string;
  count: number;
}

const categories: Category[] = [
  { name: 'Shirts', count: 267 },
  { name: 'Trousers', count: 46 },
  { name: 'Jeans', count: 33 },
  { name: 'Overshirt', count: 20 },
  { name: 'Jackets', count: 16 },
  { name: 'T-Shirts', count: 15 },
  { name: 'Cargo Pants', count: 9 },
];

const SideCategoryFilters = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams(selectedCategories.map(c => ['category', c]));
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Refine By</h2>
      <div className="space-y-2">
        {categories.map(({ name, count }) => (
          <div key={name} className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(name)}
                onChange={() => toggleCategory(name)}
                className="mr-2"
              />
              {name}
            </label>
            <span className="text-gray-500">({count})</span>
          </div>
        ))}
      </div>
      <button
        onClick={handleApplyFilters}
        className="w-full rounded-md bg-gray-800 py-2 text-white hover:bg-gray-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default SideCategoryFilters;