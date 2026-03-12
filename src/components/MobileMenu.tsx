import { memo, type FC } from "react";
import { Link, type Location } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; to: string }[];
  location: Location;
  count: number;
}

const MobileMenu: FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  location,
  count,
}) => {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden z-50 fixed inset-0 bg-black/60" onClick={onClose}>
      <div
        className="top-0 right-0 absolute flex flex-col bg-gray-100 shadow-lg px-4 w-64 h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="top-4 right-2 absolute p-1 text-primary-default"
          aria-label="Close menu"
        >
          <X className="text-3xl" />
        </button>

        <h1 className="pt-8 pb-4 border-gray-300 border-b font-semibold text-primary-default text-2xl">
          Navigate
        </h1>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-4">
            {navLinks.map((link) => {
              const isActive =
                link.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.to);

              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className={`block text-lg py-2 ${isActive ? "text-primary-default" : "text-gray-700"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="py-4 border-gray-300 border-t">
          <Link
            to="/cart"
            state={{ from: location }}
            onClick={onClose}
            className="flex justify-between items-center"
          >
            <span
              className={
                location.pathname === "/cart"
                  ? "text-primary-default font-medium"
                  : "text-gray-700 font-semibold"
              }
            >
              Your Cart
            </span>
            <div className="relative">
              <ShoppingBag className="text-primary-default text-2xl" />
              {count > 0 && (
                <span className="-top-2 -right-2 absolute flex justify-center items-center bg-white border-2 border-primary-dark rounded-full w-5 h-5 font-bold text-primary-dark text-xs">
                  {count}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(MobileMenu);
