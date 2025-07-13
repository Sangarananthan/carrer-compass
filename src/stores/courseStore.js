import { create } from "zustand";
import { supabase } from "@/utils/supabase-client";

export const useCourseStore = create((set) => ({
  courses: [],

  fetchCourses: async ({
    searchTerm = "",
    categoryFilter = null,
    isPopular = false,
    isRandom = false,
  } = {}) => {
    let query = supabase.from("Courses").select("*, category:Categories(*)");

    if (searchTerm.trim() !== "") {
      query = query.or(
        `name.ilike.%${searchTerm}%,overview.ilike.%${searchTerm}%`
      );
    }

    if (categoryFilter) {
      query = query.eq("category_id", categoryFilter);
    }

    if (isPopular) {
      query = query.eq("is_popular", true);
    }

    if (isRandom) {
      query = query.limit(5);
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    if (!error) {
      set({ courses: data });
    } else {
      console.error("Error fetching courses:", error);
    }
  },

  removeCourse: (id) =>
    set((state) => ({
      courses: state.courses.filter((c) => c.id !== id),
    })),
}));
