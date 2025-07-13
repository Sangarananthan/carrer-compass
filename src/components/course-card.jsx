import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Globe, BookOpen, Edit, Trash2 } from "lucide-react";

export default function CourseCard({
  course,
  onPreview,
  onEnroll,
  isEditable = false,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="overflow-hidden flex gap-0 p-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET}/${course.image_url}` ||
            "/placeholder.svg?height=200&width=400"
          }
          alt={course?.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-blue-600 text-white">
            {course?.category?.name}
          </Badge>
          {course?.is_popular && (
            <Badge className="bg-orange-500 text-white">Popular</Badge>
          )}
        </div>

        {isEditable && (
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
              onClick={() => onEdit(course)}
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm text-red-600 hover:text-red-700"
              onClick={() => onDelete(course)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {course?.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course?.overview}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            {course?.duration_months} months
          </div>
          <div className="flex items-center text-gray-600">
            <Globe className="h-4 w-4 mr-2 text-green-500" />
            {course?.mode}
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
            {course?.language}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                5.0 (45 reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onPreview(course?.id)}
            className="flex-1"
          >
            Preview Course
          </Button>
          <Button
            onClick={() => onEnroll(course)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
