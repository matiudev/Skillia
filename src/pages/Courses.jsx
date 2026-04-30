import React, { useEffect } from "react";
import HeaderLanding from "../feature/landing/components/HeaderLanding";
import { useCourseStore } from "../feature/course/store/useCourseStore";
import { SkeletonCard } from "../components/SkeletonCard";
import { CeroItems } from "../components/CeroItems";
import { BookMarkedIcon } from "lucide-react";
import Footer from "../components/Footer";
import AllCourses from "../feature/course/components/AllCourse";
import { useCourses } from "../feature/course/hooks/useCourses";

function Courses() {
  const { courses, loading } = useCourses();

  return (
    <div>
      <div className="bg-[#f0f3f8] px-10 md:px-36 pt-6 pb-30 font-headline">
        <HeaderLanding />
        <div className="flex mt-15">
          <div className="md:w-1/5 hidden md:block">Filtro</div>
          <div className="md:w-4/5">
            <p className="text-5xl font-bold mb-2">Catálogo Maestro</p>
            <p className="text-sm font-bold text-text-secondary mb-10">
              Programas cuidadosamente diseñados para impulsar tus habilidades
              técnicas y creativas, y llevar tu carrera al siguiente nivel.
            </p>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : courses.length === 0 ? (
              <CeroItems
                titulo="No hay cursos disponibles"
                Icon={BookMarkedIcon}
                className="py-20"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-headline items-stretch">
                {courses.map((course) => (
                  <AllCourses key={course.id} course={course} />
                ))}
              </div>
            )}  
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Courses;
