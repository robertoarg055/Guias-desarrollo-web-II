import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies"; // Importa la clave de API desde el otro hook
/**
* Hook personalizado para obtener los detalles de una película desde la API de OMDb.
* @param {string} selectedId - ID único de la película seleccionada.
* @returns {Object} - Retorna un objeto con:
* - movie: Detalles de la película.
* - isLoading: Estado de carga de la solicitud.
* - error: Mensaje de error en caso de fallo.
*/
export function useFetchMovieDetails(selectedId) {
    // Estado para almacenar los detalles de la película
    const [movie, setMovie] = useState({});
    // Estado para indicar si la solicitud está en curso
    const [isLoading, setIsLoading] = useState(false);
    // Estado para manejar errores
    const [error, setError] = useState("");
    useEffect(() => {
        // Si no hay un ID seleccionado, limpiar el estado
        if (!selectedId) {
            setMovie({});
            setError("");
            
        }
        /**
        * Función asincrónica que obtiene los detalles de la película.
        * @param {string} selectedId - ID único de la película a consultar.
        */
        async function fetchMovieDetails(selectedId) {
            try {
            setIsLoading(true); // Activa el estado de carga
            setError(null); // Reinicia errores previos
            // Petición a la API de OMDb con la clave de acceso y el ID de lapelícula
            const response = await
fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);
            // Verifica si la respuesta HTTP es correcta
            if (!response.ok)
                throw new Error("Error al cargar los detalles de la película");
            const data = await response.json();
            // Guardar los detalles de la película en el estado
            setMovie(data);
        } catch (err) {
            // Manejo de errores: guardar el mensaje y limpiar el estado
            setError(err.message);
            setMovie({});
        } finally {
            setIsLoading(false); // Finaliza el estado de carga
        }
    }
    // Llamar a la función para obtener los datos
    fetchMovieDetails(selectedId);
}, [selectedId]); // Se ejecuta cada vez que cambia el ID seleccionado
// Retornar los valores necesarios para su uso en componentes
return { movie, isLoading, error };
}
