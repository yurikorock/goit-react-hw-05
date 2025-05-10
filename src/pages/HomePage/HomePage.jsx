import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect } from "react";
import { getTrendingMovies } from "../../api/themoviedb";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError(`Failed to fetch tranding movies!`);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending Movies Today</h1>
      {error && <p className={css.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
