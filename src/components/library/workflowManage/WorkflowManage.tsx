"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
} from "reactflow";

import "reactflow/dist/style.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PendingIcon from "@mui/icons-material/Pending";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ApiIcon from "@mui/icons-material/Api";
import InfoIcon from "@mui/icons-material/Info";
import MovingIcon from "@mui/icons-material/Moving";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
// import "react-colorful/dist/index.css";

// <div className=" relative group">
//             <div
//               onClick={() => {
//                 onEdgeActive(data);
//               }}
//               className=" cursor-pointer bg-[#7a7a7a] rounded-sm text-[#ffffff] px-2 grid items-center justify-center h-[25px]"
//             >
//               <MovingIcon style={{ fontSize: "16px" }} />
//             </div>
//             <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#AD974F] duration-300 group-hover:w-full"></span>
//           </div>

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
      {/* <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan edgebutton grid items-center justify-center  bg-[#eee] w-[15px] h-[15px] text-[10px] rounded-full cursor-pointer"
          onClick={onEdgeClick}
        >
          <div className="">x</div>
        </div>
      </EdgeLabelRenderer> */}
    </>
  );
}

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

// ---

const onEdgeActive = (evt: any) => {
  console.log("evt : ", evt);
  // evt.stopPropagation();
  // alert(`remove ${id}`);
};

const onEdgeClick = (evt: any, id: any) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style }} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan edgebutton grid items-center justify-center  bg-[#eee] w-[15px] h-[15px] text-[10px] rounded-full cursor-pointer"
          onClick={onEdgeClick}
        >
          <div className="">x</div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = (props: any) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (typeof props.isConnectable === "function") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      return props.isConnectable({ node, connectedEdges });
    }

    if (typeof props.isConnectable === "number") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      return connectedEdges.length < props.isConnectable;
    }

    return props.isConnectable;
  }, [nodeInternals, edges, nodeId, props.isConnectable]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};

function NodeStart({ data, isConnectable }: any) {
  return (
    <div
      className={`nodeStart w-[50px] h-[50px] grid items-center justify-center rounded-full`}
      style={{ border: `1px solid #515151` }}
    >
      <div>
        <div style={{ fontSize: "16px", color: `#515151` }}>
          {data?.label || "-"}
        </div>
      </div>
      <CustomHandle type="source" position={Position.Right} isConnectable={1} />
    </div>
  );
}

function NodeRoute({ data, isConnectable }: any) {
  return (
    <div
      className={`nodeRoute w-[50px] h-[50px] grid items-center justify-center rounded-full`}
      style={{ border: `1px solid #515151` }}
    >
      <NodeToolbar position={Position.Top}>
        <button
          onClick={() => {
            data?.onFunc(data);
          }}
          className="text-[#515151] bg-[#ffffff] p-1 rounded-sm text-sm border-[1px] border-[#515151]"
        >
          Remove
        </button>
      </NodeToolbar>
      <div>
        <div style={{ fontSize: "16px", color: `#515151` }}>
          {data?.label || "-"}
        </div>
      </div>
      <Handle
        id="1"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{
          background: "#515151",
          width: "10px",
          height: "5px",
          borderRadius: "0",
        }}
      />
      <Handle
        id="2"
        type="source"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        id="3"
        type="target"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{
          background: "#515151",
          width: "10px",
          height: "5px",
          borderRadius: "0",
        }}
      />
      <Handle
        id="4"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

function NodeEnd({ data, isConnectable }: any) {
  return (
    <div
      className={`nodeRoute w-[50px] h-[50px] grid items-center justify-center rounded-full`}
      style={{ border: `1px solid #515151` }}
    >
      <div>
        <div style={{ fontSize: "16px", color: `#515151` }}>
          {data?.label || "-"}
        </div>
      </div>
      <CustomHandle
        type="target"
        position={Position.Left}
        isConnectable={1}
        style={{
          background: "#515151",
          width: "5px",
          height: "10px",
          borderRadius: "0",
        }}
      />
    </div>
  );
}

// const nodeTypes = {
//   nodeStart: NodeStart,
//   nodeRoute: NodeRoute,
//   nodeEnd: NodeEnd,
// };

// const edgeTypes = {
//   buttonedge: ButtonEdge,
// };

