"use client";
import { getCookie } from "@/components/utils/cookie";
import { redirect, usePathname, useRouter } from "next/navigation";
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

function page(props:any) {
  const { params, searchParams } = props
  
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(10);
  // const router = useRouter();
  // const pathname = usePathname();
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(1);
  // const [pagination, setPagination] = useState(10);

  // const backToProduct = async () => {
  //   let locale = await getCookie("NEXT_LOCALE");
  //   router.push(`/${locale || `en`}/product`);
  // };

  // usersmanagements
  return redirect(`/${params?.locale}/product/${params?.name}/usersmanagements`);
  // return <></>
}

export default page;
