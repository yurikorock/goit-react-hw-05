import { useParams } from "react-router-dom";
import { getMovieDetailes } from "../../api/themoviedb";
import { useEffect, useState } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetailes(movieId);
        setMovie(data);
      } catch (err) {
        setError(`Failed to fetch movie detailes!`);
      }
    };
    fetchMovie();
  }, [movieId]);
  if (!movie) return null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
  return (
    <div>
      <button>Go back</button>
      <div>
        <img src={posterUrl} alt={movie.title} />
      </div>
    </div>
  );
}
