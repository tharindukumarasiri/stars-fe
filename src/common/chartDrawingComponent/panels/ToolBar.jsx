import React, { useState, useRef, useMemo } from 'react';
import { Modal, Tooltip, message } from 'antd';
import {
    useReactFlow,
    getRectOfNodes,
    getTransformForBounds,
    useOnSelectionChange,
    useStore,
    MarkerType
} from 'reactflow';
import {
    DownloadOutlined,
    SaveOutlined,
    UploadOutlined,
    UndoOutlined,
    RedoOutlined,
    FullscreenOutlined,
    LockOutlined,
    UnlockOutlined,
    PlusOutlined,
    MinusOutlined,
    CopyOutlined,
    SnippetsOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ExpandAltOutlined,
} from '@ant-design/icons';
import { toPng, toJpeg } from 'html-to-image';

import ColorPicker from '../../colorPicker';
import Dropdown from '../../dropdown';
import {
    downloadImage,
    downloadJson,
    downloadTypes,
    readFile,
    fontTypes,
    fontSizes,
    getRgbaColor,
    formatOldNodesData,
    colorPickerTypes,
    arrowColor,
    connectorTypes,
    arrowStartTypes,
    textAlignTypes
} from '../utils';
import { useNodeDataStore } from '../store'
import CustomDropdown from '../../customDropdown';

import { ReactComponent as AlignLeft } from '../../../assets/images/align-icons/align-left.svg'
import { ReactComponent as AlignRight } from '../../../assets/images/align-icons/align-right.svg'
import { ReactComponent as AlignTop } from '../../../assets/images/align-icons/align-top.svg'
import { ReactComponent as AlignBottom } from '../../../assets/images/align-icons/align-bottom.svg'
import { ReactComponent as AlignCenter } from '../../../assets/images/align-icons/align-center.svg'
import { ReactComponent as AlignMiddle } from '../../../assets/images/align-icons/align-middle.svg'
import style from '../DndStyles.module.scss'

const lineTypes = {
    HORIZONTAL: 'HorizontalLine',
    VERTICAL: 'VerticalLine'
}
const imageWidth = 1024;
const imageHeight = 768;
const connectorWidths = Array.from({ length: 10 }, (_, i) => i + 1);

const zoomSelector = (s) => Math.trunc(s.transform[2] * 50)

