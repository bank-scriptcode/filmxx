import BarMenu from "@/components/layout/barMenu/BarMenu";
import MainBar from "@/components/layout/mainBar/MainBar";

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
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased text-black bg-white">
        {/* <MainBar /> */}
        <BarMenu />
        <div className="w-[100vw] h-[calc(100vh-112px)] overflow-y-auto ">
          {children}
        </div>
      </div>
    </section>
  );
}
