"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, Globe, BookOpen, Award } from "lucide-react"
import Breadcrumb from "./breadcrumb.jsx"



export default function CourseDetailHero({ course }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Courses", href: "/courses" },
              { label: course.category.name, href: `/courses?category=${course.category.name}` },
              { label: course.name },
            ]}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-blue-600 text-white">{course.category.name}</Badge>
              {course.is_popular && <Badge className="bg-orange-500 text-white">Popular Course</Badge>}
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">{course.name}</h1>

            <p className="text-xl text-gray-600 leading-relaxed">{course.overview}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">{course.duration_months} Months</div>
                  <div className="text-xs">Duration</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium capitalize">{course.mode}</div>
                  <div className="text-xs">Mode</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-sm font-medium capitalize">{course.language}</div>
                  <div className="text-xs">Language</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Award className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-sm font-medium">Certificate</div>
                  <div className="text-xs">Included</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900 ml-2">5.0</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                <span>45+ Students Enrolled</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={course.image_url || "/placeholder.svg?height=400&width=600"}
                alt={course.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
