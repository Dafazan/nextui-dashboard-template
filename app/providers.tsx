"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../components/layout/layout";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./db/firebase";
import { redirect, useRouter } from "next/navigation";
import type { NextPage } from "next";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const { push } = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIslogin(true);
      } else {
        push("/auth");
      }
    });
  }, []);

  const [islogin, setIslogin] = useState(false);
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        {...themeProps}
      >
        {islogin == true ? (
          <>
            <Layout>{children}</Layout>
          </>
        ) : (
          <>{children}</>
        )}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
