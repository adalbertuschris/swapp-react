import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import RootLayout from "./layouts/root-layout/RootLayout";
import PeoplePage from "./features/cards/people/pages/People";
import StarshipPage from "./features/cards/starships/pages/Starship";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "cards/people", element: <PeoplePage /> },
      { path: "cards/starships", element: <StarshipPage /> },
    ],
  },
]);
