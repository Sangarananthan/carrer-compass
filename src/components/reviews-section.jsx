"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Award } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { supabase } from "../utils/supabase-client";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("CourseReview")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }
      setReviews(data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate consistent gradient based on name
  const getAvatarGradient = (name) => {
    const gradients = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
      "from-orange-500 to-orange-600",
      "from-red-500 to-red-600",
    ];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const ReviewCard = ({ review, isActive }) => {
    return (
      <div className="h-full w-full flex justify-center">
        <div
          className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden h-full transition-all duration-300 w-full max-w-sm ${
            isActive ? "scale-105 shadow-2xl border-blue-200" : "scale-100"
          }`}
          style={{ height: "200px" }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <div className="absolute top-3 right-3 opacity-10">
            <Quote className="h-8 w-8 text-blue-600" />
          </div>

          <div className="p-5 h-full flex flex-col">
            {/* User Profile Row */}
            <div className="flex items-center space-x-3 mb-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAvatarGradient(
                    review.name
                  )} flex items-center justify-center text-white text-sm font-bold shadow-md`}
                >
                  {getInitials(review.name)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Name and Rating */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm truncate">
                  {review.name}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {review.rating}.0
                  </span>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <div className="flex-1 relative mb-4">
              <div className="text-gray-700 text-sm leading-relaxed">
                <p className="line-clamp-7">{review.review}</p>
              </div>

              {/* Gradient fade for long text */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>

            {/* Verified Badge and Date */}
            <div className="mt-auto pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                {review.created_at && (
                  <span className="text-xs text-gray-500">
                    {formatDate(review.created_at)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state (will show dummy data)
  if (error && reviews.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading reviews: {error}</p>
            <button
              onClick={fetchReviews}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Error banner (if error but we have fallback data) */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-lg text-sm">
            Using sample data - API connection failed
          </div>
        </div>
      )}

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-[1rem]">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-blue-200 mb-4">
            <Award className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">
              Student Success Stories
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            What Our Students{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 relative">
              Say
              <svg
                className="absolute -bottom-2 left-0 w-full h-4"
                viewBox="0 0 100 12"
                fill="none"
              >
                <path
                  d="M2 10C20 4, 40 4, 60 8C80 12, 90 6, 98 10"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from students who transformed their careers with
            CareerCompass
          </p>
        </div>

        <div className="relative">
          {/* Custom Navigation Buttons - Hidden on mobile */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-30 group p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/50 items-center justify-center"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-30 group p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/50 items-center justify-center"
            aria-label="Next review"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Swiper Container */}
          <div className="px-4 md:px-16">
            <div style={{ height: "220px" }}>
              <Swiper
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={32}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={600}
                loop={true}
                loopAdditionalSlides={2}
                watchSlidesProgress={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                    centeredSlides: false,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                    centeredSlides: true,
                  },
                }}
                className="reviews-swiper h-full"
              >
                {reviews.map((review, index) => (
                  <SwiperSlide key={review.id} className="h-full">
                    {({ isActive }) => (
                      <ReviewCard review={review} isActive={isActive} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex md:hidden justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="group p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/50"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="group p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/50"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
          </div>

          {/* Custom Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-8 mb-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-3 shadow-lg"
                    : "bg-white/70 hover:bg-white w-3 h-3 shadow-md hover:shadow-lg"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          {/* Review Counter */}
          <div className="text-center">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50">
              <span className="text-gray-600 font-medium text-sm">
                Review {activeIndex + 1} of {reviews.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        :global(.reviews-swiper .swiper-slide) {
          transition: all 0.3s ease;
        }
        :global(.line-clamp-7) {
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
