import { QueryClient } from "@tanstack/react-query";

export const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const queryClient = new QueryClient();
