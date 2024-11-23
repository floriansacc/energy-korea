import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode>,
);
