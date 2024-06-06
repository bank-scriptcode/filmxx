"use client";
import LocalSwitcher from "@/components/LocalSwitcher";
import ReduxExample from "@/components/Redux";
import ThemeMode from "@/components/ThemeMode";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
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
import { Pagination } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import dynamic from "next/dynamic";
// import Select from "react-tailwindcss-select";
import Select from "react-select";
import dayjs from "dayjs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Datepicker from "tailwind-datepicker-react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// @ts-ignore
import { DateRangePicker, DayPickerRangeController } from "react-date-range";
import { addDays, format, isWeekend } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CheckIcon from "@mui/icons-material/Check";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DownloadIcon from "@mui/icons-material/Download";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import TimelineIcon from "@mui/icons-material/Timeline";
import MovingIcon from "@mui/icons-material/Moving";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import OutputIcon from "@mui/icons-material/Output";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PendingIcon from "@mui/icons-material/Pending";
import ApiIcon from "@mui/icons-material/Api";
import InfoIcon from "@mui/icons-material/Info";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import NearMeIcon from "@mui/icons-material/NearMe";
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  Panel,
  useStoreApi,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  Handle,
  Position,
  NodeToolbar,
  getConnectedEdges,
  useNodeId,
  useStore,
  EdgeProps,
  useReactFlow,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
  MarkerType,
  getStraightPath,
  BackgroundVariant,
} from "reactflow";

import "reactflow/dist/style.css";
import { io } from "socket.io-client";
import _ from "lodash";
import pako from 'pako'

// const socket: any = io(`http://110.164.203.174:43001/v1`);
const socket: any = io(`http://192.168.100.254:44401/v1`);

function CustomNodeCursor(payload: any) {
  // console.log(payload);
  const { id, data, style } = payload;

  return (
    // <div className="customNode w-[50px] h-[50px] grid items-center justify-center">
    <div
      // className="customNodeBody"
      className=" whitespace-nowrap flex items-center relative "
      style={{}}
    >
      <NearMeIcon className=" -rotate-90" style={{ fontSize: "16px" }} />
      <div className=" bg-[#515151] rounded-full px-2 py-[1px] flex items-center justify-center ">
        <span className=" text-[9px] text-[#ffffff]">
          {`${data?.name || "-"}`}
        </span>
      </div>
    </div>
  );
}

function CustomNode(payload: any) {
  // console.log(payload);
  const { id, data, style } = payload;

  return (
    // <div className="customNode w-[50px] h-[50px] grid items-center justify-center">
    <div
      // className="customNodeBody"
      className=" whitespace-nowrap flex items-center relative "
      style={data.style}
    >
          {/* <Handle
            // className="customHandle"
            className=""
            position={Position.Right}
            type="source"
          />
         
          <Handle
            // className="customHandle"
            className=" "
            position={Position.Left}
            type="target"
            isConnectableStart={false}
          /> */}
      {`${data?.name || "-"}`}
    </div>
  );
}

const nodeTypes = {
  cursor: CustomNodeCursor,
  nodeCus: CustomNode,
};

const edgeTypes = {
  // floating: FloatingEdge,
};

