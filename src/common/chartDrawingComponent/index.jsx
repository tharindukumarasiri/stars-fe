import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    Panel,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { message } from 'antd';

import CustomNode from './CustomNode.js';
import LineChart from './shapes/LineChart.js';
import Shapes, { parentNodes } from './ShapesData.js';
import FloatingEdge from './customElements/FloatingEdge';
import CustomConnectionLine from './customElements/CustomConnectionLine';
import Sidebar from './Sidebar';
import ToolBar from './ToolBar';
import ContextMenu from './customElements/ContextMenu.js';

import { useDiagramStore } from '../../Views/ChartDrawing/chartDrawingStore'
import { getId } from './utils'

import style from './DndStyles.module.scss'

const arrowColor = '#8f8f8f'

const connectionLineStyle = {
    strokeWidth: 1,
    stroke: arrowColor,
};

const edgeTypes = {
    floating: FloatingEdge,
};

const defaultEdgeOptions = {
    style: { strokeWidth: 1, stroke: arrowColor },
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: arrowColor,
    },
    zIndex: 1001,
};

const DnDFlow = ({ props }) => {
    const reactFlowWrapper = useRef(null);
    const dragRef = useRef(null);
    const saveDiagram = useDiagramStore((state) => state.saveDiagram);

    const [nodes, setNodes, onNodesChange] = useNodesState(props?.data?.nodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props?.data?.edges || []);

    const [target, setTarget] = useState(null);
    const [menu, setMenu] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [diagramName, setDiagramName] = useState(props?.name);
    const [deleteNodeId, setDeleteNodeId] = useState('')

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const nodeTypes = useMemo(() => {
        const types = { ...Shapes }
        Object.keys(types).forEach(key => types[key] = CustomNode);
        types['LineChart'] = LineChart
        return types;
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(type),
                type: type,
                position,
                data: {
                    setDeleteNodeId,
                },
            };

            if (type === 'Table') {
                newNode.data = { ...newNode.data, addTableLine }
            }

            setNodes((nds) => nds.concat(newNode));
        }, [reactFlowInstance]
    );

    useEffect(() => {
        if (deleteNodeId !== '') {
            const nodeToDelete = nodes.find(node => node.id === deleteNodeId)
            reactFlowInstance.deleteElements({ nodes: [nodeToDelete] })
            setDeleteNodeId('')
        }
    }, [deleteNodeId])

    const onNodeDragStart = (evt, node) => {
        dragRef.current = node;
    };

    const onNodeDrag = (evt, node) => {
        // calculate the center point of the node from position and dimensions
        const centerX = node.position.x + node.width / 2;
        const centerY = node.position.y + node.height / 2;

        // find a node where the center point is inside
        const targetNode = nodes.find(
            (n) =>
                centerX > n.position.x &&
                centerX < n.position.x + n.width &&
                centerY > n.position.y &&
                centerY < n.position.y + n.height &&
                n.id !== node.id // this is needed, otherwise we would always find the dragged node
        );

        setTarget(targetNode);
    };

    const onNodeDragStop = (evt, node) => {
        setNodes((nodes) =>
            nodes.map((n) => {
                const isParentNode = parentNodes.some(parent => target?.id?.includes(parent));

                if (target && isParentNode && node?.id === n?.id && !n?.parentNode) {
                    n.parentNode = target?.id;
                    n.extent = 'parent';
                    n.position = { x: target.width * .4, y: target.height * .4 }
                }
                return n;
            })
        );

        setTarget(null);
        dragRef.current = null;
    };

    // const onNameChange = (e) => { //TODO to be add later 
    //     e.preventDefault();
    //     setDiagramName(e.target.value)
    // }

    const onNodeContextMenu = useCallback(
        (event, node) => {
            // Prevent native context menu from showing
            event.preventDefault();

            // Calculate position of the context menu
            const pane = reactFlowWrapper.current.getBoundingClientRect();
            setMenu({
                id: node.id,
                top: event.clientY - 80,
                left: event.clientX - 50,
            });
        },
        [setMenu]
    );

    // Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

    const addTableLine = (type, parentId, parentSize, position) => {
        const newNode = {
            id: getId(type),
            type: type,
            position,
            parentNode: parentId,
            extent: 'parent',
            data: {
                setDeleteNodeId,
                hideHandle: true,
                size: parentSize,
                resizeToParentId: parentId,
            },
        };

        setNodes((nds) => nds.concat(newNode));
    }

    const onSave = () => {
        saveDiagram({ nodes: nodes, edges: edges }, diagramName);
        message.success('Diagram Saved')
    }

    return (
        <div className={style.dndflow}>
            <ReactFlowProvider>
                <Sidebar diagramName={diagramName} />
                <Panel position="top-center">
                    <ToolBar onSave={onSave} />
                </Panel>

                <div className={style.reactflowrapper} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeDragStart={onNodeDragStart}
                        onNodeDrag={onNodeDrag}
                        onNodeDragStop={onNodeDragStop}
                        onNodeContextMenu={onNodeContextMenu}
                        onPaneClick={onPaneClick}
                        fitView
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        defaultEdgeOptions={defaultEdgeOptions}
                        connectionLineComponent={CustomConnectionLine}
                        connectionLineStyle={connectionLineStyle}
                    >
                        <Controls />
                        <Background variant="dots" gap={8} size={0.5} />
                        <Panel />
                    </ReactFlow>
                </div>
                {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
