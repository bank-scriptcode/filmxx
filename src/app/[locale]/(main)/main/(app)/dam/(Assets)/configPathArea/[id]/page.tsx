"use client";
import React, { useCallback, useEffect, useState } from "react";
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

const NODE_WIDTH = 116;
const NODE_HEIGHT = 28;
const OVERLAP_OFFSET = 10;
let currentOverlapOffset = 0;

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

function FloatingEdge({ id, source, target, markerEnd, style }: any) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
        // onClick={onEdgeActive}
      />
    </>
  );
}

const onEdgeActive = (evt: any) => {
  console.log("evt : ", evt);
  // evt.stopPropagation();
  // alert(`remove ${id}`);
};

function getEdgeParams(source: any, target: any) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

function getEdgePosition(node: any, intersectionPoint: any) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

function getNodeIntersection(intersectionNode: any, targetNode: any) {
  const {
    width: intersectionNodeWidth,
    height: intersectionNodeHeight,
    positionAbsolute: intersectionNodePosition,
  } = intersectionNode;
  const targetPosition = targetNode.positionAbsolute;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNode.width / 2;
  const y1 = targetPosition.y + targetNode.height / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

function CustomConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  connectionLineStyle,
}: any) {
  const [edgePath] = getStraightPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <g>
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <circle
        cx={toX}
        cy={toY}
        fill="black"
        r={3}
        stroke="black"
        strokeWidth={1.5}
      />
    </g>
  );
}

function CustomNode(payload: any) {
  // console.log(payload);
  const { id, data, style } = payload;
  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;

  return (
    // <div className="customNode w-[50px] h-[50px] grid items-center justify-center">
    <div className=" w-[50px] h-[50px] grid items-center justify-center">
      <div
        // className="customNodeBody"
        className=" "
        style={{
          backgroundColor: isTarget ? "#0DaDEF" : style?.backgroundColor,
          border: isTarget ? "1px dashed #ffffff" : `0`,
          // borderRadius: isTarget ? "3px" : "0",
          color: isTarget ? "#ffffff" : "#ffffff",
        }}
      >
        {!isConnecting && (
          <Handle
            // className="customHandle"
            className=""
            position={Position.Right}
            type="source"
          />
          //   <Handle
          //   // className="customHandle"
          //   className=" "
          //   position={Position.Right}
          //   type="source"
          //   isConnectableStart={false}
          //   style={{ background:"#DEDEDE", width:"15px", height:"15px", display:"flex", justifyContent:"center", alignItems:"center", left:"-7.5px" }}
          // >
          //     <OutputIcon style={{ fontSize:"8px" }} />
          //   </Handle>
        )}
        {
          // isConnecting &&
          <Handle
            // className="customHandle"
            className=" "
            position={Position.Left}
            type="target"
            isConnectableStart={false}
            style={{
              background: "#DEDEDE",
              width: "10px",
              height: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              left: "-5px",
            }}
          >
            <OutputIcon style={{ fontSize: "6px" }} />
          </Handle>
        }
        {`${data?.name || "-"}`}
      </div>
    </div>
  );
}

function CustomNode2(payload: any) {
  // console.log(payload);
  const { id, data, style } = payload;
  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;

  return (
    // <div className="customNode w-[50px] h-[50px] grid items-center justify-center">
      <div
        // className="customNodeBody"
        className="  "
        // style={{
        //   backgroundColor: "#0DaDEF",
        //   border: isTarget ? "1px dashed #ffffff" : `0`,
        //   // borderRadius: isTarget ? "3px" : "0",
        //   color: isTarget ? "#ffffff" : "#ffffff",
        // }}
      >
       <img src="/assets/image/logo.png" className="w-full h-full" alt="" />
       {/* <Handle
            // className="customHandle"
            className=""
            position={Position.Right}
            type="source"
          /> */}
          <Handle
            // className="customHandle"
            className=""
            position={Position.Right}
            type="source"
          />
      </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
  custom2: CustomNode2
};

const edgeTypes = {
  floating: FloatingEdge,
};

const MySelect = ({
  placeholder,
  options,
  seUseType,
  setSeUseType,
  className,
  classNamePrefix,
  styles,
  disabled,
  filterOption,
}: any) => {
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    disabled ? (
      <div className={`${className} border-[#DFE4EA] border-[1px]`}>
        {seUseType}
      </div>
    ) : (
      <>
        {!!filterOption ? (
          <Select
            id={id}
            value={seUseType}
            onChange={(value: any) => {
              setSeUseType(value);
            }}
            options={options}
            placeholder={placeholder}
            className={className}
            classNamePrefix={classNamePrefix}
            styles={styles}
            filterOption={(option, searchText) => {
              if (
                option.data.searchCus
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                return true;
              } else {
                return false;
              }
            }}
          />
        ) : (
          <Select
            id={id}
            value={seUseType}
            onChange={(value: any) => {
              setSeUseType(value);
            }}
            options={options}
            placeholder={placeholder}
            className={className}
            classNamePrefix={classNamePrefix}
            styles={styles}
          />
        )}
      </>
    )
  ) : null;
};

