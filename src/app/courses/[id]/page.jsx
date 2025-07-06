"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import CourseDetailHero from "@/components/course-detail-hero";
import CourseDetailTabs from "@/components/course-detail-tabs";
import CourseDetailSidebar from "@/components/course-detail-sidebar";
import Footer from "@/components/footer";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const dummyCourses = [];
  useEffect(() => {
    // Find course by ID
    const foundCourse = dummyCourses.find((c) => c.id === courseId);
    if (foundCourse) {
      // Add syllabus to the course
      const courseWithSyllabus = {
        ...foundCourse,
        syllabus: getSyllabusForCourse(foundCourse.name),
      };
      setCourse(courseWithSyllabus);

      // Load dummy reviews
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
        {
          id: "3",
          name: "Anitha Reddy",
          review:
            "Very helpful course with good support from instructors. Highly recommended!",
          rating: 4,
          created_at: "2024-01-05",
        },
      ]);
    }
    setLoading(false);
  }, [courseId]);

  const getSyllabusForCourse = (courseName) => {
    const syllabusMap = {
      "C and C++ Programming": [
        "C Basics",
        "Data Types & Variables",
        "Control Structures",
        "Functions",
        "Pointers",
        "Object-Oriented Programming",
      ],
      "Python for Beginners": [
        "Python Basics",
        "Data Types",
        "Control Structures",
        "Functions",
        "Object-Oriented Programming",
        "Libraries & Modules",
      ],
      "Java Development": [
        "Java Fundamentals",
        "OOP Concepts",
        "Collections Framework",
        "Exception Handling",
        "Spring Framework",
        "Database Integration",
      ],
      "SQL Database Management": [
        "Database Basics",
        "SQL Queries",
        "Joins & Relationships",
        "Stored Procedures",
        "Database Design",
        "Performance Optimization",
      ],
      "CCNA Certification": [
        "Network Basics",
        "IP Addressing",
        "Switch Security",
        "Router Configuration",
        "IP Services",
        "Network Troubleshooting",
      ],
      "Linux System Administration": [
        "Linux Basics",
        "Command Line",
        "File Systems",
        "User Management",
        "System Security",
        "Server Configuration",
      ],
      "Windows Server Administration": [
        "Windows Server Basics",
        "Active Directory",
        "Group Policy",
        "DNS & DHCP",
        "Security Management",
        "Backup & Recovery",
      ],
      "AWS Cloud Computing": [
        "AWS Fundamentals",
        "EC2 & Storage",
        "Networking",
        "Database Services",
        "Security & IAM",
        "Monitoring & Automation",
      ],
      "Tally for Beginners": [
        "Tally Basics",
        "Voucher Entry",
        "Inventory Management",
        "GST Implementation",
        "Financial Reports",
        "Data Management",
      ],
      "Power BI: Basics to Advanced": [
        "Power BI Basics",
        "Data Import",
        "Data Modeling",
        "Visualizations",
        "DAX Functions",
        "Dashboard Creation",
      ],
    };
    return (
      syllabusMap[courseName] || [
        "Module 1",
        "Module 2",
        "Module 3",
        "Module 4",
        "Module 5",
      ]
    );
  };

  const handleAddReview = (newReview) => {
    const review = {
      id: Date.now().toString(),
      ...newReview,
      created_at: new Date().toISOString().split("T")[0],
    };
    setReviews([review, ...reviews]);
  };

  const handleEnroll = () => {
    // Open enrollment modal or redirect to enrollment page
    console.log("Enroll in course:", course.id);
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
    <div className="min-h-screen">
      <Header />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}
