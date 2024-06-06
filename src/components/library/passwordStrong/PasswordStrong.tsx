"use client";
import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function PasswordStrong() {
  const [password, setPassword] = useState("");
  const [countLeast, setCountLeast] = useState([false, false, false, false]);
  const [flagPass, setFlagPass] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    console.log(flagPass);
  }, [flagPass]);

  return (
    <>
      <div className=" relative">
        {showPassword ? (
          <div className=" relative">
                <input
                  type="text"
                  className={`w-full pl-3 pr-3 py-2 rounded-lg border-2 bg-white border-gray-400 outline-none bg-opacity-100 focus:border-[#6188e3]`}
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    setInfoShow(true);
                    setPassword(e.target.value);
                  }}
                />
                <VisibilityOffIcon className=" absolute top-2.5 right-2.5 text-gray-500 cursor-pointer" onClick={()=>{setShowPassword(false)}} />
            </div>
        ) : (
            <div className=" relative">
                <input
                  type="password"
                  className={`w-full pl-3 pr-3 py-2 rounded-lg border-2 bg-white border-gray-400 outline-none bg-opacity-100 focus:border-[#6188e3]`}
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    setInfoShow(true);
                    setPassword(e.target.value);
                  }}
                />
                <VisibilityIcon className=" absolute top-2.5 right-2.5 text-gray-500 cursor-pointer" onClick={()=>{setShowPassword(true)}} />
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
                      password.length >= 10 ? "text-green-500" : "text-gray-500"
                    }`}
                  />
                  At least 10 character(s)
                </div>
                <div className=" flex items-center gap-2">
                  <CheckCircleIcon
                    className={`${
                      (countLeast || []).filter((value) => value).length === 4
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  />
                  Using characters from at least 3 of the following types:
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
                        (countLeast || []).filter((value) => value).length === 1
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
                        (countLeast || []).filter((value) => value).length === 1
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
                      {(countLeast || []).filter((value) => value).length === 1
                        ? "Weak"
                        : (countLeast || []).filter((value) => value).length ===
                          2
                        ? "Med"
                        : (countLeast || []).filter((value) => value).length ===
                          3
                        ? "Mid S"
                        : (countLeast || []).filter((value) => value).length ===
                          4
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
    </>
  );
}

export default PasswordStrong;
