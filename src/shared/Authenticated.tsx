import React, { createContext, useState, ReactElement } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  role: "user" | "officer";
}

export const mockUsers: User[] = [
  {
    name: "tuan",
    email: "anhtuan@gmail.com",
    password: "User@123456!",
    role: "user",
  },
  {
    name: "manager",
    email: "admin@gmail.com",
    password: "Officer@123456!",
    role: "officer",
  },
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

const AuthenticatedContext = createContext<AuthContextType>({
  user: null,
  login: () => null,
  logout: () => {},
});

const AuthenticatedProvider = ({ children }: { children: ReactElement }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(
    () => {
      const storedUser = localStorage.getItem("authenticatedUser");
      if (!storedUser) return null;

      try {
        const parsed = JSON.parse(storedUser) as User;
        // Re-validate against mockUsers array
        const foundUser = mockUsers.find(
          (u) => u.email === parsed.email && u.password === parsed.password
        );
        return foundUser ? foundUser : null;
      } catch (e) {
        // If JSON parse fails or anything else happens, discard
        console.error("Invalid user in localStorage:", e);
        return null;
      }
    }
  );

  const login = (email: string, password: string): User | null => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setAuthenticatedUser(user);
      localStorage.setItem("authenticatedUser", JSON.stringify(user));
      return user;
    } else {
      console.error("Invalid credentials.");
      setAuthenticatedUser(null);
      localStorage.removeItem("authenticatedUser");
      return null;
    }
  };

  const logout = () => {
    setAuthenticatedUser(null);
    localStorage.removeItem("authenticatedUser");
  };

  const contextValue: AuthContextType = {
    user: authenticatedUser,
    login,
    logout,
  };

  return (
    <AuthenticatedContext.Provider value={contextValue}>
      {children}
    </AuthenticatedContext.Provider>
  );
};

export { AuthenticatedProvider, AuthenticatedContext };
