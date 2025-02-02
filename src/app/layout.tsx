import Provider from "@/lib/store/Provider";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: { locale } }: Props) {
  return (
      <Provider>{children}</Provider>
  );
}
