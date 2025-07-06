"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, TrendingUp } from "lucide-react";

export default function CTACards() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Earn Certificate Card */}
          <Card className="group bg-white border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 sm:p-8 relative">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-emerald-200 rounded-full"></div>
                    <div className="h-2 w-2 bg-emerald-300 rounded-full"></div>
                    <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <div className="h-1 w-16 bg-emerald-500 rounded-full opacity-60"></div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight tracking-tight">
                    Earn Professional
                  </h3>
                  <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 leading-tight tracking-tight">
                    Certificate
                  </h3>
                </div>

                <div className="flex items-center space-x-2 text-slate-600">
                  <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full"></div>
                  <p className="text-sm font-medium">
                    Industry-recognized credentials
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-slate-600">
                  <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full"></div>
                  <p className="text-sm font-medium">
                    Career advancement opportunities
                  </p>
                </div>

                <Button
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-6 py-3 text-sm font-semibold transition-colors duration-200 group-hover:bg-emerald-600 mt-6"
                  onClick={() => (window.location.href = "/courses")}
                >
                  Explore Programs →
                </Button>
              </div>

              <div className="absolute -bottom-2 -right-2 opacity-10">
                <Award className="h-24 w-24 md:h-50 md:w-50 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          {/* Best Rated Courses Card */}
          <Card className="group bg-white border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 sm:p-8 relative">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-blue-200 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
                <div className="h-1 w-16 bg-blue-500 rounded-full opacity-60"></div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight tracking-tight">
                    Top-Rated
                  </h3>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-600 leading-tight tracking-tight">
                    Learning Paths
                  </h3>
                </div>

                <div className="flex items-center space-x-2 text-slate-600">
                  <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
                  <p className="text-sm font-medium">
                    Join thousands of successful students
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-slate-600">
                  <div className="h-1.5 w-1.5 bg-blue-400 rounded-full"></div>
                  <p className="text-sm font-medium">
                    Expert-curated curriculum
                  </p>
                </div>

                <Button
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg px-6 py-3 text-sm font-semibold transition-colors duration-200 group-hover:bg-blue-600 mt-6"
                  onClick={() => (window.location.href = "/courses")}
                >
                  Explore Courses →
                </Button>
              </div>

              <div className="absolute -bottom-4 right-10 opacity-10">
                <TrendingUp className="h-24 w-24 md:h-50 md:w-50 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
