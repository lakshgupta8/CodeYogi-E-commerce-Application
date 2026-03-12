import { useState, useEffect, useMemo, useCallback, memo, type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import MobileMenu from "./MobileMenu";

const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();
  const { isLoggedIn } = useUser();

  const navLinks = useMemo(
    () => [
      { name: "HOME", to: "/home" },
      { name: "ALL PRODUCTS", to: "/" },
      { name: "ABOUT", to: "/about" },
      { name: "CONTACT", to: "/contact" },
      {
        name: isLoggedIn ? "ACCOUNT  ↯" : "LOGIN",
        to: isLoggedIn ? "/dashboard" : "/login",
      },
    ],
    [isLoggedIn]
  );

  const openMobileMenu = useCallback(() => setMobileMenuOpen(true), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    Promise.resolve().then(() => closeMobileMenu());
  }, [location, closeMobileMenu]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="bg-white px-2 py-4">
        <div className="flex justify-between items-center mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <Link to="/">
            <img
              src="/images/awesomebuy.png"
              alt="Logo"
              className="h-16 sm:h-20"
            />
          </Link>

          <button
            className="sm:hidden text-primary-default hover:text-primary-dark"
            onClick={openMobileMenu}
            aria-label="Open menu"
          >
            <Menu className="text-3xl" />
          </button>

          <nav className="hidden sm:flex items-center">
            <ul className="flex">
              {navLinks.map((link) => {
                const isActive =
                  link.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.to);

                return (
                  <li
                    key={link.to}
                    className={`mx-4 text-xs ${isActive ? "text-primary-default" : "text-gray-700"
                      }`}
                  >
                    <Link to={link.to}>{link.name}</Link>
                  </li>
                );
              })}
            </ul>

            <Link
              to="/cart"
              state={{ from: location }}
              className="relative flex flex-col items-center ml-6"
            >
              <ShoppingBag className="text-primary-default text-4xl" />
              {count > 0 && (
                <span className="top-1/2 left-1/2 absolute flex justify-center items-center bg-white border-2 border-primary-dark rounded-full w-5 h-5 font-bold text-primary-dark text-xs">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={closeMobileMenu}
          navLinks={navLinks}
          location={location}
          count={count}
        />
      )}
    </>
  );
}

export default memo(Navbar);
