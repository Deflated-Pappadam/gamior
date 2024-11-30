"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import CollectionItem from "./_components/CollectionItem";

const items = [
  { id: 1, name: "Bathroom", image: "/collections/BATHROOM 1.jpg", category: "bathroom" },
  { id: 2, name: "Bathroom", image: "/collections/Bathroom 3.jpg", category: "bathroom" },
  { id: 3, name: "Bathroom", image: "/collections/BATHROOM.jpg", category: "bathroom" },
  { id: 4, name: "Bed with Side Table", image: "/collections/BED WITH SIDE TABLE 1.jpg", category: "bedroom" },
  { id: 5, name: "Bed with Side Table", image: "/collections/BED WITH SIDE TABLE 3.jpg", category: "bedroom" },
  { id: 6, name: "Console Table", image: "/collections/CONSOLE TABLE 1.jpg", category: "living" },
  { id: 7, name: "Console Table", image: "/collections/CONSOLE TABLE 2.jpg", category: "living" },
  { id: 8, name: "Console Table", image: "/collections/Console table.jpg", category: "living" },
  { id: 9, name: "Dressing Unit", image: "/collections/DRESSING UNIT1.jpg", category: "wardrobe" },
  { id: 10, name: "Dining Room", image: "/collections/DIning living.jpg", category: "dining" },
  { id: 11, name: "Dining Room", image: "/collections/Dining room 1.jpg", category: "dining" },
  { id: 12, name: "Dining Room", image: "/collections/Dining room 2.jpg", category: "dining" },
  { id: 13, name: "Dining Room", image: "/collections/Dining room 3.jpg", category: "dining" },
  { id: 14, name: "Dining Room", image: "/collections/DINING ROOM4.jpg", category: "dining" },
  { id: 15, name: "Dressing Unit", image: "/collections/DRESSING 3.jpg", category: "wardrobe" },
  { id: 16, name: "Kitchen", image: "/collections/Kitchen 1.jpg", category: "kitchen" },
  { id: 17, name: "Kitchen", image: "/collections/KITCHEN 1280x640.jpg", category: "kitchen" },
  { id: 18, name: "Kitchen", image: "/collections/Kitchen 2.jpg", category: "kitchen" },
  { id: 19, name: "Kitchen", image: "/collections/Kitchen 3.jpg", category: "kitchen" },
  { id: 20, name: "Kitchen", image: "/collections/Kitchen 4.jpg", category: "kitchen" },
  { id: 21, name: "Kitchen", image: "/collections/KITCHEN 5.png", category: "kitchen" },
  { id: 22, name: "Kitchen View", image: "/collections/KITCHEN VIEW 1 1280x640.png", category: "kitchen" },
  { id: 23, name: "Living Room", image: "/collections/LIVING ROOM 1.jpg", category: "living" },
  { id: 24, name: "Living Room", image: "/collections/LIVING ROOM 2.jpg", category: "living" },
  { id: 25, name: "Living Room", image: "/collections/Living room 3.jpg", category: "living" },
  { id: 26, name: "Living Room", image: "/collections/LIVING ROOM 4.png", category: "living" },
  { id: 27, name: "Living Room", image: "/collections/LIVING room2.jpg", category: "living" },
  { id: 28, name: "Partition", image: "/collections/Partition.jpg", category: "living" },
  { id: 29, name: "Pooja Unit", image: "/collections/pooja unit 1.jpg", category: "living" },
  { id: 30, name: "Pooja Unit", image: "/collections/Pooja unit 2.jpg", category: "living" },
  { id: 31, name: "Stair Case", image: "/collections/STAIR CASE 1.jpg", category: "staircase" },
  { id: 32, name: "TV Unit", image: "/collections/TV UNIT 1.jpg", category: "living" },
  { id: 33, name: "TV Unit", image: "/collections/TV UNIT 1280x640.jpg", category: "living" },
  { id: 34, name: "TV Unit", image: "/collections/TV UNIT 2.png", category: "living" },
  { id: 35, name: "TV Unit", image: "/collections/TV Unit 3.jpg", category: "living" },
  { id: 36, name: "TV Unit", image: "/collections/TV unit 4.png", category: "living" },
  { id: 37, name: "TV Unit", image: "/collections/TV UNIT 5.jpg", category: "living" },
  { id: 38, name: "Wardrobe", image: "/collections/Wardrobe 1.jpg", category: "wardrobe" },
  { id: 39, name: "Wardrobe", image: "/collections/Wardrobe 2.jpg", category: "wardrobe" },
  { id: 40, name: "Wardrobe", image: "/collections/Wardrobe 3.jpg", category: "wardrobe" },
  { id: 41, name: "Wardrobe", image: "/collections/Wardrobe 4.png", category: "wardrobe" },
  { id: 42, name: "Wardrobe", image: "/collections/wardrobe 5.jpg", category: "wardrobe" },
  { id: 43, name: "Wardrobe", image: "/collections/wardrobe.jpg", category: "wardrobe" },
  { id: 44, name: "Wardrobe", image: "/collections/wardrobe1.jpg", category: "wardrobe" },
  { id: 45, name: "Wash Counter", image: "/collections/wash counter 1.jpg", category: "bathroom" },
  { id: 46, name: "Wash Counter", image: "/collections/WASH COUNTER 2.jpg", category: "bathroom" },
  { id: 47, name: "Wash Counter", image: "/collections/Wash counter 3.jpg", category: "bathroom" },
  { id: 48, name: "Wash Counter", image: "/collections/Wash counter 4.jpg", category: "bathroom" },
  { id: 49, name: "Wash Counter", image: "/collections/WASH COUNTER 5.jpg", category: "bathroom" },
];


const categories = ["all", "bedroom", "wardrobe", "dining", "kitchen", "bathroom", "living","staircase"];

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
      <div className="w-full mb-6 bg-[#efefef]">
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
              className={`px-6 py-2 rounded-md ${
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
    <div className="flex h-full min-h-screen flex-col items-center px-5 md:px-20 py-8 bg-[#efefef]">
      <h1 className="w-full mb-6 text-3xl font-bold text-black cabin-light">Our Collection</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CollectionsContent />
      </Suspense>
    </div>
  );
}