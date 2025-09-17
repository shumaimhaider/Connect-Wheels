import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store";
import { loginSuccess } from "./redux/slices/userSlice";
// Process token BEFORE React renders
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
if (token) {
  const user = { id: urlParams.get("userId"), email: urlParams.get("email") };
  store.dispatch(loginSuccess({ user, token }));
  window.history.replaceState({}, document.title, "/");
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
