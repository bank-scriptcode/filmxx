"use client";
import LocalSwitcher from "@/components/LocalSwitcher";
import ReduxExample from "@/components/Redux";
import ThemeMode from "@/components/ThemeMode";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  getApiDemo,
  getApiSignIn,
  signInOtp,
} from "@/service/api/controller/demoService";
import Header from "@/components/main/layout/Header";
import Swal from "sweetalert2";
import LibGoogleMap from "@/components/library/googleMap/GoogleMap";
import ThreeJs from "@/components/library/threejs/ThreeJs";
import ReactFlows from "@/components/library/reactFlow/ReactFlows";
import ModalDrag from "@/components/library/modalDrag/ModalDrag";
import Table from "@/components/library/table/Table";
import SideBar from "@/components/library/sideBar/SideBar";
import NavMenu from "@/components/library/navMenu/NavMenu";
import BarMenu from "@/components/library/barMenu/BarMenu";
import DragDrop from "@/components/library/dragdrop/DragDrop";
import ReactGridLayout from "@/components/library/reactGridLayout/ReactGridLayout";
import Country from "@/components/library/country/Country";
import DatePickerCus from "@/components/library/datePickerCus/DatePickerCus";
import CountyPhone from "@/components/library/countyPhone/CountyPhone";

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
        {/* <LibGoogleMap /> */}
        {/* ------ */}
        {/* <ThreeJs /> */}
        {/* ------ */}
        {/* <ReactFlows /> */}
        {/* ------ */}
        {/* <button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          OPEN MODAL
        </button>
        <ModalDrag
          openModal={openModal}
          setOpenModal={setOpenModal}
          header={`Drag the modal`}
          children={
            <p className="text-base lg:text-xl text-neutral-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              dolorum cum exercitationem. Voluptatum sunt minus, deserunt
              repellat facilis nemo ad, debitis, et ipsam est corrupti
              accusantium temporibus sequi aut praesentium. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Natus dolorum cum
              exercitationem. Voluptatum sunt minus, deserunt repellat facilis
              nemo ad, debitis, et ipsam est corrupti accusantium temporibus
              sequi aut praesentium. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Natus dolorum cum exercitationem. Voluptatum
              sunt minus, deserunt repellat facilis nemo ad, debitis, et ipsam
              est corrupti accusantium temporibus sequi aut praesentium. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Natus dolorum
              cum exercitationem. Voluptatum sunt minus, deserunt repellat
              facilis nemo ad, debitis, et ipsam est corrupti accusantium
              temporibus sequi aut praesentium. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Natus dolorum cum exercitationem.
              Voluptatum sunt minus, deserunt repellat facilis nemo ad, debitis,
              et ipsam est corrupti accusantium temporibus sequi aut
              praesentium. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Natus dolorum cum exercitationem. Voluptatum sunt minus,
              deserunt repellat facilis nemo ad, debitis, et ipsam est corrupti
              accusantium temporibus sequi aut praesentium. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Natus dolorum cum
              exercitationem. Voluptatum sunt minus, deserunt repellat facilis
              nemo ad, debitis, et ipsam est corrupti accusantium temporibus
              sequi aut praesentium. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Natus dolorum cum exercitationem. Voluptatum
              sunt minus, deserunt repellat facilis nemo ad, debitis, et ipsam
              est corrupti accusantium temporibus sequi aut praesentium. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Natus dolorum
              cum exercitationem. Voluptatum sunt minus, deserunt repellat
              facilis nemo ad, debitis, et ipsam est corrupti accusantium
              temporibus sequi aut praesentium. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Natus dolorum cum exercitationem.
              Voluptatum sunt minus, deserunt repellat facilis nemo ad, debitis,
              et ipsam est corrupti accusantium temporibus sequi aut
              praesentium. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Natus dolorum cum exercitationem. Voluptatum sunt minus,
              deserunt repellat facilis nemo ad, debitis, et ipsam est corrupti
              accusantium temporibus sequi aut praesentium. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Natus dolorum cum
              exercitationem. Voluptatum sunt minus, deserunt repellat facilis
              nemo ad, debitis, et ipsam est corrupti accusantium temporibus
              sequi aut praesentium. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Natus dolorum cum exercitationem. Voluptatum
              sunt minus, deserunt repellat facilis nemo ad, debitis, et ipsam
              est corrupti accusantium temporibus sequi aut praesentium.
            </p>
          }
        /> */}
        {/* ------ */}
        {/* <Table /> */}
        {/* ------ */}
        {/* <button
          onClick={() => {
            setActive(true);
          }}
        >
          OPEN Sidebar
        </button>
        <SideBar active={active} setActive={setActive} /> */}
        {/* ------ */}
        {/* <NavMenu /> */}
        {/* ------ */}
        {/* <BarMenu /> */}
        {/* ------ */}
        {/* <DragDrop /> */}
        {/* ------ */}
        {/* <ReactGridLayout /> */}
        {/* ------ */}
        {/* <div className="w-[100%] p-3">
          <Country />
        </div> */}
        {/* ------ */}
        <div className="w-[100%] p-3">
          <DatePickerCus />
        </div>
        {/* ------ */}
        {/* <div className="w-[100%] p-3">
          <CountyPhone />
        </div> */}
        {/* ------ */}
      </div>
    </>
  );
}

export default Demo;
