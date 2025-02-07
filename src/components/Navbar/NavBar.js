import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { SearchResultCount } from "./SearchResultCount";

export function NavBar({ movies, setQuery, query }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar query={query} setQuery={setQuery} />
      <SearchResultCount movies={movies} />
    </nav>
  );
}
