import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import StarRating from "./components/Main/StartRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating maxRating={10} />
  </React.StrictMode>
);
