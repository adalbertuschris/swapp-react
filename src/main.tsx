import React from "react";
import ReactDOM from "react-dom/client";
import "./g11n/i18n";
import App from "./App.tsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
