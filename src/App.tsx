import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app-router";

function Main() {
  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <Suspense fallback="loading app">
      <Main />
    </Suspense>
  );
}
