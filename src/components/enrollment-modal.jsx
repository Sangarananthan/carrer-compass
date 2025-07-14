"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Clock,
  Globe,
  BookOpen,
  Star,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { supabase } from "@/utils/supabase-client";
import { useCourseStore } from "@/stores/courseStore";

export default function EnrollmentModal({
  isOpen,
  onClose,
  preSelectedCourse,
}) {
  console.log(preSelectedCourse, "Pre-selected course in modal");
  const { courses, fetchCourses } = useCourseStore();

  // Local state for categories and courses (separate from store)
  const [categories, setCategories] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    categoryId: "",
    courseId: "",
    message: "",
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fetchingCourses, setFetchingCourses] = useState(false);

  // Fetch categories on component mount
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("Categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch courses by category
  const fetchCoursesByCategory = async (categoryId) => {
    if (!categoryId) {
      setAvailableCourses([]);
      return;
    }

    setFetchingCourses(true);
    try {
      const { data, error } = await supabase
        .from("Courses")
        .select("*, category:Categories(*)")
        .eq("category_id", categoryId)
        .order("name");

      if (error) throw error;
      setAvailableCourses(data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setAvailableCourses([]);
    } finally {
      setFetchingCourses(false);
    }
  };

  // Initialize categories on mount
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchCourses();
      setAvailableCourses(courses);
    }
  }, [isOpen]);

  // Handle preselected course initialization
  useEffect(() => {
    if (preSelectedCourse && categories.length > 0) {
      // Find the category for the preselected course
      const courseCategory = categories.find(
        (cat) => cat.id === preSelectedCourse.category_id
      );

      if (courseCategory) {
        // Normalize the preselected course data structure
        const normalizedCourse = {
          ...preSelectedCourse,
          category: courseCategory,
        };

        setSelectedCourse(normalizedCourse);
        setFormData((prev) => ({
          ...prev,
          categoryId: preSelectedCourse.category_id.toString(),
          courseId: preSelectedCourse.id.toString(),
        }));

        // Set this single course as available
        setAvailableCourses([normalizedCourse]);
      }
    }
  }, [preSelectedCourse, categories]);

  // Handle category change
  useEffect(() => {
    if (formData.categoryId && !preSelectedCourse) {
      fetchCoursesByCategory(parseInt(formData.categoryId));
    }
  }, [formData.categoryId, preSelectedCourse]);

  // Handle course selection change
  useEffect(() => {
    if (formData.courseId && !preSelectedCourse) {
      const courseIdNum = parseInt(formData.courseId);
      const course = availableCourses.find((c) => c.id === courseIdNum);
      setSelectedCourse(course || null);
    }
  }, [formData.courseId, availableCourses, preSelectedCourse]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Reset course selection when category changes (unless preselected)
    if (field === "categoryId" && !preSelectedCourse) {
      setFormData((prev) => ({ ...prev, courseId: "" }));
      setSelectedCourse(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (!formData.mobile.trim()) {
      setError("Please enter your mobile number");
      setLoading(false);
      return;
    }

    if (!formData.categoryId) {
      setError("Please select a category");
      setLoading(false);
      return;
    }

    if (!formData.courseId || !selectedCourse) {
      setError("Please select a course");
      setLoading(false);
      return;
    }

    try {
      const emailData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        categoryName: selectedCourse.category.name,
        courseName: selectedCourse.name,
        courseDetails: {
          duration: selectedCourse.duration_months,
          mode: selectedCourse.mode,
          language: selectedCourse.language,
          overview: selectedCourse.overview,
        },
        message: formData.message.trim(),
        submittedAt: new Date().toLocaleString(),
      };

      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          resetAndClose();
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to submit enrollment");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    onClose();
    setFormData({
      name: "",
      email: "",
      mobile: "",
      categoryId: preSelectedCourse?.category_id.toString() || "",
      courseId: preSelectedCourse?.id.toString() || "",
      message: "",
    });

    if (!preSelectedCourse) {
      setSelectedCourse(null);
      setAvailableCourses([]);
    }

    setError("");
    setSuccess(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="min-w-[70%] max-h-[90vh] max-w-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            Course Enrollment Inquiry
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Enrollment Submitted Successfully!
            </h3>
            <p className="text-gray-600">
              We'll get back to you within 24 hours with course details.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Right Side - Course Preview */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Course Preview
              </h3>

              {selectedCourse ? (
                <Card className="p-0 overflow-hidden border-2 gap-0 border-blue-100">
                  <div className="relative h-48">
                    <Image
                      src={
                        selectedCourse.image_url
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET}/${selectedCourse.image_url}`
                          : "/placeholder.svg?height=200&width=400"
                      }
                      alt={selectedCourse.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">
                        {selectedCourse.category.name}
                      </Badge>
                    </div>
                    {preSelectedCourse && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-600 text-white">
                          Pre-selected
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      {selectedCourse.name}
                    </h4>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <div>
                          <div className="text-sm font-medium">
                            {selectedCourse.duration_months} months
                          </div>
                          <div className="text-xs">Duration</div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Globe className="h-4 w-4 mr-2 text-green-500" />
                        <div>
                          <div className="text-sm font-medium capitalize">
                            {selectedCourse.mode}
                          </div>
                          <div className="text-xs">Mode</div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
                        <div>
                          <div className="text-sm font-medium capitalize">
                            {selectedCourse.language}
                          </div>
                          <div className="text-xs">Language</div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <div>
                          <div className="text-sm font-medium">5.0 Rating</div>
                          <div className="text-xs">45+ Reviews</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        Course Overview:
                      </h5>
                      <p className="text-sm text-gray-700 line-clamp-4">
                        {selectedCourse.overview}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 text-4xl mb-4">📚</div>
                    <h4 className="text-lg font-medium text-gray-600 mb-2">
                      Select a Course
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Choose a category and course to see the preview here
                    </p>
                  </CardContent>
                </Card>
              )}

            </div>
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>

                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email address"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) =>
                        handleInputChange("mobile", e.target.value)
                      }
                      placeholder="Enter your mobile number"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Course Selection
                  </h3>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) =>
                        handleInputChange("categoryId", value)
                      }
                      disabled={!!preSelectedCourse}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="course">Course *</Label>
                    <Select
                      value={formData.courseId}
                      onValueChange={(value) =>
                        handleInputChange("courseId", value)
                      }
                      disabled={!!preSelectedCourse || !formData.categoryId}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue
                          placeholder={
                            fetchingCourses
                              ? "Loading courses..."
                              : "Select a course"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {fetchingCourses ? (
                          <div className="p-2 text-center text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                            Loading courses...
                          </div>
                        ) : (
                          availableCourses.map((course) => (
                            <SelectItem
                              key={course.id}
                              value={course.id.toString()}
                            >
                              {course.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Any specific questions or requirements..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Enrollment Inquiry"
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
