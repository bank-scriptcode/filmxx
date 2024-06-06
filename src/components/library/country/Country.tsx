"use client";
import React, { useEffect, useState } from "react";
import DoubleArrowOutlinedIcon from "@mui/icons-material/DoubleArrowOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function Country() {
  const [countryState, setCountryState] = useState([]);
  const [calcState, setCalcState] = useState([]);
  const [keyInput, setKeyInput] = useState("");

  const getCounty = async () => {
    try {
      const response = await fetch("/json/country.json");
      if (!response.ok) {
        throw new Error("Failed to fetch country data");
      }
      const data = await response.json();
      setCountryState(data);
    } catch (error) {
      setCountryState([]);
    }
  };

  useEffect(() => {
    if (!!keyInput) {
      let fil = countryState.filter((f: any) => {
        return JSON.stringify(f).includes(keyInput);
      });
      setCalcState(fil || []);
    } else {
      setCalcState([]);
    }
  }, [keyInput]);

  useEffect(() => {
    getCounty();
  }, []);

  return (
    <div className=" relative z-[999]">
      <div className=" relative group">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`กรอก ตำบล, อำเภอ, จังหวัด หรือ รหัสไปรษณีย์`}
          value={keyInput}
          onChange={(e: any) => {
            setKeyInput(e?.target?.value);
          }}
        />
        {!!keyInput && (
          <ClearOutlinedIcon
            className="hidden group-hover:block absolute right-3 top-[8px] cursor-pointer"
            onClick={() => {
              setKeyInput("");
            }}
          />
        )}
      </div>
      {(calcState || []).length > 0 && (
        <div className="bg-gray-100 rounded-lg p-2.5 absolute top-0 left-0 mt-11 w-full max-h-[400px] overflow-y-auto text-sm">
          {(calcState || []).map((item: any, ix: any) => {
            return (
              <div key={ix}>
                {(item[1] || []).map((itemSub: any, ixSub: any) => {
                  return (
                    <div key={ixSub}>
                      {(itemSub[1] || []).map(
                        (itemSubIn: any, ixSubIn: any) => {
                          let textValue = `${itemSubIn[0]} / ${itemSub[0]} / ${item[0]} / ${itemSubIn[1]}`;
                          let textValueActive = `${itemSubIn[0]} ${itemSub[0]} ${item[0]} ${itemSubIn[1]}`;
                          let startIndex = textValue
                            .toLowerCase()
                            .indexOf(keyInput.toLowerCase());
                          if (startIndex !== -1) {
                            let endIndex = startIndex + keyInput.length;
                            return (
                              <div
                                key={ixSubIn}
                                className="mb-2 cursor-pointer bg-[#e2e2e2] hover:bg-[#00adef] p-2.5 rounded-md text-[#3a3a3a] hover:text-[#ffffff]"
                                onClick={() => {
                                  setKeyInput(textValueActive);
                                }}
                              >
                                {textValue.substring(0, startIndex)}
                                <span className=" bg-[#ed1c2450] text-[#3a3a3a]">
                                  {textValue.substring(startIndex, endIndex)}
                                </span>
                                {textValue.substring(endIndex)}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        }
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Country;
