"use client";
import React, { createContext, useContext, useState } from "react";

interface TokenContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("jwt");
  });

  const updateToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("jwt", newToken);
    } else {
      localStorage.removeItem("jwt");
    }
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
