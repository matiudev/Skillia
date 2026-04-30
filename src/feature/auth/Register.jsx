import React, { useState } from "react";
import Footer from "../../components/Footer";
import { Key, Mail, Medal, SquareStar, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const register = useAuthStore((state) => state.register);

  const handleRegister = async () => {
    setLoading(true);
    if (!fullName || !email || !password) {
      setError("Complete todos los campos");
      setLoading(false);
      return;
    }

    const { success, error } = await register(email, password, fullName);

    if (!success) {
      setFullName("");
      setEmail("");
      setPassword("");
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#f0f3f8] grid grid-cols-1 md:grid-cols-2 gap-8 md:px-36 pt-15 items-center font-headline grow">
        <div className="md:flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter  text-primary">
              Academia de Cristal
            </h1>
            <p className="text-text text-xl">
              Donde la claridad visual se encuentra con el <br /> aprendizaje de
              alto rendimiento. Únete a la <br /> comunidad de curaduría digital
              más sofisticada.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl flex flex-col gap-3">
              <SquareStar color="purple" />
              <h3 className="font-bold text-lg">Curaduría Premium</h3>
              <p className="text-sm">
                Contenido seleccionado por expertos de la industria.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl flex flex-col gap-3">
              <Medal color="purple" />
              <h3 className="font-bold text-lg">Certificación</h3>
              <p className="text-sm">
                Valida tus habilidades con estándares globales.
              </p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 w-full">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4XHOFQ1AeVZ7x7lsXlNdoePilzeXMcReCKkE42cZZLxNycxkcd-5gKdHXZNNNgMG3O8UYFlK9qnBjsX2aqan4BUllk_g82RPI45REXeWhCn5vNFfQvfGmoqvytSyLud74pUiNnS6qrQLSw_GZuW0Q_3B-dY5tOd3RnAVdidsLS7A1tXOK3xxhBiDuLZNI6d0pTMol38CaIhGBDjGPVphAHTfBOjDZ0xaaLjhN_OEJ3gClLOBMyx_A6J6lmklbG53BBjeUNuHopb4"
            />
            <div className="absolute inset-0 bg-indigo-700/10"></div>
          </div>
        </div>
        <div className="bg-[#f0f3f8] px-10 md:px-36 pt-15 font-headline">
          <div className="flex flex-1 items-center flex-col">
            <div className="bg-white rounded-2xl p-10">
              <p className="text-2xl text-text font-semibold">CREAR CUENTA</p>
              <p className="text-sm text-text-muted font-bold mb-8">
                Comienza tu viaje educativo hoy mismo.
              </p>
              <div className="flex flex-col mb-5">
                <span className="text-text-muted text-sm font-bold flex items-center gap-2 mb-2">
                  <User size={15} />
                  NOMBRE COMPLETO
                </span>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-gray-100 rounded-lg py-3 px-3 focus:border-primary focus:border-2 focus:outline-none"
                  placeholder="Pepito Perez"
                />
              </div>
              <div className="flex flex-col mb-5">
                <span className="text-text-muted text-sm font-bold flex items-center gap-2 mb-2">
                  <Mail size={15} />
                  CORREO ELECTRONICO
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 rounded-lg py-3 px-3 focus:border-primary focus:border-2 focus:outline-none"
                  placeholder="nombre@ejemplo.com"
                />
              </div>
              <div className="flex flex-col mb-10">
                <span className="text-text-muted text-sm font-bold flex items-center gap-2 mb-2">
                  <Key size={15} />
                  CONTRASEÑA
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 rounded-lg py-3 px-3 focus:border-primary focus:border-2 focus:outline-none"
                  placeholder="●●●●●●●●●"
                />
              </div>
              <p className="mt-5 text-red-600 font-bold">{error}</p>

              <button
                className="bg-primary rounded-lg w-full py-3 text-white font-semibold mb-5 mt-5"
                onClick={handleRegister}
              >
                {!loading ? (
                  "Registrarse"
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
              <p>
                Tienes una cuenta?{" "}
                <span>
                  <NavLink className="text-primary font-bold" to="/login">
                    Inicia sesion ahora
                  </NavLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
