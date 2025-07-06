"use client";

import { useState, useEffect, useMemo } from "react";
import CoursesHero from "@/components/courses-hero";
import CourseSearchFilters from "@/components/course-search-filters";
import CourseCard from "@/components/course-card";

export default function CoursesPage() {
  const dummyCourses = [];
  const dummyCategories = [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [courses, setCourses] = useState(dummyCourses);
  const [categories, setCategories] = useState(dummyCategories);

  // Check for category filter from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  // Filter courses based on search and category
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === null || course.category.id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  const handlePreviewCourse = (courseId) => {
    window.location.href = `/courses/${courseId}`;
  };

  const handleEnrollCourse = (course) => {
    // The enrollment modal will be handled by the CourseCard component
    console.log("Enroll in course:", course.id);
  };

  return (
    <>
      <CoursesHero />

      <CourseSearchFilters
        categories={categories}
        onSearchChange={setSearchTerm}
        onCategoryFilter={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
      />

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory
                  ? `${
                      categories.find((c) => c.id === selectedCategory)?.name
                    } Courses`
                  : "All Courses"}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onPreview={handlePreviewCourse}
                  onEnroll={handleEnrollCourse}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
