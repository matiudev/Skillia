import { Clock } from "lucide-react";
import { NavLink } from "react-router-dom";

function AllCourses({ course }) {
  return (
    <div className="rounded-xl shadow flex flex-col h-full transition-transform duration-300 hover:scale-102 hover:translate-y-0.5">
      <img
        src={course.image_url}
        className="w-full h-48 object-cover rounded-t-lg shrink-0"
      />
      <div className="bg-white px-8 py-8 rounded-b-xl shadow flex flex-col flex-1">
        <div className="flex items-center gap-5 text-sm pb-3">
          <p className="bg-primary rounded-2xl px-3 font-semibold text-white">
            {course.category}
          </p>
          <div className="flex items-center gap-1 text-text">
            <Clock size={15} />
            <p>{course.duration}</p>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-text mb-2">{course.title}</h3>
        <p className="text-sm font-bold text-text-secondary mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="h-0.5 bg-gray-100 text-2xl" />
        <div className="flex justify-between items-center mt-5">
          <div className="flex gap-2 font-semibold">
            <p className="line-through">${course.price.toLocaleString()}</p>
            <p>$0</p>
          </div>
          <NavLink to={`/courseDetail/${course.id}`} className="text-center text-primary font-bold">
            Ver Curso {"->"}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
