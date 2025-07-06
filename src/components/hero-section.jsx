"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Clock, Users } from "lucide-react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [courses, setCourses] = useState([])
  // Sample courses for carousel
  useEffect(() => {
    // In a real app, fetch from Supabase
    setCourses([
      {
        id: "1",
        name: "CCNA Certification",
        image_url: "/placeholder.svg?height=200&width=300",
        duration_months: 6,
        category: "IT Infrastructure",
      },
      {
        id: "2",
        name: "Python for Beginners",
        image_url: "/placeholder.svg?height=200&width=300",
        duration_months: 4,
        category: "Programming",
      },
      {
        id: "3",
        name: "Tally for Beginners",
        image_url: "/placeholder.svg?height=200&width=300",
        duration_months: 3,
        category: "Accounting",
      },
    ])
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courses.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [courses.length])

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-blue-600 font-medium text-lg">Get trained by Industry Experts</p>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Classroom or live online <span className="text-blue-600">instruction with an instructor</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">with Complete Placement Assistance</p>
            </div>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full"
              onClick={() => (window.location.href = "/courses")}
            >
              Find Courses →
            </Button>
          </div>

          {/* Right Content - Hero Image with Course Carousel */}
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

              {/* Course Carousel Overlay */}
              {courses.length > 0 && (
                <div className="absolute -bottom-6 -right-6 lg:-right-12">
                  <Card className="w-80 shadow-xl bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={courses[currentSlide].image_url || "/placeholder.svg"}
                          alt={courses[currentSlide].name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-blue-600 font-medium">{courses[currentSlide].category}</p>
                          <h3 className="font-bold text-gray-900 mb-2">{courses[currentSlide].name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {courses[currentSlide].duration_months} months
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              45 Students
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="flex text-blue-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-2">5.0 /5</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