export default ({
    onSave,
    pasteNodes,
    clearSelectedNodes,
    getAllData,
    setEdges,
    setNodes,
    spacebarActive,
    setSpacebarActive,
    selectedEdges,
    selectedNodes,
    undo, redo, canUndo, canRedo,
    setOpenPanels,
}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDownloadType, setSelectedDownloadType] = useState(downloadTypes[0])
    const [colorPickerVisible, setColorPickerVisible] = useState('')

    const { getNodes, fitView, zoomIn, zoomOut } = useReactFlow();
    const zoomValue = useStore(zoomSelector);

    const {
        setCopiedNodes,
        setUploadedData,
        onTextChange: changeTextData,
        textdata: textdataState,
        size: sizes,
        setSize: onSizeCahnge
    } = useNodeDataStore()

    const UPLOAD_BTN_REF = useRef(null);

    const selectedNodeId = selectedNodes?.[0]?.id;
    const textdata = textdataState.find(item => item.id === selectedNodeId);

    const size = sizes?.find(item => item.id === selectedNodeId) || { height: 0, width: 0 };
    const setSize = (value) => {
        selectedNodes?.map(node => {
            onSizeCahnge(node?.id, value)
        })
    }

    const onTextChange = (value) => {
        selectedNodes?.map(node => {

            if (node?.type === 'group') {
                const allNodes = getNodes()

                allNodes?.map(item => {
                    if (item?.parentId === node?.id && !item?.selected) {
                        changeTextData(item?.id, value)
                    }
                })
            }
            changeTextData(node?.id, value)
        })
    }

    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const setTextType = (value) => onTextChange({ textType: value })

    const textColor = textdata?.textColor || 'black'
    const setTextColor = (value) => onTextChange({ textColor: value })

    const fontSize = textdata?.fonstSize || 8
    const setFontSize = (value) => onTextChange({ fonstSize: value })

    const textBold = textdata?.textBold || false
    const setBold = (value) => onTextChange({ textBold: value })

    const lineBackgroundColor = textdata?.backgroundColor || '#000000'
    const backgroundColor = textdata?.backgroundColor || '#ffffff'
    const setBackgroundColor = (value) => onTextChange({ backgroundColor: value })

    const borderColor = textdata?.borderColor || 'black'
    const setBorderColor = (value) => onTextChange({ borderColor: value })

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange({ rotate: value })

    const textAlign = textdata?.textAlign || 'center'
    const setTextAlign = (value) => onTextChange({ textAlign: value })

    const strokeWidth = textdata?.strokeWidth || '1'
    const setStrokeWidth = (value) => onTextChange({ strokeWidth: value })

    const handleTransform = () => fitView({ duration: 800 });
    const zoomInCanvas = () => zoomIn({ duration: 500 });
    const zoomOutCanvas = () => zoomOut({ duration: 500 });

    const handleFileUpload = () => UPLOAD_BTN_REF.current.click();
    const toggleInteractivity = () => setSpacebarActive(pre => !pre)

    const onMouseLeave = () => setColorPickerVisible('')
    const showColorPicker = (picker) => setColorPickerVisible(picker)
    const onChangeTextColor = (color) => setTextColor(color?.rgb)
    const onChangeTextBold = () => setBold(!textBold)
    const onChangeBackgroundColor = (color) => setBackgroundColor(color?.rgb)
    const onChangeBorderColor = (color) => setBorderColor(color?.rgb)
    const onChangeStrokeWidth = (e) => {
        e.preventDefault();
        setStrokeWidth(e.target.value)
    }

    const selectedEdgeData = selectedEdges[0]?.data
    const isLineSelected = selectedNodes?.[0]?.type === lineTypes.HORIZONTAL || selectedNodes?.[0]?.type === lineTypes.VERTICAL

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            selectedNodes = nodes
        },
    });

    const onCopy = () => {
        setCopiedNodes(selectedNodes)
    }

    const handleSideBarToggle = () => {
        setOpenPanels(pre => ({ ...pre, sideBar: !pre.sideBar }))
    }

    const handlePropertyPanelToggle = () => {
        setOpenPanels(pre => ({ ...pre, propertyPanel: !pre.propertyPanel }))
    }

    const selectedEdgeType = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]

        const selectedEdgeData = connectorTypes?.find(({ label }) => label === selectedEdge?.data?.algorithm)
        return selectedEdgeData
    }, [selectedEdges])

    const getSelectedEdgeStart = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]

        if (typeof selectedEdge?.markerStart == 'object') {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerStart?.type)
        } else {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerStart)
        }
    }, [selectedEdges])

    const selectedAlignType = useMemo(() => {
        const alignType = textAlignTypes?.find(type => type.alignType === textAlign)
        return alignType || textAlignTypes[0]
    }, [selectedNodeId, textAlign])

    const getSelectedEdgeEnd = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]

        if (typeof selectedEdge?.markerEnd == 'object') {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerEnd?.type)
        } else {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerEnd)
        }
    }, [selectedEdges])

    const handleUndo = () => {
        if (!canUndo) {
            undo()
        }
    }

    const handleRedo = () => {
        if (!canRedo) {
            redo()
        }
    }

    const toggleModal = () => setModalVisible(pre => !pre);

    const onChangeDownloadType = (e) => {
        e.preventDefault();
        setSelectedDownloadType(JSON.parse(e.target.value));
    }

    const onSaveHandler = () => {
        message.warning('Saving drawing...')
        onSave()
    }

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

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {

            const file = e.target.files[0]
            let fileDataUrl = await readFile(file, true)

            try {
                const uploadedJson = JSON.parse(fileDataUrl)[0]

                setNodes(formatOldNodesData(uploadedJson?.nodes));
                setEdges(uploadedJson?.edges || []);
                setUploadedData(uploadedJson?.nodeSizes, uploadedJson?.nodesData, uploadedJson?.chartData, uploadedJson?.layersData)

            } catch (e) {
                console.log("unsuported format")
            }
        }
    }

    const onChangeTextType = (e) => {
        e.preventDefault();
        setTextType(JSON.parse(e.target.value));
    }

    const onChangeEdgeWidth = (e) => {
        e.preventDefault();
        const number = e.target.value

        setEdges((edges) =>
            edges.map((e) => {
                const isSelected = selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id);

                if (isSelected) {
                    const newEdge = { ...e }

                    newEdge.data = {
                        ...newEdge.data,
                        width: number,
                    }

                    return newEdge;
                } else return e
            })
        );
    }

    const onChangeLineWidth = (e) => {
        e.preventDefault();
        if (selectedNodes?.[0]?.type === lineTypes.HORIZONTAL) {
            setSize({ height: Number(e.target.value), width: size?.width })
        } else {
            setSize({ height: size?.height, width: Number(e.target.value) })
        }
    }

    const handleRotate = (e) => {
        e.preventDefault();
        setRotate(e.target.value)
    }

    const handleWidthChange = (e) => {
        e.preventDefault();
        selectedNodes?.map(node => {
            const currentSize = sizes?.find(item => item.id === node?.id) || { height: 0, width: 0 };
            onSizeCahnge(node?.id, { ...currentSize, width: Number(e.target.value) })
        })

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.width = Number(e.target.value)
                    return newNode
                } else return node
            })
        )
    }

    const handleHeightChange = (e) => {
        e.preventDefault();
        selectedNodes?.map(node => {
            const currentSize = sizes?.find(item => item.id === node?.id) || { height: 0, width: 0 };
            onSizeCahnge(node?.id, { ...currentSize, height: Number(e.target.value) })
        })

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.height = Number(e.target.value)
                    return newNode
                } else return node
            })
        )
    }

    const onFontSizeChange = (e) => {
        e.preventDefault();

        setFontSize(e.target.value)
    }

    const alignLeft = () => {
        const minXPosition = Math.min(...selectedNodes.map(item => item.position.x))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.position.x = minXPosition
                    return newNode
                } else return node
            })
        )
    }

    const alignCenter = () => {
        const minXPosition = Math.min(...selectedNodes.map(item => item.position.x))
        const maxXPosition = Math.max(...selectedNodes.map(item => item.position.x))
        const maxWidth = Math.max(...selectedNodes.map(item => item.width))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.position.x = ((minXPosition + maxXPosition) / 2) + (maxWidth / 2) - (newNode.width / 2)
                    return newNode
                } else return node
            })
        )
    }

    const alignRight = () => {
        const maxXPosition = Math.max(...selectedNodes.map(item => item.position.x))
        const maxWidth = Math.max(...selectedNodes.map(item => item.width))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.position.x = maxXPosition + (maxWidth / 2) - node.width
                    return newNode
                } else return node
            })
        )
    }

    const alignTop = () => {
        const maxYPosition = Math.min(...selectedNodes.map(item => item.position.y))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.position.y = maxYPosition
                    return newNode
                } else return node
            })
        )
    }

    const alignMiddle = () => {
        const minYPosition = Math.max(...selectedNodes.map(item => item.position.y))
        const maxYPosition = Math.max(...selectedNodes.map(item => item.position.y))
        const maxHeight = Math.max(...selectedNodes.map(item => item.height))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.position.y = ((minYPosition + maxYPosition) / 2) + (maxHeight / 2) - (newNode.height / 2)
                    return newNode
                } else return node
            })
        )
    }

    const alignBottom = () => {
        const minYPosition = Math.max(...selectedNodes.map(item => item.position.y))
        const maxHeight = Math.max(...selectedNodes.map(item => item.height))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.position.y = minYPosition + (maxHeight / 2) - node.height
                    return newNode
                } else return node
            })
        )
    }

    const resize = (width = true, height = true) => {
        const maxWidth = Math.max(...selectedNodes.map(item => item.width))
        const maxHeight = Math.max(...selectedNodes.map(item => item.height))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))
                    const newSize = {
                        width: newNode.width,
                        height: newNode.height
                    }

                    if (width) {
                        newNode.width = maxWidth
                        newSize.width = maxWidth
                    }
                    if (height) {
                        newNode.height = maxHeight
                        newSize.height = maxHeight
                    }

                    onSizeCahnge(node.id, newSize)
                    return newNode
                } else return node
            })
        )
    }

    const onChangeEdgeColor = (color) => {
        setEdges((edges) =>
            edges.map((e) => {
                const isSelected = selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id);

                if (isSelected) {
                    const newEdge = { ...e }

                    newEdge.data.color = color?.hex
                    if (newEdge?.markerStart) {
                        newEdge.markerStart = {
                            ...newEdge.markerStart,
                            color: color?.hex
                        }
                    }
                    if (newEdge?.markerEnd) {
                        newEdge.markerEnd = {
                            ...newEdge.markerEnd,
                            color: color?.hex
                        }
                    }

                    return newEdge;
                } else return e
            })
        );
    }

    const onChangeEdgeType = (type) => {
        setEdges((edges) =>
            edges.map((e) => {
                const isSelected = selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id);

                if (isSelected) {
                    const newEdge = { ...e }

                    newEdge.data = {
                        ...newEdge.data,
                        algorithm: type?.label,
                    }

                    return newEdge;
                } else return e
            })
        );
    };

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
                                color: newEdge?.data?.color ?? arrowColor,
                            };
                            break;
                        case 'arrowclosed':
                            newEdge.markerStart = {
                                type: MarkerType.ArrowClosed,
                                color: newEdge?.data?.color ?? arrowColor,
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

    const handleTextAlign = (value) => {
        setTextAlign(value?.alignType)
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
                                color: newEdge?.data?.color ?? arrowColor,
                            };
                            break;
                        case 'arrowclosed':
                            newEdge.markerEnd = {
                                type: MarkerType.ArrowClosed,
                                color: newEdge?.data?.color ?? arrowColor,
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

    return (
        <div className={style.preventSelect}>
            <div className={style.toolBarMainContainer}>
                <Tooltip title='Collapse/Expand'>
                    <MenuFoldOutlined
                        className={style.toolBarIcon}
                        onClick={handleSideBarToggle}
                    />
                </Tooltip>

                <div className={style.toolBarContainer}>

                    <Tooltip title='Undo'>
                        <UndoOutlined
                            className={style.toolBarIcon + " " + (canUndo ? style.toolBarIconDisabled : "")}
                            onClick={handleUndo}
                        />
                    </Tooltip>
                    <Tooltip title='Redo'>
                        <RedoOutlined className={style.toolBarIcon + " " + (canRedo ? style.toolBarIconDisabled : "")}
                            onClick={handleRedo}
                        />
                    </Tooltip>

                    <Tooltip title='Move canvas'>
                        {spacebarActive ?
                            <LockOutlined className={style.toolBarIcon} onClick={toggleInteractivity} />
                            : <UnlockOutlined className={style.toolBarIcon} onClick={toggleInteractivity} />
                        }
                    </Tooltip>
                    <Tooltip title='Zoom to fit'>
                        <FullscreenOutlined className={style.toolBarIcon} onClick={handleTransform} />
                    </Tooltip>

                    <div className='flex-center-middle'>
                        <PlusOutlined className={style.toolBarIcon} onClick={zoomInCanvas} />
                        <div className={style.zoomValueContainer}>{zoomValue * 2}%</div>
                        <MinusOutlined className={style.toolBarIcon} onClick={zoomOutCanvas} />
                    </div>

                    <div className={style.toolBarSeparator} />


                    {/* Appearance content start */}
                    <div className='m-t-10' >
                        <Dropdown
                            values={fontTypes}
                            onChange={onChangeTextType}
                            dataName='label'
                            selected={JSON.stringify(textType)}
                            disabled={!selectedNodes?.length > 0 || isLineSelected}
                        />
                    </div>
                    <div
                        className={style.colorPickerContainer + ' ' + ((selectedNodes?.length > 0 && !isLineSelected) ? '' : style.disabledStyle)}
                        onClick={() => showColorPicker(colorPickerTypes.TEXT)}
                    >
                        <div className='bold' style={{ color: getRgbaColor(textColor) }}>A</div>
                        <div className={style.fontColorFooter} style={{ backgroundColor: getRgbaColor(textColor) }} />
                        {colorPickerVisible === colorPickerTypes.TEXT ?
                            <div className={style.toolbarSketchPickerContainer}>
                                <ColorPicker
                                    color={textColor}
                                    onChange={onChangeTextColor}
                                    onMouseLeave={onMouseLeave}
                                />
                            </div> : null
                        }
                    </div>
                    <div className='m-t-10'>
                        <Dropdown
                            values={fontSizes}
                            onChange={onFontSizeChange}
                            selected={fontSize}
                            disabled={!selectedNodes?.length > 0 || isLineSelected}
                        />
                    </div>
                    <div
                        className={style.fontBoldContainer + ' ' + ((selectedNodes?.length > 0 && !isLineSelected) ? '' : style.disabledStyle)}
                        style={{ backgroundColor: textBold ? '#D3D3D3' : '' }}
                        onClick={onChangeTextBold}>B</div>

                    <div className={style.activityContainer}>
                        <CustomDropdown
                            values={textAlignTypes}
                            onChange={handleTextAlign}
                            dataName='icon'
                            selected={selectedAlignType}
                            hideHintText
                            disabled={!selectedNodes?.length > 0}
                        />
                    </div>
                    <div className={style.toolBarSeparator} />

                    <Tooltip title='Background color'>
                        <div
                            className={style.toolbarColorIcon + ' ' + ((selectedNodes?.length > 0 && selectedNodes?.[0]?.type !== 'Text' && !isLineSelected) ? '' : style.disabledStyle)}
                            style={{ backgroundColor: isLineSelected ? 'white' : getRgbaColor(backgroundColor) }}
                            onClick={() => showColorPicker(colorPickerTypes.BACKGROUND)}
                        >
                            {colorPickerVisible === colorPickerTypes.BACKGROUND ?
                                <div className={style.toolbarSketchPickerContainer}>
                                    <ColorPicker
                                        color={isLineSelected ? 'white' : backgroundColor}
                                        onChange={onChangeBackgroundColor}
                                        onMouseLeave={onMouseLeave}
                                    />
                                </div> : null
                            }
                        </div>
                    </Tooltip>

                    <Tooltip title='Border color'>
                        <div
                            className={style.toolbarColorIcon + ' ' + ((selectedNodes?.length > 0 && selectedNodes?.[0]?.type !== 'Text' && !isLineSelected) ? '' : style.disabledStyle)}
                            style={{ borderColor: getRgbaColor(borderColor), borderWidth: 2 }}
                            onClick={() => showColorPicker(colorPickerTypes.LINE)}
                        >
                            {colorPickerVisible === colorPickerTypes.LINE ?
                                <div className={style.toolbarSketchPickerContainer}>
                                    <ColorPicker
                                        color={borderColor}
                                        onChange={onChangeBorderColor}
                                        onMouseLeave={onMouseLeave}
                                    />
                                </div> : null
                            }
                        </div>
                    </Tooltip>

                    <Tooltip title='Border Width'>
                        <div className='m-t-10'>
                            <Dropdown
                                values={connectorWidths}
                                onChange={onChangeStrokeWidth}
                                selected={strokeWidth ?? '1'}
                                disabled={!selectedNodes?.length > 0 || isLineSelected}
                            />
                        </div>
                    </Tooltip>

                    <Tooltip title='Align Left'>
                        <AlignLeft
                            width={15} height={15}
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            onClick={alignLeft} />
                    </Tooltip>
                    <Tooltip title='Align Center'>
                        <AlignCenter
                            width={15} height={15}
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            onClick={alignCenter} />
                    </Tooltip>
                    <Tooltip title='Align Right'>
                        <AlignRight
                            width={15} height={15}
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            onClick={alignRight} />
                    </Tooltip>
                    <Tooltip title='Align Top'>
                        <AlignTop
                            width={15} height={15}
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            onClick={alignTop} />
                    </Tooltip>
                    <Tooltip title='Align Middle'>
                        <AlignMiddle
                            width={15} height={15}
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            onClick={alignMiddle} />
                    </Tooltip>
                    <Tooltip title='Align Bottom'>
                        <AlignBottom
                            width={15} height={15}
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            onClick={alignBottom} />
                    </Tooltip>

                    <Tooltip title='Resize'>
                        <ExpandAltOutlined
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            onClick={resize} />
                    </Tooltip>
                    <Tooltip title='Resize Vertically'>
                        <ExpandAltOutlined
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            rotate={45}
                            onClick={() => resize(true, false)} />
                    </Tooltip>
                    <Tooltip title='Resize Horizontally'>
                        <ExpandAltOutlined
                            className={'hover-hand' + ' ' + (selectedNodes?.length > 1 ? '' : style.disabledStyle)}
                            rotate={135}
                            onClick={() => resize(false, true)} />
                    </Tooltip>

                    <Tooltip title='Rotate'>
                        <div className={style.rotateInputContainer + ' ' + (selectedNodes?.length > 0 ? '' : style.disabledStyle)}>
                            <input
                                className='m-r-5'
                                value={rotate}
                                onChange={handleRotate}
                                type="text"
                            />
                            < >°</>
                        </div>
                    </Tooltip>
                    <Tooltip title='Width'>
                        <div className={style.sizeInputContainer + ' ' + (selectedNodes?.length > 0 ? '' : style.disabledStyle)}>
                            <input
                                value={size?.width}
                                onChange={handleWidthChange}
                                type="text"
                            />
                        </div>
                    </Tooltip>
                    <Tooltip title='Height'>
                        <div className={style.sizeInputContainer + ' ' + (selectedNodes?.length > 0 ? '' : style.disabledStyle)}>
                            <input
                                value={size?.height}
                                onChange={handleHeightChange}
                                type="text"
                            />
                        </div>
                    </Tooltip>

                    <div className={style.toolBarSeparator} />
                    {isLineSelected ?
                        <Tooltip title='Line color'>
                            <div
                                className={style.toolbarColorIcon + ' ' + ((selectedNodes?.length > 0 && selectedNodes?.[0]?.type !== 'Text') ? '' : style.disabledStyle)}
                                style={{ backgroundColor: getRgbaColor(lineBackgroundColor) }}
                                onClick={() => showColorPicker(colorPickerTypes.CONNECTOR)}
                            >
                                {colorPickerVisible === colorPickerTypes.CONNECTOR ?
                                    <div className={style.toolbarSketchPickerContainer}>
                                        <ColorPicker
                                            color={lineBackgroundColor}
                                            onChange={onChangeBackgroundColor}
                                            onMouseLeave={onMouseLeave}
                                        />
                                    </div> : null
                                }
                            </div>
                        </Tooltip> :
                        <Tooltip title='Connector Color'>
                            <div
                                className={style.toolbarColorIcon + ' ' + (selectedEdges?.length > 0 ? '' : style.disabledStyle)}
                                style={{ backgroundColor: selectedEdgeData?.color ?? arrowColor }}
                                onClick={() => showColorPicker(colorPickerTypes.CONNECTOR)}
                            >
                                {colorPickerVisible === colorPickerTypes.CONNECTOR ?
                                    <div className={style.toolbarSketchPickerContainer}>
                                        <ColorPicker
                                            color={selectedEdgeData?.color ?? arrowColor}
                                            onChange={onChangeEdgeColor}
                                            onMouseLeave={onMouseLeave}
                                        />
                                    </div> : null
                                }
                            </div>
                        </Tooltip>
                    }

                    <div className='m-t-10'>
                        {isLineSelected ?
                            <Dropdown
                                values={connectorWidths}
                                onChange={onChangeLineWidth}
                                selected={selectedNodes?.[0]?.type === lineTypes.HORIZONTAL ? size?.height : size?.width}
                            /> : <Dropdown
                                values={connectorWidths}
                                onChange={onChangeEdgeWidth}
                                selected={selectedEdgeData?.width ?? '2'}
                                disabled={!selectedEdges?.length > 0}
                            />
                        }
                    </div>
                    <div className={style.activityContainer}>
                        <CustomDropdown
                            values={connectorTypes}
                            onChange={onChangeEdgeType}
                            dataName='label'
                            iconName='icon'
                            selected={selectedEdgeType}
                            hideHintText
                            disabled={!selectedEdges?.length > 0}
                        />
                    </div>
                    <Tooltip title='Connector Start'>
                        <div className={style.activityContainer}>
                            <CustomDropdown
                                values={arrowStartTypes}
                                onChange={onChangeEdgeStart}
                                dataName='label'
                                iconName='icon'
                                selected={getSelectedEdgeStart}
                                hideHintText
                                disabled={!selectedEdges?.length > 0}
                            />
                        </div>
                    </Tooltip>
                    <Tooltip title='Connector End'>
                        <div className={style.activityContainer}>
                            <CustomDropdown
                                values={arrowStartTypes}
                                onChange={onChangeEdgeEnd}
                                dataName='label'
                                iconName='icon'
                                selected={getSelectedEdgeEnd}
                                hideHintText
                                disabled={!selectedEdges?.length > 0}
                            />
                        </div>
                    </Tooltip>
                    <div className={style.toolBarSeparator} />

                    {/* Appearance content end */}

                    <Tooltip title='Copy'>
                        <CopyOutlined className={style.toolBarIcon} onClick={onCopy} />
                    </Tooltip>
                    <Tooltip title='Paste'>
                        <SnippetsOutlined className={style.toolBarIcon} onClick={pasteNodes} />
                    </Tooltip>

                    <Tooltip title='Save changes'>
                        <SaveOutlined className={style.toolBarIcon} onClick={onSaveHandler} />
                    </Tooltip>
                    <Tooltip title='Download'>
                        <DownloadOutlined className={style.toolBarIcon} onClick={toggleModal} />
                    </Tooltip>
                    <Tooltip title='Upload'>
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

                <Tooltip title='Collapse/Expand'>
                    <MenuUnfoldOutlined
                        className={style.toolBarIcon}
                        onClick={handlePropertyPanelToggle}
                    />
                </Tooltip>
            </div>
        </div>
    );
};
