import React from "react";

function HowItWorks({ className }) {
  return (
    <div className={`${className}`}>
      <p className="text-3xl text-center font-bold">Como funciona</p>
      <p className="text-center text-text-secondary mb-10">
        Tu camino hacia el éxito profesional en tres simples pasos diseñados por
        expertos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-primary shadow-lg mb-8">
            <span className="font-headline font-black text-2xl text-primary">
              1
            </span>
          </div>
          <h4 className="font-headline font-bold text-xl mb-3">Regístrate</h4>
          <p className="text-on-surface-variant">
            Crea tu cuenta en segundos y accede a nuestra plataforma intuitiva.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-secondary shadow-lg mb-8">
            <span className="font-headline font-black text-2xl text-secondary">
              2
            </span>
          </div>
          <h4 className="font-headline font-bold text-xl mb-3">
            Elige un curso
          </h4>
          <p className="text-on-surface-variant">
            Explora cientos de temas y selecciona el que mejor se adapte a tus
            metas.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-primary shadow-lg mb-8">
            <span className="font-headline font-black text-2xl text-primary">
              3
            </span>
          </div>
          <h4 className="font-headline font-bold text-xl mb-3">
            Aprende y progresa
          </h4>
          <p className="text-on-surface-variant">
            Completa lecciones, realiza proyectos y recibe tu certificado
            oficial.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
