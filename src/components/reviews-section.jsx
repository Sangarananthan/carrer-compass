"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Award, Quote } from "lucide-react";
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
      const { data, error } = await supabase
        .from("CourseReview")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

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
    return gradients[name.length % gradients.length];
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const ReviewCard = ({ review }) => (
    <div
      className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden w-[250px] sm:w-[280px] md:w-[300px] flex flex-col"
      style={{ height: "170px" }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="absolute top-3 right-3 opacity-10">
        <Quote className="h-8 w-8 text-blue-600" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Avatar & Name */}
        <div className="flex items-center space-x-3 mb-3">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getAvatarGradient(
              review.name
            )} flex items-center justify-center text-white text-xs font-bold`}
          >
            {getInitials(review.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {review.name}
            </p>
            <div className="flex items-center">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="ml-1 text-xs text-gray-500">
                {review.rating}.0
              </span>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <div className="text-gray-700 text-xs flex-1 overflow-hidden">
          <p className="line-clamp-5">{review.review}</p>
        </div>

        <div className="mt-auto pt-2 text-xs text-gray-400">
          {formatDate(review.created_at)}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={fetchReviews}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-white/80 px-4 py-1 rounded-full mb-2">
            <Award className="h-4 w-4 text-blue-600 mr-1" />
            <span className="text-blue-600 text-sm">Student Reviews</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Students Say
          </h2>
        </div>

        <div className="relative flex items-center">
          {/* Prev */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden md:flex absolute left-0 z-10 p-2 bg-white rounded-full shadow hover:scale-110 transition"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          {/* Swiper */}
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={"auto"}
            spaceBetween={16} // 1rem gap
            loop={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={review.id} className="!w-auto flex-shrink-0">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Next */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden md:flex absolute right-0 z-10 p-2 bg-white rounded-full shadow hover:scale-110 transition"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden justify-center mt-4 space-x-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 bg-white rounded-full shadow hover:scale-110 transition"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <style jsx>{`
        :global(.line-clamp-5) {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
