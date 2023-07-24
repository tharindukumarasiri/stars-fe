import React, { useRef, useState } from 'react';

import Dropdown from '../dropdown';
import TextInput from "../../common/input";

import { useTextStore } from './store'

import style from './DndStyles.module.scss'
// 'Poppins', sans-serif
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

export default ({ }) => {
    const textdata = useTextStore((state) => state.textdata);
    const selectedNodeId = useTextStore((state) => state.selectedNodeId);
    const onTextChange = useTextStore((state) => state.onTextChange);

    const fonstSize = textdata.find(item => item.id === selectedNodeId)?.fonstSize?.[0] || 8
    const setFonstSize = (value) => onTextChange(selectedNodeId, { fonstSize: value })

    const backgroundColor = textdata.find(item => item.id === selectedNodeId)?.backgroundColor?.[0] || ''
    const setBackgroundColor = (value) => onTextChange(selectedNodeId, { backgroundColor: value })

    const textType = textdata.find(item => item.id === selectedNodeId)?.textType?.[0] || { label: 'Poppins', type: 'Poppins' }
    const settextType = (value) => onTextChange(selectedNodeId, { textType: value })

    const textColor = textdata.find(item => item.id === selectedNodeId)?.textColor?.[0] || 'black'
    const setTextColor = (value) => onTextChange(selectedNodeId, { textColor: value })

    const textBold = textdata.find(item => item.id === selectedNodeId)?.textBold?.[0] || false
    const setBold = (value) => onTextChange(selectedNodeId, { textBold: value })

    const textColorPickerRed = useRef()

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

    const onChangeTextType = (e) => {
        e.preventDefault();
        settextType(JSON.parse(e.target.value));
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
                <div onClick={() => textColorPickerRed.current.click()} className='bold m-t-5' style={{ color: textColor }}>A</div>
                <div className={style.fontColorFooter} style={{ backgroundColor: textColor }} />
                <input type='color' value={textColor} onChange={onChangeTextColor} ref={textColorPickerRed} style={{ visibility: 'hidden' }} />
            </div>

            <div className={style.colorPickerContainer} >
                <input type='color' value={backgroundColor} className={style.colorPickerBody} onChange={onChangeBackgroundColor} />
            </div>



        </div>
    );
};
