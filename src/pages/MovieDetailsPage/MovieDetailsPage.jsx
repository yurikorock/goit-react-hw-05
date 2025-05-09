import { useParams, useNavigate, NavLink, useLocation } from "react-router-dom";
import { getMovieDetailes } from "../../api/themoviedb";
import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");

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
      <button onClick={() => navigate(backLink.current)}>Go back</button>
      <div>
        <img src={posterUrl} alt={movie.title} />
        <div>
          <h1>{movie.title}</h1>
          <p>Rating: {movie.vote_average.toFixed(1)}</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((gen) => gen.name).join(", ")}</p>
        </div>
        <hr></hr>
        <div>
          <h3>Additional information</h3>
          <NavLink to={"cast"}>Cast</NavLink>
          <NavLink to={"reviews"}>Reviews</NavLink>
        </div>
        <hr></hr>
        <Outlet />
      </div>
    </div>
  );
}
