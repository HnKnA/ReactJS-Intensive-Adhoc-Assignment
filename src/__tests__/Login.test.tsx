import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthenticatedContext } from "../shared/Authenticated";
import Login from "../pages/auth/login/Login";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();

// Mock react-router-dom's useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();

  const mockContext = {
    user: null,
    login: mockLogin,
    logout: mockLogout,
  };

  let user: UserEvent;

  beforeEach(() => {
    jest.clearAllMocks();
    user = userEvent.setup();
  });

  it("renders login form", () => {
    render(
      <AuthenticatedContext.Provider value={mockContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthenticatedContext.Provider>
    );

    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login to your account/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(
      <AuthenticatedContext.Provider value={mockContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthenticatedContext.Provider>
    );

    await act(async () => {
      await user.click(
        screen.getByRole("button", { name: /login to your account/i })
      );
    });

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("calls login with correct data and navigates to user profile", async () => {
    mockLogin.mockReturnValueOnce({
      name: "tuan",
      email: "anhtuan@gmail.com",
      password: "User@123456!",
      role: "user",
    });

    render(
      <AuthenticatedContext.Provider value={mockContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthenticatedContext.Provider>
    );

    await act(async () => {
      await user.type(
        screen.getByLabelText(/your email/i),
        "anhtuan@gmail.com"
      );
      await user.type(screen.getByLabelText(/your password/i), "User@123456!");
      await user.click(
        screen.getByRole("button", { name: /login to your account/i })
      );
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        "anhtuan@gmail.com",
        "User@123456!"
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/pages/user/tuan/pi");
    });
  });

  it("redirects officer role to review page", async () => {
    mockLogin.mockReturnValueOnce({
      name: "manager",
      email: "admin@gmail.com",
      password: "Officer@123456!",
      role: "officer",
    });

    render(
      <AuthenticatedContext.Provider value={mockContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthenticatedContext.Provider>
    );

    await act(async () => {
      await user.type(screen.getByLabelText(/your email/i), "admin@gmail.com");
      await user.type(
        screen.getByLabelText(/your password/i),
        "Officer@123456!"
      );
      await user.click(
        screen.getByRole("button", { name: /login to your account/i })
      );
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        "admin@gmail.com",
        "Officer@123456!"
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/pages/review");
    });
  });

  it("shows alert on invalid login", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    mockLogin.mockReturnValueOnce(null);

    render(
      <AuthenticatedContext.Provider value={mockContext}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthenticatedContext.Provider>
    );

    await act(async () => {
      await user.type(
        screen.getByLabelText(/your email/i),
        "wronguser@example.com"
      );
      await user.type(screen.getByLabelText(/your password/i), "Wrong@123456!");
      await user.click(
        screen.getByRole("button", { name: /login to your account/i })
      );
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Login failed. Please check your credentials."
      );
    });

    alertMock.mockRestore();
  });
});
