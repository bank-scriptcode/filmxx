"use client";
import React, { useEffect, useState } from "react";
import ShowcaseLayout from "./ShowcaseLayout";

const ReactGridLayout = () => {
  const [layout, setLayout] = useState([]);

  const onLayoutChange = (newLayout:any) => {
    setLayout(newLayout);
  };

  
  useEffect(() => {
      console.log('layout : ', layout);
  }, [layout])
  

  return (
    <div>
      <ShowcaseLayout onLayoutChange={onLayoutChange} />
    </div>
  );
};


export default ReactGridLayout;
