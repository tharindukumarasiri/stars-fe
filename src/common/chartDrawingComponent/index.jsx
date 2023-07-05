import React, { useState, useRef, useCallback } from 'react';
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

import Rectangle from './shapes/Rectangle.js';
import Circle from './shapes/Circle.js';
import Square from './shapes/Square.js';

import FloatingEdge from './customElements/FloatingEdge';
import CustomConnectionLine from './customElements/CustomConnectionLine';
import Sidebar from './Sidebar';

import { useDiagramStore } from '../../Views/ChartDrawing/chartDrawingStore'

import style from './DndStyles.module.scss'

const nodeTypes = {
    Rectangle,
    Circle,
    Square,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeCommonStyles = { background: 'rgba(223, 212, 212, 0.573)', display: 'flex', justifyContent: 'center', alignItems: 'center' }
const arrowColor = '#8f8f8f'

const connectionLineStyle = {
    strokeWidth: 3,
    stroke: arrowColor,
};

const edgeTypes = {
    floating: FloatingEdge,
};

const defaultEdgeOptions = {
    style: { strokeWidth: 3, stroke: arrowColor },
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: arrowColor,
    },
};

const DnDFlow = ({ props }) => {
    const reactFlowWrapper = useRef(null);
    const saveDiagram = useDiagramStore((state) => state.saveDiagram);

    const [nodes, setNodes, onNodesChange] = useNodesState(props?.data?.nodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(props?.data?.edges || []);

    const [inputs, setInputs] = useState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [diagramName, setDiagramName] = useState(props?.name);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
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
                id: getId(),
                type: type,
                position,
                data: { label: `${type} node` },
            };

            if (type === 'Rectangle' || type === 'Square')
                newNode.style = { border: '1px solid black', borderRadius: 5 }
            if (type === 'Circle')
                newNode.style = { border: '1px solid black', borderRadius: '50%', height: 60, width: 60 }

            newNode.style = { ...newNode.style, ...nodeCommonStyles }

            setNodes((nds) => nds.concat(newNode));
        }, [reactFlowInstance]
    );

    const onNameChange = (e) => {
        e.preventDefault();
        setDiagramName(e.target.value)
    }

    const onSave = () => {
        saveDiagram({ nodes: nodes, edges: edges, inputs: inputs }, diagramName);
        message.success('Diagram Saved')
    }

    return (
        <div className={style.dndflow}>
            <ReactFlowProvider>
                <Sidebar diagramName={diagramName} onNameChange={onNameChange} onSave={onSave} />
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
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
