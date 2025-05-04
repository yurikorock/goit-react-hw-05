import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect } from "react";
import { getTrendingMovies } from "../../api/themoviedb";

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
    <div>
      <h1>Trending Movies</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
