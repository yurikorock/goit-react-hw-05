import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjY2MWM4ZDA4Y2VmZmZmM2E4YzQ5NTNhMWVmNzFjMSIsIm5iZiI6MTc0NjExODM4MC40MDcsInN1YiI6IjY4MTNhNmVjOTBjYTQ4OTE1Y2U4MjA1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RQVeFZguNLd193W1d68z1sM6Td7mDNhBb5DvFT3W6Gs";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};
export const getTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?language=en-US`,
    options
  );
  return response.data.results;
};
export const getMovieDetailes = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};
export const getMovieCredits = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};
export const getMovieReview = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return response.data.results;
};
