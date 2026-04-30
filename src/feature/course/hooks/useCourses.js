import { useEffect } from "react";
import { useCourseStore } from "../store/useCourseStore";
import { useAuthStore } from "../../auth/store/useAuthStore";

export const useCourses = () => {
  const courses = useCourseStore((state) => state.courses);
  const fetchCourses = useCourseStore((state) => state.fetchCourses);
  const loading = useCourseStore((state) => state.loading);

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }
  }, []);

  return { courses, loading };
};

export const useMyCourses = () => {
  const user = useAuthStore((state) => state.user);

  const myCourses = useCourseStore((state) => state.myCourses);
  const fetchMyCourses = useCourseStore((state) => state.fetchMyCourses);

  const myProgress = useCourseStore((state) => state.myProgress);
  const fetchMyProgress = useCourseStore((state) => state.fetchMyProgress);

  const loading = useCourseStore((state) => state.loading);

  useEffect(() => {
    if (user) {
      fetchMyCourses(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchMyProgress(user.id);
    }
  }, [user]);

  return { myCourses, loading, myProgress };
};
