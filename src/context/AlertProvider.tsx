import { useState, useCallback, useEffect, type FC, type ReactNode } from "react";
import { AlertContext } from "./AlertContext";
import Alert from "../components/Alert";
import { type AlertProps } from "../types";

const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | undefined>(undefined);
  const [fading, setFading] = useState(false);

  const removeAlert = useCallback(() => {
    setAlert(undefined);
    setFading(false);
  }, []);

  const showAlert = useCallback((message: string, type: AlertProps["type"] = "info") => {
    setAlert({ message, type });
    setFading(false);
  }, []);

  useEffect(() => {
    if (alert) {
      const fadeTimer = setTimeout(() => {
        setFading(true);
      }, 5000);

      const removeTimer = setTimeout(() => {
        removeAlert();
      }, 5500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [alert, removeAlert]);

  return (
    <AlertContext.Provider value={{ alert, showAlert, removeAlert }}>
      {children}
      <Alert
        message={alert?.message}
        type={alert?.type}
        onDismiss={removeAlert}
        fading={fading}
      />
    </AlertContext.Provider>
  );
}

export default AlertProvider;
