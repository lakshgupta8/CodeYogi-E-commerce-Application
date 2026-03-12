import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { useUser } from "../context/UserContext";
import type { FC, ReactNode } from "react";

const AuthRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AuthRoute;
