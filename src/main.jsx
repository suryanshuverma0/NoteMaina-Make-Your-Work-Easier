import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import NotFound from "./Error/NotFound";
import NotePage from "./pages/Notes/NotePage";
import Profile from "./pages/Profile/Profile";
import Note from "./components/Note/Note";
import NoteDetails from "./components/NoteDetails/NoteDetails.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <App />,
        index: true,
      },
      {
        path: "/notes",
        element: (
          <ProtectedRoute>
            <NotePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/note",
        element: (
          <ProtectedRoute>
            <Note />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/note-details/:noteId",
    element: (
      <ProtectedRoute>
        <NoteDetails />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
