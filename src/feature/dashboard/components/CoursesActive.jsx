import { NavLink } from "react-router-dom";

function CoursesActive({ course, myProgress }) {
  const totalLessons = course.modules.reduce((acc, module) => {
    return acc + module.lessons.length;
  }, 0);

  const progresInCurso = myProgress.map((pr) => pr.lesson_id);

  const lessonsWithProgress = [];
  course.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      if (progresInCurso.includes(lesson.id)) {
        lessonsWithProgress.push(lesson);
      }
    });
  });
  
  const percentage = Math.round((lessonsWithProgress.length / totalLessons) * 100);

  return (
    <section className="bg-white rounded-2xl flex justify-between p-7 items-center">
      <div className="flex gap-10">
        <img src={course.image_url} alt="" className="h-48 w-80 rounded-xl" />

        <div className="flex flex-col justify-center gap-3">
          <p className="text-2xl font-semibold text-text">{course.title}</p>
          <p className="text-lg font-semibold text-text">
            Módulo: {lessonsWithProgress.at(-1)?.title}
          </p>

          {/* Barra de progreso */}
          <div className="w-64">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Progreso</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {lessonsWithProgress.length} de {totalLessons} lecciones
            </p>
          </div>
        </div>
      </div>

      <div>
        <NavLink to={`/coursePlayer/${course.id}`} className="bg-primary w-full rounded-xl p-3 text-white font-semibold">
          Continuar Aprendiendo →
        </NavLink>
      </div>
    </section>
  );
}
export default CoursesActive;
