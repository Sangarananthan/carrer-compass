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
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Loader2, Image, Upload, Trash2 } from "lucide-react";
import { supabase } from "../utils/supabase-client";

export default function CategoryModal({
  isOpen,
  onClose,
  category,
    mode,
  session,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    show_on_home: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && category) {
        setFormData(category);
        setImagePreview(category.image_url);
      } else {
        setFormData({
          name: "",
          description: "",
          image_url: "",
          show_on_home: false,
        });
        setImagePreview("");
        setSelectedFile(null);
      }
      setError("");
    }
  }, [isOpen, category, mode]);

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
        throw new Error("Category name is required");
      }
      const submitData = { ...formData };

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
        submitData.image_url = uploadData.path;
      }
      const { error } = await supabase.from("Categories").insert({...submitData , email : session?.user?.email}).select();
      if (error) {
        console.error("Error saving category :", error);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    onClose();
    setError("");
    setFormData({
      name: "",
      description: "",
      image_url: "",
      show_on_home: false,
    });
    setImagePreview("");
    setSelectedFile(null);
    setUploadMethod("file");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-[90%] max-h-[90vh]  p-4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            {mode === "create" ? "Add New Category" : "Edit Category"}
          </DialogTitle>
        </DialogHeader>

        <div onSubmit={handleSubmit} className="space-y-6 p-1">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Category Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Software Programming"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the category..."
              rows={4}
              required
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Category Image
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

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="space-y-1">
              <Label
                htmlFor="show_on_home"
                className="text-sm font-medium text-gray-900"
              >
                Show on Homepage
              </Label>
              <p className="text-xs text-gray-600">
                Display this category in the "Top Categories" section on the
                homepage
              </p>
            </div>
            <Switch
              id="show_on_home"
              checked={formData.show_on_home}
              onCheckedChange={(checked) =>
                handleInputChange("show_on_home", checked)
              }
            />
          </div>

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
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {mode === "create" ? "Creating..." : "Updating..."}
                </>
              ) : (
                <>{mode === "create" ? "Create Category" : "Update Category"}</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
