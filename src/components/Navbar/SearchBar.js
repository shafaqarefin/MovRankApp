import { useEffect, useRef } from "react";
import { useKey } from "../../hooks/useKey";
export function SearchBar({ query, setQuery, setSelectMovie }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.blur();
  }, []);

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (document.activeElement === inputEl.current) {
  //       if (e.code === "Escape") {
  //         inputEl.current.blur();
  //         setQuery("");
  //         setSelectMovie(null);
  //       } else {
  //         return;
  //       }
  //     }

  //     if (e.code === "Slash") {
  //       e.preventDefault();
  //       inputEl.current.focus();
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [setQuery, setSelectMovie]);

  useKey("Escape", () => {
    if (document.activeElement === inputEl.current) {
      inputEl.current.blur();
      setQuery("");
      setSelectMovie(null);
    }
  });
  useKey("Slash", (e) => {
    if (document.activeElement !== inputEl.current) {
      e.preventDefault();
      inputEl.current.focus();
    }
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
