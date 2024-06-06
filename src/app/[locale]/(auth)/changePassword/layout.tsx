import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, createTranslator, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Providers } from "@/components/Provider";
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
          media: '(prefers-color-scheme: light)',
          url: '/assets/image/icon-tab.png',
          href: '/assets/image/icon-tab.png',
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: '/assets/image/icon-tab.png',
          href: '/assets/image/icon-tab.png',
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  return <section>{children}</section>;
}
