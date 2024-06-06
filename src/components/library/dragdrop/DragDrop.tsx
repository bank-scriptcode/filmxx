"use client";
import React, { useEffect, useRef, useState } from "react";

let tempData: any = [
  {
    id: 1,
    name: "aaa",
    color: "#ff0000",
    span:"col-span-4"
  },
  {
    id: 2,
    name: "bbb",
    color: "#fff000",
    span:"col-span-4"
  },
  {
    id: 3,
    name: "ccc",
    color: "#995500",
    span:"col-span-3"
  },
  {
    id: 4,
    name: "ddd",
    color: "#005500",
    span:"col-span-7"
  },
];

function DragDrop() {
  const dragItem:any = useRef();
  const dragOverItem:any = useRef();
  const [itemState, setItemState] = useState(tempData || []);
//   const [itemState, setItemState] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);

  const dragStart = (e: any, position: any) => {
    dragItem.current = position;
    console.log(e.target.innerHTML)
    console.log('position : ', position);
  };

  const drop = (e:any) => {
    const copyListItems = [...itemState];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItemState(copyListItems);
  };

  const dragEnter = (e: any, position: any) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  useEffect(() => {
    console.log(itemState);
  }, [itemState]);

  return (
    <div className="p-5 m-5 border-dashed border-[1px] h-[100%]">
      <div className=" grid grid-cols-12">
        {(itemState || []).map((item: any, ix: any) => {
          return (
            <div
              key={ix}
              draggable={true}
              className={`w-[100%] h-[200px] ${item?.span}`}
              style={{ background: item?.color }}
              onDragOver={(e: any) => {
                e.preventDefault();
                // e.stopPropagation();
                // console.log("onDragOver : ", e);
              }}
              onDragStart={(e) => dragStart(e, ix)}
              onDrop={drop}
              onDragEnter={(e) => dragEnter(e, ix)}
              //   onDragStart={(e: any) => {
              //     console.log("onDragStart : ", e);
              //   }}
            //   onDragEnd={(e: any) => {
            //     console.log("onDragEnd : ", e);
            //   }}
            //   onDrop={(e: any) => {
            //     console.log(ix);
            //   }}
            //   onDragEnter={(e: any) => {
            //     console.log("onDragEnter : ", e);
            //   }}
            //   onDragLeave={(e: any) => {
            //     console.log("onDragLeave : ", e);
            //   }}
            >
              {item?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DragDrop;
