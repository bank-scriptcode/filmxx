"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChartCustom from "@/components/library/chartCustom/ChartCustom";

function Demo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className=" h-[calc(100vh-115px)]">
        <div className="w-[100%] h-[100%] bg-[#ffffff] text-black p-3 overflow-y-auto">
          <ChartCustom />
        </div>
      </div>
    </>
  );
}

export default Demo;
