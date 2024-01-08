import React, { useMemo, useState, useRef } from 'react';
import { Modal, Tooltip } from 'antd';
import { useReactFlow, getRectOfNodes, getTransformForBounds, useOnSelectionChange, MarkerType } from 'reactflow';
import { DownloadOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { toPng, toJpeg } from 'html-to-image';

import Dropdown from '../dropdown';
import CustomDropdown from '../customDropdown';
import TextInput from "../../common/input";
import ColorPicker from '../../common/colorPicker';
import {
    getRgbaColor,
    downloadImage,
    downloadJson,
    fontTypes,
    markerTypes,
    arrowStartTypes,
    arrowEndTypes,
    colorPickerTypes,
    arrowColor,
    downloadTypes
} from './utils';

import { useNodeDataStore } from './store'

import style from './DndStyles.module.scss'

let selectedNodes = [];
let selectedEdges = []

const imageWidth = 1024;
const imageHeight = 768;

export default ({ onSave, pasteNodes, clearSelectedNodes, getAllData, edges, setEdges, setNodes }) => {
    const [colorPickerVisible, setColorPickerVisible] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDownloadType, setSelectedDownloadType] = useState(downloadTypes[0])

    const { getNodes } = useReactFlow();

    const selectedNodeId = useNodeDataStore((state) => state.selectedNodeId);
    const setCopiedNodes = useNodeDataStore((state) => state.setCopiedNodes);
    const textdata = useNodeDataStore((state) => state.textdata).find(item => item.id === selectedNodeId);
    const changeTextData = useNodeDataStore((state) => state.onTextChange);
    const setUploadedData = useNodeDataStore((state) => state.setUploadedData);
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

    const UPLOAD_BTN_REF = useRef(null);

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            selectedNodes = nodes
            if (edges?.length > 0)
                selectedEdges = edges
        },
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

    const toggleModal = () => setModalVisible(pre => !pre);

    const onChangeDownloadType = (e) => {
        e.preventDefault();
        setSelectedDownloadType(JSON.parse(e.target.value));
    }

    const onChangeTextType = (e) => {
        e.preventDefault();
        settextType(JSON.parse(e.target.value));
    }

    const onChangeMarker = (value) => {
        setMarkerType(value);
    }

    const onCopy = () => {
        setCopiedNodes(selectedNodes)
    }

    const onChangeTextColor = (color) => setTextColor(color?.rgb)

    const onMouseLeave = () => setColorPickerVisible('')

    const showColorPicker = (picker) => setColorPickerVisible(picker)

    const onChangeTextBold = () => setBold(!textBold)

    const onExport = () => {
        clearSelectedNodes();

        // we calculate a transform for the nodes so that all nodes are visible
        // we then overwrite the transform of the `.react-flow__viewport` element
        // with the style option of the html-to-image library
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0, 5);

        switch (selectedDownloadType.type) {
            case 'PNG':
                toPng(document.querySelector('.react-flow__viewport'), {
                    backgroundColor: 'white',
                    width: imageWidth,
                    height: imageHeight,
                    style: {
                        width: imageWidth,
                        height: imageHeight,
                        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
                    },
                }).then((datUrl) => downloadImage(datUrl, 'png'));
                break;
            case 'JPG':
                toJpeg(document.querySelector('.react-flow__viewport'), {
                    backgroundColor: 'white',
                    width: imageWidth,
                    height: imageHeight,
                    style: {
                        width: imageWidth,
                        height: imageHeight,
                        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
                    },
                }).then((datUrl) => downloadImage(datUrl, 'jpeg'));
                break;
            case 'JSON':
                downloadJson(getAllData());
                break;
            default:
                break;
        }

        toggleModal()
    }

    const onChangeEdgeStart = (value) => {
        setEdges((edges) =>
            edges.map((e) => {
                const isSelected = selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id);

                if (isSelected) {
                    const newEdge = { ...e }

                    switch (value?.markerId) {
                        case 'arrow':
                            newEdge.markerStart = {
                                type: MarkerType.Arrow,
                                color: arrowColor,
                            };
                            break;
                        case 'arrowclosed':
                            newEdge.markerStart = {
                                type: MarkerType.ArrowClosed,
                                color: arrowColor,
                            };
                            break;
                        default:
                            newEdge.markerStart = value?.markerId;
                            break;
                    }
                    return newEdge;
                } else return e
            })
        );
    }

    const onChangeEdgeEnd = (value) => {
        setEdges((edges) =>
            edges.map((e) => {
                const isSelected = selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id);

                if (isSelected) {
                    const newEdge = { ...e }

                    switch (value?.markerId) {
                        case 'arrow':
                            newEdge.markerEnd = {
                                type: MarkerType.Arrow,
                                color: arrowColor,
                            };
                            break;
                        case 'arrowclosed':
                            newEdge.markerEnd = {
                                type: MarkerType.ArrowClosed,
                                color: arrowColor,
                            };
                            break;
                        default:
                            newEdge.markerEnd = value?.markerId;
                            break;
                    }
                    return newEdge;
                } else return e
            })
        );
    }

    const getSelectedEdgeStart = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]
        selectedEdge = edges?.find(edge => edge?.id === selectedEdge?.id)

        if (typeof selectedEdge?.markerStart == 'object') {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerStart?.type)
        } else {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerStart)
        }
    }, [edges, selectedEdges])

    const getSelectedEdgeEnd = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]
        selectedEdge = edges?.find(edge => edge?.id === selectedEdge?.id)

        if (typeof selectedEdge?.markerEnd == 'object') {
            return arrowEndTypes?.find(type => type?.markerId === selectedEdge?.markerEnd?.type)
        } else {
            return arrowEndTypes?.find(type => type?.markerId === selectedEdge?.markerEnd)
        }
    }, [edges, selectedEdges])

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsText(file)
        })
    }

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {

            const file = e.target.files[0]
            let fileDataUrl = await readFile(file)

            try {
                const uploadedJson = JSON.parse(fileDataUrl)

                setNodes(uploadedJson?.nodes || []);
                setEdges(uploadedJson?.edges || []);
                setUploadedData(uploadedJson?.nodeSizes, uploadedJson?.nodesData, uploadedJson?.chartData)

            } catch (e) {
                console.log("unsuported format")
            }
        }
    }

    const handleFileUpload = () => UPLOAD_BTN_REF.current.click();

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

            <div className={style.toolBarSeparator} />

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

            <div className={style.toolBarSeparator} />

            <div className={style.activityContainer}>
                <div className='m-t-10 m-l-5'>
                    <CustomDropdown
                        values={arrowStartTypes}
                        onChange={onChangeEdgeStart}
                        dataName='label'
                        iconName='icon'
                        selected={getSelectedEdgeStart}
                        hideHintText
                    />
                </div>
                <div className='m-t-10 m-l-5'>
                    <CustomDropdown
                        values={arrowEndTypes}
                        onChange={onChangeEdgeEnd}
                        dataName='label'
                        iconName='icon'
                        selected={getSelectedEdgeEnd}
                        hideHintText
                    />
                </div>
            </div>

            <div className={style.toolBarSeparator} />

            <div className={style.activityContainer}>
                <div className='m-t-10 m-l-5'>
                    <CustomDropdown
                        values={markerTypes}
                        onChange={onChangeMarker}
                        dataName='label'
                        iconName='icon'
                        selected={markerType}
                        placeholder='Activity'
                        hideHintText
                    />
                </div>
            </div>

            <div className={style.toolBarSeparator} />

            <div className={style.copyPasteContainer} onClick={onCopy} >Copy</div>
            <div className={style.copyPasteContainer} onClick={pasteNodes}>Paste</div>

            <div className={style.toolBarSeparator} />

            <Tooltip title='Save changes' className='m-l-10'>
                <SaveOutlined className={style.toolBarIcon} onClick={onSave} />
            </Tooltip>
            <Tooltip title='Download' className='m-l-10'>
                <DownloadOutlined className={style.toolBarIcon} onClick={toggleModal} />
            </Tooltip>
            <Tooltip title='Upload' className='m-l-10'>
                <UploadOutlined className={style.toolBarIcon} onClick={handleFileUpload} />
            </Tooltip>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={UPLOAD_BTN_REF}
                onChange={onFileChange}
            />

            <Modal
                title='Export'
                visible={modalVisible}
                onOk={onExport}
                onCancel={toggleModal}
                okText='Export'
                width='30vw'
                centered={true}
                closeIcon={< i className='icon-close close-icon' />}>
                <div className="g-row">
                    <div>Export to SVG/ PNG/ JPG/ JSON</div>
                    <Dropdown
                        values={downloadTypes}
                        onChange={onChangeDownloadType}
                        dataName='label'
                        selected={JSON.stringify(selectedDownloadType)}
                    />
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    );
};
