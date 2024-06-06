import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, createTranslator, useLocale } from "next-intl";
import { notFound, usePathname } from "next/navigation";
import { Providers } from "@/components/Provider";
import Header from "@/components/main/layout/Header";
import BarMenu from "@/components/library/barMenu/BarMenu";
import ThemeMode from "@/components/ThemeMode";
import MenuIcon from "@mui/icons-material/Menu";
import { AnimatePresence, motion } from "framer-motion";
import React, { useLayoutEffect, useRef } from "react";
import KeyIcon from "@mui/icons-material/Key";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
// import { Providers } from "../Provider";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  return {
    title: "TPA",
    description: "TPA",
    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: "/assets/image/icon-tab.png",
          href: "/assets/image/icon-tab.png",
        },
        {
          media: "(prefers-color-scheme: dark)",
          url: "/assets/image/icon-tab.png",
          href: "/assets/image/icon-tab.png",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  return (
    <section>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased">
        <div className=" overflow-x-hidden">
          <div className="  shadow-[#0000000D_0px_10px_14.8px_0px] p-3 flex items-center justify-between fixed top-0 z-[999] w-full dark:bg-[#525252] bg-white">
              <div className=" text-[18px] bg-gradient-to-r from-blue-600 via-[#00FFA3] to-indigo-400 text-transparent bg-clip-text flex items-center justify-center font-bold uppercase">
                <KeyIcon style={{color:"#b6a430", fontSize:"20px"}} className=" rotate-90 " />
                {`Authorization`}
              </div>{" "}
            <div className=" flex items-center gap-3">
              <ThemeMode />
              {/* <MenuIcon className=" cursor-pointer" /> */}
            </div>
          </div>
          <div className="h-[calc(100vh)] pt-[62px] overflow-y-hidden">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
