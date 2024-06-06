"use client";
import LocalSwitcher from "@/components/LocalSwitcher";
import ReduxExample from "@/components/Redux";
import ThemeMode from "@/components/ThemeMode";
import { getCookie, setCookie } from "@/components/utils/cookie";
import { useTranslations } from "next-intl";
import { redirect, useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  Panel,
  useStoreApi,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  Handle,
  Position,
  NodeToolbar,
  getConnectedEdges,
  useNodeId,
  useStore,
  EdgeProps,
  useReactFlow,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
  MarkerType,
  getStraightPath,
} from "reactflow";

import "reactflow/dist/style.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PendingIcon from "@mui/icons-material/Pending";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ApiIcon from "@mui/icons-material/Api";
import InfoIcon from "@mui/icons-material/Info";
import MovingIcon from "@mui/icons-material/Moving";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RouteIcon from "@mui/icons-material/Route";
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";
import SchemaIcon from "@mui/icons-material/Schema";
import { motion } from "framer-motion";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";



function page() {
  const router = useRouter();
  const [showScroll, setShowScroll] = useState(false)

  type Direction = "up" | "down" | "left" | "right";
  const fadeIn = (direction: Direction, delay: number) => {
    return {
      hidden: {
        y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
        opacity: 0,
        x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration: 1.2,
          delay: 0,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };

  // const initLocale = async () => {
  //  let locale =  await getCookie("NEXT_LOCALE")
  //  setCookie(`NEXT_LOCALE`,!!locale ? locale : `en`,1)
  //  router.push(`/${locale || `en`}/signIn`);
  // }

  useEffect(() => {
    // initLocale()
    const handleScroll = () => {
      window.pageYOffset > 100 ? setShowScroll(true) : setShowScroll(false) 
    }

    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.addEventListener("scroll", handleScroll)
    };
  }, []);

  return (
    <></>
    // <div className=" overflow-x-hidden" >
    //   <div className="  shadow-[#0000000D_0px_10px_14.8px_0px] p-3 flex items-center justify-between fixed top-0 z-[999] w-full dark:bg-[#525252] bg-white">
    //     <div className=" flex items-center justify-center bg-purple-300 px-3 py-2 rounded-lg text-white dark:text-white">{`Auth Manage`}</div>
    //     <div className=" flex items-center gap-3">
    //       <ThemeMode />
    //       <MenuIcon className=" cursor-pointer" />
    //     </div>
    //   </div>
    //   <div className="h-[calc(100vh)] pt-[64px] ">
    //    {`Soon.`}
    //   </div>
     
    //   {
    //     showScroll &&
    //     <div
    //       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    //       className=" fixed bottom-5 right-5 bg-[#02CDD0] text-[#ffffff] rounded-full shadow-md cursor-pointer"
    //     >
    //       <KeyboardArrowUpIcon />
    //     </div>
    //   }
    // </div>
  );
}

export default page