function CustomNode(payload: any) {
  // console.log(payload);
  const { id, data, style } = payload;
  const connectionNodeId = useStore(connectionNodeIdSelector);

  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;

  return (
    <div className="customNode">
      <div
        className="customNodeBody"
        style={{
          backgroundColor: isTarget ? "#c2833d" : style?.backgroundColor,
          border: isTarget ? "3px dashed #ffffff" : `0`,
          // borderRadius: isTarget ? "3px" : "0",
          color: isTarget ? "#ffffff" : "#ffffff",
        }}
      >
        {!isConnecting && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
          />
        )}

        <Handle
          className="customHandle"
          position={Position.Left}
          type="target"
          isConnectableStart={false}
        />
        {`${data?.name || "-"}`}
      </div>
      {/* <div className=" fixed bg-[#f2f2f2eb] p-2 top-0 right-full rounded-md"> */}
      <div className=" bg-[#f2f2f2eb] p-2 m-1 top-full rounded-md">
        <div className=" flex items-center gap-1">
          <div
            onClick={() => {
              data?.onAddRole(data);
            }}
            className="text-[12px] h-[25px] my-2 whitespace-nowrap bg-[#7a7a7a] px-2 py-1 rounded-sm text-[#ffffff] font-bold flex items-center cursor-pointer"
          >
            <AddIcon style={{ fontSize: "16px" }} />
            <span className=" uppercase">Add Role Manage</span>
          </div>

          <div className=" relative group">
            <div
              onClick={() => {
                onEdgeActive(data);
              }}
              className=" cursor-pointer bg-[#7a7a7a] rounded-sm text-[#ffffff] px-2 grid items-center justify-center h-[25px]"
            >
              <MovingIcon style={{ fontSize: "16px" }} />
            </div>
            <div className="shadow-md text-[#7a7a7a] text-[12px] rounded-sm absolute top-0 right-full bg-[#ffffff] duration-300 hidden group-hover:block p-2">
              <div className=" whitespace-nowrap font-bold">Relations Line</div>
              {(data?.relations || []).length > 0 ? (
                (data?.relations || []).map((item: any, ix: any) => {
                  return (
                    <div key={ix} className=" flex gap-1 items-center">
                      <DeleteForeverIcon
                        className=" cursor-pointer text-red-400"
                        onClick={() => {
                          item?.onDelesLine(item);
                        }}
                      />
                      <div className=" flex items-center whitespace-nowrap">
                        <div>{item?.sourceName || " -"}</div>
                        <ArrowRightAltIcon />
                        <div>{item?.targetName || " -"}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" text-gray-500 text-center whitespace-nowrap">{`No Relations Line`}</div>
              )}
            </div>
          </div>
        </div>
        {(data?.roleManage || []).length > 0 ? (
          (data?.roleManage || []).map((item: any, ix: any) => {
            return (
              <div
                key={ix}
                className={`my-2 flex items-center gap-2 ${
                  ix !== data.roleManage.length - 1 &&
                  " border-b-[1px] border-dashed border-gray-500"
                }`}
              >
                <DeleteForeverIcon
                  className=" cursor-pointer text-red-400"
                  onClick={() => {
                    data?.onDelesRole(id, item);
                  }}
                />
                <div>
                  <div className=" font-bold whitespace-nowrap text-[12px] text-gray-600">
                    {item?.name || "-"}
                  </div>
                  <div className=" text-[9px] text-gray-500">
                    {item?.companyType || "-"}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className=" text-gray-500 text-center">{`No Role Manage`}</div>
        )}
      </div>
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

let tempNode = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 0" },
    position: { x: 250, y: 5 },
    className: "light",
  },
  {
    id: "2",
    data: { label: "Group A" },
    position: { x: 100, y: 100 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 200 },
  },
  {
    id: "2a",
    data: { label: "Node A.1" },
    position: { x: 10, y: 50 },
    parentNode: "2",
  },
  {
    id: "3",
    data: { label: "Node 1" },
    position: { x: 320, y: 100 },
    className: "light",
  },
  {
    id: "4",
    data: { label: "Group B" },
    position: { x: 320, y: 200 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 300, height: 300 },
    type: "group",
  },
  {
    id: "4a",
    data: { label: "Node B.1" },
    position: { x: 15, y: 65 },
    className: "light",
    parentNode: "4",
    extent: "parent",
  },
  {
    id: "4b",
    data: { label: "Group B.A" },
    position: { x: 15, y: 120 },
    className: "light",
    style: {
      backgroundColor: "rgba(255, 0, 255, 0.2)",
      height: 150,
      width: 270,
    },
    parentNode: "4",
  },
  {
    id: "4b1",
    data: { label: "Node B.A.1" },
    position: { x: 20, y: 40 },
    className: "light",
    parentNode: "4b",
  },
  {
    id: "4b2",
    data: { label: "Node B.A.2" },
    position: { x: 100, y: 100 },
    className: "light",
    parentNode: "4b",
  },
];

let tempEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2a-4a", source: "2a", target: "4a" },
  { id: "e3-4b", source: "3", target: "4b" },
  { id: "e4a-4b1", source: "4a", target: "4b1" },
  { id: "e4a-4b2", source: "4a", target: "4b2" },
  { id: "e4b1-4b2", source: "4b1", target: "4b2" },
];

function LayoutFlow({
  nodeState,
  setNodeState,
  edgesState,
  setEdgesState,
  listRoleManage,
  setListRoleManage,
}: any) {
  const [color, setColor] = useState("rgba(248, 139, 112, 0.1)");
  const [colorFlow, setColorFlow] = useState("#88aaad");
  const [flowName, setFlowName] = useState("");
  const [flowProperties, setFlowProperties] = useState<any>(null);

  const addRoleManage = async (payload: any) => {
    setUseBoxFlow(payload);
    setModalAddRole(true);
  };

  const closeAddRoleManage = async () => {
    setUseBoxFlow(null);
    setModalAddRole(false);
  };

  const configRoleManage = async (nodeId: any, payload: any, type: any) => {
    console.log("nodeId : ", nodeId);
    console.log("payload : ", payload);
    console.log("nodeState : ", nodeState);
    // nodeState,
    // roleManage
    if (type === "add") {
      // setNodeState((pre:any) => {
      //   let newPre = pre.map((item:any) => {
      //     let roleManage:any = []
      //     if(item?.id === nodeId){

      //       console.log(item?.data?.roleManage);
      //       console.log(payload);
      //       roleManage = [...item?.data?.roleManage, payload]
      //       console.log(roleManage);
      //     }else{
      //       roleManage = item?.data?.roleManage || [];
      //     }
      //     return {...item, data: {...item?.data, roleManage: roleManage }}
      //   })
      //   return newPre
      // })

      setUseBoxFlow((pre: any) => {
        let roleManage: any = [];
        roleManage = [...pre?.roleManage, payload];
        return { ...pre, roleManage: roleManage };
      });
    } else {
      setUseBoxFlow((pre: any) => {
        let roleManage: any = [];
        roleManage = (pre?.roleManage || []).filter((f: any) => {
          return f?.id !== payload?.id;
        });
        return { ...pre, roleManage: roleManage };
      });
    }
  };

  const saveConfigRoleManage = async () => {
    setNodeState((pre: any) => {
      let newPre = (pre || []).map((item: any) => {
        let roleManage: any = [];
        if (item?.id === useBoxFlow?.id) {
          roleManage = useBoxFlow?.roleManage || [];
        } else {
          roleManage = item?.data?.roleManage || [];
        }
        return { ...item, data: { ...item?.data, roleManage: roleManage } };
      });
      return newPre;
    });
    closeAddRoleManage();
  };

  const delesLine = async (payload: any) => {
    setEdgesState((pre: any) => {
      let newPre = pre.filter((f: any) => {
        return f?.id !== payload?.id;
      });
      return newPre;
    });
  };

  const delesRole = async (id: any, payload: any) => {
    setNodeState((pre: any) => {
      let newPre = pre.map((item: any) => {
        let roleManage = [];
        if (item?.id === id) {
          roleManage = (item?.data?.roleManage || []).filter((f: any) => {
            return f?.id !== payload?.id;
          });
        } else {
          roleManage = item?.data?.roleManage || [];
        }
        return { ...item, data: { ...item?.data, roleManage: roleManage } };
      });
      return newPre;
    });
  };

  const deleteNode = async (event: any) => {
    console.log("event : ", event);
    setArea((pre: any) => [...pre, event]);
    setNodeState((pre: any) =>
      pre.filter((f: any) => {
        return f?.id !== event?.id;
      })
    );
    setEdgesState((pre: any) =>
      pre.filter((f: any) => {
        return f?.source !== event?.id && f?.target !== event?.id;
      })
    );
  };

  const initialNodes: any = [
    {
      id: "1",
      type: "nodeStart",
      label: "A1",
      backgroundColor: "#ffde87",
      data: {
        id: "1",
        label: "A1",
        backgroundColor: "#ffde87",
        onFunc: deleteNode,
      },
      position: { x: 250, y: 25 },
      style: { backgroundColor: "#ffde87", color: "#515151" },
      className: "rounded-full",
    },
    {
      id: "2",
      type: "nodeRoute",
      label: "B1",
      backgroundColor: "#6ede87",
      data: {
        id: "2",
        label: "B1",
        backgroundColor: "#6ede87",
        onFunc: deleteNode,
      },
      position: { x: 500, y: 125 },
      style: { backgroundColor: "#6ede87", color: "#515151" },
      className: "rounded-full",
    },
    {
      id: "3",
      type: "nodeRoute",
      label: "B2",
      backgroundColor: "#6ed5de",
      data: {
        id: "3",
        label: "B2",
        backgroundColor: "#6ed5de",
        onFunc: deleteNode,
      },
      position: { x: 400, y: 400 },
      style: { backgroundColor: "#6ed5de", color: "#515151" },
      className: "rounded-full",
    },
    {
      id: "4",
      type: "nodeEnd",
      label: "X1",
      backgroundColor: "#ff0072",
      data: {
        id: "4",
        label: "X1",
        backgroundColor: "#ff0072",
        onFunc: deleteNode,
      },
      position: { x: 1000, y: 250 },
      style: { backgroundColor: "#ff0072", color: "#515151" },
      className: "rounded-full",
    },
  ];

  const initialEdges: any = [
    {
      source: "1",
      sourceHandle: null,
      target: "2",
      targetHandle: "1",
      type: "buttonedge",
      id: "reactflow__edge-1-21",
      markerEnd: {
        type: "arrowclosed",
        width: 20,
        height: 20,
        color: "#919191",
      },
      style: {
        strokeWidth: 1,
        stroke: "#919191",
      },
    },
    {
      source: "3",
      sourceHandle: "4",
      target: "4",
      targetHandle: null,
      type: "buttonedge",
      id: "reactflow__edge-34-4",
      markerEnd: {
        type: "arrowclosed",
        width: 20,
        height: 20,
        color: "#919191",
      },
      style: {
        strokeWidth: 1,
        stroke: "#919191",
      },
    },
    {
      source: "2",
      sourceHandle: "2",
      target: "3",
      targetHandle: "1",
      type: "buttonedge",
      markerEnd: {
        type: "arrowclosed",
        width: 20,
        height: 20,
        color: "#919191",
      },
      style: {
        strokeWidth: 1,
        stroke: "#919191",
      },
      id: "reactflow__edge-22-31",
    },
  ];

  const store = useStoreApi();
  // const [nodeState, setNodeState] = useState<any>(
  //   (initialNodes || []).map((e: any) => {
  //     e.data = {
  //       id: e?.id,
  //       label: e?.label,
  //       backgroundColor: e?.backgroundColor,
  //       onFunc: deleteNode,
  //     };
  //     return e;
  //   }) || []
  // );
  // const [edgesState, setEdgesState] = useState<any>(initialEdges || []);

  // -----
  const [modalAddRole, setModalAddRole] = useState(false);
  const [useBoxFlow, setUseBoxFlow] = useState<any>(null);

  const [onMenu, setOnMenu] = useState<any>({
    roleList: false,
    statusList: false,
    template: false,
    apiGens: false,
    other: false,
    info: false,
  });

  // const [nodeState, setNodeState] = useState<any>(
  //   tempNode || []
  // );
  // const [edgesState, setEdgesState] = useState<any>(
  //   tempEdges || []
  // );
  const [dataEditGroup, setDataEditGroup] = useState<any>(null);
  const [flagAddGroup, setFlagAddGroup] = useState(false);
  const [modalAddGroup, setModalAddGroup] = useState(false);
  const [dataEditFlow, setDataEditFlow] = useState<any>(null);
  const [flagAddFlow, setFlagAddFlow] = useState(false);
  const [modalAddFlow, setModalAddFlow] = useState(false);

  const [area, setArea] = useState<any>([
    {
      id: "6",
      label: "G3",
      backgroundColor: "#de6ec6",
    },
    {
      id: "7",
      label: "Z2",
      backgroundColor: "#4eae7b",
    },
    {
      id: "8",
      label: "Y7",
      backgroundColor: "#de6e7b",
    },
  ]);

  const onAddGroup = async (flag: any, payload: any) => {
    if (!flag) {
      setColor("rgba(248, 139, 112, 0.1)");
      setDataEditGroup(null);
      setFlagAddGroup(false);
    } else {
      console.log("payload : ", payload);
      setDataEditGroup(payload);
      setColor(payload?.style?.backgroundColor);
      setFlagAddGroup(true);
    }
    setModalAddGroup(true);
  };

  const closeAddGroup = async () => {
    setColor("rgba(248, 139, 112, 0.1)");
    setDataEditGroup(null);
    setFlagAddGroup(false);
    setModalAddGroup(false);
  };

  const saveAddGroup = async () => {
    setModalAddGroup(false);
    let newGroup = {
      id: `${new Date()}`,
      data: null,
      position: { x: -100, y: -100 },
      className: "light",
      style: {
        backgroundColor: color,
        height: 1000,
        width: 1000,
        fontSize: 30,
      },
      type: "group",
    };
    setNodeState((pre: any) => [...pre, newGroup]);
  };
  const editGroup = async () => {
    setModalAddGroup(false);
    setNodeState((pre: any) => {
      let newPre = pre.map((item: any) => {
        let useColor = "";
        if (dataEditGroup?.id === item?.id) {
          useColor = color;
        } else {
          useColor = item?.style.backgroundColor;
        }
        return {
          ...item,
          style: { ...item?.style, backgroundColor: useColor },
        };
      });
      return newPre;
    });
  };

  const [groupData, setGroupData] = useState<any>(null);

  const onAddFlow = async (payload: any, flag: any, data: any) => {
    if (!flag) {
      setGroupData(payload);
      setFlowName("");
      setColorFlow("#88aaad");
      setDataEditFlow(null);
      setFlagAddFlow(false);
      setModalAddFlow(true);
    } else {
      setFlowName(data?.data?.name || "");
      setColorFlow(data?.style?.backgroundColor || "#88aaad");
      setFlowProperties(data?.data?.createDocuments || false);
      setDataEditFlow(data);
      setFlagAddFlow(true);
      setModalAddFlow(true);
    }
  };

  const closeAddFlow = async () => {
    setGroupData(null);
    setFlowName("");
    setColorFlow("#88aaad");
    setDataEditFlow(null);
    setFlagAddFlow(false);
    setModalAddFlow(false);
  };

  const saveAddFlow = async () => {
    setModalAddFlow(false);
    let idGen = `${new Date()}`;
    let newFlow = {
      id: idGen,
      type: "custom",
      position: { x: 0, y: 0 },
      data: {
        id: idGen,
        name: flowName || "-",
        createDocuments: flowProperties,
        relations: [],
        roleManage: [],
      },
      style: {
        backgroundColor: colorFlow,
      },
      parentNode: groupData?.id,
    };
    setNodeState((pre: any) => [...pre, newFlow]);
  };

  const editAddFlow = async () => {
    setModalAddFlow(false);
    console.log(dataEditFlow);
    // let idGen = `${new Date()}`
    // let newFlow = {
    //   id: idGen,
    //   type: "custom",
    //   position: { x: 0, y: 0 },
    //   data: {
    //     id: idGen,
    //     name: flowName || "-",
    //     createDocuments: flowProperties,
    //     relations: [],
    //     roleManage: [],
    //   },
    //   style: {
    //     backgroundColor: colorFlow,
    //   },
    //   parentNode: groupData?.id,
    // };
    // setNodeState((pre: any) => [...pre, newFlow]);
    setNodeState((pre: any) => {
      let newPre = pre.map((item: any) => {
        let useColor = "";
        let useCreateDocuments = false;
        let useName = "";
        if (dataEditFlow?.id === item?.id) {
          useColor = colorFlow;
          useCreateDocuments = flowProperties;
          useName = flowName;
        } else {
          useColor = item?.style.backgroundColor;
          useCreateDocuments = item?.data.createDocuments;
          useName = item?.data.name;
        }

        return {
          ...item,
          data: {
            ...item?.data,
            createDocuments: useCreateDocuments,
            name: useName,
          },
          style: { ...item?.style, backgroundColor: useColor },
        };
      });
      return newPre;
    });
  };

  const nodeColor = (node: any) => {
    for (let i = 0; i < node.length; i++) {
      return node[i].style?.backgroundColor;
    }
  };

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
  // const onConnect = useCallback(
  //   (params: any) => {
  //     params.type = "buttonedge";
  //     params.markerEnd = {
  //       type: MarkerType.ArrowClosed,
  //       width: 20,
  //       height: 20,
  //       color: "#919191",
  //     };
  //     params.style = {
  //       strokeWidth: 1,
  //       stroke: "#919191",
  //     };
  //     setEdgesState((eds: any) => {
  //       return addEdge(params, eds);
  //     });
  //   },
  //   [setEdgesState]
  // );
  const onConnect = useCallback(
    (params: any) => setEdgesState((eds: any) => addEdge(params, eds)),
    [setEdgesState]
  );

  const addNode = async (payload: any) => {
    const {
      height,
      width,
      transform: [transformX, transformY, zoomLevel],
    } = store.getState();
    const zoomMultiplier = 1 / zoomLevel;
    const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
    const centerY =
      -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;

    const nodeWidthOffset = NODE_WIDTH / 2;
    const nodeHeightOffset = NODE_HEIGHT / 2;

    (payload.position = {
      x: centerX - nodeWidthOffset + currentOverlapOffset,
      y: centerY - nodeHeightOffset + currentOverlapOffset,
    }),
      setNodeState((pre: any) => [...pre, payload]);
    setArea((pre: any) =>
      pre.filter((f: any) => {
        return f?.id !== payload?.id;
      })
    );
  };

  const MenuList = () => {
    return (
      <div className="grid">
        <div>
          <div className="group relative mb-2">
            <AccountTreeIcon
              className={`bg-gray-100 ${
                onMenu?.statusList ? "text-[#c2833d]" : "text-gray-400"
              } rounded-tl-sm rounded-bl-sm cursor-pointer`}
              onClick={() => {
                setOnMenu((pre: any) => {
                  return {
                    ...pre,
                    roleList: false,
                    statusList: !pre?.statusList,
                    template: false,
                    apiGens: false,
                    other: false,
                    info: false,
                  };
                });
              }}
              style={{ margin: 0 }}
            />
            <span className="absolute top-0 right-[30px] scale-0 rounded bg-[#c2833d] p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
              List Documents
            </span>
          </div>
          <div className="group relative mb-2">
            <PersonIcon
              className={`bg-gray-100 ${
                onMenu?.roleList ? "text-[#c2833d]" : "text-gray-400"
              } rounded-tl-sm rounded-bl-sm cursor-pointer`}
              onClick={() => {
                setOnMenu((pre: any) => {
                  return {
                    ...pre,
                    roleList: !pre?.roleList,
                    statusList: false,
                    template: false,
                    apiGens: false,
                    other: false,
                    info: false,
                  };
                });
              }}
              style={{ margin: 0 }}
            />
            <span className="absolute top-0 right-[30px] scale-0 rounded bg-[#c2833d] p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
              List Role Manage
            </span>
          </div>
          <div className="group relative mb-2">
            <FileCopyIcon
              className={`bg-gray-100 ${
                onMenu?.template ? "text-[#c2833d]" : "text-gray-400"
              } rounded-tl-sm rounded-bl-sm cursor-pointer`}
              onClick={() => {
                setOnMenu((pre: any) => {
                  return {
                    ...pre,
                    roleList: false,
                    statusList: false,
                    template: !pre?.template,
                    apiGens: false,
                    other: false,
                    info: false,
                  };
                });
              }}
              style={{ margin: 0 }}
            />
            <span className="absolute top-0 right-[30px] scale-0 rounded bg-[#c2833d] p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
              Template Flow
            </span>
          </div>
          <div className="group relative mb-2">
            <ApiIcon
              className={`bg-gray-100 ${
                onMenu?.apiGens ? "text-[#c2833d]" : "text-gray-400"
              } rounded-tl-sm rounded-bl-sm cursor-pointer`}
              onClick={() => {
                setOnMenu((pre: any) => {
                  return {
                    ...pre,
                    roleList: false,
                    statusList: false,
                    template: false,
                    apiGens: !pre?.apiGens,
                    other: false,
                    info: false,
                  };
                });
              }}
              style={{ margin: 0 }}
            />
            <span className="absolute top-0 right-[30px] scale-0 rounded bg-[#c2833d] p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
              Api Generate
            </span>
          </div>
          <div className="group relative mb-2">
            <PendingIcon
              className={`bg-gray-100 ${
                onMenu?.other ? "text-[#c2833d]" : "text-gray-400"
              } rounded-tl-sm rounded-bl-sm cursor-pointer`}
              onClick={() => {
                setOnMenu((pre: any) => {
                  return {
                    ...pre,
                    roleList: false,
                    statusList: false,
                    template: false,
                    apiGens: false,
                    other: !pre?.other,
                    info: false,
                  };
                });
              }}
              style={{ margin: 0 }}
            />
            <span className="absolute top-0 right-[30px] scale-0 rounded bg-[#c2833d] p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
              Coming Soon.
            </span>
          </div>
          <div className="group relative mb-2">
            <InfoIcon
              className={`bg-gray-100 ${
                onMenu?.info ? "text-[#c2833d]" : "text-gray-400"
              } rounded-tl-sm rounded-bl-sm cursor-pointer`}
              onClick={() => {
                setOnMenu((pre: any) => {
                  return {
                    ...pre,
                    roleList: false,
                    statusList: false,
                    template: false,
                    apiGens: false,
                    other: false,
                    info: !pre?.info,
                  };
                });
              }}
              style={{ margin: 0 }}
            />
            <span className="absolute top-0 right-[30px] scale-0 rounded bg-[#c2833d] p-2 text-xs text-white group-hover:scale-100 whitespace-nowrap">
              Information
            </span>
          </div>
        </div>
      </div>
    );
  };

  const edgeNodesUseData = async (payload: any) => {
    let newPayload = payload || [];
    newPayload.map((item: any) => {
      let findSourceName = nodeState.find((f: any) => f?.id === item?.source);
      let findTargetName = nodeState.find((f: any) => f?.id === item?.target);
      item["sourceName"] = findSourceName?.data?.name || null;
      item["targetName"] = findTargetName?.data?.name || null;
      item["onDelesLine"] = delesLine;
      return item;
    });

    setNodeState((pre: any) => {
      let newPre = [];
      newPre = pre.map((element: any) => {
        let filId = newPayload.filter((f: any) => {
          return f?.source === element?.id;
        });
        return {
          ...element,
          data: {
            ...element?.data,
            onDelesRole: delesRole,
            onAddRole: addRoleManage,
            relations: filId || [],
          },
        };
      });
      return newPre;
    });
  };

  useEffect(() => {
    edgeNodesUseData(edgesState);
  }, [edgesState]);

  // useEffect(() => {
  //   console.log(color);
  // }, [color]);

  // useEffect(() => {
  //   console.log(nodeState);
  // }, [nodeState]);

  useEffect(() => {
    nodeColor(initialNodes);
  }, [initialNodes]);

  return (
    <div className="w-[100%] h-[100%] relative border-[5px] border-[#c2833d]">
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
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
        defaultEdgeOptions={{
          style: { strokeWidth: 3, stroke: "black" },
          // type: "smoothstep",
          type: "floating",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "black",
          },
        }}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={{
          strokeWidth: 3,
          stroke: "black",
        }}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Panel position="top-right">
          <div className=" relative flex">
            <MenuList />
            <div
              className={`flex absolute top-0  ${
                !onMenu?.roleList ? " right-[-100vw]" : " right-[0] "
              } duration-300 ease-in-out`}
            >
              <>
                <MenuList />
                <div
                  className={`bg-gray-100 grid justify-center items-center px-2 `}
                >
                  <div className=" font-bold text-gray-600">
                    List Role Manage
                  </div>
                  <div className=" overflow-y-auto h-[calc(100vh-400px)] pr-3 min-w-[250px] pb-2">
                    {listRoleManage || [] ? (
                      (listRoleManage || []).map((item: any, ix: any) => {
                        let filStatusProcess: any = [];
                        nodeState.map((node: any) => {
                          let filRole = (node?.data?.roleManage || []).find(
                            (f: any) => {
                              return f?.id === item?.id;
                            }
                          );
                          if (!!filRole) {
                            filStatusProcess.push(node?.data || null);
                          }
                          return node;
                        });
                        return (
                          <div
                            key={ix}
                            className={`py-2 grid gap-1 ${
                              ix !== listRoleManage.length - 1 &&
                              " border-b-[1px] border-dashed border-gray-500"
                            } bg-white p-1`}
                          >
                            <div className="text-[12px] text-white flex justify-between items-center bg-[#929292] py-1 px-2">
                              <div className=" flex items-center gap-1 font-bold">
                                {item?.name || "-"}
                              </div>
                            </div>

                            <div className=" text-[12px] text-gray-500 flex items-center px-1">
                              <div className=" font-bold">{`Company Type : `}</div>
                              <div className=" whitespace-nowrap px-1">
                                {item?.companyType || "-"}
                              </div>
                            </div>
                            <div className=" text-[12px] text-gray-500 px-1">
                              <div className="flex justify-between items-center">
                                <div className=" font-bold">{`Status Process`}</div>
                                <AddIcon
                                  style={{ fontSize: "16px" }}
                                  className=" cursor-not-allowed"
                                  // onClick={()=>{addRoleManage()}}
                                  onClick={() => {
                                    console.log(nodeState);
                                  }}
                                />
                              </div>
                              <div className=" p-1 mt-2 text-white grid gap-2">
                                {(filStatusProcess || []).length > 0 ? (
                                  (filStatusProcess || []).map(
                                    (eStatus: any, iStatus: any) => {
                                      return (
                                        <div
                                          key={iStatus}
                                          className=" flex items-center gap-2"
                                        >
                                          <DeleteForeverIcon
                                            onClick={() => {
                                              delesRole(eStatus?.id, item);
                                            }}
                                            className=" cursor-pointer text-red-400"
                                            style={{ fontSize: "16px" }}
                                          />
                                          {/* <div className="bg-[#c2833d] px-2 py-1 rounded-sm w-[100%]">{`${eStatus?.name || "-"}`}</div> */}
                                          <div className="text-gray-500 text-[12px] w-[100%] font-bold">{`${
                                            eStatus?.name || "-"
                                          }`}</div>
                                        </div>
                                      );
                                    }
                                  )
                                ) : (
                                  <div className=" text-gray-500 text-center">{`No Role Manage`}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className=" text-gray-500 text-center">{`No List Documents`}</div>
                    )}
                  </div>
                </div>
              </>
            </div>

            <div
              className={`flex absolute top-0  ${
                !onMenu?.statusList ? " right-[-100vw]" : " right-[0] "
              } duration-300 ease-in-out`}
            >
              <>
                <MenuList />
                <div
                  className={`bg-gray-100 grid justify-center items-center px-2 `}
                >
                  <div className=" font-bold text-gray-600">List Documents</div>
                  <div className=" overflow-y-auto h-[calc(100vh-400px)] pr-3 min-w-[250px]">
                    {(nodeState || []).length > 0 &&
                    nodeState.filter((f: any) => {
                      return f?.type === "group";
                    }).length > 0 ? (
                      nodeState
                        .filter((f: any) => {
                          return f?.type === "group";
                        })
                        .map((item: any, ix: any) => {
                          return (
                            <div
                              key={ix}
                              className={` text-[16px] text-gray-700 border-[1px] p-1`}
                              style={{
                                background: item?.style?.backgroundColor,
                              }}
                            >
                              <div className="text-[12px] text-white flex justify-between items-center bg-[#929292] py-1 px-2">
                                <div className=" flex items-center gap-1 font-bold">
                                  <AddIcon
                                    style={{ fontSize: "16px" }}
                                    className=" cursor-pointer"
                                    onClick={() => {
                                      onAddFlow(item, false, null);
                                    }}
                                  />
                                  {`Flow List`}
                                </div>
                                <div className=" flex items-center">
                                  <EditIcon
                                    onClick={() => {
                                      onAddGroup(true, item);
                                    }}
                                    className=" cursor-pointer"
                                    style={{ fontSize: "16px" }}
                                  />
                                  <DeleteForeverIcon
                                    className=" cursor-not-allowed"
                                    style={{ fontSize: "16px" }}
                                  />
                                </div>
                              </div>
                              <div className=" p-1 mt-2 text-white grid gap-2">
                                {(nodeState || []).length > 0 &&
                                nodeState.filter((f: any) => {
                                  return f?.parentNode === item?.id;
                                }).length > 0 ? (
                                  nodeState
                                    .filter((f: any) => {
                                      return f?.parentNode === item?.id;
                                    })
                                    .map((eFlow: any, iFlow: any) => {
                                      // console.log(eFlow);
                                      return (
                                        <div
                                          key={iFlow}
                                          className="border-b-[1px] border-gray-300  border-dashed pb-2"
                                        >
                                          <div className=" flex items-center justify-between">
                                            <div className="text-gray-500 text-[12px] w-[100%] font-bold flex items-center gap-2">
                                              <div
                                                className={`w-[10px] h-[10px] rounded-full`}
                                                style={{
                                                  background:
                                                    eFlow?.style
                                                      ?.backgroundColor,
                                                }}
                                              ></div>
                                              {`${eFlow?.data?.name || "-"}`}
                                            </div>
                                            <div className=" flex items-center">
                                              <EditIcon
                                                onClick={() => {
                                                  onAddFlow(null, true, eFlow);
                                                }}
                                                className=" cursor-pointer text-orange-400"
                                                style={{ fontSize: "16px" }}
                                              />
                                              <DeleteForeverIcon
                                                className=" cursor-not-allowed text-red-400"
                                                style={{ fontSize: "16px" }}
                                              />
                                            </div>
                                          </div>
                                          <div className=" text-gray-500 text-[12px] grid gap-1 mt-1">
                                            <div className="flex items-center justify-between">
                                              <div>{`- Create Documents`}</div>
                                              <div>
                                                {eFlow?.data
                                                  ?.createDocuments ? (
                                                  <TaskAltIcon
                                                    style={{
                                                      fontSize: "14px",
                                                      color: "#60a244",
                                                    }}
                                                  />
                                                ) : (
                                                  "-"
                                                )}
                                              </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <div>{`- SLA`}</div>
                                              <div>{`Coming soon.`}</div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <div>{`- Duplicate`}</div>
                                              <div>{`Coming soon.`}</div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <div>{`- Export`}</div>
                                              <div>{`Coming soon.`}</div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                              <div>{`- Close`}</div>
                                              <div>{`Coming soon.`}</div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })
                                ) : (
                                  <div className=" text-gray-500 text-center">{`No List Flow`}</div>
                                )}
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <div className=" text-gray-500 text-center">{`No Group`}</div>
                    )}

                    <div
                      className=" flex items-center justify-center bg-[#c2833d] my-2 text-white rounded-sm py-1 text-sm cursor-pointer"
                      onClick={() => {
                        onAddGroup(false, null);
                      }}
                    >
                      <div className=" flex items-center gap-2">
                        <AddIcon
                          style={{ fontSize: "16px" }}
                          className=" cursor-pointer"
                          onClick={() => {
                            console.log(nodeState);
                          }}
                        />
                        <div>{`Add Group`}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
            <div
              className={`flex absolute top-0  ${
                !onMenu?.template ? " right-[-100vw]" : " right-[0] "
              } duration-300 ease-in-out`}
            >
              <>
                <MenuList />
                <div
                  className={`bg-gray-100 grid justify-center items-center px-2 `}
                >
                  <div className=" font-bold text-gray-600">Template Flow</div>
                  <div className=" overflow-y-auto h-[calc(100vh-400px)] pr-3 min-w-[250px]">
                    Soon.
                  </div>
                </div>
              </>
            </div>
            <div
              className={`flex absolute top-0  ${
                !onMenu?.apiGens ? " right-[-100vw]" : " right-[0] "
              } duration-300 ease-in-out`}
            >
              <>
                <MenuList />
                <div
                  className={`bg-gray-100 grid justify-center items-center px-2 `}
                >
                  <div className=" font-bold text-gray-600">Api Generate</div>
                  <div className=" overflow-y-auto h-[calc(100vh-400px)] pr-3 min-w-[250px]">
                    <div className=" my-2">
                      <div className=" bg-white p-2 mb-1">
                        <div className="text-sm text-gray-600">
                          {`API - Flow All`}
                        </div>
                        <div className=" flex items-center bg-gray-400 mt-1">
                          <div className=" text-white px-1 text-sm">{`URL`}</div>
                          <input type="text" className=" bg-white w-[100%] my-[1px] text-sm text-gray-600 px-1" disabled defaultValue={`http://flow-demo.com/api....`} />
                          <div className=" bg-gray-400 px-1 flex items-center justify-center cursor-not-allowed">
                            <FileCopyIcon
                              className={`text-gray-200`}
                              style={{ margin: 0, fontSize:"16px" }}
                            />
                          </div>
                        </div>
                        <div className=" text-sm mt-1 text-gray-400">
                          {`manual : `}<span className=" underline cursor-not-allowed">coming soon</span>
                        </div>
                      </div>
                      <div className=" bg-white p-2 mb-1">
                        <div className="text-sm text-gray-600">
                          {`API - Coming Soon...`}
                        </div>
                        <div className=" flex items-center bg-gray-400 mt-1">
                          <div className=" text-white px-1 text-sm">{`URL`}</div>
                          <input type="text" className=" bg-white w-[100%] my-[1px] text-sm text-gray-600 px-1" disabled defaultValue={`http://flow-demo.com/api....`} />
                          <div className=" bg-gray-400 px-1 flex items-center justify-center cursor-not-allowed">
                            <FileCopyIcon
                              className={`text-gray-200`}
                              style={{ margin: 0, fontSize:"16px" }}
                            />
                          </div>
                        </div>
                        <div className=" text-sm mt-1 text-gray-400">
                          {`manual : `}<span className=" underline cursor-not-allowed">coming soon</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
            <div
              className={`flex absolute top-0  ${
                !onMenu?.other ? " right-[-100vw]" : " right-[0] "
              } duration-300 ease-in-out`}
            >
              <>
                <MenuList />
                <div
                  className={`bg-gray-100 grid justify-center items-center px-2 `}
                >
                  <div className=" font-bold text-gray-600">Coming Soon.</div>
                  <div className=" overflow-y-auto h-[calc(100vh-400px)] pr-3 min-w-[250px]">
                    Soon.
                  </div>
                </div>
              </>
            </div>
            <div
              className={`flex absolute top-0  ${
                !onMenu?.info ? " right-[-100vw]" : " right-[0] "
              } duration-300 ease-in-out`}
            >
              <>
                <MenuList />
                <div
                  className={`bg-gray-100 grid justify-center items-center px-2 `}
                >
                  <div className=" font-bold text-gray-600">Information</div>
                  <div className=" overflow-y-auto h-[calc(100vh-400px)] pr-3 min-w-[250px]">
                    Soon.
                  </div>
                </div>
              </>
            </div>
          </div>
        </Panel>
        {/* @ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      {modalAddRole && (
        <div
          className={` fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#5151513d] z-[999] grid items-center justify-center`}
        >
          <div
            className={` bg-white text-gray-600 rounded-sm px-2 min-w-[300px]`}
          >
            <div className="border-b-[1px] py-2 border-gray-300 flex items-center justify-between">
              <div>
                <div className=" text-[#c2833d] font-bold">{`Role Manage`}</div>
                <div className="text-[12px] text-gray-500">{`#${
                  useBoxFlow?.name || "-"
                }`}</div>
              </div>
              <CloseIcon
                className=" cursor-pointer"
                style={{ fontSize: "14px" }}
                onClick={() => {
                  closeAddRoleManage();
                }}
              />
            </div>
            <div className="py-2 max-h-[300px] overflow-y-auto">
              {(listRoleManage || []).length > 0 ? (
                (listRoleManage || []).map((item: any, ix: any) => {
                  let flowRole = useBoxFlow?.roleManage || [];
                  let filCheck = flowRole.find((f: any) => {
                    return f?.id === item?.id;
                  });

                  return (
                    <div
                      key={ix}
                      className={`flex items-start gap-2 ${
                        (listRoleManage || []).length - 1 !== ix &&
                        " border-b-[1px] border-gray-200"
                      } py-2`}
                    >
                      {filCheck ? (
                        <CheckBoxIcon
                          onClick={() => {
                            configRoleManage(useBoxFlow?.id, item, "remove");
                          }}
                          className={`text-[#c2833d] cursor-pointer`}
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                          onClick={() => {
                            configRoleManage(useBoxFlow?.id, item, "add");
                          }}
                          className={`text-[#c2833d] cursor-pointer`}
                        />
                      )}
                      <div>
                        <div>{item?.name || "-"}</div>
                        <div className="text-gray-400 text-[10px]">
                          {item?.companyType || "-"}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" text-gray-500 text-center">{`No Role Manage`}</div>
              )}
              {/* <div className=" flex items-center gap-2">
                <CheckBoxOutlineBlankIcon
                  className={`text-[#c2833d] cursor-pointer`}
                />
                <div>list</div>
              </div> */}
            </div>
            <div className="flex gap-2 items-center justify-end py-2 text-[14px] border-t-[1px] border-gray-300 ">
              <div
                className="flex items-center gap-1 bg-[#c2833d] px-2 py-1 rounded-sm text-white cursor-pointer"
                onClick={() => {
                  saveConfigRoleManage();
                }}
              >
                <SaveIcon
                  className=" cursor-pointer"
                  style={{ fontSize: "14px" }}
                />
                <span>{`SAVE`}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalAddGroup && (
        <div
          className={` fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#5151513d] z-[999] grid items-center justify-center`}
        >
          <div
            className={` bg-white text-gray-600 rounded-sm px-2 min-w-[300px]`}
          >
            <div className="border-b-[1px] py-2 border-gray-300 flex items-center justify-between">
              <div>
                <div className=" text-[#c2833d] font-bold">
                  {flagAddGroup ? `Edit Group` : `Add Group`}
                </div>
                {/* <div className="text-[12px] text-gray-500">{`#${
                  "Add Group"
                }`}</div> */}
              </div>
              <CloseIcon
                className=" cursor-pointer"
                style={{ fontSize: "14px" }}
                onClick={() => {
                  closeAddGroup();
                }}
              />
            </div>
            <div className="py-2 max-h-[300px] overflow-y-auto grid gap-2">
              {/* {(listRoleManage || []).length > 0 ? (
                (listRoleManage || []).map((item: any, ix) => {
                  let flowRole = useBoxFlow?.roleManage || []
                  let filCheck = flowRole.find((f: any) => {
                    return f?.id === item?.id;
                  });
               
                  return (
                    <div
                      key={ix}
                      className={`flex items-start gap-2 ${
                        (listRoleManage || []).length - 1 !== ix &&
                        " border-b-[1px] border-gray-200"
                      } py-2`}
                    >
                      {filCheck ? (
                        <CheckBoxIcon
                        onClick={()=>{configRoleManage(useBoxFlow?.id, item,"remove")}}
                          className={`text-[#c2833d] cursor-pointer`}
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                        onClick={()=>{configRoleManage(useBoxFlow?.id, item,"add")}}
                          className={`text-[#c2833d] cursor-pointer`}
                        />
                      )}
                      <div>
                        <div>{item?.name || "-"}</div>
                        <div className="text-gray-400 text-[10px]">
                          {item?.companyType || "-"}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" text-gray-500 text-center">{`No Role Manage`}</div>
              )} */}

              {/* <div className=" w-[100%]">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none block w-full p-2.5"
                  placeholder="Group Name"
                  autoFocus={true}
                />
              </div> */}
              <div className=" grid justify-center">
                <RgbaStringColorPicker
                  className=""
                  color={color}
                  onChange={setColor}
                />
              </div>
            </div>
            <div className="flex gap-2 items-center justify-end py-2 text-[14px] border-t-[1px] border-gray-300 ">
              <div
                className="flex items-center gap-1 bg-[#c2833d] px-2 py-1 rounded-sm text-white cursor-pointer"
                onClick={() => {
                  flagAddGroup ? editGroup() : saveAddGroup();
                }}
              >
                <SaveIcon
                  className=" cursor-pointer"
                  style={{ fontSize: "14px" }}
                />
                <span>{`SAVE`}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalAddFlow && (
        <div
          className={` fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#5151513d] z-[999] grid items-center justify-center`}
        >
          <div
            className={` bg-white text-gray-600 rounded-sm px-2 min-w-[300px]`}
          >
            <div className="border-b-[1px] py-2 border-gray-300 flex items-center justify-between">
              <div>
                <div className=" text-[#c2833d] font-bold">
                  {flagAddFlow ? `Edit Flow` : `Add Flow`}
                </div>
                {/* <div className="text-[12px] text-gray-500">{`#${
                  "Add Group"
                }`}</div> */}
              </div>
              <CloseIcon
                className=" cursor-pointer"
                style={{ fontSize: "14px" }}
                onClick={() => {
                  closeAddFlow();
                }}
              />
            </div>
            <div className="py-2 grid gap-2">
              {/* {(listRoleManage || []).length > 0 ? (
                (listRoleManage || []).map((item: any, ix) => {
                  let flowRole = useBoxFlow?.roleManage || []
                  let filCheck = flowRole.find((f: any) => {
                    return f?.id === item?.id;
                  });
               
                  return (
                    <div
                      key={ix}
                      className={`flex items-start gap-2 ${
                        (listRoleManage || []).length - 1 !== ix &&
                        " border-b-[1px] border-gray-200"
                      } py-2`}
                    >
                      {filCheck ? (
                        <CheckBoxIcon
                        onClick={()=>{configRoleManage(useBoxFlow?.id, item,"remove")}}
                          className={`text-[#c2833d] cursor-pointer`}
                        />
                      ) : (
                        <CheckBoxOutlineBlankIcon
                        onClick={()=>{configRoleManage(useBoxFlow?.id, item,"add")}}
                          className={`text-[#c2833d] cursor-pointer`}
                        />
                      )}
                      <div>
                        <div>{item?.name || "-"}</div>
                        <div className="text-gray-400 text-[10px]">
                          {item?.companyType || "-"}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" text-gray-500 text-center">{`No Role Manage`}</div>
              )} */}

              <div className=" w-[100%]">
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none block w-full p-2.5"
                  placeholder="Flow Name"
                  autoFocus={true}
                  value={flowName}
                  onChange={(e) => {
                    setFlowName(e?.target?.value);
                  }}
                />
              </div>
              <div className=" grid justify-center">
                <HexColorPicker
                  className=""
                  color={colorFlow}
                  onChange={setColorFlow}
                />
              </div>
              <div className=" text-[14px] text-gray-500">
                <div className=" font-bold">{`Properties`}</div>
                <div className="flex items-center justify-between">
                  <div>{`- Create Documents`}</div>
                  <div>
                    {flowProperties ? (
                      <ToggleOnIcon
                        onClick={() => {
                          setFlowProperties(false);
                        }}
                        className=" cursor-pointer"
                        style={{ color: "#c2833d" }}
                      />
                    ) : (
                      <ToggleOffIcon
                        onClick={() => {
                          setFlowProperties(true);
                        }}
                        className=" cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>{`- SLA`}</div>
                  <div>Coming soon.</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>{`- Duplicate`}</div>
                  <div>Coming soon.</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>{`- Export`}</div>
                  <div>Coming soon.</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>{`- Close`}</div>
                  <div>Coming soon.</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-end py-2 text-[14px] border-t-[1px] border-gray-300 ">
              <div
                className="flex items-center gap-1 bg-[#c2833d] px-2 py-1 rounded-sm text-white cursor-pointer"
                onClick={() => {
                  flagAddFlow ? editAddFlow() : saveAddFlow();
                }}
              >
                <SaveIcon
                  className=" cursor-pointer"
                  style={{ fontSize: "14px" }}
                />
                <span>{`SAVE`}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DocumentsDemo = ({ nodeState, edgesState, listRoleManage }: any) => {
  // console.log("nodeState : ", nodeState);
  // console.log("edgesState : ", edgesState);
  // console.log("listRoleManage : ", listRoleManage);

  const [flagRole, setFlagRole] = useState(false);
  const [roleSelect, setRoleSelect] = useState<any>(listRoleManage[0] || null);
  const [dataDemo, setDataDemo] = useState<any>([
    {
      id: 1,
      docNo: "Doc-001",
      previousFlow: {
        prev: null,
        now: {
          id: "1",
          type: "custom",
          position: { x: 100, y: 100 },
          data: {
            id: "1",
            name: "DRAFT",
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
          },
          parentNode: "groupA",
        },
      },
      activeFlow: false,
    },
    {
      id: 2,
      docNo: "Doc-002",
      previousFlow: {
        prev: null,
        now: {
          id: "1",
          type: "custom",
          position: { x: 100, y: 100 },
          data: {
            id: "1",
            name: "DRAFT",
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
          },
          parentNode: "groupA",
        },
      },
      activeFlow: false,
    },
    {
      id: 3,
      docNo: "Doc-003",
      previousFlow: {
        prev: {
          id: "1",
          type: "custom",
          position: { x: 100, y: 100 },
          data: {
            id: "1",
            name: "DRAFT",
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
          },
          parentNode: "groupA",
        },
        now: {
          id: "2",
          type: "custom",
          position: { x: 100, y: 320 },
          data: {
            id: "2",
            name: "OPEN",
            createDocuments: false,
            relations: [],
            roleManage: [
              {
                id: 2,
                name: "Project Engineer",
                companyType: "Contractor",
              },
              {
                id: 3,
                name: "Project Manager",
                companyType: "Contractor",
              },
              {
                id: 4,
                name: "Designer",
                companyType: "Consult",
              },
            ],
          },
          style: {
            backgroundColor: "#88aaad",
          },
          parentNode: "groupA",
        },
      },
      activeFlow: false,
    },
  ]);

  const [nextFlow, setNextFlow] = useState<any>([]);
  const [tempRow, setTempRow] = useState<any>(null);

  const handleActiveFlow = async (payload: any) => {
    setTempRow(payload);
    setDataDemo((pre: any) => {
      let newPre = pre.map((item: any) => {
        let activeFlow = false;
        if (item?.id === payload?.id) {
          activeFlow = !payload?.activeFlow;
        } else {
          activeFlow = false;
        }
        return { ...item, activeFlow: activeFlow };
      });
      return newPre;
    });
    let checkFlow = (edgesState || [])
      .filter((f: any) => {
        return f?.source === payload?.previousFlow?.now?.id;
      })
      .map((e: any) => e?.target);
    let useNextFlow = (nodeState || []).filter((f: any) => {
      return checkFlow.includes(f?.id);
    });
    setNextFlow(useNextFlow || []);
  };

  const activeFlowStep = async (payload: any) => {
    console.log("payload : ", payload);
    setDataDemo((pre: any) => {
      let newPre = pre.map((item: any) => {
        console.log(item);
        let previousFlow = {
          prev: null,
          now: null,
        };
        if (item?.id === tempRow?.id) {
          previousFlow = {
            prev: item?.previousFlow?.now,
            now: payload,
          };
        } else {
          previousFlow = item?.previousFlow;
        }
        console.log(item);
        return { ...item, activeFlow: false, previousFlow: previousFlow };
      });
      return newPre;
    });
    setTempRow(null);
    setNextFlow([]);
  };
  // useEffect(() => {
  //   console.log(roleSelect);
  // }, [roleSelect]);

  return (
    <div className="w-[100%] h-[100%] relative border-[5px] border-[#c2833d]">
      <div className="h-[100px] grid items-center px-2">
        <div className=" font-bold text-[#c2833d]">{`Option Simulate`}</div>
        <div className=" flex items-center justify-between">
          <div className=" flex items-center gap-2">
            <div>{`Simulate Login Role : `}</div>
            <div className=" relative">
              <div
                onClick={() => {
                  setFlagRole((pre: any) => !pre);
                }}
                className="flex items-center justify-center text-center min-w-[200px] px-2 py-1 bg-slate-200 rounded-sm cursor-pointer"
              >
                <div className=" flex items-center gap-2 text-left">
                  <div className=" font-bold text-gray-600">{`${
                    roleSelect?.name || "-"
                  }`}</div>
                  <div className="text-[12px] text-gray-400">{`${
                    (roleSelect?.companyType &&
                      `(${roleSelect?.companyType})`) ||
                    "-"
                  }`}</div>
                </div>
                <ArrowRightIcon />
              </div>
              {flagRole && (
                <div className=" absolute z-[9999] bg-gray-100 top-0 left-full shadow-md text-[14px] border-[1px]">
                  {(listRoleManage || []).length > 0 ? (
                    (listRoleManage || []).map((item: any, ix: any) => {
                      return (
                        <div
                          key={ix}
                          onClick={() => {
                            setFlagRole(false);
                            setRoleSelect(item);
                          }}
                          className=" whitespace-nowrap hover:bg-[#ffff] p-2 cursor-pointer border-b-[1px] "
                        >
                          <div className=" font-bold text-gray-600">
                            {item?.name}
                          </div>
                          <div className="text-[12px] text-gray-400">
                            {item?.companyType}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>{`Emtry Role`}</div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* <div className="flex items-center gap-1 text-[14px] cursor-not-allowed">
            <AddIcon style={{ fontSize: "14px" }} />{" "}
            <div>{`Create Documents`}</div>
          </div> */}
        </div>
      </div>

      <div className="relative  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Doc No.
              </th>
              <th scope="col" className="px-6 py-3">
                SLA
              </th>
              <th scope="col" className="px-6 py-3">
                Previous Flow
              </th>
              <th scope="col" className="px-6 py-3">
                Action Flow
              </th>
            </tr>
          </thead>
          <tbody>
            {(dataDemo || []).length > 0
              ? (dataDemo || []).map((item: any, ix: any) => {
                  return (
                    <tr
                      key={ix}
                      className="odd:bg-white even:bg-gray-50 border-b"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {ix + 1}
                      </th>
                      <td className="px-6 py-4">{item?.docNo || "-"}</td>
                      <td className="px-6 py-4">coming soon.</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <div>
                          {item?.previousFlow?.prev?.data?.name ? (
                            <div className=" flex items-center gap-1">
                              <div
                                className="w-[10px] h-[10px] rounded-full"
                                style={{
                                  background:
                                    item?.previousFlow?.prev?.style
                                      ?.backgroundColor,
                                }}
                              ></div>{" "}
                              {item?.previousFlow?.prev?.data?.name}
                            </div>
                          ) : (
                            <div>{`START`}</div>
                          )}
                        </div>
                        <ArrowRightAltIcon />
                        <div className=" flex items-center gap-1">
                          <div
                            className="w-[10px] h-[10px] rounded-full"
                            style={{
                              background:
                                item?.previousFlow?.now?.style?.backgroundColor,
                            }}
                          ></div>{" "}
                          {item?.previousFlow?.now?.data?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          {
                            // item?.previousFlow?.now?.data?.roleManage
                            // roleSelect?.id
                            !!item?.previousFlow?.now?.data?.roleManage.find(
                              (f: any) => {
                                return f?.id === roleSelect?.id;
                              }
                            ) ? (
                              <div
                                className=" bg-[#c2833d] w-fit rounded-md px-3 py-1 text-white cursor-pointer"
                                onClick={() => {
                                  handleActiveFlow(item);
                                }}
                              >
                                Active
                              </div>
                            ) : (
                              <div>{`-`}</div>
                            )
                          }
                          {!!item?.activeFlow && (
                            <div className=" absolute top-0 right-full bg-slate-200 z-[99999] text-start py-2 min-w-[100px]">
                              <div className=" whitespace-nowrap font-bold px-2">
                                Flow
                              </div>
                              {(nextFlow || []).length > 0 ? (
                                (nextFlow || []).map((item: any, ix: any) => {
                                  return (
                                    <div
                                      key={ix}
                                      className=" flex items-center gap-2 hover:bg-white p-2 cursor-pointer mt-2"
                                      onClick={() => {
                                        activeFlowStep(item);
                                      }}
                                    >
                                      <div
                                        className="w-[10px] h-[10px] rounded-full"
                                        style={{
                                          background:
                                            item?.style?.backgroundColor,
                                        }}
                                      ></div>
                                      <div>{item?.data?.name || "-"}</div>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className=" text-gray-500 text-center whitespace-nowrap">{`Emtry Flow`}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function WorkflowManage({}: any) {
  const [flagTap, setFlagTap] = useState("1");

  const [listRoleManage, setListRoleManage] = useState([
    {
      id: 1,
      name: "admin",
      companyType: "Contractor",
    },
    {
      id: 2,
      name: "Project Engineer",
      companyType: "Contractor",
    },
    {
      id: 3,
      name: "Project Manager",
      companyType: "Contractor",
    },
    {
      id: 4,
      name: "Designer",
      companyType: "Consult",
    },
    {
      id: 5,
      name: "Project Engineer",
      companyType: "Consult",
    },
    {
      id: 6,
      name: "Project Manager",
      companyType: "Consult",
    },
    {
      id: 7,
      name: "QC",
      companyType: "Consult",
    },
    {
      id: 8,
      name: "Owner",
      companyType: "Owner",
    },
  ]);
  const [nodeState, setNodeState] = useState<any>(
    [
      {
        id: "groupA",
        data: null,
        position: { x: 0, y: 0 },
        className: "light",
        style: {
          backgroundColor: "rgba(163, 231, 255, 0.1)",
          height: 800,
          width: 1000,
          fontSize: 30,
        },
        type: "group",
      },
      {
        id: "groupB",
        data: null,
        position: { x: 0, y: 820 },
        className: "light",
        style: {
          backgroundColor: "rgba(255, 236, 163, 0.1)",
          height: 500,
          width: 1000,
          fontSize: 30,
        },
        type: "group",
      },
      {
        id: "1",
        type: "custom",
        position: { x: 100, y: 100 },
        data: {
          id: "1",
          name: "DRAFT",
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
        },
        parentNode: "groupA",
      },
      {
        id: "2",
        type: "custom",
        position: { x: 100, y: 320 },
        data: {
          id: "2",
          name: "OPEN",
          createDocuments: false,
          relations: [],
          roleManage: [
            {
              id: 2,
              name: "Project Engineer",
              companyType: "Contractor",
            },
            {
              id: 3,
              name: "Project Manager",
              companyType: "Contractor",
            },
            {
              id: 4,
              name: "Designer",
              companyType: "Consult",
            },
          ],
        },
        style: {
          backgroundColor: "#88aaad",
        },
        parentNode: "groupA",
      },
      {
        id: "3",
        type: "custom",
        position: { x: 400, y: 320 },
        data: {
          id: "3",
          name: "PROCESSING",
          createDocuments: false,
          relations: [],
          roleManage: [
            {
              id: 5,
              name: "Project Engineer",
              companyType: "Consult",
            },
            {
              id: 6,
              name: "Project Manager",
              companyType: "Consult",
            },
            {
              id: 7,
              name: "QC",
              companyType: "Consult",
            },
          ],
        },
        style: {
          backgroundColor: "#55533d",
        },
        parentNode: "groupA",
      },
      {
        id: "4",
        type: "custom",
        position: { x: 400, y: 600 },
        data: {
          id: "4",
          name: "DONE FLOW A",
          createDocuments: false,
          relations: [],
          roleManage: [
            {
              id: 8,
              name: "Owner",
              companyType: "Owner",
            },
          ],
        },
        style: {
          backgroundColor: "#aaa33d",
        },
        parentNode: "groupA",
      },
      {
        id: "5",
        type: "custom",
        position: { x: 700, y: 100 },
        data: {
          id: "5",
          name: "REJECT",
          createDocuments: false,
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
          backgroundColor: "#c2003d",
        },
        parentNode: "groupA",
      },
      {
        id: "b1",
        type: "custom",
        position: { x: 400, y: 60 },
        data: {
          id: "b1",
          name: "PROCESSING B",
          createDocuments: false,
          relations: [],
          roleManage: [
            {
              id: 5,
              name: "Project Engineer",
              companyType: "Consult",
            },
            {
              id: 6,
              name: "Project Manager",
              companyType: "Consult",
            },
          ],
        },
        style: {
          backgroundColor: "#c28aff",
        },
        parentNode: "groupB",
      },
      {
        id: "b2",
        type: "custom",
        position: { x: 400, y: 300 },
        data: {
          id: "b2",
          name: "CLOSE",
          createDocuments: false,
          relations: [],
          roleManage: [
            {
              id: 8,
              name: "Owner",
              companyType: "Owner",
            },
          ],
        },
        style: {
          backgroundColor: "#00833d",
        },
        parentNode: "groupB",
      },
    ] || []
  );
  const [edgesState, setEdgesState] = useState<any>(
    [
      {
        style: {
          strokeWidth: 3,
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
          strokeWidth: 3,
          stroke: "black",
        },
        type: "floating",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
        },
        source: "2",
        sourceHandle: null,
        target: "1",
        targetHandle: null,
        id: "reactflow__edge-2-1",
      },
      {
        style: {
          strokeWidth: 3,
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
          strokeWidth: 3,
          stroke: "black",
        },
        type: "floating",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
        },
        source: "3",
        sourceHandle: null,
        target: "4",
        targetHandle: null,
        id: "reactflow__edge-3-4",
      },
      {
        style: {
          strokeWidth: 3,
          stroke: "black",
        },
        type: "floating",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
        },
        source: "3",
        sourceHandle: null,
        target: "5",
        targetHandle: null,
        id: "reactflow__edge-3-5",
      },
      {
        style: {
          strokeWidth: 3,
          stroke: "black",
        },
        type: "floating",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
        },
        source: "5",
        sourceHandle: null,
        target: "1",
        targetHandle: null,
        id: "reactflow__edge-5-1",
      },
      {
        style: {
          strokeWidth: 3,
          stroke: "black",
        },
        type: "floating",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
        },
        source: "4",
        sourceHandle: null,
        target: "b1",
        targetHandle: null,
        id: "reactflow__edge-4-b1",
      },
      {
        style: {
          strokeWidth: 3,
          stroke: "black",
        },
        type: "floating",
        markerEnd: {
          type: "arrowclosed",
          color: "black",
        },
        source: "b1",
        sourceHandle: null,
        target: "b2",
        targetHandle: null,
        id: "reactflow__edge-b1-b2",
      },
    ] || []
  );
  return (
    <>
      <div className=" h-[115px] bg-[#c2833d] text-white grid items-center ">
        <div className="">
          <div className=" flex justify-center text-[38px] font-bold">
            SUPALAI WORKFLOW
          </div>
          <div className=" flex items-center justify-center gap-3 font-bold">
            <div
              onClick={() => {
                setFlagTap("1");
              }}
              className={` cursor-pointer border-b-[2px] ${
                flagTap === "1" ? "border-[#ffffff]" : "border-[#c2833d]"
              } `}
            >
              workflow
            </div>
            <div
              onClick={() => {
                setFlagTap("2");
              }}
              className={` cursor-pointer border-b-[2px] ${
                flagTap === "2" ? "border-[#ffffff]" : "border-[#c2833d]"
              } `}
            >
              documents
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[calc(100vh-115px)]">
        {flagTap === "1" ? (
          <ReactFlowProvider>
            <LayoutFlow
              nodeState={nodeState}
              setNodeState={setNodeState}
              edgesState={edgesState}
              setEdgesState={setEdgesState}
              listRoleManage={listRoleManage}
              setListRoleManage={setListRoleManage}
            />
          </ReactFlowProvider>
        ) : flagTap === "2" ? (
          <DocumentsDemo
            nodeState={nodeState}
            edgesState={edgesState}
            listRoleManage={listRoleManage}
          />
        ) : null}
      </div>
    </>
  );
}

// flow-demo-app.nueamek.app
// flow-demo-api.nueamek.app
