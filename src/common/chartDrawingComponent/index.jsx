import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    SelectionMode,
    Background,
    Panel,
    MarkerType,
    applyNodeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './shapes/CustomNode.js';
import LineChart from './shapes/LineChart.js';
import MatrixChart from './shapes/MatrixChart.js';
import MatrixTable from './shapes/MatrixTable.js';
import Line from './shapes/Line.js';
import Text from './shapes/Text.js';
import PieChart from './shapes/PieChart.js';
import BarChart from './shapes/BarChart.js';
import UploadNode from './shapes/UploadNode.js';
import Shapes, { parentNodes, uploadNodeId } from './ShapesData.js';
import FloatingEdge from './customElements/FloatingEdge';
import CustomConnectionLine from './customElements/CustomConnectionLine';
import Sidebar from './panels/Sidebar.jsx';
import PropertyPanel from './panels/PropertyPanel.jsx';
import ToolBar from './panels/ToolBar.jsx';
import ReferenceModal from './panels/ReferenceModal.jsx';
import ContextMenu from './customElements/ContextMenu.js';
import { useNodeDataStore } from './store'
import HelperLines from "./customElements/HelperLines.jsx";

import { useDiagramStore } from '../../Views/ChartDrawing/chartDrawingStore'
import { getId, arrowColor, getHelperLines, formatOldNodesData } from './utils'

import style from './DndStyles.module.scss'
import PagesPanel from './panels/PagesPanel.jsx';

const connectionLineStyle = {
    strokeWidth: 1,
    stroke: arrowColor,
};

