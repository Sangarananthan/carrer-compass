"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Loader2, Plus, Trash2, ImageIcon, Upload } from "lucide-react";
import Image from "next/image";
import { supabase } from "../utils/supabase-client";

export default function CourseModal({
  isOpen,
  onClose,
  onSave,
  course,
  mode,
  categories,
  session
}) {
  const initialState = {
    category_id: "",
    name: "",
    image_url: "",
    duration_months: 1,
    mode: "",
    language: "",
    overview: "",
    syllabus: [""],
    is_popular: false,
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Initialize form data when modal opens or course changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && course) {
        setFormData(course);
        setImagePreview(course.image_url);
      } else {
        setFormData(initialState);
        setImagePreview("");
      }
      setError("");
    }
  }, [isOpen, course, mode]);

  const handleSyllabusChange = (index, value) => {
    const newSyllabus = [...formData.syllabus];
    newSyllabus[index] = value;
    setFormData((prev) => ({ ...prev, syllabus: newSyllabus }));
  };

  const addSyllabusItem = () => {
    setFormData((prev) => ({ ...prev, syllabus: [...prev.syllabus, ""] }));
  };

  const removeSyllabusItem = (index) => {
    if (formData.syllabus.length > 1) {
      const newSyllabus = formData.syllabus.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, syllabus: newSyllabus }));
    }
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "image_url" && typeof value === "string") {
      setImagePreview(value);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setError("");

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result || "");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image_url: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.name.trim()) {
        throw new Error("Course name is required");
      }
      if (!formData.category_id) {
        throw new Error("Please select a category");
      }
      if (!formData.overview.trim()) {
        throw new Error("Course overview is required");
      }
      if (formData.duration_months < 1 || formData.duration_months > 24) {
        throw new Error("Duration must be between 1 and 24 months");
      }
      const filteredSyllabus = formData.syllabus.filter(
        (item) => item.trim() !== ""
      );
      const courseData = {
        ...formData,
        syllabus: filteredSyllabus,
        email: session?.user?.email,
      };
      if (selectedFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("career-course")
          .upload(`Category/${selectedFile.name}_${Date.now()}`, selectedFile, {
            cacheControl: "3600",
            upsert: true,
          });
        if (uploadError) {
          console.error("Error uploading file:", uploadError);
        }
        courseData.image_url = uploadData.path;
      }
      const { error } = await supabase
        .from("Courses")
        .insert(courseData)
        .select();
      if (error) {
        console.error("Error saving category :", error);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    onClose();
    setError("");
    setFormData(initialState);
    setImagePreview("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="min-w-[70%] max-h-[90vh] max-w-[90%] p-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            {mode === "create" ? "Add New Course" : "Edit Course"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Course Image
                </Label>

                <div className="space-y-3">
                  {!selectedFile && !imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Click to upload image
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                            {imagePreview ? (
                              <img
                                src={imagePreview}
                                alt="Category preview"
                                className="w-full h-full object-cover"
                                onError={() => setImagePreview("")}
                              />
                            ) : (
                              <Image className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {selectedFile ? selectedFile.name : "Image Preview"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedFile
                              ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                              : "This is how the category image will appear"}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveImage}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

{/* Course Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Course Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Python for Beginners"
                  required
                  className="h-12"
                />
              </div>
              <div className="flex items-center justify-between">
                {/* Category */}
                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700"
                  >
                    Category *
                  </Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) =>
                      handleInputChange("category_id", value)
                    }
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Mode */}
                <div className="space-y-2">
                  <Label
                    htmlFor="mode"
                    className="text-sm font-medium text-gray-700"
                  >
                    Course Mode *
                  </Label>
                  <Select
                    value={formData.mode}
                    onValueChange={(value) => handleInputChange("mode", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select Course Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label
                    htmlFor="language"
                    className="text-sm font-medium text-gray-700"
                  >
                    Language *
                  </Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) =>
                      handleInputChange("language", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="text-sm font-medium text-gray-700"
                >
                  Duration (Months) *
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="24"
                  value={formData.duration_months}
                  onChange={(e) =>
                    handleInputChange(
                      "duration_months",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  className="h-12"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Syllabus */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">
                    Course Syllabus *
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSyllabusItem}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    Add Module
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.syllabus.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleSyllabusChange(index, e.target.value)
                        }
                        placeholder={`Module ${index + 1} - e.g., Introduction to Programming`}
                        className="flex-1"
                      />
                      {formData.syllabus.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSyllabusItem(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Overview */}
              <div className="space-y-2">
                <Label
                  htmlFor="overview"
                  className="text-sm font-medium text-gray-700"
                >
                  Course Overview *
                </Label>
                <Textarea
                  id="overview"
                  value={formData.overview}
                  onChange={(e) =>
                    handleInputChange("overview", e.target.value)
                  }
                  placeholder="Detailed description of the course..."
                  rows={4}
                  required
                  className="resize-none"
                />
              </div>

              {/* Popular Course Toggle */}
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="space-y-1">
                  <Label
                    htmlFor="is_popular"
                    className="text-sm font-medium text-gray-900"
                  >
                    Popular Course
                  </Label>
                  <p className="text-xs text-gray-600">
                    Show in "Most Popular Courses" section
                  </p>
                </div>
                <Switch
                  id="is_popular"
                  checked={formData.is_popular}
                  onCheckedChange={(checked) =>
                    handleInputChange("is_popular", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={resetAndClose}
              className="flex-1 bg-transparent"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>{mode === "create" ? "Create Course" : "Update Course"}</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
