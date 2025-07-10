"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import CourseDetailHero from "@/components/course-detail-hero";
import CourseDetailTabs from "@/components/course-detail-tabs";
import CourseDetailSidebar from "@/components/course-detail-sidebar";
import Footer from "@/components/footer";
import { supabase } from "@/utils/supabase-client";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Courses")
        .select("*, category:Categories(*)")
        .eq("id", courseId)
        .single();

      if (error) {
        console.error("Error fetching course:", error);
      } else if (data) {
        setCourse(data);

        // Later replace with Supabase review fetching
        setReviews([
          {
            id: "1",
            name: "Priya Sharma",
            review:
              "Excellent course! The instructor was very knowledgeable and the content was well-structured.",
            rating: 5,
            created_at: "2024-01-15",
          },
          {
            id: "2",
            name: "Rajesh Kumar",
            review:
              "Great practical approach. I learned a lot and feel confident about implementing these skills.",
            rating: 5,
            created_at: "2024-01-10",
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handleAddReview = (newReview) => {
    const review = {
      id: Date.now().toString(),
      ...newReview,
      created_at: new Date().toISOString().split("T")[0],
    };
    setReviews([review, ...reviews]);
  };

  const handleEnroll = () => {
    console.log("Enroll in course:", course?.id);
    // Implement enrollment logic later
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The course you're looking for doesn't exist.
          </p>
          <a
            href="/courses"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Courses
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <CourseDetailHero course={course} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <CourseDetailTabs
                course={course}
                reviews={reviews}
                onAddReview={handleAddReview}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CourseDetailSidebar course={course} onEnroll={handleEnroll} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
