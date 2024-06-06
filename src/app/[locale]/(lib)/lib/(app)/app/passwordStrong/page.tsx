"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordStrong from "@/components/library/passwordStrong/PasswordStrong";

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
        <div className="w-[100%] h-[100%] bg-[#ffffff] text-black p-3 overflow-y-auto flex items-center justify-center">
          <div className="w-[50%]">
          <PasswordStrong />
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
