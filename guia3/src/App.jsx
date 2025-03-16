import { useState } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from
"./components/WatchedMovie";
import { useEffect } from "react";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";
/**
* Componente principal de la aplicación.
*/
export default function App() {
  // Estado de películas vistas
  const [watched, setWatched] = useState(initialWatched());
  // Función para guardar las películas vistas en localStorage
  function initialWatched() {
    const localStorageWatched = localStorage.getItem('watched');
    return localStorageWatched ? JSON.parse(localStorageWatched) : [];
  }
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);
  // Estado para la búsqueda de películas
  const [query, setQuery] = useState("");
  // Obtiene películas basadas en la consulta
  const { movies, isLoading, error } = useFetchMovies(query);
  
  // Estado para la película seleccionada
  const [selectedId, setSelectedId] = useState(null);
  /**
    * Maneja la selección de una película.
    * @param {string} id - ID de la película seleccionada.
    */
  function handleSelectMovie(id) {
    setSelectedId(id);
  }
/**
  * Cierra los detalles de la película.
  */
  function handleCloseMovie() {
    setSelectedId(null);
  }
/**
* Agrega una película a la lista de vistas.
    * @param {Object} movie - Película a agregar.
    */
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  // Función para borrar una película de las ya vustas, use imobId ya que al probar con 
  // id no tenía ningún efecto y busque que al usar una api imobid era la forma indicada y ahí si funciono
  // Para realizar esta función me guie de la tarea pasada de las guía 2
  function handleDeleteWatched(movieId) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== movieId));
  }  
  return (
  <>
  <Nav>
    <Logo />
    <Search query={query} setQuery={setQuery} />
    <NumResults movies={movies} />
  </Nav>
  <main className="main">
    <Box>
      {isLoading && <p className="loader">Cargando...</p>}
      {error && <p className="error">⛔ {error}</p>}
      <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
    </Box>
    <Box>
      <WatchedMoviesContainer>
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
            onAddWatched={handleAddWatched}
            watched={watched}
          />
        ) : (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
          </>
        )}
      </WatchedMoviesContainer>
    </Box>
  </main>
</>
);
}
