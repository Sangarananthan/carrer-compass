"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Plus, Star, User } from "lucide-react"


export default function CourseDetailTabs({ course, reviews, onAddReview }) {
  const [activeTab, setActiveTab] = useState("info")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({ name: "", review: "", rating: 5 })

  const tabs = [
    { id: "info", label: "Course Info" },
    { id: "curriculum", label: "Curriculum" },
    { id: "reviews", label: "Reviews" },
  ]

  const handleSubmitReview = (e) => {
    e.preventDefault()
    onAddReview(reviewForm)
    setReviewForm({ name: "", review: "", rating: 5 })
    setShowReviewForm(false)
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              {tab.id === "reviews" && <span className="ml-2 text-xs">({reviews.length})</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="min-h-[400px]">
        {activeTab === "info" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{course.overview}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Comprehensive understanding of core concepts",
                  "Hands-on practical experience",
                  "Industry-relevant skills and techniques",
                  "Real-world project implementation",
                  "Professional certification preparation",
                  "Career guidance and placement support",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Course Features</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{course.syllabus?.length || 5}+</div>
                    <div className="text-sm text-gray-600">Modules</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">100%</div>
                    <div className="text-sm text-gray-600">Practical</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Curriculum</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive curriculum designed by industry experts to ensure practical learning.
              </p>
            </div>

            <div className="space-y-4">
              {course.syllabus?.map((topic, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{topic}</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Comprehensive coverage of {topic.toLowerCase()} concepts and practical applications.
                        </p>
                      </div>
                      <Badge variant="outline">Module {index + 1}</Badge>
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  <p>Curriculum details will be updated soon.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Student Reviews</h3>
              <Button onClick={() => setShowReviewForm(!showReviewForm)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Review
              </Button>
            </div>

            {showReviewForm && (
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className={`text-2xl ${star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                      <textarea
                        value={reviewForm.review}
                        onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Submit Review
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center">
                              <div className="flex text-yellow-400">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500 ml-2">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.review}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet. Be the first to review this course!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
