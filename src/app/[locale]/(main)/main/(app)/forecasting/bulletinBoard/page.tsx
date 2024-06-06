"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import dynamic from "next/dynamic";
// import Select from "react-tailwindcss-select";
import Select from "react-select";
import dayjs from "dayjs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Datepicker from "tailwind-datepicker-react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// @ts-ignore
import { DateRangePicker, DayPickerRangeController } from "react-date-range";
import { addDays, format, isWeekend } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CheckIcon from "@mui/icons-material/Check";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SendIcon from '@mui/icons-material/Send';

// import Select from "react-select";
// const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });

const userType: any = [
  {
    id: 1,
    name: "Adminstrator",
    color: "#EEE4FF",
  },
  {
    id: 2,
    name: "Shipper",
    color: "#C9E6FB",
  },
  {
    id: 3,
    name: "Operator",
    color: "#D4F8D3",
  },
];

const Roles: any = [
  {
    id: 1,
    name: "Super Admin",
  },
  {
    id: 2,
    name: "Booking",
  },
  {
    id: 3,
    name: "PTT Engineering",
  },
  {
    id: 4,
    name: "PTT Intermediate",
  },
  {
    id: 5,
    name: "PTT Operator",
  },
  {
    id: 6,
    name: "PTT Shipper",
  },
  {
    id: 7,
    name: "Publication",
  },
  {
    id: 8,
    name: "Restart User",
  },
];

const bankAccount: any = [
  {
    id: 1,
    name: "ธนาคารกรุงเทพ",
    icon: null,
  },
];

const ZoneId: any = [
  {
    id: 1,
    name: "EAST",
  },
  {
    id: 2,
    name: "WEST",
  },
  {
    id: 3,
    name: "EAST - WEST",
  },
];

const type: any = [
  {
    id: 1,
    name: "Delivery",
    color: "#DFB72B",
  },
  {
    id: 2,
    name: "Entry",
    color: "#2B5DDF",
  },
];

const dataTemp: any = [
  {
    id: 1,
    contractType:{
      id:1,
      name:"Long Term",
      color:"#FFDDCE"
    },
    forecastingCode:"20210426-FOR-0001",
    shipper:"NGP-S16-001(PTT)",
    startDate:"26/03/2024",
    endDate:"26/03/2024",
    shipperFileSubmissionDate:"26/03/2024",
    shipperFile: [],
    // createBy: {
    //   name: "demo ABC",
    //   date: "20/01/2024",
    // },
    // updateBy: {
    //   name: "demo ABC",
    //   date: "20/01/2024",
    // },
  },
];

let mockFix: any = [
  {
    sortEnable: true,
    searchEnable: true,
    keys: "contractType",
    headValue: `Contract Type`,
    bodyClass: ``,
  },
  {
    sortEnable: true,
    searchEnable: true,
    keys: "forecastingCode",
    headValue: `Forecasting Code`,
    bodyClass: `relative`,
  },
  {
    sortEnable: true,
    searchEnable: true,
    keys: "shipper",
    headValue: `Shipper ID`,
    bodyClass: `relative`,
  },
  {
    sortEnable: true,
    searchEnable: true,
    keys: "startDate",
    headValue: `Start Date`,
    bodyClass: `relative`,
  },
  {
    sortEnable: true,
    searchEnable: true,
    keys: "endDate",
    headValue: `End Date`,
    bodyClass: `relative`,
  },
  {
    sortEnable: true,
    searchEnable: true,
    keys: "shipperFileSubmissionDate",
    headValue: `Shipper File Submission Date`,
    bodyClass: `relative`,
  },
  {
    sortEnable: false,
    searchEnable: false,
    keys: "shipperFile",
    headValue: `Shipper File`,
    bodyClass: `relative`,
  },
  // {
  //   sortEnable: true,
  //   searchEnable: true,
  //   keys: "createBy",
  //   headValue: `Create By`,
  //   bodyClass: `relative`,
  // },
  // {
  //   sortEnable: true,
  //   searchEnable: true,
  //   keys: "updateBy",
  //   headValue: `Update By`,
  //   bodyClass: `relative`,
  // },
  // {
  //   sortEnable: false,
  //   searchEnable: false,
  //   keys: "action",
  //   headValue: `Action`,
  //   bodyClass: `relative`,
  // },
];

