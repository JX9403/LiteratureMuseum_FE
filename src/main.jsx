import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles/custom.scss";
import "./styles/boxCard.scss"; // Import file SCSS tùy chỉnh
import { LoginProvider } from "./context/LoginContext.jsx";
createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <App />
  </LoginProvider>

  // {/* </StrictMode>, */}
);
