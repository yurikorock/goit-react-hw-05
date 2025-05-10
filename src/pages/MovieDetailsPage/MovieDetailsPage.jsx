import { useParams, useNavigate, NavLink, useLocation } from "react-router-dom";
import { getMovieDetailes } from "../../api/themoviedb";
import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import css from "./MovieDetailsPage.module.css";

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
    <div className={css.container}>
      <button
        onClick={() => navigate(backLink.current)}
        className={css.backButton}
      >
        Go back
      </button>
      <div className={css.detailsWrapper}>
        <img src={posterUrl} alt={movie.title} className={css.poster} />
        <div className={css.info}>
          <h1>{movie.title}</h1>
          <p>Rating: {movie.vote_average.toFixed(1)}</p>
          <div className={css.section}>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
          <div className={css.section}>
            <h3>Genres</h3>
            <p>{movie.genres.map((gen) => gen.name).join(", ")}</p>
          </div>
        </div>
        <hr></hr>
        <div className={css.additional}>
          <h3>Additional information</h3>
          <div className={css.navLinks}>
            <NavLink to={"cast"}>Cast</NavLink>
            <NavLink to={"reviews"}>Reviews</NavLink>
          </div>
        </div>
        <hr></hr>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
