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
import Select, { components } from "react-select";
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
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import chroma from 'chroma-js';
import StraightIcon from '@mui/icons-material/Straight';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
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

const loginType:any = [
  {
    id:1,
    name:"Register",
    color:"#FFE2C8"
  },
  {
    id:2,
    name:"SSO",
    color:"#D4DEFF"
  },
]

const userStatus:any = [
  {
    id:1,
    name:"Acitive",
    color:"#22AD5C"
  },
  {
    id:2,
    name:"Wait for approve",
    color:"#FBBF24"
  },
  {
    id:3,
    name:"Not yet verified",
    color:"#A2A09F"
  },
  {
    id:4,
    name:"Rejected",
    color:"#ED1B24"
  },
]

const dataTemp: any = [
  {
    id: 1,
    userStatus:{
      id:2,
      name:"Wait for approve",
      color:"#FBBF24"
    },
    userId: "NGP-S16-001(PTT)",
    shipperCompanyName:"บริษัท ปตท. จำกัด (มหาชน)",
    userType:{
      id: 1,
      name: "Adminstrator",
      color: "#EEE4FF",
    },
    firstName:"Kanok",
    lastName:"xxxxx",
    role:[
      {
        id: 1,
        name: "Super Admin",
      },
      {
        id: 2,
        name: "Booking",
      }
    ],
    loginType:{
      id:1,
      name:"Register",
      color:"#FFE2C8"
    },
    telephone: "01234xxxxx",
    email: "xxx@gmail.com",
    startDate: "20/03/2024",
    endDate: "13/04/2024",
    note:{
      note:[
        {
          id:1,
          userBy:"Teera Songsan",
          remark:"ข้อมูลยังไม่ถูกต้องนะครับ"
        },
        {
          id:2,
          userBy:"Peera Dangda",
          remark:"ข้อมูลยังไม่ถูกต้องนะครับ"
        },
      ],
      reject:[
        {
          id:1,
          userBy:"Teera Songsan",
          remark:"ข้อมูลยังไม่ถูกต้องนะครับ"
        },
      ],
    },
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

const MySelectMulti = ({
  placeholder,
  options,
  state,
  setState,
  className,
  classNamePrefix,
  styles,
  disabled,
  filterOption,
}: any) => {
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  console.log(!!filterOption);
  return isMounted ? (
    disabled ? (
      <div className={`${className} border-[#DFE4EA] border-[1px]`}>
        {state}
      </div>
    ) : (
      <>
        {!!filterOption ? (
          <Select
            id={id}
            value={state}
            onChange={(value: any) => {
              setState(value);
            }}
            options={options}
            placeholder={placeholder}
            className={className}
            classNamePrefix={classNamePrefix}
            styles={styles}
            isMulti={true}
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
            hideSelectedOptions={false}
            components={{ ValueContainer: ({ children, hasValue, ...props }) => {
              if (!hasValue) {
                return (
                  // @ts-ignore
                  <components.ValueContainer {...props}>
                    {children}
                  </components.ValueContainer>
                );
              }
            
              const CHIPS_LIMIT = 1;
              const [chips, otherChildren]:any = children;
              const overflowCounter = chips.slice(CHIPS_LIMIT).length;
              const displayChips = chips.slice(overflowCounter, overflowCounter + CHIPS_LIMIT);
              console.log('children : ', children);
              console.log('chips : ', chips);
              console.log('otherChildren : ', otherChildren);
              console.log('overflowCounter : ', overflowCounter);
              console.log('displayChips : ', displayChips);
            
              return (
                // @ts-ignore
                <components.ValueContainer {...props}>
                  <div className=" flex items-center gap-2 whitespace-nowrap group relative">

                  {displayChips}
            
                  {overflowCounter > 0 && `+ ${overflowCounter}`}
            
                  {otherChildren}
                  
                  </div>
                </components.ValueContainer>
              );
            }
           }}
          />
        ) : (
          <Select
            id={id}
            value={state}
            onChange={(value: any) => {
              setState(value);
            }}
            isMulti={true}
            options={options}
            placeholder={placeholder}
            className={className}
            classNamePrefix={classNamePrefix}
            styles={styles}
            hideSelectedOptions={false}
            components={{ ValueContainer: ({ children, hasValue, ...props }) => {
              if (!hasValue) {
                return (
                  // @ts-ignore
                  <components.ValueContainer {...props}>
                    {children}
                  </components.ValueContainer>
                );
              }
            
              const CHIPS_LIMIT = 1;
              const [chips, otherChildren]:any = children;
              const overflowCounter = chips.slice(CHIPS_LIMIT).length;
              const displayChips = chips.slice(overflowCounter, overflowCounter + CHIPS_LIMIT);
              console.log('children : ', children);
              console.log('chips : ', chips);
              console.log('otherChildren : ', otherChildren);
              console.log('overflowCounter : ', overflowCounter);
              console.log('displayChips : ', displayChips);
            
              return (
                // @ts-ignore
                <components.ValueContainer {...props}>
                  <div className=" flex items-center gap-2 whitespace-nowrap group relative">

                  {displayChips}
            
                  {overflowCounter > 0 && `+ ${overflowCounter}`}
            
                  {otherChildren}
                  
                  </div>
                </components.ValueContainer>
              );
            }
           }}
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
  const [confirmEdit, setConfirmEdit] = useState(false)
  const [caseSave, setCaseSave] = useState(false);
  const [flagUser, setFlagUser] = useState(1)
  const [passHind, setPassHind] = useState(false);
  const [passConfHind, setPassConfHind] = useState(false);
  const [seRoleMulti, setSeRoleMulti] = useState([]);
  const [roleData, setRoleData] = useState<any>([])
  const [flagNote, setFlagNote] = useState(1)
  const [viewNote, setViewNote] = useState(false)
  const [viewStatus, setViewStatus] = useState(false)
  const [viewRole, setViewRole] = useState(false)

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
    if(!!!dataUse?.shipperId){
      // 
      setDataUseVaridate((pre: any) => ({
        ...pre,
        shipperId: true,
      }));
    }else{
      setDataUseVaridate((pre: any) => ({
        ...pre,
        shipperId: false,
      }));
      
      setFlagActive(0);
      setViewFlag(false);
    }
  };

  const getRoleApi = async () => {
    setRoleData(Roles)
  }

  useEffect(() => {
    console.log('roleData : ', roleData);
  }, [roleData])

  useEffect(() => {
    console.log('seRoleMulti : ', seRoleMulti);
  }, [seRoleMulti])
  

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
    getRoleApi()
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
      if (sortBy === "shipperId") {
        return sortOrder === "asc"
          ? ((!!a.shipperId && String(a.shipperId)) || "").localeCompare(
              (!!b.shipperId && String(b.shipperId)) || ""
            )
          : ((!!b.shipperId && String(b.shipperId)) || "").localeCompare(
              (!!a.shipperId && String(a.shipperId)) || ""
            );
      } else if (sortBy === "userStatus") {
        return sortOrder === "asc"
          ? (
              (!!a.userStatus?.name && String(a.userStatus?.name)) ||
              ""
            ).localeCompare(
              (!!b.userStatus?.name && String(b.userStatus?.name)) || ""
            )
          : (
              (!!b.userStatus?.name && String(b.userStatus?.name)) ||
              ""
            ).localeCompare(
              (!!a.userStatus?.name && String(a.userStatus?.name)) || ""
            );
      }  else if (sortBy === "userId") {
        return sortOrder === "asc"
          ? (
              (!!a.userId && String(a.userId)) ||
              ""
            ).localeCompare(
              (!!b.userId && String(b.userId)) || ""
            )
          : (
              (!!b.userId && String(b.userId)) ||
              ""
            ).localeCompare(
              (!!a.userId && String(a.userId)) || ""
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
      } else if (sortBy === "firstName") {
        return sortOrder === "asc"
          ? ((!!a.firstName && String(a.firstName)) || "").localeCompare(
              (!!b.firstName && String(b.firstName)) || ""
            )
          : ((!!b.firstName && String(b.firstName)) || "").localeCompare(
              (!!a.startDate && String(a.startDate)) || ""
            );
      } else if (sortBy === "lastName") {
        return sortOrder === "asc"
          ? ((!!a.lastName && String(a.lastName)) || "").localeCompare(
              (!!b.lastName && String(b.lastName)) || ""
            )
          : ((!!b.lastName && String(b.lastName)) || "").localeCompare(
              (!!a.lastName && String(a.lastName)) || ""
            );
      } else if (sortBy === "loginType") {
        return sortOrder === "asc"
          ? (
              (!!a.loginType?.name && String(a.loginType?.name)) ||
              ""
            ).localeCompare(
              (!!b.loginType?.name && String(b.loginType?.name)) || ""
            )
          : (
              (!!b.loginType?.name && String(b.loginType?.name)) ||
              ""
            ).localeCompare(
              (!!a.loginType?.name && String(a.loginType?.name)) || ""
            );
      } else if (sortBy === "telephone") {
        return sortOrder === "asc"
          ? ((!!a.telephone && String(a.telephone)) || "").localeCompare(
              (!!b.telephone && String(b.telephone)) || ""
            )
          : ((!!b.telephone && String(b.telephone)) || "").localeCompare(
              (!!a.telephone && String(a.telephone)) || ""
            );
      } else if (sortBy === "email") {
        return sortOrder === "asc"
          ? ((!!a.email && String(a.email)) || "").localeCompare(
              (!!b.email && String(b.email)) || ""
            )
          : ((!!b.email && String(b.email)) || "").localeCompare(
              (!!a.email && String(a.email)) || ""
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
  // userStatus
  useEffect(() => {
    let filter = dataStateTemp.filter((f: any) => {
      return (
        ((f?.userStatus?.name && String(f?.userStatus?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.shipperId && String(f?.shipperId)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.userId && String(f?.userId)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.userType?.name && String(f?.userType?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.firstName && String(f?.firstName)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.lastName && String(f?.lastName)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.loginType?.name && String(f?.loginType?.name)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.telephone && String(f?.telephone)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.email && String(f?.email)) || "")
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

  const [password, setPassword] = useState("");
  const [countLeast, setCountLeast] = useState([false, false, false, false]);
  const [flagPass, setFlagPass] = useState(false);
  const [infoShow, setInfoShow] = useState(false);


  function containsNumbers(input: any) {
    return /[0-9]/.test(input);
  }

  function containsLowercase(input: any) {
    return /[a-z]/.test(input);
  }

  function containsUppercase(input: any) {
    return /[A-Z]/.test(input);
  }

  function containsSpecialCharacters(input: any) {
    return /[!@#$%^&*()]/.test(input);
  }

  useEffect(() => {
    setCountLeast([
      containsNumbers(password),
      containsLowercase(password),
      containsUppercase(password),
      containsSpecialCharacters(password),
    ]);
  }, [password]);

  useEffect(() => {
    if (password.length >= 10) {
      setFlagPass(true);
    } else {
      setFlagPass(false);
    }
  }, [password]);

  useEffect(() => {
    getInitData();
    return () => {};
  }, []);

  return (
    <>
      <div className="p-2 space-y-2">
        <div className=" p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm flex items-center gap-2">

        <div>
            <div className="text-sm mb-2">User ID</div>
            <div className="relative">
              <SearchIcon className=" text-[#DFE4EA] absolute top-[8px] right-[8px]" />
              <input
                type="text"
                id="table-searchss"
                className={`text-sm block p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                placeholder="Search User ID"
              />
            </div>
          </div>

        <div>
            <div className="text-sm mb-2">Name</div>
            <div className="relative">
              <SearchIcon className=" text-[#DFE4EA] absolute top-[8px] right-[8px]" />
              <input
                type="text"
                id="table-search"
                className={`text-sm block p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                placeholder="Search Name"
              />
            </div>
          </div>

          <div>
            <div className="text-sm mb-2">User Type</div>
            <MySelect
              placeholder={
                <div className=" text-sm text-[#cacaca] ">{`Select User Type`}</div>
              }
              options={userTypeOption}
              seUseType={seUseType}
              setSeUseType={setSeUseType}
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


          <div className="mt-auto">
            <DateRang />
          </div>
          <div>
            <div className="text-sm mb-2">Login Type</div>
            <MySelect
              placeholder={
                <div className=" text-sm text-[#cacaca] ">{`Select Login Type`}</div>
              }
              options={userTypeOption}
              seUseType={seUseType}
              setSeUseType={setSeUseType}
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
        
          <div className="rounded-lg bg-[#00ADEF] text-[#ffffff] grid items-center justify-center w-[38px] h-[38px] px-2 mt-auto cursor-pointer">
            <SearchIcon />
          </div>
          <div className="rounded-lg bg-[#ffffff] text-[#00ADEF] border-[1px] border-[#00ADEF] grid items-center justify-center w-[38px] h-[38px] px-2 mt-auto cursor-pointer">
            <RefreshIcon className="" />
          </div>
          <div
            onClick={() => {
              setFlagActive(1);
              setViewFlag(true);
            }}
            className="rounded-lg bg-[#00ADEF] text-[#ffffff] w-[150px] px-2 flex gap-2 items-center justify-center h-[38px] mt-auto ml-auto text-sm cursor-pointer"
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
                              .map((e: any) => hasAgeKey(e, "userStatus"))
                              .find((f: any) => {
                                return f === true;
                              }) ? (
                              <CheckBoxIcon
                                className=" cursor-pointer text-[#1473A1]"
                                onClick={() => {
                                  setDataState((pre: any) => {
                                    let newArr = pre.map((obj: any) => {
                                      let newObj = { ...obj };
                                      delete newObj.userStatus;
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
                                      newObj.userStatus =
                                        fil["userStatus"];
                                      return newObj;
                                    });
                                    return newArr;
                                  });
                                }}
                              />
                            )}

                            <div className=" whitespace-nowrap">{`User Status`}</div>
                          </div>
                        </div>
                      <div className="grid">
                          <div className="flex items-center gap-2">
                            {!!dataState
                              .map((e: any) => hasAgeKey(e, "userId"))
                              .find((f: any) => {
                                return f === true;
                              }) ? (
                              <CheckBoxIcon
                                className=" cursor-pointer text-[#1473A1]"
                                onClick={() => {
                                  setDataState((pre: any) => {
                                    let newArr = pre.map((obj: any) => {
                                      let newObj = { ...obj };
                                      delete newObj.userId;
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
                                      newObj.userId =
                                        fil["userId"];
                                      return newObj;
                                    });
                                    return newArr;
                                  });
                                }}
                              />
                            )}

                            <div className=" whitespace-nowrap">{`User ID`}</div>
                          </div>
                        </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "shipperCompanyName"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.shipperCompanyName;
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
                                    newObj.shipperCompanyName =
                                      fil["shipperCompanyName"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}

                          <div className=" whitespace-nowrap">{`Shipper Company Name`}</div>
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
                            .map((e: any) => hasAgeKey(e, "firstName"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.firstName;
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
                                    newObj.firstName = fil["firstName"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">First Name</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "lastName"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.lastName;
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
                                    newObj.lastName = fil["lastName"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">Last Name</div>
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
                          <div className=" whitespace-nowrap">Role</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "loginType"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.loginType;
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
                                    newObj.loginType = fil["loginType"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">Login Type</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "telephone"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.telephone;
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
                                    newObj.telephone = fil["telephone"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}

                          <div className=" whitespace-nowrap">{`Telephone`}</div>
                        </div>
                      </div>
                      <div className="grid">
                        <div className="flex items-center gap-2">
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "email"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.email;
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
                                    newObj.email = fil["email"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}

                          <div className=" whitespace-nowrap">{`Email`}</div>
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
                            .map((e: any) => hasAgeKey(e, "note"))
                            .find((f: any) => {
                              return f === true;
                            }) ? (
                            <CheckBoxIcon
                              className=" cursor-pointer text-[#1473A1]"
                              onClick={() => {
                                setDataState((pre: any) => {
                                  let newArr = pre.map((obj: any) => {
                                    let newObj = { ...obj };
                                    delete newObj.note;
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
                                    newObj.note = fil["note"];
                                    return newObj;
                                  });
                                  return newArr;
                                });
                              }}
                            />
                          )}
                          <div className=" whitespace-nowrap">Note</div>
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
                    id="table-searchs"
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
                  {/* userStatus */}
                  {!!dataState
                      .map((e: any) => hasAgeKey(e, "userStatus"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "userStatus"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        User Status
                        {sortBy === "userStatus" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("userStatus")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("userStatus")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("userStatus")}
                          />
                        )}
                        
                      </th>
                    )}
                  {!!dataState
                      .map((e: any) => hasAgeKey(e, "userId"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "userId"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        {`User ID`}
                        {sortBy === "userId" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("userId")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("userId")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("userId")}
                          />
                        )}
                        
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "shipperCompanyName"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "shipperCompanyName"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        {`Shipper Company Name`}
                        {sortBy === "shipperCompanyName" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("shipperCompanyName")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("shipperCompanyName")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("shipperCompanyName")}
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
                      .map((e: any) => hasAgeKey(e, "firstName"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "firstName"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        First Name
                        {sortBy === "firstName" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("firstName")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("firstName")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("firstName")}
                          />
                        )}
                        
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "lastName"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "lastName"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        Last Name
                        {sortBy === "lastName" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("lastName")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("lastName")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("lastName")}
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
                        Role
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "loginType"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "loginType"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        Login Type
                        {sortBy === "loginType" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("loginType")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("loginType")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("loginType")}
                          />
                        )}
                        
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "telephone"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "telephone"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        {`Telephone`}
                        {sortBy === "telephone" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("telephone")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("telephone")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("telephone")}
                          />
                        )}
                        
                      </th>
                    )}
                    {!!dataState
                      .map((e: any) => hasAgeKey(e, "email"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "email"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        {`Email`}
                        {sortBy === "email" ? (
                          sortOrder === "asc" ? (
                            <NorthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("email")}
                            />
                          ) : (
                            <SouthIcon
                              className=" cursor-pointer"
                              onClick={() => handleSort("email")}
                            />
                          )
                        ) : (
                          <ImportExportIcon
                            className=" cursor-pointer"
                            onClick={() => handleSort("email")}
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
                      .map((e: any) => hasAgeKey(e, "note"))
                      .find((f: any) => {
                        return f === true;
                      }) && (
                      <th
                        scope="col"
                        className={`${
                          !!dataState
                            .map((e: any) => hasAgeKey(e, "note"))
                            .find((f: any) => {
                              return f === true;
                            }) && "px-6 py-3"
                        } whitespace-nowrap`}
                      >
                        Note
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
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "userStatus"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.userStatus && "px-6 py-4"}`}>
                            <div
                              className={` text-center py-1 rounded-full whitespace-nowrap px-2`}
                              style={{ background: item?.userStatus?.color }}
                            >
                              {item?.userStatus?.name || "-"}
                            </div>
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "userId"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td
                            className={`${
                              !!item?.userId && "px-6 py-4"
                            } whitespace-nowrap`}
                          >
                            {item?.userId || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "shipperCompanyName"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td
                            className={`${
                              !!item?.shipperCompanyName && "px-6 py-4"
                            } whitespace-nowrap`}
                          >
                            {item?.shipperCompanyName || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "userType"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.userType && "px-6 py-4"}`}>
                            <div
                              className={` text-center py-1 rounded-full whitespace-nowrap px-2`}
                              style={{ background: item?.userType?.color }}
                            >
                              {item?.userType?.name || "-"}
                            </div>
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "firstName"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td
                            className={`${
                              !!item?.firstName && "px-6 py-4"
                            } whitespace-nowrap`}
                          >
                            {item?.firstName || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "lastName"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td
                            className={`${
                              !!item?.lastName && "px-6 py-4"
                            } whitespace-nowrap`}
                          >
                            {item?.lastName || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "role"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.role && "px-6 py-4"}`}>
                            <div className=" w-fit relative">
                              <GroupIcon
                                className=" cursor-pointer"
                                onClick={() => {
                                  setViewRole(true);
                                }}
                              />
                              <div className=" absolute top-[-10px] right-[-10px] bg-[#00ADEF] min-w-[20px] h-[20px] grid items-center justify-center text-white rounded-full text-sm">{item?.note?.note.length || 0}</div>
                            </div>
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "loginType"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.loginType && "px-6 py-4"}`}>
                            <div
                              className={` text-center py-1 rounded-full whitespace-nowrap px-2`}
                              style={{ background: item?.loginType?.color }}
                            >
                              {item?.loginType?.name || "-"}
                            </div>
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "telephone"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td
                            className={`${
                              !!item?.telephone && "px-6 py-4"
                            } whitespace-nowrap`}
                          >
                            {item?.telephone || "-"}
                          </td>
                        )}
                        {!!dataState
                          .map((e: any) => hasAgeKey(e, "email"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td
                            className={`${
                              !!item?.email && "px-6 py-4"
                            } whitespace-nowrap`}
                          >
                            {item?.email || "-"}
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
                          .map((e: any) => hasAgeKey(e, "note"))
                          .find((f: any) => {
                            return f === true;
                          }) && (
                          <td className={`${!!item?.note && "px-6 py-4"}`}>
                            <div className=" w-fit relative">
                              <CommentIcon
                                className=" cursor-pointer"
                                onClick={() => {
                                  setViewNote(true);
                                }}
                              />
                              <div className=" absolute top-[-10px] right-[-10px] bg-[#00ADEF] min-w-[20px] h-[20px] grid items-center justify-center text-white rounded-full text-sm">{item?.note?.note.length || 0}</div>
                            </div>
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
                                  setFlagUser(2)
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
                              <div
                                onClick={() => {
                                  setViewStatus(true)
                                  onActiveCloseAll();
                                }}
                                className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 p-3"
                              >
                                <CheckCircleIcon />
                                <div className=" whitespace-nowrap">{`Update User Status`}</div>
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
                } User`}
              </div>
              <div>
                <div className=" my-5 flex items-center gap-2 text-sm">
                  <div className={`${flagUser === 1 ? "text-[#00ADEF] border-b-[1px] border-[#00ADEF] font-bold " : " "} ${flagActive !== 3  ? "cursor-pointer" : " cursor-not-allowed"}`} onClick={()=>{
                    flagActive !== 3 && setFlagUser(1)
                    }}>{`Shipper`}</div>
                  <div className={`${flagUser === 2 ? "text-[#00ADEF] border-b-[1px] border-[#00ADEF] font-bold " : " "} ${flagActive !== 3  ? "cursor-pointer" : " cursor-not-allowed"}`}onClick={()=>{flagActive !== 3 && setFlagUser(2)}}>{`Operator/Admin`}</div>
                </div>
                {/*  */}
                {
                  flagUser === 1 ?
                  <>
                  <div className=" space-y-3 my-5">
                  <div className=" grid grid-cols-3 gap-3">
                    <div>
                        <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`Shipper Company Name`}
                        </div>
                        <MySelect
                          placeholder={
                            <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select Shipper Company Name`}</div>
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
                      <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>
                        {`First Name`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`First Name`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                        value={dataUse?.shipperId}
                        onChange={(e) => {
                          setDataUseVaridate((pre: any) => ({
                            ...pre,
                            shipperId: false,
                          }));
                          setDataUse((pre: any) => ({
                            ...pre,
                            shipperId: e?.target?.value,
                          }));
                        }}
                      />
                      </div>
                      {
                        dataUseVaridate?.shipperId &&
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your shipper id`}</div>
                      }
                    </div>
                    <div>
                      <div className="text-sm mb-2">
                        <span className=" text-[#ED1B24]">{`*`}</span>Last Name
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Last Name`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                  </div>
                  <div className=" grid grid-cols-3 gap-3">
                    <div>
                        <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`Role`}
                        </div>
                        <MySelectMulti
                          placeholder={
                            <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select Role`}</div>
                          }
                          // options={userTypeOption}
                          options={
                              (roleData || [])?.map((e: any) => {
                              return {
                                value: e?.id,
                                searchCus: e?.name,
                                label: (
                                  <div className=" flex items-center gap-2 text-sm">
                                    {`${e?.name}`}
                                  </div>
                                ),
                              };
                            })
                          }
                          state={seRoleMulti}
                          setState={setSeRoleMulti}
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
                            // option: (styles:any, { data, isDisabled, isFocused, isSelected }:any) => {
                            //   console.log("styles : ", styles);
                            //   console.log("data : ", data);
                            //   console.log("isDisabled : ", isDisabled);
                            //   console.log("isFocused : ", isFocused);
                            //   console.log("isSelected : ", isSelected);

                            //   const color = chroma("#DFE4EA");
                            //   return {
                            //     ...styles,
                            //     backgroundColor: isDisabled
                            //       ? undefined
                            //       : isSelected
                            //       ? "#DFE4EA"
                            //       : isFocused
                            //       ? color.alpha(0.1).css()
                            //       : undefined,
                            //     color: isDisabled
                            //       ? '#ccc'
                            //       : isSelected
                            //       ? chroma.contrast(color, 'white') > 2
                            //         ? 'white'
                            //         : 'black'
                            //       : "#DFE4EA",
                            //     cursor: isDisabled ? 'not-allowed' : 'default',
                          
                            //     ':active': {
                            //       ...styles[':active'],
                            //       backgroundColor: !isDisabled
                            //         ? isSelected
                            //           ? "#DFE4EA"
                            //           : color.alpha(0.3).css()
                            //         : undefined,
                            //     },
                            //   };
                            // },
                            // multiValue: (styles:any, { data }:any) => {
                            //   const color = chroma("#DFE4EA");
                            //   return {
                            //     ...styles,
                            //     backgroundColor: color.alpha(0.1).css(),
                            //   };
                            // },
                            // multiValueLabel: (styles:any, { data }:any) => ({
                            //   ...styles,
                            //   color: "#DFE4EA",
                            // }),
                            // multiValueRemove: (styles:any, { data }:any) => ({
                            //   ...styles,
                            //   color: "#DFE4EA",
                            //   ':hover': {
                            //     backgroundColor: "#DFE4EA",
                            //     color: 'white',
                            //   },
                            // }),
                          }}
                          disabled={(flagActive === 2 && true) || false}
                          filterOption={true}
                        />
                      </div>
                    <div>
                      <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>
                        {`Email`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Email`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                        value={dataUse?.shipperId}
                        onChange={(e) => {
                          setDataUseVaridate((pre: any) => ({
                            ...pre,
                            shipperId: false,
                          }));
                          setDataUse((pre: any) => ({
                            ...pre,
                            shipperId: e?.target?.value,
                          }));
                        }}
                      />
                      </div>
                      {
                        dataUseVaridate?.shipperId &&
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your shipper id`}</div>
                      }
                    </div>
                    <div>
                      <div className="text-sm mb-2">
                        {`User ID`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`User ID`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                  </div>
                  <div className=" grid grid-cols-3 gap-3">
                    <div>
                        <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`Password`}
                        </div>

                        <div className=" relative">

                        {!passHind ? (
                          <div className=" relative">
                            <input
                            id="password"
                            type="password"
                            name="password"
                            className={`w-full pl-3 pr-[40px] py-2 h-[38px] text-sm rounded-lg border-[1px] bg-white  ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                            placeholder={`New Password`}
                            value={password}
                              onChange={(e) => {
                                setInfoShow(true);
                                setPassword(e.target.value);
                              }}
                              style={{
                                background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                              }}
                              disabled={(flagActive === 2 && true) || false}
                          />
                            <VisibilityOffIcon
                              className=" absolute top-[7px] right-[12px] text-gray-500 cursor-pointer"
                              onClick={() => {
                                setPassHind((pre: any) => !pre);
                              }}
                            />
                          </div>
                        ) : (
                          <div className=" relative">
                            <input
                              id="password"
                              type="text"
                              name="password"
                              className={`w-full pl-3 pr-[40px] py-2 h-[38px] rounded-lg border-[1px] text-sm bg-white ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                              placeholder={`New Password`}
                              value={password}
                              onChange={(e) => {
                                setInfoShow(true);
                                setPassword(e.target.value);
                              }}
                              style={{
                                background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                              }}
                              disabled={(flagActive === 2 && true) || false}
                            />
                            <VisibilityIcon
                            onClick={() => {
                              setPassHind((pre: any) => !pre);
                            }}
                            className=" absolute top-[7px] right-[12px] text-[#949599] cursor-pointer"
                          />
                          </div>
                        )}
                        {password.length > 0 && !!infoShow && (
                          <div className=" absolute bottom-[60px] right-0">
                            <div className=" relative">
                              <div
                                className={` bg-[#ededed] text-gray-600 p-2 text-[12px] rounded-md`}
                              >
                                <div className="flex justify-between items-center">
                                  <div>Our minimum requirements:</div>
                                  <div
                                    className={`cursor-pointer`}
                                    onClick={() => {
                                      setInfoShow(false);
                                    }}
                                  >
                                    x
                                  </div>
                                </div>
                                <div className=" flex items-center gap-2">
                                  <CheckCircleIcon
                                    className={`${
                                      password.length >= 10
                                        ? "text-green-500"
                                        : "text-gray-500"
                                    }`}
                                  />
                                  At least 10 character(s)
                                </div>
                                <div className=" flex items-center gap-2">
                                  <CheckCircleIcon
                                    className={`${
                                      (countLeast || []).filter((value) => value)
                                        .length === 4
                                        ? "text-green-500"
                                        : "text-gray-500"
                                    }`}
                                  />
                                  {`Using characters from at least 4 of the following types:`}
                                </div>
                                <div
                                  className={`flex gap-2 items-center ml-8 ${
                                    !!countLeast[0] && "text-green-500"
                                  }`}
                                >
                                  <FiberManualRecordIcon
                                    className=""
                                    style={{ fontSize: "10px" }}
                                  />
                                  {`numbers[0-9]`}
                                </div>
                                <div
                                  className={`flex gap-2 items-center ml-8 ${
                                    !!countLeast[1] && "text-green-500"
                                  }`}
                                >
                                  <FiberManualRecordIcon
                                    className=""
                                    style={{ fontSize: "10px" }}
                                  />
                                  {`lowercase letters[a-z]`}
                                </div>
                                <div
                                  className={`flex gap-2 items-center ml-8 ${
                                    !!countLeast[2] && "text-green-500"
                                  }`}
                                >
                                  <FiberManualRecordIcon
                                    className=""
                                    style={{ fontSize: "10px" }}
                                  />
                                  {`uppercase letters[A-Z]`}
                                </div>
                                <div
                                  className={`flex gap-2 items-center ml-8 ${
                                    !!countLeast[3] && "text-green-500"
                                  }`}
                                >
                                  <FiberManualRecordIcon
                                    className=""
                                    style={{ fontSize: "10px" }}
                                  />
                                  {`special characters[!@#$,^ etc]`}
                                </div>
                                <div className={`grid grid-cols-[4fr,1fr]`}>
                                  <div
                                    className={`h-[10px] border-[1px] bg-gray-300 rounded-full mt-2 w-[100%]`}
                                  >
                                    <div
                                      className={`h-[100%] rounded-full ${
                                        (countLeast || []).filter((value) => value)
                                          .length === 1
                                          ? " bg-red-500 w-[25%]"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 2
                                          ? " bg-orange-500 w-[50%]"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 3
                                          ? " bg-yellow-500 w-[75%]"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 4
                                          ? " bg-green-500 w-[100%]"
                                          : "bg-gray-300 w-[0%]"
                                      } `}
                                    ></div>
                                  </div>
                                  <div className="text-center">
                                    <span
                                      className={` ${
                                        (countLeast || []).filter((value) => value)
                                          .length === 1
                                          ? " text-red-500"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 2
                                          ? " text-orange-500"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 3
                                          ? " text-yellow-500"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 4
                                          ? " text-green-500"
                                          : "text-gray-300"
                                      }`}
                                    >
                                      {(countLeast || []).filter((value) => value)
                                        .length === 1
                                        ? "Very Weak"
                                        : (countLeast || []).filter((value) => value)
                                            .length === 2
                                        ? "Weak"
                                        : (countLeast || []).filter((value) => value)
                                            .length === 3
                                        ? "Good"
                                        : (countLeast || []).filter((value) => value)
                                            .length === 4
                                        ? "Strong"
                                        : ""}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className=" absolute right-3 w-0 h-0 
                    border-l-[10px] border-l-transparent
                    border-t-[15px] border-t-[#ededed]
                    border-r-[10px] border-r-transparent"
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {
                        dataUseVaridate?.shipperId &&
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your shipper id`}</div>
                      }

                      </div>
                    <div>
                      <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>
                        {`Confirm Password`}
                      </div>
                      {!passConfHind ? (
                          <div className=" relative">
                            <input
                              id="passwordConf"
                              type="password"
                              name="passwordConf"
                              className={`w-full pl-3 pr-[40px] py-2 h-[38px] rounded-lg border-[1px] text-sm bg-white ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                              placeholder={`Confirm New Password`}
                              style={{
                                background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                              }}
                              disabled={(flagActive === 2 && true) || false}
                            />
                            <VisibilityOffIcon
                              onClick={() => {
                                setPassConfHind((pre: any) => !pre);
                              }}
                              className=" absolute top-[7px] right-[12px] text-[#949599] cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div className=" relative">
                            <input
                              id="passwordConf"
                              type="text"
                              name="passwordConf"
                              className={`w-full pl-3 pr-[40px] py-2 h-[38px] rounded-lg border-[1px] text-sm bg-white ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                              placeholder={`Confirm New Password`}
                              style={{
                                background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                              }}
                              disabled={(flagActive === 2 && true) || false}
                            />
                            <VisibilityIcon
                              onClick={() => {
                                setPassConfHind((pre: any) => !pre);
                              }}
                              className=" absolute top-[7px] right-[12px] text-[#949599] cursor-pointer"
                            />
                          </div>
                        )}
                      
                      </div>
                      {
                        dataUseVaridate?.shipperId &&
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your shipper id`}</div>
                      }
                    </div>
                    <div>
                      <div className="text-sm mb-2">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`Telephone`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Telephone`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                  </div>
                  <div className=" grid grid-cols-3 gap-3">
                    <div>
                      <div className="text-sm mb-2">
                        {`FAX`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`FAX`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                    <div>
                      <div className="text-sm mb-2">
                        {`Address`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Address`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                    <div>
                      <div className="text-sm mb-2 text-[#ffffffff]">
                        {`-`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Fill in one Province, District, Subdistrict or Postal`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                  </div>
                  
               

                  <div className=" grid grid-cols-3 gap-3">
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
                          <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3">
                            <input
                              id="sss"
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
                      <div className="text-sm mb-2 text-[#58585A]">End Date</div>
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
                  <div className=" grid grid-cols-1 gap-3">
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        {`Note`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Note`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                  </div>
                  </div>
                  <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                    {flagActive === 1 ? (
                      <>
                        <div
                          onClick={() => {
                            setFlagUser(1)
                            setFlagActive(0);
                            setViewFlag(false);
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                        >
                          {`Cancel`}
                        </div>
                        <div
                          onClick={() => {
                            setFlagUser(1)
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
                            setFlagUser(1)
                            setFlagActive(0);
                            setViewFlag(false);
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                        >
                          {`Cancel`}
                        </div>
                        <div
                          onClick={() => {
                            setFlagUser(1)
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
                          setFlagUser(1)
                          setFlagActive(0);
                          setViewFlag(false);
                        }}
                        className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                      >
                        {`Close`}
                      </div>
                    )}
                  </div>
                  </>
                  : flagUser === 2 ?
                  <>
                  <div className=" space-y-3 my-5">
                  <div className=" grid grid-cols-3 gap-3">
                    <div>
                        <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`Operator ID`}
                        </div>
                        <MySelect
                          placeholder={
                            <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select Operator ID`}</div>
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
                      <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>
                        {`First Name`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`First Name`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                        value={dataUse?.shipperId}
                        onChange={(e) => {
                          setDataUseVaridate((pre: any) => ({
                            ...pre,
                            shipperId: false,
                          }));
                          setDataUse((pre: any) => ({
                            ...pre,
                            shipperId: e?.target?.value,
                          }));
                        }}
                      />
                      </div>
                      {
                        dataUseVaridate?.shipperId &&
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your shipper id`}</div>
                      }
                    </div>
                    <div>
                      <div className="text-sm mb-2">
                        <span className=" text-[#ED1B24]">{`*`}</span>Last Name
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Last Name`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                  </div>
                  <div className=" grid grid-cols-3 gap-3">
                  <div>
                      <div className="text-sm mb-2">
                        {`Division`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Division`}
                        style={{
                          background: "#EFECEC",
                        }}
                        disabled={true}
                      />
                    </div>
                    <div>
                        <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`User Type`}
                        </div>
                        <MySelectMulti
                          placeholder={
                            <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select User Type`}</div>
                          }
                          // options={userTypeOption}
                          options={
                              (roleData || [])?.map((e: any) => {
                              return {
                                value: e?.id,
                                searchCus: e?.name,
                                label: (
                                  <div className=" flex items-center gap-2 text-sm">
                                    {`${e?.name}`}
                                  </div>
                                ),
                              };
                            })
                          }
                          state={seRoleMulti}
                          setState={setSeRoleMulti}
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
                            // option: (styles:any, { data, isDisabled, isFocused, isSelected }:any) => {
                            //   console.log("styles : ", styles);
                            //   console.log("data : ", data);
                            //   console.log("isDisabled : ", isDisabled);
                            //   console.log("isFocused : ", isFocused);
                            //   console.log("isSelected : ", isSelected);

                            //   const color = chroma("#DFE4EA");
                            //   return {
                            //     ...styles,
                            //     backgroundColor: isDisabled
                            //       ? undefined
                            //       : isSelected
                            //       ? "#DFE4EA"
                            //       : isFocused
                            //       ? color.alpha(0.1).css()
                            //       : undefined,
                            //     color: isDisabled
                            //       ? '#ccc'
                            //       : isSelected
                            //       ? chroma.contrast(color, 'white') > 2
                            //         ? 'white'
                            //         : 'black'
                            //       : "#DFE4EA",
                            //     cursor: isDisabled ? 'not-allowed' : 'default',
                          
                            //     ':active': {
                            //       ...styles[':active'],
                            //       backgroundColor: !isDisabled
                            //         ? isSelected
                            //           ? "#DFE4EA"
                            //           : color.alpha(0.3).css()
                            //         : undefined,
                            //     },
                            //   };
                            // },
                            // multiValue: (styles:any, { data }:any) => {
                            //   const color = chroma("#DFE4EA");
                            //   return {
                            //     ...styles,
                            //     backgroundColor: color.alpha(0.1).css(),
                            //   };
                            // },
                            // multiValueLabel: (styles:any, { data }:any) => ({
                            //   ...styles,
                            //   color: "#DFE4EA",
                            // }),
                            // multiValueRemove: (styles:any, { data }:any) => ({
                            //   ...styles,
                            //   color: "#DFE4EA",
                            //   ':hover': {
                            //     backgroundColor: "#DFE4EA",
                            //     color: 'white',
                            //   },
                            // }),
                          }}
                          disabled={(flagActive === 2 && true) || false}
                          filterOption={true}
                        />
                      </div>
                    <div>
                        <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`Role`}
                        </div>
                        <MySelectMulti
                          placeholder={
                            <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select Role`}</div>
                          }
                          // options={userTypeOption}
                          options={
                              (roleData || [])?.map((e: any) => {
                              return {
                                value: e?.id,
                                searchCus: e?.name,
                                label: (
                                  <div className=" flex items-center gap-2 text-sm">
                                    {`${e?.name}`}
                                  </div>
                                ),
                              };
                            })
                          }
                          state={seRoleMulti}
                          setState={setSeRoleMulti}
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
                            // option: (styles:any, { data, isDisabled, isFocused, isSelected }:any) => {
                            //   console.log("styles : ", styles);
                            //   console.log("data : ", data);
                            //   console.log("isDisabled : ", isDisabled);
                            //   console.log("isFocused : ", isFocused);
                            //   console.log("isSelected : ", isSelected);

                            //   const color = chroma("#DFE4EA");
                            //   return {
                            //     ...styles,
                            //     backgroundColor: isDisabled
                            //       ? undefined
                            //       : isSelected
                            //       ? "#DFE4EA"
                            //       : isFocused
                            //       ? color.alpha(0.1).css()
                            //       : undefined,
                            //     color: isDisabled
                            //       ? '#ccc'
                            //       : isSelected
                            //       ? chroma.contrast(color, 'white') > 2
                            //         ? 'white'
                            //         : 'black'
                            //       : "#DFE4EA",
                            //     cursor: isDisabled ? 'not-allowed' : 'default',
                          
                            //     ':active': {
                            //       ...styles[':active'],
                            //       backgroundColor: !isDisabled
                            //         ? isSelected
                            //           ? "#DFE4EA"
                            //           : color.alpha(0.3).css()
                            //         : undefined,
                            //     },
                            //   };
                            // },
                            // multiValue: (styles:any, { data }:any) => {
                            //   const color = chroma("#DFE4EA");
                            //   return {
                            //     ...styles,
                            //     backgroundColor: color.alpha(0.1).css(),
                            //   };
                            // },
                            // multiValueLabel: (styles:any, { data }:any) => ({
                            //   ...styles,
                            //   color: "#DFE4EA",
                            // }),
                            // multiValueRemove: (styles:any, { data }:any) => ({
                            //   ...styles,
                            //   color: "#DFE4EA",
                            //   ':hover': {
                            //     backgroundColor: "#DFE4EA",
                            //     color: 'white',
                            //   },
                            // }),
                          }}
                          disabled={(flagActive === 2 && true) || false}
                          filterOption={true}
                        />
                      </div>
                 
                   
                  </div>
                  <div className=" grid grid-cols-3 gap-3">
                  <div>
                      <div className="text-sm mb-2">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`Email`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Email`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                    <div>
                        <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>{`Password`}
                        </div>

                        <div className=" relative">

                        {!passHind ? (
                          <div className=" relative">
                            <input
                            id="password"
                            type="password"
                            name="password"
                            className={`w-full pl-3 pr-[40px] py-2 text-sm h-[38px] rounded-lg border-[1px] bg-white  ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                            placeholder={`New Password`}
                            value={password}
                              onChange={(e) => {
                                setInfoShow(true);
                                setPassword(e.target.value);
                              }}
                              style={{
                                background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                              }}
                              disabled={(flagActive === 2 && true) || false}
                          />
                            <VisibilityOffIcon
                              className=" absolute top-[7px] right-[12px] text-gray-500 cursor-pointer"
                              onClick={() => {
                                setPassHind((pre: any) => !pre);
                              }}
                            />
                          </div>
                        ) : (
                          <div className=" relative">
                            <input
                              id="password"
                              type="text"
                              name="password"
                              className={`w-full pl-3 pr-[40px] py-2 h-[38px] text-sm rounded-lg border-[1px] bg-white ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                              placeholder={`New Password`}
                              value={password}
                              onChange={(e) => {
                                setInfoShow(true);
                                setPassword(e.target.value);
                              }}
                              style={{
                                background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                              }}
                              disabled={(flagActive === 2 && true) || false}
                            />
                            <VisibilityIcon
                            onClick={() => {
                              setPassHind((pre: any) => !pre);
                            }}
                            className=" absolute top-[7px] right-[12px] text-[#949599] cursor-pointer"
                          />
                          </div>
                        )}
                        {password.length > 0 && !!infoShow && (
                          <div className=" absolute bottom-[60px] right-0">
                            <div className=" relative">
                              <div
                                className={` bg-[#ededed] text-gray-600 p-2 text-[12px] rounded-md`}
                              >
                                <div className="flex justify-between items-center">
                                  <div>Our minimum requirements:</div>
                                  <div
                                    className={`cursor-pointer`}
                                    onClick={() => {
                                      setInfoShow(false);
                                    }}
                                  >
                                    x
                                  </div>
                                </div>
                                <div className=" flex items-center gap-2">
                                  <CheckCircleIcon
                                    className={`${
                                      password.length >= 10
                                        ? "text-green-500"
                                        : "text-gray-500"
                                    }`}
                                  />
                                  At least 10 character(s)
                                </div>
                                <div className=" flex items-center gap-2">
                                  <CheckCircleIcon
                                    className={`${
                                      (countLeast || []).filter((value) => value)
                                        .length === 4
                                        ? "text-green-500"
                                        : "text-gray-500"
                                    }`}
                                  />
                                  {`Using characters from at least 4 of the following types:`}
                                </div>
                                <div
                                  className={`flex gap-2 items-center ml-8 ${
                                    !!countLeast[0] && "text-green-500"
                                  }`}
                                >
                                  <FiberManualRecordIcon
                                    className=""
                                    style={{ fontSize: "10px" }}
                                  />
                                  {`numbers[0-9]`}
                                </div>
                                <div
                                  className={`flex gap-2 items-center ml-8 ${
                                    !!countLeast[1] && "text-green-500"
                                  }`}
                                >
                                  <FiberManualRecordIcon
                                    className=""
                                    style={{ fontSize: "10px" }}
                                  />
                                  {`lowercase letters[a-z]`}
                                </div>
                                <div
                                  className={`flex gap-2 items-center ml-8 ${
                                    !!countLeast[2] && "text-green-500"
                                  }`}
                                >
                                  <FiberManualRecordIcon
                                    className=""
                                    style={{ fontSize: "10px" }}
                                  />
                                  {`uppercase letters[A-Z]`}
                                </div>
                                <div
                                  className={`flex gap-2 items-center ml-8 ${
                                    !!countLeast[3] && "text-green-500"
                                  }`}
                                >
                                  <FiberManualRecordIcon
                                    className=""
                                    style={{ fontSize: "10px" }}
                                  />
                                  {`special characters[!@#$,^ etc]`}
                                </div>
                                <div className={`grid grid-cols-[4fr,1fr]`}>
                                  <div
                                    className={`h-[10px] border-[1px] bg-gray-300 rounded-full mt-2 w-[100%]`}
                                  >
                                    <div
                                      className={`h-[100%] rounded-full ${
                                        (countLeast || []).filter((value) => value)
                                          .length === 1
                                          ? " bg-red-500 w-[25%]"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 2
                                          ? " bg-orange-500 w-[50%]"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 3
                                          ? " bg-yellow-500 w-[75%]"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 4
                                          ? " bg-green-500 w-[100%]"
                                          : "bg-gray-300 w-[0%]"
                                      } `}
                                    ></div>
                                  </div>
                                  <div className="text-center">
                                    <span
                                      className={` ${
                                        (countLeast || []).filter((value) => value)
                                          .length === 1
                                          ? " text-red-500"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 2
                                          ? " text-orange-500"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 3
                                          ? " text-yellow-500"
                                          : (countLeast || []).filter((value) => value)
                                              .length === 4
                                          ? " text-green-500"
                                          : "text-gray-300"
                                      }`}
                                    >
                                      {(countLeast || []).filter((value) => value)
                                        .length === 1
                                        ? "Very Weak"
                                        : (countLeast || []).filter((value) => value)
                                            .length === 2
                                        ? "Weak"
                                        : (countLeast || []).filter((value) => value)
                                            .length === 3
                                        ? "Good"
                                        : (countLeast || []).filter((value) => value)
                                            .length === 4
                                        ? "Strong"
                                        : ""}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className=" absolute right-3 w-0 h-0 
                    border-l-[10px] border-l-transparent
                    border-t-[15px] border-t-[#ededed]
                    border-r-[10px] border-r-transparent"
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {
                        dataUseVaridate?.shipperId &&
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your shipper id`}</div>
                      }

                      </div>
                    <div>
                      <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        <span className=" text-[#ED1B24]">{`*`}</span>
                        {`Confirm Password`}
                      </div>
                      {!passConfHind ? (
                          <div className=" relative">
                            <input
                              id="passwordConf"
                              type="password"
                              name="passwordConf"
                              className={`w-full pl-3 pr-[40px] py-2 h-[38px] text-sm rounded-lg border-[1px] bg-white ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                              placeholder={`Confirm New Password`}
                              style={{
                                background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                              }}
                              disabled={(flagActive === 2 && true) || false}
                            />
                            <VisibilityOffIcon
                              onClick={() => {
                                setPassConfHind((pre: any) => !pre);
                              }}
                              className=" absolute top-[7px] right-[12px] text-[#949599] cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div className=" relative">
                            <input
                              id="passwordConf"
                              type="text"
                              name="passwordConf"
                              className={`w-full pl-3 pr-[40px] py-2 h-[38px] text-sm rounded-lg border-[1px] bg-white ${dataUseVaridate?.shipperId ? "border-[#ED1B24]" : "border-[#DFE4EA]"} outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                              placeholder={`Confirm New Password`}
                              style={{
                                background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                              }}
                              disabled={(flagActive === 2 && true) || false}
                            />
                            <VisibilityIcon
                              onClick={() => {
                                setPassConfHind((pre: any) => !pre);
                              }}
                              className=" absolute top-[7px] right-[12px] text-[#949599] cursor-pointer"
                            />
                          </div>
                        )}
                      
                      </div>
                      {
                        dataUseVaridate?.shipperId &&
                      <div className="text-[#ED1B24] text-[12px] mx-1">{`Enter your shipper id`}</div>
                      }
                    </div>
                    
                  </div>
                  <div className=" grid grid-cols-3 gap-3">
                    <div>
                      <div className="text-sm mb-2">
                        {`Telephone`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Telephone`}
                        style={{
                          background: "#EFECEC",
                        }}
                        disabled={true}
                      />
                    </div>
                    <div>
                      <div className="text-sm mb-2">
                        {`FAX`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`FAX`}
                        style={{
                          background: "#EFECEC",
                        }}
                        disabled={true}
                      />
                    </div>
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
                          <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3">
                            <input
                              id="sss"
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
                  </div>
                  <div className=" grid grid-cols-3 gap-3">
                  <div>
                      <div className="text-sm mb-2 text-[#58585A]">End Date</div>
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
                    <div>
                      <div className="text-sm mb-2">
                        {`Address`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Address`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                    <div>
                      <div className="text-sm mb-2 text-[#ffffffff]">
                        {`-`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Fill in one Province, District, Subdistrict or Postal`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                  </div>

                  <div className=" grid grid-cols-1 gap-3">
                    <div>
                      <div className="text-sm mb-2 text-[#58585A]">
                        {`Note`}
                      </div>
                      <input
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm pl-3 pr-3 py-2 h-[38px] w-full rounded-lg border-[1px] border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder={`Note`}
                        style={{
                          background: flagActive === 2 ? "#EFECEC" : "#ffffff",
                        }}
                        disabled={(flagActive === 2 && true) || false}
                      />
                    </div>
                  </div>
                  </div>
                  <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                    {flagActive === 1 ? (
                      <>
                        <div
                          onClick={() => {
                            setFlagUser(1)
                            setFlagActive(0);
                            setViewFlag(false);
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                        >
                          {`Cancel`}
                        </div>
                        <div
                          onClick={() => {
                            setFlagUser(1)
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
                            setFlagUser(1)
                            setFlagActive(0);
                            setViewFlag(false);
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                        >
                          {`Cancel`}
                        </div>
                        <div
                          onClick={() => {
                            setFlagUser(1)
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
                          setFlagUser(1)
                          setFlagActive(0);
                          setViewFlag(false);
                        }}
                        className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                      >
                        {`Close`}
                      </div>
                    )}
                  </div>
                  </>
                  : null
                }
                
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
                  {`History User`}
                </div>
              </div>
              <div className="space-y-5 h-[calc(90vh-180px)] mx-[20px]">
                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-sm mb-2">User Type</div>
                    <MySelect
                      placeholder={
                        <div className=" text-sm text-[#cacaca] ">{`Select User Type`}</div>
                      }
                      options={userTypeOption}
                      seUseType={seUseType}
                      setSeUseType={setSeUseType}
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
                        id="user"
                        type="text"
                        name="use"
                        className={`text-sm block p-2 ps-5 pe-10 h-[38px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                        placeholder="Search Role"
                      />
                    </div>
                  </div>
                  <DateRang />
                  {/* <div>
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
                  </div> */}
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
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "shipperId"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "shipperId"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              {`Shipper Id`}
                              {sortBy === "shipperId" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("shipperId")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("shipperId")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("shipperId")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "shortName"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "shortName"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              {`Short Name`}
                              {sortBy === "shortName" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("shortName")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("shortName")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("shortName")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "shipperCompanyName"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) =>
                                    hasAgeKey(e, "shipperCompanyName")
                                  )
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              {`Shipper Company Name`}
                              {sortBy === "shipperCompanyName" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() =>
                                      handleSort("shipperCompanyName")
                                    }
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() =>
                                      handleSort("shipperCompanyName")
                                    }
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() =>
                                    handleSort("shipperCompanyName")
                                  }
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "address"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "address"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              {`Address`}
                              {sortBy === "address" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("address")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("address")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("address")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "ercLicenseId"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "ercLicenseId"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              {`Erc License Id`}
                              {sortBy === "ercLicenseId" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("ercLicenseId")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("ercLicenseId")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("ercLicenseId")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "telephone"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "telephone"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              {`Telephone`}
                              {sortBy === "telephone" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("telephone")}
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() => handleSort("telephone")}
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("telephone")}
                                />
                              )}
                              
                            </th>
                          )}
                          {!!dataState
                            .map((e: any) => hasAgeKey(e, "bankUserAccount"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) =>
                                    hasAgeKey(e, "bankUserAccount")
                                  )
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              {`Bank Account`}
                              {sortBy === "bankUserAccount" ? (
                                sortOrder === "asc" ? (
                                  <NorthIcon
                                    className=" cursor-pointer"
                                    onClick={() =>
                                      handleSort("bankUserAccount")
                                    }
                                  />
                                ) : (
                                  <SouthIcon
                                    className=" cursor-pointer"
                                    onClick={() =>
                                      handleSort("bankUserAccount")
                                    }
                                  />
                                )
                              ) : (
                                <ImportExportIcon
                                  className=" cursor-pointer"
                                  onClick={() => handleSort("bankUserAccount")}
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
                            .map((e: any) => hasAgeKey(e, "groupId"))
                            .find((f: any) => {
                              return f === true;
                            }) && (
                            <th
                              scope="col"
                              className={`${
                                !!dataState
                                  .map((e: any) => hasAgeKey(e, "groupId"))
                                  .find((f: any) => {
                                    return f === true;
                                  }) && "px-6 py-3"
                              } whitespace-nowrap`}
                            >
                              Group ID
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
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "shipperId"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.shipperId && "px-6 py-4"
                                  } whitespace-nowrap`}
                                >
                                  {item?.shipperId || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "shortName"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.shortName && "px-6 py-4"
                                  } whitespace-nowrap`}
                                >
                                  {item?.shortName || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) =>
                                  hasAgeKey(e, "shipperCompanyName")
                                )
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.shipperCompanyName && "px-6 py-4"
                                  } whitespace-nowrap`}
                                >
                                  {item?.shipperCompanyName || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "address"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.address && "px-6 py-4"
                                  } min-w-[250px]`}
                                >
                                  {item?.address || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "ercLicenseId"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.ercLicenseId && "px-6 py-4"
                                  } whitespace-nowrap`}
                                >
                                  {item?.ercLicenseId || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) => hasAgeKey(e, "telephone"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.telephone && "px-6 py-4"
                                  } whitespace-nowrap`}
                                >
                                  {item?.telephone || "-"}
                                </td>
                              )}
                              {!!dataState
                                .map((e: any) =>
                                  hasAgeKey(e, "bankUserAccount")
                                )
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.bankUserAccount?.name && "px-6 py-4"
                                  } whitespace-nowrap`}
                                >
                                  {item?.bankUserAccount?.name || "-"}
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
                                .map((e: any) => hasAgeKey(e, "groupId"))
                                .find((f: any) => {
                                  return f === true;
                                }) && (
                                <td
                                  className={`${
                                    !!item?.groupId && "px-6 py-4"
                                  }`}
                                >
                                  <MoreHorizOutlinedIcon className=" cursor-pointer" />
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
                      id="table-search2"
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
                      id="table-search6"
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
                className="h-[38px] w-[200px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
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
      {!!viewStatus && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] min-w-[500px] p-5 grid ">
              <div className="w-[100%] grid justify-start items-center text-[#00ADEF] font-bold">
                {`Update User Status`}
              </div>
              <div>

                  <div className=" space-y-3 my-5">
                    <div className=" grid grid-cols-2 gap-3">
                      <div className="text-sm text-[#58585A]">{`User ID`}</div>
                      <div className=" ">{`: NGP-S16001(PTT)`}</div>
                    </div>
                    <div className=" grid grid-cols-2 gap-3">
                      <div className="text-sm text-[#58585A]">{`Shipper Company Name`}</div>
                      <div className=" ">{`: บริษัท ปตท. จำกัด (มหาชน)`}</div>
                    </div>
                    <div className=" grid grid-cols-2 gap-3">
                      <div className="text-sm text-[#58585A]">{`First Name`}</div>
                      <div className=" ">{`: Kanok`}</div>
                    </div>
                    <div className=" grid grid-cols-2 gap-3">
                      <div className="text-sm text-[#58585A]">{`Last Name`}</div>
                      <div className=" ">{`: xxxxxx`}</div>
                    </div>
                    <div className=" grid grid-cols-1 gap-3">
                      <div>
                          <div className="text-sm mb-2 text-[#58585A]">
                          {`User Status`}
                          </div>
                          <MySelect
                            placeholder={
                              <div className=" text-sm text-[#cacaca] whitespace-nowrap ">{`Select User Status`}</div>
                            }
                            // options={userTypeOption}
                            options={(bankData || [])?.map((e: any) => {
                              return {
                                value: e?.id,
                                searchCus: e?.nameTh,
                                label: (
                                  <div className=" flex items-center gap-2 text-sm">
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
                  </div>
                  <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                    <>
                        <div
                          onClick={() => {
                            setViewStatus(false);
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase  rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#DFE4EA]"
                        >
                          {`Cancel`}
                        </div>
                        <div
                          onClick={() => {
                            setViewStatus(false);
                            
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                        >
                          {`Update`}
                        </div>
                      </>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
      {!!viewRole && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] min-w-[500px] p-5 grid ">
              <div className="w-[100%] grid justify-start items-center text-[#00ADEF] font-bold">
                {`Role`}
              </div>
              <div>

                  <div className=" space-y-3 my-5">
                    {
                      (roleData || []).map((item:any,ix:any) => {

                        return (
                    <div key={ix} className=" grid grid-cols-1 gap-3 rounded-md p-2 border-[#DFE4EA] border-[1px] text-[#878b8f]">
                      {item?.name || "-"}
                    </div>
                        )
                      })
                    }
                      
                  </div>
                  <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                    <>
                        <div
                          onClick={() => {
                            setViewRole(false);
                            
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                        >
                          {`Close`}
                        </div>
                      </>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
      {!!viewNote && (
        <div className=" bg-[#c4c4c476] fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999]">
          <div className=" relative w-[100vw] h-[100vh]">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[10px] min-w-[500px] p-5 grid ">
              <div className="w-[100%] grid justify-start items-center text-[#00ADEF] font-bold">
                {`Note`}
              </div>
              <div>
                <div className=" my-5 flex items-center gap-2 text-sm">
                  <div className={`${flagNote === 1 ? "text-[#00ADEF] border-b-[1px] border-[#00ADEF] font-bold " : " "} cursor-pointer `} onClick={()=>{
                    flagActive !== 3 && setFlagNote(1)
                    }}>{`Note`}</div>
                  <div className={`${flagNote === 2 ? "text-[#00ADEF] border-b-[1px] border-[#00ADEF] font-bold " : " "} cursor-pointer `}onClick={()=>{flagActive !== 3 && setFlagNote(2)}}>{`Rejected Reason`}</div>
                </div>
                {/*  */}
                {
                  flagNote === 1 ?
                  <>
                  <div className=" space-y-3 my-5">
                    <div className=" p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm space-y-3">
                      <div className=" flex items-center justify-between">
                        <div><span className="text-[#58585A]">{`By `}</span><span className=" text-[#3e3e3f]">{`Teera Songsan`}</span></div>
                        <div><span className="text-[#58585A]">{`20/01/2024 13:00`}</span></div>
                      </div>
                      <div className="p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm">{`ข้อมูลยังไม่ถูกต้องครับ`}</div>
                    </div>
                    <div className=" p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm space-y-3">
                      <div className=" flex items-center justify-between">
                        <div><span className="text-[#58585A]">{`By `}</span><span className=" text-[#3e3e3f]">{`Teera Songsan`}</span></div>
                        <div><span className="text-[#58585A]">{`20/01/2024 13:00`}</span></div>
                      </div>
                      <div className="p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm">{`ข้อมูลยังไม่ถูกต้องครับ`}</div>
                    </div>
                  </div>
                  <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                    <>
                        <div
                          onClick={() => {
                            setViewNote(false);
                            
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                        >
                          {`Close`}
                        </div>
                      </>
                  </div>
                  </>
                  : flagNote === 2 ?
                  <>
                  <div className=" space-y-3 my-5">
                    <div className=" p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm space-y-3">
                      <div className=" flex items-center justify-between">
                        <div><span className="text-[#58585A]">{`By `}</span><span className=" text-[#3e3e3f]">{`Teera Songsan`}</span></div>
                        <div><span className="text-[#58585A]">{`20/01/2024 13:00`}</span></div>
                      </div>
                      <div className="p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm">{`ข้อมูลยังไม่ถูกต้องครับ`}</div>
                    </div>
                  </div>
                  <div className="w-[100%] flex items-center justify-end gap-2 text-xs">
                    <>
                        <div
                          onClick={() => {
                            setViewNote(false);
                            
                          }}
                          className="h-[38px] w-[150px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                        >
                          {`Close`}
                        </div>
                      </>
                  </div>
                  </>
                  : null
                }
                
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
