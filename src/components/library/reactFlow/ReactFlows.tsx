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
} from "reactflow";

import "reactflow/dist/style.css";

const NODE_WIDTH = 116;
const NODE_HEIGHT = 28;
const OVERLAP_OFFSET = 10;
let currentOverlapOffset = 0;

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

const nodeTypes = {
  nodeStart: NodeStart,
  nodeRoute: NodeRoute,
  nodeEnd: NodeEnd,
};

const edgeTypes = {
  buttonedge: ButtonEdge,
};

function LayoutFlow() {
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
  const [nodeState, setNodeState] = useState<any>(
    (initialNodes || []).map((e: any) => {
      e.data = {
        id: e?.id,
        label: e?.label,
        backgroundColor: e?.backgroundColor,
        onFunc: deleteNode,
      };
      return e;
    }) || []
  );
  const [edgesState, setEdgesState] = useState<any>(initialEdges || []);
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
  const onConnect = useCallback(
    (params: any) => {
      params.type = "buttonedge";
      params.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#919191",
      };
      params.style = {
        strokeWidth: 1,
        stroke: "#919191",
      };
      setEdgesState((eds: any) => {
        return addEdge(params, eds);
      });
    },
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

  useEffect(() => {
    nodeColor(initialNodes);
  }, [initialNodes]);


  return (
    <div className="w-[100%] h-[100%]">
      <ReactFlow
        nodes={nodeState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        deleteKeyCode={[]}
        fitView
        fitViewOptions={{
          padding: 0.2,
          // includeHiddenNodes?: boolean;
          // minZoom?: number;
          // maxZoom?: number;
          // duration?: number;
        }}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Panel position="top-right">
          <div className=" bg-gray-100 ">
            <div className="grid justify-center items-center gap-3 p-3">
              <h3 className=" font-bold">Add Area</h3>
              {!!area && (area || []).length > 0 ? (
                (area || []).map((item: any, ix: any) => {
                  return (
                    <button
                      key={ix}
                      className={`flex items-center justify-center w-[50px] h-[50px] rounded-full border-[1px] border-[#515151]`}
                      style={{ background: item?.backgroundColor }}
                      onClick={() => {
                        addNode({
                          id: `${item?.id}`,
                          type: "nodeRoute",
                          label: "B2",
                          backgroundColor: "#6ed5de",
                          data: {
                            id: `${item?.id}`,
                            label: `${item?.label}`,
                            backgroundColor: `${item?.backgroundColor}`,
                            onFunc: deleteNode,
                          },
                          position: { x: 0, y: 0 },
                          style: {
                            backgroundColor: `${item?.backgroundColor}`,
                            color: "#515151",
                          },
                          className: "rounded-full",
                        });
                      }}
                    >
                      {item?.label || "-"}
                    </button>
                  );
                })
              ) : (
                <div>Emtry</div>
              )}
            </div>
          </div>
        </Panel>
        {/* @ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function ReactFlows() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
