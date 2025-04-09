import { useEffect, useState } from "react";
import { KEY } from "../components/App";
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errMssg, setErrMssg] = useState("");

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
          callback();
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
  return { movies, isLoading, errMssg };
}
