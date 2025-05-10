import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReview } from "../../api/themoviedb";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fethReviews = async () => {
      try {
        const data = await getMovieReview(movieId);
        setReviews(data);
        setError(null);
      } catch {
        setError("Failed to fetch reviews!");
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };
    fethReviews();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>Sorry, no reviews available.</p>;
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {reviews.map((review) => (
          <li key={review.id} className={css.item}>
            <h3 className={css.author}>{review.author}</h3>
            <p className={css.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
