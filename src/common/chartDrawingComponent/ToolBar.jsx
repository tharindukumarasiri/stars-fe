import React, { useState } from 'react';
import { useOnSelectionChange } from 'reactflow';

import Dropdown from '../dropdown';
import TextInput from "../../common/input";
import ColorPicker from '../../common/colorPicker';
import { getRgbaColor } from './utils';

import { useNodeDataStore } from './store'

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

const colorPickerTypes = {
    TEXT: 'TEXT',
    BACKGROUND: 'BACKGROUND',
    LINE: 'LINE',
}

let selectedNodes = [];

export default ({ onSave, pasteNodes }) => {
    const [colorPickerVisible, setColorPickerVisible] = useState('')

    const selectedNodeId = useNodeDataStore((state) => state.selectedNodeId);
    const setCopiedNodes = useNodeDataStore((state) => state.setCopiedNodes);
    const textdata = useNodeDataStore((state) => state.textdata).find(item => item.id === selectedNodeId);
    const changeTextData = useNodeDataStore((state) => state.onTextChange);
    const onTextChange = (value) => changeTextData(selectedNodeId, value)

    const fonstSize = textdata?.fonstSize || 8
    const setFonstSize = (value) => onTextChange({ fonstSize: value })

    const backgroundColor = textdata?.backgroundColor || '#ffffff'
    const setBackgroundColor = (value) => onTextChange({ backgroundColor: value })

    const borderColor = textdata?.borderColor || 'black'
    const setBorderColor = (value) => onTextChange({ borderColor: value })

    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const settextType = (value) => onTextChange({ textType: value })

    const textColor = textdata?.textColor || 'black'
    const setTextColor = (value) => onTextChange({ textColor: value })

    const textBold = textdata?.textBold || false
    const setBold = (value) => onTextChange({ textBold: value })

    const markerType = textdata?.markerType
    const setMarkerType = (value) => onTextChange({ markerType: value })

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => selectedNodes = nodes,
    });

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

    const onChangeBackgroundColor = (color) => setBackgroundColor(color?.rgb)

    const onChangeBorderColor = (color) => setBorderColor(color?.rgb)

    const onChangeTextType = (e) => {
        e.preventDefault();
        settextType(JSON.parse(e.target.value));
    }

    const onChangeMarker = (e) => {
        e.preventDefault();
        setMarkerType(JSON.parse(e.target.value));
    }

    const onCopy = () => {
        setCopiedNodes(selectedNodes)
    }

    const onChangeTextColor = (color) => setTextColor(color?.rgb)

    const onMouseLeave = () => setColorPickerVisible('')

    const showColorPicker = (picker) => setColorPickerVisible(picker)

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

            <div className={style.colorPickerContainer} onClick={() => showColorPicker(colorPickerTypes.TEXT)}>
                <div className='bold' style={{ color: getRgbaColor(textColor) }}>A</div>
                <div className={style.fontColorFooter} style={{ backgroundColor: getRgbaColor(textColor) }} />
                {colorPickerVisible === colorPickerTypes.TEXT ?
                    <div className={style.sketchPickerContainer}>
                        <ColorPicker
                            color={textColor}
                            onChange={onChangeTextColor}
                            onMouseLeave={onMouseLeave}
                        />
                    </div> : null
                }
            </div>


            <div className={style.colorPickerContainer} onClick={() => showColorPicker(colorPickerTypes.BACKGROUND)}>
                <i className={style.toolBarIcon + ' icon-paint-bucket'} />
                <div className={style.colorIconFooter} style={{ backgroundColor: getRgbaColor(backgroundColor) }} />
                {colorPickerVisible === colorPickerTypes.BACKGROUND ?
                    <div className={style.sketchPickerContainer}>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={onChangeBackgroundColor}
                            onMouseLeave={onMouseLeave}
                        />
                    </div> : null
                }
            </div>

            <div className={style.colorPickerContainer} onClick={() => showColorPicker(colorPickerTypes.LINE)}>
                <i className={style.toolBarIcon + ' icon-paint-line'} />
                <div className={style.colorIconFooter} style={{ backgroundColor: getRgbaColor(borderColor) }} />
                {colorPickerVisible === colorPickerTypes.LINE ?
                    <div className={style.sketchPickerContainer}>
                        <ColorPicker
                            color={borderColor}
                            onChange={onChangeBorderColor}
                            onMouseLeave={onMouseLeave}
                        />
                    </div> : null
                }
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
            <div className={style.copyPasteContainer} onClick={onCopy} >Copy</div>
            <div className={style.copyPasteContainer} onClick={pasteNodes}>Paste</div>
            <i className={style.toolBarIcon + ' icon-save1'} onClick={onSave} />
        </div>
    );
};
