"use client";
import React, { useState, useCallback } from "react";
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
  Input,
  useDisclosure,
  Modal,
  Tooltip,
  button,
} from "@nextui-org/react";
import { getLocalValue } from "@/utils/localStorage.utils";
import { GrSearch } from "react-icons/gr";
import { useRouter } from "next/navigation";
import _ from "lodash";
import Poll from "../poll/Poll";
import { TiMessages } from "react-icons/ti";

const BlogNavbar: React.FC = () => {
  const { token, setToken } = useToken();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const userName = getLocalValue("userDetails")?.username;
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log(userName);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userDetails");
      setToken(null);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    _.debounce((searchTerm: string) => {
      const param = new URLSearchParams();
      param.set("search", searchTerm);
      router.replace(`/?${param.toString()}`);
    }, 500),
    []
  );

  const handleRecentPost = () => {
    const param = new URLSearchParams();
    param.set("recent-post", "true");
    const url = `/?${param.toString()}`;
    router.replace(url);
  };

  const redirectToChat = () => {
    router.push("/chat");
  };

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Link className="font-bold text-inherit" href="/">
            YouBlog
          </Link>
        </NavbarBrand>

        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <button color="foreground" onClick={onOpen}>
              {`Today's Poll`}
            </button>
            <Modal
              backdrop={"blur"}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <Poll onClose={onClose} />
            </Modal>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              href="/create-post"
              aria-current="page"
              className="bg-blue-700"
            >
              Create post
            </Link>
          </NavbarItem>
          <NavbarItem>
            <button color="foreground" onClick={handleRecentPost}>
              Recent posts
            </button>
          </NavbarItem>
          <NavbarItem>
            <Tooltip showArrow={true} content="Chats">
              <button color="foreground" onClick={redirectToChat}>
                <TiMessages />
              </button>
            </Tooltip>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <div>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<GrSearch size={18} />}
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
                  <Link href="/login" aria-current="page" color="secondary">
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
