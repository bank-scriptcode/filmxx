"use client";
import { deleteCookie } from "@/components/utils/cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "dayjs/locale/th";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import EditIcon from "@mui/icons-material/Edit";

function Profile() {
  const router = useRouter();
  const [roleUse, setRoleUse] = useState([
    {
      id: 1,
      name: "Shipper",
      color: "#6DADE9",
    },
    {
      id: 2,
      name: "Operator",
      color: "#AAFFD3",
    },
  ]);
  const [flagRole, setFlagRole] = useState(false);
  const [role, setRole] = useState({
    id: 1,
    name: "Shipper",
    color: "#6DADE9",
  });

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

  return (
    <>
      <button
        type="button"
        className="flex text-sm bg-white rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-[#C9E6FB]"
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
          className="w-8 h-8 rounded-full bg-white"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>
      {/* <!-- Dropdown menu --> */}
      {openProfile && (
        <div
          className=" absolute top-12 right-1 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow "
          id="dropdown"
        >
          <div className="py-3 px-4 grid gap-2">
            <div>
              <span className="block text-sm font-semibold text-gray-900 ">
                Neil sims
              </span>
              <span className="block text-sm text-gray-500 truncate ">
                jesy.l@gmail.com
              </span>
            </div>
            {!!role ? (
              <div
                onClick={() => {
                  setFlagRole((pre: any) => !pre);
                }}
                className={` cursor-pointer relative min-w-[20px] w-fit text-white font-bold flex items-center justify-center px-5 rounded-full text-sm`}
                style={{ background: `${role?.color}50`, color: role?.color }}
              >
                {role?.name || "-"}
                {flagRole && (
                  <div className=" absolute top-full bg-white shadow-lg min-w-[100px] z-[999] text-gray-500">
                    {(roleUse || []).length > 0 ? (
                      (roleUse || []).map((item: any, ix: any) => {
                        return (
                          <div
                            key={ix}
                            className=" p-2 hover:bg-slate-100 cursor-pointer"
                            onClick={() => {
                              setRole(item);
                            }}
                          >
                            <span
                              className={`${
                                role?.id !== item?.id && "text-gray-400"
                              }`}
                            >
                              {item?.name || "-"}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div>{`-`}</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="min-w-[20px] w-fit bg-[#EEF6FC] text-[#EEF6FC] font-bold flex items-center justify-center px-5 rounded-full text-sm">
                -
              </div>
            )}
          </div>
          {/* <ul
          className="py-1 text-gray-500 "
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100   "
            >
              My profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 text-sm hover:bg-gray-100   "
            >
              Account settings
            </a>
          </li>
        </ul> */}
          <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
            <li>
              <div className="flex items-center py-2 px-3 text-sm hover:bg-gray-100 gap-2 cursor-pointer">
                <SupervisedUserCircleOutlinedIcon
                  className="text-gray-400"
                  style={{ fontSize: "20px" }}
                />
                {`Switch role`}
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 text-sm hover:bg-gray-100 gap-2 cursor-pointer">
                <Brightness2Icon
                  className="text-gray-400 rotate-180"
                  style={{ fontSize: "20px" }}
                />
                {`Dark mode`}
              </div>
            </li>
            <li>
              <div className="flex items-center py-2 px-3 text-sm hover:bg-gray-100 gap-2 cursor-pointer">
                <EditIcon
                  className="text-gray-400 "
                  style={{ fontSize: "20px" }}
                />
                {`Edit Profile`}
              </div>
            </li>
          </ul>
          <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
            <li
              className=" cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              <span className="block py-2 px-4 text-sm hover:bg-gray-100 text-[#ED1B24] ">
                Sign out
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Profile;
