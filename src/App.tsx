import { useEffect, useCallback, type FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import UserRoute from "./components/UserRoute";
import AuthRoute from "./components/AuthRoute";
import CartPage from "./pages/CartPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";
import SignUpPage from "./pages/SignUpPage";
import Alert from "./components/Alert";
import { fetchUserRequest } from "./store/userSlice";
import { removeAlert, selectAlert, selectAlertFading } from "./store/alertSlice";

const App: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const alert = useSelector(selectAlert);
  const fading = useSelector(selectAlertFading);

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, [dispatch]);

  const handleRemoveAlert = useCallback(() => {
    dispatch(removeAlert());
  }, [dispatch]);

  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {!isLoginPage && <Navbar />}

      <div className="flex-1">
        <Routes>
          <Route index element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUpPage />
              </AuthRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthRoute>
                <ForgotPasswordPage />
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <UserRoute>
                <DashboardPage />
              </UserRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isLoginPage && <Footer />}
      <Alert
        message={alert?.message}
        type={alert?.type}
        onDismiss={handleRemoveAlert}
        fading={fading}
      />
    </div>
  );
};

export default App;
