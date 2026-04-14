export const SkeletonCard = () => {
  return (
    <div className="rounded-xl shadow animate-pulse">
      {/* Imagen */}
      <div className="w-full h-20 md:h-98 bg-gray-300 rounded-t-lg"></div>

      <div className="bg-white px-8 py-8 rounded-b-xl">
        {/* Categoría + duración */}
        <div className="flex items-center gap-5 pb-3">
          <div className="h-6 w-20 bg-gray-300 rounded-2xl"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>

        {/* Título */}
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-3"></div>

        {/* Descripción */}
        <div className="space-y-2 mb-5">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        </div>

        {/* Botón */}
        <div className="h-12 w-full bg-gray-300 rounded-2xl"></div>
      </div>
    </div>
  );
};