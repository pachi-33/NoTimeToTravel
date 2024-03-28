"use client";

import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Slider,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

import { success } from "@/app/utils/message";
import Image from "next/image";
import { logoutClicked } from "../../utils/auth";
import useUserInfo from "../../hooks/useUserInfo";
import { useRouter } from "next/navigation";
import ProfileSVG from "@/app/svg/avatar.svg";

const NavBar = ({ className }: { className: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const userInfo = useUserInfo();

  const isAdmin = userInfo?.permission === "admin";

  const navItems: Array<{ name: string; href: string; disabled: boolean }> = [
    { name: "审核", href: "/main/check", disabled: false },
    { name: "管理", href: "/main/authy", disabled: !isAdmin },
  ];

  let isLogin = false;
  if (userInfo) {
    isLogin = userInfo.isLogin;
    if (!isLogin) {
      router.push("/login");
    }
  }

  const SignInUpOut = ({
    isLogin,
    handleLogout,
  }: {
    isLogin: boolean;
    handleLogout: () => void;
  }) => {
    if (isLogin) {
      return (
        <div className="flex items-center justify-center">
          <Button
            color="primary"
            radius="sm"
            onClick={handleLogout}
            size="md"
            className="text-md mr-2 text-white"
          >
            Sign out
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <Link href="/auth#signup">
            <Button
              color="primary"
              size="sm"
              radius="sm"
              className="text-md mr-2 text-white"
            >
              Sign up
            </Button>
          </Link>

          <Link href="/auth">
            <Button
              color="primary"
              radius="sm"
              size="sm"
              className="text-md h-[32px] bg-[#BA00BA]"
            >
              Sign in
            </Button>
          </Link>
        </div>
      );
    }
  };

  const NavLinks = ({
    isLogin,
    handleLogout,
  }: {
    isLogin: boolean;
    handleLogout: () => void;
  }) => {
    const NavItemsList = () =>
      navItems.map((item) => {
        if (item.disabled) {
          return null;
        }
        return (
          <NavbarMenuItem
            key={item.href}
            className="mt-1 flex items-center justify-center"
          >
            <Link href={item.href} size="lg" color="foreground">
              <a className="p-2 text-2xl">{item.name}</a>
            </Link>
          </NavbarMenuItem>
        );
      });

    return (
      <>
        <NavItemsList />
        <SignInUpOut isLogin={isLogin} handleLogout={handleLogout} />
      </>
    );
  };

  return (
    <div className={`flex flex-row items-center h-18 ${className}`}>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
        classNames={{
          base: " bg-[#000] text-white",
          content: "",
          menu: "",
          menuItem: "text-right",
        }}
      >
        {/* desktop show */}
        <NavbarBrand>
          <Link href="/main" className="text-[#91bef0]" size="lg">
            旅行物语
          </Link>
        </NavbarBrand>

        {/* desktop nav item */}
        <NavbarContent className="hidden sm:flex" justify="center">
          <div
            className="
                flex h-[40px] flex-row items-center justify-center gap-4 rounded-full bg-white/15
                px-6 py-1 text-white
              "
          >
            {navItems.map((item) => {
              if (item.disabled) {
                return null;
              }
              return (
                <Link
                  as="a"
                  key={item.name}
                  href={item.href}
                  size="lg"
                  className="text-md flex w-full items-center justify-center text-white/55"
                >
                  <div className="z-50 font-medium">{item.name}</div>
                </Link>
              );
            })}
          </div>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="flex items-center justify-center">
            <Link href="/main/profile">
              <Image src={ProfileSVG} alt="Profile" width={32} height={32} />
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex justify-end">
            <SignInUpOut isLogin={isLogin} handleLogout={logoutClicked} />
          </NavbarItem>
        </NavbarContent>

        {/* toggle button */}
        <NavbarMenuToggle aria-label={"mobile"} className="sm:hidden" />

        {/* mobile show */}
        <NavbarMenu>
          <NavLinks isLogin={isLogin} handleLogout={logoutClicked} />
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default NavBar;