const roleMenu: any = [
  {
    id: 1,
    mainMenu: "DAM",
    menu: "Business Partner",
    subMenu: "Shippers",
    view: "1",
    create: "0",
    edit: "0",
    import: "2",
    export: "2",
    manage: true,
    indexs: 1,
  },
  {
    id: 2,
    mainMenu: "DAM",
    menu: "Business Partner",
    subMenu: "Operators",
    view: "1",
    create: "1",
    edit: "0",
    import: "2",
    export: "2",
    manage: true,
    indexs: 2,
  },
  {
    id: 3,
    mainMenu: "DAM",
    menu: "Business Partner",
    subMenu: "User",
    view: "1",
    create: "0",
    edit: "0",
    import: "2",
    export: "2",
    manage: false,
    indexs: 3,
  },
  {
    id: 4,
    mainMenu: "DAM",
    menu: "Business Partner",
    subMenu: "Role",
    view: "0",
    create: "0",
    edit: "0",
    import: "2",
    export: "2",
    manage: true,
    indexs: 4,
  },
  {
    id: 5,
    mainMenu: "DAM",
    menu: "Asset",
    subMenu: "Zone",
    view: "0",
    create: "0",
    edit: "0",
    import: "2",
    export: "2",
    manage: true,
    indexs: 5,
  },
  {
    id: 6,
    mainMenu: "DAM",
    menu: "Asset",
    subMenu: "Areas",
    view: "0",
    create: "0",
    edit: "0",
    import: "2",
    export: "2",
    manage: true,
    indexs: 6,
  },
  {
    id: 7,
    mainMenu: "DAM",
    menu: "Asset",
    subMenu: "Nomination Point",
    view: "0",
    create: "0",
    edit: "0",
    import: "2",
    export: "2",
    manage: true,
    indexs: 7,
  },
  {
    id: 8,
    mainMenu: "DAM",
    menu: "Asset",
    subMenu: "Contract Point",
    view: "0",
    create: "0",
    edit: "0",
    import: "2",
    export: "2",
    manage: true,
    indexs: 8,
  },
  {
    id: 9,
    mainMenu: "Demo",
    menu: "Demo1",
    subMenu: "Demo2",
    view: "2",
    create: "2",
    edit: "2",
    import: "2",
    export: "2",
    manage: false,
    indexs: 9,
  },
];

const options = [
  { value: "fox", label: "🦊 Fox" },
  { value: "Butterfly", label: "🦋 Butterfly" },
  { value: "Honeybee", label: "🐝 Honeybee" },
];

const areas = [
  {
    id: 1,
    name: "A1",
    point: [
      {
        id: 1,
        name: "AEX-A-1",
      },
      {
        id: 2,
        name: "APX-A-2",
      },
      {
        id: 3,
        name: "OEX-S",
      },
    ],
  },
  {
    id: 2,
    name: "A2",
    point: [
      {
        id: 4,
        name: "BJX-B-1",
      },
      {
        id: 5,
        name: "ALX-B",
      },
    ],
  },
];

const pointUse = [
  {
    id: 2,
    name: "APX-A-2",
    area: {
      id: 1,
    },
  },
];

const MySelect = ({
  placeholder,
  options,
  seUseType,
  setSeUseType,
  className,
  classNamePrefix,
  styles,
  disabled,
  filterOption,
}: any) => {
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    disabled ? (
      <div className={`${className} border-[#DFE4EA] border-[1px]`}>
        {seUseType}
      </div>
    ) : (
      <>
        {!!filterOption ? (
          <Select
            id={id}
            value={seUseType}
            onChange={(value: any) => {
              setSeUseType(value);
            }}
            options={options}
            placeholder={placeholder}
            className={className}
            classNamePrefix={classNamePrefix}
            styles={styles}
            filterOption={(option, searchText) => {
              if (
                option.data.searchCus
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                return true;
              } else {
                return false;
              }
            }}
          />
        ) : (
          <Select
            id={id}
            value={seUseType}
            onChange={(value: any) => {
              setSeUseType(value);
            }}
            options={options}
            placeholder={placeholder}
            className={className}
            classNamePrefix={classNamePrefix}
            styles={styles}
          />
        )}
      </>
    )
  ) : null;
};

