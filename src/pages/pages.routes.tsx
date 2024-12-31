import HomeComponent from "./home/HomeComponent";
import userRoutes from "./user/user.routes";
import Pages from "./pages";
import ProtectedRoute from "../shared/ProtectedRoute";
import { RouteObject } from "react-router-dom";
import UserReview from "./user/officer/review";

const pageRoutes: RouteObject[] = [
  {
    path: "pages",
    element: (
      <ProtectedRoute>
        <Pages />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <HomeComponent />,
      },
      {
        path: "review",
        element: <UserReview />,
      },
      ...userRoutes,
    ],
  },
];

export default pageRoutes;
