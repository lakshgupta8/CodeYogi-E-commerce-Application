import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { useUser } from "../context/UserContext";

const UserRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn, loading } = useUser();

  if (loading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default UserRoute;
