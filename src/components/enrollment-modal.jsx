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
  X,
  Clock,
  Globe,
  BookOpen,
  Star,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";

export default function EnrollmentModal({
  isOpen,
  onClose,
  preSelectedCourse,
}) {
  const dummyCategories = [];
  const dummyCourses = [];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    categoryId: "",
    courseId: "",
    message: "",
  });
  const [selectedCourse, setSelectedCourse] = useState(
    preSelectedCourse || null
  );
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Initialize form with pre-selected course
  useEffect(() => {
    if (preSelectedCourse) {
      setSelectedCourse(preSelectedCourse);
      setFormData((prev) => ({
        ...prev,
        categoryId: preSelectedCourse.category.id,
        courseId: preSelectedCourse.id,
      }));
    }
  }, [preSelectedCourse]);

  // Filter courses when category changes
  useEffect(() => {
    if (formData.categoryId) {
      const filtered = dummyCourses.filter(
        (course) => course.category.id === formData.categoryId
      );
      setAvailableCourses(filtered);

      // Reset course selection if category changes and no pre-selected course
      if (!preSelectedCourse) {
        setFormData((prev) => ({ ...prev, courseId: "" }));
        setSelectedCourse(null);
      }
    } else {
      setAvailableCourses([]);
    }
  }, [formData.categoryId, preSelectedCourse]);

  // Update selected course when course ID changes
  useEffect(() => {
    if (formData.courseId && !preSelectedCourse) {
      const course = dummyCourses.find((c) => c.id === formData.courseId);
      setSelectedCourse(course || null);
    }
  }, [formData.courseId, preSelectedCourse]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          courseName: selectedCourse?.name,
          categoryName: dummyCategories.find(
            (c) => c.id === formData.categoryId
          )?.name,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            name: "",
            email: "",
            mobile: "",
            categoryId: preSelectedCourse?.category.id || "",
            courseId: preSelectedCourse?.id || "",
            message: "",
          });
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to submit enrollment");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    onClose();
    if (!preSelectedCourse) {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        categoryId: "",
        courseId: "",
        message: "",
      });
      setSelectedCourse(null);
    }
    setError("");
    setSuccess(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            Course Enrollment Inquiry
            <Button variant="ghost" size="sm" onClick={resetAndClose}>
              <X className="h-4 w-4" />
            </Button>
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
            {/* Left Side - Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Personal Information */}
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

                {/* Course Selection */}
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
                        {dummyCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
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
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Message */}
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

            {/* Right Side - Course Preview */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Course Preview
              </h3>

              {selectedCourse ? (
                <Card className="overflow-hidden border-2 border-blue-100">
                  <div className="relative h-48">
                    <Image
                      src={
                        selectedCourse.image_url ||
                        "/placeholder.svg?height=200&width=400"
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

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">
                        What's Included:
                      </h5>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>✓ Complete course materials</li>
                        <li>✓ Hands-on practical training</li>
                        <li>✓ Industry expert guidance</li>
                        <li>✓ Certificate upon completion</li>
                        <li>✓ Placement assistance</li>
                      </ul>
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

              {/* Contact Information */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Need Help?
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">📞 Phone:</span>
                      <span className="ml-2">
                        +91 {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">✉️ Email:</span>
                      <span className="ml-2">
                        {process.env.NEXT_PUBLIC_EMAIL}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">⏰ Response:</span>
                      <span className="ml-2">Within 24 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
