"use client";
import { getCookie } from "@/components/utils/cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import ListIcon from "@mui/icons-material/List";
import ReorderIcon from "@mui/icons-material/Reorder";
import ViewListIcon from "@mui/icons-material/ViewList";
import MenuIcon from "@mui/icons-material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";

function page() {
  const router = useRouter();
  const pathname = usePathname();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(10);

  const backToProduct = async () => {
    let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${locale || `en`}/product`);
  };
  

  return (
    <>
      <div className=" p-10 space-y-2">
        <div className="text-[#989898] dark:text-[#d0d0d0] font-bold">{`Soon.`}</div>
      </div>
    </>
  );
}

export default page;