const LayoutPath = () => {
  const [flagOnMenu, setFlagOnMenu] = useState(false);
  const [pathVersion, setPathVersion] = useState({id:1,version:"1.0"})
  const [pathShowData, setPathShowData] = useState<any>([])
  const [nodeState, setNodeState] = useState<any>(
    [
      {
        id: "1",
        type: "custom",
        position: { x: 100, y: 100 },
        data: {
          id: "1",
          name: "A1",
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
          borderRadius: "100%",
          border: "1px solid #ffffff",
          boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        },
        // parentNode: "groupA",
      },
      {
        id: "2",
        type: "custom",
        position: { x: 300, y: 100 },
        data: {
          id: "1",
          name: "B1",
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
          backgroundColor: "#55aaaa",
          borderRadius: "100%",
          border: "1px solid #ffffff",
          boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        },
        // parentNode: "groupA",
      },
      {
        id: "3",
        type: "custom",
        position: { x: 500, y: 100 },
        data: {
          id: "1",
          name: "Z-5",
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
          backgroundColor: "#22ff11",
          borderRadius: "100%",
          border: "1px solid #ffffff",
          boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        },
        // parentNode: "groupA",
      },
      {
        id: "4",
        type: "custom",
        position: { x: 200, y: 400 },
        data: {
          id: "1",
          name: "X1",
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
          backgroundColor: "#aaaf11",
          borderRadius: "100%",
          border: "1px solid #ffffff",
          boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        },
        // parentNode: "groupA",
      },
      {
        id: "5",
        type: "custom",
        position: { x: 500, y: 300 },
        data: {
          id: "1",
          name: "Y1",
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
          backgroundColor: "#0077ff",
          borderRadius: "100%",
          border: "1px solid #ffffff",
          boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        },
        // parentNode: "groupA",
      },
      {
        id: "6",
        type: "custom",
        position: { x: 700, y: 400 },
        data: {
          id: "1",
          name: "I1",
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
          backgroundColor: "#f077ff",
          borderRadius: "100%",
          border: "1px solid #ffffff",
          boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        },
        // parentNode: "groupA",
      },
      {
        id: "7",
        type: "custom",
        position: { x: 350, y: 400 },
        data: {
          id: "1",
          name: "U2",
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
          backgroundColor: "#4ff7ff",
          borderRadius: "100%",
          border: "1px solid #ffffff",
          boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
        },
        // parentNode: "groupA",
      },
      // {
      //   id: "99",
      //   type: "custom2",
      //   position: { x: 350, y: 900 },
      //   data: {
      //     id: "1",
      //     name: "U2",
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
      //     // backgroundColor: "#4ff7ff",
      //     // borderRadius: "100%",
      //     // border: "1px solid #ffffff",
      //     // boxShadow: "rgba(149, 157, 165, 0.2) 10px 8px 24px",
      //   },
      //   // parentNode: "groupA",
      // },
    ] || []
  );
  const [edgesState, setEdgesState] = useState<any>([
    {
      style: {
        strokeWidth: 2,
        stroke: "black",
      },
      type: "floating",
      markerEnd: {
        type: "arrowclosed",
        color: "black",
      },
      source: "1",
      sourceHandle: null,
      target: "2",
      targetHandle: null,
      id: "reactflow__edge-1-2",
    },
    {
      style: {
        strokeWidth: 2,
        stroke: "black",
      },
      type: "floating",
      markerEnd: {
        type: "arrowclosed",
        color: "black",
      },
      source: "2",
      sourceHandle: null,
      target: "3",
      targetHandle: null,
      id: "reactflow__edge-2-3",
    },
    {
      style: {
        strokeWidth: 2,
        stroke: "black",
      },
      type: "floating",
      markerEnd: {
        type: "arrowclosed",
        color: "black",
      },
      source: "1",
      sourceHandle: null,
      target: "4",
      targetHandle: null,
      id: "reactflow__edge-1-4",
    },
    {
      style: {
        strokeWidth: 2,
        stroke: "black",
      },
      type: "floating",
      markerEnd: {
        type: "arrowclosed",
        color: "black",
      },
      source: "2",
      sourceHandle: null,
      target: "5",
      targetHandle: null,
      id: "reactflow__edge-2-5",
    },
    {
      style: {
        strokeWidth: 2,
        stroke: "black",
      },
      type: "floating",
      markerEnd: {
        type: "arrowclosed",
        color: "black",
      },
      source: "5",
      sourceHandle: null,
      target: "6",
      targetHandle: null,
      id: "reactflow__edge-5-6",
    },
    {
      style: {
        strokeWidth: 2,
        stroke: "black",
      },
      type: "floating",
      markerEnd: {
        type: "arrowclosed",
        color: "black",
      },
      source: "7",
      sourceHandle: null,
      target: "5",
      targetHandle: null,
      id: "reactflow__edge-7-5",
    },
    // {
    //   style: {
    //     strokeWidth: 2,
    //     stroke: "black",
    //   },
    //   type: "floating",
    //   markerEnd: {
    //     type: "arrowclosed",
    //     color: "black",
    //   },
    //   source: "5",
    //   sourceHandle: null,
    //   target: "2",
    //   targetHandle: null,
    //   id: "reactflow__edge-5-2",
    // },
  ]);
  // const [edgesState, setEdgesState] = useState<any>(
  //   [
  //     {
  //       style: {
  //         strokeWidth: 3,
  //         stroke: "black",
  //       },
  //       type: "floating",
  //       markerEnd: {
  //         type: "arrowclosed",
  //         color: "black",
  //       },
  //       source: "1",
  //       sourceHandle: null,
  //       target: "2",
  //       targetHandle: null,
  //       id: "reactflow__edge-1-2",
  //     },
  //     {
  //       style: {
  //         strokeWidth: 3,
  //         stroke: "black",
  //       },
  //       type: "floating",
  //       markerEnd: {
  //         type: "arrowclosed",
  //         color: "black",
  //       },
  //       source: "2",
  //       sourceHandle: null,
  //       target: "1",
  //       targetHandle: null,
  //       id: "reactflow__edge-2-1",
  //     },
  //     {
  //       style: {
  //         strokeWidth: 3,
  //         stroke: "black",
  //       },
  //       type: "floating",
  //       markerEnd: {
  //         type: "arrowclosed",
  //         color: "black",
  //       },
  //       source: "2",
  //       sourceHandle: null,
  //       target: "3",
  //       targetHandle: null,
  //       id: "reactflow__edge-2-3",
  //     },
  //     {
  //       style: {
  //         strokeWidth: 3,
  //         stroke: "black",
  //       },
  //       type: "floating",
  //       markerEnd: {
  //         type: "arrowclosed",
  //         color: "black",
  //       },
  //       source: "3",
  //       sourceHandle: null,
  //       target: "4",
  //       targetHandle: null,
  //       id: "reactflow__edge-3-4",
  //     },
  //     {
  //       style: {
  //         strokeWidth: 3,
  //         stroke: "black",
  //       },
  //       type: "floating",
  //       markerEnd: {
  //         type: "arrowclosed",
  //         color: "black",
  //       },
  //       source: "3",
  //       sourceHandle: null,
  //       target: "5",
  //       targetHandle: null,
  //       id: "reactflow__edge-3-5",
  //     },
  //     {
  //       style: {
  //         strokeWidth: 3,
  //         stroke: "black",
  //       },
  //       type: "floating",
  //       markerEnd: {
  //         type: "arrowclosed",
  //         color: "black",
  //       },
  //       source: "5",
  //       sourceHandle: null,
  //       target: "1",
  //       targetHandle: null,
  //       id: "reactflow__edge-5-1",
  //     },
  //     {
  //       style: {
  //         strokeWidth: 3,
  //         stroke: "black",
  //       },
  //       type: "floating",
  //       markerEnd: {
  //         type: "arrowclosed",
  //         color: "black",
  //       },
  //       source: "4",
  //       sourceHandle: null,
  //       target: "b1",
  //       targetHandle: null,
  //       id: "reactflow__edge-4-b1",
  //     },
  //     {
  //       style: {
  //         strokeWidth: 3,
  //         stroke: "black",
  //       },
  //       type: "floating",
  //       markerEnd: {
  //         type: "arrowclosed",
  //         color: "black",
  //       },
  //       source: "b1",
  //       sourceHandle: null,
  //       target: "b2",
  //       targetHandle: null,
  //       id: "reactflow__edge-b1-b2",
  //     },
  //   ] || []
  // );

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

  function CustomConnectionLine({
    fromX,
    fromY,
    toX,
    toY,
    connectionLineStyle,
  }: any) {
    const [edgePath] = getStraightPath({
      sourceX: fromX,
      sourceY: fromY,
      targetX: toX,
      targetY: toY,
    });

    return (
      <g>
        <path style={connectionLineStyle} fill="none" d={edgePath} />
        <circle
          cx={toX}
          cy={toY}
          fill="black"
          r={3}
          stroke="black"
          strokeWidth={1.5}
        />
      </g>
    );
  }

  const nodeColor = (node: any) => {
    for (let i = 0; i < node.length; i++) {
      return node[i].style?.backgroundColor;
    }
  };

  const MenuList = () => {
    return (
      <div className="grid">
        <div>
          <div className="group relative mb-2 bg-gray-100">
            <ListIcon
              className={` ${
                flagOnMenu ? "text-[#0DaDEF]" : "text-gray-400"
              } rounded-tl-sm rounded-bl-sm cursor-pointer`}
              onClick={() => {
                setFlagOnMenu((pre: any) => !pre);
              }}
              style={{ margin: 0 }}
            />
            <span className="absolute top-0 right-[30px] scale-0 rounded bg-[#0DaDEF] p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
              List Path
            </span>
          </div>
        </div>
      </div>
    );
  };

  const calculatePath = async () => {
    console.log(nodeState);
    console.log(edgesState);
    let startPath: any = [];
    let exitPath: any = [];
    edgesState.forEach((e: any) => {
      let fil = edgesState.find((f: any) => {
        return f?.target === e?.source;
      });
      if (!!!fil) {
        startPath.push(e);
      }
      return e;
    });
    edgesState.forEach((e: any) => {
      let fil = edgesState.find((f: any) => {
        return f?.source === e?.target;
      });
      if (!!!fil) {
        exitPath.push(e);
      }
      return e;
    });
    // console.log("startPath : ", startPath);
    // console.log("exitPath : ", exitPath);

    // let elementPath: any = [];
    // ห้ามลบ
    // const infinityLoopEnd: any = async (infinitData: any, e: any) => {
    //   let fil = edgesState.find((f: any) => {
    //     return f?.target === e?.source;
    //   });
    //   infinitData = (!!fil && [fil, ...infinitData]) || [...infinitData];
    //   if (!!fil) {
    //     console.log("1 : ", infinitData);
    //     return await infinityLoopEnd(infinitData, fil);
    //   } else {
    //     console.log("2 : ", infinitData);
    //     return infinitData;
    //   }
    // };

    // await Promise.all(
    //   exitPath.map(async (e: any, i: any) => {
    //     let fil = await infinityLoopEnd([], e);
    //     elementPath[i] = [...fil, e];
    //   })
    // );
    // console.log("elementPath: ", elementPath);


        const findPaths = (edges:any, targetNode:any) => {
          
          const paths:any = [];

        //   const dfs = (currentNode:any, path:any, visited:any) => {
        //     if (visited.has(currentNode)) {
        //         // If the current node is already visited, it indicates a cycle
        //         return;
        //     }
        //     visited.add(currentNode);
        
        //     if (currentNode === targetNode) {
        //         paths.push([...path]);
        //         return;
        //     }
        
        //     const outgoingEdges = edges.filter((edge:any) => edge.source === currentNode);
        //     for (const edge of outgoingEdges) {
        //         path.push(edge);
        //         dfs(edge.target, path, visited);
        //         path.pop();
        //     }
        
        //     // Once the DFS for this node is complete, remove it from visited to allow
        //     // traversal of other paths that may include this node
        //     visited.delete(currentNode);
        // };
          
          const dfs = (currentNode:any, path:any) => {
            // console.log('currentNode : ', currentNode);
            // console.log('targetNode : ', targetNode);
              if (currentNode === targetNode) {
                  paths.push([...path]);
                  return;
              }
      
              const outgoingEdges = edges.filter((edge:any) => edge.source === currentNode);
              // console.log('outgoingEdges : ', outgoingEdges);
              for (const edge of outgoingEdges) {
                  // console.log('edge : ', edge);
                  // console.log('path : ', path);
                  // exitPath.length
                  // console.log('000 : ', path.filter((f:any) => { return f?.id === edge?.id}).length < exitPath.length);
                  if(path.filter((f:any) => { return f?.id === edge?.id}).length < exitPath.length){
                    path.push(edge);
                    dfs(edge.target, path);
                    path.pop();

                  }
                //   console.log(path.filter((f:any) => { return f?.id !== edge?.id}).length)
                //   if(path.find((f:any) => { return f?.id !== edge?.id})){
                //     edges = edges.filter(((m:any)=> { return m.id !== edge.id }))
                // }
              }
          };
      
          const sourceNodes:any = new Set(edges.map((edge:any) => edge.source));
          for (const sourceNode of sourceNodes) {
              dfs(sourceNode, []);
          }
          // console.log('paths : ', paths);
          return paths;
      };


      let pathAll:any = []
      exitPath.forEach((es:any) => {
        const targetNode = es?.target;
        const paths = findPaths(edgesState, targetNode);
  
        let elementPath: any = [];
        paths.forEach((element:any,ie:any) => {
          let fil = startPath.find((f:any) => { return f?.source ===  element[0].source})
          if(!!fil){
            elementPath.push(paths[ie])
          }
          return element
        });
        pathAll.push(...elementPath)
        return es
      });

      let pathUse:any = []
      pathAll.map((e:any,i:any) => {
          let pathEls:any = []
          if(e.length === 1){
            pathEls.push(nodeState.find((f:any) => { return f?.id === e[0]?.source }) || null)
            pathEls.push(nodeState.find((f:any) => { return f?.id === e[0]?.target }) || null)
          }else{
            pathEls.push(nodeState.find((f:any) => { return f?.id === e[0]?.source }) || null)
            e.map((eA:any, iA:any) => {
              pathEls.push(nodeState.find((f:any) => { return f?.id === eA?.target }) || null)
              return eA
            })
          }
        
        pathUse.push(pathEls)

        return e
      })

      const uniqueObjects:any = [...new Set(pathUse.map((obj:any) => JSON.stringify(obj)))].map((str:any) => JSON.parse(str));

      let newData:any = uniqueObjects.map((e:any, i:any) => {
        let results:any = e
        for (let is = 0; is < uniqueObjects.length; is++) {
          if(is < i){
            if(uniqueObjects[is][0]?.id === e[0]?.id && uniqueObjects[is][uniqueObjects[is].length - 1]?.id === e[e.length - 1]?.id){
              results = null
            }
          }
          
        }

        return results
      })
      let notNulls = newData.filter((f:any) => { return !!f })

      setPathShowData(notNulls)

  };

  const calculatePath2 = async () => {
    console.log(nodeState);
    console.log(edgesState);
    let startPath: any = [];
    let exitPath: any = [];
    edgesState.forEach((e: any) => {
      let filStart = edgesState.find((f: any) => {
        return f?.target === e?.source;
      });
      if (!!!filStart) {
        startPath.push(e?.source);
      }
      let filEnd = edgesState.find((f: any) => {
        return f?.source === e?.target;
      });
      if (!!!filEnd) {
        exitPath.push(e?.target);
      }
      return e;
    });
    // edgesState.forEach((e: any) => {
    //   let fil = edgesState.find((f: any) => {
    //     return f?.source === e?.target;
    //   });
    //   if (!!!fil) {
    //     exitPath.push(e);
    //   }
    //   return e;
    // });

    let startPathId = [...new Set(startPath.map((obj:any) => obj))]
    console.log("startPathId : ", startPathId);
    let endPathId = [...new Set(exitPath.map((obj:any) => obj))]
    console.log("endPathId : ", endPathId);


    const infiniteData = async (idStart:any) => {
      console.log('idStart : ', idStart);
      console.log('edgesState : ', edgesState);
      // source
      let fil

      return true
    }

    

    let result = await infiniteData("1")
    console.log('result : ', result);



    // console.log("exitPath : ", exitPath);

    // let elementPath: any = [];
    // ห้ามลบ
    // const infinityLoopEnd: any = async (infinitData: any, e: any) => {
    //   let fil = edgesState.find((f: any) => {
    //     return f?.target === e?.source;
    //   });
    //   infinitData = (!!fil && [fil, ...infinitData]) || [...infinitData];
    //   if (!!fil) {
    //     console.log("1 : ", infinitData);
    //     return await infinityLoopEnd(infinitData, fil);
    //   } else {
    //     console.log("2 : ", infinitData);
    //     return infinitData;
    //   }
    // };

    // await Promise.all(
    //   exitPath.map(async (e: any, i: any) => {
    //     let fil = await infinityLoopEnd([], e);
    //     elementPath[i] = [...fil, e];
    //   })
    // );
    // console.log("elementPath: ", elementPath);


      //   const findPaths = (edges:any, targetNode:any) => {
      //     const paths:any = [];

          
      //     const dfs = (currentNode:any, path:any) => {
      //         if (currentNode === targetNode) {
      //             paths.push([...path]);
      //             return;
      //         }
      
      //         const outgoingEdges = edges.filter((edge:any) => edge.source === currentNode);
      //         for (const edge of outgoingEdges) {
      //             path.push(edge);
      //             dfs(edge.target, path);
      //             path.pop();
      //         }
      //     };
      
      //     const sourceNodes:any = new Set(edges.map((edge:any) => edge.source));
      //     for (const sourceNode of sourceNodes) {
      //         dfs(sourceNode, []);
      //     }
      
      //     return paths;
      // };


      // let pathAll:any = []
      // exitPath.forEach((es:any) => {
      //   const targetNode = es?.target;
      //   const paths = findPaths(edgesState, targetNode);
  
      //   let elementPath: any = [];
      //   paths.forEach((element:any,ie:any) => {
      //     let fil = startPath.find((f:any) => { return f?.source ===  element[0].source})
      //     if(!!fil){
      //       elementPath.push(paths[ie])
      //     }
      //     return element
      //   });
      //   pathAll.push(...elementPath)
      //   return es
      // });

      // let pathUse:any = []
      // pathAll.map((e:any,i:any) => {
      //     let pathEls:any = []
      //     if(e.length === 1){
      //       pathEls.push(nodeState.find((f:any) => { return f?.id === e[0]?.source }) || null)
      //       pathEls.push(nodeState.find((f:any) => { return f?.id === e[0]?.target }) || null)
      //     }else{
      //       pathEls.push(nodeState.find((f:any) => { return f?.id === e[0]?.source }) || null)
      //       e.map((eA:any, iA:any) => {
      //         pathEls.push(nodeState.find((f:any) => { return f?.id === eA?.target }) || null)
      //         return eA
      //       })
      //     }
        
      //   pathUse.push(pathEls)

      //   return e
      // })

      // const uniqueObjects:any = [...new Set(pathUse.map((obj:any) => JSON.stringify(obj)))].map((str:any) => JSON.parse(str));

      // setPathShowData(uniqueObjects)

  };

  useEffect(() => {
    // console.log(nodeState);
  }, [nodeState]);

  useEffect(() => {
    calculatePath();
    // calculatePath2();
    // console.log(edgesState);
  }, [edgesState]);

  useEffect(() => {
    console.table(pathShowData);
  }, [pathShowData])
  

  return (
    <div className="w-[100%] h-[calc(100vh-220px)] relative ">
      <ReactFlow
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
        defaultEdgeOptions={{
          style: { strokeWidth: 2, stroke: "black" },
          // type: "smoothstep",
          type: "floating",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "black",
          },
        }}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={{
          strokeWidth: 2,
          stroke: "black",
        }}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={2} zoomable pannable />
        <Panel position="top-right">
          <div className=" relative flex">
            <MenuList />
            <div
              className={`flex absolute top-0  ${
                flagOnMenu ? " right-[-100vw]" : " right-[0] "
              } duration-300 ease-in-out`}
            >
              <>
                <MenuList />
                <div
                  className={`bg-gray-100 grid justify-center items-center px-2 `}
                >
                  <div className=" font-bold text-gray-600 flex items-center justify-between">
                    <div>List Path</div>
                  </div>
                  <div className=" overflow-y-auto h-[calc(100vh-450px)] pr-3 min-w-[250px] space-y-2 my-2">
                    {
                      (pathShowData || []).map((item:any,ix:any) => {
                        let pathName = `Path_v${pathVersion?.version}_${ix + 1}`
                        return (
                          <div key={ix} className=" bg-white p-2 space-y-2" >
                            <div className=" grid items-center gap-1">
                              <div className=" whitespace-nowrap text-sm font-bold text-[#00ADEF]">{pathName}</div>
                              <div className=" whitespace-nowrap text-xs">{`Entry : `}{item[0]?.data?.name || "-"}</div>
                              <div className=" whitespace-nowrap text-xs">{`Exit : `}{item[item.length - 1]?.data?.name || "-"}</div>
                            </div>
                            <div className=" whitespace-nowrap flex items-center">
                              {
                                (item || []).map((et:any, it:any) => {

                                  return (
                                    <div key={it} className="flex items-center text-sm">
                                      {
                                        it === 0 ? 
                                        <div style={{ background: et?.style?.backgroundColor, }} className=" text-white min-w-[30px] h-[30px] rounded-full flex items-center justify-center">{et?.data?.name || "-"}</div>
                                        :
                                        <div className=" flex items-center">
                                          <ArrowRightAltIcon />
                                          <div  style={{ background: et?.style?.backgroundColor, }} className=" text-white min-w-[30px] h-[30px] rounded-full flex items-center justify-center">{et?.data?.name || "-"}</div>
                                        </div>
                                      }
                                    </div>
                                  )
                                })
                              }
                            </div>

                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </>
            </div>
          </div>
        </Panel>
        {/* @ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
        {/* <Background gap={10}
        color="#000000"
        variant={BackgroundVariant.Cross}
 /> */}
      </ReactFlow>
    </div>
  );
};

function page() {
  const [bankData, setBankData] = useState<any>([]);
  const [seUseType, setSeUseType] = useState(null);
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [startDateSearch, setStartDateSearch] = useState(false);

  const getBankingApi = async () => {
    try {
      const response = await fetch("/json/banking.json");
      if (!response.ok) {
        throw new Error("Failed to fetch banking data");
      }
      const data = await response.json();
      // console.log(data);
      setBankData(data || []);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const UiSearch = () => {
    return (
      <>
        <div>
          <div className="text-sm mb-2">Version Path</div>
          <MySelect
            placeholder={
              <div className=" text-sm text-[#cacaca] ">{`Select Version Path`}</div>
            }
            options={(bankData || [])?.map((e: any) => {
              return {
                value: e?.id,
                searchCus: e?.nameTh,
                label: (
                  <div className=" flex items-center gap-2 text-sm">
                    <img src={e?.logo} className="w-[20px] h-[20px]" alt="" />
                    {`${e?.nameTh}`}
                  </div>
                ),
              };
            })}
            seUseType={seUseType}
            setSeUseType={setSeUseType}
            className={`w-[209px] h-[38px] text-sm border-[#DFE4EA]rounded-lg !focus:border-[#cacaca] z-[99]`}
            classNamePrefix="rounded-lg  "
            styles={{
              control: (base: any, state: any) => ({
                ...base,
                boxShadow: "none",
                "&:hover": {
                  border: "1px solid #43464a !important",
                },
                border: "1px solid #DFE4EA !important",
              }),
            }}
            filterOption={true}
          />
        </div>

        <div>
          <div className="text-sm mb-2">Start Date</div>
          <Datepicker
            options={{
              title: "",
              autoHide: true,
              todayBtn: false,
              clearBtn: true,
              clearBtnText: "Clear",
              maxDate: new Date("9999-01-01"),
              minDate: new Date("0-01-01"),
              theme: {
                background:
                  "bg-[#ffffff] dark:bg-[#ffffff] border-2 border-[#9b9fa4] dark:border-[#9b9fa4]",
                todayBtn: "",
                clearBtn:
                  "bg-[#00ADEF] dark:bg-[#00ADEF] hover:bg-[#00ADEFa0] dark:hover:bg-[#00ADEFa0] text-[#ffffff] font-bold",
                icons:
                  "bg-[#f4f9ff] hover:bg-[#f4f9ff] dark:bg-[#f4f9ff] hover:dark:bg-[#e4f9ff] hover:text-[#9b9fa4] text-[#9b9fa4] dark:text-[#9b9fa4] hover:dark:text-[#9b9fa4]",
                text: "!text-[#7a7a7a] !dark:text-[#7a7a7a]",
                disabledText: "!text-[#cacaca] !dark:text-[#cacaca]",
                input:
                  "w-full py-2 rounded-lg border-[1px] border-[#DFE4EA] dark:border-[#DFE4EA] outline-none bg-opacity-10 dark:bg-[#ffffff] focus:border-[#00ADEF] dark:focus:border-[#00ADEF] text-[#58585A] dark:text-[#58585A]", // Ensure both background and text colors are set
                inputIcon: "",
                selected:
                  "dark:bg-[#00ADEF] bg-[#00ADEF] dark:hover:bg-[#00ADEFa0] hover:bg-[#00ADEFa0]",
              },
              icons: {
                prev: () => (
                  <span className="">
                    <ArrowBackIosIcon style={{ fontSize: "20px" }} />
                  </span>
                ),
                next: () => (
                  <span>
                    <ArrowForwardIosIcon style={{ fontSize: "20px" }} />
                  </span>
                ),
              },
              datepickerClassNames: "top-20",
              defaultDate: null,
              language: "en",
              disabledDates: [],
              weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
              inputNameProp: "date",
              inputIdProp: "date",
              inputPlaceholderProp: "Select Date",
              inputDateFormatProp: {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            }}
            onChange={(selectedDate: Date) => {
              setSelectedDate(selectedDate);
            }}
            value={(!!selectedDate && selectedDate) || null}
            show={startDateSearch}
            setShow={(state: boolean) => {
              setStartDateSearch(state);
            }}
          >
            {startDateSearch && (
              <div
                className=" fixed top-[0] left-0 w-[100vw] h-[100vh] bg-[#ffffff30] z-[50]"
                onClick={() => {
                  setStartDateSearch(false);
                }}
              ></div>
            )}
            <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3">
              <input
                id="dateStartId"
                type="text"
                className=" text-sm bg-white"
                placeholder="Select Date"
                value={selectedDate}
                onFocus={() => setStartDateSearch(true)}
                readOnly
              />
              <CalendarTodayIcon
                className=" text-[#DFE4EA]"
                style={{ fontSize: "20px" }}
              />
            </div>
          </Datepicker>
        </div>

        <div>
          <div className="text-sm mb-2">End Date</div>
          <Datepicker
            options={{
              title: "",
              autoHide: true,
              todayBtn: false,
              clearBtn: true,
              clearBtnText: "Clear",
              maxDate: new Date("9999-01-01"),
              minDate: new Date("0-01-01"),
              theme: {
                background:
                  "bg-[#ffffff] dark:bg-[#ffffff] border-2 border-[#9b9fa4] dark:border-[#9b9fa4]",
                todayBtn: "",
                clearBtn:
                  "bg-[#00ADEF] dark:bg-[#00ADEF] hover:bg-[#00ADEFa0] dark:hover:bg-[#00ADEFa0] text-[#ffffff] font-bold",
                icons:
                  "bg-[#f4f9ff] hover:bg-[#f4f9ff] dark:bg-[#f4f9ff] hover:dark:bg-[#e4f9ff] hover:text-[#9b9fa4] text-[#9b9fa4] dark:text-[#9b9fa4] hover:dark:text-[#9b9fa4]",
                text: "!text-[#7a7a7a] !dark:text-[#7a7a7a]",
                disabledText: "!text-[#cacaca] !dark:text-[#cacaca]",
                input:
                  "w-full py-2 rounded-lg border-[1px] border-[#DFE4EA] dark:border-[#DFE4EA] outline-none bg-opacity-10 dark:bg-[#ffffff] focus:border-[#00ADEF] dark:focus:border-[#00ADEF] text-[#58585A] dark:text-[#58585A]", // Ensure both background and text colors are set
                inputIcon: "",
                selected:
                  "dark:bg-[#00ADEF] bg-[#00ADEF] dark:hover:bg-[#00ADEFa0] hover:bg-[#00ADEFa0]",
              },
              icons: {
                prev: () => (
                  <span className="">
                    <ArrowBackIosIcon style={{ fontSize: "20px" }} />
                  </span>
                ),
                next: () => (
                  <span>
                    <ArrowForwardIosIcon style={{ fontSize: "20px" }} />
                  </span>
                ),
              },
              datepickerClassNames: "top-20",
              defaultDate: null,
              language: "en",
              disabledDates: [],
              weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
              inputNameProp: "date",
              inputIdProp: "date",
              inputPlaceholderProp: "Select Date",
              inputDateFormatProp: {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            }}
            onChange={(selectedDate: Date) => {
              setSelectedDate(selectedDate);
            }}
            value={(!!selectedDate && selectedDate) || null}
            show={startDateSearch}
            setShow={(state: boolean) => {
              setStartDateSearch(state);
            }}
          >
            {startDateSearch && (
              <div
                className=" fixed top-[0] left-0 w-[100vw] h-[100vh] bg-[#ffffff30] z-[50]"
                onClick={() => {
                  setStartDateSearch(false);
                }}
              ></div>
            )}
            <div className="flex items-center border-[#DFE4EA] border-[1px] h-[38px] rounded-lg px-3">
              <input
                id="dateStartId"
                type="text"
                className=" text-sm bg-white"
                placeholder="Select Date"
                value={selectedDate}
                onFocus={() => setStartDateSearch(true)}
                readOnly
              />
              <CalendarTodayIcon
                className=" text-[#DFE4EA]"
                style={{ fontSize: "20px" }}
              />
            </div>
          </Datepicker>
        </div>

        <div className="rounded-lg bg-[#00ADEF] text-[#ffffff] grid items-center justify-center w-[38px] h-[38px] mt-auto cursor-pointer">
          <SearchIcon />
        </div>
        <div className="rounded-lg bg-[#ffffff] text-[#00ADEF] border-[1px] border-[#00ADEF] grid items-center justify-center w-[38px] h-[38px] mt-auto cursor-pointer">
          <RefreshIcon className="" />
        </div>
      </>
    );
  };

  useEffect(() => {
    getBankingApi();
  }, []);

  return (
    <div className=" p-2">
      <div className=" p-3 border-[1px] border-[#DFE4EA] rounded-[10px] shadow-sm flex items-center gap-2">
        <UiSearch />
        <div className=" ml-auto mt-auto flex gap-2">
          <div className="rounded-lg border-[#00ADEF] border-[1px] text-[#00ADEF] w-[150px] flex gap-2 items-center justify-center h-[38px] mt-auto ml-auto text-sm cursor-pointer">
            <span>{`Public`}</span>
          </div>
          <div className="rounded-lg bg-[#06A09B] text-[#ffffff] w-[150px] flex gap-2 items-center justify-center h-[38px] mt-auto ml-auto text-sm cursor-pointer">
            <span>{`Duplicate`}</span>
            <ControlPointDuplicateIcon
              className=" text-[#ffffff]"
              style={{ fontSize: "22px" }}
            />
          </div>
          <div className="rounded-lg bg-[#00ADEF] text-[#ffffff] w-[150px] flex gap-2 items-center justify-center h-[38px] mt-auto ml-auto text-sm cursor-pointer">
            <span>{`Save`}</span>
          </div>
        </div>
      </div>
      <div>
        <ReactFlowProvider>
          <LayoutPath />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default page;


