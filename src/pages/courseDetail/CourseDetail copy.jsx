import React, { useEffect, useState } from "react";
import HeaderLanding from "../landing/components/HeaderLanding";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../services/courseService";
import { SkeletonCard } from "../../components/SkeletonCard";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getCourseById(id);
      setCourse(data);
    };

    fetch();
  }, [id]);

  console.log(course);
  

  return (
    <div>
      <div className="bg-[#f0f3f8] px-36 pb-36 pt-6 font-headline">
        <HeaderLanding />

        {!course ? (
          <SkeletonCard />
        ) : (
          <div className="flex mt-15">
            <div className="w-2/3">
              <img
                src={course.image_url}
                className="w-full h-128 object-cover rounded-t-lg shrink-0"
              />
              <div>
                <h4 className="text-6xl">{course.title}</h4>
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Contenido del curso</h3>

                {course.modules.map((module) => (
                  <div key={module.id} className="mb-6">
                    <h4 className="font-semibold text-lg">{module.title}</h4>

                    <ul className="ml-4 mt-2">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex justify-between py-2 border-b"
                        >
                          <span>{lesson.title}</span>
                          <span>{lesson.duration} min</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/3">aa</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CourseDetail;
