import { useState } from "react";
import { NavBar } from "./Navbar/NavBar";
import { Main } from "./Main/Main";
import { Logo } from "./Navbar/Logo";
import { SearchBar } from "./Navbar/SearchBar";
import { SearchResultCount } from "./Navbar/SearchResultCount";
import { Box } from "./Main/MovieList/Box";
import { MovieSummary } from "./Main/MoviesSummary/MovieSummary";
import { MoviesToSee } from "./Main/MovieList/MovieToSee";
import { WatchedMoviesList } from "./Main/MovieList/WatchedMoviesList";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorage } from "../hooks/useLocalStorage";
import MovieDetails from "../components/Main/Movie Details/MovieDetails";
export const KEY = process.env.REACT_APP_OMDB_API_KEY; //if you have your own key use it here.
export default function App() {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [query, setQuery] = useState("");
  const [selectMovie, setSelectMovie] = useState(null);

  //custom hooks
  const [watched, setWatched] = useLocalStorage([], "watched"); //you can use any name for your localStorage
  const { movies, errMssg, isLoading } = useMovies(query, onCloseMovie);

  function onAddWatchedMovie(movie) {
    const updatedWatched = [...watched, movie];
    setWatched(updatedWatched);
    setSelectMovie(null);
  }

  function onCloseMovie() {
    setSelectMovie(null);
  }
  function onDeleteMovie(id) {
    const updatedWatched = watched.filter((movies) => movies.imdbID !== id);
    setWatched(updatedWatched);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar
          query={query}
          setQuery={setQuery}
          setSelectMovie={setSelectMovie}
        />
        <SearchResultCount movies={movies} />
      </NavBar>

      <Main>
        <Box movies={movies} isOpen={isOpen1} setIsOpen={setIsOpen1}>
          {isLoading && <Loader />}
          {!isLoading && !errMssg && (
            <MoviesToSee
              movies={movies}
              setSelectMovie={setSelectMovie}
              selectMovie={selectMovie}
            />
          )}
          {errMssg && <ErrorMssg message={errMssg} />}
        </Box>
        <Box isOpen={isOpen2} setIsOpen={setIsOpen2}>
          {selectMovie ? (
            <MovieDetails
              watched={watched}
              setSelectMovie={setSelectMovie}
              onCloseMovie={onCloseMovie}
              movies={movies}
              selectMovie={selectMovie}
              onAddWatchedMovie={onAddWatchedMovie}
              setQuery={setQuery}
            />
          ) : (
            <>
              <MovieSummary watched={watched} selectMovie={selectMovie} />
              <WatchedMoviesList
                watched={watched}
                selectMovie={selectMovie}
                onDeleteMovie={onDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMssg({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
