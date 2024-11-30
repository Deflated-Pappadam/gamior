"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


// Product Interface
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  material: string;
  dimensions: string;
  price: number;
  images: string[];
  specifications: string[];
}

// Dummy Product Data
const productData: Product = {
  id: 'console-table-01',
  name: 'Elegant Console Table',
  category: 'Living Room',
  description: 'A sophisticated console table crafted with precision, featuring clean lines and a minimalist design. Perfect for creating a statement in your living space or entryway.',
  material: 'Solid Oak Wood with Brushed Metal Accents',
  dimensions: '48" W x 16" D x 34" H',
  price: 1299.99,
  images: [
    '/collections/CONSOLE TABLE 1.jpg',
    '/collections/CONSOLE TABLE 2.jpg',
    '/collections/Console table.jpg'
  ],
  specifications: [
    'Hand-finished wood surface',
    'Sturdy metal frame',
    'Suitable for modern and contemporary interiors',
    'Weight capacity: 50 lbs',
    'Assembly required'
  ]
}

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#efefef] text-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 lg:px-8 min-h-[90vh] flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="relative h-[500px] w-full mb-4">
              <Image
                src={selectedImage}
                alt={productData.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md transition-all hover:brightness-90"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {productData.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative h-20 w-20 cursor-pointer ${
                    selectedImage === image ? 'border-2 border-black' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} - View ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{productData.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{productData.category}</p>
              <p className="text-3xl font-semibold text-gray-900"> &#8377;{productData.price.toFixed(2)}</p>
            </div>

            <p className="text-lg text-gray-700">{productData.description}</p>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Specifications</h3>
              <ul className="list-disc list-inside text-gray-700">
                {productData.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Product Details</h3>
              <div className="flex flex-col gap-2 text-gray-700">
                <div>
                  <strong>Material:</strong> {productData.material}
                </div>
                <div>
                  <strong>Dimensions:</strong> {productData.dimensions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;