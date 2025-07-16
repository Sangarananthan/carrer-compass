import { create } from "zustand";
import { supabase } from "@/utils/supabase-client";
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  session: null,
  setSession: async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    set({
      isAuthenticated: !!sessionData.session,
      session: sessionData.session,
    });
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ isAuthenticated: false, session: null });
  },
}));
