import { createHashRouter, RouteObject } from "react-router-dom";
import HomePage from "./layout/HomePage";

const route1: RouteObject = { path: "/", element: <HomePage /> };

export const router = createHashRouter([route1], {
  future: {
    v7_normalizeFormMethod: true,
  },
});
