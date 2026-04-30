import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../auth/store/useAuthStore";

const linkClass = ({ isActive }) =>
  isActive
    ? "text-secondary font-semibold font-headline border-b-2 border-secondary"
    : "text-text-muted font-semibold font-headline";

function HeaderLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <header className="w-full">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        <p className="text-secondary font-semibold text-2xl">Skillia</p>

        <div className="hidden md:flex gap-12">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/courses" className={linkClass}>
            Cursos
          </NavLink>
        </div>

        {user ? (
          <div className="hidden md:flex gap-6 items-center">
            <NavLink
              to="/dashboard"
              className="text-secondary font-semibold font-headline"
            >
              Dashboard
            </NavLink>
          </div>
        ) : (
          <div className="hidden md:flex gap-6 items-center">
            <NavLink
              to="/login"
              className="text-secondary font-semibold font-headline"
            >
              Iniciar Sesión
            </NavLink>

            <NavLink
              to="/register"
              className="bg-btn-primary px-6 py-2 rounded-lg text-btn-primary-text font-semibold font-headline"
            >
              Registrarse
            </NavLink>
          </div>
        )}

        {/* Mobile Button */}
        <button
          className="md:hidden text-secondary text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen &&
        (user ? (
          <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/courses"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Cursos
            </NavLink>

            <NavLink
              to="/dashboard"
              className="text-secondary font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/courses"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Cursos
            </NavLink>

            <NavLink
              to="/login"
              className="text-secondary font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar Sesión
            </NavLink>

            <NavLink
              to="/register"
              className="bg-btn-primary px-4 py-2 rounded-lg text-btn-primary-text font-semibold text-center"
              onClick={() => setMenuOpen(false)}
            >
              Registrarse
            </NavLink>
          </div>
        ))}
    </header>
  );
}

export default HeaderLanding;
