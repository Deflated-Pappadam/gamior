"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { db } from "../firebase/config";
import {
  ChevronDown,
  Grid3x3,
  LayoutGrid,
  Loader2,
  SlidersHorizontal,
  X
} from "lucide-react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";

// Sort options configuration
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" }
];

// Category options
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

// Default items for fallback or initial state
const defaultItems: { id: number; name: string; image: string; category: string; price: string }[] = [

];

function CollectionsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // UI state
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("3");

  // Data state
  const [items, setItems] = useState<
    { id: number; name: string; image: string; category: string; price: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Get URL parameters with fallbacks
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "featured";

  // Fetch items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let itemsQuery;

        // Apply category filter if not "all"
        if (category !== "all") {
          itemsQuery = query(
            collection(db, "collectionItems"),
            where("category", "==", category)
          );
        } else {
          itemsQuery = collection(db, "collectionItems");
        }

        const querySnapshot = await getDocs(itemsQuery);

        // Handle empty data case
        if (querySnapshot.empty) {
          console.log("No collection items found in database");
          setItems(
            defaultItems.filter(
              (item) => category === "all" || item.category === category
            )
          );
          return;
        }

        let fetchedItems = querySnapshot.docs.map((doc) => ({
          id: parseInt(doc.id, 10) || 0, // Convert id to number with fallback
          name: doc.data().name || "Unnamed Design", // Ensure name exists
          image: doc.data().image || "/placeholder.jpg", // Ensure image exists
          price: doc.data().price || "₹0", // Ensure price is a string
          category: doc.data().category || "other" // Ensure category exists
        }));

        // Apply sorting
        fetchedItems = sortItems(fetchedItems, sortBy);

        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
        // Fallback to default items if there's an error
        setItems(
          defaultItems.filter((item) => category === "all" || item.category === category)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [category, sortBy]);

  // Sort items function with type safety
  const sortItems = (
    itemsToSort: {
      id: number;
      name: string;
      image: string;
      category: string;
      price: string;
      createdAt?: Timestamp;
    }[],
    sortMethod: string
  ) => {
    return [...itemsToSort].sort((a, b) => {
      switch (sortMethod) {
        case "price-asc":
          // Safely extract numeric values from price strings
          const priceA = parseFloat(String(a.price).replace(/[^\d.]/g, "")) || 0;
          const priceB = parseFloat(String(b.price).replace(/[^\d.]/g, "")) || 0;
          return priceA - priceB;
        case "price-desc":
          const priceADesc = parseFloat(String(a.price).replace(/[^\d.]/g, "")) || 0;
          const priceBDesc = parseFloat(String(b.price).replace(/[^\d.]/g, "")) || 0;
          return priceBDesc - priceADesc;
        case "name-asc":
          return String(a.name).localeCompare(String(b.name));
        case "name-desc":
          return String(b.name).localeCompare(String(a.name));
        case "newest":
          // Safely handle date values with fallbacks
          const dateA =
            a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(0);
          const dateB =
            b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(0);
          return dateB.getTime() - dateA.getTime();
        default: // featured
          return 0;
      }
    });
  };

  // URL handling functions
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleCategoryChange = (newCategory: string) => {
    router.push(`${pathname}?${createQueryString("category", newCategory)}`);
    setIsCategoryDropdownOpen(false);
  };

  const handleSortChange = (newSort: string) => {
    router.push(`${pathname}?${createQueryString("sort", newSort)}`);
    setIsSortDropdownOpen(false);
  };

  // Find the current sort label
  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || "Featured";

  return (
    <div className="w-full text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900">Collection</h1>
          <p className="mt-2 text-gray-600">
            Explore our curated interior design solutions
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="mb-8 flex flex-col items-start justify-between border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="mb-4 flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:hidden"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </button>

          {/* Desktop Category Pills */}
          <div className="hidden space-x-2 sm:flex">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`${pathname}?${createQueryString("category", cat)}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Link>
            ))}
          </div>

          {/* Sort and View Options */}
          <div className="flex w-full items-center justify-between sm:w-auto">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Sort: {currentSortLabel}
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isSortDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          sortBy === option.value
                            ? "bg-gray-100 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="ml-4 hidden items-center space-x-2 sm:flex">
              <button
                onClick={() => setViewMode("2")}
                className={`rounded p-2 ${
                  viewMode === "2"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                title="Two Columns View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("3")}
                className={`rounded p-2 ${
                  viewMode === "3"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                title="Three Columns View"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-40 flex sm:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={() => setIsFilterOpen(false)}
            ></div>
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="mt-4 border-t border-gray-200">
                <h3 className="px-4 py-3 text-sm font-medium text-gray-900">
                  Categories
                </h3>
                <div className="flex flex-col px-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        handleCategoryChange(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`mb-2 rounded-md px-3 py-2 text-left text-sm ${
                        category === cat
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Items Display */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
          </div>
        ) : items.length > 0 ? (
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
              viewMode === "3" ? "lg:grid-cols-3" : "lg:grid-cols-2"
            }`}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-lg bg-white shadow-none transition-all hover:shadow-md"
              >
                <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-64 w-full object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm capitalize text-gray-500">
                        {item.category}
                      </p>
                    </div>
                    <p className="text-base font-medium text-gray-900">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <p className="text-center text-gray-500">
              No designs found in this category.
            </p>
          </div>
        )}

        {/* Collection Stats */}
        <div className="mt-12 border-t border-gray-200 pb-12 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Showing {items.length} designs {category !== "all" ? `in ${category}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
          </div>
        }
      >
        <Navbar />
        <CollectionsContent />
      </Suspense>
    </main>
  );
}
