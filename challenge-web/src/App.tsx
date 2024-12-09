import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Home from "./routes/home";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import Playlist from "./routes/playlist";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/playlist/:id",
      element: <Playlist />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

