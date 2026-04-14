import { create } from "zustand";
import { getCourses } from "../services/courseService";

export const useCourseStore = create((set) => ({
  courses: [],
  loading: true,

  fetchCourses: async () => {
    try {
      const data = await getCourses();
      set({ courses: data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
