"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useToken } from "@/context/TokenContext";

const Navbar: React.FC = () => {
  const { token, setToken } = useToken();
  console.log(token, "TOKENN");
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
            <button onClick={logout} className="text-gray-300 hover:text-white">
              Logout
            </button>
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
