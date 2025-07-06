"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HelpSection() {
  return (
    <section className="p-[1rem] w-full  mx-auto">
      <div className="relative bg-neutral-900 rounded-2xl p-[1.7rem] border border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5 md:opacity-20">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] border border-white rounded-full"></div>
          <div className="absolute -bottom-16 -right-16 w-80 h-80 border-7 border-white rounded-full"></div>
          <div className="absolute -bottom-28 -right-28 w-[450px] h-[450px] border border-white rounded-full"></div>
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div>
            <h3 className="text-4xl font-semibold text-white mb-3 tracking-tight">
              Find Your Course
            </h3>
            <p className="text-neutral-400 text-lg">
              Personalized recommendations for your learning journey
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-white hover:bg-neutral-100 text-black font-medium px-8 py-6 rounded-xl transition-all duration-200 hover:scale-[1.02] group"
            onClick={() => (window.location.href = "/courses")}
          >
            <span className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
