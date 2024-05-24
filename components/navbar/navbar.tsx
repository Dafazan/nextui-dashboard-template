"use client";
import { useState, useEffect } from "react";
import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { SearchIcon } from "../icons/searchicon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/db/firebase";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const [isLoginSuceed, setIsLoginSuceed] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoginSuceed(true);
      }
    });
  }, []);

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <div className="flex justify-between items-center w-full">
          {isLoginSuceed ? (
            <>
              <p>HALO GEEES!</p>
              <p>Halo pak user</p>
            </>
          ) : null}
        </div>
      </Navbar>
      {children}
    </div>
  );
};
