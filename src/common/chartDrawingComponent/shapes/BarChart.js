import React, { memo, useEffect, useRef, useState } from "react";
import { useUpdateNodeInternals, NodeResizer } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import { useNodeDataStore } from "../store";
import Shapes from "../ShapesData.js";

import style from "../DndStyles.module.scss";
import ConnectionDot from "../customElements/ConnectionDot";
import DeleteBtn from "../customElements/DeleteBtn";


const resizerHandleStyle = { width: 6, height: 6, zIndex: 15 }
const RADIAN = Math.PI / 180;

function BarChartComponent({ id, selected, type, data }) {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "https://dummyjson.com/c/38c7-7bed-4aa6-95e6"
            );
            const result = await response.json();
            setApiData(result.data);
        };

        fetchData();
    }, []);

    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();

    const shapeData = Shapes[type];
    const initialHeight = shapeData?.size?.height ?? 50;
    const initialWidth = shapeData?.size?.width ?? 50;

    const {
        size: sizes,
        setSize: onSizeCahnge,
        textdata: textDataState,
        onTextChange,
    } = useNodeDataStore();

    const size = sizes.find((item) => item.id === id) || {
        height: initialHeight,
        width: initialWidth,
    };
    const setSize = (value) => onSizeCahnge(id, value);

    const textdata = textDataState?.find(
        (item) => item.id === id
    );

    const rotate = textdata?.rotate || "0";
    const setRotate = (value) => onTextChange(id, { rotate: value });

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
    };

    useEffect(() => {
        if (sizes.find((item) => item.id === id)) return;

        if (data?.size) {
            setSize(data?.size);
        } else {
            setSize({ height: initialHeight, width: initialWidth });
        }
    }, []);

    useEffect(() => {
        if (!rotateControlRef.current) {
            return;
        }

        const selection = select(rotateControlRef.current);
        const dragHandler = drag().on("drag", (evt) => {
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
                    display: selected ? "block" : "none",
                }}
                className={`nodrag ${style.textBtnRotate} icon-rotate1`}
            />

            {selected && <DeleteBtn nodeId={id} />}

            <ConnectionDot selected={selected} width={size?.width} height={size?.height} />

            {apiData?.length > 0 ? (
                <BarChart
                    width={500}
                    height={300}
                    data={apiData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default memo(BarChartComponent);
