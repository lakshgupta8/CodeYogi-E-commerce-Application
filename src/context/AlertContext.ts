import { createContext, useContext } from "react";
import { type AlertProps } from "../types";

interface AlertContextType {
  alert?: AlertProps;
  showAlert: (message: string, type?: AlertProps["type"]) => void;
  removeAlert: () => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
