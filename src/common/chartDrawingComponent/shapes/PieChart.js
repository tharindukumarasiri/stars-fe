import React, { memo, useEffect, useRef, useState } from 'react';
import { useUpdateNodeInternals, NodeResizer } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { PieChart, Pie, Cell } from 'recharts';

import { useNodeDataStore } from '../store'
import Shapes from '../ShapesData.js';

import style from '../DndStyles.module.scss'
import ConnectionDot from '../customElements/ConnectionDot';
import DeleteBtn from '../customElements/DeleteBtn';

const resizerHandleStyle = { width: 6, height: 6, zIndex: 15 }
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;


function PieChartComponent({ id, selected, type, data }) {
    const [apiData, setApiData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://dummyjson.com/c/3ac4-4c8d-4ff6-8e97")
            const result = await response.json()
            setApiData(result.data)
        }

        fetchData()
    }, [])

    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();

    const shapeData = Shapes[type]
    const initialHeight = shapeData?.size?.height ?? 50;
    const initialWidth = shapeData?.size?.width ?? 50;

    const {
        size: sizes,
        setSize: onSizeCahnge,
        textdata: textDataState,
        onTextChange,
    } = useNodeDataStore()

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const textdata = textDataState?.find(item => item.id === id);

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange(id, { rotate: value })

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
    }

    useEffect(() => {
        if (sizes.find(item => item.id === id)) return;

        if (data?.size) {
            setSize(data?.size)
        } else {
            setSize({ height: initialHeight, width: initialWidth })
        }
    }, []);

    useEffect(() => {
        if (!rotateControlRef.current) {
            return;
        }

        const selection = select(rotateControlRef.current);
        const dragHandler = drag().on('drag', (evt) => {
            const dx = evt.x - 100;
            const dy = evt.y - 100;
            const rad = Math.atan2(dx, dy);
            const deg = rad * (180 / Math.PI);
            setRotate(180 - deg);
            updateNodeInternals(id);
        });

        selection.call(dragHandler);
    }, [id, updateNodeInternals]);

    const onResize = (_, size) => setSize(size);

    return (
        <div style={mainContainerStyle} className={style.customNodeContainer}>
            <NodeResizer
                isVisible={selected}
                minWidth={initialWidth * 0.5}
                minHeight={initialHeight * 0.5}
                onResize={onResize}
                handleStyle={resizerHandleStyle}
            />
            <div
                ref={rotateControlRef}
                style={{
                    display: selected ? 'block' : 'none',
                }}
                className={`nodrag ${style.textBtnRotate} icon-rotate1`}
            />

            {selected &&
                <DeleteBtn nodeId={id} />
            }

            <ConnectionDot selected={selected} />

            {apiData?.length > 0 ?
                <PieChart width={200} height={200} >
                    <Pie
                        data={apiData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {apiData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart> : <div>Loading...</div>

            }

        </div>
    );
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default memo(PieChartComponent);