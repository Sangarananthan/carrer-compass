"use client";

import {  useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";
import { useCourseStore } from "@/stores/courseStore";

export default function PopularCoursesSection() {
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses({ isPopular: true });
  }, []);

  const handlePreviewCourse = (courseId) => {
    window.location.href = `/courses/${courseId}`;
  };

  return (
    <section className="py-[1rem]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">Our Courses</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
            Most Popular <span className="text-blue-600">Courses</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="flex flex-col h-full gap-0 p-0 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET}/${course.image_url}` ||
                    "/placeholder.svg?height=120&width=120"
                  }
                  alt={course.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    Popular Course
                  </span>
                </div>
              </div>

              <CardContent className="flex flex-col flex-grow p-[1rem]">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {course.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.overview}
                </p>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />6 months
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    onClick={() => handlePreviewCourse(course.id)}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Preview this Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
