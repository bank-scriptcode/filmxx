"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Datepicker from "tailwind-datepicker-react";

function DatePickerCus() {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>("");

  return (
    <div>
      <Datepicker
        options={{
          title: "",
          autoHide: true,
          todayBtn: false,
          clearBtn: true,
          clearBtnText: "Clear",
          maxDate: new Date("3030-01-01"),
          minDate: new Date("950-01-01"),
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
                <ArrowBackIosIcon style={{ fontSize: "24px" }} />
              </span>
            ),
            next: () => (
              <span>
                <ArrowForwardIosIcon style={{ fontSize: "24px" }} />
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
      />
    </div>
  );
}

export default DatePickerCus;
