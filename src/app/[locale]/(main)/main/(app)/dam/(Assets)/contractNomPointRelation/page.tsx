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
    shipperId: {
      id: 1,
      name: "Gas quality related concepts",
    },
    contractId: {
      id: 1,
      name: "Gas quality related concepts",
    },
    contractDateFrom: "20/03/2024",
    contractDateTo: "13/04/2024",
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
    keys: "shipperId",
    headValue: `Shipper ID`,
    bodyClass: ``,
  },
  {
    sortEnable: true,
    searchEnable: true,
    keys: "contractId",
    headValue: `Contract ID`,
    bodyClass: ``,
  },
  {
    sortEnable: true,
    searchEnable: true,
    keys: "contractDateFrom",
    headValue: `Contract Date From`,
    bodyClass: ``,
  },
  {
    sortEnable: true,
    searchEnable: true,
    keys: "contractDateTo",
    headValue: `Contract Date To`,
    bodyClass: `text-[#ED1B24]`,
  },
  {
    sortEnable: false,
    searchEnable: false,
    keys: "nominationPoint",
    headValue: `Nomination Point`,
    bodyClass: `relative`,
  },
  {
    sortEnable: false,
    searchEnable: false,
    keys: "meteredPointId",
    headValue: `Metered Point ID`,
    bodyClass: `relative`,
  },
  {
    sortEnable: false,
    searchEnable: false,
    keys: "action",
    headValue: `Action`,
    bodyClass: `relative`,
  },
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
          <div className="text-sm mb-2">Shipper ID</div>
          <MySelect
            placeholder={
              <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select Shipper ID`}</div>
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
          <div className="text-sm mb-2">Contract ID</div>
          <MySelect
            placeholder={
              <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select Contract ID`}</div>
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
  // minPressure
  
  useEffect(() => {
    let filter = dataStateTemp.filter((f: any) => {
      return (
        ((f?.shipperId?.name && String(f?.shipperId?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.contractId?.name && String(f?.contractId?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.contractDateFrom && String(f?.contractDateFrom)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.contractDateTo && String(f?.contractDateTo)) || "")
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
        <div className=" p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm flex items-center gap-2">
          <UiSearch />

          <div
            onClick={() => {
              setFlagActive(1);
              setViewFlag(true);
            }}
            className="rounded-lg bg-[#00ADEF] text-[#ffffff] w-[150px] flex gap-2 items-center justify-center h-[38px] mt-auto ml-auto text-sm cursor-pointer"
          >
            <span>{`New`}</span>
            <AddCircleIcon
              className=" text-[#ffffff]"
              style={{ fontSize: "18px" }}
            />
          </div>
        </div>
        <div className=" p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm">
          <div>
            <div className=" text-sm flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between mb-2">
              {openField && (
                <div
                  className="fixed bg-[#55555526] inset-0 z-[1999] cursor-pointer"
                  onClick={() => {
                    setOpenField(false);
                  }}
                ></div>
              )}
              <div
                className=" border-[1px] border-[#DFE4EA] rounded-md cursor-pointer relative"
                onClick={() => {
                  setOpenField(true);
                }}
              >
                <TuneIcon className=" text-[#00ADEF]" />
                {openField && (
                  <>
                    <div className="bg-[#ffffff] text-[#58585A] absolute z-[2000] rounded-md p-2 left-[30px] top-0 min-w-[100px] min-h-[20px] max-h-[80vh] overflow-y-auto cursor-default shadow-lg">
                      {configDataRow.map((items: any, ix: any) => {
                        return (
                          <div key={ix} className="grid">
                            {items?.sortEnable && (
                              <div className="flex items-center gap-2">
                                {!!dataState
                                  .map((e: any) => hasAgeKey(e, items?.keys))
                                  .find((f: any) => {
                                    return f === true;
                                  }) ? (
                                  <CheckBoxIcon
                                    className=" cursor-pointer text-[#1473A1]"
                                    onClick={() => {
                                      setDataState((pre: any) => {
                                        let newArr = pre.map((obj: any) => {
                                          let newObj = { ...obj };
                                          delete newObj?.[items?.keys];
                                          return newObj;
                                        });
                                        return newArr;
                                      });
                                    }}
                                  />
                                ) : (
                                  <CheckBoxOutlineBlankIcon
                                    className=" cursor-pointer text-[#1473A1]"
                                    onClick={() => {
                                      setDataState((pre: any) => {
                                        let newArr = pre.map((obj: any) => {
                                          let fil: any = dataStateInit.find(
                                            (f: any) => {
                                              return f?.id === obj?.id;
                                            }
                                          );
                                          let newObj: any = { ...obj };
                                          return {
                                            ...newObj,
                                            [items?.keys]:
                                              fil[`${items?.keys}`],
                                          };
                                        });
                                        return newArr;
                                      });
                                    }}
                                  />
                                )}
                                <div className=" whitespace-nowrap">
                                  {items?.headValue}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <div className=" flex items-center gap-2">
                <div className="relative">
                  <SearchIcon className=" text-[#58585A] absolute cursor-pointer top-[8px] right-[8px]" />
                  <input
                    type="text"
                    id="table-search"
                    className={`block w-80 p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                    placeholder="Search"
                    value={searchField}
                    onChange={(e: any) => {
                      setSearchField(e.target.value);
                    }}
                  />
                </div>
                <div className="rounded-lg bg-[#24AB6A] text-[#ffffff] w-[150px] flex gap-2 items-center justify-center h-[38px] text-sm cursor-pointer">
                  <span>{`Excel`}</span>
                  <DescriptionIcon
                    className=" text-[#ffffff]"
                    style={{ fontSize: "18px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative shadow-md">
            <div
              className={`h-[calc(100vh-360px)] overflow-y-auto block rounded-md`}
            >
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-[#58585A] uppercase bg-[#E5E5E5] sticky top-0 z-10">
                  <tr>
                    {configDataRow.map((item: any, ix: any) => {
                      return (
                        <UiHeadTable
                          key={ix}
                          sortEnable={item?.sortEnable}
                          keys={item?.keys}
                          value={item?.headValue}
                          data={dataState}
                        />
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="">
                  {
                    <>
                      {(dataState || []).map((item: any, ix: any) => {
                        return (
                          <tr
                            key={ix}
                            className="odd:bg-white even:bg-gray-50 border-b "
                          >
                            {configDataRow.map((el: any, il: any) => {
                              let valueShow: any = null;

                              switch (el?.keys) {
                                case "shipperId":
                                  valueShow = item?.[el?.keys]?.["name"] || "-";
                                  break;

                                case "contractId":
                                  valueShow = item?.[el?.keys]?.["name"] || "-";
                                  break;

                                case "nominationPoint":
                                  valueShow = (
                                    <>
                                      <div className=" border-[1px] border-[#00ADEF] rounded-md cursor-pointer grid items-center justify-center p-[2px] w-fit" onClick={() => {}}>
                                        <SettingsIcon className="  text-[#00ADEF]" />
                                      </div>
                                    </>
                                  );
                                  break;

                                case "meteredPointId":
                                  valueShow = (
                                    <>
                                      <div className=" border-[1px] border-[#00ADEF] rounded-md cursor-pointer grid items-center justify-center p-[2px] w-fit" onClick={() => {}}>
                                        <SettingsIcon className="  text-[#00ADEF]" />
                                      </div>
                                    </>
                                  );
                                  break;

                                case "action":
                                  valueShow = (
                                    <>
                                      <MoreHorizOutlinedIcon
                                        onClick={() => {
                                          onActive(item);
                                        }}
                                        className=" cursor-pointer"
                                      />
                                      {item?.active && (
                                        <div className=" absolute top-0 right-full shadow-md bg-white ">
                                          <div
                                            onClick={() => {
                                              setFlagActive(2);
                                              onActiveCloseAll();
                                              setViewFlag(true);
                                            }}
                                            className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3  "
                                          >
                                            <RemoveRedEyeIcon />
                                            <div className=" whitespace-nowrap">{`View`}</div>
                                          </div>
                                          <div
                                            onClick={() => {
                                              setFlagActive(3);
                                              onActiveCloseAll();
                                              setViewFlag(true);
                                            }}
                                            className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3"
                                          >
                                            <EditIcon />
                                            <div className=" whitespace-nowrap">{`Edit`}</div>
                                          </div>
                                          <div
                                            onClick={() => {
                                              onActiveCloseAll();
                                              setHistoryFlag(true);
                                            }}
                                            className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3"
                                          >
                                            <HistoryIcon />
                                            <div className=" whitespace-nowrap">{`History`}</div>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  );
                                  break;

                                default:
                                  valueShow = item?.[el?.keys] || "-";
                                  break;
                              }

                              return (
                                <UiBodyTable
                                  key={il}
                                  sortEnable={el?.sortEnable}
                                  keys={el?.keys}
                                  className={`${!!el?.keys && "px-6 py-4"} ${
                                    el?.bodyClass
                                  }`}
                                  value={valueShow}
                                  data={dataState}
                                />
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between whitespace-nowrap">
            <div className=" flex items-center gap-3 text-sm">
              {/* {`Page ${page} of ${dataState.length}`} */}
              {`Show`}
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#DFE4EA] focus:border-[#DFE4EA] block w-full p-1"
                value={limit}
                onChange={(e: any) => {
                  setLimit(e.target.value);
                  setPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                {(dataStateInit || []).length > 0 && (
                  <option value={`${(dataStateInit || []).length}`}>{`${
                    (dataStateInit || []).length
                  }`}</option>
                )}
              </select>
            </div>
            <Pagination
              count={pagination}
              page={page}
              onChange={handleChange}
              //   variant="outlined"
              //   color="primary"
              // variant="outlined"
              shape="rounded"
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#1473A1 !important",
                  color: "#ffffff !important",
                },
              }}
            />
          </div>
        </div>
      </div>

      {!!viewFlag && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] min-w-[500px] p-5 grid ">
              <div className="w-[100%] grid justify-start items-center text-[#00ADEF] font-bold">
                {`${
                  flagActive === 1
                    ? "New"
                    : flagActive === 2
                    ? "View"
                    : flagActive === 3
                    ? "Edit"
                    : "-"
                } Contract Nom. Point Relation`}
              </div>
              <div className=" space-y-2 my-5 text-sm">
                <>
                  <div className=" grid grid-cols-2 gap-3">
                   
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>
                        {`Shipper ID`}
                      </div>
                      <MySelect
                        placeholder={
                          <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select Shipper ID`}</div>
                        }
                        // options={userTypeOption}
                        options={(bankData || [])?.map((e: any) => {
                          return {
                            value: e?.id,
                            searchCus: e?.nameTh,
                            label: (
                              <div className=" flex items-center gap-2 text-sm">
                                <img
                                  src={e?.logo}
                                  className="w-[20px] h-[20px]"
                                  alt=""
                                />
                                {`${e?.nameTh}`}
                              </div>
                            ),
                          };
                        })}
                        seUseType={seUseType}
                        setSeUseType={setSeUseType}
                        className={`w-[100%] h-[38px] text-sm border-[#DFE4EA] ${
                          flagActive === 2 && "bg-[#EFECEC]"
                        }  rounded-lg !focus:border-[#cacaca]`}
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
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>
                        {`Contract ID`}
                      </div>
                      <MySelect
                        placeholder={
                          <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select Contract ID`}</div>
                        }
                        // options={userTypeOption}
                        options={(bankData || [])?.map((e: any) => {
                          return {
                            value: e?.id,
                            searchCus: e?.nameTh,
                            label: (
                              <div className=" flex items-center gap-2 text-sm">
                                <img
                                  src={e?.logo}
                                  className="w-[20px] h-[20px]"
                                  alt=""
                                />
                                {`${e?.nameTh}`}
                              </div>
                            ),
                          };
                        })}
                        seUseType={seUseType}
                        setSeUseType={setSeUseType}
                        className={`w-[100%] h-[38px] text-sm border-[#DFE4EA] ${
                          flagActive === 2 && "bg-[#EFECEC]"
                        }  rounded-lg !focus:border-[#cacaca]`}
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
                  </div>

                  <div className=" grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>Contract Date From
                      </div>
                      {flagActive !== 2 ? (
                        <Datepicker
                          options={{
                            title: "",
                            autoHide: true,
                            todayBtn: false,
                            clearBtn: true,
                            clearBtnText: "Clear",
                            maxDate: new Date("9999-01-01"),
                            minDate: new Date("0-01-01"),
                            theme: {
                              background:
                                "bg-[#ffffff] dark:bg-[#ffffff] border-2 border-[#9b9fa4] dark:border-[#9b9fa4]",
                              todayBtn: "",
                              clearBtn:
                                "bg-[#00ADEF] dark:bg-[#00ADEF] hover:bg-[#00ADEFa0] dark:hover:bg-[#00ADEFa0] text-white font-bold",
                              icons:
                                "bg-[#f4f9ff] hover:bg-[#f4f9ff] dark:bg-[#f4f9ff] hover:dark:bg-[#e4f9ff] hover:text-[#9b9fa4] text-[#9b9fa4] dark:text-[#9b9fa4] hover:dark:text-[#9b9fa4]",
                              text: "!text-[#7a7a7a] !dark:text-[#7a7a7a]",
                              disabledText:
                                "!text-[#cacaca] !dark:text-[#cacaca]",
                              input:
                                "w-full py-2 rounded-lg border-[1px] border-[#DFE4EA] dark:border-[#DFE4EA] outline-none bg-opacity-10 dark:bg-white focus:border-[#00ADEF] dark:focus:border-[#00ADEF] text-[#58585A] dark:text-[#58585A]", // Ensure both background and text colors are set
                              inputIcon: "",
                              selected:
                                "dark:bg-[#00ADEF] bg-[#00ADEF] dark:hover:bg-[#00ADEFa0] hover:bg-[#00ADEFa0]",
                            },
                            icons: {
                              prev: () => (
                                <span className="">
                                  <ArrowBackIosIcon
                                    style={{ fontSize: "20px" }}
                                  />
                                </span>
                              ),
                              next: () => (
                                <span>
                                  <ArrowForwardIosIcon
                                    style={{ fontSize: "20px" }}
                                  />
                                </span>
                              ),
                            },
                            datepickerClassNames: "top-20",
                            defaultDate: null,
                            language: "en",
                            disabledDates: [],
                            weekDays: [
                              "Mo",
                              "Tu",
                              "We",
                              "Th",
                              "Fr",
                              "Sa",
                              "Su",
                            ],
                            inputNameProp: "date",
                            inputIdProp: "date",
                            inputPlaceholderProp: "Select Date",
                            inputDateFormatProp: {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          }}
                          onChange={(selectedDate: Date) => {
                            setSelectedDate(selectedDate);
                          }}
                          value={(!!selectedDate && selectedDate) || null}
                          show={show}
                          setShow={(state: boolean) => {
                            setShow(state);
                          }}
                        >
                          {show && (
                            <div
                              className=" fixed top-[0] left-0 w-[100vw] h-[100vh] bg-[#fffff]  z-[50]"
                              onClick={() => {
                                setShow(false);
                              }}
                            ></div>
                          )}
                          <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3">
                            <input
                              id="dateEndId"
                              type="text"
                              className=" text-sm bg-white w-[100%]"
                              placeholder="Select Date"
                              value={selectedDate}
                              onFocus={() => setShow(true)}
                              readOnly
                            />
                            <CalendarTodayIcon
                              className=" text-[#DFE4EA]"
                              style={{ fontSize: "20px" }}
                            />
                          </div>
                        </Datepicker>
                      ) : (
                        <div className="flex items-center border-[#DFE4EA] border-[1px] bg-[#efecec] h-[38px] rounded-lg px-3 z-[1000]">
                          <input
                            id="dateEndId"
                            type="text"
                            className=" text-sm w-[100%] bg-[#efecec] "
                            placeholder="Select Date"
                            value={selectedDate}
                            onFocus={() => setShow(true)}
                            readOnly
                            disabled={true}
                          />
                          <CalendarTodayIcon
                            className=" text-[#DFE4EA]"
                            style={{ fontSize: "20px" }}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        Contract Date To
                      </div>
                      {flagActive !== 2 ? (
                        <Datepicker
                          options={{
                            title: "",
                            autoHide: true,
                            todayBtn: false,
                            clearBtn: true,
                            clearBtnText: "Clear",
                            maxDate: new Date("9999-01-01"),
                            minDate: new Date("0-01-01"),
                            theme: {
                              background:
                                "bg-[#ffffff] dark:bg-[#ffffff] border-2 border-[#9b9fa4] dark:border-[#9b9fa4]",
                              todayBtn: "",
                              clearBtn:
                                "bg-[#00ADEF] dark:bg-[#00ADEF] hover:bg-[#00ADEFa0] dark:hover:bg-[#00ADEFa0] text-white font-bold",
                              icons:
                                "bg-[#f4f9ff] hover:bg-[#f4f9ff] dark:bg-[#f4f9ff] hover:dark:bg-[#e4f9ff] hover:text-[#9b9fa4] text-[#9b9fa4] dark:text-[#9b9fa4] hover:dark:text-[#9b9fa4]",
                              text: "!text-[#7a7a7a] !dark:text-[#7a7a7a]",
                              disabledText:
                                "!text-[#cacaca] !dark:text-[#cacaca]",
                              input:
                                "w-full py-2 rounded-lg border-[1px] border-[#DFE4EA] dark:border-[#DFE4EA] outline-none bg-opacity-10 dark:bg-white focus:border-[#00ADEF] dark:focus:border-[#00ADEF] text-[#58585A] dark:text-[#58585A]", // Ensure both background and text colors are set
                              inputIcon: "",
                              selected:
                                "dark:bg-[#00ADEF] bg-[#00ADEF] dark:hover:bg-[#00ADEFa0] hover:bg-[#00ADEFa0]",
                            },
                            icons: {
                              prev: () => (
                                <span className="">
                                  <ArrowBackIosIcon
                                    style={{ fontSize: "20px" }}
                                  />
                                </span>
                              ),
                              next: () => (
                                <span>
                                  <ArrowForwardIosIcon
                                    style={{ fontSize: "20px" }}
                                  />
                                </span>
                              ),
                            },
                            datepickerClassNames: "top-20",
                            defaultDate: null,
                            language: "en",
                            disabledDates: [],
                            weekDays: [
                              "Mo",
                              "Tu",
                              "We",
                              "Th",
                              "Fr",
                              "Sa",
                              "Su",
                            ],
                            inputNameProp: "date",
                            inputIdProp: "date",
                            inputPlaceholderProp: "Select Date",
                            inputDateFormatProp: {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          }}
                          onChange={(selectedDate: Date) => {
                            setSelectedDateEnd(selectedDate);
                          }}
                          value={(!!selectedDateEnd && selectedDateEnd) || null}
                          show={showEnd}
                          setShow={(state: boolean) => {
                            setShowEnd(state);
                          }}
                        >
                          {showEnd && (
                            <div
                              className=" fixed top-[0] left-0 w-[100vw] h-[100vh] bg-[#fffff]  z-[50]"
                              onClick={() => {
                                setShowEnd(false);
                              }}
                            ></div>
                          )}
                          <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3">
                            <input
                              id="dateEndId"
                              type="text"
                              className=" text-sm bg-white w-[100%]"
                              placeholder="Select Date"
                              value={selectedDateEnd}
                              onFocus={() => setShowEnd(true)}
                              readOnly
                            />
                            <CalendarTodayIcon
                              className=" text-[#DFE4EA]"
                              style={{ fontSize: "20px" }}
                            />
                          </div>
                        </Datepicker>
                      ) : (
                        <div className="flex items-center border-[#DFE4EA] border-[1px] bg-[#efecec] h-[38px] rounded-lg px-3 z-[1000]">
                          <input
                            id="dateEndId"
                            type="text"
                            className=" text-sm w-[100%] bg-[#efecec] "
                            placeholder="Select Date"
                            value={selectedDateEnd}
                            onFocus={() => setShowEnd(true)}
                            readOnly
                            disabled={true}
                          />
                          <CalendarTodayIcon
                            className=" text-[#DFE4EA]"
                            style={{ fontSize: "20px" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              </div>
              <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                {flagActive === 1 ? (
                  <>
                    <div
                      onClick={() => {
                        setFlagActive(0);
                        setViewFlag(false);
                      }}
                      className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                    >
                      {`Cancel`}
                    </div>
                    <div
                      onClick={() => {
                        saveData();
                      }}
                      className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                    >
                      {`Add`}
                    </div>
                  </>
                ) : flagActive === 3 ? (
                  <>
                    <div
                      onClick={() => {
                        setFlagActive(0);
                        setViewFlag(false);
                      }}
                      className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                    >
                      {`Cancel`}
                    </div>
                    <div
                      onClick={() => {
                        setConfirmEdit(true);
                      }}
                      className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                    >
                      {`Save`}
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => {
                      setFlagActive(0);
                      setViewFlag(false);
                    }}
                    className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                  >
                    {`Close`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {!!historyFlag && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] w-[90vw] h-[90vh]  ">
              <div className="p-[20px]">
                <div className="w-[100%] h-[50px] text-[#00ADEF] font-bold grid items-center">
                  {`History Concept Point`}
                </div>
              </div>
              <div className="space-y-5 h-[calc(90vh-180px)] mx-[20px]">
                <div className="flex items-center gap-2">
                  <UiSearch />
                </div>
                <div className="relative shadow-md">
                  <div className=" h-[calc(100vh-450px)] overflow-y-auto block rounded-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-[#58585A] uppercase bg-[#E5E5E5] sticky top-0 z-10">
                        <tr>
                          {configDataRow.map((item: any, ix: any) => {
                            return (
                              <UiHeadTable
                                key={ix}
                                sortEnable={item?.sortEnable}
                                keys={item?.keys}
                                value={item?.headValue}
                                data={dataState}
                              />
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="">
                        {
                          <>
                            {(dataState || []).map((item: any, ix: any) => {
                              return (
                                <tr
                                  key={ix}
                                  className="odd:bg-white even:bg-gray-50 border-b "
                                >
                                  {configDataRow.map((el: any, il: any) => {
                                    let valueShow: any = null;

                                    switch (el?.keys) {
                                      case "shipperId":
                                        valueShow =
                                          item?.[el?.keys]?.["name"] || "-";
                                        break;

                                      case "contractId":
                                        valueShow =
                                          item?.[el?.keys]?.["name"] || "-";
                                        break;

                                      case "action":
                                        valueShow = (
                                          <>
                                            <MoreHorizOutlinedIcon
                                              onClick={() => {
                                                onActive(item);
                                              }}
                                              className=" cursor-pointer"
                                            />
                                            {item?.active && (
                                              <div className=" absolute top-0 right-full shadow-md bg-white ">
                                                <div
                                                  onClick={() => {
                                                    setFlagActive(2);
                                                    onActiveCloseAll();
                                                    setViewFlag(true);
                                                  }}
                                                  className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3  "
                                                >
                                                  <RemoveRedEyeIcon />
                                                  <div className=" whitespace-nowrap">{`View`}</div>
                                                </div>
                                                <div
                                                  onClick={() => {
                                                    setFlagActive(3);
                                                    onActiveCloseAll();
                                                    setViewFlag(true);
                                                  }}
                                                  className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3"
                                                >
                                                  <EditIcon />
                                                  <div className=" whitespace-nowrap">{`Edit`}</div>
                                                </div>
                                                <div
                                                  onClick={() => {
                                                    onActiveCloseAll();
                                                    setHistoryFlag(true);
                                                  }}
                                                  className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3"
                                                >
                                                  <HistoryIcon />
                                                  <div className=" whitespace-nowrap">{`History`}</div>
                                                </div>
                                              </div>
                                            )}
                                          </>
                                        );
                                        break;

                                      default:
                                        valueShow = item?.[el?.keys] || "-";
                                        break;
                                    }

                                    return (
                                      <UiBodyTable
                                        key={il}
                                        sortEnable={el?.sortEnable}
                                        keys={el?.keys}
                                        className={`${
                                          !!el?.keys && "px-6 py-4"
                                        } ${el?.bodyClass}`}
                                        value={valueShow}
                                        data={dataState}
                                      />
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between whitespace-nowrap">
                  <div className=" flex items-center gap-3 text-sm">
                    {/* {`Page ${page} of ${dataState.length}`} */}
                    {`Show`}
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#DFE4EA] focus:border-[#DFE4EA] block w-full p-1"
                      value={limit}
                      onChange={(e: any) => {
                        setLimit(e.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="10">10</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      {(dataStateInit || []).length > 0 && (
                        <option value={`${(dataStateInit || []).length}`}>{`${
                          (dataStateInit || []).length
                        }`}</option>
                      )}
                    </select>
                  </div>
                  <Pagination
                    count={pagination}
                    page={page}
                    onChange={handleChange}
                    //   variant="outlined"
                    //   color="primary"
                    // variant="outlined"
                    shape="rounded"
                    sx={{
                      "& .Mui-selected": {
                        backgroundColor: "#1473A1 !important",
                        color: "#ffffff !important",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="p-[20px]">
                <div className="w-[100%] flex items-center justify-end gap-2 text-xs  h-[50px]">
                  <div
                    onClick={() => {
                      setHistoryFlag(false);
                    }}
                    className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                  >
                    {`Close`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!!groupIdFlag && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] min-w-[500px] p-5 grid ">
              <div className="w-[100%] grid justify-start items-center text-[#00ADEF] font-bold">
                {`List of Contract Point`}
              </div>
              <div className=" space-y-2 my-5">
                {areaFlag && (
                  <div
                    className="fixed bg-[#55555526] inset-0 z-[1999] cursor-pointer"
                    onClick={() => {
                      setAreaFlag(false);
                    }}
                  ></div>
                )}
                <div
                  className=" border-[1px] border-[#DFE4EA] rounded-md cursor-pointer relative w-fit px-5 py-1 text-sm text-[#6B7280] flex items-center gap-2"
                  onClick={() => {
                    setAreaFlag(true);
                  }}
                >
                  {`Area`}
                  <KeyboardArrowDownIcon
                    className=" text-[#6B7280]"
                    style={{ fontSize: "20px" }}
                  />
                  {areaFlag && (
                    <>
                      <div className="bg-[#ffffff] text-[#58585A] absolute z-[2000] rounded-md p-2 left-[30px] top-0 min-w-[100px] min-h-[20px] max-h-[80vh] overflow-y-auto cursor-default shadow-lg">
                        <div className="grid gap-2">
                          <div className="whitespace-nowrap flex items-center gap-2">
                            {!!(areaState || []).find((f: any) => {
                              return f?.active === false;
                            }) ? (
                              <CheckBoxOutlineBlankIcon
                                className=" cursor-pointer text-[#1473A1]"
                                onClick={() => {
                                  setAreaState((pre: any) => {
                                    let newPre = pre.map((items: any) => {
                                      return { ...items, active: true };
                                    });

                                    return newPre;
                                  });
                                }}
                              />
                            ) : (
                              <CheckBoxIcon
                                className=" cursor-pointer text-[#1473A1]"
                                onClick={() => {
                                  setAreaState((pre: any) => {
                                    let newPre = pre.map((items: any) => {
                                      return { ...items, active: false };
                                    });

                                    return newPre;
                                  });
                                }}
                              />
                            )}
                            <div>{`All`}</div>
                          </div>
                          {areaState.length > 0 ? (
                            areaState.map((item: any, ix: any) => {
                              return (
                                <div
                                  key={ix}
                                  className="whitespace-nowrap flex items-center gap-2"
                                >
                                  {!!item?.active ? (
                                    <CheckBoxIcon
                                      className=" cursor-pointer text-[#1473A1]"
                                      onClick={() => {
                                        setAreaState((pre: any) => {
                                          let active = false;
                                          let newPre = pre.map((items: any) => {
                                            if (items?.id === item?.id) {
                                              active = !items?.active;
                                            } else {
                                              active = items?.active;
                                            }
                                            return { ...items, active: active };
                                          });

                                          return newPre;
                                        });
                                      }}
                                    />
                                  ) : (
                                    <CheckBoxOutlineBlankIcon
                                      className=" cursor-pointer text-[#1473A1]"
                                      onClick={() => {
                                        setAreaState((pre: any) => {
                                          let active = false;
                                          let newPre = pre.map((items: any) => {
                                            if (items?.id === item?.id) {
                                              active = !items?.active;
                                            } else {
                                              active = items?.active;
                                            }
                                            return { ...items, active: active };
                                          });

                                          return newPre;
                                        });
                                      }}
                                    />
                                  )}
                                  <div>{item?.name}</div>
                                </div>
                              );
                            })
                          ) : (
                            <div>{`-`}</div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className=" grid grid-cols-[1fr,25px,1fr] gap-3">
                  <div className="relative">
                    <SearchIcon className=" text-[#DFE4EA] absolute top-[8px] right-[8px]" />
                    <input
                      type="text"
                      id="table-searchss"
                      className={`w-[100%] text-sm block p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                      placeholder="Search"
                      value={arreaNotUseSearch}
                      onChange={(e) => {
                        setArreaNotUseSearch(e.target.value);
                      }}
                    />
                  </div>
                  <div></div>
                  <div className="relative">
                    <SearchIcon className=" text-[#DFE4EA] absolute top-[8px] right-[8px]" />
                    <input
                      type="text"
                      id="table-search"
                      className={`w-[100%] text-sm block p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                      placeholder="Search"
                      value={pointDataSearch}
                      onChange={(e) => {
                        setPointDataSearch(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className=" grid grid-cols-[1fr,25px,1fr] gap-3">
                  <div className=" border-[1px] border-[#DFE4EA] rounded-md">
                    <div className=" bg-[#1473A1] text-[#ffffff] text-sm flex items-center justify-center py-1 rounded-t-md">{`Available Points`}</div>
                    <div className=" text-sm text-[#6B7280] min-h-[calc(200px)] max-h-[calc(100vh-600px)] overflow-y-auto">
                      {arreaNotUseShow.map((item: any, ix: any) => {
                        return (
                          <div
                            key={ix}
                            className="px-2 py-1 hover:bg-[#DFE4EA40] cursor-pointer"
                            style={{
                              background: item?.active && "#1473A1a0",
                              color: item?.active && "#ffffff",
                            }}
                            onClick={() => {
                              useActiveNotPoint(item);
                            }}
                          >
                            {item?.name || "-"}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid items-center">
                    <div className=" space-y-2">
                      <div
                        className={` cursor-pointer border-[1px] hover:bg-[#dfe4eaba] border-[#DFE4EA] rounded-md w-[25px] h-[25px] grid items-center justify-center`}
                      >
                        <KeyboardArrowRightIcon
                          onClick={() => {
                            moveToGroup();
                          }}
                          className=" text-[#6B7280]"
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                      <div
                        className={` cursor-pointer border-[1px] hover:bg-[#dfe4eaba] border-[#DFE4EA] rounded-md w-[25px] h-[25px] grid items-center justify-center`}
                      >
                        <KeyboardArrowLeftIcon
                          onClick={() => {
                            moveToPoint();
                          }}
                          className=" text-[#6B7280]"
                          style={{ fontSize: "20px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" border-[1px] border-[#DFE4EA] rounded-md">
                    <div className=" bg-[#1473A1] text-[#ffffff] text-sm flex items-center justify-center py-1 rounded-t-md">{`Group ID`}</div>
                    <div className=" text-sm text-[#6B7280] min-h-[calc(200px)] max-h-[calc(100vh-600px)] overflow-y-auto">
                      {pointDataShow.map((item: any, ix: any) => {
                        return (
                          <div
                            key={ix}
                            className="px-2 py-1 hover:bg-[#DFE4EA40] cursor-pointer"
                            style={{
                              background: item?.active && "#1473A1a0",
                              color: item?.active && "#ffffff",
                            }}
                            onClick={() => {
                              setPointData((pre: any) => {
                                let newPre = pre?.map((et: any) => {
                                  let active = false;
                                  if (et?.id === item?.id) {
                                    active = !et?.active;
                                  } else {
                                    active = et?.active;
                                  }

                                  return { ...et, active: active };
                                });
                                return newPre;
                              });
                              setPointDataShow((pre: any) => {
                                let newPre = pre?.map((et: any) => {
                                  let active = false;
                                  if (et?.id === item?.id) {
                                    active = !et?.active;
                                  } else {
                                    active = et?.active;
                                  }

                                  return { ...et, active: active };
                                });
                                return newPre;
                              });
                            }}
                          >
                            {item?.name || "-"}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                <div
                  onClick={() => {
                    setGroupIdFlag(false);
                  }}
                  className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                >
                  {`Close`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!!confirmEdit && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] min-w-[500px] p-5 grid ">
              <div className="w-[100%] grid justify-center items-center text-[#00ADEF] font-bold text-xl">
                {`Save Changes be fore closing`}
              </div>
              <div className=" space-y-2 my-5 text-center text-gray-400 my-5">
                {`If you don't save, your changes will be lost.`}
              </div>
              <div className="w-[100%] flex items-center justify-center gap-2 text-xs">
                <>
                  <div
                    onClick={() => {
                      setConfirmEdit(false);
                    }}
                    className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                  >
                    {`Cancel`}
                  </div>
                  <div
                    onClick={() => {
                      modalConf();
                    }}
                    className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                  >
                    {`Save`}
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      )}
      {!!caseSave && (
        <div className=" absolute top-0 left-0 bg-[#c4c4c476] w-[100vw] h-[100vh] grid items-center justify-center z-[999]">
          <div className=" bg-white rounded-[10px] p-[10px] min-w-[500px] min-h-[300px] grid ">
            <div className="w-[100%] grid justify-center items-center">
              <div
                className={`w-[50px] h-[50px] grid items-center justify-center rounded-full`}
                style={{ background: "#DAF8E6" }}
              >
                <CheckIcon style={{ color: "#1A8245" }} />
              </div>
            </div>
            <div
              className={`w-[100%] grid items-center justify-center text-[#1A8245] font-bold text-2xl`}
            >{`Successful`}</div>
            <>
              {flagActive === 1 ? (
                <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`Operator has been added.`}</div>
              ) : (
                <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`Your changes has been saved.`}</div>
              )}
            </>
            <div className="w-[100%] grid items-center justify-center">
              <div
                className="h-[48px] w-[200px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                onClick={() => {
                  setCaseSave(false);
                  setFlagActive(0);
                }}
              >
                {`OK`}
              </div>
            </div>
          </div>
        </div>
      )}
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
