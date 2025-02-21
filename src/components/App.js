import { useEffect, useState } from "react";
import { NavBar } from "./Navbar/NavBar";
import { Main } from "./Main/Main";
import { Logo } from "./Navbar/Logo";
import { SearchBar } from "./Navbar/SearchBar";
import { SearchResultCount } from "./Navbar/SearchResultCount";
import { Box } from "./Main/MovieList/Box";
import { MovieSummary } from "./Main/MoviesSummary/MovieSummary";
import { MoviesToSee } from "./Main/MovieList/MovieToSee";
import { WatchedMoviesList } from "./Main/MovieList/WatchedMoviesList";
import MovieDetails from "./Main/Movie Details/MovieDetails";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const KEY = process.env.REACT_APP_OMDB_API_KEY; //if you have your own key use it here.

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMssg, setErrMssg] = useState("");
  const [selectMovie, setSelectMovie] = useState(null);

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
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        if (!query) {
          setMovies([]);
          setErrMssg("");
          return;
        }
        try {
          setIsLoading(true);
          setErrMssg("");
          onCloseMovie();
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error(`Error Fetching Details`);
          }

          const movies = await res.json();

          if (movies.Response === "True") {
            setMovies(movies.Search);
          } else {
            throw new Error("Movies not found");
          }
        } catch (err) {
          if (err.name !== "AbortError") setErrMssg(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
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
