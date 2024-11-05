import React, { useState, memo, useMemo, useContext, useEffect } from 'react';
import { AutoComplete } from "antd";
import {
    SettingOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
    DownOutlined,
    RightOutlined,
    ExpandAltOutlined
} from '@ant-design/icons';
import {
    MarkerType,
} from 'reactflow';
import Nestable from 'react-nestable';

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
    defaultNewLayerRestData
} from '../utils';
import { useNodeDataStore } from '../store'
import Dropdown from '../../dropdown';
import CustomDropdown from '../../customDropdown';
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import { TabContext } from '../../../utils/contextStore';
import { NAVIGATION_PAGES } from "../../../utils/enums";
import FormModal from './FormModal';

import { ReactComponent as AlignLeft } from '../../../assets/images/align-icons/align-left.svg'
import { ReactComponent as AlignRight } from '../../../assets/images/align-icons/align-right.svg'
import { ReactComponent as AlignTop } from '../../../assets/images/align-icons/align-top.svg'
import { ReactComponent as AlignBottom } from '../../../assets/images/align-icons/align-bottom.svg'

import style from '../DndStyles.module.scss'
import 'react-nestable/dist/styles/index.css';

const propertyCategories = {
    GRID: 'Grid',
    SECTIONS: 'Sections',
    APPEARANCE: 'Appearance',
    LAYERS: 'Layers',
    LINK: 'Link',
    REFERENCE: 'Reference',
    FORMS: 'Forms'
}