function page() {
  const [configDataRow, setConfigDataRow] = useState(mockFix || []);
  const id = Date.now().toString();
  const [modalFile, setModalFile] = useState(false)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchField, setSearchField] = useState("");
  const [dataStateTemp, setDataStateTemp] = useState<any>([]);
  const [dataStateInit, setDataStateInit] = useState<any>([]);
  const [dataState, setDataState] = useState([]);
  const [openField, setOpenField] = useState(false);
  const [viewFlag, setViewFlag] = useState(false);
  const [historyFlag, setHistoryFlag] = useState(false);
  const [roleMnFlag, setRoleMnFlag] = useState(false);
  const [flagActive, setFlagActive] = useState(0);
  const [permissions, setPermissions] = useState(roleMenu);
  const [seUseType, setSeUseType] = useState(null);
  const [userTypeOption, setUserTypeOption] = useState(options);
  const [startDateSearch, setStartDateSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [showEnd, setShowEnd] = useState(false);
  const [selectedDateEnd, setSelectedDateEnd] = useState<any>("");
  const [groupIdFlag, setGroupIdFlag] = useState(false);
  const [areaFlag, setAreaFlag] = useState(false);
  const [areaState, setAreaState] = useState<any>([]);
  const [arreaNotUse, setArreaNotUse] = useState<any>([]);
  const [arreaNotUseShow, setArreaNotUseShow] = useState<any>([]);
  const [pointData, setPointData] = useState<any>([]);
  const [pointDataShow, setPointDataShow] = useState<any>([]);
  const [arreaNotUseSearch, setArreaNotUseSearch] = useState("");
  const [pointDataSearch, setPointDataSearch] = useState<any>("");
  const [bankData, setBankData] = useState<any>([]);
  const [dataUse, setDataUse] = useState({
    shipperId: "",
  });
  const [dataUseVaridate, setDataUseVaridate] = useState({
    shipperId: false,
  });
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [caseSave, setCaseSave] = useState(false);
  const [flagZone, setFlagZone] = useState(1);

  const getRandomValue = () => {
    const randomStrings = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
    ];
    return randomStrings[Math.floor(Math.random() * randomStrings.length)];
  };

  const modalConf = async () => {
    setConfirmEdit(false);

    // clearField();
    setFlagActive(0);
    setViewFlag(false);
  };

  const getInitData = async () => {
    // let arrMock: any = Array.from({ length: 1000 }, (_, index) => {
    //   return {
    //     id: index + 1,
    //     name1: getRandomValue(),
    //     name2: getRandomValue(),
    //     name3: getRandomValue(),
    //     name4: getRandomValue(),
    //   };
    // });
    // setDataStateTemp(arrMock || []);
    // setDataStateInit(arrMock || []);
    let addFlagActive = dataTemp.map((e: any) => {
      return { ...e, active: false };
    });
    setDataStateTemp(addFlagActive || []);
    setDataStateInit(addFlagActive || []);
  };

  const onActive = async (payload: any) => {
    console.log("payload : ", payload);
    setDataStateInit((pre: any) => {
      let newPre = pre?.map((item: any) => {
        let active = false;
        if (item?.id === payload?.id) {
          active = !item?.active;
        } else {
          active = false;
        }

        return { ...item, active: active };
      });
      return newPre;
    });
  };

  const onActiveCloseAll = async () => {
    setDataStateInit((pre: any) => {
      let newPre = pre?.map((item: any) => {
        return { ...item, active: false };
      });
      return newPre;
    });
  };

  const handleSort = (column: any) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) =>
        prevOrder === "asc" ? "desc" : prevOrder === "desc" ? "" : ""
      );
      if (sortOrder === "desc") {
        setSortBy(null);
        // getInitData()
        setDataStateInit(dataStateTemp || []);
      }
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const hasAgeKey = (obj: any, key: any) => {
    return obj.hasOwnProperty(key);
  };

  const splitPoint = () => {
    let getData: any = [];
    areaState.forEach((element: any) => {
      element?.active &&
        element?.point.forEach((elementS: any) => {
          let filId = pointData?.find((f: any) => {
            return f?.id === elementS?.id;
          });
          if (!!!filId) {
            let active = !!elementS?.active ? elementS?.active : false;
            getData.push({
              ...elementS,
              area: { id: element?.id },
              active: active,
            });
          }
          return elementS;
        });
      return element;
    });
    setArreaNotUse(getData || []);

    let filter = getData.filter((f: any) => {
      return ((f?.name && String(f?.name)) || "")
        .toLowerCase()
        .includes(arreaNotUseSearch.toLowerCase());
    });
    setArreaNotUseShow(filter || []);
  };

  const getPointArea = () => {
    let newData: any = pointUse.map((e: any) => {
      return { ...e, active: false };
    });
    setPointData(newData || []);
    setPointDataShow(newData || []);
  };

  const useActiveNotPoint = (payload: any) => {
    console.log("payload : ", payload);

    console.log("arreaNotUse : ", arreaNotUse);
    // let newPre = arreaNotUse.map((e:any) => {
    //   let active = false
    //   if(e?.id === payload?.id){
    //     active = !e?.active
    //   }else{
    //     active = e?.active
    //   }

    //   return {...e, active: active}
    // })
    setArreaNotUse((pre: any) => {
      let newPre = pre.map((e: any) => {
        let active = false;
        if (e?.id === payload?.id) {
          active = !e?.active;
        } else {
          active = e?.active;
        }

        return { ...e, active: active };
      });

      return newPre;
    });

    setArreaNotUseShow((pre: any) => {
      let newPre = pre.map((e: any) => {
        let active = false;
        if (e?.id === payload?.id) {
          active = !e?.active;
        } else {
          active = e?.active;
        }

        return { ...e, active: active };
      });

      return newPre;
    });
    // setArreaNotUse(newPre)
    // setArreaNotUseShow(newPre)

    //
  };

  const moveToPoint = () => {
    let newData = pointData?.filter((f: any) => {
      return !f?.active;
    });
    setPointData(newData);
    let filter = newData.filter((f: any) => {
      return ((f?.name && String(f?.name)) || "")
        .toLowerCase()
        .includes(pointDataSearch.toLowerCase());
    });
    setPointDataShow(filter);
  };

  const moveToGroup = () => {
    let fil = arreaNotUse?.filter((f: any) => {
      return !!f?.active;
    });
    setPointData((pre: any) => [...pre, ...fil]);
    setPointDataShow((pre: any) => [...pre, ...fil]);
  };

  const useAreaProcess = () => {
    let newData: any = areas.map((e: any) => {
      return { ...e, active: true };
    });

    setAreaState(newData);
  };

  const getBankingApi = async () => {
    try {
      const response = await fetch("/json/banking.json");
      if (!response.ok) {
        throw new Error("Failed to fetch banking data");
      }
      const data = await response.json();
      console.log(data);
      setBankData(data || []);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const saveData = async () => {
    if (!!!dataUse?.shipperId) {
      //
      setDataUseVaridate((pre: any) => ({
        ...pre,
        shipperId: true,
      }));
    } else {
      setDataUseVaridate((pre: any) => ({
        ...pre,
        shipperId: false,
      }));

      setFlagActive(0);
      setViewFlag(false);
    }
  };

  const UiHeadTable = ({ sortEnable, keys, value, data }: any) => {
    return (
      <>
        {!!sortEnable && !!data ? (
          data
            .map((e: any) => hasAgeKey(e, keys))
            .find((f: any) => {
              return f === true;
            }) && (
            <th
              scope="col"
              className={`${
                !!data
                  .map((e: any) => hasAgeKey(e, keys))
                  .find((f: any) => {
                    return f === true;
                  }) && "px-6 py-3"
              } whitespace-nowrap`}
            >
              {value}
              {sortBy === keys ? (
                sortOrder === "asc" ? (
                  <NorthIcon
                    className=" cursor-pointer"
                    onClick={() => handleSort(keys)}
                  />
                ) : (
                  <SouthIcon
                    className=" cursor-pointer"
                    onClick={() => handleSort(keys)}
                  />
                )
              ) : (
                <ImportExportIcon
                  className=" cursor-pointer"
                  onClick={() => handleSort(keys)}
                />
              )}
            </th>
          )
        ) : (
          <th scope="col" className="px-6 py-3 whitespace-nowrap">
            {value}
          </th>
        )}
      </>
    );
  };

  const UiBodyTable = ({ sortEnable, keys, className, value, data }: any) => {
    return (
      <>
        {!!sortEnable && !!data ? (
          data
            .map((e: any) => hasAgeKey(e, keys))
            .find((f: any) => {
              return f === true;
            }) && <td className={className}>{value}</td>
        ) : (
          <td className={className}>{value}</td>
        )}
      </>
    );
  };

  const UiSearch = () => {
    return (
      <>
        <div>
          <div className="text-sm mb-2">Forecasting Code</div>
          <div className="relative">
            <SearchIcon className=" text-[#DFE4EA] absolute top-[8px] right-[8px]" />
            <input
              type="text"
              id="table-searchs"
              className={`text-sm block p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
              placeholder="Search Forecasting Code"
            />
          </div>
        </div>
        <div>
          <div className="text-sm mb-2">Shipper ID</div>
          <MySelect
            placeholder={
              <div className=" text-sm text-[#cacaca] ">{`Select Shipper ID`}</div>
            }
            // options={userTypeOption}
            options={(bankData || [])?.map((e: any) => {
              return {
                value: e?.id,
                searchCus: e?.nameTh,
                label: (
                  <div className=" flex items-center gap-2 text-sm">
                    <img src={e?.logo} className="w-[20px] h-[20px]" alt="" />
                    {`${e?.nameTh}`}
                  </div>
                ),
              };
            })}
            seUseType={seUseType}
            setSeUseType={setSeUseType}
            className={`w-[209px] h-[38px] text-sm border-[#DFE4EA]rounded-lg !focus:border-[#cacaca] z-[99]`}
            classNamePrefix="rounded-lg  "
            styles={{
              control: (base: any, state: any) => ({
                ...base,
                boxShadow: "none",
                "&:hover": {
                  border: "1px solid #43464a !important",
                },
                border: "1px solid #DFE4EA !important",
              }),
            }}
            disabled={(flagActive === 2 && true) || false}
            filterOption={true}
          />
        </div>
        <div>
          <div className="text-sm mb-2">Contract Type</div>
          <MySelect
            placeholder={
              <div className=" text-sm text-[#cacaca] ">{`Select Contract Type`}</div>
            }
            // options={userTypeOption}
            options={(bankData || [])?.map((e: any) => {
              return {
                value: e?.id,
                searchCus: e?.nameTh,
                label: (
                  <div className=" flex items-center gap-2 text-sm">
                    <img src={e?.logo} className="w-[20px] h-[20px]" alt="" />
                    {`${e?.nameTh}`}
                  </div>
                ),
              };
            })}
            seUseType={seUseType}
            setSeUseType={setSeUseType}
            className={`w-[209px] h-[38px] text-sm border-[#DFE4EA]rounded-lg !focus:border-[#cacaca] z-[99]`}
            classNamePrefix="rounded-lg  "
            styles={{
              control: (base: any, state: any) => ({
                ...base,
                boxShadow: "none",
                "&:hover": {
                  border: "1px solid #43464a !important",
                },
                border: "1px solid #DFE4EA !important",
              }),
            }}
            disabled={(flagActive === 2 && true) || false}
            filterOption={true}
          />
        </div>
        <div className="mt-auto">
          <DateRang />
        </div>
        <div className="rounded-lg bg-[#00ADEF] text-[#ffffff] grid items-center justify-center w-[38px] h-[38px] mt-auto cursor-pointer">
          <SearchIcon />
        </div>
        <div className="rounded-lg bg-[#ffffff] text-[#00ADEF] border-[1px] border-[#00ADEF] grid items-center justify-center w-[38px] h-[38px] mt-auto cursor-pointer">
          <RefreshIcon className="" />
        </div>
      </>
    );
  };

  useEffect(() => {
    let filter = arreaNotUse.filter((f: any) => {
      return ((f?.name && String(f?.name)) || "")
        .toLowerCase()
        .includes(arreaNotUseSearch.toLowerCase());
    });
    setArreaNotUseShow(filter);
  }, [arreaNotUseSearch]);

  useEffect(() => {
    let filter = pointData.filter((f: any) => {
      return ((f?.name && String(f?.name)) || "")
        .toLowerCase()
        .includes(pointDataSearch.toLowerCase());
    });
    setPointDataShow(filter);
  }, [pointDataSearch]);

  useEffect(() => {
    useAreaProcess();
    getPointArea();
    getBankingApi();
  }, []);

  useEffect(() => {
    console.log(areaState);
    splitPoint();
  }, [areaState]);

  useEffect(() => {
    splitPoint();
  }, [pointData]);

  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + parseInt(String(limit), 10);
    setPagination(Math.ceil(dataStateInit.length / limit));
    setDataState(dataStateInit.slice(start, end) || []);
  }, [limit, dataStateInit, page]);

  useEffect(() => {
    const sortedData = [...dataStateInit].sort((a: any, b: any) => {
      let fil = configDataRow.find((f: any) => {
        return f?.keys === sortBy;
      });

      if (!!fil) {
        return sortOrder === "asc"
          ? ((!!a?.[fil?.keys] && String(a?.[fil?.keys])) || "").localeCompare(
              (!!b?.[fil?.keys] && String(b?.[fil?.keys])) || ""
            )
          : ((!!b?.[fil?.keys] && String(b?.[fil?.keys])) || "").localeCompare(
              (!!a?.[fil?.keys] && String(a?.[fil?.keys])) || ""
            );
      }

      return 0;
    });
    setDataStateInit(sortedData);
  }, [sortBy, sortOrder, configDataRow]);
  
  useEffect(() => {
    let filter = dataStateTemp.filter((f: any) => {
      return (
        ((f?.documentName && String(f?.documentName)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.contractType?.name && String(f?.contractType?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.createBy?.name && String(f?.createBy?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.createBy?.date && String(f?.createBy?.date)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.updateBy?.name && String(f?.updateBy?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.updateBy?.date && String(f?.updateBy?.date)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase())
      );
    });
    setDataStateInit(filter);
  }, [searchField]);

  useEffect(() => {
    console.log(dataState);
  }, [dataState]);

  useEffect(() => {
    console.log(dataStateInit);
  }, [dataStateInit]);

  useEffect(() => {
    getInitData();
    return () => {};
  }, []);
 
  return (
    <>
      <div className="p-2 space-y-2">
       <div className=" grid grid-cols-3 gap-3 my-10 mx-10">
          <div className="p-3 border-[2px] border-[#DFE4EA] rounded-[10px] shadow-sm space-y-3">
            <div>
              <div className=" text-[#00ADEF] font-bold">{`Contract Type`}</div>
              <div className=" text-sm text-[#58585A] font-bold">{`Long Term - Firm`}</div>
            </div>
            <div className=" grid grid-cols-2">
              <div className=" grid items-center justify-center">
                <img src="/assets/image/online collaboration N_05 1.png" alt="" />
              </div>
              <div className=" space-y-2">
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`End Of Submission`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`31/01/2024`}</div>
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`Announcement`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`15/03/2024`}</div>
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`Start Contract Form`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`01/06/2024 - 01/06/2025`}</div>
                <button className=" text-white bg-[#36B1AB] rounded-[10px] flex gap-3 items-center justify-center w-full py-2">
                  <div className="flex gap-3 items-center">
                    <span>{`Download`}</span>
                    <DownloadIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className=" flex gap-3">
              <div className=" cursor-pointer w-full flex items-center border-[1px] border-[#DFE4EA] rounded-md">
                <div className=" bg-[#00ADEF] h-full flex items-center justify-center px-2 text-white rounded-l-md">{`Choose File`}</div>
                <div className="h-full flex items-center px-2 text-[#9CA3AF] rounded-r-md">{`No File chosen`}</div>
              </div>
              <button className=" cursor-pointer text-white bg-[#9CA3AF] rounded-[10px] flex gap-3 items-center justify-center w-fit px-3 py-2">
                  <div className="flex gap-3 items-center">
                    <span>{`Send`}</span>
                    <SendIcon />
                  </div>
                </button>
            </div>
          </div>
          <div className="p-3 border-[2px] border-[#DFE4EA] rounded-[10px] shadow-sm space-y-3">
            <div>
              <div className=" text-[#00ADEF] font-bold">{`Contract Type`}</div>
              <div className=" text-sm text-[#58585A] font-bold">{`Medium Term - Firm`}</div>
            </div>
            <div className=" grid grid-cols-2">
              <div className=" grid items-center justify-center">
                <img src="/assets/image/online collaboration N_05 1.png" alt="" />
              </div>
              <div className=" space-y-2">
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`End Of Submission`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`31/01/2024`}</div>
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`Announcement`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`15/03/2024`}</div>
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`Start Contract Form`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`01/06/2024 - 01/06/2025`}</div>
                <button className=" text-white bg-[#36B1AB] rounded-[10px] flex gap-3 items-center justify-center w-full py-2">
                  <div className="flex gap-3 items-center">
                    <span>{`Download`}</span>
                    <DownloadIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className=" flex gap-3">
              <div className=" cursor-pointer w-full flex items-center border-[1px] border-[#DFE4EA] rounded-md">
                <div className=" bg-[#00ADEF] h-full flex items-center justify-center px-2 text-white rounded-l-md">{`Choose File`}</div>
                <div className="h-full flex items-center px-2 text-[#9CA3AF] rounded-r-md">{`No File chosen`}</div>
              </div>
              <button className=" cursor-pointer text-white bg-[#9CA3AF] rounded-[10px] flex gap-3 items-center justify-center w-fit px-3 py-2">
                  <div className="flex gap-3 items-center">
                    <span>{`Send`}</span>
                    <SendIcon />
                  </div>
                </button>
            </div>
          </div>
          <div className="p-3 border-[2px] border-[#DFE4EA] rounded-[10px] shadow-sm space-y-3">
            <div>
              <div className=" text-[#00ADEF] font-bold">{`Contract Type`}</div>
              <div className=" text-sm text-[#58585A] font-bold">{`Short Term - Firm`}</div>
            </div>
            <div className=" grid grid-cols-2">
              <div className=" grid items-center justify-center">
                <img src="/assets/image/online collaboration N_05 1.png" alt="" />
              </div>
              <div className=" space-y-2">
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`End Of Submission`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`31/01/2024`}</div>
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`Announcement`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`15/03/2024`}</div>
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`Start Contract Form`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`01/06/2024 - 01/06/2025`}</div>
                <button className=" text-white bg-[#36B1AB] rounded-[10px] flex gap-3 items-center justify-center w-full py-2">
                  <div className="flex gap-3 items-center">
                    <span>{`Download`}</span>
                    <DownloadIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className=" flex gap-3">
              <div className=" cursor-pointer w-full flex items-center border-[1px] border-[#DFE4EA] rounded-md">
                <div className=" bg-[#00ADEF] h-full flex items-center justify-center px-2 text-white rounded-l-md">{`Choose File`}</div>
                <div className="h-full flex items-center px-2 text-[#9CA3AF] rounded-r-md">{`No File chosen`}</div>
              </div>
              <button className=" cursor-pointer text-white bg-[#9CA3AF] rounded-[10px] flex gap-3 items-center justify-center w-fit px-3 py-2">
                  <div className="flex gap-3 items-center">
                    <span>{`Send`}</span>
                    <SendIcon />
                  </div>
                </button>
            </div>
          </div>
          <div className="p-3 border-[2px] border-[#DFE4EA] rounded-[10px] shadow-sm space-y-3">
            <div>
              <div className=" text-[#00ADEF] font-bold">{`Contract Type`}</div>
              <div className=" text-sm text-[#58585A] font-bold">{`Short Term - Firm`}</div>
            </div>
            <div className=" grid grid-cols-2">
              <div className=" grid items-center justify-center">
                <img src="/assets/image/online collaboration N_05 1.png" alt="" />
              </div>
              <div className=" space-y-2">
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`End Of Submission`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`31/01/2024`}</div>
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`Announcement`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`15/03/2024`}</div>
                <div className=" text-[#00ADEF] whitespace-nowrap font-bold">{`Start Contract Form`}</div>
                <div className=" text-[#464255] whitespace-nowrap text-sm">{`01/06/2024 - 01/06/2025`}</div>
                <button className=" text-white bg-[#36B1AB] rounded-[10px] flex gap-3 items-center justify-center w-full py-2">
                  <div className="flex gap-3 items-center">
                    <span>{`Download`}</span>
                    <DownloadIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className=" flex gap-3">
              <div className=" cursor-pointer w-full flex items-center border-[1px] border-[#DFE4EA] rounded-md">
                <div className=" bg-[#00ADEF] h-full flex items-center justify-center px-2 text-white rounded-l-md">{`Choose File`}</div>
                <div className="h-full flex items-center px-2 text-[#9CA3AF] rounded-r-md">{`No File chosen`}</div>
              </div>
              <button className=" cursor-pointer text-white bg-[#9CA3AF] rounded-[10px] flex gap-3 items-center justify-center w-fit px-3 py-2">
                  <div className="flex gap-3 items-center">
                    <span>{`Send`}</span>
                    <SendIcon />
                  </div>
                </button>
            </div>
          </div>
       </div>
      </div>

    </>
  );
}

