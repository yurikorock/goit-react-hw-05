import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { searchMovies } from "../../api/themoviedb";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";

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
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input type="text" name="query" className={css.input} />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
