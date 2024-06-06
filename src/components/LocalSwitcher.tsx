"use client";
import { useLocale, useTranslations } from "next-intl";
import { useTransition, useState } from "react";
import { usePathname, useRouter } from "next-intl/client";
import "../../src/app/globals.css";
import { useSearchParams } from "next/navigation";

export default function LocalSwitcher() {
  const t = useTranslations("Title");
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchParams = useSearchParams();
  const refOtp = searchParams.get("ref");
  const dateTime = searchParams.get("dateTime");
  const email = searchParams.get("email");
  const hwId = searchParams.get("hwId");

  // function onSelectChangeTogle() {
  //   startTransition(() => {
  //     console.log('locale : ', locale);
  //     router.replace(`${pathname}`, { locale: locale === "th" ? "en" : "th" });
  //   });
  // }
  function onSelectChangeToggle() {
    startTransition(() => {
      console.log("locale : ", locale);
      router.replace(`${pathname}`, { locale: locale === "th" ? "en" : "th" });
    });
  }

  function setCookie(name: any, value: any, daysToExpire: any) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    const cookieValue =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";

    document.cookie = cookieValue;
  }



  return (
    // <button onClick={()=>{onSelectChangeTogle()}}>change</button>
    <div className="relative inline-block text-left">
      <div>
        <div className="relative group">
          <button
            type="button"
            // className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-white dark:text-defualt bg-white dark:bg-gray-900 px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            className="inline-flex w-full items-center justify-center gap-x-1.5  text-default dark:text-white   text-md "
            id="menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {locale.toUpperCase()} {/* Display the chosen locale */}
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#AD974F] duration-300 group-hover:w-full"></span> */}
        </div>
      </div>
      {isDropdownOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-[4rem] origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 px-1" role="none">
            <button
              type="submit"
              className="text-gray-700 dark:text-white block w-full px-4 py-2 text-left text-sm hover:border-l-4 hover:border-[#AD974F] duration-200"
              role="menuitem"
              onClick={() => {
                setCookie(`NEXT_LOCALE`, `th`, 1)
                router.replace(`${pathname}${!!hwId ? `?hwId=${hwId}` : ""}${!!refOtp ? `?ref=${refOtp}` : ""}${!!dateTime ? `&dateTime=${dateTime}` : ""}${!!refOtp ? `&email=${email}` : ""}`, { locale: "th" });
                setIsDropdownOpen(false);
              }}
            >
              TH
            </button>
            <button
              type="submit"
              className="text-gray-700 dark:text-white block w-full px-4 py-2 text-left text-sm hover:border-l-4 hover:border-[#AD974F] duration-200"
              role="menuitem"
              onClick={() => {
                setCookie(`NEXT_LOCALE`, `en`, 1)
                router.replace(`${pathname}${!!hwId ? `?hwId=${hwId}` : ""}${!!refOtp ? `?ref=${refOtp}` : ""}${!!dateTime ? `&dateTime=${dateTime}` : ""}${!!refOtp ? `&email=${email}` : ""}`, { locale: "en" });
                setIsDropdownOpen(false);
              }}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}