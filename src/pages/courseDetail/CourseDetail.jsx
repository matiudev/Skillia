import React, { useEffect, useState } from "react";
import HeaderLanding from "../landing/components/HeaderLanding";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../services/courseService";
import { SkeletonCard } from "../../components/SkeletonCard";
import {
  Clock,
  Infinity,
  PlayCircle,
  Smartphone,
  Star,
  User,
  Verified,
} from "lucide-react";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [openModule, setOpenModule] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getCourseById(id);
      setCourse(data);
    };
    fetch();
  }, [id]);

  return (
    <div>
      <div className="bg-[#f0f3f8] px-4 sm:px-8 md:px-20 lg:px-36 pb-20 pt-6 font-headline overflow-x-hidden">
        <HeaderLanding />

        {!course ? (
          <SkeletonCard />
        ) : (
          <div className="mt-10 md:mt-15">
            {/* Banner hero */}
            <section className="relative w-full mb-10 md:mb-16">
              <div className="relative overflow-hidden rounded-xl bg-indigo-900 shadow-2xl">
                <img
                  src={course.image_url}
                  className="w-full h-48 sm:h-72 md:h-96 lg:h-128 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-linear-to-t from-indigo-950/80 to-transparent flex flex-col justify-end p-5 md:p-8 lg:p-12">
                  <p className="text-white mb-3 text-xs font-label tracking-widest uppercase">
                    {course.category}
                  </p>
                  <h1 className="text-white font-headline font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-4 max-w-4xl">
                    {course.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 md:gap-6">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
                      <Star color="yellow" size={16} />
                      <span className="text-white font-bold text-sm">
                        {course.rating}
                      </span>
                      <span className="text-white/60 text-xs">
                        (2.4k reseñas)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User color="white" size={16} />
                      <div>
                        <p className="text-white/60 text-xs font-label tracking-wider uppercase">
                          Instructor
                        </p>
                        <p className="text-white font-semibold text-sm">
                          {course.instructor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contenido principal */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-15 items-start">
              {/* Columna izquierda */}
              <section className="w-full lg:w-[70%]">
                <section className="p-5 md:p-8 bg-white rounded-2xl">
                  <h5 className="text-xl md:text-2xl font-bold text-text">
                    Sobre este curso
                  </h5>
                  <p className="whitespace-pre-line text-text-secondary font-semibold mt-3 text-sm md:text-base">
                    {course.description}
                  </p>
                </section>

                <section className="mt-10 md:mt-20">
                  <h5 className="text-xl md:text-2xl font-bold text-text mb-6 md:mb-10">
                    Temario del curso
                  </h5>
                  {course.modules.map((module, index) => {
                    const isOpen = openModule === module.id;
                    return (
                      <div
                        key={module.id}
                        className="mb-4 border border-gray-200 rounded-xl bg-white"
                      >
                        <button
                          onClick={() =>
                            setOpenModule(isOpen ? null : module.id)
                          }
                          className="w-full flex justify-between items-center p-4 font-semibold text-left text-base md:text-xl"
                        >
                          <div className="flex items-center gap-2 pr-4">
                            <span className="bg-purple-100 px-2 rounded-full text-sm md:text-base text-primary shrink-0">
                              {index + 1}
                            </span>
                            <span>{module.title}</span>
                          </div>
                          <span className="shrink-0 text-xl">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <ul className="px-4 pb-4">
                            {module.lessons.map((lesson) => (
                              <li
                                key={lesson.id}
                                className="flex justify-between items-center py-4 md:py-6 border-b border-gray-100 gap-4"
                              >
                                <div className="flex gap-3 items-center min-w-0">
                                  <PlayCircle
                                    className="text-text shrink-0"
                                    size={18}
                                  />
                                  <span className="text-sm md:text-base truncate">
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-sm shrink-0 text-text-secondary">
                                  {lesson.duration} min
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </section>
              </section>

              {/* Sidebar derecho */}
              <section className="bg-white rounded-2xl w-full lg:w-[30%] p-6 md:p-10 lg:sticky lg:top-6">
                <div className="flex gap-2 font-semibold text-2xl md:text-3xl">
                  <p className="line-through text-text-secondary">
                    ${course.price.toLocaleString()}
                  </p>
                  <p>$0</p>
                </div>
                <button className="bg-primary px-5 w-full rounded-2xl py-3 text-white font-bold mt-5 hover:bg-purple-900 hover:cursor-pointer transition-colors">
                  Inscribirse Ahora
                </button>
                <p className="text-center mt-3 font-semibold text-text-secondary text-sm">
                  Garantía de Devolución de 30 días
                </p>
                <div className="space-y-4 mt-8">
                  {[
                    { Icon: Clock, text: "Duración: 24 horas de contenido" },
                    { Icon: Verified, text: "Certificado de finalización" },
                    { Icon: Infinity, text: "Acceso de por vida" },
                    {
                      Icon: Smartphone,
                      text: "Acceso en dispositivos móviles",
                    },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm">
                      <Icon className="text-primary shrink-0" size={18} />
                      <p className="font-medium text-text-secondary">{text}</p>
                    </div>
                  ))}
                </div>
                <div className="h-0.5 bg-gray-100 mt-5" />
              </section>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CourseDetail;
