"use client"
import React from 'react'
import dynamic from "next/dynamic";

function Drawer() {
  const MapLeaflet = React.useMemo(
    () =>
      dynamic(() => import("@/components/library/mapCustom/MapLeaflet"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const handleClick = (payload:any) => {
   console.log(payload);
  };

  return (
    <div className=' w-[100%] h-[100%]'>
      <MapLeaflet handleClick={handleClick} />
    </div>
  )
}

export default Drawer