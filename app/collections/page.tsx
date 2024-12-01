"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import CollectionItem from "./_components/CollectionItem";
import Navbar from "../components/Navbar";
import {
  ChevronDown,
  Grid,
  Grid2X2,
  Grid3x3,
  Grid3X3,
  LayoutGrid,
  List
} from "lucide-react";

const items = [
  { id: 1, name: "Bathroom", image: "/collections/BATHROOM 1.jpg", category: "bathroom" },
  { id: 2, name: "Bathroom", image: "/collections/Bathroom 3.jpg", category: "bathroom" },
  { id: 3, name: "Bathroom", image: "/collections/BATHROOM.jpg", category: "bathroom" },
  {
    id: 4,
    name: "Bed with Side Table",
    image: "/collections/BED WITH SIDE TABLE 1.jpg",
    category: "bedroom"
  },
  {
    id: 5,
    name: "Bed with Side Table",
    image: "/collections/BED WITH SIDE TABLE 3.jpg",
    category: "bedroom"
  },
  {
    id: 6,
    name: "Console Table",
    image: "/collections/CONSOLE TABLE 1.jpg",
    category: "living"
  },
  {
    id: 7,
    name: "Console Table",
    image: "/collections/CONSOLE TABLE 2.jpg",
    category: "living"
  },
  {
    id: 8,
    name: "Console Table",
    image: "/collections/Console table.jpg",
    category: "living"
  },
  {
    id: 9,
    name: "Dressing Unit",
    image: "/collections/DRESSING UNIT1.jpg",
    category: "wardrobe"
  },
  {
    id: 10,
    name: "Dining Room",
    image: "/collections/DIning living.jpg",
    category: "dining"
  },
  {
    id: 11,
    name: "Dining Room",
    image: "/collections/Dining room 1.jpg",
    category: "dining"
  },
  {
    id: 12,
    name: "Dining Room",
    image: "/collections/Dining room 2.jpg",
    category: "dining"
  },
  {
    id: 13,
    name: "Dining Room",
    image: "/collections/Dining room 3.jpg",
    category: "dining"
  },
  {
    id: 14,
    name: "Dining Room",
    image: "/collections/DINING ROOM4.jpg",
    category: "dining"
  },
  {
    id: 15,
    name: "Dressing Unit",
    image: "/collections/DRESSING 3.jpg",
    category: "wardrobe"
  },
  { id: 16, name: "Kitchen", image: "/collections/Kitchen 1.jpg", category: "kitchen" },
  {
    id: 17,
    name: "Kitchen",
    image: "/collections/KITCHEN 1280x640.jpg",
    category: "kitchen"
  },
  { id: 18, name: "Kitchen", image: "/collections/Kitchen 2.jpg", category: "kitchen" },
  { id: 19, name: "Kitchen", image: "/collections/Kitchen 3.jpg", category: "kitchen" },
  { id: 20, name: "Kitchen", image: "/collections/Kitchen 4.jpg", category: "kitchen" },
  { id: 21, name: "Kitchen", image: "/collections/KITCHEN 5.png", category: "kitchen" },
  {
    id: 22,
    name: "Kitchen View",
    image: "/collections/KITCHEN VIEW 1 1280x640.png",
    category: "kitchen"
  },
  {
    id: 23,
    name: "Living Room",
    image: "/collections/LIVING ROOM 1.jpg",
    category: "living"
  },
  {
    id: 24,
    name: "Living Room",
    image: "/collections/LIVING ROOM 2.jpg",
    category: "living"
  },
  {
    id: 25,
    name: "Living Room",
    image: "/collections/Living room 3.jpg",
    category: "living"
  },
  {
    id: 26,
    name: "Living Room",
    image: "/collections/LIVING ROOM 4.png",
    category: "living"
  },
  {
    id: 27,
    name: "Living Room",
    image: "/collections/LIVING room2.jpg",
    category: "living"
  },
  { id: 28, name: "Partition", image: "/collections/Partition.jpg", category: "living" },
  {
    id: 29,
    name: "Pooja Unit",
    image: "/collections/pooja unit 1.jpg",
    category: "living"
  },
  {
    id: 30,
    name: "Pooja Unit",
    image: "/collections/Pooja unit 2.jpg",
    category: "living"
  },
  {
    id: 31,
    name: "Stair Case",
    image: "/collections/STAIR CASE 1.jpg",
    category: "staircase"
  },
  { id: 32, name: "TV Unit", image: "/collections/TV UNIT 1.jpg", category: "living" },
  {
    id: 33,
    name: "TV Unit",
    image: "/collections/TV UNIT 1280x640.jpg",
    category: "living"
  },
  { id: 34, name: "TV Unit", image: "/collections/TV UNIT 2.png", category: "living" },
  { id: 35, name: "TV Unit", image: "/collections/TV Unit 3.jpg", category: "living" },
  { id: 36, name: "TV Unit", image: "/collections/TV unit 4.png", category: "living" },
  { id: 37, name: "TV Unit", image: "/collections/TV UNIT 5.jpg", category: "living" },
  {
    id: 38,
    name: "Wardrobe",
    image: "/collections/Wardrobe 1.jpg",
    category: "wardrobe"
  },
  {
    id: 39,
    name: "Wardrobe",
    image: "/collections/Wardrobe 2.jpg",
    category: "wardrobe"
  },
  {
    id: 40,
    name: "Wardrobe",
    image: "/collections/Wardrobe 3.jpg",
    category: "wardrobe"
  },
  {
    id: 41,
    name: "Wardrobe",
    image: "/collections/Wardrobe 4.png",
    category: "wardrobe"
  },
  {
    id: 42,
    name: "Wardrobe",
    image: "/collections/wardrobe 5.jpg",
    category: "wardrobe"
  },
  { id: 43, name: "Wardrobe", image: "/collections/wardrobe.jpg", category: "wardrobe" },
  { id: 44, name: "Wardrobe", image: "/collections/wardrobe1.jpg", category: "wardrobe" },
  {
    id: 45,
    name: "Wash Counter",
    image: "/collections/wash counter 1.jpg",
    category: "bathroom"
  },
  {
    id: 46,
    name: "Wash Counter",
    image: "/collections/WASH COUNTER 2.jpg",
    category: "bathroom"
  },
  {
    id: 47,
    name: "Wash Counter",
    image: "/collections/Wash counter 3.jpg",
    category: "bathroom"
  },
  {
    id: 48,
    name: "Wash Counter",
    image: "/collections/Wash counter 4.jpg",
    category: "bathroom"
  },
  {
    id: 49,
    name: "Wash Counter",
    image: "/collections/WASH COUNTER 5.jpg",
    category: "bathroom"
  }
];

