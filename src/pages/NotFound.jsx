import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f0f3f8] flex flex-col items-center justify-center font-headline text-center px-4">
      <h1 className="text-8xl font-extrabold text-primary">404</h1>
      <h2 className="text-2xl font-bold text-text mt-4">Página no encontrada</h2>
      <p className="text-text-secondary mt-2 mb-8">
        La URL que ingresaste no existe o fue eliminada.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-900 transition-colors"
        >
          Ir al inicio
        </button>
        <button
          onClick={() => navigate(-1)}
          className="border border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-purple-100 transition-colors"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}

export default NotFound;