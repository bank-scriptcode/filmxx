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
import VpnKeyIcon from "@mui/icons-material/VpnKey";
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
        <div className=" overflow-x-hidden">{children}</div>
      </div>
    </section>
  );
}
