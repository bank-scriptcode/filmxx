import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, createTranslator, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Providers } from "@/components/Provider";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  return {
    title: "Lib",
    description: "Lib",
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
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
