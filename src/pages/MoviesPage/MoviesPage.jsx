import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { searchMovies } from "../../api/themoviedb";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

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
    if (newQuery === "") return;
    setSearchParams({ query: newQuery });
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
