import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useUpdateNodeInternals, NodeResizer, useStore } from 'reactflow';
import { Tooltip, Input } from "antd";
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { PaperClipOutlined } from '@ant-design/icons';

import { useNodeDataStore } from '../store'
import Shapes from '../ShapesData.js';
import { getRgbaColor } from '../utils';
import DeleteBtn from '../customElements/DeleteBtn'

import style from '../DndStyles.module.scss'
import ConnectionDot from '../customElements/ConnectionDot';
import { ReferenceTypes } from "../../../utils/constants";

const { TextArea } = Input;

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const resizerHandleStyle = { width: 6, height: 6 }

function CustomNode({ id, selected, type, data }) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();

    const [disableInput, setDisableInput] = useState(false)

    const shapeData = Shapes[type]
    const initialHeight = shapeData?.size?.height ?? 50;
    const initialWidth = shapeData?.size?.width ?? 50;
    const isTable = type === 'Table';

    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;

    const handleContainerStyle = (!((selected || isTarget) && !isTable) || data?.hideHandle) ? style.handleHidden : '';

    const sizes = useNodeDataStore((state) => state?.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const setSelectedNodeId = useNodeDataStore((state) => state.setSelectedNodeId);

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange(id, { rotate: value })

    const fonstSize = Number(textdata?.fonstSize) || 8
    const backgroundColor = getRgbaColor(textdata?.backgroundColor) || '#ffffff'
    const borderColor = getRgbaColor(textdata?.borderColor) || 'black'
    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const textColor = getRgbaColor(textdata?.textColor) || 'black'
    const textBold = textdata?.textBold || false
    const markerType = textdata?.markerType || { label: '', icon: '' }

    const textAreaStyle = {
        fontFamily: textType.type,
        fontSize: fonstSize,
        color: textColor,
        fontWeight: textBold ? 'bolder' : 'normal',
    }

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: shapeData?.hideShape ? backgroundColor : '',
        borderColor: shapeData?.hideShape ? borderColor : '',
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
        if (selected)
            setSelectedNodeId(id);
    }, [selected]);

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

    const CustomShape = ({ fill }) => {
        return (
            <svg viewBox={shapeData.viewBox}
                fill={fill}
                stroke={borderColor}
                width={size?.width}
                height={size?.height}
                preserveAspectRatio="none"  >
                {Shapes[type].image}
            </svg >
        )
    }

    const onChange = useCallback((evt) => {
        if (!disableInput) {
            onTextChange(id, { value: evt.target.value });
        }
    }, [disableInput]);

    const onKeyDown = (e) => {
        if (e.key === " " && e.repeat) {
            setDisableInput(true);
        } else if (disableInput) {
            setDisableInput(false);
        }
    }

    const getReferanceIcon = () => {
        const workInstruction = data?.reference.some(ref => ref.type === ReferenceTypes.workInstructions)
        const softwareSystem = data?.reference.some(ref => ref.type === ReferenceTypes.softwareSystems)
        const agreements = data?.reference.some(ref => ref.type === ReferenceTypes.agreements)
        const contactPersons = data?.reference.some(ref => ref.type === ReferenceTypes.contactPersons)
        const companies = data?.reference.some(ref => ref.type === ReferenceTypes.companies)

        const getIcon = (isVisible, icon, tooltip) => {
            if (isVisible) {
                return (
                    <Tooltip title={tooltip}>
                        <i className={icon} />
                    </Tooltip>
                )
            } else return null
        }

        return (
            <div className={style.activityIcon} style={{ bottom: size?.height / 50, right: size?.height / 50 }} >
                {getIcon(workInstruction, 'icon-work-instructions-1', 'Work Instructions')}
                {getIcon(softwareSystem, 'icon-systems-1', 'Software Systems')}
                {getIcon(agreements, 'icon-agreements-1', 'Agreements')}
                {getIcon(contactPersons, 'icon-contact-persons-1', 'Contact Persons')}
                {getIcon(companies, 'icon-companies-1', 'Companies')}
            </div>
        )
    }

    const onResize = (_, size) => setSize(size);

    const addVerticalLine = () => {
        data.addTableLine('VerticalLine', id, { height: size?.height }, { x: 20, y: 0 })
    }

    const addHorizontalLine = () => {
        data.addTableLine('HorizontalLine', id, { width: size?.width }, { x: 0, y: 20 })
    }

    return (
        <div style={mainContainerStyle}
            className={isTable ? style.tableContainer : style.customNodeContainer}
        >
            <NodeResizer
                isVisible={selected}
                minWidth={initialWidth * 0.5}
                minHeight={initialHeight * 0.5}
                onResize={onResize}
                keepAspectRatio={shapeData?.keepAspectRatio ?? true}
                handleStyle={resizerHandleStyle}
            />

            <i ref={rotateControlRef}
                style={{
                    display: selected ? 'block' : 'none',
                }}
                className={`nodrag ${style.textBtnRotate} icon-rotate1`}
            />


            {markerType?.icon &&
                <i className={markerType.icon + ' ' + style.activityIcon} style={{ top: size?.height / 50, left: size?.height / 50 }} />
            }
            {data?.links?.length > 0 &&
                <div className={style.activityIcon} style={{ top: size?.height / 50, right: size?.height / 50 }}>
                    <PaperClipOutlined />
                </div>
            }

            {data?.reference?.length > 0 ?
                getReferanceIcon() : null
            }

            {selected &&
                <DeleteBtn nodeId={id} />
            }

            {selected && isTable &&
                <button className={style.tableBtnHorizontal} onClick={addVerticalLine} >Vertical line</button>
            }
            {selected && isTable &&
                <button className={style.tableBtnVertical} onClick={addHorizontalLine} >Horizontal line</button>
            }

            {!shapeData?.hideShape &&
                <CustomShape fill={backgroundColor} />
            }

            <div className={handleContainerStyle}>
                <ConnectionDot isConnecting={isConnecting} isTarget={isTarget} />
            </div>
            {!shapeData?.hideTextInput ?
                <TextArea
                    autoSize
                    style={textAreaStyle}
                    placeholder={type}
                    className={style.drawingTextArea}
                    value={textdata?.value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                : null
            }
        </div>
    );
}

export default memo(CustomNode);