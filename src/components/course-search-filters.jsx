"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"


export default function CourseSearchFilters({
  categories,
  onSearchChange,
  onCategoryFilter,
  selectedCategory,
  searchTerm,
}) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <div className={`flex flex-wrap gap-2 ${showFilters ? "block" : "hidden lg:flex"} w-full lg:w-auto`}>
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryFilter(null)}
              className="text-sm"
            >
              All Courses
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryFilter(category.id)}
                className="text-sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {(selectedCategory || searchTerm) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
