import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import { AuthenticatedContext } from "../../../shared/Authenticated";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthenticatedContext);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "officer") {
        navigate("/pages"); // Officer => Client list
      } else {
        navigate("/pages/home"); // Normal user => Profile page
      }
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .min(8, "Email must be at least 8 characters")
        .max(30, "Email must not exceed 30 characters"),

      password: Yup.string()
        .required("Password is required")
        .min(12, "Password must be at least 12 characters")
        .max(16, "Password must not exceed 16 characters")
        .matches(
          /^[a-zA-Z0-9@#&!]+$/,
          "Password must contain only letters, numbers, and special characters (@, #, &, !)"
        )
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@#&!]/,
          "Password must contain at least one special character (@, #, &, !)"
        ),
    }),
    onSubmit: (values) => {
      const loggedInUser = login(values.email, values.password);

      if (loggedInUser) {
        // Check role for redirect
        if (loggedInUser.role === "officer") {
          navigate("/pages"); // Officer => Client list
        } else {
          navigate("/pages/home"); // Normal user => Profile page
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
      <a
        href="/"
        className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
      >
        <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo" />
        <span>Simple KYC Authentication</span>
      </a>
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to platform
        </h2>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`bg-gray-50 border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg
              focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-primary-500
              dark:focus:border-primary-500`}
              placeholder="name@company.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={`bg-gray-50 border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 sm:text-sm rounded-lg
              focus:ring-primary-500 focus:border-primary-500
              block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-primary-500
              dark:focus:border-primary-500`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          {/* Remember Me and Lost Password */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded bg-gray-50
                  focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600
                  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="font-medium text-gray-900 dark:text-white"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/auth/reset-password"
              className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
            >
              Lost Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-5 py-3 text-base font-medium
              text-center text-white bg-primary-700 rounded-lg
              hover:bg-primary-800 focus:ring-4 focus:ring-primary-300
              sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700
              dark:focus:ring-primary-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Forgot password?{" "}
            <Link
              to="/auth/sign-up"
              className="text-primary-700 hover:underline dark:text-primary-500"
            >
              Sign-up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
