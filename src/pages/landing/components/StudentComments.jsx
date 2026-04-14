import React from "react";

const Comentarios = ({ name, inicial, profesion, descript }) => (
  <div className="bg-white p-8 rounded-2xl mb-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
        {inicial}
      </div>
      <div>
        <h5 className="font-bold">{name}</h5>
        <p className="text-xs text-text-secondary">{profesion}</p>
      </div>
    </div>
    <p className="text-on-surface italic">{descript}</p>
  </div>
);

function StudentComments({className}) {
  return (
    <div className={`md:flex-row flex flex-col items-center ${className}`}>
      <div className="flex-1 mb-10">
        <h3 className="text-5xl font-extrabold text-text mb-6">
          Lo que dicen nuestros estudiantes
        </h3>
        <p className="text-text mb-5">
          Más que una plataforma, somos una comunidad dedicada al crecimiento <br /> constante y la excelencia profesional
        </p>
        <button className="p-4 bg-white rounded-2xl mr-5">
          <span className="text-primary font-bold text-2xl">10k+</span>
          <p className="text-sm">ESTUDIANTES</p>
        </button>
        <button className="p-4 bg-white rounded-2xl">
          <span className="text-primary font-bold text-2xl">4.9/5</span>
          <p className="text-sm">VALORACIÓN</p>
        </button>
      </div>
      <div className="flex-1">
        <Comentarios
          name="Juan Delgado"
          inicial="JD"
          profesion="Fullstack Developer"
          descript='"Excelente contenido. Los instructores explican conceptos complejos de una
            manera muy sencilla. El curso de React cambió mi forma de programar."'
        />
        <Comentarios
          name="María Rodríguez"
          inicial="MR"
          profesion="UX Designer"
          descript='"Me ayudó a conseguir mi primer trabajo en tech. Los proyectos prácticos fueron clave para armar un portafolio sólido que impresionó a los reclutadores."'
        />
      </div>
    </div>
  );
}

export default StudentComments;