export default page;

let eventTemp: any = null;

function DateRang() {
  const [rendersFlag, setRendersFlag] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [focusTab, setFocusTab] = useState<any>(null);
  const [state, setState] = useState({
    selection1: {
      // startDate: addDays(new Date(), -6),
      startDate: new Date(),
      endDate: new Date(),
      key: "selection1",
    },
  });
  const [eventDate, setEventDate] = useState([
    {
      id: 1,
      date: "2024-03-12",
      message: "วันพ่อแห่งชาติ",
    },
    {
      id: 2,
      date: "2024-02-20",
      message: "วันแม่แห่งชาติ",
    },
    {
      id: 3,
      date: "2024-02-22",
      message: "วันตาแห่งชาติ",
    },
  ]);

  const [countDay, setCountDay] = useState(0);
  const [messageEvent, setMessageEvent] = useState("");

  // function handleMouseEnter(day: any) {
  //   let fil:any = (eventDate || []).find((f: any) => {
  //     return f?.date === dayjs(day).format("YYYY-MM-DD");
  //   });
  //   eventTemp = !!fil ? fil?.message : null
  //   // if (!!fil) {
  //   //   setMessageEvent(fil?.message);
  //   // } else {
  //   //   setMessageEvent("");
  //   // }
  // }
  // console.log('eventTemp : ', eventTemp);

  function handleMouseEnter(day: any) {
    let fil: any = (eventDate || []).find((f: any) => {
      return f?.date === dayjs(day).format("YYYY-MM-DD");
    });

    if (!!fil) {
      setMessageEvent(fil?.message);
    } else {
      setMessageEvent("");
    }
  }
  function handleMouseLeave(day: any) {}
  function customDayContent(day: any) {
    return (
      <div
        // onMouseEnter={() => handleMouseEnter(day)}
        // onMouseLeave={() => handleMouseLeave(day)}
        className=" relative group w-[100%]"
      >
        {(eventDate || []).map((e: any, i: number) => {
          return (
            (dayjs(day).format("YYYY-MM-DD") === e?.date && (
              <div
                key={i}
                style={{
                  height: "5px",
                  width: "5px",
                  borderRadius: "100%",
                  background: "orange",
                  position: "absolute",
                  top: 2,
                  right: 2,
                }}
                className=" cursor-pointer absolute"
              />
            )) ||
            null
          );
        })}
        <span className=" ">
          {format(day, "d")}
          {/* <div className=" absolute bg-[#ffffff] shadow-md p-2 whitespace-nowrap rounded-sm z-[999]">{messageEvent}</div> */}
        </span>
        <div
          className={`hidden group-hover:block absolute bottom-full bg-slate-500 shadow-md z-[999] text-white rounded-sm whitespace-nowrap`}
        >
          {!!(eventDate || []).find((f: any) => {
            return f?.date === dayjs(day).format("YYYY-MM-DD");
          }) ? (
            <div className=" px-2 py-1">
              {
                (eventDate || []).find((f: any) => {
                  return f?.date === dayjs(day).format("YYYY-MM-DD");
                })?.message
              }
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  // function handleMouseEnter(day: any) {
  //   let fil = (eventDate || []).find((f: any) => {
  //     return f?.date === dayjs(day).format("YYYY-MM-DD");
  //   });
  //   console.log(fil);
  //   if (!!fil) {
  //     setMessageEvent(fil?.message);
  //   } else {
  //     setMessageEvent("");
  //   }
  // }

  // function handleMouseLeave(day: any) {}

  const [focusedInput, setFocusedInput] = useState(null);

  const handleFocusChange = (focusedInput: any) => {
    console.log("focusedInput : ", focusedInput);
    setFocusTab(focusedInput);
  };

  useEffect(() => {
    let daystart = dayjs(state?.selection1?.startDate).format("YYYY-MM-DD");
    let dayend = dayjs(state?.selection1?.endDate).format("YYYY-MM-DD");
    console.log(daystart);
    console.log(dayend);
    let startDate = dayjs(daystart);
    let endDate = dayjs(dayend);

    let daysAway = endDate.diff(startDate, "day");
    setCountDay(daysAway || 0);

    console.log("Number of days away:", daysAway);
  }, [state]);

  useEffect(() => {
    if (!collapsed) {
      setFocusTab(null);
    }
  }, [collapsed]);

  return (
    <div className=" w-fit min-w-[350px] relative">
      <div className=" text-sm mb-2 grid grid-cols-2">
        <div>Start Date</div>
        <div>End Date</div>
      </div>
      <div className="grid grid-cols-2 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] text-gray-400 text-sm">
        <div
          className="bg-[#ffffff] px-2 py-1 flex justify-between items-center cursor-pointer gap-2 rounded-lg"
          onClick={() => {
            focusTab === 0 ? setCollapsed(false) : setCollapsed(true);
            setFocusTab(0);
          }}
        >
          <div>
            <div>
              {dayjs(state?.selection1?.startDate).format("DD MMM YYYY")}
            </div>
            {/* <div className=" text-gray-400 text-sm">
                {dayjs(state?.selection1?.startDate).format("dddd")}
              </div> */}
          </div>
          <CalendarTodayIcon
            style={{ fontSize: "20px" }}
            className="text-[#DFE4EA]"
          />
        </div>
        <div
          className="bg-[#ffffff] px-2 py-1 flex justify-between items-center cursor-pointer gap-2 border-l-[1px] rounded-tr-lg rounded-br-lg"
          onClick={() => {
            focusTab === 1 ? setCollapsed(false) : setCollapsed(true);
            setFocusTab(1);
          }}
        >
          <div>
            <div>{dayjs(state?.selection1?.endDate).format("DD MMM YYYY")}</div>
            {/* <div className=" text-gray-400 text-sm">
                {dayjs(state?.selection1?.endDate).format("dddd")}
              </div> */}
          </div>
          <CalendarTodayIcon
            style={{ fontSize: "20px" }}
            className="text-[#DFE4EA]"
          />
        </div>
      </div>
      {collapsed && (
        <div className=" absolute z-[50] shadow-md">
          <div className="grid grid-cols-2">
            <div>
              {focusTab === 0 && (
                <div
                  className="ml-2 w-0 h-0 
            border-l-[10px] border-l-transparent
            border-b-[15px] border-b-[#DFE4EA]
            border-r-[10px] border-r-transparent"
                ></div>
              )}
            </div>
            <div>
              {focusTab === 1 && (
                <div
                  className="ml-[-150px] w-0 h-0
            border-l-[10px] border-l-transparent
            border-b-[15px] border-b-[#DFE4EA]
            border-r-[10px] border-r-transparent"
                ></div>
              )}
            </div>
          </div>
          <div className=" bg-[#ffffff] rounded-md p-2">
            <DateRangePicker
              focusedRange={[0, focusTab]}
              editableDateInputs={false}
              onChange={(item: any) => {
                focusTab === 1 ? setFocusTab(0) : setFocusTab(1);
                return setState({ ...state, ...item });
              }}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={[state.selection1]}
              direction="horizontal"
              dayContentRenderer={customDayContent}
              ariaLabels={{
                dateInput: {
                  selection1: {
                    startDate: "start date input of selction 1",
                    endDate: "end date input of selction 1",
                  },
                },
                monthPicker: "month picker",
                yearPicker: "year picker",
                prevButton: "previous month button",
                nextButton: "next month button",
              }}
            />
            <div className=" flex justify-between items-end text-sm">
              <div>
                <div className=" text-blue-500">{`จำนวน : ${
                  countDay + 1 || 1
                } วัน`}</div>
                {/* <div className=" text-red-500">{`วันสำคัญ : ${
                  messageEvent || "-"
                }`}</div>
                <div className=" ">{rendersFlag}</div> */}
              </div>
              <div>
                <button
                  className=" border-[1px] rounded-md px-3 py-1 text-[12px] flex items-center gap-1"
                  onClick={() => {
                    setCollapsed(false);
                  }}
                >
                  <CloseIcon style={{ fontSize: "12px" }} />
                  <span>ปิด</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
