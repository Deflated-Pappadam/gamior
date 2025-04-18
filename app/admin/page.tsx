"use client";

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from "firebase/firestore";
import { db } from "../firebase/config";
import Navbar from "../components/Navbar";
import { Plus, Edit, Trash2, Save, X, Loader2, Image } from "lucide-react";
import { useRouter } from "next/navigation";

// Type definitions
interface CollectionItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  createdAt?: Timestamp;
}

interface FormData {
  name: string;
  category: string;
  price: string;
  image: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "living",
    price: "",
    image: ""
  });

  // Categories
  const categories: string[] = [
    "bedroom",
    "wardrobe",
    "dining",
    "kitchen",
    "bathroom",
    "living",
    "staircase"
  ];

  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      if (!isAdmin) {
        router.push("/auth");
      } else {
        setIsAuthenticated(true);
        fetchItems();
      }
    };

    checkAuth();
  }, [router]);

  // Fetch items from Firestore
  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "collectionItems"));
      const itemsList = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data()
          }) as CollectionItem
      );
      setItems(itemsList);
    } catch (error) {
      console.error("Error fetching items:", error);
      alert("Error fetching items. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to ImgBB
  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;

    setUploadingImage(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = "3590c27f6001e32a5f88aefe486faa86";

      // Make API request to ImgBB
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        return data.data.url; // Return the image URL
      } else {
        throw new Error("Failed to upload image to ImgBB");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Add new item
  const addItem = async () => {
    try {
      setLoading(true);

      // Validate form data
      if (!formData.name || !formData.category || !formData.price || !imageFile) {
        alert("All fields are required!");
        setLoading(false);
        return;
      }

      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          setLoading(false);
          return;
        }
      }

      const newItem = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        image: imageUrl || "",
        createdAt: Timestamp.fromDate(new Date())
      };

      await addDoc(collection(db, "collectionItems"), newItem);
      setIsAddingNew(false);
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Start editing an item
  const startEdit = (item: CollectionItem) => {
    setEditingItem(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image
    });
    setImagePreview(item.image);
  };

  // Update item
  const updateItem = async (id: string | null) => {
    try {
      if (!id) {
        console.error("Invalid item ID");
        return;
      }

      setLoading(true);

      let updatedData = { ...formData };

      // Upload new image if provided
      if (imageFile) {
        const newImageUrl = await uploadImage(imageFile);
        if (!newImageUrl) {
          setLoading(false);
          return;
        }
        updatedData.image = newImageUrl;
      }

      const itemRef = doc(db, "collectionItems", id);
      await updateDoc(itemRef, updatedData);

      setEditingItem(null);
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, "collectionItems", id));
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      category: "living",
      price: "",
      image: ""
    });
    setImageFile(null);
    setImagePreview(null);
  };

  // Cancel editing or adding
  const cancelAction = () => {
    setEditingItem(null);
    setIsAddingNew(false);
    resetForm();
  };

  // If authentication check is in progress, show loading
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Collection Items Management
          </h1>

          {!isAddingNew && !editingItem && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {(isAddingNew || editingItem) && (
          <div className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-medium text-gray-900">
              {isAddingNew ? "Add New Item" : "Edit Item"}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="₹50,000"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                    id="item-image"
                  />
                  <label
                    htmlFor="item-image"
                    className="flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <Image className="mr-2 h-5 w-5" />
                    {imageFile ? "Change Image" : "Select Image"}
                  </label>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image Preview
                </label>
                <div className="mt-1 h-40 w-full overflow-hidden rounded-md border border-gray-300 bg-gray-100">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={cancelAction}
                className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </button>

              <button
                onClick={isAddingNew ? addItem : () => updateItem(editingItem)}
                disabled={loading || uploadingImage}
                className="flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
              >
                {loading || uploadingImage ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isAddingNew ? "Add Item" : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Items Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            {loading && !isAddingNew && !editingItem ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
              </div>
            ) : items.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-100">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                                width={48}
                                height={48}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                <Image className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm capitalize text-gray-500">
                            {item.category}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">{item.price}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => startEdit(item)}
                              className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center">
                <p className="text-gray-500">No collection items found.</p>
                {!isAddingNew && (
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="mt-4 flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Item
                  </button>
                )}
              </div>
            )}
            {!isAddingNew && !editingItem && (
              <button
                onClick={() => setIsAddingNew(true)}
                className="flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
