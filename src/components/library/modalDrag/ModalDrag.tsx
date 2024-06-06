"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
// import { gsap } from "gsap";
// import { Draggable } from 'gsap/all'
import gsap from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function ModalDrag({ children, header, openModal, setOpenModal }: any) {
  const [hideModal, setHideModal] = useState(true);

  useEffect(() => {
    if (openModal) {
      setHideModal(true);
      const page: any = document.getElementById("page"),
        wrapper = document.getElementById("wrapper"),
        modal = document.getElementById("modal"),
        reset = document.getElementById("reset"),
        initialX = -50,
        initialY = -50;

      Draggable.create(modal, {
        type: "x,y",
        bounds: wrapper,
        edgeResistance: 0.85,
        inertia: true,
        throwResistance: 3000,
        onPressInit: function () {
          page.classList.add("bg-[#515151e0]");
        },
        onRelease: function () {
          page.classList.remove("bg-[#515151e0]");
        },
        onDrag: function () {
          const x = gsap.getProperty(this, "x"),
            y = gsap.getProperty(this, "y");
        },
      });
    }
    return () => {};
  }, [openModal]);

  useLayoutEffect(() => {
    gsap.registerPlugin(Draggable, ScrollTrigger);
  }, []);

  return (
    <>
      {openModal && (
        <div
          id="page"
          className="w-screen h-screen bg-[#51515150] transition-colors duration-500 p-2 md:p-10 fixed top-0 left-0 z-[999]"
        >
          <div id="wrapper" className="w-full h-full">
            <div
              id="modal"
              className={` ${
                hideModal ? `w-[80%] max-w-screen-md ` : `w-fit`
              } bg-neutral-50  text-center antialiased shadow-2xl shadow-zinc-900 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md p-3`}
            >
              <div className=" flex items-center justify-end">
                <div className=" flex gap-2">
                  <div
                    className="w-[16px] h-[16px] cursor-pointer flex items-center justify-center"
                    onClick={() => {
                      setHideModal((pre: any) => !pre);
                    }}
                  >
                    {hideModal ? `-` : `+`}
                  </div>
                  <div
                    className="w-[16px] h-[16px] cursor-pointer flex items-center justify-center"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    {`x`}
                  </div>
                </div>
              </div>
              {hideModal && (
                <>
                  <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 my-4">
                    {header}
                  </h1>
                  <div className="max-h-[80vh] overflow-y-auto ">
                    {children}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDrag;
