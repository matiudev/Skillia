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

  const percentage = Math.round(
    (lessonsWithProgress.length / totalLessons) * 100
  );

  return (
    <section className="bg-white rounded-2xl p-5 md:p-7 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center justify-between">
      
      {/* Imagen + Info */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full sm:w-auto">
        <img
          src={course.image_url}
          alt={course.title}
          className="w-full sm:w-48 md:w-64 lg:w-80 h-44 sm:h-36 md:h-40 lg:h-48 rounded-xl object-cover shrink-0"
        />

        <div className="flex flex-col justify-center gap-3 min-w-0">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-text truncate">
            {course.title}
          </p>

          {lessonsWithProgress.at(-1) && (
            <p className="text-sm md:text-base font-semibold text-text-secondary truncate">
              Última lección: {lessonsWithProgress.at(-1)?.title}
            </p>
          )}

          {/* Barra de progreso */}
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-xs md:text-sm text-gray-500 mb-1">
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

      {/* Botón */}
      <div className="w-full sm:w-auto shrink-0">
        <NavLink
          to={`/coursePlayer/${course.id}`}
          className="bg-primary block text-center sm:inline-block rounded-xl px-5 py-3 text-white font-semibold hover:bg-purple-900 transition-colors whitespace-nowrap"
        >
          Continuar →
        </NavLink>
      </div>
    </section>
  );
}

export default CoursesActive;