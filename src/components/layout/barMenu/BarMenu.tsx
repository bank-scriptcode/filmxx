"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, Menu, Close } from "@mui/icons-material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Swal from "sweetalert2";
import { deleteCookie, getCookie } from "@/components/utils/cookie";
import { usePathname, useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppsIcon from "@mui/icons-material/Apps";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import Profile from "../profile/Profile";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  NO_GROUP,
  KBarResults,
  ActionImpl,
  useKBar,
} from "kbar";
import CottageIcon from "@mui/icons-material/Cottage";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Forward Ref
const ResultItem = React.forwardRef(function ResultItem(
  { action, active }: { action: ActionImpl; active: boolean },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={
        active
          ? `px-3 py-2 leading-none rounded text-sm flex items-center justify-between bg-violet-50 cursor-pointer`
          : `px-3 py-2 leading-none rounded text-sm flex items-center justify-between hover:bg-violet-50 cursor-pointer`
      }
    >
      <header className="flex items-center px-5">
        {/* {action.icon} */}
        <div className="rounded flex flex-col items-start justify-center relative select-none outline-none hover:bg-violet-50">
          <h1 className="text-md font-bold text-[#464255]"> {action.name} </h1>
          <p className="text-sm py-1 text-[#a6aeb7]"> {action.subtitle} </p>
        </div>
      </header>
      <div className="text-[15px] leading-none text-sm rounded flex justify-between items-center relative select-none outline-none hover:bg-violet-50">
        {action.shortcut?.length ? (
          <div
            aria-hidden
            style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
          >
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                style={{
                  padding: "4px 6px",
                  background: "rgba(0 0 0 / .1)",
                  borderRadius: "4px",
                  fontSize: 14,
                }}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});

const RenderResults = () => {
  const { results } = useMatches();
  
  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        return typeof item === "string" ? (
          <div className="py-3 px-5">
            {" "}
            <h2 className="text-start text-[#00ADEF]"> {item} </h2>{" "}
          </div>
        ) : (
          <ResultItem action={item} active={active} />
        );
      }}
    />
  );
};

