import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import HeaderDashboard from "../feature/dashboard/components/HeaderDashboard";
import { useParams } from "react-router-dom";

import {
  getCourseById,
  getProgressByUser,
  upsertProgress,
} from "../feature/course/services/courseService";
import { SkeletonCard } from "../components/SkeletonCard";
import { useAuthStore } from "../feature/auth/store/useAuthStore";

function CoursePlayer() {
  const { id } = useParams();

  const user = useAuthStore((state) => state.user);

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  // ── Carga inicial ──────────────────────────────────────────
  useEffect(() => {
    if (!user.id) return;

    const load = async () => {
      const [courseData, progressData] = await Promise.all([
        getCourseById(id),
        getProgressByUser(user.id),
      ]);

      setCourse(courseData);

      // IDs completadas
      const done = new Set(
        progressData.filter((p) => p.completed).map((p) => p.lesson_id),
      );
      setCompletedIds(done);

      console.log(courseData);

      // Lección activa: primera no completada, o la primera del curso
      const allLessons = courseData?.modules?.flatMap((m) => m.lessons) ?? [];
      const firstPending = allLessons.find((l) => !done.has(l.id));
      const initial = firstPending ?? allLessons[0];

      if (initial) {
        setActiveLesson(initial);
        setActiveModule(
          courseData.modules.find((m) =>
            m.lessons.some((l) => l.id === initial.id),
          ),
        );
      }

      setLoading(false);
    };

    load();
  }, [id, user.id]);

  // ── Cambiar lección ────────────────────────────────────────
  const handleSelectLesson = (lesson) => {
    if (!course) return;
    setActiveLesson(lesson);
    setActiveModule(
      course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id)),
    );

    if (!completedIds.has(lesson.id)) {
      upsertProgress(user.id, lesson.id, false);
    }
  };

  // ── Video terminado → marcar como completada ───────────────
  const handleVideoEnded = async () => {
    if (!activeLesson || !course || completedIds.has(activeLesson.id)) return;

    await upsertProgress(user.id, activeLesson.id, true);
    setCompletedIds((prev) => new Set([...prev, activeLesson.id]));

    const allLessons = course.modules.flatMap((m) => m.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
    const next = allLessons[currentIndex + 1];
    if (next) {
      // Al avanzar automáticamente, solo cambiar UI sin tocar el progreso de la siguiente
      setActiveLesson(next);
      setActiveModule(
        course.modules.find((m) => m.lessons.some((l) => l.id === next.id)),
      );
    }
  };

  // ── Botón "Continuar" → siguiente lección no completada ────
  const handleContinue = () => {
    if (!course || !activeLesson) return; // ← guard
    const allLessons = course.modules.flatMap((m) => m.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);
    const next = allLessons[currentIndex + 1];
    if (next) handleSelectLesson(next);
  };

  // ── Métricas de progreso ───────────────────────────────────
  const allLessons = course?.modules?.flatMap((m) => m.lessons) ?? [];
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) =>
    completedIds.has(l.id),
  ).length;
  const percentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <>
      <section className="bg-[#f0f3f8] px-4 sm:px-8 md:px-20 lg:px-36 pb-20 pt-6 font-headline overflow-x-hidden">
        <HeaderDashboard />

        {loading ? (
          <SkeletonCard />
        ) : (
          <section className="flex flex-col md:flex-row gap-6 mt-8">
            {/* ── Izquierda 2/3 ── */}
            <div className="md:w-2/3 flex flex-col gap-4">
              {/* Video o imagen fallback */}
              <div className="relative rounded-2xl overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  key={activeLesson.id} // fuerza re-render al cambiar lección
                  //   src={activeLesson.video_url}
                  src="https://www.pexels.com/download/video/34279721/"
                  controls
                  onEnded={handleVideoEnded}
                  className="w-full h-72 md:h-150 object-cover"
                />
              </div>

              {/* Info lección */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                  {activeModule?.title}
                </span>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {activeLesson?.title}
                </h1>

                <p className="text-gray-500 text-sm mb-5">
                  {course.description}
                </p>
              </div>
            </div>

            {/* ── Derecha 1/3 ── */}
            <div className="md:w-1/3 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
              {/* Header sidebar */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={course.image_url}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                    alt={course.title}
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm leading-tight">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {activeModule?.title}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{percentage}% completado</span>
                  <span>
                    {completedCount}/{totalLessons} lecciones
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Lista lecciones scrolleable */}
              <div className="flex-1 overflow-y-auto">
                {course.modules.map((module) => (
                  <div key={module.id}>
                    <p className="px-4 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {module.title}
                    </p>

                    {module.lessons.map((lesson) => {
                      const isActive = lesson.id === activeLesson?.id;
                      const isCompleted = completedIds.has(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleSelectLesson(lesson)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                            ${isActive ? "bg-blue-50" : "hover:bg-gray-50"}`}
                        >
                          {/* Ícono estado */}
                          <div className="shrink-0">
                            {isCompleted ? (
                              <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-green-500"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2.5}
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : isActive ? (
                              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-3.5 h-3.5 text-blue-600 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-3.5 h-3.5 text-gray-400 ml-0.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium truncate ${isActive ? "text-blue-700" : "text-gray-800"}`}
                            >
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {lesson.duration + " minutos" ?? "--:--"}
                              {isActive && (
                                <span className="ml-2 text-blue-500">
                                  • Reproduciendo
                                </span>
                              )}
                            </p>
                          </div>

                          {/* Indicador activo */}
                          {isActive && (
                            <svg
                              className="w-4 h-4 text-blue-400 shrink-0"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 18h2V6H3v12zm4 0h2v-5H7v5zm0-7h2V6H7v5zm4 7h2V3h-2v15zm4 0h2v-8h-2v8zm0-10h2V6h-2v2z" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Botón continuar */}
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleContinue}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-xl"
                >
                  Continuar Lección →
                </button>
              </div>
            </div>
          </section>
        )}
      </section>
      <Footer />
    </>
  );
}

export default CoursePlayer;
