export function WatchedMoviesList({ watched, onDeleteMovie }) {
  function handleDeleteMovie(id) {
    onDeleteMovie(id);
  }
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => {
                handleDeleteMovie(movie.imdbID);
              }}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
