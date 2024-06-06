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
import axios from 'axios'
import { getCookie, setCookie } from "../utils/cookie";



function SignIn() {

  const router = useRouter();
  const params = useParams();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [imgBg, setImgBg] = useState(`/assets/image/12453 1.png`);
  const [caseError, setCaseError] = useState("0");
  const [borderRc, setBorderRc] = useState(false);
  const [passHind, setPassHind] = useState(false);

  const handleFormSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    setIsValidEmail(isValid);

    if (isValid) {
      handleSingIn();
    }
  };

  // const initLocale = async () => {
  //   let accessTokenAzure =  await getCookie("accessTokenAzure")
  //   console.log('accessTokenAzure : ', accessTokenAzure);
  //   let userInfo:any =  await getCookie("userInfo")
  //   console.log('userInfo : ', JSON.parse(userInfo));
  //   setCookie(`nx-access-token`, `test`, 111)
  //  let locale =  await getCookie("NEXT_LOCALE")
  //   router.push(`/${locale || `en`}/main`);
  //  }

  const handleSingIn = async () => {
    const res: any = await getApired(`/api/demo`, { email: email }, {});
    router.push(res?.data?.redirect);
  };

  const regisPage = async () => {
    // let locale = await getCookie("NEXT_LOCALE");
    // router.push(`/${locale}/signUp`);
  };

  const ForgotPassword = async () => {
    let locale =  await getCookie("NEXT_LOCALE")
    router.push(`/${locale || `en`}/forgotPassword`);
  };

  const loginInIn = async () => {
    router.push(`http://localhost:40002/api/authService/auth/azure`);
  };

  const loginInEx = async () => {
    // setCaseError("1");
    setCookie(`nx-access-token`, `test`, 111)
    let locale =  await getCookie("NEXT_LOCALE")
    router.push(`/${locale || `en`}/main`);
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
            <div className="w-[full] grid gap-2 cursor-pointer">
              <h3 className=" text-[#2B2A87] font-bold text-lg">{`Login`}</h3>
              <div className="h-[48px] uppercase bg-[#2B2A87] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2"
              onClick={()=>{loginInIn()}}
              >
                <img
                  src="/assets/image/Layer_1.png"
                  alt=""
                  className=" h-[19px]"
                />
                {`Login For Internal`}
              </div>
            </div>
            <div className="flex items-center h-[0]">
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
              <p className="mx-4 text-grey-600">or</p>
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
            </div>
            <div className=" grid gap-5">
              <input
                id="user"
                type="text"
                name="use"
                className={`w-full pl-3 pr-3 py-2 h-[48px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                placeholder={`Email or User ID`}
                autoFocus={true}
              />
              {!passHind ? (
                <div className=" relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className={`w-full pl-3 pr-[40px] py-2 h-[48px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                    placeholder={`Password`}
                  />
                  <VisibilityOffIcon onClick={()=>{setPassHind((pre:any) => !pre)}} className=" absolute top-[12px] right-[12px] text-[#949599] cursor-pointer" />
                </div>
              ) : (
                <div className=" relative">
                  <input
                    id="password"
                    type="text"
                    name="password"
                    className={`w-full pl-3 pr-[40px] py-2 h-[48px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87]`}
                    placeholder={`Password`}
                  />
                  <VisibilityIcon onClick={()=>{setPassHind((pre:any) => !pre)}} className=" absolute top-[12px] right-[12px] text-[#949599] cursor-pointer" />
                </div>
              )}
              <div className=" text-right">
                <span onClick={()=>{ForgotPassword()}} className=" cursor-pointer text-sm underline">{`Forgot Password ?`}</span>
              </div>
              <div className=" grid grid-cols-2 items-center gap-2">
                <div className="flex gap-2 w-full">
                  <div ref={captchaRef} />
                  <div
                    onClick={handleRefresh}
                    className=" cursor-pointer border-[#00ADEF] border-[1px] w-[20px] h-[20px] grid items-center justify-center rounded-md"
                  >
                    <RefreshIcon
                      className=" text-[16px]"
                      style={{ color: "#00ADEF" }}
                    />
                  </div>
                </div>
                <input
                  id="user"
                  type="text"
                  name="use"
                  className={`w-full pl-3 pr-3 py-2 h-[48px] rounded-lg border-[1px] bg-white border-[#DFE4EA] outline-none bg-opacity-100 focus:border-[#2B2A87] ${
                    borderRc ? " border-[1px] border-[#E10E0E]" : ""
                  }`}
                  placeholder={`Type the word`}
                  onChange={(e) => {
                    setBorderRc(false);
                    setValueCapcha(e.target.value);
                  }}
                  value={valueCapcha}
                />
              </div>
              <div
                className="w-[100%] grid cursor-pointer"
                onClick={() => {
                  handleValidate();
                }}
              >
                <div className="h-[48px] uppercase bg-[#00ADEF] text-[#F3F4F6] rounded-[10px] flex items-center justify-center gap-2">
                  {`Login For External`}
                </div>
              </div>
              <div className=" text-sm flex items-center gap-2 justify-center">
                <span>{`Don't have an account ?`}</span>
                <span className=" cursor-pointer text-[#00ADEF]">{`Register`}</span>
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
                <div className={`w-[50px] h-[50px] grid items-center justify-center rounded-full`} style={{background:caseError === "10" ? "#DAF8E6" : "#FEEBEB"}}>
                  <WarningAmberIcon style={{ color: caseError === "10" ? "#1A8245" : "#E10E0E" }} />
                </div>
              </div>
              <div className={`w-[100%] grid items-center justify-center text-[${caseError === "10" ? "#1A8245" : "#E10E0E" }] font-bold text-2xl`}>{caseError === "10" ? `Success` : `Login Failed`}</div>
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
              ) : caseError === "10" ? (
                <>
                  <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`Confirmation completed`}</div>
                  <div className="w-[100%] grid items-center justify-center text-[#637381] ">{`(Waiting for admin to check and approve.)`}</div>
                </>
              )
                : (
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

export default SignIn;
