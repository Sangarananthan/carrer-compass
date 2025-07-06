"use client";

import { useState, useEffect, useMemo, use } from "react";
import CoursesHero from "@/components/courses-hero";
import CourseSearchFilters from "@/components/course-search-filters";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryModal from "@/components/category-modal";
import CourseModal from "@/components/course-modal";
import { supabase } from "../../utils/supabase-client";

export default function CoursesPage() {
  const dummyCourses = [];
  const dummyCategories = [];
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState(dummyCourses);
  const [categories, setCategories] = useState(dummyCategories);

  // Modal states
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState("");
  const [session, setSession] = useState(null);

  const intializeSession = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    console.log("Session Data:", sessionData.session);
    setSession(sessionData.session);
  };
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("Categories").select("*");
    if (data && !error) {
      setCategories(data);
    }
  };
  const fetchCourses = async () => {
    const { data, error } = await supabase.from("Courses").select("*");
    if (data && !error) {
      setCourses(data);
    }
    if (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    intializeSession();
    fetchCategories();
    fetchCourses();
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

  const openCategoryModal = (category) => {
    setSelectedCategory(category || null);
    setModalMode(category ? "edit" : "create");
    setCategoryModalOpen(true);
  };
  const openCourseModal = (course) => {
    setSelectedCourse(course || null);
    setModalMode(course ? "edit" : "create");
    setCourseModalOpen(true);
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
      {session?.user?.role === "authenticated" && (
        <div className="flex w-fit gap-[1rem] items-center mb-8 p-4 ml-auto">
          <Button
            onClick={() => openCategoryModal()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
          <Button
            onClick={() => openCourseModal()}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={categories.length === 0}
          >
            <Plus className="h-4 w-4 " />
            Add Course
          </Button>
        </div>
      )}

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
      <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => {
          setCategoryModalOpen(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
        mode={modalMode}
        session={session}
      />
      <CourseModal
        isOpen={courseModalOpen}
        onClose={() => {
          setCourseModalOpen(false);
          setSelectedCourse(null);
        }}
        course={selectedCourse}
        mode={modalMode}
        categories={categories}
        session={session}
      />
    </>
  );
}
