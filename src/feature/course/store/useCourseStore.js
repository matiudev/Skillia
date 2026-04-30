import { create } from "zustand";
import { getCourseByUser, getCourses, getProgressByUser } from "../services/courseService";

export const useCourseStore = create((set) => ({
  courses: [],
  myCourses: [],
  myProgress: [],
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

  fetchMyCourses: async (userId) => {
    try {
      const data = await getCourseByUser(userId);
      set({ myCourses: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchMyProgress: async (userId) => {
    try {
      const data = await getProgressByUser(userId);
      set({ myProgress: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
