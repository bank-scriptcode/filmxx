
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
  return (
    <section>
      {children}
    </section>
  );
}
