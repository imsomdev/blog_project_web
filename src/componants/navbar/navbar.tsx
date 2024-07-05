"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getLocalValue } from "@/utils/auth";

const Navbar: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getLocalValue("jwt"));
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">YourBrand</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white">
            Services
          </Link>
          {token ? (
            <Link
              href="/"
              className="text-gray-300 hover:text-white"
              onClick={logout}
            >
              Logout
            </Link>
          ) : (
            <Link href="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