function BarMenu() {
  const router = useRouter();
  const pathname = usePathname();

  // dam
  const kBarDam = [
    {
      id: "1",
      name: "Shippers",
      shortcut: ["bps"],
      keywords: "bps",
      section: "Business Partners",
      perform: () => router.push("/en/main/dam/shippers"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Business Partners > Shippers",
    },
    {
      id: "2",
      name: "Users",
      shortcut: ["bpu"],
      keywords: "bpu",
      section: "Business Partners",
      perform: () => router.push("/en/main/dam/users"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Business Partners > Users",
    },
    {
      id: "3",
      name: "Roles",
      shortcut: ["bpr"],
      keywords: "bpr",
      section: "Business Partners",
      perform: () => router.push("/en/main/dam/role"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Business Partners > Roles",
    },
    {
      id: "4",
      name: "Operators",
      shortcut: ["bpo"],
      keywords: "bpo",
      section: "Business Partners",
      perform: () => router.push("/en/main/dam/operators"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Business Partners > Operators",
    },
    {
      id: "5",
      name: "Zone",
      shortcut: ["az"],
      keywords: "az",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/zone"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Zone",
    },
    {
      id: "6",
      name: "Areas",
      shortcut: ["aa"],
      keywords: "aa",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/areas"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Areas",
    },
    {
      id: "7",
      name: "Config path area",
      shortcut: ["acp"],
      keywords: "acp",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/configPathArea"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Config path area",
    },
    {
      id: "8",
      name: "Contract Point",
      shortcut: ["acp"],
      keywords: "acp",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/contractPoint"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Contract Point",
    },
    {
      id: "10",
      name: "Nomination Point",
      shortcut: ["anp"],
      keywords: "anp",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/nominationPoint"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Nomination Point",
    },
    {
      id: "11",
      name: "Metered Point",
      shortcut: ["amp"],
      keywords: "amp",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/meteredPoint"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Metered Point",
    },
    {
      id: "12",
      name: "Quality Point",
      shortcut: ["aqp"],
      keywords: "aqp",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/qualityPoint"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Quality Point",
    },
    {
      id: "13",
      name: "Concept Point",
      shortcut: ["accp"],
      keywords: "accp",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/conceptPoint"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Concept Point",
    },
    {
      id: "14",
      name: "Contract Nom.Point Relation",
      shortcut: ["acnpr"],
      keywords: "acnpr",
      section: "Asstes",
      perform: () => router.push("/en/main/dam/contractNomPointRelation"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Asstes > Contract Nom.Point Relation",
    },
    {
      id: "16",
      name: "Nomination Deadline",
      shortcut: ["pnd"],
      keywords: "pnd",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/nominationDeadine"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > Nomination Deadline",
    },
    {
      id: "17",
      name: "Forecasting Deadline",
      shortcut: ["pfd"],
      keywords: "pfd",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/forecastingDeadine"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > Forecasting Deadline",
    },
    {
      id: "18",
      name: "Contract Deadline",
      shortcut: ["pcd"],
      keywords: "pcd",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/contractDeadine"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > Contract Deadline",
    },
    {
      id: "19",
      name: "Area Quality Per Shipper",
      shortcut: ["paqps"],
      keywords: "paqps",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/areaQualityPerShipper"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > Area Quality Per Shipper",
    },
    {
      id: "20",
      name: "System Parameter",
      shortcut: ["psp"],
      keywords: "psp",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/systemParameter"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > System Parameter",
    },
    {
      id: "21",
      name: "Email Notification Management",
      shortcut: ["penm"],
      keywords: "penm",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/emailNotificationManagement"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > Email Notification Management",
    },
    {
      id: "22",
      name: "User Guide",
      shortcut: ["pug"],
      keywords: "pug",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/userGuide"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > User Guide",
    },
    {
      id: "23",
      name: "Shirinkage Factor / Line Requirement",
      shortcut: ["pug"],
      keywords: "pug",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/shirinkageFactorLineRequirement"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > Shirinkage Factor / Line Requirement",
    },
    {
      id: "24",
      name: "Mode/Zone Base Inventory",
      shortcut: ["pmzbi"],
      keywords: "pmzbi",
      section: "Parameters",
      perform: () => router.push("/en/main/dam/modeZoneBaseInventory"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Parameters > Mode/Zone Base Inventory",
    },
    // {
    //   id: "6",
    //   name: "Menu3",
    //   shortcut: ["m3"],
    //   keywords: "m3",
    //   section: "Menu3",
    //   perform: () => router.push("/en/main/dam/menu"),
    //   icon: <CottageIcon className="w-6 h-6 mx-3" />,
    //   subtitle: "Detail...",
    // },
  ];
  const menuDam: any = [
    {
      id: 1,
      menuName: "Business Partners",
      active: false,
      url: null,
      sub: [
        {
          id: 11,
          menuName: "Shippers",
          active: false,
          url: `dam/shippers`,
          sub: [],
        },
        {
          id: 12,
          menuName: "User",
          active: false,
          url: `dam/users`,
          sub: [],
        },
        {
          id: 13,
          menuName: "Roles",
          active: false,
          url: `dam/role`,
          sub: [],
        },
        {
          id: 14,
          menuName: "Operators",
          active: false,
          url: `dam/operators`,
          sub: [],
        },
      ],
    },
    {
      id: 2,
      menuName: "Assets",
      active: false,
      url: null,
      sub: [
        {
          id: 21,
          menuName: "Zone",
          active: false,
          url: "dam/zone",
          sub: [],
        },
        {
          id: 22,
          menuName: "Areas",
          active: false,
          url: "dam/areas",
          sub: [],
        },
        {
          id: 23,
          menuName: "Config path area",
          active: false,
          url: "dam/configPathArea",
          sub: [],
        },
        {
          id: 24,
          menuName: "Contract Point",
          active: false,
          url: "dam/contractPoint",
          sub: [],
        },
        {
          id: 25,
          menuName: "Nomination Point",
          active: false,
          url: "dam/nominationPoint",
          sub: [],
        },
        {
          id: 26,
          menuName: "Metered Point",
          active: false,
          url: "dam/meteredPoint",
          sub: [],
        },
        {
          id: 27,
          menuName: "Quality Point",
          active: false,
          url: "dam/qualityPoint",
          sub: [],
        },
        {
          id: 28,
          menuName: "Concept Point",
          active: false,
          url: "dam/conceptPoint",
          sub: [],
        },
        {
          id: 29,
          menuName: "Contract Nom.Point Relation",
          active: false,
          url: "dam/contractNomPointRelation",
          sub: [],
        },
      ],
    },
    {
      id: 3,
      menuName: "Parameters",
      active: false,
      url: null,
      sub: [
        {
          id: 31,
          menuName: "Nomination Deadline",
          active: false,
          url: "dam/nominationDeadine",
          sub: [],
        },
        {
          id: 32,
          menuName: "Forecasting Deadline",
          active: false,
          url: "dam/forecastingDeadine",
          sub: [],
        },
        {
          id: 33,
          menuName: "Contract Deadline",
          active: false,
          url: "dam/contractDeadine",
          sub: [],
        },
        {
          id: 34,
          menuName: "Area Quality Per Shipper",
          active: false,
          url: "dam/areaQualityPerShipper",
          sub: [],
        },
        {
          id: 35,
          menuName: "System Parameter",
          active: false,
          url: "dam/systemParameter",
          sub: [],
        },
        {
          id: 36,
          menuName: "Email Notification Management",
          active: false,
          url: "dam/emailNotificationManagement",
          sub: [],
        },
        {
          id: 37,
          menuName: "User Guide",
          active: false,
          url: "dam/userGuide",
          sub: [],
        },
        {
          id: 38,
          menuName: "Shirinkage Factor / Line Requirement",
          active: false,
          url: "dam/shirinkageFactorLineRequirement",
          sub: [],
        },
        {
          id: 39,
          menuName: "Mode/Zone Base Inventory",
          active: false,
          url: "dam/modeZoneBaseInventory",
          sub: [],
        },
        
      ],
    },
    // {
    //   id: 3,
    //   menuName: "menu3",
    //   active: false,
    //   url: null,
    //   sub: [],
    // },
    // {
    //   id: 4,
    //   menuName: "menu4",
    //   active: false,
    //   url: null,
    //   sub: [],
    // },
    // {
    //   id: 5,
    //   menuName: "menu5",
    //   active: false,
    //   url: null,
    //   sub: [],
    // },
  ];

  // forecasting
  const kBarForecasting = [
    {
      id: "1",
      name: "Contract Type",
      shortcut: ["ct"],
      keywords: "ct",
      section: "Contract Type",
      perform: () => router.push("/en/main/forecasting/contractType"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Contract Type",
    },
    {
      id: "2",
      name: "Query Shippers' Forcasting Files",
      shortcut: ["qsff"],
      keywords: "qsff",
      section: "Query Shippers' Forcasting Files",
      perform: () => router.push("/en/main/forecasting/queryShippersForcastingFiles"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Query Shippers' Forcasting Files",
    },
    {
      id: "3",
      name: "Bulletin Board",
      shortcut: ["bb"],
      keywords: "bb",
      section: "Bulletin Board",
      perform: () => router.push("/en/main/forecasting/bulletinBoard"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Bulletin Board",
    },
   
  ];
  const menuForecasting: any = [
    {
      id: 1,
      menuName: "Contract Type",
      active: false,
      url: "forecasting/contractType",
      sub: [],
    },
    {
      id: 2,
      menuName: "Query Shippers' Forcasting Files",
      active: false,
      url: "forecasting/queryShippersForcastingFiles",
      sub: [],
    },
    {
      id: 3,
      menuName: "Bulletin Board",
      active: false,
      url: "forecasting/bulletinBoard",
      sub: [],
    },
  ];
  // booking
  const kBarBoking = [
    {
      id: "1",
      name: "Contract Type",
      shortcut: ["ct"],
      keywords: "ct",
      section: "Contract Type",
      perform: () => router.push("/en/main/forecasting/contractType"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Contract Type",
    },
    {
      id: "2",
      name: "Query Shippers' Forcasting Files",
      shortcut: ["qsff"],
      keywords: "qsff",
      section: "Query Shippers' Forcasting Files",
      perform: () => router.push("/en/main/forecasting/queryShippersForcastingFiles"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Query Shippers' Forcasting Files",
    },
    {
      id: "3",
      name: "Bulletin Board",
      shortcut: ["bb"],
      keywords: "bb",
      section: "Bulletin Board",
      perform: () => router.push("/en/main/forecasting/bulletinBoard"),
      icon: <CottageIcon className="w-6 h-6 mx-3" />,
      subtitle: "Bulletin Board",
    },
   
  ];
  const menuBooking: any = [
    {
      id: 1,
      menuName: "Contract Type",
      active: false,
      url: "forecasting/contractType",
      sub: [],
    },
    {
      id: 2,
      menuName: "Query Shippers' Forcasting Files",
      active: false,
      url: "forecasting/queryShippersForcastingFiles",
      sub: [],
    },
    {
      id: 3,
      menuName: "Bulletin Board",
      active: false,
      url: "forecasting/bulletinBoard",
      sub: [],
    },
  ];

  const actions = pathname.split("/")[3] === "dam" ? kBarDam : pathname.split("/")[3] === "forecasting" ? kBarForecasting : []
  const tempMenu  = pathname.split("/")[3] === "dam" ? menuDam : pathname.split("/")[3] === "forecasting" ? menuForecasting : []

  return (
    <>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner className="bg-[#63676b7d] z-[9999]">
            <KBarAnimator className="max-w-3xlLspInfo w-3/6 bg-white border-r-8 overflow-hidden shadow-white text-black">
              <KBarSearch
                defaultPlaceholder="Search..."
                className="py-4 px-5 text-xs w-full outline-none border-none bg-white text-black "
              />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <BarMenuContent tempMenu={tempMenu} />
      </KBarProvider>
    </>
  );
}

dayjs.extend(buddhistEra);



function BarMenuContent({tempMenu}:any) {
  const router = useRouter();
  const { query } = useKBar();
  const pathname = usePathname();
  const [renders, setRenders] = useState(false);
  const [menuState, setMenuState] = useState<any>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openApp, setOpenApp] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [bCMenu, setBCMenu] = useState<any>([]);
  // console.log('pathname : ', pathname);
  // console.log(pathname.split("/")[4]);
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

  const backTo = async () => {
    router.push("/en/main");
  };

  const handleMenu = async (payload: any) => {
    // console.log(payload);
    // if(!!payload?.url){
    getUrlBc(payload?.url);
    // }
  };

  const getUrlBc = async (payload: any) => {
    console.log(payload);
    let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${locale || `en`}/main/${payload}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // dayjs.locale("th");
      // let format = dayjs().format("DD MMM BBBB HH:mm:ss");
      // let format = dayjs().format("DD MMMM BBBB HH:mm:ss");
      // let format = dayjs().format("DD MM BB HH:mm:ss")
      dayjs.locale("en");
      let format = dayjs().format("DD MMMM YYYY HH:mm:ss");
      // let format = dayjs().format("DD MM YY HH:mm:ss")
      setCurrentTime(format);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let pathUse = `${pathname.split("/")[3]}/${pathname.split("/")[4]}`;
    let fil: any = [];

    fil.push({
      menuName: pathname.split("/")[3],
      url: pathname.split("/")[3],
    });

    menuState.map((e: any) => {
      if (e?.url === pathUse) {
        fil.push(e);
      }
      return e;
    });

    if (fil.length === 1) {
      menuState.map((e: any) => {
        e?.sub.map((eS: any) => {
          if (eS?.url === pathUse) {
            fil.push(e);
            fil.push(eS);
          }
          return eS;
        });
        return e;
      });
    }
    setBCMenu(fil);

    return () => {};
  }, [menuState, pathname]);

  // useEffect(() => {
  //   console.log(bCMenu);
  // }, [bCMenu]);

  useEffect(() => {
    let newData = tempMenu.map((e:any) => {

      return {...e, active:false}
    })
    setMenuState(newData);

    return () => {
      setMenuState([]);
    };
  }, []);

  //   bg-gray-900
  return (
    <>
      <header className="">
        <nav className="bg-[#ffffff] border-gray-200 px-4 py-2.5 text-[#58585a]">
          <div className="flex flex-wrap justify-between">
            <div className="flex">
              <div className=" border-r-[2px] border-[#DFE4EA] flex items-center">
                <img
                  src="/assets/image/logo.png"
                  className="mr-3 h-[30px]"
                  alt="FlowBite Logo"
                />
              </div>
              <div className=" flex items-center ml-2">
                <div className="mx-auto sm:px-4 px-4 lg:px-4 bg-[#ffffff] text-[#58585a]">
                  <div className="relative flex sm:h-12 items-center justify-between">
                    {renders}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="hidden  sm:block">
                        <div className="flex space-x-4">
                          {(menuState || []).map((item: any, ix: any) => {
                            let pathUrl = `${pathname.split("/")[3]}/${pathname.split("/")[4]}`
                            let gItem = item?.sub.find((f:any) => { return f?.url === pathUrl})
                            return (
                              <div className="relative  z-[1000]" key={ix}>
                                <button
                                  onClick={() => {
                                    setMenuState((pre: any) => {
                                      let newPre = pre.map((element: any) => {
                                        if (element?.id === item?.id) {
                                          element.active = !element.active;
                                        } else {
                                          element.active = false;
                                        }

                                        return {
                                          ...element,
                                          sub: (element?.sub || []).map(
                                            (elementSub: any) => {
                                              elementSub.active = false;
                                              return elementSub;
                                            }
                                          ),
                                        };
                                      });
                                      setRenders((old: any) => !old);
                                      return [...newPre];
                                    });
                                    item?.sub.length === 0 && handleMenu(item);
                                  }}
                                  className={` ${!!gItem ? "text-[#1473a1]" : "text-[#58585a] "} hover:bg-gray-100  rounded-md px-3 py-2 text-sm font-medium flex items-center`}
                                >
                                  {item?.menuName}
                                  {item?.sub.length > 0 && (
                                    <ExpandMoreIcon
                                      sx={{ fontSize: 20 }}
                                      className={`${
                                        item?.active ? "rotate-180" : ""
                                      }  duration-300 ease-in-out`}
                                    />
                                  )}
                                </button>
                                <div
                                  id="dropdown-menu"
                                  className={`absolute mt-2 min-w-48 w-fit whitespace-nowrap bg-[#ffffff] rounded-md shadow-xl z-10 ${
                                    item?.active ? "" : "hidden"
                                  }`}
                                >
                                  {(item?.sub || []).map(
                                    (itemSub: any, ixSub: any) => {
                                      let pathUrl = `${pathname.split("/")[3]}/${pathname.split("/")[4]}`
                                      let gItemSub = itemSub?.url === pathUrl ? true : false
                                      return (
                                        <div key={ixSub}>
                                          <button
                                            className={`block px-4 py-2 text-sm ${!!gItemSub ? "text-[#1473a1]" : "text-[#58585a]"} hover:bg-gray-100 min-w-48 w-fit whitespace-nowrap text-left`}
                                            onClick={() => {
                                              if (itemSub?.sub.length === 0) {
                                                setMenuState((pre: any) => {
                                                  let newPre = pre.map(
                                                    (element: any) => {
                                                      if (
                                                        element?.id === item?.id
                                                      ) {
                                                        element.active =
                                                          !element.active;
                                                      } else {
                                                        element.active = false;
                                                      }

                                                      return {
                                                        ...element,
                                                        sub: (
                                                          element?.sub || []
                                                        ).map(
                                                          (elementSub: any) => {
                                                            elementSub.active =
                                                              false;
                                                            return elementSub;
                                                          }
                                                        ),
                                                      };
                                                    }
                                                  );
                                                  setRenders(
                                                    (old: any) => !old
                                                  );
                                                  return [...newPre];
                                                });
                                                handleMenu(itemSub);
                                              } else {
                                                setMenuState((pre: any) => {
                                                  let newPre = pre.map(
                                                    (element: any) => {
                                                      return {
                                                        ...element,
                                                        sub: (
                                                          element?.sub || []
                                                        ).map(
                                                          (elementSub: any) => {
                                                            if (
                                                              elementSub?.id ===
                                                              itemSub?.id
                                                            ) {
                                                              elementSub.active =
                                                                !elementSub.active;
                                                            } else {
                                                              elementSub.active =
                                                                false;
                                                            }
                                                            return elementSub;
                                                          }
                                                        ),
                                                      };
                                                    }
                                                  );
                                                  setRenders(
                                                    (old: any) => !old
                                                  );
                                                  return [...newPre];
                                                });
                                              }
                                            }}
                                          >
                                            {itemSub?.menuName}
                                            {itemSub?.sub.length > 0 && (
                                              <ExpandMoreIcon
                                                sx={{ fontSize: 20 }}
                                                className={`${
                                                  itemSub?.active
                                                    ? "rotate-180"
                                                    : ""
                                                }  duration-300 ease-in-out`}
                                              />
                                            )}
                                          </button>
                                          <div
                                            id="submenu"
                                            className={`ml-2 ${
                                              itemSub?.active ? "" : "hidden"
                                            }`}
                                          >
                                            {(itemSub?.sub || []).map(
                                              (itemSubs: any, ixSubs: any) => {
                                                return (
                                                  <div key={ixSubs}>
                                                    <button
                                                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 min-w-48 w-fit whitespace-nowrap text-left"
                                                      onClick={() => {
                                                        setMenuState(
                                                          (pre: any) => {
                                                            let newPre =
                                                              pre.map(
                                                                (
                                                                  element: any
                                                                ) => {
                                                                  if (
                                                                    element?.id ===
                                                                    item?.id
                                                                  ) {
                                                                    element.active =
                                                                      !element.active;
                                                                  } else {
                                                                    element.active =
                                                                      false;
                                                                  }

                                                                  return {
                                                                    ...element,
                                                                    sub: (
                                                                      element?.sub ||
                                                                      []
                                                                    ).map(
                                                                      (
                                                                        elementSub: any
                                                                      ) => {
                                                                        elementSub.active =
                                                                          false;
                                                                        return elementSub;
                                                                      }
                                                                    ),
                                                                  };
                                                                }
                                                              );
                                                            setRenders(
                                                              (old: any) => !old
                                                            );
                                                            return [...newPre];
                                                          }
                                                        );
                                                        handleMenu(itemSubs);
                                                      }}
                                                    >
                                                      {itemSubs?.menuName}
                                                    </button>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {openMenu && (
                  <>
                    <div className="sm:hidden" id="mobile-menu">
                      <div className="space-y-1 px-2 pb-3 pt-2">
                        {(menuState || []).map((item: any, ix: any) => {
                          return (
                            <div className="relative" key={ix}>
                              <button
                                onClick={() => {
                                  setMenuState((pre: any) => {
                                    let newPre = pre.map((element: any) => {
                                      if (element?.id === item?.id) {
                                        element.active = !element.active;
                                      } else {
                                        element.active = false;
                                      }

                                      return {
                                        ...element,
                                        sub: (element?.sub || []).map(
                                          (elementSub: any) => {
                                            elementSub.active = false;
                                            return elementSub;
                                          }
                                        ),
                                      };
                                    });
                                    setRenders((old: any) => !old);
                                    return [...newPre];
                                  });
                                  item?.sub.length === 0 && handleMenu(item);
                                }}
                                className="text-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium flex items-center w-[100%]"
                              >
                                {item?.menuName}
                                {item?.sub.length > 0 && (
                                  <ChevronRight sx={{ fontSize: 20 }} />
                                )}
                              </button>
                              <div
                                id="dropdown-menu"
                                className={`absolute mt-2  w-[100%] bg-gray-900 rounded-md shadow-lg z-10 ${
                                  item?.active ? "" : "hidden"
                                }`}
                              >
                                {(item?.sub || []).map(
                                  (itemSub: any, ixSub: any) => {
                                    return (
                                      <div key={ixSub}>
                                        <button
                                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 w-[100%] text-left"
                                          onClick={() => {
                                            if (itemSub?.sub.length === 0) {
                                              setMenuState((pre: any) => {
                                                let newPre = pre.map(
                                                  (element: any) => {
                                                    if (
                                                      element?.id === item?.id
                                                    ) {
                                                      element.active =
                                                        !element.active;
                                                    } else {
                                                      element.active = false;
                                                    }

                                                    return {
                                                      ...element,
                                                      sub: (
                                                        element?.sub || []
                                                      ).map(
                                                        (elementSub: any) => {
                                                          elementSub.active =
                                                            false;
                                                          return elementSub;
                                                        }
                                                      ),
                                                    };
                                                  }
                                                );
                                                setRenders((old: any) => !old);
                                                return [...newPre];
                                              });
                                              handleMenu(itemSub);
                                            } else {
                                              setMenuState((pre: any) => {
                                                let newPre = pre.map(
                                                  (element: any) => {
                                                    return {
                                                      ...element,
                                                      sub: (
                                                        element?.sub || []
                                                      ).map(
                                                        (elementSub: any) => {
                                                          if (
                                                            elementSub?.id ===
                                                            itemSub?.id
                                                          ) {
                                                            elementSub.active =
                                                              !elementSub.active;
                                                          } else {
                                                            elementSub.active =
                                                              false;
                                                          }
                                                          return elementSub;
                                                        }
                                                      ),
                                                    };
                                                  }
                                                );
                                                setRenders((old: any) => !old);
                                                return [...newPre];
                                              });
                                            }
                                          }}
                                        >
                                          {itemSub?.menuName}
                                          {itemSub?.sub.length > 0 && (
                                            <ChevronRight
                                              sx={{ fontSize: 20 }}
                                            />
                                          )}
                                        </button>
                                        <div
                                          id="submenu"
                                          className={`ml-2 ${
                                            itemSub?.active ? "" : "hidden"
                                          }`}
                                        >
                                          {(itemSub?.sub || []).map(
                                            (itemSubs: any, ixSubs: any) => {
                                              return (
                                                <div key={ixSubs}>
                                                  <button
                                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 w-[100%] text-left"
                                                    onClick={() => {
                                                      setMenuState(
                                                        (pre: any) => {
                                                          let newPre = pre.map(
                                                            (element: any) => {
                                                              if (
                                                                element?.id ===
                                                                item?.id
                                                              ) {
                                                                element.active =
                                                                  !element.active;
                                                              } else {
                                                                element.active =
                                                                  false;
                                                              }

                                                              return {
                                                                ...element,
                                                                sub: (
                                                                  element?.sub ||
                                                                  []
                                                                ).map(
                                                                  (
                                                                    elementSub: any
                                                                  ) => {
                                                                    elementSub.active =
                                                                      false;
                                                                    return elementSub;
                                                                  }
                                                                ),
                                                              };
                                                            }
                                                          );
                                                          setRenders(
                                                            (old: any) => !old
                                                          );
                                                          return [...newPre];
                                                        }
                                                      );
                                                      handleMenu(itemSubs);
                                                    }}
                                                  >
                                                    {itemSubs?.menuName}
                                                  </button>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 ">
              <div className=" border-r-[2px] border-[#DFE4EA] mx-2">
                <button
                  type="button"
                  className=" p-[3px] bg-[#58585A] text-[#ffffff] rounded-sm text-[10px] mx-3"
                  onClick={query.toggle}
                >
                  <div className=" flex items-center justify-center font-bold">
                    {`⌘K`}
                  </div>
                </button>
                <button
                  type="button"
                  data-dropdown-toggle="notification-dropdown"
                  className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 "
                  onClick={() => {
                    setOpenNoti((pre: any) => {
                      !pre && setOpenMenu(false);
                      !pre && setOpenProfile(false);
                      !pre && setOpenApp(false);
                      return !pre;
                    });
                  }}
                >
                  <NotificationsIcon className=" text-[#58585A]" />
                </button>
                {openNoti && (
                  <div
                    className="absolute top-10 right-1 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg  "
                    id="notification-dropdown"
                  >
                    <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50  ">
                      Notifications
                    </div>
                    <div>
                      <a
                        href="#"
                        className="flex py-3 px-4 border-b hover:bg-gray-100  "
                      >
                        <div className="flex-shrink-0">
                          <img
                            className="w-11 h-11 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                            alt="Bonnie Green avatar"
                          />
                          <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 ">
                            <svg
                              className="w-2 h-2 text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 18"
                            >
                              <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                              <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                            New message from{" "}
                            <span className="font-semibold text-gray-900 ">
                              Bonnie Green
                            </span>
                            : "Hey, what's up? All set for the presentation?"
                          </div>
                          <div className="text-xs font-medium text-primary-700 ">
                            a few moments ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex py-3 px-4 border-b hover:bg-gray-100  "
                      >
                        <div className="flex-shrink-0">
                          <img
                            className="w-11 h-11 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                            alt="Jese Leos avatar"
                          />
                          <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white ">
                            <svg
                              className="w-2 h-2 text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 18"
                            >
                              <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                            <span className="font-semibold text-gray-900 ">
                              Jese leos
                            </span>{" "}
                            and{" "}
                            <span className="font-medium text-gray-900 ">
                              5 others
                            </span>{" "}
                            started following you.
                          </div>
                          <div className="text-xs font-medium text-primary-700 ">
                            10 minutes ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex py-3 px-4 border-b hover:bg-gray-100  "
                      >
                        <div className="flex-shrink-0">
                          <img
                            className="w-11 h-11 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                            alt="Joseph McFall avatar"
                          />
                          <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white ">
                            <svg
                              className="w-2 h-2 text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 18"
                            >
                              {" "}
                              <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />{" "}
                            </svg>
                          </div>
                        </div>
                        <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                            <span className="font-semibold text-gray-900 ">
                              Joseph Mcfall
                            </span>{" "}
                            and{" "}
                            <span className="font-medium text-gray-900 ">
                              141 others
                            </span>{" "}
                            love your story. See it and view more stories.
                          </div>
                          <div className="text-xs font-medium text-primary-700 ">
                            44 minutes ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="flex py-3 px-4 border-b hover:bg-gray-100  "
                      >
                        <div className="flex-shrink-0">
                          <img
                            className="w-11 h-11 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                            alt="Roberta Casas image"
                          />
                          <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white ">
                            <svg
                              className="w-2 h-2 text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 18"
                            >
                              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                            <span className="font-semibold text-gray-900 ">
                              Leslie Livingston
                            </span>{" "}
                            mentioned you in a comment:{" "}
                            <span className="font-medium text-primary-700 ">
                              @bonnie.green
                            </span>{" "}
                            what do you say?
                          </div>
                          <div className="text-xs font-medium text-primary-700 ">
                            1 hour ago
                          </div>
                        </div>
                      </a>
                      <a href="#" className="flex py-3 px-4 hover:bg-gray-100 ">
                        <div className="flex-shrink-0">
                          <img
                            className="w-11 h-11 rounded-full"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                            alt="Robert image"
                          />
                          <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white ">
                            <svg
                              className="w-2 h-2 text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 14"
                            >
                              <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="pl-3 w-full">
                          <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                            <span className="font-semibold text-gray-900 ">
                              Robert Brown
                            </span>{" "}
                            posted a new video: Glassmorphism - learn how to
                            implement the new design trend.
                          </div>
                          <div className="text-xs font-medium text-primary-700 ">
                            3 hours ago
                          </div>
                        </div>
                      </a>
                    </div>
                    {/* <a
                      href="#"
                      className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100   "
                    >
                      <div className="inline-flex items-center ">
                        <svg
                          aria-hidden="true"
                          className="mr-2 w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        View all
                      </div>
                    </a> */}
                  </div>
                )}

                <button
                  type="button"
                  data-dropdown-toggle="apps-dropdown"
                  className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 "
                  onClick={() => {
                    setOpenApp((pre: any) => {
                      !pre && setOpenMenu(false);
                      !pre && setOpenProfile(false);
                      !pre && setOpenNoti(false);
                      return !pre;
                    });
                  }}
                >
                  <AppsIcon className=" text-[#58585A]" />
                </button>
                {openApp && (
                  <div
                    className=" absolute top-10 right-1 overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg  "
                    id="apps-dropdown"
                  >
                    <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50  ">
                      Apps
                    </div>
                    <div className="grid grid-cols-3">
                      {Array.from({ length: 9 }, (_, index) => {
                        return (
                          <div key={index} className="block py-4 px-8 text-center hover:bg-gray-100  group cursor-pointer border-[1px]">
                            <PieChartOutlineOutlinedIcon
                              style={{ fontSize: "32px" }}
                              className={` `}
                            />
                            <div className="text-sm font-medium text-gray-900 ">
                              Demo
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Profile />

              <div className=" text-left ml-3">
                <div className="font-bold text-sm">User Demo</div>
                <div className="min-w-[20px] w-fit bg-[#EEF6FC] font-bold text-[#6DADE9] flex items-center justify-center px-5 rounded-full text-xs">
                  Shipper
                </div>
              </div>
              <div className="sm:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => {
                    setOpenMenu((old: any) => {
                      !old && setOpenProfile(false);
                      !old && setOpenApp(false);
                      !old && setOpenNoti(false);
                      !old &&
                        setMenuState((pre: any) => {
                          let newPre = pre.map((element: any) => {
                            element.active = false;
                            return {
                              ...element,
                              sub: (element?.sub || []).map(
                                (elementSub: any) => {
                                  elementSub.active = false;
                                  return elementSub;
                                }
                              ),
                            };
                          });
                          setRenders((old: any) => !old);
                          return [...newPre];
                        });
                      return !old;
                    });
                  }}
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* <nav className="">
        <nav
          className="justify-between px-4 py-4 text-[#58585a] border border-gray-200 sm:flex sm:px-5 bg-[#f9fafb]"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center mb-3 space-x-1 md:space-x-2 rtl:space-x-reverse sm:mb-0">
            <li>
              <div className="flex items-center">
                <span
                  className="ms-1 text-sm font-bold text-[#2b2ab7] hover:text-[#58585a] cursor-pointer"
                  onClick={()=>{backTo()}}
                >
                  home
                </span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-sm font-medium md:ms-2 text-gray-400 hover:hover:text-[#58585a]"
                >
                  sub
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center ">
                <svg
                  className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="mx-1 text-sm font-medium md:mx-2 text-gray-400">
                  insub
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mx-auto sm:px-4 px-4 lg:px-4 bg-[#ffffff] text-[#58585a]">
          <div className="relative flex sm:h-12 items-center justify-between">
            {renders}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden  sm:block">
                <div className="flex space-x-4">
                  {(menuState || []).map((item: any, ix: any) => {
                    return (
                      <div className="relative" key={ix}>
                        <button
                          onClick={() => {
                            setMenuState((pre: any) => {
                              let newPre = pre.map((element: any) => {
                                if (element?.id === item?.id) {
                                  element.active = !element.active;
                                } else {
                                  element.active = false;
                                }

                                return {
                                  ...element,
                                  sub: (element?.sub || []).map(
                                    (elementSub: any) => {
                                      elementSub.active = false;
                                      return elementSub;
                                    }
                                  ),
                                };
                              });
                              setRenders((old: any) => !old);
                              return [...newPre];
                            });
                            item?.sub.length === 0 && handleMenu(item);
                          }}
                          className="text-[#58585a] hover:bg-gray-100 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium flex items-center"
                        >
                          {item?.menuName}
                          {item?.sub.length > 0 && (
                            <ExpandMoreIcon sx={{ fontSize: 20 }} className={`${item?.active ? "rotate-180" : ""}  duration-300 ease-in-out`} />
                          )}
                        </button>
                        <div
                          id="dropdown-menu"
                          className={`absolute mt-2 min-w-48 w-fit whitespace-nowrap bg-[#ffffff] rounded-md shadow-lg z-10 ${
                            item?.active ? "" : "hidden"
                          }`}
                        >
                          {(item?.sub || []).map((itemSub: any, ixSub: any) => {
                            return (
                              <div key={ixSub}>
                                <button
                                  className="block px-4 py-2 text-sm text-[#58585a] hover:bg-gray-100 min-w-48 w-fit whitespace-nowrap text-left"
                                  onClick={() => {
                                    if (itemSub?.sub.length === 0) {
                                      setMenuState((pre: any) => {
                                        let newPre = pre.map((element: any) => {
                                          if (element?.id === item?.id) {
                                            element.active = !element.active;
                                          } else {
                                            element.active = false;
                                          }

                                          return {
                                            ...element,
                                            sub: (element?.sub || []).map(
                                              (elementSub: any) => {
                                                elementSub.active = false;
                                                return elementSub;
                                              }
                                            ),
                                          };
                                        });
                                        setRenders((old: any) => !old);
                                        return [...newPre];
                                      });
                                      handleMenu(itemSub);
                                    } else {
                                      setMenuState((pre: any) => {
                                        let newPre = pre.map((element: any) => {
                                          return {
                                            ...element,
                                            sub: (element?.sub || []).map(
                                              (elementSub: any) => {
                                                if (
                                                  elementSub?.id === itemSub?.id
                                                ) {
                                                  elementSub.active =
                                                    !elementSub.active;
                                                } else {
                                                  elementSub.active = false;
                                                }
                                                return elementSub;
                                              }
                                            ),
                                          };
                                        });
                                        setRenders((old: any) => !old);
                                        return [...newPre];
                                      });
                                    }
                                  }}
                                >
                                  {itemSub?.menuName}
                                  {itemSub?.sub.length > 0 && (
                                    <ExpandMoreIcon sx={{ fontSize: 20 }} className={`${itemSub?.active ? "rotate-180" : ""}  duration-300 ease-in-out`} />
                                  )}
                                </button>
                                <div
                                  id="submenu"
                                  className={`ml-2 ${
                                    itemSub?.active ? "" : "hidden"
                                  }`}
                                >
                                  {(itemSub?.sub || []).map(
                                    (itemSubs: any, ixSubs: any) => {
                                      return (
                                        <div key={ixSubs}>
                                          <button
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 min-w-48 w-fit whitespace-nowrap text-left"
                                            onClick={() => {
                                              setMenuState((pre: any) => {
                                                let newPre = pre.map(
                                                  (element: any) => {
                                                    if (
                                                      element?.id === item?.id
                                                    ) {
                                                      element.active =
                                                        !element.active;
                                                    } else {
                                                      element.active = false;
                                                    }

                                                    return {
                                                      ...element,
                                                      sub: (
                                                        element?.sub || []
                                                      ).map(
                                                        (elementSub: any) => {
                                                          elementSub.active =
                                                            false;
                                                          return elementSub;
                                                        }
                                                      ),
                                                    };
                                                  }
                                                );
                                                setRenders((old: any) => !old);
                                                return [...newPre];
                                              });
                                              handleMenu(itemSubs);
                                            }}
                                          >
                                            {itemSubs?.menuName}
                                          </button>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {openMenu && (
          <>
            <div className="sm:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {(menuState || []).map((item: any, ix: any) => {
                  return (
                    <div className="relative" key={ix}>
                      <button
                        onClick={() => {
                          setMenuState((pre: any) => {
                            let newPre = pre.map((element: any) => {
                              if (element?.id === item?.id) {
                                element.active = !element.active;
                              } else {
                                element.active = false;
                              }

                              return {
                                ...element,
                                sub: (element?.sub || []).map(
                                  (elementSub: any) => {
                                    elementSub.active = false;
                                    return elementSub;
                                  }
                                ),
                              };
                            });
                            setRenders((old: any) => !old);
                            return [...newPre];
                          });
                          item?.sub.length === 0 && handleMenu(item);
                        }}
                        className="text-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium flex items-center w-[100%]"
                      >
                        {item?.menuName}
                        {item?.sub.length > 0 && (
                          <ChevronRight sx={{ fontSize: 20 }} />
                        )}
                      </button>
                      <div
                        id="dropdown-menu"
                        className={`absolute mt-2  w-[100%] bg-gray-900 rounded-md shadow-lg z-10 ${
                          item?.active ? "" : "hidden"
                        }`}
                      >
                        {(item?.sub || []).map((itemSub: any, ixSub: any) => {
                          return (
                            <div key={ixSub}>
                              <button
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 w-[100%] text-left"
                                onClick={() => {
                                  if (itemSub?.sub.length === 0) {
                                    setMenuState((pre: any) => {
                                      let newPre = pre.map((element: any) => {
                                        if (element?.id === item?.id) {
                                          element.active = !element.active;
                                        } else {
                                          element.active = false;
                                        }

                                        return {
                                          ...element,
                                          sub: (element?.sub || []).map(
                                            (elementSub: any) => {
                                              elementSub.active = false;
                                              return elementSub;
                                            }
                                          ),
                                        };
                                      });
                                      setRenders((old: any) => !old);
                                      return [...newPre];
                                    });
                                    handleMenu(itemSub);
                                  } else {
                                    setMenuState((pre: any) => {
                                      let newPre = pre.map((element: any) => {
                                        return {
                                          ...element,
                                          sub: (element?.sub || []).map(
                                            (elementSub: any) => {
                                              if (
                                                elementSub?.id === itemSub?.id
                                              ) {
                                                elementSub.active =
                                                  !elementSub.active;
                                              } else {
                                                elementSub.active = false;
                                              }
                                              return elementSub;
                                            }
                                          ),
                                        };
                                      });
                                      setRenders((old: any) => !old);
                                      return [...newPre];
                                    });
                                  }
                                }}
                              >
                                {itemSub?.menuName}
                                {itemSub?.sub.length > 0 && (
                                  <ChevronRight sx={{ fontSize: 20 }} />
                                )}
                              </button>
                              <div
                                id="submenu"
                                className={`ml-2 ${
                                  itemSub?.active ? "" : "hidden"
                                }`}
                              >
                                {(itemSub?.sub || []).map(
                                  (itemSubs: any, ixSubs: any) => {
                                    return (
                                      <div key={ixSubs}>
                                        <button
                                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 w-[100%] text-left"
                                          onClick={() => {
                                            setMenuState((pre: any) => {
                                              let newPre = pre.map(
                                                (element: any) => {
                                                  if (
                                                    element?.id === item?.id
                                                  ) {
                                                    element.active =
                                                      !element.active;
                                                  } else {
                                                    element.active = false;
                                                  }

                                                  return {
                                                    ...element,
                                                    sub: (
                                                      element?.sub || []
                                                    ).map((elementSub: any) => {
                                                      elementSub.active = false;
                                                      return elementSub;
                                                    }),
                                                  };
                                                }
                                              );
                                              setRenders((old: any) => !old);
                                              return [...newPre];
                                            });
                                            handleMenu(itemSubs);
                                          }}
                                        >
                                          {itemSubs?.menuName}
                                        </button>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </nav> */}
      <div
        className=" flex items-center justify-between text-white py-2.5 px-4"
        style={{
          background: "linear-gradient(90deg, #0BACF2 0%, #4BB285 100%)",
        }}
      >
        <div className="  font-bold flex items-center gap-2">
          {(bCMenu || []).length > 0 && (
            <div
              className="uppercase hover:underline cursor-pointer hover:text-gray-200"
              onClick={() => {
                getUrlBc(``);
              }}
            >
              {bCMenu[0].menuName || "-"}
            </div>
          )}
          {(bCMenu || []).length > 1 &&
            (bCMenu || []).map((item: any, ix: any) => {
              return (
                ix !== 0 && (
                  <div
                    key={ix}
                    className={`flex items-center gap-2  cursor-not-allowed `}
                  >
                    <KeyboardArrowRightIcon />
                    <div className="">{item?.menuName || "-"}</div>
                  </div>
                )
              );
            })}
          {/* {
            (bCMenu || []).length > 0 ? (bCMenu || []).map((item:any,ix:any) => {

              return (
                <div key={ix}>
                  {
                    ix === 0 ?
                    <div className="uppercase">{item?.menuName || "-"}</div>
                    : 
                    <div>{item?.menuName || "-"}</div>
                  }
                </div>
              )
            })
            : <div>{`-`}</div>
          } */}
        </div>
        <div className=" flex items-center">
          <div className=" border-r-[2px] border-[#DFE4EA] pr-2">
            {(!!currentTime &&
              `${currentTime.split(" ")[0]} ${currentTime.split(" ")[1]} ${
                currentTime.split(" ")[2]
              }`) ||
              "-"}
          </div>
          <div className=" ml-2">
            {(!!currentTime && currentTime.split(" ")[3]) || "-"}
          </div>
        </div>
      </div>
    </>
  );
}

export default BarMenu;