const categories = [
  "all",
  "bedroom",
  "wardrobe",
  "dining",
  "kitchen",
  "bathroom",
  "living",
  "staircase"
];
function CollectionsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"1" | "2" | "3">("3");

  const category = searchParams.get("category") || "all";
  const isValidCategory = category === "all" || categories.includes(category);

  const filteredItems =
    category === "all" ? items : items.filter((item) => item.category === category);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleCategoryChange = (newCategory: string) => {
    router.push(`${pathname}?${createQueryString("category", newCategory)}`);
    setIsCategoryDropdownOpen(false);
  };

  return (
    <div className="mt-[15vh] w-full p-5 text-black md:p-10 cabin-light">
      {/* Mobile Category Selector */}
      <div className="relative mb-4 sm:hidden">
        <button
          onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          className="flex w-full items-center justify-between rounded-lg bg-white p-3 shadow-md"
        >
          <span className="text-lg capitalize cabin-light">
            {category === "all" ? "All Categories" : category}
          </span>
          <ChevronDown
            className={`transition-transform ${isCategoryDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isCategoryDropdownOpen && (
          <div className="absolute z-10 mt-2 w-full rounded-lg bg-white text-black shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`w-full text-black p-3 text-left hover:bg-gray-100 ${
                  category === cat ? "bg-gray-200" : ""
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Category Buttons */}
      <div className="mb-6 hidden items-center justify-between sm:flex">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`${pathname}?${createQueryString("category", cat)}`}
              className={`rounded-md px-4 py-2 transition-colors ${
                category === cat
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("2")}
            className={`rounded p-2 ${
              viewMode === "2" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
            }`}
            title="Two Columns View"
          >
            <LayoutGrid />
          </button>
          <button
            onClick={() => setViewMode("3")}
            className={`rounded p-2 ${
              viewMode === "3" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
            }`}
            title="Three Columns View"
          >
            <Grid3x3 />
          </button>
        </div>
      </div>

      {/* Items Display */}
      {filteredItems.length > 0 ? (
        <div
          className={`grid w-full grid-cols-1 gap-4 ${
            viewMode === "3"
              ? "md:grid-cols-3"
              : viewMode === "2"
                ? "md:grid-cols-2"
                : "grid-cols-1"
          }`}
        >
          {filteredItems.map((item) => (
            <CollectionItem
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No items found in this category.</p>
      )}
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <main className="h-full w-full bg-[#efefef] p-5">
      <Suspense>
        <Navbar />
        <CollectionsContent />
      </Suspense>
    </main>
  );
}
