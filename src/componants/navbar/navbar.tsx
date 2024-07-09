"use client";
import React, { useEffect, useState } from "react";
import { useToken } from "@/context/TokenContext";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { getLocalValue } from "@/utils/localStorage.utils";

const BlogNavbar: React.FC = () => {
  const { token, setToken } = useToken();
  const [isClient, setIsClient] = useState(false);
  const userName = getLocalValue("userDetails")?.username;
  console.log(userName);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userDetails");
      setToken(null);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">YouBlog</p>
        </NavbarBrand>

        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            {token ? (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <div>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{userName}</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="user-profile">Profile</DropdownItem>

                <DropdownItem key="logout" color="danger" onClick={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <Link href="login" aria-current="page" color="secondary">
                    Register/ Login
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default BlogNavbar;
