import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import RootLayout from "./layouts/RootLayout";
import PeoplePage from "./features/cards/people/pages/People";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "cards/people", element: <PeoplePage /> },
    ],
  },
]);
