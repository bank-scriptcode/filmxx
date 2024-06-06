"use client";
import { deleteCookie } from "@/components/utils/cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import EditIcon from '@mui/icons-material/Edit';
import Profile from "@/components/layout/profile/Profile";

dayjs.extend(buddhistEra);

function Menu() {
  const router = useRouter();
  const [openProfile, setOpenProfile] = useState(false);
  const [currentTime, setCurrentTime] = useState<any>(null);

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

  const goTo = async (payload:any) => {
    router.push(`/en/main/${payload}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // dayjs.locale("th");
      // let format = dayjs().format("DD MMMM BBBB HH:mm:ss");
      // let format = dayjs().format("DD MM BB HH:mm:ss")
      dayjs.locale("en");
      let format = dayjs().format("DD MMMM YYYY HH:mm:ss")
      // let format = dayjs().format("DD MM YY HH:mm:ss")
      setCurrentTime(format);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 0E2A52

  return (
    <>
      <section
        className={` bg-[#ffffff] text-[#2B2A87] h-[100vh] relative overflow-y-hidden overflow-x-hidden`}
      >
        <img
          src="/assets/image/industrial-gas-storage-tank-gas-turbine-electrical-power-plant-global-energy-crisis-concept 1.png"
          className="w-full h-full object-cover bg-cover bg-center	bg-no-repeat"
          alt=""
        />
        {/* <aside className={`w-[100vw] h-[100vh] relative`}>
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
        </aside> */} 
        <main className={`  w-[100vw] h-[100vh] absolute top-0 left-0`}>
          <div className=" flex items-center justify-between px-4 lg:px-6 py-2.5">
            <img
              src="/assets/image/Group 1000004236.png"
              alt="/assets/image/Group 1000004236.png"
              className="h-[40px]"
            />
            <div className=" flex items-center gap-5">
              <div className=" text-right">
                <div className=" ml-auto font-bold">User Demo</div>
                <div className=" ml-auto min-w-[20px] w-fit bg-[#C9E6FB] flex items-center justify-center px-5 rounded-full text-sm">Shipper</div>
              </div>
            
              <Profile />
              <LogoutIcon className=" cursor-pointer" />
            </div>
          </div>
          <div className={` h-[calc(100vh-50px)] grid items-center`}>
            <div className={`p-5 grid items-center gap-10`}>
              <div className=" font-bold  h-[50px] text-center">
                <div className=" grid gap-2">
                  <div className="text-md">{currentTime || "-"}</div>
                  {/* <div className="text-2xl">{`อยู่ในระหว่างการรออนุมัติ`}</div> */}
                  <div className="text-2xl">{`Please select menu`}</div>
                </div>
              </div>
              <div className="h-[calc(100vh-310px)] overflow-y-auto grid items-start">
                <div className="grid items-start grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ">
                  {/* {Array.from({ length: 9 }, (_, index) => {
                    return (
                      <div
                        key={index}
                        className={`noisy02 rounded-[20px] p-[10px] w-full aspect-[4/4] grid items-center justify-center text-[#ffffff] hover:bg-[#00adef] duration-300 ease-in-out cursor-pointer`}
                        onClick={() => {
                          goTo();
                        }}
                      >
                        <div className="grid gap-3">
                          <PieChartOutlineOutlinedIcon
                            style={{ fontSize: "96px" }}
                            className={` `}
                          />
                          <div className="text-center font-bold">Demo</div>
                        </div>
                      </div>
                    );
                  })} */}
                  <div
                        className={`noisy02 rounded-[20px] p-[10px] w-full aspect-[4/4] grid items-center justify-center text-[#ffffff] hover:bg-[#00adef] duration-300 ease-in-out cursor-pointer`}
                        onClick={() => {
                          goTo(`dam`);
                        }}
                      >
                        <div className="grid gap-3">
                          <PieChartOutlineOutlinedIcon
                            style={{ fontSize: "96px" }}
                            className={` `}
                          />
                          <div className="text-center font-bold">DAM</div>
                        </div>
                      </div>
                  <div
                        className={`noisy02 rounded-[20px] p-[10px] w-full aspect-[4/4] grid items-center justify-center text-[#ffffff] hover:bg-[#00adef] duration-300 ease-in-out cursor-pointer`}
                        onClick={() => {
                          goTo(`forecasting`);
                        }}
                      >
                        <div className="grid gap-3">
                          <PieChartOutlineOutlinedIcon
                            style={{ fontSize: "96px" }}
                            className={` `}
                          />
                          <div className="text-center font-bold">Forecasting</div>
                        </div>
                      </div>
                  <div
                        className={`noisy02 rounded-[20px] p-[10px] w-full aspect-[4/4] grid items-center justify-center text-[#ffffff] hover:bg-[#00adef] duration-300 ease-in-out cursor-pointer`}
                        onClick={() => {
                          goTo(`booking`);
                        }}
                      >
                        <div className="grid gap-3">
                          <PieChartOutlineOutlinedIcon
                            style={{ fontSize: "96px" }}
                            className={` `}
                          />
                          <div className="text-center font-bold">Booking</div>
                        </div>
                      </div>
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
