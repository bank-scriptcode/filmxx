"use client";
import { deleteCookie } from "@/components/utils/cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import CameraRollOutlinedIcon from '@mui/icons-material/CameraRollOutlined';
let menuLib = [
  {
    id: 101,
    name: "New Cursor Realtime",
    url: "cursorRealtime",
  },
  {
    id: 100,
    name: "New Workflow Manage",
    url: "workflowManage",
  },
  {
    id: 10,
    name: "New Date Rang",
    url: "dateRang",
  },
  {
    id: 11,
    name: "New Drawer",
    url: "drawer",
  },
  {
    id: 12,
    name: "New ManageExcel",
    url: "manageExcel",
  },
  {
    id: 112,
    name: "New ManageExcelCus",
    url: "manageExcelCus",
  },
  {
    id: 13,
    name: "New Password Strong",
    url: "passwordStrong",
  },
  {
    id: 13,
    name: "New ReCaptcha",
    url: "reCaptcha",
  },
  {
    id: 14,
    name: "New Chart",
    url: "chartCustom",
  },
  {
    id: 15,
    name: "New KBar",
    url: "kBarCustom",
  },
  {
    id: 16,
    name: "New Upload",
    url: "uploadCustom",
  },
  // {
  //   id: 2222,
  //   name: "New Coming soon..",
  //   url: "soon",
  // },
  {
    id: 1,
    name: "ThreeJs",
    url: "threejs",
  },
  {
    id: 6,
    name: "Dashboard Custom",
    url: "dashboardCustom",
  },
  {
    id: 7,
    name: "Country Auto",
    url: "countryAuto",
  },
  {
    id: 2,
    name: "Map",
    url: "map",
  },
  {
    id: 3,
    name: "Flows",
    url: "flows",
  },
  {
    id: 4,
    name: "Modal Drag",
    url: "modalDrag",
  },

  {
    id: 8,
    name: "DatePickerCus",
    url: "datePickerCus",
  },
  {
    id: 9,
    name: "CountyPhone",
    url: "countyPhone",
  },
  {
    id: 5,
    name: "Table",
    url: "table",
  },

];

function Menu() {
  const router = useRouter();
  const [openProfile, setOpenProfile] = useState(false);

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

  const goTo = async (payload: any) => {
    router.push(`/en/lib/app/${payload?.url}`);
  };

  // 0E2A52

  return (
    <>
      <section
        className={` bg-[#1A3D70] text-[#ffffff] h-[100vh] relative overflow-y-hidden overflow-x-hidden`}
      >
        <aside className={`w-[100vw] h-[100vh] relative`}>
          <div
            className={`w-[20vw] h-[20vw]  rounded-full absolute top-[10vw] left-[10vw]`}
            style={{
              background: `radial-gradient(79.41% 79.41% at 33.56% 16.09%, #52719E 0%, #284979 57.5%, #0E2A52 100%)`,
            }}
          ></div>
          <div
            className={`w-[30vw] h-[30vw] rounded-full absolute bottom-[-10vw] right-[5vw]`}
            style={{
              background: `radial-gradient(79.41% 79.41% at 33.56% 16.09%, #52719E 0%, #284979 57.5%, #0E2A52 100%)`,
            }}
          ></div>
        </aside>
        <main className={`  w-[100vw] h-[100vh] absolute top-0 left-0`}>
          <div className=" flex items-center justify-between px-4 lg:px-6 py-2.5">
            <img
              src="/assets/image/logobw.png"
              alt="/assets/image/logobw.png"
              className="h-[40px]"
            />
            <div>
              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
                onClick={() => {
                  setOpenProfile((pre: any) => {
                    return !pre;
                  });
                }}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>
              {/* <!-- Dropdown menu --> */}
              {openProfile && (
                <div
                  className=" absolute top-10 right-1 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown"
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      Neil sims
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      name@flowbite.com
                    </span>
                  </div>
                  <ul
                    className="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        My profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        Account settings
                      </a>
                    </li>
                  </ul>
                  <ul
                    className="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href="#"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="mr-2 w-4 h-4 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                        </svg>
                        My likes
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="mr-2 w-4 h-4 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          {" "}
                          <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z" />{" "}
                          <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z" />{" "}
                          <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z" />{" "}
                        </svg>
                        Collections
                      </a>
                    </li>
                  </ul>
                  <ul
                    className="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li
                      className=""
                      onClick={() => {
                        signOut();
                      }}
                    >
                      <span className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Sign out
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className={` h-[calc(100vh-50px)] grid items-center`}>
            <div className={`p-5 grid items-center gap-6`}>
              <div className=" font-bold text-[24px] h-[50px] text-center">
                Please select menu Lib Demo
              </div>
              <div className="h-[calc(100vh-310px)] overflow-y-auto grid items-start">
                <div className="grid items-start grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ">
                  {/* {Array.from({ length: 12 }, (_, index) => {
                    return (
                      <div
                        key={index}
                        className={`noisy01 rounded-[20px] p-[10px] w-full aspect-[4/4] grid items-center justify-center text-[#ffffff] hover:text-[#00adef] hover:bg-[#ffffff] cursor-pointer`}
                        onClick={() => {
                          goTo();
                        }}
                      >
                        <div className="grid gap-3">
                          <PieChartOutlineOutlinedIcon
                            style={{ fontSize: "96px" }}
                            className={` `}
                          />
                          <div className="text-center font-bold">Dashboard</div>
                        </div>
                      </div>
                    );
                  })} */}
                  {(menuLib || []).map((item: any, ix: any) => {
                    return (
                      <div
                        key={ix}
                        className={`noisy01 rounded-[20px] p-[10px] w-full aspect-[4/4] grid items-center justify-center text-[#ffffff] hover:text-[#00adef] hover:bg-[#ffffff] cursor-pointer`}
                        onClick={() => {
                          goTo(item);
                        }}
                      >
                        <div className="grid gap-3">
                          <CameraRollOutlinedIcon
                            style={{ fontSize: "96px" }}
                            className={` `}
                          />
                          <div className="text-center font-bold">
                            {item?.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Menu;
