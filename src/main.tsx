import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/page/:page" element={<App />} />
        <Route path="/create/" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/posts/:id/edit" element={<App />} />
        <Route path="/posts/:id/delete" element={<App />} />
        <Route path="/posts/:id/view" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
