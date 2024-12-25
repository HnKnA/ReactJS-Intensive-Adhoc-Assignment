import { RouteObject } from "react-router";
import ResetPassword from "./reset-password/reset-password";
import SignUp from "./sign-up/sign-up";
import React, { Suspense } from "react";
import Spinner from "../../components/spinner/spinner";
import { lazyLoadWithDelay } from "../../utils/lazyLoadWithDelay";

// Lazy load your components with a 1.5 second delay
const Auth = lazyLoadWithDelay(() => import("./auth"), 1500);
const Login = lazyLoadWithDelay(() => import("./login/Login"), 1500);

const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: (
      <Suspense fallback={<Spinner />}>
        <Auth />
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export default authRoutes;
