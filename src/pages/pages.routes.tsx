import HomeComponent from "./home/HomeComponent";
import userRoutes from "./user/user.routes";
import Pages from "./pages";
import ProtectedRoute from "../shared/ProtectedRoute";
import { RouteObject } from "react-router-dom";

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
      ...userRoutes,
    ],
  },
];

export default pageRoutes;
