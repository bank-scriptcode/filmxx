"use client";
import LocalSwitcher from "@/components/LocalSwitcher";
import ReduxExample from "@/components/Redux";
import ThemeMode from "@/components/ThemeMode";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { getApiDemo, getApiSignIn } from "@/service/api/controller/demoService";
import { setExample } from "@/lib/store/slices/exampleSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteCookie, setCookie } from "@/components/utils/cookie";

const Header = () => {
  const router = useRouter();
  const exampleReducer = useSelector((state: any) => state.exampleReducer);
  const { exampleId } = exampleReducer;

  const signOut = async () => {
    Swal.fire({
      title: "Sign Out!",
      text: "Do you want sign out ?",
      icon: "info",
      confirmButtonText: "Sign Out",
      confirmButtonColor: `#c45f8c`,
      showCancelButton: true,
      cancelButtonText: `Close`,
      cancelButtonColor: `#515151`,
    }).then(async (isConfirm) => {
      if (isConfirm?.isConfirmed) {
        deleteCookie("nx-access-token");
        router.push("/");
      }
    });
  };

  return (
    <div className=" w-full flex items-center justify-between h-[60px] z-10">
      <div className="flex items-center justify-start  pl-3 w-14 md:w-64 h-14  border-none">
        <img
          className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
          src={`${"https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"}`}
        />
        <span className="hidden md:block text-sm">{`-`}</span>
      </div>
      <div className="flex justify-between items-center h-14   header-right">
        <div className=" rounded flex items-center w-full max-w-xl mr-4 p-2 "></div>
        <ul className="flex items-center gap-3">
          <li></li>
          <li>
            <span
              onClick={() => {
                signOut();
              }}
              className="flex items-center mr-4 font-semibold cursor-pointer bg-[#E3b661] hover:opacity-80 px-4 py-1 rounded-md"
            >
              {`Logout`}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
