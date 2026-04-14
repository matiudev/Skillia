export const CeroItems = ({ titulo, subtitulo, Icon, className = "" }) => {

    return (
        <div
            className={`p-6 rounded-2xl flex flex-col items-center ${className}`}
        >
            {/* Icono opcional */}
            {Icon && (
                <div className="mb-4 text-text">
                    <Icon size={40} />
                </div>
            )}

            <p
                className="text-lg font-semibold mb-2 text-center text-text"
            >
                {titulo}
            </p>

            {subtitulo && (
                <p
                    className="text-sm text-center text-secondary"
                >
                    {subtitulo}
                </p>
            )}
        </div>
    );
};