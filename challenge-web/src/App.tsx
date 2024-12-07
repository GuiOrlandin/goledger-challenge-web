import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Home from "./routes/home";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

