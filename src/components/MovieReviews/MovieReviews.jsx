import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReview } from "../../api/themoviedb";

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
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
