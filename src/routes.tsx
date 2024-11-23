import { createHashRouter, RouteObject } from "react-router-dom";
import HomePage from "./layout/HomePage";

const route1: RouteObject = { path: "/", element: <HomePage /> };

export const router = createHashRouter([route1], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
