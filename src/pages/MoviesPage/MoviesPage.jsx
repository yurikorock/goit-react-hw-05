import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { searchMovies } from "../../api/themoviedb";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query === "") return;
    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query);
        setMovies(data);
        setError(null);
      } catch {
        setError("Failed to search movies.");
      }
    };
    fetchMovies();
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newQuery = form.elements.query.value.trim();
    if (newQuery) {
      setQuery(newQuery);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
