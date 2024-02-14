import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import RootLayout from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "", element: <Home /> }],
  },
]);
