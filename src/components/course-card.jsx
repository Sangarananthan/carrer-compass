"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, Globe, BookOpen } from "lucide-react"
import EnrollmentModal from "./enrollment-modal"
import { useState } from "react"


export default function CourseCard({ course, onPreview, onEnroll }) {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)

  const handleEnrollClick = () => {
    setShowEnrollmentModal(true)
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.image_url || "/placeholder.svg?height=200&width=400"}
          alt={course.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-blue-600 text-white">{course.category.name}</Badge>
          {course.is_popular && <Badge className="bg-orange-500 text-white">Popular</Badge>}
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {course.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.overview}</p>

        {/* Course Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            {course.duration_months} months
          </div>
          <div className="flex items-center text-gray-600">
            <Globe className="h-4 w-4 mr-2 text-green-500" />
            {course.mode}
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-2 text-purple-500" />
            {course.language}
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2 text-orange-500" />
            45+ Students
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">5.0 (45 reviews)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onPreview(course.id)} className="flex-1">
            Preview Course
          </Button>
          <Button onClick={handleEnrollClick} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Enroll Now
          </Button>
        </div>
      </CardContent>
      <EnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        preSelectedCourse={course}
      />
    </Card>
  )
}
