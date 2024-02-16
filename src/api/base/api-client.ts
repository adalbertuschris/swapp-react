import { QueryClient } from "@tanstack/react-query";

export const baseUrl = process.env.SWAPP_REACT_APP_API_URL;

export const queryClient = new QueryClient();
