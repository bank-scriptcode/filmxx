"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

let tempData = [
  {
    x: 0,
    y: 0,
    w: 3,
    h: 2,
    i: "0",
    static: false,
    data: null,
  },
  {
    x: 3,
    y: 0,
    w: 3,
    h: 2,
    i: "1",
    static: false,
    data: {
      type: "card",
      text: "ปริมาณน้ำมันคงเหลือ",
      value: "30 kml.",
      accuracy: "45%",
      color:"#61c0f7",
      icon: (
        <LocalGasStationIcon style={{ fontSize: "80px", color: "#515151" }} />
      ),
    },
  },
  {
    x: 6,
    y: 0,
    w: 3,
    h: 2,
    i: "2",
    static: false,
    data: null,
  },
  {
    x: 9,
    y: 0,
    w: 3,
    h: 2,
    i: "3",
    static: false,
    data: null,
  },
  {
    x: 0,
    y: 3,
    w: 9,
    h: 6,
    i: "4",
    static: false,
    data: null,
  },
  {
    x: 9,
    y: 3,
    w: 3,
    h: 6,
    i: "5",
    static: false,
    data: null,
  },
];

const ShowcaseLayout = (props: any) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [compactType, setCompactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);
  const [modeEdit, setModeEdit] = useState(true);
  const [layouts, setLayouts] = useState({ lg: tempData });
  const [mockData, setMockData] = useState(tempData);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log(layouts);
  }, [layouts]);

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
  };

  const UiCard = ({ item }: any) => {
    return (
      <>
        <div className={` bg-[#e9e9e9] h-[100%] w-[100%] grid grid-cols-[1fr,2fr]`}
        style={{border:`1px solid ${item?.data?.color}`}}
        >
          <div className={`grid items-center justify-center`} style={{background:`${item?.data?.color}`}}> 
            <div>
              <div>{item?.data?.icon}</div>
              <div className="text-center text-[24px] text-[#515151]">
                {item?.data?.accuracy}
              </div>
            </div>
          </div>
          <div className=" grid items-center justify-center">
            <div>
              <div className={`text-[60px] text-center`} style={{color:`${item?.data?.color}`}}>{item?.data?.value}</div>
              <div className=" text-[20px] text-center text-[#515151]">{item?.data?.text}</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const UiComingSoon = ({ item, index }: any) => {
    return (
      <>
        <div className="bg-[#ccc] h-[100%] border-[1px] border-[#515151] grid items-center justify-center text-white">
          {`Coming Soon [${index}]`}
        </div>
      </>
    );
  };

  const genUiDash = (item: any, i: any) => {
    let domUi = null;

    switch (item?.data?.type) {
      case "card":
        domUi = <UiCard item={item} />;
        break;

      default:
        domUi = <UiComingSoon item={item} index={i} />;
        break;
    }

    return domUi;
  };

  return (
    <div>
      <ResponsiveReactGridLayout
        {...props}
        className={"layout"}
        rowHeight={80}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDraggable={modeEdit}
        isRearrangeable={modeEdit}
        isResizable={modeEdit}
      >
        {mockData.map((item: any, i: any) => {
          return (
            <div key={i} className={``}>
              {genUiDash(item, i)}
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default ShowcaseLayout;
