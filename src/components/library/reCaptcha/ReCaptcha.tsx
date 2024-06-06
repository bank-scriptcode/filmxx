"use client";
import { useEffect, useState, useRef } from "react";
import useCaptcha from "use-offline-captcha";

function ReCaptcha() {
  const captchaRef: any = useRef();
  const [valueCapcha, setValueCapcha] = useState<any>("");
  const userOpt: any = {
    type: "mixed", // "mixed"(default) | "numeric" | "alpha"
    length: 5, // 4 to 8 number. default is 5
    sensitive: false, // Case sensitivity. default is false
    width: 200, // Canvas width. default is 200
    height: 50, // Canvas height. default is 50
    fontColor: "#000",
    background: "rgba(255, 255, 255, .2)",
  };
  const { gen, validate } = useCaptcha(captchaRef, userOpt);

  useEffect(() => {
    if (gen) gen();
  }, [gen]);

  const handleValidate = () => {
    const isValid = validate(valueCapcha);
    console.log(isValid);
  };

  const handleRefresh = () => gen();

  useEffect(() => {
    console.log(valueCapcha);
  }, [valueCapcha]);

  return (
    <div>
      <div ref={captchaRef} />
      <input
        onChange={(e) => setValueCapcha(e.target.value)}
        value={valueCapcha}
        className=" bg-white border-gray-400 border-[1px]"
      />
      <div>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <div>
        <button onClick={handleValidate}>check</button>
      </div>
    </div>
  );
}

export default ReCaptcha;
