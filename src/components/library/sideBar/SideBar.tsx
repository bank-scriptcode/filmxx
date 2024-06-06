"use client";
import React, { useEffect, useState } from "react";

let time: any = 50;
let timeMenu: any = 200;
function SideBar({ active, setActive }: any) {
  const [motionBackground, setMotionBackground] = useState(false);
  const [motion, setMotion] = useState(false);
  const [motionEnd, setMotionEnd] = useState(false);

  useEffect(() => {
    if (active) {
      setMotionEnd(true);
      setTimeout(() => {
        setMotionBackground(true);
        setTimeout(() => {
          setMotion(true);
        }, timeMenu);
      }, time);
    } else {
      setMotion(false);
      setTimeout(() => {
        setMotionBackground(false);
        setTimeout(() => {
          setMotionEnd(false);
        }, timeMenu);
      }, time);
    }
  }, [active]);

  return (
    <section className="fixed top-0 left-0 z-[9998]">
      {motionEnd && (
        <>
          <section
            onClick={() => {
              setActive(false);
            }}
            className={`bg-[#00000040] w-[100vw] h-[100vh] ${
              motionBackground ? " opacity-100" : " opacity-0"
            } duration-300 ease-in-out`}
          ></section>
          <aside
            className={`bg-[#ffffff] w-[300px] h-[100vh] fixed top-0  z-[9999] ${
              motion ? "left-0" : "left-[-300px]"
            } duration-300 ease-in-out`}
          >
            <section className=" flex items-center justify-between bg-[#f2f2f2] h-[50px] px-3">
              <main>Head</main>
              <div
                onClick={() => {
                  setActive(false);
                }}
                className=" cursor-pointer"
              >
                Close
              </div>
            </section>
            <section className=" h-[calc(100vh-50px)] overflow-y-auto">
                <div className=" grid gap-3 p-3">
                    <section className="">
                        <main className="flex items-center justify-between bg-[#eeeeee] rounded-lg p-2 cursor-pointer">
                            <div>menu 1</div>
                            <div>i</div>
                        </main>
                        <div>sub 1</div>
                        <div>sub 2</div>
                        <div>sub 3</div>
                    </section>
                    <section className="">
                        <main>Menu 2</main>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                    </section>
                    <section className="">
                        <main>Menu 3</main>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                    </section>
                </div>
            </section>
          </aside>
        </>
      )}
    </section>
  );
}

export default SideBar;
