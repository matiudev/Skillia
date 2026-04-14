import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CeroItems } from "../../../components/CeroItems";
import { BookMarkedIcon, Clock } from "lucide-react";
import { useCourseStore } from "../../../store/useCourseStore";
import { SkeletonCard } from "../../../components/SkeletonCard";

function FeaturedCourses() {
  const courses = useCourseStore((state) => state.courses);
  const fetchCourses = useCourseStore((state) => state.fetchCourses);
  const loading = useCourseStore((state) => state.loading);

  const [randomCourses, setRandomCourses] = useState([]);

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses();
    }
  }, [courses, fetchCourses]);

  useEffect(() => {
    if (courses.length > 0) {
      const random = [...courses].sort(() => 0.5 - Math.random()).slice(0, 3);
      setRandomCourses(random);
    }
  }, [courses]);

  return (
    <>
      <p className="text-secondary font-semibold mb-4">EXCELENCIA ACADÉMICA</p>

      <div className="flex-col md:flex justify-between mb-10">
        <p className="text-3xl md:text-5xl font-bold">Cursos Destacados</p>
        <NavLink to="/courses" className="text-secondary font-semibold">
          Ver Todos los Cursos →
        </NavLink>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : randomCourses.length === 0 ? (
        <CeroItems
          titulo="No hay cursos disponibles"
          Icon={BookMarkedIcon}
          className="py-20"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 font-headline items-stretch">
          {randomCourses.map((course) => (
            <div key={course.id} className="rounded-xl shadow flex flex-col">
              <img
                src={course.image_url}
                className="w-full h-48 object-cover rounded-t-lg shrink-0"
              />
              <div className="bg-white px-8 py-8 rounded-b-xl flex flex-col flex-1">
                <div className="flex items-center gap-5 text-sm pb-3">
                  <p className="bg-primary rounded-2xl px-3 font-semibold text-white">
                    {course.category}
                  </p>
                  <div className="flex items-center gap-1 text-text">
                    <Clock size={15} />
                    <p>{course.duration}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-text mb-2">
                  {course.title}
                </h3>
                <p className="text-sm font-bold text-text-secondary mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="mt-auto w-full text-center bg-gray-100 rounded-2xl my-5 text-primary font-bold py-4 hover:bg-gray-200 hover:cursor-pointer">
                  <NavLink to={`/courseDetail/${course.id}`} className="text-center">
                    Ver Curso
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FeaturedCourses;