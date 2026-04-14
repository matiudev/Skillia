import { CircleStar, Clock, Infinity } from "lucide-react";
import HeaderLanding from "./components/HeaderLanding";
import { NavLink } from "react-router-dom";
import HowItWorks from "./components/HowItWorks";
import FeaturedCourses from "./components/FeaturedCourses";
import StudentComments from "./components/StudentComments";
import Footer from "../../components/Footer";

const INFO = [
  {
    Icon: Clock,
    title: "Aprende a tu ritmo",
    descript:
      "Sin horarios fijos ni presiones. Avanza cuando tengas tiempo y desde cualquiero dispositivo.",
    color: "#2563eb",
  },
  {
    Icon: Infinity,
    title: "Acceso ilimitado",
    descript:
      "Una sola suscripción para acceder a todo nuestro catálogo de cursos premium actualizados.",
    color: "#702ae1",
  },
  {
    Icon: CircleStar,
    title: "Certificados",
    descript:
      "Obtén certificaciones con validez internacional al finalizar cada uno de tus trayectos.",
    color: "#2563eb",
  },
];

function Landing() {
  return (
    <div>
   <div className="bg-[#f0f3f8] px-10 md:px-36 pt-6 pb-30 font-headline">
        <div className="h-dvh">
          <HeaderLanding />
          <div className="grid grid-cols-2 justify-between gap-10 mt-20">
            <div>
              <h1 className="font-extrabold text-5xl md:text-8xl leading-tight text-text mb-6">
                Aprende nuevas habilidades desde{" "}
                <span className="text-primary italic">casa</span>
              </h1>
              <p className="text-text-muted text-xl mb-10 font-semibold max-w-2xl">
                Únete a más de 10,000 estudiantes y transforma tu carrera con
                los mejores instructores del mundo digital.
              </p>
              <div className="gap-4 flex">
                <NavLink
                  to="/courses"
                  className="px-8 py-4 bg-btn-primary text-btn-primary-text font-semibold rounded-xl text-lg"
                >
                  Explorar Cursos
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-8 py-4 text-primary font-semibold text-lg"
                >
                  Comenzar Ahora
                </NavLink>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAitf6C6Qtx3ukksXkxFQ-0gRB-sXBRktO4DfpFPQcWkLfUhcJJ90Ely1yFcAGBe1d6N-EGgAt7_5fzgAsoSBCRp8U76WZhrbTkrr-9xoMCh6u_EmXi2YYzCyL79_AyuFersvM2r3mms549CXe7za4BBZDR0WFBAxe9Is-ZlL6G7Fi7uIR0I6Y8Qrg7WwfDtroTpT-jrSMlkjPZie-pMUYIZHdgATlz6aODYxEzw9EYU7IixEBuOcHEE8b1JRYCpI1wtR8AR7QHsdg"
                alt=""
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-4/3"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 pb-20">
          {INFO.map((item) => (
            <div className="bg-white p-10 rounded-2xl" key={item.title}>
              <div
                className={`w-fit p-3 rounded-xl mb-5`}
                style={{ backgroundColor: item.color }}
              >
                <item.Icon color="white" size={20} />
              </div>
              <p className="text-2xl font-bold text-text">{item.title}</p>
              <p className="text-text-secondary">{item.descript}</p>
            </div>
          ))}
        </div>
        <FeaturedCourses />
        <HowItWorks className="mt-30" />
        <StudentComments className="mt-30 mb-30" />

        <div className="bg-primary text-center p-12 rounded-2xl">
          <p className="text-3xl md:text-6xl font-semibold text-btn-primary-text mb-6">
            ¿Listo para empezar?
          </p>
          <p className="text-btn-primary-text text-xl">
            Crea tu cuenta gratis hoy mismo y obtén acceso a los <br /> primeros
            módulos de cualquier curso.
          </p>
          <button className="bg-white text-btn-secondary-text px-8 py-4 rounded-xl font-semibold text-xl mt-10">
            Comenzar Gratis
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
