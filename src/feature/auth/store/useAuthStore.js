import { create } from "zustand";
import { supabase } from "../../../lib/supabase";

export const useAuthStore = create((set) => ({
  fullName: "",
  user: null,
  session: null,

  loading: false,     // acciones (login, register)
  authLoading: true,  // sesión inicial

  setUser: (user) => set({ user }),

  // Registro
  register: async (email, password, fullName) => {
    set({ loading: true });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName },
      },
    });

    if (error) {
      set({ loading: false });
      return { success: false, error: error.message };
    }

    if (data.user) {
      await supabase.from("profile").insert({
        id: data.user.id,
        full_name: fullName,
        email: email,
      });
    }

    set({
      user: data.user,
      fullName: fullName,
      session: data.session,
      loading: false,
    });

    return { success: true };
  },

  // Login
  login: async (email, password) => {
    set({ loading: true });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ loading: false });
      return { success: false, error: error.message };
    }

    console.log(data);

    set({
      user: data.user,
      fullName: data.user.user_metadata.fullName,
      session: data.session,
      loading: false,
    });

    return { success: true };
  },

  // Logout
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  getSession: async () => {
    set({ authLoading: true });

    const { data } = await supabase.auth.getSession();

    set({
      session: data.session,
      user: data.session?.user ?? null,
      authLoading: false,
      fullName: data.session?.user?.user_metadata?.fullName || "",
    });
  },
}));