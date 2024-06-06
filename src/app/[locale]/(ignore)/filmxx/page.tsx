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
import ReactAudioPlayer from "react-audio-player";

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
      {/* <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
      > */}

      <div className=" h-[100vh] grid items-center justify-center ">
        <div className="  bg-[#FDC4C2] dark:bg-[#FDC4C2] text-gray-500 dark:text-gray-500 grid items-between justify-center max-w-[375px] max-h-[667px] rounded-lg shadow-lg">
          {/* @ts-ignore */}
          <audio
            id="player"
            autoPlay
            loop
            controls
            className=" w-full mt-5 px-2"
          >
            <source
              src={`/assets/image/film/FRONGNTC_เทียบไม่ได้กับเธอ_ft_TNTREE_Official_Audio.mp3`}
              type="audio/mp3"
            />
          </audio>
          <div className="mt-6 text-center mx-[30%] text-white dark:text-white">
            {/* @ts-ignore */}
            <marquee>{`เทียบไม่ได้กับเธอ`}</marquee>
          </div>
          <div className="flex items-center justify-center  p-3">
            <div className="w-full h-full flex flex-col p-4 bg-black/40 rounded-lg">
              <img
                src="/assets/image/film/fd26ed9a-ea7e-4eef-a789-0949962b41e2.jpeg"
                className=" object-cover w-full h-[266px]  shadow-lg rounded-lg "
              />
              <h1 className="font-semibold text-lg text-white mt-3">
                {`♥040624`}
              </h1>
              <p className="font-semibold text-sm text-gray-200 uppercase">{`Fan rao kub!`}</p>

              <img
                className="h-5 w-16 mt-6 filter opacity-60 brightness grayscale invert"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
              />
            </div>
          </div>
          {/* https://www.youtube.com/watch?v=wC2109jZ7Tg&ab_channel=FRONGNTC */}
          {/* <div className=" p-3">
                
                

                <div className=" flex items-center justify-center"> */}

          {/* @ts-ignore */}
          {/* <audio id="player" autoplay loop controls className=" w-full">
                    <source src={`/assets/image/film/FRONGNTC_เทียบไม่ได้กับเธอ_ft_TNTREE_Official_Audio.mp3`} type="audio/mp3" />
                  </audio> */}
          {/* </div> */}

          {/* <div className="mt-6 flex justify-center items-center">
                  <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" fill="#000000"></path>
                        <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" fill="#000000"></path>
                      </g>
                    </svg>
                  </button>
                  <button className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none mx-4">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" className="w-6 h-6 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" fill="#000000"></path>
                        <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" fill="#000000"></path>
                      </g>
                    </svg>
                  </button>
                  <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z" fill="#000000"></path>
                        <path d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z" fill="#000000"></path>
                      </g>
                    </svg>
                  </button>
                </div>

                <div className="mt-6 bg-gray-200 h-2 rounded-full">
                  <div className="bg-[#FA6C62] h-2 rounded-full w-1/2"></div>
                </div>

                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>1:57</span>
                  <span>3:53</span>
                </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* </motion.div> */}

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