const edgeTypes = {
    floating: FloatingEdge,
};
const panOnDrag = [1, 2];

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
    const data = JSON.parse(props?.DrawingContent)?.[0]
    const reactFlowWrapper = useRef(null);
    const dragRef = useRef(null);
    const saveDiagram = useDiagramStore((state) => state.saveDiagram);
    const timeoutRef = useRef(null);

    const [nodes, setNodes] = useNodesState(formatOldNodesData(data?.nodes));
    const [edges, setEdges, onEdgesChange] = useEdgesState(data?.edges || []);
    const [helperLineHorizontal, setHelperLineHorizontal] = useState(undefined);
    const [helperLineVertical, setHelperLineVertical] = useState(undefined);

    const [target, setTarget] = useState(null);
    const [menu, setMenu] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [spacebarActive, setSpacebarActive] = useState(false)

    const currentPage = useNodeDataStore((state) => state.currentPage);
    const setCurrentPage = useNodeDataStore((state) => state.setCurrentPage);
    const pagesData = useNodeDataStore((state) => state.pagesData);
    const setPagesData = useNodeDataStore((state) => state.setPagesData);
    const setAllData = useNodeDataStore((state) => state.setAllData);
    const textdata = useNodeDataStore((state) => state.textdata);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const size = useNodeDataStore((state) => state.size);
    const setSize = useNodeDataStore((state) => state.setSize);
    const chartData = useNodeDataStore((state) => state.chartData);
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const copiedNodes = useNodeDataStore((state) => state.copiedNodes);
    const currentLayer = useNodeDataStore((state) => state.currentLayer);
    const setCurrentLayer = useNodeDataStore((state) => state.setCurrentLayer);
    const layers = useNodeDataStore((state) => state.layers);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const customApplyNodeChanges = useCallback(
        (changes, nodes) => {
            // reset the helper lines (clear existing lines, if any)
            setHelperLineHorizontal(undefined);
            setHelperLineVertical(undefined);

            // this will be true if it's a single node being dragged
            // inside we calculate the helper lines and snap position for the position where the node is being moved to
            if (
                changes.length === 1 &&
                changes[0].type === 'position' &&
                changes[0].dragging &&
                changes[0].position
            ) {
                const helperLines = getHelperLines(changes[0], nodes);

                // if we have a helper line, we snap the node to the helper line position
                // this is being done by manipulating the node position inside the change object
                changes[0].position.x =
                    helperLines.snapPosition.x ?? changes[0].position.x;
                changes[0].position.y =
                    helperLines.snapPosition.y ?? changes[0].position.y;

                // if helper lines are returned, we set them so that they can be displayed
                setHelperLineHorizontal(helperLines.horizontal);
                setHelperLineVertical(helperLines.vertical);
            }

            return applyNodeChanges(changes, nodes);
        },
        []
    );

    const onNodesChange = useCallback(
        (changes) => {
            setNodes((nodes) => customApplyNodeChanges(changes, nodes));
        },
        [setNodes, customApplyNodeChanges]
    );


    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    useEffect(() => {
        if (props?.DrawingContent) {
            setPagesData(JSON.parse(props?.DrawingContent) || [{ nodes: [], edges: [], nodesData: [], nodeSizes: [], chartData: [], pageName: 'Page 1' }])
            setAllData(data?.nodeSizes || [], data?.nodesData || [], data?.chartData || [], data?.layersData)
        }
    }, [props])

    // Auto save functionality
    const debounceSave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(onSave, 3000);
    };

    useEffect(() => {
        debounceSave();
    }, [nodes, edges, textdata, size, chartData, layers]);

    const nodeTypes = useMemo(() => {
        const types = { ...Shapes }
        Object.keys(types).forEach(key => types[key] = CustomNode);
        types['LineChart'] = LineChart
        types['MatrixChart'] = MatrixChart
        types['MatrixTable'] = MatrixTable
        types['HorizontalLine'] = Line
        types['VerticalLine'] = Line
        types['Text'] = Text
        types['PieChart'] = PieChart
        types['BarChart'] = BarChart
        types[uploadNodeId] = UploadNode
        return types;
    }, []);

    const selectedNodes = useMemo(() => {
        return nodes.filter(node => node.selected)
    }, [nodes])

    useEffect(() => {
        const selectedNodeLayer = selectedNodes?.[0]?.data?.layer
        if (selectedNodeLayer && selectedNodeLayer !== currentLayer) {
            setCurrentLayer(selectedNodeLayer)
        }
    }, [selectedNodes])

    const selectedEdges = useMemo(() => {
        return edges.filter(edge => edge.selected)
    }, [edges])

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
                selected: true,
                data: {
                    layer: currentLayer,
                },
            };

            if (type === 'Table') {
                newNode.data = { ...newNode.data, addTableLine }
            }

            if (type === uploadNodeId) {
                const image = event.dataTransfer.getData('application/reactflow/uploaded');

                newNode.data = { ...newNode.data, image };
            }

            // Create a layer order map
            const layerOrderMap = layers.reduce((acc, layer, index) => {
                acc[layer.id] = index;
                return acc;
            }, {});

            const clearSelectedNodes = nodes.map((n) => {
                const newNode = { ...n }
                newNode.selected = false;
                return newNode;
            })

            const updatedNodes = [...clearSelectedNodes, newNode];

            // Sort shapes based on layer order
            const sortedNodes = updatedNodes.sort((a, b) => {
                return (layerOrderMap[a.data.layer] ?? Infinity) - (layerOrderMap[b.data.layer] ?? Infinity);
            });

            setNodes(sortedNodes);
        }, [reactFlowInstance, currentLayer, layers, nodes]
    );

    const onChangePage = (index, isNewPage = false) => {
        const newPagesData = JSON.parse(JSON.stringify(pagesData))
        newPagesData[currentPage] = { ...newPagesData[currentPage], nodes: nodes, edges: edges, nodesData: textdata, nodeSizes: size, chartData: chartData, layersData: { layers: layers, currentLayer: currentLayer } }
        if (isNewPage)
            newPagesData.push({ nodes: [], edges: [], nodesData: [], nodeSizes: [], chartData: [], pageName: `Page ${index + 1}` });

        setPagesData(newPagesData)

        const currentPageData = pagesData?.[index]
        setAllData(currentPageData?.nodeSizes || [], currentPageData?.nodesData || [], currentPageData?.chartData || [], currentPageData?.layersData)
        setNodes(formatOldNodesData(currentPageData?.nodes))
        setEdges(currentPageData?.edges || [])

        setCurrentPage(index)
    }

    const spacebarPress = useCallback((event) => {
        if (event.key === " " && !spacebarActive) {
            setSpacebarActive(true)
        }
    }, []);

    const spacebarRelease = useCallback((event) => {
        if (event.key === " ") {
            setSpacebarActive(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", spacebarPress, false);
        document.addEventListener("keyup", spacebarRelease, false);

        return () => {
            document.removeEventListener("keydown", spacebarPress, false);
            document.removeEventListener("keyup", spacebarRelease, false);
        };
    }, [spacebarPress, spacebarRelease]);

    const getAllData = useCallback(() => {
        const newPagesData = JSON.parse(JSON.stringify(pagesData))
        newPagesData[currentPage] = { ...newPagesData[currentPage], nodes: nodes, edges: edges, nodesData: textdata, nodeSizes: size, chartData: chartData, layersData: { layers: layers, currentLayer: currentLayer } }
        setPagesData(newPagesData)
        return newPagesData
    }, [nodes, edges, textdata, size, chartData, layers, currentLayer]);

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
                hideHandle: true,
                size: parentSize,
                resizeToParentId: parentId,
            },
        };

        setNodes((nds) => nds.concat(newNode));
    }

    const onSave = () => {
        const payload = {
            'Id': props?.Id,
            'CollectionId': props?.CollectionId,
            'Name': props?.Name,
            'DrawingContent': JSON.stringify(getAllData()),
        }
        saveDiagram(payload);
    }

    const clearSelectedNodes = () => {
        setNodes((nodes) =>
            nodes.map((n) => {
                const newNode = { ...n }
                newNode.selected = false;
                return newNode;
            })
        );
    }

    const pasteCopiedNodes = () => {
        clearSelectedNodes();

        const newNodes = copiedNodes?.map((node, index) => {
            const newNodeData = { ...node }
            const newNodeId = getId(newNodeData.id.split('_')[0]) + index

            const txtData = textdata?.find(item => item.id === node?.id)
            if (txtData) {
                const newTextData = { ...txtData }
                delete newTextData.id
                onTextChange(newNodeId, newTextData)
            }

            const chrtData = chartData?.find(item => item.id === node?.id)
            if (chrtData) {
                const newChartData = { ...chrtData }
                delete newChartData.id
                changeChartData(newNodeId, newChartData)
            }

            const nodeSize = size?.find(item => item.id === node?.id)
            if (nodeSize) {
                const newSize = { ...nodeSize }
                delete newSize.id
                setSize(newNodeId, newSize)
            }

            newNodeData.id = newNodeId
            return newNodeData
        })

        setNodes((nds) => nds.concat(newNodes));
    }

    return (
        <div className={style.dndflow}>
            <Sidebar />

            <ReactFlowProvider>
                <Panel position="top-center">
                    <ToolBar
                        onSave={onSave}
                        pasteNodes={pasteCopiedNodes}
                        clearSelectedNodes={clearSelectedNodes}
                        getAllData={getAllData}
                        edges={edges}
                        setEdges={setEdges}
                        setNodes={setNodes}
                        spacebarActive={spacebarActive}
                        setSpacebarActive={setSpacebarActive}
                    />
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
                        onNodeClick={onPaneClick}
                        panOnScroll={true}
                        selectionOnDrag={true}
                        panOnDrag={panOnDrag}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        defaultEdgeOptions={defaultEdgeOptions}
                        connectionLineComponent={CustomConnectionLine}
                        connectionLineStyle={connectionLineStyle}
                        zoomOnDoubleClick={false}
                        nodesDraggable={!spacebarActive}
                        nodesFocusable={!spacebarActive}
                        selectionMode={SelectionMode.Partial}
                    >
                        <Background variant="dots" gap={8} size={0.5} id={props?.CollectionId} />
                        <Panel />
                        <HelperLines
                            horizontal={helperLineHorizontal}
                            vertical={helperLineVertical}
                        />
                    </ReactFlow>
                </div>
                {menu && <ContextMenu onClick={onPaneClick} {...menu} />}

                <PropertyPanel
                    nodes={nodes}
                    selectedNodes={selectedNodes}
                    selectedEdges={selectedEdges}
                    setNodes={setNodes}
                    setEdges={setEdges}
                    onChangePage={onChangePage}
                />

                <PagesPanel onChangePage={onChangePage} />

            </ReactFlowProvider>
            <ReferenceModal
                nodes={nodes}
                setNodes={setNodes}
                onSave={onSave}
            />
        </div>
    );
};

export default DnDFlow;
