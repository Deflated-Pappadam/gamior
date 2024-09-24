"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import CollectionItem from "./_components/CollectionItem";

const items = [
  { id: 1, name: "Bed", image: "/item.jpg", category: "bedroom" },
  { id: 2, name: "Sofa", image: "/item.jpg", category: "living" },
  { id: 3, name: "Dining Table", image: "/item.jpg", category: "dining" },
  { id: 4, name: "Fridge", image: "/item.jpg", category: "kitchen" },
  { id: 5, name: "Wardrobe", image: "/item.jpg", category: "wardrobe" },
  { id: 6, name: "TV Stand", image: "/item.jpg", category: "living" },
  { id: 7, name: "Oven", image: "/item.jpg", category: "kitchen" },
  { id: 8, name: "Coffee Table", image: "/item.jpg", category: "living" },
  { id: 9, name: "Mirror", image: "/item.jpg", category: "bathroom" },
  { id: 10, name: "Towel Rack", image: "/item.jpg", category: "bathroom" },
  { id: 11, name: "Dresser", image: "/item.jpg", category: "wardrobe" }
];

const categories = ["all", "bedroom", "wardrobe", "dining", "kitchen", "bathroom", "living"];

function CollectionsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  const isValidCategory = category === "all" || categories.includes(category);

  const filteredItems =
    category === "all" ? items : items.filter((item) => item.category === category);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    router.push(`${pathname}?${createQueryString('category', newCategory)}`);
  };

  return (
    <>
      <div className="w-full mb-6">
        {/* Mobile Dropdown */}
        <div className="sm:hidden">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {/* Desktop Buttons */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`${pathname}?${createQueryString('category', cat)}`}
              className={`px-4 py-2 rounded-full ${
                category === cat
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      {filteredItems.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <CollectionItem
              key={`${item.category}_${item.id}`}
              id={`${item.category}_${item.id}`}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-xl text-gray-600">
            {isValidCategory ? `No items found in the "${category}" category.` : "Invalid Category"}
          </p>
          <p className="mt-2 text-gray-500">
            Try selecting a different category or check back later.
          </p>
          <Link
            href={`${pathname}?${createQueryString("category", "all")}`}
            className="mt-4 inline-block rounded-full bg-gray-800 px-6 py-2 text-white transition-colors hover:bg-blue-600"
          >
            View All Items
          </Link>
        </div>
      )}
    </>
  );
}

export default function Collections() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center px-5 md:px-20 py-8">
      <h1 className="w-full mb-6 text-3xl font-bold">Our Collection</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CollectionsContent />
      </Suspense>
    </div>
  );
}