function Demo() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const reactFlowWrapper = useRef<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [active, setActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nodeState, setNodeState] = useState<any>([
    {
      id: "1",
      type: "nodeCus",
      position: { x: 0, y: 0 },
      data: {
        id: "1",
        name: "Node1",
        createDocuments: true,
        relations: [],
        roleManage: [
          {
            id: 1,
            name: "admin",
            companyType: "Contractor",
          },
        ],
      },
      style: {
        backgroundColor: "#999999",
        boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        border: "1px solid #ffffff",
        padding: "1px 2px",
      },
    },
    {
      id: "2",
      type: "nodeCus",
      position: { x: 300, y: 200 },
      data: {
        id: "1",
        name: "Node2",
        createDocuments: true,
        relations: [],
        roleManage: [
          {
            id: 1,
            name: "admin",
            companyType: "Contractor",
          },
        ],
      },
      style: {
        backgroundColor: "#999999",
        boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        // border: "1px solid #ffffff",
        padding: "1px 2px",
      },
    },
    // {
    //   id: "101",
    //   type: "cursor",
    //   position: { x: 100, y: 100 },
    //   data: {
    //     id: "1",
    //     name: "cursor - test",
    //     createDocuments: true,
    //     relations: [],
    //     roleManage: [
    //       {
    //         id: 1,
    //         name: "admin",
    //         companyType: "Contractor",
    //       },
    //     ],
    //   },
    //   style: {
    //     width:"15px",
    //     height:"15px",
    //     backgroundColor: "#999999",
    //     borderRadius: "100%",
    //     border: "1px solid #ffffff",
    //     boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
    //   },
    //   // parentNode: "groupA",
    // },
  ]);
  const [edgesState, setEdgesState] = useState<any>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onNodesChange = useCallback(
    (changes: any) => {
      return setNodeState((nds: any) => applyNodeChanges(changes, nds));
    },
    [setNodeState]
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      return setEdgesState((eds: any) => applyEdgeChanges(changes, eds));
    },
    [setEdgesState]
  );

  const onConnect = useCallback(
    (params: any) => setEdgesState((eds: any) => addEdge(params, eds)),
    [setEdgesState]
  );

  const onMessage = async (e1: any) => {
    
    const decompressedData = pako.inflate(new Uint8Array(e1), { to: 'string' });
    let e = JSON.parse(decompressedData);

    let filId = await nodeState.find((f:any) => { return f?.id === e?.id })
    setNodeState( (pre:any) => {

      if(!!!filId) pre.push({
        id: `${e?.id}`,
        type: "cursor",
        position: e?.position,
        draggable: false,
        data: {
          style: {
            width: "15px",
            height: "15px",
            backgroundColor: "#999999",
            borderRadius: "100%",
            border: "1px solid #ffffff",
            boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
          },
          id: `${e?.id}`,
          name: `cursor - ${e?.id}`,
          createDocuments: true,
          relations: [],
          roleManage: [
            {
              id: 1,
              name: "admin",
              companyType: "Contractor",
            },
          ],
        },
  
        style: {
          width: "15px",
          height: "15px",
          zIndex: "9999",
        },
      })

      let preSock = pre.map((ps:any) => {

        return {...ps, socketId: ps?.id === e?.id ? e?.socketId : ps?.socketId}
      })

      let finalPre = preSock.map((es: any) => {
        let position = es.position
             if (es?.id === e?.id) {
                position = e?.position;
              }
        return {
          ...es,
          position: position,
          style: {
            ...es.style,
            display: es?.id === socket?.id ? "none" : "block",
            border: !!es.socketId && socket?.id !== es.socketId && es.type !== "cursor" && "1px solid #ff0000"
          },
        };
      });

      return finalPre
    })

  };

  const compressData = async (payload:any) => {
      let jsonString = JSON.stringify(payload);
      const compressedData = pako.deflate(jsonString);
      const arrayBuffer = compressedData.buffer
    return arrayBuffer
  }

  const onCursorMove = useCallback(
    async (event: any) => {
      event.preventDefault();

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const arrayBuffer = await compressData({id:socket?.id, position: position, socketId: null})
      
      socket.emit("sendMessageToRoom", { room: "FlowCursor", message: arrayBuffer });
  
      return true;
    },
    [reactFlowInstance, nodeState]
  );

  const onLeaveClient = async (e: any) => {
    console.log('e : ', e);
    let fil = nodeState.filter((f: any) => {
      return f?.data?.id != e;
    });
    setNodeState(fil);
  };

  useEffect(() => {
    console.log("transport : ", transport);
  }, [transport]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.emit("joinRoom", "FlowCursor");
    socket.emit("joinRoom", "FlowNode");
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("leaveClient", onLeaveClient);

    return () => {
      socket.emit("leaveRoom", "FlowCursor");
      socket.emit("leaveRoom", "FlowNode");
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  async function onNodeDrag(event: any, node: any) {
    
    const position = reactFlowInstance?.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
  
    const bufViewCursor = await compressData({id:socket?.id, position: position, socketId: null})
    await socket.emit("sendMessageToRoom", { room: "FlowNode", message: bufViewCursor });

    const bufView = await compressData({id:node?.id, position: node?.position, socketId: socket?.id})
    await socket.emit("sendMessageToRoom", { room: "FlowNode", message: bufView });
  }

  async function onNodeDragStop(event: any, node: any) {
   
    const arrayBuffer = await compressData({id:node?.id, position: node?.position, socketId: null})
    socket.emit("sendMessageToRoom", { room: "FlowNode", message: arrayBuffer });
    
  }

  // useEffect(() => {
  //   console.log(nodeState);
  // }, [nodeState])


  return (
    <>
      <div
        // id="roomBox"
        className=" h-[calc(100vh-115px)]"
        ref={reactFlowWrapper}
      >
        <ReactFlow
          onInit={setReactFlowInstance}
          onMouseMove={onCursorMove}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          nodes={nodeState}
          edges={edgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          deleteKeyCode={[]}
          proOptions={{ hideAttribution: true }}
          fitViewOptions={{
            padding: 0.2,
            // includeHiddenNodes?: boolean;
            // minZoom?: number;
            // maxZoom?: number;
            // duration?: number;
          }}
          defaultViewport={{ x: 0, y: 0, zoom: 0 }}
          // defaultEdgeOptions={{
          //   style: { strokeWidth: 2, stroke: "black" },
          //   // type: "smoothstep",
          //   type: "floating",
          //   markerEnd: {
          //     type: MarkerType.ArrowClosed,
          //     color: "black",
          //   },
          // }}
          // connectionLineComponent={CustomConnectionLine}
          // connectionLineStyle={{
          //   strokeWidth: 2,
          //   stroke: "black",
          // }}
        >
          <Controls />
          <MiniMap
            // nodeColor={nodeColor}
            nodeStrokeWidth={2}
            zoomable
            pannable
          />
          <Panel position="top-right">
            <div></div>
          </Panel>
          {/* @ts-ignore */}
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
}

function page() {
  useEffect(() => {}, []);

  return (
    <div className="">
      <div>
        <ReactFlowProvider>
          <Demo />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default page;
