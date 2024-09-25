import React, { useState, memo, useMemo, useContext } from 'react';
import { AutoComplete } from "antd";
import {
    SettingOutlined,
    AlignCenterOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
    DownOutlined
} from '@ant-design/icons';
import {
    MarkerType,
} from 'reactflow';

import ColorPicker from '../../colorPicker';
import {
    getRgbaColor,
    colorPickerTypes,
    arrowStartTypes,
    arrowEndTypes,
    rgbToHex,
    fontTypes,
    markerTypes,
    arrowColor,
    getId,
    readFile
} from '../utils';
import { useNodeDataStore } from '../store'
import Dropdown from '../../dropdown';
import CustomDropdown from '../../customDropdown';
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import { TabContext } from '../../../utils/contextStore';
import { NAVIGATION_PAGES } from "../../../utils/enums";
import FormModal from './FormModal';
import Input from '../../input'

import style from '../DndStyles.module.scss'

const propertyCategories = {
    GRID: 'Grid',
    SECTIONS: 'Sections',
    ITEMS: 'Items',
    APPEARANCE: 'Appearance',
    LAYERS: 'Layers',
    LINK: 'Link',
    REFERENCE: 'Reference',
    FORMS: 'Forms'
}

const LinkTypes = {
    URL: 'Url',
    DRAWING: 'Drawing',
    DOCUMENT: 'Document',
}

const colorPickerStyles = { right: 0, top: 80 };
const transparentColorObj = {
    "rgb": {
        "r": 255,
        "g": 255,
        "b": 255,
        "a": 0
    },
}

