"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useCourseStore } from "@/stores/courseStore";
import CoursesHero from "@/components/courses-hero";
import CourseSearchFilters from "@/components/course-search-filters";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryModal from "@/components/category-modal";
import CourseModal from "@/components/course-modal";
import { supabase } from "@/utils/supabase-client";
import EnrollmentModal from "@/components/enrollment-modal";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState("");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [activeEnrollCourse, setActiveEnrollCourse] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { categories, fetchCategories } = useCategoryStore();
  const { courses, fetchCourses, removeCourse } = useCourseStore();
  const { isAuthenticated, session, setSession } = useAuthStore();

  // Initialize session and categories
  useEffect(() => {
    const initializeData = async () => {
      try {
        await setSession();
        await fetchCategories();
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing data:", error);
        setIsInitialized(true); // Set to true even on error to prevent infinite loading
      }
    };
    
    initializeData();
  }, [setSession, fetchCategories]);

  // Handle URL parameters after categories are loaded
  useEffect(() => {
    if (isInitialized && categories.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get("category");
      
      if (categoryParam) {
        // Ensure the category exists in the categories array
        const categoryExists = categories.find(cat => cat.id === categoryParam || cat.id === parseInt(categoryParam));
        if (categoryExists) {
          setSelectedCategoryFilter(categoryParam);
        } else {
          console.warn(`Category with id ${categoryParam} not found`);
          // Optionally clear the invalid category parameter from URL
          const newUrl = new URL(window.location);
          newUrl.searchParams.delete("category");
          window.history.replaceState({}, "", newUrl);
        }
      }
    }
  }, [isInitialized, categories]);

  // Fetch courses when search term or category filter changes
  useEffect(() => {
    if (isInitialized) {
      fetchCourses({ searchTerm, categoryFilter: selectedCategoryFilter });
    }
  }, [searchTerm, selectedCategoryFilter, fetchCourses, isInitialized]);

  // Update URL when category filter changes (optional - for maintaining URL state)
  useEffect(() => {
    if (isInitialized) {
      const url = new URL(window.location);
      if (selectedCategoryFilter) {
        url.searchParams.set("category", selectedCategoryFilter);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState({}, "", url);
    }
  }, [selectedCategoryFilter, isInitialized]);

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const { error } = await supabase
          .from("Courses")
          .delete()
          .eq("id", courseId);
        if (error) {
          console.error("Error deleting course:", error);
          alert("Failed to delete course");
        } else {
          removeCourse(courseId);
          alert("Course deleted successfully");
        }
      } catch (err) {
        console.error("Error deleting course:", err);
        alert("Failed to delete course");
      }
    }
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <CoursesHero />
      <CourseSearchFilters
        categories={categories}
        onSearchChange={setSearchTerm}
        onCategoryFilter={setSelectedCategoryFilter}
        selectedCategory={selectedCategoryFilter}
        searchTerm={searchTerm}
        authenticated={isAuthenticated}
        onEditCategory={(category) => {
          setSelectedCategoryModal(category);
          setModalMode("edit");
          setCategoryModalOpen(true);
        }}
      />
      {isAuthenticated && (
        <div className="flex w-fit gap-[1rem] items-center mb-8 p-4 ml-auto">
          <Button
            onClick={() => {
              setSelectedCategoryModal(null);
              setModalMode("create");
              setCategoryModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
          <Button
            onClick={() => {
              setSelectedCourse(null);
              setModalMode("create");
              setCourseModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={categories.length === 0}
          >
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </div>
      )}
      <section className="py-[1rem]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategoryFilter
                  ? `${categories.find((c) => c.id === selectedCategoryFilter || c.id === parseInt(selectedCategoryFilter))?.name || 'Unknown Category'} Courses`
                  : "All Courses"}
              </h2>
              <p className="text-gray-600 mt-1">
                {courses.length} course{courses.length !== 1 ? "s" : ""} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onPreview={() =>
                    (window.location.href = `/courses/${course.id}`)
                  }
                  onEnroll={() => {
                    setActiveEnrollCourse(course);
                    setEnrollModalOpen(true);
                  }}
                  isEditable={isAuthenticated}
                  onEdit={() => {
                    setSelectedCourse(course);
                    setModalMode("edit");
                    setCourseModalOpen(true);
                  }}
                  onDelete={() => handleDeleteCourse(course.id)}
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
                  setSelectedCategoryFilter(null);
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
          setSelectedCategoryModal(null);
          fetchCategories();
        }}
        category={selectedCategoryModal}
        mode={modalMode}
        session={session}
      />
      <CourseModal
        isOpen={courseModalOpen}
        onClose={() => {
          setCourseModalOpen(false);
          setSelectedCourse(null);
          fetchCourses({ searchTerm, categoryFilter: selectedCategoryFilter });
        }}
        course={selectedCourse}
        mode={modalMode}
        categories={categories}
        session={session}
      />
      <EnrollmentModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        preSelectedCourse={activeEnrollCourse}
      />
    </>
  );
}
