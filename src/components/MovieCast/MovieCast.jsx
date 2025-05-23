import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../api/themoviedb";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fethCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch {
        setError("Failed to fetch cast!");
      }
    };
    fethCast();
  }, [movieId]);

  if (cast.length === 0 && error === null) {
    return null;
  }

  return (
    <div className={css.container}>
      {error && <p>{error}</p>}
      <ul className={css.list}>
        {cast.map((actor) => {
          const actorUrl = actor.profile_path
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : `https://dummyimage.com/200x300/cccccc/000000&text=No+Image`;
          return (
            <li key={actor.id} className={css.item}>
              <img src={actorUrl} alt={actor.name} className={css.image} />
              <p className={css.name}>{actor.name}</p>
              <p className={css.character}>Character: {actor.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
