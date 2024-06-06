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
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LockIcon from '@mui/icons-material/Lock';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CakeIcon from '@mui/icons-material/Cake';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function page(props: any) {
  const { params, searchParams } = props;
  console.log("locale : ", params?.locale);
  console.log("name : ", params?.name);
  const router = useRouter();
  const pathname = usePathname();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(10);

  const backToProduct = async () => {
    let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${locale || `en`}/product`);
  };
  console.log(pathname);
  const backPage = async () => {
    // let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${params?.locale}/product/${params?.name}/usersmanagements`);
  };

  return (
    <>
      <div className=" p-10 space-y-2">
        <div className="text-[#989898] dark:text-[#d0d0d0] font-bold">
          <span
            onClick={() => {
              backPage();
            }}
            className=" cursor-pointer"
          >{`Back`}</span>
        </div>

        <div className=" grid grid-cols-[1fr,2fr] max-sm:grid-cols-1 border-[1px] border-[#f5f5f5b0] dark:border-[#f5f5f520] text-[#989898] dark:text-[#d0d0d0] shadow-md">
          <div className="py-2 px-10 space-y-2">
            <div className=" grid justify-center">
              <div className=" flex justify-center mb-1">
                <img
                  src="/assets/image/ani/1333611.jpeg"
                  className=" h-[60px] w-[60px] rounded-full"
                  alt=""
                />
              </div>
              <div className=" flex justify-center text-[16px] font-bold">{`anya forger`}</div>
              <div className=" flex justify-center text-[12px]">{`anya@xmail.com`}</div>
            </div>
            <div>
              <div className=" text-[14px] font-bold flex items-center gap-2"><PhoneIcon style={{ fontSize:"16px" }} />{`Telephone`}</div>
              <div className=" text-[12px] ml-6">{`+066xxxxxxx`}</div>
            </div>
            <div>
              <div className=" text-[14px] font-bold flex items-center gap-2"><CakeIcon style={{ fontSize:"16px" }} />{`Birthday`}</div>
              <div className=" text-[12px] ml-6 ">{`05 June 1950`}</div>
            </div>
            <div>
              <div className=" text-[14px] font-bold flex items-center gap-2"><HomeRepairServiceIcon style={{ fontSize:"16px" }} />{`Organize`}</div>
              <div className=" text-[12px] ml-6 ">{`xxxxxxx`}</div>
            </div>
            <div>
              <div className=" text-[14px] font-bold flex items-center gap-2"><LockIcon style={{ fontSize:"16px" }} />{`Reset Password`}</div>
              <div className=" text-[12px] ml-6 underline cursor-pointer ">{`Click here.`}</div>
            </div>
            <div>
              <div className=" text-[14px] font-bold flex items-center gap-2"><AccessTimeIcon style={{ fontSize:"16px" }} />{`First time System`}</div>
              <div className=" text-[12px] ml-6 ">{`07 May 2024 10:23`}</div>
            </div>
            <div>
              <div className=" text-[14px] font-bold flex items-center gap-2"><AccessTimeIcon style={{ fontSize:"16px" }} />{`Last logged in`}</div>
              <div className=" text-[12px] ml-6 ">{`15 May 2024 15:42`}</div>
            </div>
            <div>
              <div className=" text-[14px] font-bold flex items-center gap-2"><AssignmentTurnedInIcon style={{ fontSize:"16px" }} />{`Status`}</div>
              <div className=" text-[12px] ml-6 text-[#a59e39] ">{`waiting for aproved`}</div>
            </div>
            <div className=" py-5 space-y-2">
              <div className=" text-[14px] font-bold text-red-400 flex items-center gap-2 cursor-pointer"><BlockIcon style={{ fontSize:"16px" }} />{`Ban Account`}</div>
              <div className=" text-[14px] font-bold text-red-400 flex items-center gap-2 cursor-pointer"><DeleteIcon style={{ fontSize:"16px" }} />{`Delete Account`}</div>
            </div>
          
          </div>
          <div className="p-2 bg-[#f5f5f5b0] dark:bg-[#f5f5f520] h-[calc(100vh-200px)] overflow-y-auto space-y-2">
            <div className=" space-y-2">
              <div className=" text-[14px] font-bold flex items-center gap-2"><AccessTimeIcon style={{ fontSize:"16px" }} />{`Session time`}</div>
              <div className=" text-[12px] bg-[#ffffff] dark:bg-[#525252] py-2 px-2 flex items-center gap-1"><EditIcon style={{ fontSize:"16px", cursor:"pointer" }} />{`8 Hr.`}</div>
            </div>
            <div className=" space-y-2">
              <div className=" text-[14px] font-bold flex items-center gap-2"><img src="/assets/image/logo/google.png" className="w-[16px]" alt="" />{`Single Sign-On Google`}</div>
              <div className=" text-[12px] bg-[#ffffff] dark:bg-[#525252] py-2 px-2 flex items-center gap-1"><CheckIcon style={{ color: "#00FFA3", fontSize:"16px" }} />{`Success`}</div>
            </div>
            <div className=" space-y-2">
              <div className=" text-[14px] font-bold flex items-center gap-2"><img src="/assets/image/logo/facebook.png" className="w-[16px]" alt="" />{`Single Sign-On Facebook`}</div>
              <div className=" text-[12px] bg-[#ffffff] dark:bg-[#525252] py-2 px-2 flex items-center gap-1"><CheckIcon style={{ color: "#00FFA3", fontSize:"16px" }} />{`Success`}</div>
            </div>
            <div className=" space-y-2">
              <div className=" text-[14px] font-bold flex items-center gap-2"><img src="/assets/image/logo/line.png" className="w-[16px]" alt="" />{`Single Sign-On Line`}</div>
              {/* <div className=" text-[12px] bg-[#ffffff] dark:bg-[#525252] py-2 px-2 flex items-center gap-1"><CheckIcon style={{ color: "#00FFA3", fontSize:"16px" }} />{`Success`}</div> */}
              <div className=" text-[12px] bg-[#ffffff] dark:bg-[#525252] py-2 px-7 flex items-center gap-1">{`None`}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
