import { type FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Providers from "./components/Providers";
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

const App: FC = () => {
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <Providers>
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
      </div>
    </Providers>
  );
};

export default App;
