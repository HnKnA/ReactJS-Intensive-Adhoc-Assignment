import pagesRoutes from "./pages/pages.routes";
import authRoutes from "./pages/auth/auth.routes";
import { createBrowserRouter, Navigate } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/auth/login" replace />,
  },
  ...authRoutes,
  ...pagesRoutes,
]);

export default appRouter;


// Remember to add initFlowbite() on the layout each time you create new routes that use flowbite's javascript.