import React, { useRef, useState } from 'react';

import Dropdown from '../dropdown';
import TextInput from "../../common/input";

import { useTextStore } from './store'

import style from './DndStyles.module.scss'

const fontTypes = [
    {
        label: 'Arial',
        type: 'Arial'
    },
    {
        label: 'Sans serif',
        type: 'sans-serif'
    },
    {
        label: 'Poppins',
        type: 'Poppins'
    },
    {
        label: 'Times New Roman',
        type: 'Times New Roman'
    },
]

const markerTypes = [
    { label: 'None', icon: '' },
    {
        label: 'Send',
        icon: 'icon-email'
    },
    {
        label: 'Recieve',
        icon: 'icon-email-circle-solid'
    },
    {
        label: 'Time',
        icon: 'icon-hourly'

    },
    {
        label: 'Share',
        icon: 'icon-p2p'
    },
]

export default ({ onSave }) => {
    const textdata = useTextStore((state) => state.textdata);
    const selectedNodeId = useTextStore((state) => state.selectedNodeId);
    const onTextChange = useTextStore((state) => state.onTextChange);

    const fonstSize = textdata.find(item => item.id === selectedNodeId)?.fonstSize?.[0] || 8
    const setFonstSize = (value) => onTextChange(selectedNodeId, { fonstSize: value })

    const backgroundColor = textdata.find(item => item.id === selectedNodeId)?.backgroundColor?.[0] || '#ffffff'
    const setBackgroundColor = (value) => onTextChange(selectedNodeId, { backgroundColor: value })

    const borderColor = textdata.find(item => item.id === selectedNodeId)?.borderColor?.[0] || 'black'
    const setBorderColor = (value) => onTextChange(selectedNodeId, { borderColor: value })

    const textType = textdata.find(item => item.id === selectedNodeId)?.textType?.[0] || { label: 'Poppins', type: 'Poppins' }
    const settextType = (value) => onTextChange(selectedNodeId, { textType: value })

    const textColor = textdata.find(item => item.id === selectedNodeId)?.textColor?.[0] || 'black'
    const setTextColor = (value) => onTextChange(selectedNodeId, { textColor: value })

    const textBold = textdata.find(item => item.id === selectedNodeId)?.textBold?.[0] || false
    const setBold = (value) => onTextChange(selectedNodeId, { textBold: value })

    const markerType = textdata.find(item => item.id === selectedNodeId)?.markerType?.[0]
    const setMarkerType = (value) => onTextChange(selectedNodeId, { markerType: value })

    const textColorPickerRef = useRef()
    const borderColorPickerRef = useRef()

    const onFontSizeChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) < 33) {
            setFonstSize(number)
        }
    }

    const increseFontSize = () => {
        const newSize = Number(fonstSize) + 1

        if (newSize < 33)
            setFonstSize(newSize.toString())
    }

    const decreseFontSize = () => {
        const newSize = Number(fonstSize) - 1

        if (newSize > 1)
            setFonstSize(newSize.toString())
    }

    const onChangeBackgroundColor = (e) => {
        e.preventDefault();
        setBackgroundColor(e.target.value)
    }

    const onChangeBorderColor = (e) => {
        e.preventDefault();
        setBorderColor(e.target.value)
    }

    const onChangeTextType = (e) => {
        e.preventDefault();
        settextType(JSON.parse(e.target.value));
    }

    const onChangeMarker = (e) => {
        e.preventDefault();
        setMarkerType(JSON.parse(e.target.value));
    }

    const onChangeTextColor = (e) => {
        e.preventDefault();
        setTextColor(e.target.value)
    }

    const onChangeTextBold = () => setBold(!textBold)

    return (
        <div className={style.toolBarContainer}>
            <div className='m-t-10'>
                <Dropdown
                    values={fontTypes}
                    onChange={onChangeTextType}
                    dataName='label'
                    selected={JSON.stringify(textType)}
                />
            </div>
            <div className={style.fontSizeContainer + ' m-t-10'}>
                <div
                    className='hover-hand m-r-10 m-t-10 bold'
                    onClick={decreseFontSize}>-</div>
                <TextInput value={fonstSize} onChange={onFontSizeChange} />
                <div className={style.sizeInputEndText}>pt</div>
                <div
                    className='hover-hand m-l-10 m-t-10 bold'
                    onClick={increseFontSize}
                >+</div>
            </div>

            <div className={style.fontBoldContainer} style={{ backgroundColor: textBold ? '#D3D3D3' : '' }} onClick={onChangeTextBold}>B</div>

            <div className={style.colorPickerContainer}>
                <div onClick={() => textColorPickerRef.current.click()} className='bold m-t-5' style={{ color: textColor }}>A</div>
                <div className={style.fontColorFooter} style={{ backgroundColor: textColor }} />
                <input type='color' value={textColor} onChange={onChangeTextColor} ref={textColorPickerRef} className={style.colorPickerInput} />
            </div>

            <div className={style.colorPickerContainer} >
                <input type='color' value={backgroundColor} className={style.colorPickerBody} onChange={onChangeBackgroundColor} />
            </div>

            <div className={style.colorPickerContainer} onClick={() => borderColorPickerRef.current.click()} >
                <div className={style.borderColorPickerBody} style={{ backgroundColor: borderColor }} />
                <input type='color' value={borderColor} className={style.colorPickerInput} onChange={onChangeBorderColor} ref={borderColorPickerRef} />
            </div>

            <div className={style.activityContainer}>
                Activity
                <div className='m-t-10 m-l-5'>
                    <Dropdown
                        values={markerTypes}
                        onChange={onChangeMarker}
                        dataName='label'
                        selected={JSON.stringify(markerType)}
                    />
                </div>
            </div>
            <i className={style.toolBarIcon + ' icon-archive'} onClick={onSave} />
        </div>
    );
};
