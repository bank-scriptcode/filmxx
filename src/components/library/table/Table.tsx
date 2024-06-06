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

function Table() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(0);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchField, setSearchField] = useState("");
  const [dataStateTemp, setDataStateTemp] = useState([]);
  const [dataStateInit, setDataStateInit] = useState([]);
  const [dataState, setDataState] = useState([]);
  const [openField, setOpenField] = useState(false);

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
    let arrMock: any = Array.from({ length: 1000 }, (_, index) => {
      return {
        id: index + 1,
        name1: getRandomValue(),
        name2: getRandomValue(),
        name3: getRandomValue(),
        name4: getRandomValue(),
      };
    });
    setDataStateTemp(arrMock || []);
    setDataStateInit(arrMock || []);
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
    const start = (page - 1) * limit;
    const end = start + parseInt(String(limit), 10);
    setPagination(Math.ceil(dataStateInit.length / limit));
    setDataState(dataStateInit.slice(start, end) || []);
  }, [limit, dataStateInit, page]);

  useEffect(() => {
    const sortedData = [...dataStateInit].sort((a: any, b: any) => {
      if (sortBy === "name1") {
        return sortOrder === "asc"
          ? ((!!a.name1 && String(a.name1)) || "").localeCompare(
              (!!b.name1 && String(b.name1)) || ""
            )
          : ((!!b.name1 && String(b.name1)) || "").localeCompare(
              (!!a.name1 && String(a.name1)) || ""
            );
      } else if (sortBy === "name2") {
        return sortOrder === "asc"
          ? ((!!a.name2 && String(a.name2)) || "").localeCompare(
              (!!b.name2 && String(b.name2)) || ""
            )
          : ((!!b.name2 && String(b.name2)) || "").localeCompare(
              (!!a.name2 && String(a.name2)) || ""
            );
      } else if (sortBy === "name3") {
        return sortOrder === "asc"
          ? ((!!a.name3 && String(a.name3)) || "").localeCompare(
              (!!b.name3 && String(b.name3)) || ""
            )
          : ((!!b.name3 && String(b.name3)) || "").localeCompare(
              (!!a.name3 && String(a.name3)) || ""
            );
      } else if (sortBy === "name4") {
        return sortOrder === "asc"
          ? ((!!a.name4 && String(a.name4)) || "").localeCompare(
              (!!b.name4 && String(b.name4)) || ""
            )
          : ((!!b.name4 && String(b.name4)) || "").localeCompare(
              (!!a.name4 && String(a.name4)) || ""
            );
      }

      return 0;
    });
    setDataStateInit(sortedData);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    let filter = dataStateTemp.filter((f: any) => {
      return (
        ((f?.name1 && String(f?.name1)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.name2 && String(f?.name2)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.name3 && String(f?.name3)) || "")
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        ((f?.name4 && String(f?.name4)) || "")
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
    <div>
      <div>
        <div className=" text-sm flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-2">
          {/* Blackdrop */}
          {openField && (
            <div
              className="fixed bg-[#55555526] inset-0 z-[1999] cursor-pointer"
              onClick={() => {
                setOpenField(false);
              }}
            ></div>
          )}
          <div
            className="mx-2 border-[2px] border-gray-400 rounded-md cursor-pointer relative"
            onClick={() => {
              setOpenField(true);
            }}
          >
            <TuneIcon />
            {openField && (
              <>
                {/* Content */}
                <div className="bg-[#ffffff] absolute z-[2000] rounded-md p-2 left-[30px] top-0 min-w-[100px] min-h-[20px] max-h-[80vh] overflow-y-auto cursor-default shadow-lg">
                  <div className="grid">
                    <div className="flex items-center gap-2">
                      {!!dataState
                        .map((e: any) => hasAgeKey(e, "name1"))
                        .find((f: any) => {
                          return f === true;
                        }) ? (
                        <CheckBoxIcon
                          className=" cursor-pointer"
                          onClick={() => {
                            setDataState((pre: any) => {
                              let newArr = pre.map((obj: any) => {
                                let newObj = { ...obj };
                                delete newObj.name1;
                                return newObj;
                              });
                              return newArr;
                            });
                          }}
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                          className=" cursor-pointer"
                          onClick={() => {
                            setDataState((pre: any) => {
                              let newArr = pre.map((obj: any) => {
                                let fil: any = dataStateInit.find((f: any) => {
                                  return f?.id === obj?.id;
                                });
                                let newObj = { ...obj };
                                newObj.name1 = fil["name1"];
                                return newObj;
                              });
                              return newArr;
                            });
                          }}
                        />
                      )}

                      <div>FIELD1</div>
                    </div>
                  </div>
                  <div className="grid">
                    <div className="flex items-center gap-2">
                      {!!dataState
                        .map((e: any) => hasAgeKey(e, "name2"))
                        .find((f: any) => {
                          return f === true;
                        }) ? (
                        <CheckBoxIcon
                          className=" cursor-pointer"
                          onClick={() => {
                            setDataState((pre: any) => {
                              let newArr = pre.map((obj: any) => {
                                let newObj = { ...obj };
                                delete newObj.name2;
                                return newObj;
                              });
                              return newArr;
                            });
                          }}
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                          className=" cursor-pointer"
                          onClick={() => {
                            setDataState((pre: any) => {
                              let newArr = pre.map((obj: any) => {
                                let fil: any = dataStateInit.find((f: any) => {
                                  return f?.id === obj?.id;
                                });
                                let newObj = { ...obj };
                                newObj.name2 = fil["name2"];
                                return newObj;
                              });
                              return newArr;
                            });
                          }}
                        />
                      )}
                      <div>FIELD2</div>
                    </div>
                    {/* sub */}
                    {/* <div className="flex items-center gap-2 ml-8">
                      <CheckBoxOutlineBlankIcon className=" cursor-pointer" />
                      <div>FIELD21</div>
                    </div> */}
                  </div>
                  <div className="grid">
                    <div className="flex items-center gap-2">
                      {!!dataState
                        .map((e: any) => hasAgeKey(e, "name3"))
                        .find((f: any) => {
                          return f === true;
                        }) ? (
                        <CheckBoxIcon
                          className=" cursor-pointer"
                          onClick={() => {
                            setDataState((pre: any) => {
                              let newArr = pre.map((obj: any) => {
                                let newObj = { ...obj };
                                delete newObj.name3;
                                return newObj;
                              });
                              return newArr;
                            });
                          }}
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                          className=" cursor-pointer"
                          onClick={() => {
                            setDataState((pre: any) => {
                              let newArr = pre.map((obj: any) => {
                                let fil: any = dataStateInit.find((f: any) => {
                                  return f?.id === obj?.id;
                                });
                                let newObj = { ...obj };
                                newObj.name3 = fil["name3"];
                                return newObj;
                              });
                              return newArr;
                            });
                          }}
                        />
                      )}
                      <div>FIELD3</div>
                    </div>
                  </div>
                  <div className="grid">
                    <div className="flex items-center gap-2">
                      {!!dataState
                        .map((e: any) => hasAgeKey(e, "name4"))
                        .find((f: any) => {
                          return f === true;
                        }) ? (
                        <CheckBoxIcon
                          className=" cursor-pointer"
                          onClick={() => {
                            setDataState((pre: any) => {
                              let newArr = pre.map((obj: any) => {
                                let newObj = { ...obj };
                                delete newObj.name4;
                                return newObj;
                              });
                              return newArr;
                            });
                          }}
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                          className=" cursor-pointer"
                          onClick={() => {
                            setDataState((pre: any) => {
                              let newArr = pre.map((obj: any) => {
                                let fil: any = dataStateInit.find((f: any) => {
                                  return f?.id === obj?.id;
                                });
                                let newObj = { ...obj };
                                newObj.name4 = fil["name4"];
                                return newObj;
                              });
                              return newArr;
                            });
                          }}
                        />
                      )}
                      <div>FIELD4</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <label htmlFor="table-search" className="sr-only">
            Search
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
              value={searchField}
              onChange={(e: any) => {
                setSearchField(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 w-10">
                #
              </th>
              {!!dataState
                .map((e: any) => hasAgeKey(e, "name1"))
                .find((f: any) => {
                  return f === true;
                }) && (
                <th
                  scope="col"
                  className={`${
                    !!dataState
                      .map((e: any) => hasAgeKey(e, "name1"))
                      .find((f: any) => {
                        return f === true;
                      }) && "px-6 py-3"
                  }`}
                >
                  {sortBy === "name1" ? (
                    sortOrder === "asc" ? (
                      <KeyboardArrowUpOutlinedIcon
                        className=" cursor-pointer"
                        onClick={() => handleSort("name1")}
                      />
                    ) : (
                      <KeyboardArrowDownOutlinedIcon
                        className=" cursor-pointer"
                        onClick={() => handleSort("name1")}
                      />
                    )
                  ) : (
                    <UnfoldMoreOutlinedIcon
                      className=" cursor-pointer"
                      onClick={() => handleSort("name1")}
                    />
                  )}
                  Field1
                </th>
              )}
              {!!dataState
                .map((e: any) => hasAgeKey(e, "name2"))
                .find((f: any) => {
                  return f === true;
                }) && (
                <th
                  scope="col"
                  className={`${
                    !!dataState
                      .map((e: any) => hasAgeKey(e, "name2"))
                      .find((f: any) => {
                        return f === true;
                      }) && "px-6 py-3"
                  }`}
                >
                  {sortBy === "name2" ? (
                    sortOrder === "asc" ? (
                      <KeyboardArrowUpOutlinedIcon
                        className=" cursor-pointer"
                        onClick={() => handleSort("name2")}
                      />
                    ) : (
                      <KeyboardArrowDownOutlinedIcon
                        className=" cursor-pointer"
                        onClick={() => handleSort("name2")}
                      />
                    )
                  ) : (
                    <UnfoldMoreOutlinedIcon
                      className=" cursor-pointer"
                      onClick={() => handleSort("name2")}
                    />
                  )}
                  Field2
                </th>
              )}
              {!!dataState
                .map((e: any) => hasAgeKey(e, "name3"))
                .find((f: any) => {
                  return f === true;
                }) && (
                <th
                  scope="col"
                  className={`${
                    !!dataState
                      .map((e: any) => hasAgeKey(e, "name3"))
                      .find((f: any) => {
                        return f === true;
                      }) && "px-6 py-3"
                  }`}
                >
                  {sortBy === "name3" ? (
                    sortOrder === "asc" ? (
                      <KeyboardArrowUpOutlinedIcon
                        className=" cursor-pointer"
                        onClick={() => handleSort("name3")}
                      />
                    ) : (
                      <KeyboardArrowDownOutlinedIcon
                        className=" cursor-pointer"
                        onClick={() => handleSort("name3")}
                      />
                    )
                  ) : (
                    <UnfoldMoreOutlinedIcon
                      className=" cursor-pointer"
                      onClick={() => handleSort("name3")}
                    />
                  )}
                  Field3
                </th>
              )}
              {!!dataState
                .map((e: any) => hasAgeKey(e, "name4"))
                .find((f: any) => {
                  return f === true;
                }) && (
                <th
                  scope="col"
                  className={`${
                    !!dataState
                      .map((e: any) => hasAgeKey(e, "name4"))
                      .find((f: any) => {
                        return f === true;
                      }) && "px-6 py-3"
                  }`}
                >
                  {sortBy === "name4" ? (
                    sortOrder === "asc" ? (
                      <KeyboardArrowUpOutlinedIcon
                        className=" cursor-pointer"
                        onClick={() => handleSort("name4")}
                      />
                    ) : (
                      <KeyboardArrowDownOutlinedIcon
                        className=" cursor-pointer"
                        onClick={() => handleSort("name4")}
                      />
                    )
                  ) : (
                    <UnfoldMoreOutlinedIcon
                      className=" cursor-pointer"
                      onClick={() => handleSort("name4")}
                    />
                  )}
                  Field4
                </th>
              )}

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll" style={{height:"calc(100vh - 300px)"}}>
            {(dataState || []).map((item: any, ix: any) => {
              return (
                <tr key={ix} className="odd:bg-white even:bg-gray-50 border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap " 
                  >
                    {ix + 1 || "-"}
                  </th>
                  {!!dataState
                    .map((e: any) => hasAgeKey(e, "name1"))
                    .find((f: any) => {
                      return f === true;
                    }) && (
                    <td className={`${!!item?.name1 && "px-6 py-4"}`}>
                      {item?.name1 || "-"}
                    </td>
                  )}
                  {!!dataState
                    .map((e: any) => hasAgeKey(e, "name2"))
                    .find((f: any) => {
                      return f === true;
                    }) && (
                    <td className={`${!!item?.name2 && "px-6 py-4"}`}>
                      {item?.name2 || "-"}
                    </td>
                  )}
                  {!!dataState
                    .map((e: any) => hasAgeKey(e, "name3"))
                    .find((f: any) => {
                      return f === true;
                    }) && (
                    <td className={`${!!item?.name3 && "px-6 py-4"}`}>
                      {item?.name3 || "-"}
                    </td>
                  )}
                  {!!dataState
                    .map((e: any) => hasAgeKey(e, "name4"))
                    .find((f: any) => {
                      return f === true;
                    }) && (
                    <td className={`${!!item?.name4 && "px-6 py-4"}`}>
                      {item?.name4 || "-"}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <MoreHorizOutlinedIcon className=" cursor-pointer" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="py-3 flex items-center justify-between whitespace-nowrap">
        <div className=" flex items-center gap-3 text-sm">
          {`Page ${page} of ${dataState.length}`}
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
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
            "& .Mui-selected": { backgroundColor: "#e9e9e9 !important" },
          }}
        />
      </div>
    </div>
  );
}

export default Table;
