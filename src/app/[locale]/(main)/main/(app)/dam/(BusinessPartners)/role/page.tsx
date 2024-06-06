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
import CheckIcon from '@mui/icons-material/Check';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
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

const levelTemp: any = [
  {
    id: 1,
    name: 1,
  },
  {
    id: 2,
    name: 2,
  },
  {
    id: 3,
    name: 3,
  },
  {
    id: 4,
    name: 4,
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

const dataTemp: any = [
  {
    id: 1,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 1,
      name: "Super Admin",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 2,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 2,
      name: "Booking",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 3,
    system: "ONSHORE",
    userType: {
      id: 2,
      name: "Shipper",
      color: "#C9E6FB",
    },
    role: {
      id: 3,
      name: "PTT Engineering",
    },
    level: 3,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 4,
    system: "ONSHORE",
    userType: {
      id: 2,
      name: "Shipper",
      color: "#C9E6FB",
    },
    role: {
      id: 4,
      name: "PTT Intermediate",
    },
    level: 3,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 5,
    system: "ONSHORE",
    userType: {
      id: 3,
      name: "Operator",
      color: "#D4F8D3",
    },
    role: {
      id: 5,
      name: "PTT Operator",
    },
    level: 2,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 6,
    system: "ONSHORE",
    userType: {
      id: 2,
      name: "Shipper",
      color: "#C9E6FB",
    },
    role: {
      id: 6,
      name: "PTT Shipper",
    },
    level: 3,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 7,
    system: "ONSHORE",
    userType: {
      id: 3,
      name: "Operator",
      color: "#D4F8D3",
    },
    role: {
      id: 7,
      name: "Publication",
    },
    level: 2,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 8,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 8,
      name: "Restart User",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 9,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 8,
      name: "Restart User",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 10,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 8,
      name: "Restart User",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 11,
    system: "ONSHORE",
    userType: {
      id: 3,
      name: "Operator",
      color: "#D4F8D3",
    },
    role: {
      id: 7,
      name: "Publication",
    },
    level: 2,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 12,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 8,
      name: "Restart User",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 13,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 8,
      name: "Restart User",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 14,
    system: "ONSHORE",
    userType: {
      id: 3,
      name: "Operator",
      color: "#D4F8D3",
    },
    role: {
      id: 7,
      name: "Publication",
    },
    level: 2,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 15,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 8,
      name: "Restart User",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
  },
  {
    id: 16,
    system: "ONSHORE",
    userType: {
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    role: {
      id: 8,
      name: "Restart User",
    },
    level: 1,
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    updateBy: {
      name: "demo ABC",
      date: "20/01/2024",
    },
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
  const [userTypeOption, setUserTypeOption] = useState([]);
  const [startDateSearch, setStartDateSearch] = useState(false);
  const [endDateSearch, setEndDateSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [showEnd, setShowEnd] = useState(false);
  const [selectedDateEnd, setSelectedDateEnd] = useState<any>("");
  const [levelData, setLevelData] = useState<any>([]);
  // const [dataUse, setDataUse] = useState<any>(null)
  const [confirmEdit, setConfirmEdit] = useState(false);

  const [dataSearch, setDataSearch] = useState<any>({
    userType: null,
    role: "",
    startDate: "",
    endDate: "",
  });

  const [dataUse, setDataUse] = useState<any>({
    userType: null,
    level: null,
    role: "",
    startDate: "",
    endDate: "",
  });

  const [dataUseVaridate, setDataUseVaridate] = useState({
    userType: false,
    level: false,
    role: false,
    startDate: false,
    endDate: false,
  });
  const [caseSave, setCaseSave] = useState(false);


  const getUserType = () => {
    setUserTypeOption(userType || []);
  };

  const getLevel = () => {
    setLevelData(levelTemp || []);
  };

  const selectData = async (payload: any, key: any) => {
    setDataUseVaridate((pre: any) => ({
      ...pre,
      [key]: false,
    }));
    setDataUse((pre: any) => ({ ...pre, [key]: payload }));
  };

  const modalConf = async () => {
    setConfirmEdit(false);

    clearField();
    setFlagActive(0);
    setViewFlag(false);
  };

  const clearField = async () => {
    setDataUseVaridate((pre: any) => ({
      ...pre,
      userType: false,
      level: false,
      role: false,
      startDate: false,
    }));
    setDataUse((pre: any) => ({
      ...pre,
      userType: null,
      level: null,
      role: "",
      startDate: "",
      endDate: "",
    }));
  };

  const saveData = async () => {
    if (
      !!!dataUse?.userType ||
      !!!dataUse?.level ||
      !!!dataUse?.role ||
      !!!dataUse?.startDate
    ) {
      setDataUseVaridate((pre: any) => ({
        ...pre,
        userType: !!!dataUse?.userType,
        level: !!!dataUse?.level,
        role: !!!dataUse?.role,
        startDate: !!!dataUse?.startDate,
      }));
    } else {
      setDataUseVaridate((pre: any) => ({
        ...pre,
        userType: false,
        level: false,
        role: false,
        startDate: false,
      }));
      console.log("dataUse : ", dataUse);
      setFlagActive(0);
      setViewFlag(false);
    }
  };

  const getRandomValue = () => {
    const randomStrings = [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
    ];
    return randomStrings[Math.floor(Math.random() * randomStrings.length)];
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

  useEffect(() => {
    console.log("dataUseVaridate : ", dataUseVaridate);
  }, [dataUseVaridate]);

  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + parseInt(String(limit), 10);
    setPagination(Math.ceil(dataStateInit.length / limit));
    setDataState(dataStateInit.slice(start, end) || []);
  }, [limit, dataStateInit, page]);

  useEffect(() => {
    const sortedData = [...dataStateInit].sort((a: any, b: any) => {
      if (sortBy === "system") {
        return sortOrder === "asc"
          ? ((!!a.system && String(a.system)) || "").localeCompare(
              (!!b.system && String(b.system)) || ""
            )
          : ((!!b.system && String(b.system)) || "").localeCompare(
              (!!a.system && String(a.system)) || ""
            );
      } else if (sortBy === "userType") {
        return sortOrder === "asc"
          ? (
              (!!a.userType?.name && String(a.userType?.name)) ||
              ""
            ).localeCompare(
              (!!b.userType?.name && String(b.userType?.name)) || ""
            )
          : (
              (!!b.userType?.name && String(b.userType?.name)) ||
              ""
            ).localeCompare(
              (!!a.userType?.name && String(a.userType?.name)) || ""
            );
      } else if (sortBy === "role") {
        return sortOrder === "asc"
          ? ((!!a.role?.name && String(a.role?.name)) || "").localeCompare(
              (!!b.role?.name && String(b.role?.name)) || ""
            )
          : ((!!b.role?.name && String(b.role?.name)) || "").localeCompare(
              (!!a.role?.name && String(a.role?.name)) || ""
            );
      } else if (sortBy === "level") {
        return sortOrder === "asc"
          ? ((!!a.level && String(a.level)) || "").localeCompare(
              (!!b.level && String(b.level)) || ""
            )
          : ((!!b.level && String(b.level)) || "").localeCompare(
              (!!a.level && String(a.level)) || ""
            );
      } else if (sortBy === "startDate") {
        return sortOrder === "asc"
          ? ((!!a.startDate && String(a.startDate)) || "").localeCompare(
              (!!b.startDate && String(b.startDate)) || ""
            )
          : ((!!b.startDate && String(b.startDate)) || "").localeCompare(
              (!!a.startDate && String(a.startDate)) || ""
            );
      } else if (sortBy === "endDate") {
        return sortOrder === "asc"
          ? ((!!a.endDate && String(a.endDate)) || "").localeCompare(
              (!!b.endDate && String(b.endDate)) || ""
            )
          : ((!!b.endDate && String(b.endDate)) || "").localeCompare(
              (!!a.endDate && String(a.endDate)) || ""
            );
      } else if (sortBy === "updateBy") {
        return sortOrder === "asc"
          ? (
              (!!a.updateBy?.name && String(a.updateBy?.name)) ||
              ""
            ).localeCompare(
              (!!b.updateBy?.name && String(b.updateBy?.name)) || ""
            )
          : (
              (!!b.updateBy?.name && String(b.updateBy?.name)) ||
              ""
            ).localeCompare(
              (!!a.updateBy?.name && String(a.updateBy?.name)) || ""
            );
      }

      return 0;
    });
    setDataStateInit(sortedData);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    let filter = dataStateTemp.filter((f: any) => {
      return (
        ((f?.system && String(f?.system)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.userType?.name && String(f?.userType?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.role?.name && String(f?.role?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.level && String(f?.level)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.startDate && String(f?.startDate)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.endDate && String(f?.endDate)) || "")
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
    getUserType();
    getLevel();
    return () => {};
  }, []);

  return (
    <>
      <div className="p-2 space-y-2">
        <div className=" p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm flex items-center gap-2">
          <div>
            <div className="text-sm mb-2">User Type</div>
            <MySelect
              placeholder={
                <div className=" text-sm text-[#cacaca] ">{`Select User Type`}</div>
              }
              options={(userTypeOption || [])?.map((e: any) => {
                return {
                  value: e?.id,
                  label: e?.name,
                };
              })}
              seUseType={dataSearch?.userType}
              setSeUseType={(e: any) => {
                setDataSearch((pre: any) => ({ ...pre, userType: e }));
              }}
              className="w-[209px] h-[38px] z-[999] text-sm  rounded-lg !focus:border-[#cacaca]"
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
              disabled={false}
            />
          </div>

          <div>
            <div className="text-sm mb-2">Role</div>
            {/* <input
              id="user"
              type="text"
              name="use"
              className={` pl-3 pr-3 py-2 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
              placeholder={`.......`}
              autoFocus={true}
            /> */}
            <div className="relative">
              <SearchIcon className=" text-[#DFE4EA] absolute top-[8px] right-[8px]" />
              <input
                type="text"
                id="table-searchs"
                className={`text-sm block p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                placeholder="Search Role"
              />
            </div>
          </div>
          <div>
            <div className="text-sm mb-2">Start Date</div>
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
                    "bg-[#00ADEF] dark:bg-[#00ADEF] hover:bg-[#00ADEFa0] dark:hover:bg-[#00ADEFa0] text-[#ffffff] font-bold",
                  icons:
                    "bg-[#f4f9ff] hover:bg-[#f4f9ff] dark:bg-[#f4f9ff] hover:dark:bg-[#e4f9ff] hover:text-[#9b9fa4] text-[#9b9fa4] dark:text-[#9b9fa4] hover:dark:text-[#9b9fa4]",
                  text: "!text-[#7a7a7a] !dark:text-[#7a7a7a]",
                  disabledText: "!text-[#cacaca] !dark:text-[#cacaca]",
                  input:
                    "w-full py-2 rounded-lg border-[1px] border-[#DFE4EA] dark:border-[#DFE4EA] outline-none bg-opacity-10 dark:bg-[#ffffff] focus:border-[#00ADEF] dark:focus:border-[#00ADEF] text-[#58585A] dark:text-[#58585A]", // Ensure both background and text colors are set
                  inputIcon: "",
                  selected:
                    "dark:bg-[#00ADEF] bg-[#00ADEF] dark:hover:bg-[#00ADEFa0] hover:bg-[#00ADEFa0]",
                },
                icons: {
                  prev: () => (
                    <span className="">
                      <ArrowBackIosIcon style={{ fontSize: "20px" }} />
                    </span>
                  ),
                  next: () => (
                    <span>
                      <ArrowForwardIosIcon style={{ fontSize: "20px" }} />
                    </span>
                  ),
                },
                datepickerClassNames: "top-20",
                defaultDate: null,
                language: "en",
                disabledDates: [],
                weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
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
              show={startDateSearch}
              setShow={(state: boolean) => {
                setStartDateSearch(state);
              }}
            >
              {startDateSearch && (
                <div
                  className=" fixed top-[0] left-0 w-[100vw] h-[100vh] bg-[#ffffff30] z-[50]"
                  onClick={() => {
                    setStartDateSearch(false);
                  }}
                ></div>
              )}
              <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3">
                <input
                  id="dateStartId"
                  type="text"
                  className=" text-sm bg-white"
                  placeholder="Select Date"
                  value={selectedDate}
                  onFocus={() => setStartDateSearch(true)}
                  readOnly
                />
                <CalendarTodayIcon
                  className=" text-[#DFE4EA]"
                  style={{ fontSize: "20px" }}
                />
              </div>
            </Datepicker>
          </div>
          <div>
            <div className="text-sm mb-2">End Date</div>
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
                  disabledText: "!text-[#cacaca] !dark:text-[#cacaca]",
                  input:
                    "w-full py-2 rounded-lg border-[1px] border-[#DFE4EA] dark:border-[#DFE4EA] outline-none bg-opacity-10 dark:bg-white focus:border-[#00ADEF] dark:focus:border-[#00ADEF] text-[#58585A] dark:text-[#58585A]", // Ensure both background and text colors are set
                  inputIcon: "",
                  selected:
                    "dark:bg-[#00ADEF] bg-[#00ADEF] dark:hover:bg-[#00ADEFa0] hover:bg-[#00ADEFa0]",
                },
                icons: {
                  prev: () => (
                    <span className="">
                      <ArrowBackIosIcon style={{ fontSize: "20px" }} />
                    </span>
                  ),
                  next: () => (
                    <span>
                      <ArrowForwardIosIcon style={{ fontSize: "20px" }} />
                    </span>
                  ),
                },
                datepickerClassNames: "top-20",
                defaultDate: null,
                language: "en",
                disabledDates: [],
                weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
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
              show={endDateSearch}
              setShow={(state: boolean) => {
                setEndDateSearch(state);
              }}
            >
              {endDateSearch && (
                <div
                  className=" fixed top-[0] left-0 w-[100vw] h-[100vh] bg-[#fffff] z-[50]"
                  onClick={() => {
                    setEndDateSearch(false);
                  }}
                ></div>
              )}
              <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3">
                <input
                  id="dateEndId"
                  type="text"
                  className=" text-sm bg-white"
                  placeholder="Select Date"
                  value={selectedDateEnd}
                  onFocus={() => setEndDateSearch(true)}
                  readOnly
                />
                <CalendarTodayIcon
                  className=" text-[#DFE4EA]"
                  style={{ fontSize: "20px" }}
                />
              </div>
            </Datepicker>
          </div>
          <div className="rounded-lg bg-[#00ADEF] text-[#ffffff] grid items-center justify-center w-[38px] h-[38px] mt-auto cursor-pointer">
            <SearchIcon />
          </div>
          <div className="rounded-lg bg-[#ffffff] text-[#00ADEF] border-[1px] border-[#00ADEF] grid items-center justify-center w-[38px] h-[38px] mt-auto cursor-pointer">
            <RefreshIcon className="" />
          </div>
          <div
            onClick={() => {
              setFlagActive(1);
              setViewFlag(true);
            }}
            className="rounded-lg bg-[#00ADEF] text-[#ffffff] w-[150px] flex gap-2 items-center justify-center h-[38px] mt-auto ml-auto text-sm cursor-pointer"
          >
            <span>{`Add`}</span>
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
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "system"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.system;
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
                                    let newObj = { ...obj };
                                    newObj.system = fil["system"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}

                          <div className=" whitespace-nowrap">System</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "userType"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.userType;
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
                                    let newObj = { ...obj };
                                    newObj.userType = fil["userType"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">User Type</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "role"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.role;
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
                                    let newObj = { ...obj };
                                    newObj.role = fil["role"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">Roles</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "level"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.level;
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
                                    let newObj = { ...obj };
                                    newObj.level = fil["level"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">Level</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "startDate"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.startDate;
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
                                    let newObj = { ...obj };
                                    newObj.startDate = fil["startDate"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">Start Date</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "endDate"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.endDate;
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
                                    let newObj = { ...obj };
                                    newObj.endDate = fil["endDate"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">End Date</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "updateBy"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.updateBy;
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
                                    let newObj = { ...obj };
                                    newObj.updateBy = fil["updateBy"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">Update by</div>
                        </div>
                      </div>
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
            <div className=" h-[calc(100vh-360px)] overflow-y-auto block rounded-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-[#ffffff] uppercase bg-[#1473A1] sticky top-0 z-10">
                  <tr>
                    {/* <th scope="col" className="px-6 py-3 w-10">
                      #
                    </th> */}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "system"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "system"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        System
                        {sortBy === "system" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("system")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("system")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("system")}
                          />
                        )}
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "userType"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "userType"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                        >
                        User Type
                        {sortBy === "userType" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("userType")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("userType")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("userType")}
                          />
                        )}
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "role"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "role"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        Roles
                        {sortBy === "role" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("role")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("role")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("role")}
                          />
                        )}
                        
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "level"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "level"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        Level
                        {sortBy === "level" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("level")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("level")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("level")}
                          />
                        )}
                        
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "startDate"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "startDate"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        Start Date
                        {sortBy === "startDate" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("startDate")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("startDate")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("startDate")}
                          />
                        )}
                        
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "endDate"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "endDate"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        End Date
                        {sortBy === "endDate" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("endDate")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("endDate")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("endDate")}
                          />
                        )}
                        
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "updateBy"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "updateBy"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        Update by
                        {sortBy === "updateBy" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("updateBy")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("updateBy")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("updateBy")}
                          />
                        )}
                        
                      </th>
                    )}

                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {(dataState || []).map((item: any, ix: any) => {
                    return (
                      <tr
                        key={ix}
                        className="odd:bg-white even:bg-gray-50 border-b "
                      >
                        {/* <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {ix + 1 || "-"}
                        </th> */}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "system"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.system && "px-6 py-4"}`}>
                            {item?.system || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "userType"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.userType && "px-6 py-4"}`}>
                            <div
                              className={` text-center py-1 rounded-full`}
                              style={{ background: item?.userType?.color }}
                            >
                              {item?.userType?.name || "-"}
                            </div>
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "role"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td
                            className={`${
                              !!item?.role && "px-6 py-4"
                            } whitespace-nowrap`}
                          >
                            {item?.role?.name || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "level"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.level && "px-6 py-4"}`}>
                            {item?.level || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "startDate"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.startDate && "px-6 py-4"}`}>
                            {item?.startDate || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "endDate"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td
                            className={`${
                              !!item?.endDate && "px-6 py-4"
                            } text-[#1473A1]`}
                          >
                            {item?.endDate || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "updateBy"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.updateBy && "px-6 py-4"}`}>
                            <div className=" text-[#7a7a7a]">
                              {item?.updateBy?.name || "-"}
                            </div>
                            <div className=" text-[#9CA3AF] text-xs">
                              {item?.updateBy?.date || "-"}
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 relative">
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
                                  // setDataStateTemp((pre:any) => ([...pre, item]));

                                  setDataStateInit((pre: any) => [
                                    ...pre,
                                    item,
                                  ]);
                                  onActiveCloseAll();
                                }}
                                className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3"
                              >
                                <FileCopyIcon />
                                <div className=" whitespace-nowrap">{`Duplicate`}</div>
                              </div>
                              <div
                                onClick={() => {
                                  onActiveCloseAll();
                                  setRoleMnFlag(true);
                                }}
                                className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3"
                              >
                                <GroupIcon />
                                <div className=" whitespace-nowrap">{`Role Mannagement`}</div>
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
                        </td>
                      </tr>
                    );
                  })}
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
                    ? "Add"
                    : flagActive === 2
                    ? "View"
                    : flagActive === 3
                    ? "Edit"
                    : "-"
                } Role`}
              </div>
              <div className=" space-y-2 my-5">
                <div className=" grid grid-cols-2 gap-3">
                  <div>
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>User Type
                      </div>
                      <MySelect
                        placeholder={
                          <div className=" text-sm text-[#cacaca] ">{`Select User Type`}</div>
                        }
                        options={(userTypeOption || [])?.map((e: any) => {
                          return {
                            value: e?.id,
                            label: e?.name,
                          };
                        })}
                        seUseType={dataUse?.userType}
                        setSeUseType={(e: any) => selectData(e, "userType")}
                        className={`w-[100%] h-[38px] text-sm ${
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
                            border: dataUseVaridate?.userType
                              ? "1px solid #ED1B24 !important"
                              : "1px solid #DFE4EA !important",
                          }),
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                    {dataUseVaridate?.userType && (
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your shipper id`}</div>
                    )}
                  </div>
                  <div>
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>Level
                      </div>
                      <MySelect
                        placeholder={
                          <div className=" text-sm text-[#cacaca] ">{`Select Level`}</div>
                        }
                        options={(levelData || [])?.map((e: any) => {
                          return {
                            value: e?.id,
                            label: e?.name,
                          };
                        })}
                        seUseType={dataUse?.level}
                        setSeUseType={(e: any) => selectData(e, "level")}
                        className={`w-[100%] h-[38px] text-sm ${
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
                            border: dataUseVaridate?.level
                              ? "1px solid #ED1B24 !important"
                              : "1px solid #DFE4EA !important",
                          }),
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                    {dataUseVaridate?.level && (
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your level`}</div>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <div className="text-sm mb-2 text-[#58585A]">
                      <span className=" text-[#ED1B24]">{`*`}</span>Role
                    </div>
                    <input
                      id="user"
                      type="text"
                      name="use"
                      className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] ${
                        dataUseVaridate?.role
                          ? "border-[#ED1B24]"
                          : "border-[#DFE4EA]"
                      } outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                      placeholder={`Role Name`}
                      style={{
                        background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                      }}
                      disabled={(flagActive === 2 && true) || false}
                      value={dataUse?.role}
                      onChange={(e: any) => {
                        selectData(e.target.value, "role");
                      }}
                    />
                  </div>
                  {dataUseVaridate?.role && (
                    <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your role`}</div>
                  )}
                </div>
                <div className=" grid grid-cols-2 gap-3">
                  <div>
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>Start Date
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
                            console.log(selectedDate);
                            selectData(selectedDate, "startDate");
                          }}
                          value={
                            (!!dataUse?.startDate && dataUse?.startDate) || ""
                          }
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
                          <div
                            className={`flex items-center ${
                              dataUseVaridate?.startDate
                                ? "border-[#ED1B24]"
                                : "border-[#DFE4EA]"
                            } border-[1px] h-[38px] rounded-lg px-3`}
                          >
                            <input
                              id="dateEndId"
                              type="text"
                              className=" text-sm bg-white w-[100%]"
                              placeholder="Select Date"
                              value={dataUse?.startDate}
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
                    {dataUseVaridate?.startDate && (
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your start date`}</div>
                    )}
                  </div>

                  <div>
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        End Date
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
                            console.log(selectedDate);
                            selectData(selectedDate, "endDate");
                          }}
                          value={(!!dataUse?.endDate && dataUse?.endDate) || ""}
                          show={showEnd}
                          setShow={(state: boolean) => {
                            setShowEnd(state);
                          }}
                        >
                          {showEnd && (
                            <div
                              className=" fixed top-[0] left-0 w-[100vw] h-[100vh] bg-[#fffff] z-[50]"
                              onClick={() => {
                                setShowEnd(false);
                              }}
                            ></div>
                          )}
                          <div
                            className={`flex items-center ${
                              dataUseVaridate?.endDate
                                ? "border-[#DFE4EA]"
                                : "border-[#DFE4EA]"
                            } border-[1px] h-[38px] rounded-lg px-3`}
                          >
                            <input
                              id="dateEndId"
                              type="text"
                              className=" text-sm bg-white w-[100%]"
                              placeholder="Select Date"
                              value={dataUse?.endDate}
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
                            value={selectedDate}
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
                </div>
              </div>
              <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                {flagActive === 1 ? (
                  <>
                    <div
                      onClick={() => {
                        clearField();
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
                        clearField();
                        setFlagActive(0);
                        setViewFlag(false);
                      }}
                      className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                    >
                      {`Cancel`}
                    </div>
                    <div
                      onClick={() => {
                        // modalConf();
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
                      clearField();
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
      {!!historyFlag && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] w-[90vw] h-[90vh]  ">
              <div className="p-[20px]">
                <div className="w-[100%] h-[50px] text-[#00ADEF] font-bold grid items-center">
                  {`History Role`}
                </div>
              </div>
              <div className="space-y-5 h-[calc(90vh-180px)] mx-[20px]">
                <div className="flex items-center gap-2">
                  <div>
                    <div>
                      <div className="text-sm mb-2">User Type</div>
                      <MySelect
                        placeholder={
                          <div className=" text-sm text-[#cacaca] ">{`Select User Type`}</div>
                        }
                        options={(userTypeOption || [])?.map((e: any) => {
                          return {
                            value: e?.id,
                            label: e?.name,
                          };
                        })}
                        seUseType={seUseType}
                        setSeUseType={setSeUseType}
                        className={`w-[209px] h-[38px] z-[999] text-sm  rounded-lg !focus:border-[#cacaca] `}
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
                        disabled={false}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-2">Role</div>
                    {/* <input
                      id="user"
                      type="text"
                      name="use"
                      className={` pl-3 pr-3 py-2 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                      placeholder={`.......`}
                      autoFocus={true}
                    /> */}
                    <div className="relative">
                      <SearchIcon className=" text-[#DFE4EA] absolute top-[8px] right-[8px]" />
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm block p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder="Search Role"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-2">Start Date</div>
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
                          disabledText: "!text-[#cacaca] !dark:text-[#cacaca]",
                          input:
                            "w-full py-2 rounded-lg border-[1px] border-[#DFE4EA] dark:border-[#DFE4EA] outline-none bg-opacity-10 dark:bg-white focus:border-[#00ADEF] dark:focus:border-[#00ADEF] text-[#58585A] dark:text-[#58585A]", // Ensure both background and text colors are set
                          inputIcon: "",
                          selected:
                            "dark:bg-[#00ADEF] bg-[#00ADEF] dark:hover:bg-[#00ADEFa0] hover:bg-[#00ADEFa0]",
                        },
                        icons: {
                          prev: () => (
                            <span className="">
                              <ArrowBackIosIcon style={{ fontSize: "20px" }} />
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
                        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
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
                      <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3 ">
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
                  </div>
                  <div>
                    <div className="text-sm mb-2">End Date</div>
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
                          disabledText: "!text-[#cacaca] !dark:text-[#cacaca]",
                          input:
                            "w-full py-2 rounded-lg border-[1px] border-[#DFE4EA] dark:border-[#DFE4EA] outline-none bg-opacity-10 dark:bg-white focus:border-[#00ADEF] dark:focus:border-[#00ADEF] text-[#58585A] dark:text-[#58585A]", // Ensure both background and text colors are set
                          inputIcon: "",
                          selected:
                            "dark:bg-[#00ADEF] bg-[#00ADEF] dark:hover:bg-[#00ADEFa0] hover:bg-[#00ADEFa0]",
                        },
                        icons: {
                          prev: () => (
                            <span className="">
                              <ArrowBackIosIcon style={{ fontSize: "20px" }} />
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
                        weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
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
                          className=" fixed top-[0] left-0 w-[100vw] h-[100vh] bg-[#fffff] z-[1000]"
                          onClick={() => {
                            setShowEnd(false);
                          }}
                        ></div>
                      )}
                      <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3 z-[1000]">
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
                  </div>
                  <div className="rounded-lg bg-[#00ADEF] text-[#ffffff] grid items-center justify-center w-[38px] h-[38px] mt-auto cursor-pointer">
                    <SearchIcon />
                  </div>
                  <div className="rounded-lg bg-[#ffffff] text-[#00ADEF] border-[1px] border-[#00ADEF] grid items-center justify-center w-[38px] h-[38px] mt-auto cursor-pointer">
                    <RefreshIcon className="" />
                  </div>
                </div>
                <div className="relative shadow-md">
                  <div className=" h-[calc(100vh-450px)] overflow-y-auto block rounded-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-[#ffffff] uppercase bg-[#1473A1] sticky top-0 z-10">
                        <tr>
                          {/* <th scope="col" className="px-6 py-3 w-10">
                              #
                            </th> */}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "system"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "system"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              System
                              {sortBy === "system" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("system")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("system")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("system")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "userType"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "userType"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              User Type
                              {sortBy === "userType" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("userType")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("userType")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("userType")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "role"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "role"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              Roles
                              {sortBy === "role" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("role")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("role")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("role")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "level"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "level"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              Level
                              {sortBy === "level" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("level")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("level")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("level")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "startDate"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "startDate"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              Start Date
                              {sortBy === "startDate" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("startDate")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("startDate")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("startDate")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "endDate"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "endDate"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              End Date
                              {sortBy === "endDate" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("endDate")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("endDate")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("endDate")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "updateBy"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "updateBy"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              Update by
                              {sortBy === "updateBy" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("updateBy")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("updateBy")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("updateBy")}
                                />
                              )}
                              
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="">
                        {(dataState || []).map((item: any, ix: any) => {
                          return (
                            <tr
                              key={ix}
                              className="odd:bg-white even:bg-gray-50 border-b "
                            >
                              {/* <th
                                  scope="row"
                                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  {ix + 1 || "-"}
                                </th> */}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "system"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${!!item?.system && "px-6 py-4"}`}
                                >
                                  {item?.system || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "userType"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.userType && "px-6 py-4"
                                  }`}
                                >
                                  <div
                                    className={` text-center py-1 rounded-full`}
                                    style={{
                                      background: item?.userType?.color,
                                    }}
                                  >
                                    {item?.userType?.name || "-"}
                                  </div>
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "role"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.role && "px-6 py-4"
                                  } whitespace-nowrap`}
                                >
                                  {item?.role?.name || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "level"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${!!item?.level && "px-6 py-4"}`}
                                >
                                  {item?.level || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "startDate"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.startDate && "px-6 py-4"
                                  }`}
                                >
                                  {item?.startDate || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "endDate"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.endDate && "px-6 py-4"
                                  } text-[#1473A1]`}
                                >
                                  {item?.endDate || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "updateBy"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.updateBy && "px-6 py-4"
                                  }`}
                                >
                                  <div className=" text-[#7a7a7a]">
                                    {item?.updateBy?.name || "-"}
                                  </div>
                                  <div className=" text-[#9CA3AF] text-xs">
                                    {item?.updateBy?.date || "-"}
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
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
      {!!roleMnFlag && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] w-[90vw] h-[90vh]  ">
              <div className="p-[20px]">
                <div className="w-[100%] h-[50px] text-[#00ADEF] font-bold grid items-center">
                  {`Role - Role`}
                </div>
              </div>
              <div className="space-y-2 h-[calc(90vh-180px)] mx-[20px]">
                <div className=" h-[calc(100vh-360px)] overflow-y-auto block rounded-md">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-[#ffffff] uppercase bg-[#1473A1] sticky top-0 z-10">
                      <tr>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Main Menu
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Menu
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Sub Menu
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          View
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Create
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Edit
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Import
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Export
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {(permissions || []).length > 0 ? (
                        (permissions || []).map((item: any, ix: any) => {
                          let flagMainMenu: any = false;
                          let flagMenu: any = false;
                          permissions.forEach((eC: any, iC: any) => {
                            if (ix > iC && eC?.mainMenu === item?.mainMenu) {
                              flagMainMenu = true;
                              if (ix > iC && eC?.menu === item?.menu) {
                                flagMenu = true;
                              }
                            }
                            return eC;
                          });
                          let mainMenu: any = !!flagMainMenu
                            ? ""
                            : item?.mainMenu;
                          let menu: any = !!flagMenu ? "" : item?.menu;
                          let subMenu: any = item?.subMenu;

                          return (
                            <tr
                              key={ix}
                              className="odd:bg-white even:bg-gray-50 border-b "
                            >
                              <td className={`px-6 py-4`}>{`${mainMenu}`}</td>
                              <td className={`px-6 py-4`}>{`${menu}`}</td>
                              <td className={`px-6 py-4`}>{`${subMenu}`}</td>
                              <td className={`px-6 py-4`}>
                                {item?.view === "1" ? (
                                  <CheckBoxIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : item?.view === "0" ? (
                                  <CheckBoxOutlineBlankIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : (
                                  <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                                )}
                              </td>
                              <td className={`px-6 py-4`}>
                                {item?.create === "1" ? (
                                  <CheckBoxIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : item?.create === "0" ? (
                                  <CheckBoxOutlineBlankIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : (
                                  <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                                )}
                              </td>
                              <td className={`px-6 py-4`}>
                                {item?.edit === "1" ? (
                                  <CheckBoxIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : item?.edit === "0" ? (
                                  <CheckBoxOutlineBlankIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : (
                                  <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                                )}
                              </td>
                              <td className={`px-6 py-4`}>
                                {item?.import === "1" ? (
                                  <CheckBoxIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : item?.import === "0" ? (
                                  <CheckBoxOutlineBlankIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : (
                                  <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                                )}
                              </td>
                              <td className={`px-6 py-4`}>
                                {item?.export === "1" ? (
                                  <CheckBoxIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : item?.export === "0" ? (
                                  <CheckBoxOutlineBlankIcon className=" text-[#00ADEF] cursor-pointer" />
                                ) : (
                                  <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                                )}
                              </td>

                              <td className={`px-6 py-4`}>
                                {item?.manage ? (
                                  <ToggleOnIcon
                                    className=" text-[#00ADEF] cursor-pointer"
                                    style={{ fontSize: "32px" }}
                                  />
                                ) : (
                                  <ToggleOffIcon
                                    className=" text-[#DFE4EA] cursor-pointer"
                                    style={{ fontSize: "32px" }}
                                  />
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="odd:bg-white even:bg-gray-50 border-b ">
                          <td className={`px-6 py-4`}>{`-`}</td>
                          <td className={`px-6 py-4`}>{`-`}</td>
                          <td className={`px-6 py-4`}>{`-`}</td>
                          <td className={`px-6 py-4`}>
                            <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                          </td>
                          <td className={`px-6 py-4`}>
                            <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                          </td>
                          <td className={`px-6 py-4`}>
                            <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                          </td>
                          <td className={`px-6 py-4`}>
                            <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                          </td>
                          <td className={`px-6 py-4`}>
                            <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                          </td>
                          <td className={`px-6 py-4`}>
                            <DisabledByDefaultIcon className=" text-[#EFECEC] cursor-not-allowed" />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-[20px]">
                <div className="w-[100%] flex items-center justify-end gap-2 text-xs  h-[50px]">
                  <div
                    onClick={() => {
                      setRoleMnFlag(false);
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
