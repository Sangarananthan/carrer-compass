import { create } from "zustand";
import { supabase } from "@/utils/supabase-client";

export const useCategoryStore = create((set) => ({
  categories: [],
  fetchCategories: async () => {
    const { data, error } = await supabase.from("Categories").select("*");
    if (!error) {
      set({ categories: data });
    } else {
      console.error("Error fetching categories:", error);
    }
  },
  fetchPopularCategories: async () => {
    const { data, error } = await supabase
      .from("Categories")
      .select("*")
      .eq("show_on_home", true);
    if (!error) {
      set({ categories: data });
    }
  },
  addCategory: (newCategory) =>
    set((state) => ({ categories: [newCategory, ...state.categories] })),
  updateCategory: (updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === updatedCategory.id ? updatedCategory : c
      ),
    })),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
}));
