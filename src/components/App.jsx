//App.jsx

import { useState, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage.";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./MovieCast/MovieCast";
import MovieReviews from "./MovieReviews/MovieReviews";

const App = () => {
  return (
    <div>
      <h1 className="title">Filmoteka</h1>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/movies" element={<MoviesPage />}></Route>
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />}></Route>
          <Route path="reviews" element={<MovieReviews />}></Route>
        </Route>
        <Route path="/movies" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
};
export default App;
