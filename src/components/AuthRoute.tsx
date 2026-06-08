import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserLoading } from "../store/userSlice";
import type { FC, ReactNode } from "react";

const AuthRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectUserLoading);

  if (loading) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AuthRoute;
