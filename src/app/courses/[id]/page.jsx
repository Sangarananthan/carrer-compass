"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CourseDetailHero from "@/components/course-detail-hero";
import CourseDetailTabs from "@/components/course-detail-tabs";
import CourseDetailSidebar from "@/components/course-detail-sidebar";
import { supabase } from "@/utils/supabase-client";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!courseId) return;

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
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("CourseReview")
          .select("*")
          .eq("course_id", courseId)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching reviews:", error);
        } else {
          setReviews(data || []);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchCourseDetails();
    fetchReviews();
  }, [courseId]);

  const handleAddReview = async (newReview) => {
    try {
      const { data, error } = await supabase
        .from("CourseReview")
        .insert([
          {
            course_id: parseInt(courseId),
            name: newReview.name,
            review: newReview.review,
            rating: newReview.rating,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error adding review:", error);
        alert("Failed to add review. Please try again.");
      } else {
        setReviews([data, ...reviews]);
      }
    } catch (err) {
      console.error("Error adding review:", err);
      alert("Failed to add review. Please try again.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!session) {
      alert("You must be logged in to delete reviews.");
      return;
    }

    if (!confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("CourseReview")
        .delete()
        .eq("id", reviewId);

      if (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review. Please try again.");
      } else {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review. Please try again.");
    }
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
            <div className="lg:col-span-2">
              <CourseDetailTabs
                course={course}
                reviews={reviews}
                onAddReview={handleAddReview}
                onDeleteReview={handleDeleteReview}
                isAuthenticated={!!session}
              />
            </div>

            <div className="lg:col-span-1">
              <CourseDetailSidebar course={course} onEnroll={handleEnroll} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
