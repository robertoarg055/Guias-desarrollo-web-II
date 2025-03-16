import { useState } from "react";
// Estilos generales del contenedor de estrellas
const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px"
};
// Estilos del contenedor de estrellas individuales
const starContainerStyle = {
    display: "flex",
    gap: "4px"
};
/**
* Componente que muestra un sistema de calificación con estrellas interactivas.
* @param {Object} props
* @param {number} props.maxRating - Número máximo de estrellas (por defecto 5).
* @param {string} props.color - Color de las estrellas (por defecto '#fcc419').
* @param {number} props.size - Tamaño de las estrellas en píxeles (por defecto 30px).
* @param {number} props.defaultRating - Calificación inicial seleccionada (por
defecto 0).
* @param {Function} props.onSetRating - Función que se ejecuta al seleccionar una
calificación.
*/
export default function StarRating({
    maxRating = 5,
    color = '#fcc419',
    size = 30,
    defaultRating = 0,
    onSetRating
}) {
    // Estilos del texto de calificación
    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size}px`
    };
    // Estado para almacenar la calificación seleccionada
    const [rating, setRating] = useState(defaultRating);
    // Estado temporal para manejar la calificación al pasar el mouse
    const [tempRating, setTempRating] = useState(0);
    /**
    * Maneja el evento de selección de una calificación.
    * @param {number} rating - Calificación seleccionada.
    */
    function handleRating(rating) {
    setRating(rating);
    onSetRating?.(rating); // Llama a la función de callback si está definida
    }
    return (
        <div style={containerStyle}>
            {/* Contenedor de estrellas */}
            <div style={starContainerStyle}>
            {Array.from({ length: maxRating }, (_, i) => (
                <Star
                    key={i}
                    full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                    onRate={() => handleRating(i + 1)}
                    onHoverIn={() => setTempRating(i + 1)}
                    onHoverOut={() => setTempRating(0)}
                    color={color}
                    size={size}
                />
            ))}
        </div>
        {/* Muestra la calificación seleccionada o temporal */}
        <p style={textStyle}>{tempRating || rating || ""}</p>
        </div>
    );
}
/**
* Componente que representa una estrella individual en el sistema de calificación.
* @param {Object} props
* @param {boolean} props.full - Indica si la estrella está rellena o vacía.
* @param {Function} props.onRate - Función que se ejecuta al hacer clic en la
estrella.
* @param {Function} props.onHoverIn - Función que se ejecuta al pasar el mouse sobre
la estrella.
* @param {Function} props.onHoverOut - Función que se ejecuta al quitar el mouse de
la estrella.
* @param {string} props.color - Color de la estrella.
* @param {number} props.size - Tamaño de la estrella en píxeles.
*/
function Star({ full, onRate, onHoverIn, onHoverOut, color, size }) {
    // Estilos de la estrella
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: "pointer"
    };
    return (
        <span
            role="button"
            style={starStyle}
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {full ? (
                // Estrella rellena
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={color}
                    stroke={color}
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                        00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07
                        3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-
                        1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-
                        1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                </svg>
            ) : (
                // Estrella vacía
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={color}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0
                        00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518
                        4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-
                        .783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-
                        .38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                </svg>
            )}
        </span>
    );
}
