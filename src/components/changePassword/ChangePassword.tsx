"use client";
import LocalSwitcher from "@/components/LocalSwitcher";
import ReduxExample from "@/components/Redux";
import ThemeMode from "@/components/ThemeMode";
import { useTranslations } from "next-intl";
import { useParams, useRouter, redirect } from "next/navigation";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { getApiSignIn, getApired } from "@/service/api/controller/demoService";
import Swal from "sweetalert2";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReCaptcha from "../library/reCaptcha/ReCaptcha";
import { useEffect, useState, useRef } from "react";
import useCaptcha from "use-offline-captcha";
import RefreshIcon from "@mui/icons-material/Refresh";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import axios from "axios";
import { getCookie } from "../utils/cookie";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function ChangePassword() {
  const router = useRouter();
  const params = useParams();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [imgBg, setImgBg] = useState(`/assets/image/12453 1.png`);
  const [caseError, setCaseError] = useState("0");
  const [borderRc, setBorderRc] = useState(false);
  const [passHind, setPassHind] = useState(false);
  const [passConfHind, setPassConfHind] = useState(false);

  const handleFormSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    setIsValidEmail(isValid);

    if (isValid) {
      handleSingIn();
    }
  };

  const handleSingIn = async () => {
    const res: any = await getApired(`/api/demo`, { email: email }, {});
    router.push(res?.data?.redirect);
  };

  const regisPage = async () => {
    // let locale = await getCookie("NEXT_LOCALE");
    // router.push(`/${locale}/signUp`);
  };

  const goToLogin = async () => {
    let locale = await getCookie("NEXT_LOCALE");
    router.push(`/${locale || `en`}/`);
  };

  const loginInIn = async () => {
    router.push(`http://localhost:40002/api/authService/auth/azure`);
    // redirect(`http://localhost:40002/api/authService/auth/azure`)
    // let res = await axios.get("http://localhost:40002/api/authService/auth/azure")
    // console.log(res);
  };

  const loginInEx = async () => {
    setCaseError("1");
  };

  const captchaRef: any = useRef();
  const [valueCapcha, setValueCapcha] = useState<any>("");
  const userOpt: any = {
    type: "mixed", // "mixed"(default) | "numeric" | "alpha"
    length: 5, // 4 to 8 number. default is 5
    sensitive: false, // Case sensitivity. default is false
    width: 150, // Canvas width. default is 200
    height: 46, // Canvas height. default is 50
    fontColor: "#000",
    background: "#ffffff",
  };
  const { gen, validate } = useCaptcha(captchaRef, userOpt);

  useEffect(() => {
    if (gen) gen();
  }, [gen]);

  const handleValidate = () => {
    const isValid = validate(valueCapcha);
    console.log(isValid);
    if (isValid) {
      setBorderRc(false);
      loginInEx();
    } else {
      setBorderRc(true);
    }
  };

  const handleRefresh = () => gen();

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

  useEffect(() => {
    console.log(valueCapcha);
  }, [valueCapcha]);

  return (
    <>
      {/* <div className="flex items-center text-black">
        <div className=" container mx-auto max-sm:px-3">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col rounded-md w-full max-w-md">
              <div className="font-medium self-center text-3xl sm:text-3xl uppercase mb-[30px]">
                {`SignIn`}
              </div>
              <div className="mt-0">
                <div>
                  <div className="flex flex-col mb-6">
                    <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide">{`E-Mail Address `}:</label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className={`w-full pl-3 pr-3 py-2 rounded-lg border-2 bg-white border-gray-400 outline-none bg-opacity-100 focus:border-[#E3b661] ${
                          isValidEmail ? "" : "border-red-300"
                        }`}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="absolute left-0 mt-[45px]  text-red-300">
                        {isValidEmail ? "" : "Invalid email address"}
                      </span>
                      <button
                        onClick={() => {
                          handleFormSubmit();
                        }}
                        className=" absolute right-2 top-1  text-gray-400  cursor-pointer text-[#E3b661a1] hover:text-[#E3b661]"
                      >
                        <ArrowCircleRightIcon style={{ fontSize: "35px" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-3">
                <span
                  onClick={() => {
                    regisPage();
                  }}
                  className="inline-flex items-center hover:text-[#E3b661] text-xs sm:text-sm text-center cursor-pointer"
                >
                  <span className="ml-2 font-light">
                    {`You don't have an account`} ?{" "}
                    <span className="text-[#E3b661a1] hover:text-[#E3b661] font-semibold">
                      สร้างบัญชีของคุณ
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-[#F3F4F6] w-[100vw] h-[100vh] grid grid-cols-2 text-[#4B5563] overflow-hidden relative">
        <div className=" grid item-around px-[20%]">
          <div className=" grid items-center justify-center  ">
            <img src="/assets/image/logos.png" alt="" className=" h-[72px]" />
          </div>
          <div className=" grid items-center justify-center gap-2">
            <div className=" grid gap-5 w-[380px]">
              <h3 className=" text-[#2B2A87] font-bold text-lg">{`Reset Your Password`}</h3>
              <div className=" relative">
                {!passHind ? (
                  <div className=" relative">
                    <input
                    id="password"
                    type="password"
                    name="password"
                    className={`w-full pl-3 pr-[40px] py-2 h-[48px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                    placeholder={`New Password`}
                    value={password}
                      onChange={(e) => {
                        setInfoShow(true);
                        setPassword(e.target.value);
                      }}
                  />
                    <VisibilityOffIcon
                      className=" absolute top-2.5 right-2.5 text-gray-500 cursor-pointer"
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
                      className={`w-full pl-3 pr-[40px] py-2 h-[48px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                      placeholder={`New Password`}
                      value={password}
                      onChange={(e) => {
                        setInfoShow(true);
                        setPassword(e.target.value);
                      }}
                    />
                    <VisibilityIcon
                    onClick={() => {
                      setPassHind((pre: any) => !pre);
                    }}
                    className=" absolute top-[12px] right-[12px] text-[#949599] cursor-pointer"
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

              {!passConfHind ? (
                <div className=" relative">
                  <input
                    id="passwordConf"
                    type="password"
                    name="passwordConf"
                    className={`w-full pl-3 pr-[40px] py-2 h-[48px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                    placeholder={`Confirm New Password`}
                  />
                  <VisibilityOffIcon
                    onClick={() => {
                      setPassConfHind((pre: any) => !pre);
                    }}
                    className=" absolute top-[12px] right-[12px] text-[#949599] cursor-pointer"
                  />
                </div>
              ) : (
                <div className=" relative">
                  <input
                    id="passwordConf"
                    type="text"
                    name="passwordConf"
                    className={`w-full pl-3 pr-[40px] py-2 h-[48px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                    placeholder={`Confirm New Password`}
                  />
                  <VisibilityIcon
                    onClick={() => {
                      setPassConfHind((pre: any) => !pre);
                    }}
                    className=" absolute top-[12px] right-[12px] text-[#949599] cursor-pointer"
                  />
                </div>
              )}
              <div
                className="w-[100%] grid cursor-pointer"
                onClick={() => {
                  goToLogin();
                }}
              >
                <div className="h-[48px] uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2">
                  {`Continue`}
                </div>
              </div>
            </div>
          </div>
          <div className="grid items-center justify-center text-sm text-[#949599]">{`Version.1.0`}</div>
        </div>
        <div className=" h-full ">
          <img
            src={imgBg}
            alt=""
            className="w-full h-full object-cover bg-cover bg-center	bg-no-repeat "
          />
        </div>
        {caseError !== "0" && (
          <div className=" absolute top-0 left-0 bg-[#c4c4c476] w-[100vw] h-[100vh] grid items-center justify-center">
            <div className=" bg-white rounded-[10px] p-[10px] min-w-[500px] min-h-[300px] grid ">
              <div className="w-[100%] grid justify-center items-center">
                <div className=" bg-[#FEEBEB] w-[50px] h-[50px] grid items-center justify-center rounded-full">
                  <WarningAmberIcon style={{ color: "#E10E0E" }} />
                </div>
              </div>
              <div className="w-[100%] grid items-center justify-center text-[#E10E0E] font-bold text-2xl">{`Login Failed`}</div>
              {caseError === "1" ? (
                <>
                  <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`Sorry, your username or password is incorrect`}</div>
                  <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`Please try again`}</div>
                </>
              ) : caseError === "2" ? (
                <>
                  <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`Please confirm your identity via email.`}</div>
                </>
              ) : caseError === "3" ? (
                <>
                  <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`Your account is currently under review.`}</div>
                  <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`(You will receive an email after the review process is complete.)`}</div>
                </>
              ) : (
                <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`-`}</div>
              )}
              <div className="w-[100%] grid items-center justify-center">
                <div
                  className="h-[48px] w-[200px] cursor-pointer uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
                  onClick={() => {
                    setCaseError("0");
                  }}
                >
                  {`Close`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
