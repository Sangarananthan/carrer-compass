"use client";

import { useState, useEffect } from "react";
import CoursesHero from "@/components/courses-hero";
import CourseSearchFilters from "@/components/course-search-filters";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryModal from "@/components/category-modal";
import CourseModal from "@/components/course-modal";
import { supabase } from "@/utils/supabase-client";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState("");
  const [session, setSession] = useState(null);

  const intializeSession = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    setSession(sessionData.session);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("Categories").select("*");
    if (data && !error) {
      setCategories(data);
    }
  };

  const fetchCourses = async () => {
    let query = supabase.from("Courses").select("*, category:Categories(*)");

    if (searchTerm.trim() !== "") {
      query = query.or(
        `name.ilike.%${searchTerm}%,overview.ilike.%${searchTerm}%`
      );
    }

    if (selectedCategoryFilter) {
      query = query.eq("category_id", selectedCategoryFilter);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (data && !error) {
      setCourses(data);
    }
    if (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const deleteCourse = async (courseId) => {
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
          fetchCourses();
          alert("Course deleted successfully");
        }
      } catch (err) {
        console.error("Error deleting course:", err);
        alert("Failed to delete course");
      }
    }
  };

  useEffect(() => {
    intializeSession();
    fetchCategories();

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
      setSelectedCategoryFilter(categoryParam);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [searchTerm, selectedCategoryFilter]);

  const handlePreviewCourse = (courseId) => {
    window.location.href = `/courses/${courseId}`;
  };

  const handleEnrollCourse = (course) => {
    console.log("Enroll in course:", course.id);
  };

  const openCategoryModal = (category) => {
    setSelectedCategoryModal(category || null);
    setModalMode(category ? "edit" : "create");
    setCategoryModalOpen(true);
  };

  const openCourseModal = (course) => {
    console.log("Opening course modal with:", course); 
    setSelectedCourse(course || null);
    setModalMode(course ? "edit" : "create");
    setCourseModalOpen(true);
  };

  const handleCourseModalClose = () => {
    setCourseModalOpen(false);
    setSelectedCourse(null);
    fetchCourses();
  };

  const handleCategoryModalClose = () => {
    setCategoryModalOpen(false);
    setSelectedCategoryModal(null);
    fetchCategories();
  };

  return (
    <>
      <CoursesHero />

        <CourseSearchFilters
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryFilter={setSelectedCategoryFilter}
          selectedCategory={selectedCategoryFilter}
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
                  ? `${categories.find((c) => c.id === selectedCategoryFilter)?.name} Courses`
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
                  onPreview={handlePreviewCourse}
                  onEnroll={handleEnrollCourse}
                  isEditable={session?.user?.role === "authenticated"}
                  onEdit={() => openCourseModal(course)}
                  onDelete={() => deleteCourse(course.id)}
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
        onClose={handleCategoryModalClose}
        category={selectedCategoryModal}
        mode={modalMode}
        session={session}
      />

      <CourseModal
        isOpen={courseModalOpen}
        onClose={handleCourseModalClose}
        course={selectedCourse}
        mode={modalMode}
        categories={categories}
        session={session}
      />
    </>
  );
}
