"use client";
import { getCookie } from "@/components/utils/cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Pagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import ListIcon from "@mui/icons-material/List";
import ReorderIcon from "@mui/icons-material/Reorder";
import ViewListIcon from "@mui/icons-material/ViewList";
import MenuIcon from "@mui/icons-material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';

function SideLayer({ children, locale, name }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(10);
  const [toggleMenu, setToggleMenu] = useState(false);

  const backToProduct = async () => {
    // let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${locale || `en`}/product`);
  };

  const nextMenu = async (payload: any) => {
    // let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${locale || `en`}/product/${name}/${payload}`);
  };

  return (
    <div className="  flex h-[calc(100vh-62px)] relative">
      <div
        className={` flex flex-col h-[calc(100vh-62px)] ${
          toggleMenu
            ? "  w-[300px] max-sm:w-[100vw]"
            : "  w-[0]"
        } duration-300 ease-in-out bg-[#e1e1e120]`}
      >
        <div className="px-2 gap-2  text-[16px] flex items-center justify-between text-[#989898] dark:text-[#d0d0d0] font-bold py-2 ">
          { toggleMenu && 
            <div className=" whitespace-nowrap">
              {pathname.split("/")[3]?.replace("%20", " ") || `-`}
            </div>
          }
          {
            toggleMenu &&
            <CloseIcon
              onClick={() => {
                setToggleMenu((pre: any) => !pre);
              }}
              style={{ fontSize: "22px" }}
              className=" cursor-pointer"
            />
          }
        </div>
        {toggleMenu && (
          <>
            <div className=" py-2 dark:border-[#3f3f3f] space-y-2 text-sm h-[100%] overflow-y-auto border-t-[1px]">
              <div
                onClick={() => {
                  nextMenu(`usersmanagements`);
                }}
                className={` whitespace-nowrap px-2 rounded-md cursor-pointer ${
                  pathname.split("/")[4] === "usersmanagements"
                    ? "text-blue-600 dark:text-[#00FFA3] font-bold"
                    : "text-[#989898] dark:text-[#d0d0d0] hover:text-[#7b7b7b] hover:dark:text-[#a4a4a4]"
                }`}
              >{`Users Managements`}</div>
              <div
                onClick={() => {
                  nextMenu(`logger`);
                }}
                className={`px-2 rounded-md cursor-pointer ${
                  pathname.split("/")[4] === "logger"
                    ? "text-blue-600 dark:text-[#00FFA3] font-bold"
                    : "text-[#989898] dark:text-[#d0d0d0] hover:text-[#7b7b7b] hover:dark:text-[#a4a4a4]"
                }`}
              >{`Logger (Soon.)`}</div>
              <div
                onClick={() => {
                  nextMenu(`schedule`);
                }}
                className={`px-2 rounded-md cursor-pointer ${
                  pathname.split("/")[4] === "schedule"
                    ? "text-blue-600 dark:text-[#00FFA3] font-bold"
                    : "text-[#989898] dark:text-[#d0d0d0] hover:text-[#7b7b7b] hover:dark:text-[#a4a4a4]"
                }`}
              >{`Schedule (Soon.)`}</div>
              <div
                onClick={() => {
                  nextMenu(`security`);
                }}
                className={`px-2 rounded-md cursor-pointer ${
                  pathname.split("/")[4] === "security"
                    ? "text-blue-600 dark:text-[#00FFA3] font-bold"
                    : "text-[#989898] dark:text-[#d0d0d0] hover:text-[#7b7b7b] hover:dark:text-[#a4a4a4]"
                }`}
              >{`Security (Soon.)`}</div>
              <div
                onClick={() => {
                  nextMenu(`invite`);
                }}
                className={`px-2 rounded-md cursor-pointer ${
                  pathname.split("/")[4] === "invite"
                    ? "text-blue-600 dark:text-[#00FFA3] font-bold"
                    : "text-[#989898] dark:text-[#d0d0d0] hover:text-[#7b7b7b] hover:dark:text-[#a4a4a4]"
                }`}
              >{`Invite (Soon.)`}</div>
            </div>
            <div className="mt-auto ">
              <button
                onClick={() => {
                  backToProduct();
                }}
                className="w-full before:ease relative h-10 overflow-hidden border-t-[1px] border-[#d0d0d0] text-[#d0d0d0] shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#d0d0d0] before:duration-300 hover:text-white hover:shadow-[#d0d0d0] hover:before:h-64 hover:before:-translate-y-32"
              >
                <span className="relative z-10 whitespace-nowrap">{`Back Product`}</span>
              </button>
            </div>
          </>
        )}
      </div>
      <div className={` w-[100%] h-[calc(100vh)] overflow-y-auto duration-300 ease-in-out ${toggleMenu && " max-sm:hidden"}`}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
      {
            !toggleMenu &&
            <MenuIcon
              onClick={() => {
                setToggleMenu((pre: any) => !pre);
              }}
              style={{ fontSize: "22px" }}
              className=" cursor-pointer absolute text-[#989898] dark:text-[#d0d0d0] my-2 left-[40px]"
            />
          }
    </div>
  );
}

export default SideLayer;
