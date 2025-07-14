"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCourseStore } from "@/stores/courseStore";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { courses, fetchCourses } = useCourseStore();
  
  useEffect(() => {
    fetchCourses({ isRandom: true });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courses.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [courses.length]);

  const handlePreviewCourse = (courseId) => {
    window.location.href = `/courses/${courseId}`;
  };
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-4 py-6 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-blue-600 font-medium text-lg">
                Get trained by Industry Experts
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Classroom or live online{" "}
                <span className="text-blue-600">
                  instruction with an instructor
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                with Complete Placement Assistance
              </p>
            </div>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full"
              onClick={() => (window.location.href = "/courses")}
            >
              Find Courses →
            </Button>
          </div>

          <div className="relative">
            <div className="relative">
              <Image
                src="/images/hero.png"
                alt="Learning Experience"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
                priority
              />
              {courses.length > 0 && (
                <div
                  onClick={() => handlePreviewCourse(courses[currentSlide]?.id)}
                  className="absolute -bottom-6 md:-bottom-20 right-2 lg:right-10 w-[320px] h-[115px]"
                >
                  <div className="w-full h-full shadow-xl bg-white rounded-lg p-4">
                    <div className="flex items-start space-x-4 h-full">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={
                            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET}/${courses[currentSlide]?.image_url}` ||
                            "/placeholder.svg?height=120&width=120"
                          }
                          alt={courses[currentSlide]?.name}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 h-full flex flex-col">
                        <p className="text-xs text-blue-600 font-medium mb-1">
                          {courses[currentSlide]?.category["name"]}{" "}
                        </p>

                        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                          {courses[currentSlide]?.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