const PropertyPanel = ({ nodes, selectedNodes = [], selectedEdges = [], setNodes, setEdges }) => {
    const { changeActiveTab } = useContext(TabContext);

    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [colorPickerVisible, setColorPickerVisible] = useState('')
    const [closedCategories, setClosedCategories] = useState([]);
    const [urlInput, setUrlInput] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [selectedLinkType, setSelectedLinkType] = useState(LinkTypes.URL);
    const [selectedDrawing, setSelectedDrawing] = useState({});
    const [selectedSection, setSelectedSection] = useState()

    const diagramData = useDiagramStore((state) => state.diagramData);
    const formsData = useDiagramStore((state) => state.formsData);
    const setFormsModalVisible = useDiagramStore((state) => state.setFormsModalVisible);

    const changeTextData = useNodeDataStore((state) => state.onTextChange);
    const selectedNodeId = useNodeDataStore((state) => state.selectedNodeId);
    const textdata = useNodeDataStore((state) => state.textdata).find(item => item.id === selectedNodeId);

    const sizes = useNodeDataStore((state) => state.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === selectedNodeId) || { height: 0, width: 0 };
    const setSize = (value) => onSizeCahnge(selectedNodeId, value)

    const onTextChange = (value) => changeTextData(selectedNodeId, value)

    const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === selectedNodeId);
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const onChangeChartData = (value) => changeChartData(selectedNodeId, value)

    const nodeData = chartData?.nodeData || [];
    const setNodeData = (value) => onChangeChartData({ nodeData: value });

    const backgroundColor = textdata?.backgroundColor || '#ffffff'
    const setBackgroundColor = (value) => onTextChange({ backgroundColor: value })

    const borderColor = textdata?.borderColor || 'black'
    const setBorderColor = (value) => onTextChange({ borderColor: value })

    const headerBackgroundColor = textdata?.headerBackgroundColor || '#a2a2a2'
    const setHeaderBackgroundColor = (value) => onTextChange({ headerBackgroundColor: value })

    const removeHeader = chartData?.removeHeader || false
    const setRemoveHeader = (value) => onChangeChartData({ removeHeader: value })

    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const setTextType = (value) => onTextChange({ textType: value })

    const fontSize = textdata?.fonstSize || 8
    const setFontSize = (value) => onTextChange({ fonstSize: value })

    const textBold = textdata?.textBold || false
    const setBold = (value) => onTextChange({ textBold: value })

    const textColor = textdata?.textColor || 'black'
    const setTextColor = (value) => onTextChange({ textColor: value })

    const markerType = textdata?.markerType
    const setMarkerType = (value) => onTextChange({ markerType: value })

    const sectionsCount = chartData?.sectionsCount || 1
    const setSectionsCount = (value) => onChangeChartData({ sectionsCount: value })

    const rowsCount = chartData?.rowsCount || 1
    const setRowsCount = (value) => onChangeChartData({ rowsCount: value })

    const rowsData = chartData?.rowsData || []
    const setRowsData = (value) => onChangeChartData({ rowsData: value })

    const matrixPadding = chartData?.matrixPadding || 2
    const setMatrixPadding = (value) => onChangeChartData({ matrixPadding: value })

    const columnsCount = chartData?.columnsCount || 1
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value })

    const columnsData = chartData?.columnsData || []
    const setColumnsData = (value) => onChangeChartData({ columnsData: value })

    const sectionBackgroundColor = chartData?.sectionBackgroundColor || '#EAEAEA'
    const setSectionBackgroundColor = (value) => onChangeChartData({ sectionBackgroundColor: value })

    const sectionBorderColor = chartData?.sectionBorderColor || '#434343'
    const setSectionBorderColor = (value) => onChangeChartData({ sectionBorderColor: value })

    const hideTools = chartData?.hideTools || false
    const setHideTools = (value) => onChangeChartData({ hideTools: value })

    const getSelectedEdgeStart = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]

        if (typeof selectedEdge?.markerStart == 'object') {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerStart?.type)
        } else {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerStart)
        }
    }, [selectedEdges])

    const getSelectedEdgeEnd = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]

        if (typeof selectedEdge?.markerEnd == 'object') {
            return arrowEndTypes?.find(type => type?.markerId === selectedEdge?.markerEnd?.type)
        } else {
            return arrowEndTypes?.find(type => type?.markerId === selectedEdge?.markerEnd)
        }
    }, [selectedEdges])

    const onArrowClicked = () => setSidebarVisible(pre => !pre)
    const showColorPicker = (picker) => setColorPickerVisible(picker)
    const onChangeBackgroundColor = (color) => setBackgroundColor(color?.rgb)
    const onMouseLeave = () => setColorPickerVisible('')
    const onChangeHeaderBackgroundColor = (color) => setHeaderBackgroundColor(color?.rgb)
    const onChangeBorderColor = (color) => setBorderColor(color?.rgb)
    const onChangeSectionColor = (color) => setSectionBackgroundColor(color?.rgb)
    const onChangeSectionBorderColor = (color) => setSectionBorderColor(color?.rgb)
    const onChangeTextBold = () => setBold(!textBold)
    const onChangeTextColor = (color) => setTextColor(color?.rgb)
    const onChangeMarker = (value) => setMarkerType(value)
    const onSectionsCountIncrese = () => setSectionsCount(sectionsCount + 1);
    const onSectionsCountDecrease = () => setSectionsCount(sectionsCount - 1 > 0 ? sectionsCount - 1 : 0);
    const toggleFormModal = () => setFormsModalVisible(true);

    const onSectionsCountChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setSectionsCount(Number(number))
        }
    };

    const onRowsCountIncrease = () => setRowsCount(rowsCount + 1);
    const onRowsCountDecrease = () => setRowsCount(rowsCount - 1 > 0 ? rowsCount - 1 : 0);
    const onRowsCountChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setRowsCount(Number(number))
        }
    };

    const onRowsDataChange = (e, index) => {
        e.preventDefault();
        const copyOfRowsData = [...rowsData]
        copyOfRowsData[index] = e.target.value
        setRowsData(copyOfRowsData)
    }

    const onColumnsCountIncrease = () => setColumnsCount(columnsCount + 1);
    const onColumnsCountDecrease = () => setColumnsCount(columnsCount - 1 > 0 ? columnsCount - 1 : 0);
    const onColumnsCountChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setColumnsCount(Number(number))
        }
    };

    const onColumnDataChange = (e, index) => {
        e.preventDefault();
        const copyOfColumnsData = [...columnsData]
        copyOfColumnsData[index] = e.target.value
        setColumnsData(copyOfColumnsData)
    }

    const onPaddingIncrease = () => setMatrixPadding(matrixPadding + 1);
    const onPaddingDecrease = () => setMatrixPadding(matrixPadding - 1 > 0 ? matrixPadding - 1 : 0);
    const onPaddingChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setMatrixPadding(Number(number))
        }
    };

    const getSectionId = (sectionName) => {
        const sectionNumber = sectionName.replace("Section ", "")
        return Number(sectionNumber) - 1
    }

    const onNodeColumnsCountIncrease = () => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));
        const currentNodeData = newNodeData[getSectionId(selectedSection)]

        newNodeData[getSectionId(selectedSection)] = {
            sectionNumber: getSectionId(selectedSection),
            columnsCount: (currentNodeData?.columnsCount ?? 0) + 1,
            elementData: currentNodeData?.elementData
        }

        setNodeData(newNodeData);
    };
    const onNodeColumnsCountDecrease = () => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));
        const currentNodeData = newNodeData[getSectionId(selectedSection)]

        if (currentNodeData?.columnsCount < 2) return

        newNodeData[getSectionId(selectedSection)] = {
            sectionNumber: getSectionId(selectedSection),
            columnsCount: (currentNodeData?.columnsCount ?? 0) - 1,
            elementData: currentNodeData?.elementData
        }

        setNodeData(newNodeData);
    };
    const onNodeColumnsCountChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        const newNodeData = JSON.parse(JSON.stringify(nodeData));
        const currentNodeData = newNodeData[getSectionId(selectedSection)]

        newNodeData[getSectionId(selectedSection)] = {
            sectionNumber: getSectionId(selectedSection),
            columnsCount: number,
            elementData: currentNodeData?.elementData
        }

        setNodeData(newNodeData);
    };

    const handleLinkInput = (e) => {
        e.preventDefault();
        setUrlInput(e.target.value)
    }

    const onSelectSection = (e) => {
        e.preventDefault();
        setSelectedSection(e.target.value)
    }

    const columnList = useMemo(() => {
        return (
            Array.from(Array(columnsCount))
        )
    }, [columnsCount])

    const rowList = useMemo(() => {
        return (
            Array.from(Array(rowsCount))
        )
    }, [rowsCount])

    const sectionList = useMemo(() => {
        let sectionNumber = 1
        const sectionArr = []
        for (let i = 1; i <= rowsCount; i++) {
            for (let j = 1; j <= columnsCount; j++) {
                sectionArr.push(`Section ${sectionNumber}`)
                sectionNumber++;
            }
        }

        return sectionArr
    }, [rowsCount, columnsCount])

    const addNewLink = () => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === selectedNodes[0].id) {
                    const newNode = { ...node }
                    const newLinks = JSON.parse(JSON.stringify(node?.data?.links || []))

                    switch (selectedLinkType) {
                        case LinkTypes.URL:
                            newLinks.push({
                                type: selectedLinkType,
                                value: urlInput
                            })
                            break;
                        case LinkTypes.DRAWING:
                            newLinks.push({
                                type: selectedLinkType,
                                name: selectedDrawing?.Name,
                                collectionId: selectedDrawing?.CollectionId,
                                drawingId: selectedDrawing?.Id
                            })
                            break;
                        case LinkTypes.DOCUMENT:
                            newLinks.push({
                                type: selectedLinkType,
                                file: uploadedFile,
                                fileName: urlInput
                            })
                            break;
                        default:
                            break;
                    }

                    newNode.data = {
                        ...node.data,
                        links: newLinks
                    }
                    return newNode
                } else return node
            })
        )
        setUrlInput('')
    }

    const onSelectDrawing = (e) => {
        e.preventDefault();
        setSelectedDrawing(JSON.parse(e.target.value));
    }

    const onClickDrawingRecord = (linkData) => {
        const record = diagramData?.find(drawing => drawing.CollectionId === linkData?.collectionId && drawing.Id === linkData?.drawingId)

        changeActiveTab(NAVIGATION_PAGES.CHART_DRAWING, record, true, record?.Name)
    }

    const onChangeTab = (tab) => {
        setSelectedLinkType(tab)
    }

    const onRemoveLink = (index) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === selectedNodes[0].id) {
                    const newNode = { ...node }
                    const newLinks = JSON.parse(JSON.stringify(node?.data?.links || []))

                    newLinks?.splice(index, 1)

                    newNode.data = {
                        ...node.data,
                        links: newLinks
                    }
                    return newNode
                } else return node
            })
        )
    }

    const onSelectForm = (value, option) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node?.id === selectedNodes[0]?.id) {
                    const newNode = { ...node }
                    const newForms = JSON.parse(JSON.stringify(node?.data?.forms || []))
                    newForms.push({
                        Id: option.Id,
                        Name: option.Name
                    })

                    newNode.data = {
                        ...node.data,
                        forms: newForms
                    }
                    return newNode
                } else return node
            })
        )
    }

    const onFormResponse = (id) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node?.id === selectedNodes[0]?.id) {
                    const newNode = { ...node }
                    const newForms = JSON.parse(JSON.stringify(node?.data?.forms || []))
                    const index = newForms.findIndex(data => data.Id === id)
                    const newData = {
                        ...newForms[index],
                        responded: true
                    }
                    newForms[index] = newData

                    newNode.data = {
                        ...node.data,
                        forms: newForms
                    }
                    return newNode
                } else return node
            })
        )
    }

    const onRemoveForm = (index) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === selectedNodes[0].id) {
                    const newNode = { ...node }
                    const newForms = JSON.parse(JSON.stringify(node?.data?.forms || []))

                    newForms?.splice(index, 1)

                    newNode.data = {
                        ...node.data,
                        forms: newForms
                    }
                    return newNode
                } else return node
            })
        )
    }

    const handleCheckboxCLick = (e) => {
        e?.stopPropagation()
        setHideTools(e.target?.checked)
    };

    const handleRemoveHeaderCLick = (e) => {
        e?.stopPropagation()
        setRemoveHeader(e.target?.checked)
    };

    const onCategoryClick = (category) => {
        const index = closedCategories?.findIndex(cat => cat === category)
        const newClosedCategories = [...closedCategories]

        if (index < 0) {
            newClosedCategories.push(category)
        } else {
            newClosedCategories.splice(index, 1)
        }

        setClosedCategories(newClosedCategories);
    }

    const onChangeTextType = (e) => {
        e.preventDefault();
        setTextType(JSON.parse(e.target.value));
    }

    const onFontSizeChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) < 33) {
            setFontSize(number)
        }
    }

    const onShapeWidthChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number)) {
            setSize({ height: size.height, width: number })
        }
    }

    const onShapeHeightChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number)) {
            setSize({ height: number, width: size.width })
        }
    }

    const increaseFontSize = () => {
        const newSize = Number(fontSize) + 1

        if (newSize < 33)
            setFontSize(newSize.toString())
    }

    const decreesFontSize = () => {
        const newSize = Number(fontSize) - 1

        if (newSize > 1)
            setFontSize(newSize.toString())
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

    const hideShowLayer = (id) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.hidden = !node?.hidden ?? true
                    return newNode
                } else return node
            })
        )
    }

    const lockNode = (id) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.draggable = node?.draggable === false ? true : false
                    return newNode
                } else return node
            })
        )
    }

    const onGroupNodes = () => {
        const unGroupedNodes = removeSelectedGroups()
        setNodes((nodes) => {
            const selectedNodesWithoutGroups = unGroupedNodes.filter(node => node.type !== 'group' && node.selected)
            const positionMin = { ...selectedNodesWithoutGroups[0].position }
            const positionMax = { x: positionMin.x + selectedNodesWithoutGroups[0].width, y: positionMin.y + selectedNodesWithoutGroups[0].height }
            const groupId = getId('Group')

            selectedNodesWithoutGroups.forEach(node => {
                if (node.position.x <= positionMin.x) {
                    positionMin.x = node.position.x
                }
                if (node.position.x + node.width >= positionMax.x) {
                    positionMax.x = node.position.x + node.width
                }

                if (node.position.y <= positionMin.y) {
                    positionMin.y = node.position.y
                }
                if (node.position.y + node.height >= positionMax.y) {
                    positionMax.y = node.position.y + node.height
                }
            })

            const newNodes = unGroupedNodes.map((node) => {
                const isSelected = selectedNodesWithoutGroups.some(selectedNode => selectedNode.id === node.id)
                if (isSelected) {
                    const newNode = { ...node }

                    newNode.selected = false
                    newNode.parentNode = groupId
                    newNode.expandParent = true
                    newNode.position = { x: node?.position.x - positionMin?.x, y: node?.position.y - positionMin?.y }

                    return newNode
                } else return node
            })

            const newGroup = {
                id: groupId,
                type: 'group',
                position: positionMin,
                data: {},
                style: {
                    width: positionMax.x - positionMin.x,
                    height: positionMax.y - positionMin.y,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent'
                }
            };

            newNodes.push(newGroup);
            return newNodes;
        })
    }

    const unGroupNodes = () => {
        setNodes(() => removeSelectedGroups())
    }

    const removeSelectedGroups = () => {
        const selectedGroupNodes = selectedNodes.filter(node => node.type === 'group')

        const newNodesWithoutGroups = nodes.filter(node => {
            const isSelected = selectedNodes.some(selectedNode => selectedNode.id === node.id)
            if (isSelected && node.type === 'group') {
                return false
            } else {
                return true
            }
        })

        const newNodes = newNodesWithoutGroups.map((node) => {
            const selectedGroupNode = selectedGroupNodes.find(groupNode => groupNode.id === node.parentNode);
            if (selectedGroupNode) {
                const newNode = { ...node }

                delete newNode.parentNode;
                delete newNode.expandParent;
                newNode.position = { x: node?.position.x + selectedGroupNode?.position?.x, y: node?.position.y + selectedGroupNode?.position?.y }

                return newNode
            } else return node
        })

        return newNodes;
    }

    const sortedLayers = () => {
        const groupNodes = nodes.filter(node => node.type === 'group')
        const singleNodes = nodes.filter(node => node.type !== 'group' && !node?.parentNode)

        nodes.map(node => {
            if (node?.parentNode) {
                const parentIndex = groupNodes?.findIndex(groupNode => groupNode.id === node?.parentNode)
                groupNodes.splice(parentIndex + 1, 0, node)
            }

        })

        return [...singleNodes, ...groupNodes]
    }

    const appearanceContent = () => {
        return (
            <div className={style.propertyPanelContainer}>
                <Dropdown
                    values={fontTypes}
                    onChange={onChangeTextType}
                    dataName='label'
                    selected={JSON.stringify(textType)}
                />
                <div className={style.appearanceRow}>
                    <div className={style.fontSizeContainer}>
                        <div
                            className='hover-hand m-r-10 m-t-10 bold'
                            onClick={decreesFontSize}>-</div>
                        <input value={fontSize} onChange={onFontSizeChange} type="text" />
                        <div className={style.sizeInputEndText}>pt</div>
                        <div
                            className='hover-hand m-l-10 m-t-10 bold'
                            onClick={increaseFontSize}
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
                                    styles={{ right: -60, top: -20 }}
                                />
                            </div> : null
                        }
                    </div>
                </div>
                <div className={style.appearanceRow}>
                    <div className={style.widthHeightSizeContainer}>
                        <input value={size.width} onChange={onShapeWidthChange} type="text" />
                        <div className={style.sizeInputEndText}>W</div>
                    </div>
                    <div className={style.widthHeightSizeContainer}>
                        <input value={size.height} onChange={onShapeHeightChange} type="text" />
                        <div className={style.sizeInputEndText}>H</div>
                    </div>
                </div>

                {(selectedNodes?.length === 1 && selectedNodes?.[0].type === 'MatrixChart') ?
                    <>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Header Background
                            </div>
                            <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.LINE)}>
                                <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(headerBackgroundColor) }} />
                                {colorPickerVisible === colorPickerTypes.LINE ?
                                    <div className={style.sketchPickerContainer}>
                                        <ColorPicker
                                            color={headerBackgroundColor}
                                            onChange={onChangeHeaderBackgroundColor}
                                            onMouseLeave={onMouseLeave}
                                            styles={colorPickerStyles}
                                        />
                                    </div> : null
                                }
                            </div>
                            <div className={style.flex6}>
                                <div className={style.hexCodeInput}>
                                    {rgbToHex(headerBackgroundColor)}
                                </div>
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Header Border
                            </div>
                            <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.HEADER_BORDER)}>
                                <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(borderColor) }} />
                                {colorPickerVisible === colorPickerTypes.HEADER_BORDER ?
                                    <div className={style.sketchPickerContainer}>
                                        <ColorPicker
                                            color={borderColor}
                                            onChange={onChangeBorderColor}
                                            onMouseLeave={onMouseLeave}
                                            styles={colorPickerStyles}
                                        />
                                    </div> : null
                                }
                            </div>
                            <div className={style.flex6}>
                                <div className={style.hexCodeInput}>
                                    {rgbToHex(borderColor)}
                                </div>
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Remove Header
                            </div>

                            <div className={style.flex8}>
                                <input type="checkbox" className="check-box m-l-10"
                                    checked={removeHeader}
                                    onChange={handleRemoveHeaderCLick}
                                />
                            </div>
                        </div>

                        <div className={style.separator} />

                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Matrix Background color
                            </div>
                            <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.BACKGROUND)}>
                                <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(backgroundColor) }} />
                                {colorPickerVisible === colorPickerTypes.BACKGROUND ?
                                    <div className={style.sketchPickerContainer}>
                                        <ColorPicker
                                            color={backgroundColor}
                                            onChange={onChangeBackgroundColor}
                                            onMouseLeave={onMouseLeave}
                                            styles={colorPickerStyles}
                                        />
                                    </div> : null
                                }
                            </div>
                            <div className={style.flex6}>
                                <div className={style.hexCodeInput}>{rgbToHex(backgroundColor)}</div>
                            </div>
                        </div>

                        <div className={style.separator} />

                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Section Background
                            </div>
                            <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.SECTION_BG)}>
                                <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(sectionBackgroundColor) }} />
                                {colorPickerVisible === colorPickerTypes.SECTION_BG ?
                                    <div className={style.sketchPickerContainer}>
                                        <ColorPicker
                                            color={sectionBackgroundColor}
                                            onChange={onChangeSectionColor}
                                            onMouseLeave={onMouseLeave}
                                            styles={colorPickerStyles}
                                        />
                                    </div> : null
                                }
                            </div>
                            <div className={style.flex6}>
                                <div className={style.hexCodeInput} >
                                    {rgbToHex(sectionBackgroundColor)}
                                </div>
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Section Border
                            </div>
                            <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.SECTION_BORDER)}>
                                <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(sectionBorderColor) }} />
                                {colorPickerVisible === colorPickerTypes.SECTION_BORDER ?
                                    <div className={style.sketchPickerContainer}>
                                        <ColorPicker
                                            color={sectionBorderColor}
                                            onChange={onChangeSectionBorderColor}
                                            onMouseLeave={onMouseLeave}
                                            styles={colorPickerStyles}
                                        />
                                    </div> : null
                                }
                            </div>
                            <div className={style.flex6}>
                                <div className={style.hexCodeInput} >
                                    {rgbToHex(sectionBorderColor)}
                                </div>
                            </div>
                        </div>

                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Number of sections
                            </div>

                            <div className={style.flex8}>
                                <div className={style.fontSizeContainer}>
                                    <div
                                        className='hover-hand m-r-10 m-t-10 bold'
                                        onClick={onSectionsCountDecrease}>-</div>
                                    <input value={sectionsCount} onChange={onSectionsCountChange} type="text" />
                                    <div
                                        className='hover-hand m-l-10 m-t-10 bold'
                                        onClick={onSectionsCountIncrese}
                                    >+</div>
                                </div>
                            </div>
                        </div>

                        <div className={style.separator} />

                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Number of columns
                            </div>

                            <div className={style.flex8}>
                                <div className={style.fontSizeContainer}>
                                    <div
                                        className='hover-hand m-r-10 m-t-10 bold'
                                        onClick={onColumnsCountDecrease}>-</div>
                                    <input value={columnsCount} onChange={onColumnsCountChange} type="text" />
                                    <div
                                        className='hover-hand m-l-10 m-t-10 bold'
                                        onClick={onColumnsCountIncrease}
                                    >+</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Hide Options
                            </div>

                            <div className={style.flex8}>
                                <input type="checkbox" className="check-box m-l-10"
                                    checked={hideTools}
                                    onChange={handleCheckboxCLick}
                                />
                            </div>
                        </div>

                    </> :
                    <>
                        <div className={style.appearanceRow}>
                            <div className={style.flex4}>
                                Fill
                            </div>
                            <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.BACKGROUND)}>
                                <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(backgroundColor) }} />
                                {colorPickerVisible === colorPickerTypes.BACKGROUND ?
                                    <div className={style.sketchPickerContainer}>
                                        <ColorPicker
                                            color={backgroundColor}
                                            onChange={onChangeBackgroundColor}
                                            onMouseLeave={onMouseLeave}
                                            styles={colorPickerStyles}
                                        />
                                    </div> : null
                                }
                            </div>
                            <div className={style.flex4}>
                                <div className={style.hexCodeInput} >
                                    {rgbToHex(backgroundColor)}
                                </div>
                            </div>
                            <div onClick={() => onChangeBackgroundColor(transparentColorObj)} className={style.flex2} >
                                <i className={`icon-minus ${style.toolBarIcon}`} />
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex4}>
                                Stroke
                            </div>
                            <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.LINE)}>
                                <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(borderColor) }} />
                                {colorPickerVisible === colorPickerTypes.LINE ?
                                    <div className={style.sketchPickerContainer}>
                                        <ColorPicker
                                            color={borderColor}
                                            onChange={onChangeBorderColor}
                                            onMouseLeave={onMouseLeave}
                                            styles={colorPickerStyles}
                                        />
                                    </div> : null
                                }
                            </div>
                            <div className={style.flex4}>
                                <div className={style.hexCodeInput}>
                                    {rgbToHex(borderColor)}
                                </div>
                            </div>
                            <div onClick={() => onChangeBorderColor(transparentColorObj)} className={style.flex2} >
                                <i className={`icon-minus ${style.toolBarIcon}`} />
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex4}>
                                Endpoint
                            </div>
                            <div className={style.matrixColumnActionRow + ' ' + style.flex8}>
                                <div className={style.activityContainer}>
                                    <CustomDropdown
                                        values={arrowStartTypes}
                                        onChange={onChangeEdgeStart}
                                        dataName='label'
                                        iconName='icon'
                                        selected={getSelectedEdgeStart}
                                        hideHintText
                                    />
                                </div>
                                <div className={style.activityContainer}>
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
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex4}>
                                Activity
                            </div>
                            <div className={style.flex8}>
                                <div className={style.activityContainer}>
                                    <CustomDropdown
                                        values={markerTypes}
                                        onChange={onChangeMarker}
                                        dataName='label'
                                        iconName='icon'
                                        selected={markerType}
                                        hideHintText
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }

    const gridContent = () => {
        return (
            <div className={style.propertyPanelContainer}>
                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Number of Columns
                    </div>

                    <div className={style.flex8}>
                        <div className={style.fontSizeContainer}>
                            <div
                                className='hover-hand m-r-10 m-t-10 bold'
                                onClick={onColumnsCountDecrease}>-</div>
                            <input value={columnsCount} onChange={onColumnsCountChange} type="text" />
                            <div
                                className='hover-hand m-l-10 m-t-10 bold'
                                onClick={onColumnsCountIncrease}
                            >+</div>
                        </div>
                    </div>
                </div>
                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Number of Rows
                    </div>

                    <div className={style.flex8}>
                        <div className={style.fontSizeContainer}>
                            <div
                                className='hover-hand m-r-10 m-t-10 bold'
                                onClick={onRowsCountDecrease}>-</div>
                            <input value={rowsCount} onChange={onRowsCountChange} type="text" />
                            <div
                                className='hover-hand m-l-10 m-t-10 bold'
                                onClick={onRowsCountIncrease}
                            >+</div>
                        </div>
                    </div>
                </div>
                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Padding (px)
                    </div>

                    <div className={style.flex8}>
                        <div className={style.fontSizeContainer}>
                            <div
                                className='hover-hand m-r-10 m-t-10 bold'
                                onClick={onPaddingDecrease}>-</div>
                            <input value={matrixPadding} onChange={onPaddingChange} type="text" />
                            <div
                                className='hover-hand m-l-10 m-t-10 bold'
                                onClick={onPaddingIncrease}
                            >+</div>
                        </div>
                    </div>
                </div>

                <div className='m-b-10 p-t-10 bold'>Columns</div>
                {columnList.map((_, columnIndex) => {
                    return (
                        <div className={style.linkInputContainer} key={columnIndex}>
                            <Input
                                placeholder={`Column ${columnIndex + 1}`}
                                value={columnsData[columnIndex]}
                                onChange={(e) => onColumnDataChange(e, columnIndex)}
                            />
                        </div>
                    )
                })}

                <div className='m-b-10 p-t-10 bold'>Rows</div>
                {rowList.map((_, rowIndex) => {
                    return (
                        <div className={style.linkInputContainer} key={rowIndex}>
                            <Input
                                placeholder={`Row ${rowIndex + 1}`}
                                value={rowsData[rowIndex]}
                                onChange={(e) => onRowsDataChange(e, rowIndex)}
                            />
                        </div>
                    )
                })}


            </div>
        )
    }

    const sectionsContent = () => {
        return (
            <div className={style.propertyPanelContainer}>
                {sectionList.map((section) => {
                    return (
                        <div className={style.sectionListItemContainer} key={section}>
                            <div>{section}</div>
                            <input type="checkbox" className="check-box" />
                        </div>
                    )
                })}
            </div>
        )
    }

    const elementsContent = () => {
        return (
            <div className={style.propertyPanelContainer}>
                <Dropdown
                    values={sectionList}
                    onChange={onSelectSection}
                    selected={selectedSection}
                    placeholder="Levels"
                />

                {selectedSection &&
                    <div className={style.appearanceRow}>
                        <div className={style.flex5}>
                            Number of Columns
                        </div>

                        <div className={style.flex8}>
                            <div className={style.fontSizeContainer}>
                                <div
                                    className='hover-hand m-r-10 m-t-10 bold'
                                    onClick={onNodeColumnsCountDecrease}>-</div>
                                <input value={nodeData[getSectionId(selectedSection)]?.columnsCount ?? 0} onChange={onNodeColumnsCountChange} type="text" />
                                <div
                                    className='hover-hand m-l-10 m-t-10 bold'
                                    onClick={onNodeColumnsCountIncrease}
                                >+</div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }

    const layersContent = () => {
        return (
            <div>
                <div className='flex-align-center'>
                    {selectedNodes?.length > 1 &&
                        <div className={style.groupLayersBtn} onClick={onGroupNodes}>
                            Group
                        </div>
                    }
                    {selectedNodes?.some(node => node.type === 'group') &&
                        <div className={style.groupLayersBtn} onClick={unGroupNodes}>
                            Ungroup
                        </div>
                    }
                </div>

                <div className={style.layerContainer}>
                    {
                        sortedLayers().map(node => {
                            return (
                                <div key={node?.id} className={`${style.layerItemContainer} ${node?.selected ? style.layerItemSelected : ''}`}>
                                    {node?.parentNode &&
                                        <div className='m-r-20 hover-hand' />
                                    }
                                    <div className='m-r-5 hover-hand' onClick={() => hideShowLayer(node?.id)} >
                                        {node?.hidden ?
                                            <EyeInvisibleOutlined /> : <EyeOutlined />
                                        }
                                    </div>
                                    <div className='m-r-5 hover-hand' onClick={() => lockNode(node?.id)} >
                                        {node?.draggable === false ?
                                            <LockOutlined /> : <UnlockOutlined />
                                        }
                                    </div>
                                    {node?.type === 'group' &&
                                        <div className='m-r-5 hover-hand'>
                                            <DownOutlined />
                                        </div>
                                    }

                                    {node?.id}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    const linkContent = () => {
        return (
            <div className={style.linkContainer}>
                <div className={style.linkTabsContainer}>
                    {Object.values(LinkTypes).map(type => (
                        <div
                            className={selectedLinkType === type ? style.linkTabSelected : style.linkTabNotSelected}
                            key={type}
                            onClick={() => onChangeTab(type)}
                        >
                            {type}
                        </div>
                    ))}
                </div>
                <div className={style.linkContentContainer}>
                    {linkTypeContent()}
                </div>
            </div>
        )
    }

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let fileDataUrl = await readFile(file)

            setUrlInput(file?.name)
            setUploadedFile(fileDataUrl)
        }
    }

    const linkTypeContent = () => {
        switch (selectedLinkType) {
            case LinkTypes.URL:
                return (
                    <>
                        <div className={style.linkInputContainer}>
                            <input
                                type="text"
                                placeholder='Url (Eg: www.google.com)'
                                value={urlInput}
                                onChange={handleLinkInput}
                            />
                        </div>
                        <button
                            className={style.linkAddBtn}
                            onClick={addNewLink}
                            disabled={selectedNodes?.length !== 1 || !urlInput}
                        >Add
                        </button>
                        {selectedNodes?.[0]?.data?.links?.map((link, index) => {
                            if (link.type !== selectedLinkType)
                                return
                            return (
                                <div key={index} className={style.linkItemContainer}>
                                    <a href={link?.value} target="_blank" rel="noopener noreferrer" className={style.linkItem}>{link?.value}</a>
                                    <i className="close-btn icon-close-small-x fr red" onClick={() => onRemoveLink(index)} />
                                </div>
                            )
                        })}
                    </>
                );
            case LinkTypes.DRAWING:
                return (
                    <>
                        <div className={style.linkInputContainer}>
                            <Dropdown
                                values={diagramData}
                                onChange={onSelectDrawing}
                                dataName='Name'
                                selected={JSON.stringify(selectedDrawing)}
                            />
                        </div>
                        <button
                            className={style.linkAddBtn}
                            onClick={addNewLink}
                            disabled={selectedNodes?.length !== 1 || !selectedDrawing?.Name}
                        >Add
                        </button>
                        {selectedNodes?.[0]?.data?.links?.map((link, index) => {
                            if (link.type !== selectedLinkType)
                                return
                            return (
                                <div key={index} className={style.linkItemContainer}>
                                    <div
                                        className={style.linkItem}
                                        onClick={() => onClickDrawingRecord(link)}
                                    >
                                        {link?.name}
                                    </div>
                                    <i className="close-btn icon-close-small-x fr red" onClick={() => onRemoveLink(index)} />
                                </div>
                            )
                        })}
                    </>
                );
            case LinkTypes.DOCUMENT:
                return (
                    <>
                        <input
                            className={style.linkInputContainer}
                            type="file" id="myFile" name="filename"
                            onChange={onFileChange}
                        />
                        <button
                            className={style.linkAddBtn}
                            onClick={addNewLink}
                            disabled={selectedNodes?.length !== 1 || !uploadedFile}
                        >Add
                        </button>
                        {selectedNodes?.[0]?.data?.links?.map((link, index) => {
                            if (link.type !== selectedLinkType)
                                return

                            return (
                                <div key={index} className={style.linkItemContainer}>
                                    <a href={link?.file} download={link?.fileName} className={style.linkItem}>{link?.fileName}</a>
                                    <i className="close-btn icon-close-small-x fr red" onClick={() => onRemoveLink(index)} />
                                </div>
                            )
                        })}
                    </>
                );
            default:
                return null

        }
    }

    const formsContent = () => {
        return (
            <div className={style.linkContainer}>
                <div className={style.formsContentContainer}>
                    <div className={style.linkInputContainer}>
                        <AutoComplete
                            style={{
                                width: '100%',
                            }}
                            allowClear
                            options={formsData}
                            fieldNames={{ value: "Name" }}
                            placeholder="Search for a form"
                            filterOption={(inputValue, option) =>
                                option.Name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            onSelect={onSelectForm}
                        />
                    </div>
                    {selectedNodes?.[0]?.data?.forms?.map((form, index) => {
                        return (
                            <div key={index} className={style.linkItemContainer}>
                                <div>{form?.Name}</div>
                                <i className="close-btn icon-close-small-x fr red" onClick={() => onRemoveForm(index)} />
                            </div>
                        )
                    })}
                    <div className='m-b-5'>Or</div>
                    <button
                        onClick={toggleFormModal}
                    >Create New Form
                    </button>

                </div>
            </div>
        )
    }

    return (
        <aside className={sidebarVisible ? style.aside : ''}>
            <div className={style.preventSelect}>
                <div className={style.sidebarColapsBtnContainer}>
                    {sidebarVisible &&
                        <>
                            <SettingOutlined className={style.settingsIcon} />
                            <h3>Property</h3>
                        </>
                    }
                    <i className={style.sidebarColapsBtn + (sidebarVisible ? ' icon-circle-arrow-right ' : ' icon-circle-arrow-left ') + style.propertyPanelCollapseBtn}
                        onClick={onArrowClicked} />
                </div>
                <div className={style.sidebarMainContainer}>
                    {sidebarVisible &&
                        <>
                            {selectedNodes?.[0]?.type === 'MatrixTable' &&
                                <>
                                    <div className='m-b-10' >
                                        <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.GRID) }} >
                                            <div>{propertyCategories.GRID}</div>
                                            <i className={(!closedCategories.includes(propertyCategories.GRID) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                        </div>

                                        {!closedCategories.includes(propertyCategories.GRID) &&
                                            gridContent()
                                        }
                                    </div>
                                    <div className='m-b-10' >
                                        <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.SECTIONS) }} >
                                            <div>{propertyCategories.SECTIONS}</div>
                                            <i className={(!closedCategories.includes(propertyCategories.SECTIONS) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                        </div>

                                        {!closedCategories.includes(propertyCategories.SECTIONS) &&
                                            sectionsContent()
                                        }
                                    </div>
                                    <div className='m-b-10' >
                                        <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.ITEMS) }} >
                                            <div>{propertyCategories.ITEMS}</div>
                                            <i className={(!closedCategories.includes(propertyCategories.ITEMS) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                        </div>

                                        {!closedCategories.includes(propertyCategories.ITEMS) &&
                                            elementsContent()
                                        }
                                    </div>
                                </>
                            }


                            <div className='m-b-10' >
                                <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.APPEARANCE) }} >
                                    <div>{propertyCategories.APPEARANCE}</div>
                                    <i className={(!closedCategories.includes(propertyCategories.APPEARANCE) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                </div>

                                {!closedCategories.includes(propertyCategories.APPEARANCE) &&
                                    appearanceContent()
                                }
                            </div>

                            <div className='m-b-10' >
                                <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.LAYERS) }} >
                                    <div>{propertyCategories.LAYERS}</div>
                                    <i className={(!closedCategories.includes(propertyCategories.LAYERS) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                </div>

                                {!closedCategories.includes(propertyCategories.LAYERS) &&
                                    <div className={style.propertyPanelContainer}>
                                        {layersContent()}
                                    </div>
                                }
                            </div>

                            {selectedNodes?.length === 1 &&
                                <div>
                                    <div className='m-b-10' >
                                        <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.LINK) }} >
                                            <div>{propertyCategories.LINK}</div>
                                            <i className={(!closedCategories.includes(propertyCategories.LINK) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                        </div>

                                        {!closedCategories.includes(propertyCategories.LINK) &&
                                            <div className={style.propertyPanelContainer}>
                                                {linkContent()}
                                            </div>
                                        }
                                    </div>
                                    <div className='m-b-10' >
                                        <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.FORMS) }} >
                                            <div>{propertyCategories.FORMS}</div>
                                            <i className={(!closedCategories.includes(propertyCategories.FORMS) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                        </div>

                                        {!closedCategories.includes(propertyCategories.FORMS) &&
                                            <div className={style.propertyPanelContainer}>
                                                {formsContent()}
                                            </div>
                                        }
                                    </div>
                                </div>
                            }

                        </>
                    }
                </div>
            </div>
            <FormModal addFormToShape={onSelectForm} onFormResponse={onFormResponse} />
        </aside>
    );
};

export default memo(PropertyPanel);