"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "../utils/supabase-client";
export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("Categories")
      .select("*")
      .eq("show_on_home", true)
      .limit(3);

    if (data && !error) {
      setCategories(data);
    }
  };

  const handleCategoryClick = (categoryId) => {
    window.location.href = `/courses?category=${categoryId}`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">Top Categories</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
            Most demanding <span className="text-blue-600">Categories.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group p-0 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 border-0 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm rounded-3xl overflow-hidden hover:scale-105"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="p-0  relative">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image section */}
                <div className="relative h-48 bg-gradient-to-br  flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0  group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300" />
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET}/${category.image_url}` ||
                      "/placeholder.svg?height=120&width=120"
                    }
                    alt={category.name}
                   fill
                    className="object-cover rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10"
                  />

                  {/* Floating decoration */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-6 space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-blue-500 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {category.description}
                  </p>

                
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
