import { useEffect, useState } from "react";
import { KEY, Loader } from "../../App";
import StarRating from "../StartRating";
export default function MovieDetails({ setSelectMovie, movies, selectMovie }) {
  const [movDetails, setmovDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(null);

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectMovie}`
          );

          if (!res.ok) {
            throw new Error(`Error Fetching Details`);
          }

          const details = await res.json();

          if (details.Response === "True") {
            setmovDetails(details);
          } else {
            throw new Error("Error Fetching Stuff");
          }
        } catch (err) {
          console.error("error in Movie Details");
        } finally {
          setIsLoading(false);
          setRating(null);
        }
      }

      fetchMovieDetails();
    },
    [selectMovie]
  );
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movDetails;
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div
          className="details"
          onClick={() => {
            rating != null && setRating(null);
          }}
        >
          <header>
            <button
              className="btn-back"
              onClick={() => {
                setSelectMovie(null);
              }}
            >
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />{" "}
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                color="green"
                externalState={setRating}
              />
              {rating != null && (
                <button className="btn-add">+ Add to List</button>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}