const LinkTypes = {
    URL: 'Url',
    PAGE: 'Page',
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

const PropertyPanel = ({ nodes, selectedNodes = [], selectedEdges = [], setNodes, setEdges, onChangePage }) => {
    const { changeActiveTab } = useContext(TabContext);

    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [colorPickerVisible, setColorPickerVisible] = useState('')
    const [closedCategories, setClosedCategories] = useState([]);
    const [urlInput, setUrlInput] = useState('');
    // const [uploadedFile, setUploadedFile] = useState('');
    const [selectedLinkType, setSelectedLinkType] = useState(LinkTypes.URL);
    const [selectedCollection, setSelectedCollection] = useState({});
    const [selectedDrawing, setSelectedDrawing] = useState({});
    const [selectedDrawingPage, setSelectedDrawingPage] = useState({});
    const [selectedDrawingPagesData, setSelectedDrawingPagesData] = useState([])
    const [selectedPage, setSelectedPage] = useState({});
    const [isFocusedLayersInput, setIsFocusedLayersInput] = useState(false)

    const diagramData = useDiagramStore((state) => state.diagramData);
    const pagesData = useNodeDataStore((state) => state.pagesData);
    const formsData = useDiagramStore((state) => state.formsData);
    const setFormsModalVisible = useDiagramStore((state) => state.setFormsModalVisible);
    const collectionData = useDiagramStore((state) => state.collectionData);
    const getDrawingsForCollection = useDiagramStore((state) => state.getDrawingsForCollection);
    const drawingsData = useDiagramStore((state) => state.drawingsData);
    const setCurrentCollectionId = useDiagramStore((state) => state.setCurrentCollectionId);
    const getDiagramData = useDiagramStore((state) => state.getDiagramData);
    const getUploadedImages = useDiagramStore((state) => state.getUploadedImages);
    const getReferanceData = useDiagramStore((state) => state.getReferanceData);
    const getFormsData = useDiagramStore((state) => state.getFormsData);

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

    const columnsData = chartData?.columnsData || [];
    const setColumnsData = (value) => onChangeChartData({ columnsData: value })

    const rowsData = chartData?.rowsData || [];
    const setRowsData = (value) => onChangeChartData({ rowsData: value })

    const selectedColumn = chartData?.selectedColumn ?? null;
    const selectedRow = chartData?.selectedRow ?? null;

    const matrixPadding = chartData?.matrixPadding || 2
    const setMatrixPadding = (value) => onChangeChartData({ matrixPadding: value })

    const columnsCount = chartData?.columnsCount || 1
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value })

    const columnsColor = chartData?.columnsColor || '#D9D9D9'
    const setColumnsColor = (value) => onChangeChartData({ columnsColor: value })

    const rowsColor = chartData?.rowsColor || '#8B8B8B'
    const setRowsColor = (value) => onChangeChartData({ rowsColor: value })

    const sectionBackgroundColor = chartData?.sectionBackgroundColor || '#EAEAEA'
    const setSectionBackgroundColor = (value) => onChangeChartData({ sectionBackgroundColor: value })

    const sectionBorderColor = chartData?.sectionBorderColor || '#434343'
    const setSectionBorderColor = (value) => onChangeChartData({ sectionBorderColor: value })

    const hideTools = chartData?.hideTools || false
    const setHideTools = (value) => onChangeChartData({ hideTools: value })

    const currentLayer = useNodeDataStore((state) => state.currentLayer);
    const setCurrentLayer = useNodeDataStore((state) => state.setCurrentLayer);

    const layers = useNodeDataStore((state) => state.layers);
    const setLayers = useNodeDataStore((state) => state.setLayers);

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
    const onBlur = () => setIsFocusedLayersInput(pre => !pre)

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

    const onColumnsCountIncrease = () => setColumnsCount(columnsCount + 1);
    const onColumnsCountDecrease = () => setColumnsCount(columnsCount - 1 > 0 ? columnsCount - 1 : 0);
    const onColumnsCountChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setColumnsCount(Number(number))
        }
    };



    const onPaddingIncrease = () => setMatrixPadding(matrixPadding + 1);
    const onPaddingDecrease = () => setMatrixPadding(matrixPadding - 1 > 0 ? matrixPadding - 1 : 0);
    const onPaddingChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setMatrixPadding(Number(number))
        }
    };

    const onChangeRowBgColor = (color) => {
        if (selectedRow !== null) {
            const copyOfRowsData = [...rowsData]
            copyOfRowsData[selectedRow] = {
                ...copyOfRowsData[selectedRow],
                color: color?.hex
            }
            setRowsData(copyOfRowsData)
        } else {
            const newRowsData = rowsData.map(rowData => {
                const data = {
                    ...rowData,
                    color: color?.hex
                }
                return data
            })

            setRowsColor(color?.hex)
            setRowsData(newRowsData)
        }
    }

    const selectedRowColor = () => {
        if (selectedRow === null) {
            return rowsColor;
        } else {
            return rowsData[selectedRow]?.color ?? rowsColor
        }
    }

    const onChangeColumnBgColor = (color) => {
        if (selectedColumn !== null) {
            const copyOfColumnsData = [...columnsData]
            copyOfColumnsData[selectedColumn] = {
                ...copyOfColumnsData[selectedColumn],
                color: color?.hex
            }
            setColumnsData(copyOfColumnsData)
        } else {
            const newColumnsData = columnsData.map(colData => {
                const data = {
                    ...colData,
                    color: color?.hex
                }
                return data
            })

            setColumnsColor(color?.hex)
            setColumnsData(newColumnsData)
        }
    }

    const selectedColumnColor = () => {
        if (selectedColumn === null) {
            return columnsColor;
        } else {
            return columnsData[selectedColumn]?.color ?? columnsColor
        }
    }

    const handleLinkInput = (e) => {
        e.preventDefault();
        setUrlInput(e.target.value)
    }

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

    const formattedPagesData = useMemo(() => {
        const formattedList = pagesData?.map((page, index) => {
            return {
                pageIndex: index,
                pageName: page.pageName
            }
        })
        return formattedList
    }, [pagesData])

    const formattedDrawingPagesData = useMemo(() => {
        const formattedList = selectedDrawingPagesData?.map((page, index) => {
            return {
                pageIndex: index,
                pageName: page.pageName
            }
        })
        return formattedList
    }, [selectedDrawingPagesData])

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
                        case LinkTypes.PAGE:
                            newLinks.push({
                                type: selectedLinkType,
                                name: selectedPage?.pageName,
                                pageIndex: selectedPage?.pageIndex,
                            })
                            break;
                        case LinkTypes.DOCUMENT:
                            newLinks.push({
                                type: selectedLinkType,
                                collectionName: selectedCollection.Name,
                                collectionId: selectedCollection?.Id,
                                drawingName: selectedDrawing?.Name,
                                drawingId: selectedDrawing?.Id,
                                pageName: selectedDrawingPage?.pageName,
                                pageIndex: selectedDrawingPage?.pageIndex,
                            })
                            setSelectedCollection({})
                            setSelectedDrawing({})
                            setSelectedDrawingPage({})
                            setSelectedDrawingPagesData([])
                            // newLinks.push({
                            //     type: selectedLinkType,
                            //     file: uploadedFile,
                            //     fileName: urlInput
                            // })
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

    const onSelectCollection = (e) => {
        e.preventDefault();
        const collectionData = JSON.parse(e.target.value)
        setSelectedCollection(collectionData);
        getDrawingsForCollection(collectionData?.Id)
        setSelectedDrawingPage({});
        setSelectedDrawingPagesData([])
    }

    const onSelectDrawing = (e) => {
        e.preventDefault();
        const drawingsData = JSON.parse(e.target.value)
        setSelectedDrawing(drawingsData);
        setSelectedDrawingPagesData(JSON.parse(drawingsData?.DrawingContent))
    }

    const onSelectPageForDrawing = (e) => {
        e.preventDefault();
        setSelectedDrawingPage(JSON.parse(e.target.value));
    }

    const getSelectedDocumentData = () => {
        let documentText = ''

        if (selectedCollection?.Name)
            documentText = selectedCollection?.Name

        if (selectedDrawing?.Id)
            documentText += " > " + selectedDrawing?.Name

        if (selectedDrawingPage?.pageName)
            documentText += " > " + selectedDrawingPage?.pageName

        return documentText
    }

    const onSelectPage = (e) => {
        e.preventDefault();
        setSelectedPage(JSON.parse(e.target.value));
    }

    const onClickDrawingRecord = async (linkData) => {
        if (linkData?.pageIndex || linkData?.drawingId) {
            const record = drawingsData?.find(
                (drawing) =>
                    drawing.CollectionId === linkData?.collectionId &&
                    drawing.Id === linkData?.drawingId
            );

            if (record) {
                changeActiveTab(
                    NAVIGATION_PAGES.CHART_DRAWING,
                    record,
                    true,
                    record?.Name
                );
            } else {
                const drawingsForCollection = await getDrawingsForCollection(
                    linkData?.collectionId
                );

                const selectedRecord = drawingsForCollection?.find(
                    (drawing) =>
                        drawing.CollectionId === linkData?.collectionId &&
                        drawing.Id === linkData?.drawingId
                );

                if (selectedRecord) {
                    changeActiveTab(
                        NAVIGATION_PAGES.CHART_DRAWING,
                        selectedRecord,
                        true,
                        selectedRecord?.Name
                    );
                }
            }
            // setCurrentCollectionId(linkData?.collectionId);
            // getDiagramData();
            // getUploadedImages();
            // getReferanceData();
            // getFormsData();
            // if (linkData?.pageIndex) {
            //   onChangePage(linkData?.pageIndex);
            // }
        } else {
            const record = collectionData?.find(
                (collection) =>
                    collection.Id === linkData?.collectionId
            );

            changeActiveTab(NAVIGATION_PAGES.COLLECTION_DETAILS, record, true, record?.Name)
        }
    };

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

    const onHideEdge = () => {
        setEdges((edges) =>
            edges.map((e) => {
                const isSelected = selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id);

                if (isSelected) {
                    const newEdge = { ...e }
                    newEdge.hidden = true

                    return newEdge;
                } else return e
            })
        );
    }

    const onDeleteEdge = () => {
        setEdges((edges) =>
            edges.filter((e) => !selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id))
        );
    }

    const onDeleteNode = (e, id) => {
        e.stopPropagation();

        setNodes((nodes) => nodes.filter((node) => node?.id !== id && node?.parentNode !== id));
        setEdges((edges) => edges.filter((edge) => edge?.source !== id));
    }

    const hideShowNode = (id) => {
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

    const addNewLayer = () => {
        const copyOfLayers = [...layers]
        const newLayerId = getId('layer')
        let newLayerLabelNumber = copyOfLayers.length + 1;

        while (layers?.some(layer => layer?.label == `Layer ${newLayerLabelNumber}`)) {
            newLayerLabelNumber++
        }

        copyOfLayers.push({
            id: newLayerId,
            label: `Layer ${newLayerLabelNumber}`,
            ...defaultNewLayerRestData
        })
        setLayers(copyOfLayers)
        setCurrentLayer(newLayerId)
    }

    const onChangeLayerText = (e, id) => {
        e.preventDefault();

        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers[index].label = e.target.value;

        setLayers(copyOfLayers)
    }

    const onDeleteLayer = (e, id) => {
        e.stopPropagation();

        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers.splice(index, 1);

        setLayers(copyOfLayers)

        if (currentLayer === id) {
            let newCurrentLayerIndex = index
            if (newCurrentLayerIndex > copyOfLayers?.length - 1) {
                newCurrentLayerIndex = copyOfLayers?.length - 1
            }

            setCurrentLayer(copyOfLayers[newCurrentLayerIndex]?.id)
        }

        setNodes((nodes) => nodes.filter((node) => node?.data?.layer !== id));
    }

    const expandLayer = (id) => {
        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers[index].expanded = !copyOfLayers[index]?.expanded;

        setLayers(copyOfLayers)
    }

    const hideLayer = (e, id) => {
        e.stopPropagation();

        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers[index].hidden = !copyOfLayers[index]?.hidden;

        setLayers(copyOfLayers)

        setNodes((nodes) =>
            nodes.map((node) => {
                if (node?.data?.layer === id) {
                    const newNode = { ...node }
                    newNode.hidden = !node?.hidden ?? true
                    return newNode
                } else return node
            })
        )
    }

    const lockLayer = (e, id) => {
        e.stopPropagation();

        e.stopPropagation();

        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers[index].locked = !copyOfLayers[index]?.locked;

        setLayers(copyOfLayers)

        setNodes((nodes) =>
            nodes.map((node) => {
                if (node?.data?.layer === id) {
                    const newNode = { ...node }
                    newNode.draggable = node?.draggable === false ? true : false
                    return newNode
                } else return node
            })
        )
    }

    const onMoveLayer = ({ items }) => {
        const reversedItems = [...items].reverse();

        setLayers(reversedItems)

        // sorting the nodes array according to the layers order bellow
        const layerOrderMap = reversedItems.reduce((acc, layer, index) => {
            acc[layer.id] = index;
            return acc;
        }, {});

        const copyOfNodes = JSON.parse(JSON.stringify(nodes))
        const sortedNodes = copyOfNodes.sort((a, b) => {
            return (layerOrderMap[a.data.layer] ?? Infinity) - (layerOrderMap[b.data.layer] ?? Infinity);
        });

        setNodes(sortedNodes)
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

    const alignRight = () => {
        const maxXPosition = Math.max(...selectedNodes.map(item => item.position.x))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.position.x = maxXPosition
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

    const alignBottom = () => {
        const minYPosition = Math.max(...selectedNodes.map(item => item.position.y))

        setNodes((nodes) =>
            nodes.map((node) => {
                if (selectedNodes.some(selectedNode => selectedNode.id === node.id)) {
                    const newNode = JSON.parse(JSON.stringify(node))

                    newNode.position.y = minYPosition
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
                        {selectedNodes?.length > 1 &&
                            <>
                                <div className={style.appearanceRow}>
                                    <div className={style.flex4}>
                                        Align selected
                                    </div>
                                    <div className={'hover-hand ' + style.flex2} onClick={alignLeft} >
                                        <AlignLeft width={15} height={15} />
                                    </div>
                                    <div className={'hover-hand ' + style.flex2} onClick={alignRight} >
                                        <AlignRight width={15} height={15} />
                                    </div>
                                    <div className={'hover-hand ' + style.flex2} onClick={alignTop} >
                                        <AlignTop width={15} height={15} />
                                    </div>
                                    <div className={'hover-hand ' + style.flex2} onClick={alignBottom} >
                                        <AlignBottom width={15} height={15} />
                                    </div>
                                </div>
                                <div className={style.appearanceRow}>
                                    <div className={style.flex4}>
                                        Resize
                                    </div>
                                    <div className={'hover-hand ' + style.flex2} onClick={resize} >
                                        <ExpandAltOutlined />
                                    </div>
                                    <div className={'hover-hand ' + style.flex2} onClick={() => resize(true, false)} >
                                        <ExpandAltOutlined rotate={45} />
                                    </div>
                                    <div className={'hover-hand ' + style.flex2} onClick={() => resize(false, true)} >
                                        <ExpandAltOutlined rotate={135} />
                                    </div>
                                </div>
                            </>
                        }
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
                        {selectedEdges?.length > 0 &&
                            <>
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
                                    <div className="hover-hand" onClick={onHideEdge}>
                                        <EyeOutlined />
                                    </div>
                                    <div className={style.flex8}>
                                        <i className="icon-delete-1 table-icon m-l-5" onClick={onDeleteEdge} />
                                    </div>
                                </div>
                            </>
                        }


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
                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Column background color
                    </div>

                    <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.COLUMN_BG)}>
                        <div className={style.colorIcon} style={{ backgroundColor: selectedColumnColor() }} />
                        {colorPickerVisible === colorPickerTypes.COLUMN_BG ?
                            <div className={style.sketchPickerContainer}>
                                <ColorPicker
                                    color={selectedColumnColor()}
                                    onChange={onChangeColumnBgColor}
                                    onMouseLeave={onMouseLeave}
                                    styles={colorPickerStyles}
                                />
                            </div> : null
                        }
                    </div>

                </div>
                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Row background color
                    </div>

                    <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.ROW_BG)}>
                        <div className={style.colorIcon} style={{ backgroundColor: selectedRowColor() }} />
                        {colorPickerVisible === colorPickerTypes.ROW_BG ?
                            <div className={style.sketchPickerContainer}>
                                <ColorPicker
                                    color={selectedRowColor()}
                                    onChange={onChangeRowBgColor}
                                    onMouseLeave={onMouseLeave}
                                    styles={colorPickerStyles}
                                />
                            </div> : null
                        }
                    </div>

                </div>

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

    const renderLayerItem = ({ item }) => {
        const reversedItems = [...nodes].reverse();

        return (
            <>
                <div key={item?.id}
                    className={`${style.layerItemContainer} ${currentLayer === item?.id ? style.layerItemSelected : ''} hover-hand`}
                    onClick={() => setCurrentLayer(item?.id)}
                    onDoubleClick={onBlur}>
                    <div className='m-r-5' onClick={() => expandLayer(item?.id)}>
                        {item?.expanded ?
                            <DownOutlined /> :
                            <RightOutlined />
                        }
                    </div>
                    <div className='m-r-5' onClick={(e) => hideLayer(e, item?.id)} >
                        {item?.hidden ?
                            <EyeInvisibleOutlined /> : <EyeOutlined />
                        }
                    </div>
                    <div className='m-r-5' onClick={(e) => lockLayer(e, item?.id)} >
                        {item?.locked ?
                            <LockOutlined /> : <UnlockOutlined />
                        }
                    </div>
                    {currentLayer === item?.id && isFocusedLayersInput ?
                        <input type='text'
                            autoFocus
                            onBlur={onBlur}
                            onChange={(e) => onChangeLayerText(e, item?.id)}
                            className={style.layersInput}
                            value={item?.label}
                        /> : item?.label
                    }
                    {layers?.length > 1 ?
                        <i
                            className={`icon-delete-1 ${style.layerDeleteIcon}`}
                            onClick={(e) => onDeleteLayer(e, item?.id)}
                        /> : null
                    }

                </div>
                {item?.expanded &&
                    <>
                        {reversedItems.map(node => {
                            if (node?.data?.layer === item?.id) {
                                return (
                                    <div
                                        key={node?.id}
                                        className={`${style.layerItemContainer} ${node?.selected ? style.layerItemSelected : ''}`}
                                    >
                                        <div className='m-r-5 m-l-20 hover-hand' onClick={() => hideShowNode(node?.id)} >
                                            {node?.hidden ?
                                                <EyeInvisibleOutlined /> : <EyeOutlined />
                                            }
                                        </div>
                                        <div className='m-r-5 hover-hand' onClick={() => lockNode(node?.id)} >
                                            {node?.draggable === false ?
                                                <LockOutlined /> : <UnlockOutlined />
                                            }
                                        </div>
                                        <div className={style.layerShapeLabelContainer}>
                                            {node?.id}
                                        </div>
                                        <i
                                            className={`icon-delete-1 hover-hand ${style.layerDeleteIcon}`}
                                            onClick={(e) => onDeleteNode(e, node?.id)}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </>
                }
            </>
        )
    }

    const layersContent = () => {
        const reversedItems = [...layers].reverse();
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
                <div className='flex-align-center'>
                    <div className={style.groupLayersBtn} onClick={addNewLayer}>
                        + Add New Layer
                    </div>
                </div>

                <div className={style.layerContainer}>
                    {layers?.length > 0 &&
                        <Nestable
                            items={reversedItems}
                            renderItem={renderLayerItem}
                            onChange={onMoveLayer}
                            maxDepth={1}
                        />
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

    // const onFileChange = async (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const file = e.target.files[0]
    //         let fileDataUrl = await readFile(file)

    //         setUrlInput(file?.name)
    //         setUploadedFile(fileDataUrl)
    //     }
    // }

    const formatExternalLink = (externalLink) => {
        if (!externalLink) return ""

        const includesKey = externalLink.includes("https://");
        if (includesKey) {
            return externalLink
        } else {
            return "https://" + externalLink
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
                                    <a href={formatExternalLink(link?.value)} target="_blank" rel="noopener noreferrer" className={style.linkItem}>{link?.value}</a>
                                    <i className="close-btn icon-close-small-x fr red" onClick={() => onRemoveLink(index)} />
                                </div>
                            )
                        })}
                    </>
                );
            case LinkTypes.PAGE:
                return (
                    <>
                        <div className={style.linkInputContainer}>
                            <Dropdown
                                values={formattedPagesData}
                                onChange={onSelectPage}
                                dataName='pageName'
                                placeholder="Select page"
                                selected={selectedPage?.pageIndex ? JSON.stringify(selectedPage) : null}
                                disabled={pagesData?.length === 0}
                            />
                        </div>
                        <button
                            className={style.linkAddBtn}
                            onClick={addNewLink}
                            disabled={selectedNodes?.length !== 1 || !selectedPage?.pageName}
                        >Add
                        </button>
                        {selectedNodes?.[0]?.data?.links?.map((link, index) => {
                            if (link.type !== selectedLinkType)
                                return
                            return (
                                <div key={index} className={style.linkItemContainer}>
                                    <div
                                        className={style.linkItem}
                                        onClick={() => onChangePage(link.pageIndex)}
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
                        <div className={style.linkInputContainer}>
                            <Dropdown
                                values={collectionData}
                                onChange={onSelectCollection}
                                dataName="Name"
                                placeholder="Collection"
                                selected={
                                    selectedCollection?.Id
                                        ? JSON.stringify(selectedCollection)
                                        : null
                                }
                                disabled={collectionData?.length === 0}
                            />
                        </div>
                        <div className={style.linkInputContainer}>
                            <Dropdown
                                values={drawingsData}
                                onChange={onSelectDrawing}
                                dataName="Name"
                                placeholder="Drawing"
                                selected={
                                    selectedDrawing?.Id
                                        ? JSON.stringify(selectedDrawing)
                                        : null
                                }
                                disabled={!selectedCollection?.Id}
                            />
                        </div>
                        <div className={style.linkInputContainer}>
                            <Dropdown
                                values={formattedDrawingPagesData}
                                onChange={onSelectPageForDrawing}
                                dataName="pageName"
                                placeholder="Page"
                                selected={
                                    selectedDrawingPage?.pageName
                                        ? JSON.stringify(selectedDrawingPage)
                                        : null
                                }
                                disabled={selectedDrawingPagesData.length === 0}
                            />
                        </div>
                        <div className="blue m-b-10">
                            {getSelectedDocumentData()}
                        </div>
                        <button
                            className={style.linkAddBtn}
                            onClick={addNewLink}
                            disabled={
                                selectedNodes?.length !== 1 || !selectedCollection?.Id
                            }
                        >
                            Add
                        </button>
                        {selectedNodes?.[0]?.data?.links?.map((link, index) => {
                            if (link.type !== selectedLinkType) return;

                            let documentText = "";
                            if (link?.collectionName)
                                documentText = link?.collectionName;
                            if (link?.drawingName)
                                documentText += " > " + link?.drawingName;
                            if (link?.pageName)
                                documentText += " > " + link?.pageName;

                            return (
                                <div key={index} className={style.linkItemContainer}>
                                    <div
                                        className={style.linkItem}
                                        onClick={() => onClickDrawingRecord(link)}
                                    >
                                        {documentText}
                                    </div>
                                    <i
                                        className="close-btn icon-close-small-x fr red"
                                        onClick={() => onRemoveLink(index)}
                                    />
                                </div>
                            );
                        })}
                    </>
                );
            // return (
            //     <>
            //         <input
            //             className={style.linkInputContainer}
            //             type="file" id="myFile" name="filename"
            //             onChange={onFileChange}
            //         />
            //         <button
            //             className={style.linkAddBtn}
            //             onClick={addNewLink}
            //             disabled={selectedNodes?.length !== 1 || !uploadedFile}
            //         >Add
            //         </button>
            //         {selectedNodes?.[0]?.data?.links?.map((link, index) => {
            //             if (link.type !== selectedLinkType)
            //                 return

            //             return (
            //                 <div key={index} className={style.linkItemContainer}>
            //                     <a href={link?.file} download={link?.fileName} className={style.linkItem}>{link?.fileName}</a>
            //                     <i className="close-btn icon-close-small-x fr red" onClick={() => onRemoveLink(index)} />
            //                 </div>
            //             )
            //         })}
            //     </>
            // );
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