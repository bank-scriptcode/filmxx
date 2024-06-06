import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, createTranslator, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Providers } from "@/components/Provider";
import Header from "@/components/main/layout/Header";
import BarMenu from "@/components/library/barMenu/BarMenu";
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
          // url: '/assets/image/icon-tab.png',
          url: 'https://scontent.fbkk5-2.fna.fbcdn.net/v/t39.30808-1/357090268_791726465736351_2703222067699618410_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BiLKNEgLSgoAb7oTXfo&_nc_ht=scontent.fbkk5-2.fna&oh=00_AfACjMqO3lD1NzA0yGJR01BWSTV3gkQ-MVpyhla06ta_Yg&oe=661C0F5D',
          href: 'https://scontent.fbkk5-2.fna.fbcdn.net/v/t39.30808-1/357090268_791726465736351_2703222067699618410_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BiLKNEgLSgoAb7oTXfo&_nc_ht=scontent.fbkk5-2.fna&oh=00_AfACjMqO3lD1NzA0yGJR01BWSTV3gkQ-MVpyhla06ta_Yg&oe=661C0F5D',
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: 'https://scontent.fbkk5-2.fna.fbcdn.net/v/t39.30808-1/357090268_791726465736351_2703222067699618410_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BiLKNEgLSgoAb7oTXfo&_nc_ht=scontent.fbkk5-2.fna&oh=00_AfACjMqO3lD1NzA0yGJR01BWSTV3gkQ-MVpyhla06ta_Yg&oe=661C0F5D',
          href: 'https://scontent.fbkk5-2.fna.fbcdn.net/v/t39.30808-1/357090268_791726465736351_2703222067699618410_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BiLKNEgLSgoAb7oTXfo&_nc_ht=scontent.fbkk5-2.fna&oh=00_AfACjMqO3lD1NzA0yGJR01BWSTV3gkQ-MVpyhla06ta_Yg&oe=661C0F5D',
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
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased text-black">
        {children}
      </div>
    </section>
  );
}
