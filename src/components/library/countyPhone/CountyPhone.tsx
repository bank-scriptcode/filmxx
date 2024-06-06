"use client";
import React, { useState } from "react";
import { CountrySelector } from "react-international-phone";
import "react-international-phone/style.css";

function CountyPhone() {
  const [country, setCountry] = useState("th");
  const [phoneCode, setPhoneCode] = useState<any>("66");
  const [phoneNumber, setPhoneNumber] = useState<number | string>("");

  return (
    <div>
      <div className=" flex">
        <CountrySelector
          className=""
          selectedCountry={country}
          onSelect={({ dialCode, iso2 }) => {
            setPhoneCode(dialCode);
            setCountry(iso2);
          }}
        />
        <input
          type="text"
          className="w-[65px] py-1 pl-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 border-r-0 text-sm "
          disabled={true}
          value={`+${phoneCode}`}
          onChange={(e: any) => {
            setPhoneCode(`+${e.target.value}`);
          }}
        />

        <input
          type="tel"
          className="w-full py-1 rounded-br-[8px] rounded-tr-[8px] border-l-0 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm"
          value={phoneNumber}
          maxLength={20}
          onChange={(event: any) => {
            const numericValue = event.target.value.replace(/\D/g, "");
            setPhoneNumber(numericValue);
          }}
        />
      </div>
    </div>
  );
}

export default CountyPhone;
