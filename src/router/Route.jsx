import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import FriendPage from "../pages/FriendPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/friend",
    element: <FriendPage />,
  },
]);
