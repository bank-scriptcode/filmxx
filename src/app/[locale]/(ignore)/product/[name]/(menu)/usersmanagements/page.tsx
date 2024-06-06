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

function page(props:any) {
  const { params, searchParams } = props
  
  const router = useRouter();
  const pathname = usePathname();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(10);

  const backToProduct = async () => {
    let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${locale || `en`}/product`);
  };

  const infoUser = async (playload:any) => {
    // let locale = await getCookie("NEXT_LOCALE");
    router.push(`${pathname}/${playload}`);
  };

  return (
    <>
      <div className=" p-10 space-y-2">
        <div className="text-[#989898] dark:text-[#d0d0d0] font-bold">{`Users Managements`}</div>

        <div className="relative shadow-md">
          <div
            className={`h-[calc(100vh-360px)] overflow-y-auto block rounded-md`}
          >
            <table className="w-full text-sm text-left rtl:text-right text-[#414141] ">
              <thead className="text-xs text-[#ffffff] bg-[#d0d0d0] dark:bg-[#3f3f3f] sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {"#"}
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {"Avatar"}
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {"Email"}
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {"Name"}
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {"Status"}
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {"Google"}
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {"Facebook"}
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    {"Line"}
                  </th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap sticky right-0 h-fit bg-[#d0d0d0] dark:bg-[#3f3f3f] text-[#ffffff] ">
                    {"Action"}
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {
                  <>
                    <tr className="odd:bg-white even:bg-gray-50 dark:odd:bg-[#b1b1b1] dark:even:bg-[#909090] border-b ">
                      <td className={`px-6 py-3 `}>{`1`}</td>
                      <td className={`px-6 py-3 `}>
                        <img
                          src="/assets/image/ani/1333611.jpeg"
                          className=" h-[30px] w-[30px] rounded-full"
                          alt=""
                        />
                      </td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap `}
                      >{`anya@xmail.com`}</td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap `}
                      >{`anya forger`}</td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap text-[#a59e39]`}
                      >{`waiting for aproved`}</td>
                      <td className={`px-6 py-3 whitespace-nowrap `}>
                        <CheckIcon style={{ color: "#00FFA3" }} />
                      </td>
                      <td className={`px-6 py-3 `}>
                        <CheckIcon style={{ color: "#00FFA3" }} />
                      </td>
                      <td className={`px-6 py-3 `}>
                        <CheckIcon style={{ color: "#00FFA3" }} />
                      </td>
                      <td className={`px-6 py-3  sticky right-0 h-fit  `}>
                        <VisibilityIcon
                          className=" cursor-pointer"
                          style={{ color: "#d0d0d0" }}
                          onClick={()=>{infoUser(1)}}
                        />
                      </td>
                    </tr>
                    <tr className="odd:bg-white even:bg-gray-50 dark:odd:bg-[#b1b1b1] dark:even:bg-[#909090] border-b ">
                      <td className={`px-6 py-3 `}>{`2`}</td>
                      <td className={`px-6 py-3 `}>
                        <img
                          src="/assets/image/ani/1333611.jpeg"
                          className=" h-[30px] w-[30px] rounded-full"
                          alt=""
                        />
                      </td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap `}
                      >{`anya@xmail.com`}</td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap `}
                      >{`anya forger`}</td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap text-[#a59e39]`}
                      >{`waiting for aproved`}</td>
                      <td className={`px-6 py-3 `}>{``}</td>
                      <td className={`px-6 py-3 `}>{``}</td>
                      <td className={`px-6 py-3 `}>
                        <CheckIcon style={{ color: "#00FFA3" }} />
                      </td>
                      <td className={`px-6 py-3  sticky right-0 h-fit  `}>
                        <VisibilityIcon
                          className=" cursor-pointer"
                          style={{ color: "#d0d0d0" }}
                          onClick={()=>{infoUser(2)}}
                        />
                      </td>
                    </tr>
                    <tr className="odd:bg-white even:bg-gray-50 dark:odd:bg-[#b1b1b1] dark:even:bg-[#909090] border-b ">
                      <td className={`px-6 py-3 `}>{`3`}</td>
                      <td className={`px-6 py-3 `}>
                        <img
                          src="/assets/image/ani/1333611.jpeg"
                          className=" h-[30px] w-[30px] rounded-full"
                          alt=""
                        />
                      </td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap `}
                      >{`anya@xmail.com`}</td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap `}
                      >{`anya forger`}</td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap text-[#a59e39]`}
                      >{`waiting for aproved`}</td>
                      <td className={`px-6 py-3 `}>
                        <CheckIcon style={{ color: "#00FFA3" }} />
                      </td>
                      <td className={`px-6 py-3 `}>
                        <CheckIcon style={{ color: "#00FFA3" }} />
                      </td>
                      <td className={`px-6 py-3 `}>{``}</td>
                      <td className={`px-6 py-3  sticky right-0 h-fit  `}>
                        <VisibilityIcon
                          className=" cursor-pointer"
                          style={{ color: "#d0d0d0" }}
                          onClick={()=>{infoUser(3)}}
                        />
                      </td>
                    </tr>
                  </>
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-3 flex items-center justify-between whitespace-nowrap max-sm:flex-col-reverse max-sm:gap-3">
          <div className=" flex items-center gap-3 text-sm max-sm:ml-auto">
            <span className="text-[#989898] dark:text-[#d0d0d0]">{`Show`}</span>
            <select
              className="bg-[#d0d0d0] dark:bg-[#b1b1b1] text-[#ffffff] text-sm rounded-md focus:ring-[#DFE4EA] focus:border-[#DFE4EA] block w-fit"
              value={limit}
              onChange={(e: any) => {
                setLimit(e.target.value);
                setPage(1);
              }}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <Pagination
            count={pagination}
            page={page}
            onChange={(event: any, value: any) => setPage(value)}
            shape="rounded"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#d0d0d0 !important",
                color: "#ffffff !important",
              },
              "& .MuiPaginationItem-root": {
                color: "#989898 !important",
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default page;
