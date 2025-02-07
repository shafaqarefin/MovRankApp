import { useState } from "react";
import { tempWatchedData } from "../App";
import { MovieList } from "./MovieList/MovieList";
import { MovieSummary } from "./MoviesSummary/MovieSummary";
import { MoviesWatched } from "./WatchedMovies/MoviesWatched";

export function Main({ movies }) {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <main className="main">
      <MovieList movies={movies} isOpen1={isOpen1} setIsOpen1={setIsOpen1} />

      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
            <MovieSummary watched={watched} />
            <MoviesWatched watched={watched} />
          </>
        )}
      </div>
    </main>
  );
}
