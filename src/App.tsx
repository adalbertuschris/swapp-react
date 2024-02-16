import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/base/api-client";

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <Suspense fallback="loading app">
      <Main />
    </Suspense>
  );
}
