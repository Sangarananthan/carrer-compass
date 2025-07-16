"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-4 py-6 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-blue-600 font-medium text-lg">
                Get trained by Industry Experts
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Classroom or live online{" "}
                <span className="text-blue-600">
                  instruction with an instructor
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                with Complete Placement Assistance
              </p>
            </div>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full"
              onClick={() => (window.location.href = "/courses")}
            >
              Find Courses →
            </Button>
          </div>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
