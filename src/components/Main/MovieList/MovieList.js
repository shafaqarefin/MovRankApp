import { Movies } from "./Movies";

export function MovieList({ movies, isOpen1, setIsOpen1 }) {
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list">
          <Movies movies={movies} />
        </ul>
      )}
    </div>
  );
}
