"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Globe, BookOpen, Award, Calendar, MessageCircle, Mail } from "lucide-react"
import { useState } from "react"
import EnrollmentModal from "./enrollment-modal"


export default function CourseDetailSidebar({ course, onEnroll }) {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false)

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi, I would like to enroll in ${course.name} course on Career Compass`)
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Enrollment Inquiry - ${course.name}`)
    const body = encodeURIComponent(`Hi, I would like to enroll in ${course.name} course on Career Compass`)
    window.open(`mailto:${process.env.NEXT_PUBLIC_EMAIL}?subject=${subject}&body=${body}`, "_blank")
  }

  const handleEnroll = () => {
    setShowEnrollmentModal(true)
  }

  return (
    <div className="space-y-6">
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="text-xl">Enroll in This Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Duration</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-blue-500 mr-1" />
                <span className="font-medium">{course.duration_months} months</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Mode</span>
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-green-500 mr-1" />
                <span className="font-medium capitalize">{course.mode}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Language</span>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 text-purple-500 mr-1" />
                <span className="font-medium capitalize">{course.language}</span>
              </div>
            </div>

           

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Certificate</span>
              <div className="flex items-center">
                <Award className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">Included</span>
              </div>
            </div>

         
          </div>

         
          <div className="space-y-3">
            <Button onClick={handleEnroll} className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
              Enquire Now
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-1 text-green-600" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={handleEmailClick}
                className="flex items-center justify-center bg-transparent"
              >
                <Mail className="h-4 w-4 mr-1 text-blue-600" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

    
      <EnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        preSelectedCourse={course}
      />
    </div>
  )
}
