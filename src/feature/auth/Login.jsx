import React, { useState } from "react";
import Footer from "../../components/Footer";
import { Key, Mail } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      setError("Complete todos los campos");
      setLoading(false);
      return;
    }

    const { success, error } = await login(email, password);

    if (!success) {
      setEmail("");
      setPassword("");
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-[#f0f3f8] px-10 md:px-36 pt-15 font-headline">
        <div className="flex flex-1 items-center flex-col">
          <div className="text-center mb-20">
            <h4 className="text-5xl text-primary font-black">Skillia</h4>
            <p className="text-text-muted">
              Plataforma digital para mentes elevadas.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-10">
            <p className="text-2xl text-text font-semibold">
              Bienvenido de Nuevo
            </p>
            <p className="text-sm text-text-muted font-bold mb-8">
              Ingresa tus credenciales para continuar tu aprendizaje.
            </p>
            <div className="flex flex-col mb-5">
              <span className="text-text-muted text-sm font-bold flex items-center gap-2">
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
            <div className="flex flex-col">
              <span className="text-text-muted text-sm font-bold flex items-center gap-2">
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
              onClick={handleLogin}
            >
              {!loading ? (
                "Iniciar Sesion"
              ) : (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
            <p>
              No tienes una cuenta?{" "}
              <span>
                <NavLink className="text-primary font-bold" to="/register">
                  Registrate ahora
                </NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
