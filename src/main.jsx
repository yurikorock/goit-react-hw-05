import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
// Імпорт стилів нормалізації
import "modern-normalize";
//
import "./index.css";
import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
