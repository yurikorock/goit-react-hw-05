import MovieList from "../../components/MovieList/MovieList";
import { useState } from "react";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newQuery = form.elements.query.value.trim();
    console.log(newQuery);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
