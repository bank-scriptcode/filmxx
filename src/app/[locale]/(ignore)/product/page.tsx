"use client";
import LocalSwitcher from "@/components/LocalSwitcher";
import ReduxExample from "@/components/Redux";
import ThemeMode from "@/components/ThemeMode";
import { getCookie, setCookie } from "@/components/utils/cookie";
import { useTranslations } from "next-intl";
import { redirect, usePathname, useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const pathname = usePathname();
  const [showScroll, setShowScroll] = useState(false);

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

  const goToProduct = async (payload: any) => {
    let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${locale || `en`}/product/${payload}`);
  };

  useEffect(() => {
    // initLocale()
    const handleScroll = () => {
      window.pageYOffset > 100 ? setShowScroll(true) : setShowScroll(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
     <motion.div
      key={pathname}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-[100%] w-[100%] p-10">
        <div className="h-[calc(100vh-128px)]  ">
          <div className=" grid grid-cols-2 max-sm:grid-cols-1 h-[100%] gap-1">
            <div className=" grid gap-1">
              <div
                onClick={() => {
                  goToProduct(`CRM`);
                }}
                className="bg-cover h-[100%] duration-150 ease-in-out hover:scale-[1.05] hover:shadow-md cursor-pointer flex items-center justify-center"
                style={{backgroundImage:"url(/assets/image/ani/1251469.png)"}}
              >
                <div className=" font-bold text-[48px] bg-[#51515130] px-2 py-1">{`CRM`}</div>
              </div>
              <div
                onClick={() => {
                  goToProduct(`PDI ONE`);
                }}
                className="bg-cover h-[100%] duration-150 ease-in-out hover:scale-[1.05] hover:shadow-md cursor-pointer flex items-center justify-center"
                style={{backgroundImage:"url(/assets/image/ani/1242796.jpg)"}}
              >
                <div className=" font-bold text-[48px] bg-[#51515130] px-2 py-1">{`PDI ONE`}</div>
              </div>
            </div>
            <div  className="">
              <div
                onClick={() => {
                  goToProduct(`FLOW ONE`);
                }}
                className="bg-cover h-[100%] duration-150 ease-in-out hover:scale-[1.05] hover:shadow-md cursor-pointer flex items-center justify-center"
                style={{backgroundImage:"url(/assets/image/ani/wallpaperbetter.jpg)"}}
            
            >
                <div className=" font-bold text-[48px] bg-[#51515130] px-2 py-1">{`FLOW ONE`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

      {/* {showScroll && (
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className=" fixed bottom-5 right-5 bg-[#02CDD0] text-[#ffffff] rounded-full shadow-md cursor-pointer"
        >
          <KeyboardArrowUpIcon />
        </div>
      )} */}
    </>
  );
}

export default page;
