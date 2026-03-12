import { type FC } from "react";
import {
  User,
  Mail,
  Lock,
  Unlock,
  Search,
} from "lucide-react";

const iconMap = {
  Name: <User className="w-5 h-5" />,
  email: <Mail className="w-5 h-5" />,
  password: <Unlock className="w-5 h-5" />,
  confirmPassword: <Lock className="w-5 h-5" />,
  search: <Search className="w-5 h-5" />,
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: keyof typeof iconMap;
  touched?: boolean;
  error?: string;
  placeholder: string;
  className?: string;
}

const Input: FC<InputProps> = ({
  id,
  name,
  placeholder,
  className = "",
  touched,
  error,
  ...rest
}) => {
  const icon = iconMap[name] || null;

  let borderClass =
    touched && error
      ? "border-primary-medium"
      : "border-white placeholder-white";
  if (id == "search") borderClass = "border-gray-600";
  const combinedClassName = `${className} ${borderClass}`.trim();

  return (
    <>
      <div className="relative flex items-center">
        {icon && (
          <span className="left-3 absolute opacity-80 w-5 h-5 pointer-events-none">
            {icon}
          </span>
        )}
        <label htmlFor={id} className="sr-only">
          {placeholder}
        </label>
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          className={`w-full p-3 pl-10 border transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-transparent rounded ${combinedClassName}`}
          {...rest}
        />
      </div>
      {touched && error && (
        <p className="mt-1 pl-1 text-primary-medium text-sm">{error}</p>
      )}
    </>
  );
}

export default Input;
