import React, { useState, memo, useMemo, useContext } from 'react';
import { AutoComplete } from "antd";
import {
    SettingOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
} from '@ant-design/icons';

import ColorPicker from '../../colorPicker';
import {
    getRgbaColor,
    colorPickerTypes,
    rgbToHex,
    getId,
    defaultNewLayerRestData,
    ChartOrientations,
    fontTypes,
    textAlignTypes
} from '../utils';
import { useNodeDataStore } from '../store'
import Dropdown from '../../dropdown';
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import { TabContext } from '../../../utils/contextStore';
import { NAVIGATION_PAGES } from "../../../utils/enums";
import FormModal from './FormModal';

import style from '../DndStyles.module.scss'
import 'react-nestable/dist/styles/index.css';
import SortableLayer from "../customElements/SortableLayer";
import Input from '../../input';

import swim_lane from '../../../assets/images/swim-lane/swim_lane.png'
import swim_lane_vertical from '../../../assets/images/swim-lane/swim_lane_vertical.png'
import swim_lane_horizontal from '../../../assets/images/swim-lane/swim_lane_horizontal.png'


const propertyCategories = {
    GRID: 'Grid',
    LINE_CHART: 'Spider Chart',
    MATRIX: 'Matrix',
    SECTIONS: 'Sections',
    APPEARANCE: 'Appearance',
    LAYERS: 'Layers',
    CONNECTORS: 'Connectors',
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

const PropertyPanel = ({ nodes, edges, selectedNodes = [], selectedEdges = [], setNodes, setEdges, onChangePage }) => {
    const { changeActiveTab } = useContext(TabContext);

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

    const pagesData = useNodeDataStore((state) => state.pagesData);
    const formsData = useDiagramStore((state) => state.formsData);
    const setFormsModalVisible = useDiagramStore((state) => state.setFormsModalVisible);
    const collectionData = useDiagramStore((state) => state.collectionData);
    const getDrawingsForCollection = useDiagramStore((state) => state.getDrawingsForCollection);
    const drawingsData = useDiagramStore((state) => state.drawingsData);

    const changeTextData = useNodeDataStore((state) => state.onTextChange);
    const selectedNodeId = selectedNodes?.[0]?.id;

    const textdata = useNodeDataStore((state) => state.textdata).find(item => item.id === selectedNodeId);

    const onTextChange = (value) => {
        selectedNodes?.map(node => {
            if (node?.type === 'group') {
                nodes?.map(item => {
                    if (item?.parentId === node?.id && !item?.selected) {
                        changeTextData(item?.id, value)
                    }
                })
            }

            changeTextData(node?.id, value)
        })
    }

    const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === selectedNodeId);
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const onChangeChartData = (value) => changeChartData(selectedNodeId, value)

    const backgroundColor = textdata?.backgroundColor || '#ffffff'
    const setBackgroundColor = (value) => onTextChange({ backgroundColor: value })

    const borderColor = textdata?.borderColor || 'black'
    const setBorderColor = (value) => onTextChange({ borderColor: value })

    const headerBackgroundColor = textdata?.headerBackgroundColor || '#a2a2a2'
    const setHeaderBackgroundColor = (value) => onTextChange({ headerBackgroundColor: value })

    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const setTextType = (value) => onTextChange({ textType: value })

    const textBold = textdata?.textBold || false
    const setBold = (value) => onTextChange({ textBold: value })

    const textAlign = textdata?.textAlign || 'center'
    const setTextAlign = (value) => onTextChange({ textAlign: value })

    const removeHeader = chartData?.removeHeader || false
    const setRemoveHeader = (value) => onChangeChartData({ removeHeader: value })

    const chartName = chartData?.chartName || ''
    const setSetChartName = (value) => onChangeChartData({ chartName: value })

    const setSetChartOrientation = (value) => onChangeChartData({ chartOrientation: value })

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

    const matrixPadding = chartData?.matrixPadding || 0
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

    const lineNumber = chartData?.lineNumber || 1
    const setLineNumber = (value) => onChangeChartData({ lineNumber: value })

    const curveNumber = chartData?.curveNumber || 1
    const setCurveNumber = (value) => onChangeChartData({ curveNumber: value })

    const setCurrentLayer = useNodeDataStore((state) => state.setCurrentLayer);

    const layers = useNodeDataStore((state) => state.layers);
    const setLayers = useNodeDataStore((state) => state.setLayers);

    const selectedAlignType = useMemo(() => {
        const alignType = textAlignTypes?.find(type => type.alignType === textAlign)
        return alignType || textAlignTypes[0]
    }, [selectedNodeId, textAlign])

    const showColorPicker = (picker) => setColorPickerVisible(picker)
    const onChangeBackgroundColor = (color) => setBackgroundColor(color?.rgb)
    const onMouseLeave = () => setColorPickerVisible('')
    const onChangeHeaderBackgroundColor = (color) => setHeaderBackgroundColor(color?.rgb)
    const onChangeBorderColor = (color) => setBorderColor(color?.rgb)
    const onChangeSectionColor = (color) => setSectionBackgroundColor(color?.rgb)
    const onChangeSectionBorderColor = (color) => setSectionBorderColor(color?.rgb)
    const onSectionsCountIncrese = () => setSectionsCount(sectionsCount + 1);
    const onSectionsCountDecrease = () => setSectionsCount(sectionsCount - 1 > 0 ? sectionsCount - 1 : 0);
    const toggleFormModal = () => setFormsModalVisible(true);

    const onChangeTextType = (e) => {
        e.preventDefault();
        setTextType(JSON.parse(e.target.value));
    }

    const onChangeTextBold = () => setBold(!textBold)

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
    const onPaddingDecrease = () => setMatrixPadding(matrixPadding - 1 > -1 ? (matrixPadding - 1) : 0);
    const onPaddingChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > -1) {
            setMatrixPadding(Number(number))
        }
    };

    const onLineNumberIncrese = () => setLineNumber(lineNumber + 1);
    const onLineNumberDecrease = () => setLineNumber(lineNumber - 1 > 0 ? lineNumber - 1 : 0);
    const onLineNumberChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setLineNumber(Number(number))
        }
    };

    const onCurveNumberIncrese = () => setCurveNumber(curveNumber + 1);
    const onCurveNumberDecrease = () => setCurveNumber(curveNumber - 1 > 0 ? curveNumber - 1 : 0);
    const onCurveNumberChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setCurveNumber(Number(number))
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
                pageName: page?.pageName
            }
        })
        return formattedList
    }, [pagesData])

    const formattedDrawingPagesData = useMemo(() => {
        const formattedList = selectedDrawingPagesData?.map((page, index) => {
            return {
                pageIndex: index,
                pageName: page?.pageName
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

    const onMoveLayer = (items) => {
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
                    newNode.parentId = groupId
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
            const selectedGroupNode = selectedGroupNodes.find(groupNode => groupNode.id === node.parentId);
            if (selectedGroupNode) {
                const newNode = { ...node }

                delete newNode.parentId;
                delete newNode.expandParent;
                newNode.position = { x: node?.position.x + selectedGroupNode?.position?.x, y: node?.position.y + selectedGroupNode?.position?.y }

                return newNode
            } else return node
        })

        return newNodes;
    }


    const matrixContent = () => {
        return (
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

            </>
        )
    }

    const gridContent = () => {
        return (
            <div className={style.propertyPanelContainer}>
                <div className={style.appearanceRow}>
                    <Input
                        placeholder="Name"
                        value={chartName}
                        onChange={(e) => {
                            e.preventDefault()
                            setSetChartName(e.target.value)
                        }}
                    />
                </div>
                <div className={style.appearanceRow}>
                    <div className={style.flex6}>
                        Background color
                    </div>
                    <div className={style.flex1} onClick={() => showColorPicker(colorPickerTypes.BACKGROUND)}>
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
                </div>
                <div className={style.appearanceRow}>
                    <div>
                        <div>Orientation</div>
                        <div className={style.orientationRow}>
                            <img src={swim_lane} className={style.orientationIcon}
                                onClick={() => setSetChartOrientation(ChartOrientations.BOTH)}
                            />
                            <img src={swim_lane_vertical} className={style.orientationIcon}
                                onClick={() => setSetChartOrientation(ChartOrientations.VERTICAL)}
                            />
                            <img src={swim_lane_horizontal} className={style.orientationIcon}
                                onClick={() => setSetChartOrientation(ChartOrientations.HORIZONTAL)}
                            />
                        </div>
                    </div>
                </div>

                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Columns
                    </div>
                    <div className={style.flex6}>
                        <div className={style.fontSizeContainer}>
                            <input value={columnsCount} onChange={onColumnsCountChange} type="text" />
                            <div className='hover-hand m-l-10'>
                                <CaretUpOutlined onClick={onColumnsCountIncrease} />
                                <CaretDownOutlined onClick={onColumnsCountDecrease} />
                            </div>
                        </div>
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
                        Rows
                    </div>
                    <div className={style.flex6}>
                        <div className={style.fontSizeContainer}>
                            <input value={rowsCount} onChange={onRowsCountChange} type="text" />
                            <div className='hover-hand m-l-10'>
                                <CaretUpOutlined onClick={onRowsCountIncrease} />
                                <CaretDownOutlined onClick={onRowsCountDecrease} />
                            </div>
                        </div>
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

                <div className={style.appearanceRow}>
                    Header
                </div>
                <div className={style.appearanceRow}>
                    <div className={style.flex8}>
                        <Dropdown
                            values={fontTypes}
                            onChange={onChangeTextType}
                            dataName='label'
                            selected={JSON.stringify(textType)}
                        />
                    </div>
                </div>
                <div className={style.appearanceRow} style={{ justifyContent: 'flex-start', gap: 10 }}>
                    <div
                        className={style.fontBoldContainer + " " + style.chartTextStyleContainer}
                        style={{ backgroundColor: textBold ? '#D3D3D3' : '' }}
                        onClick={onChangeTextBold}>
                        B
                    </div>

                    <div className={style.chartTextStyleContainer}
                        style={{ backgroundColor: textAlign === 'center' ? '#D3D3D3' : '' }}
                        onClick={() => setTextAlign('center')}>
                        <AlignCenterOutlined />
                    </div>
                    <div className={style.chartTextStyleContainer}
                        style={{ backgroundColor: textAlign === 'left' ? '#D3D3D3' : '' }}
                        onClick={() => setTextAlign('left')}>
                        <AlignLeftOutlined />
                    </div>
                    <div className={style.chartTextStyleContainer}
                        style={{ backgroundColor: textAlign === 'right' ? '#D3D3D3' : '' }}
                        onClick={() => setTextAlign('right')}>
                        <AlignRightOutlined />
                    </div>
                </div>

                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Padding (px)
                    </div>

                    <div className={style.flex6}>
                        <div className={style.fontSizeContainer}>
                            <input value={matrixPadding} onChange={onPaddingChange} type="text" />
                            <div className='hover-hand m-l-10'>
                                <CaretUpOutlined onClick={onPaddingIncrease} />
                                <CaretDownOutlined onClick={onPaddingDecrease} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const lineChartContent = () => {
        return (
            <div className={style.propertyPanelContainer}>
                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Background Color
                    </div>
                    <div className={style.flex3} onClick={() => showColorPicker(colorPickerTypes.BACKGROUND)}>
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
                </div>

                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Lanes
                    </div>
                    <div className={style.flex6}>
                        <div className={style.fontSizeContainer}>
                            <input value={lineNumber} onChange={onLineNumberChange} type="text" />
                            <div className='hover-hand m-l-10'>
                                <CaretUpOutlined onClick={onLineNumberIncrese} />
                                <CaretDownOutlined onClick={onLineNumberDecrease} />
                            </div>
                        </div>
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
                </div>

                <div className={style.appearanceRow}>
                    <div className={style.flex5}>
                        Curves
                    </div>
                    <div className={style.flex6}>
                        <div className={style.fontSizeContainer}>
                            <input value={curveNumber} onChange={onCurveNumberChange} type="text" />
                            <div className='hover-hand m-l-10'>
                                <CaretUpOutlined onClick={onCurveNumberIncrese} />
                                <CaretDownOutlined onClick={onCurveNumberDecrease} />
                            </div>
                        </div>
                    </div>
                    <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.SECTION_BG)}>
                        <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(sectionBorderColor) }} />
                        {colorPickerVisible === colorPickerTypes.SECTION_BG ?
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
                        <SortableLayer
                            items={reversedItems}
                            nodes={nodes}
                            setNodes={setNodes}
                            setItems={onMoveLayer}
                            setEdges={setEdges}
                        />
                    }
                </div>
            </div>
        )
    }

    const onSelectEdge = (id) => {
        setEdges((edges) =>
            edges.map((edge) => {
                if (edge.id === id) {
                    const newEdge = { ...edge }
                    newEdge.selected = true

                    return newEdge
                } else {
                    const newEdge = { ...edge }
                    newEdge.selected = false

                    return newEdge
                }
            })
        )
    }

    const onHideEdge = (id) => {
        setEdges((edges) =>
            edges.map((edge) => {
                if (edge.id === id) {
                    const newEdge = { ...edge }
                    newEdge.hidden = !edge.hidden ?? true

                    return newEdge
                } else return edge
            })
        );
    }

    const onDeleteEdge = (id) => {
        setEdges((edges) =>
            edges.filter((e) => e.id !== id)
        );
    }

    const connectorsContent = () => {
        return (
            <div className={style.layerContainer}>
                {edges.map((edge, index) => {
                    return (
                        <div
                            key={edge?.id}
                            className={`${style.layerItemContainer} ${edge?.selected ? style.layerItemSelected : ''} hover-hand`}
                            onClick={() => onSelectEdge(edge?.id)}
                        >
                            <div className='m-r-5' onClick={(e) => {
                                e.stopPropagation()
                                onHideEdge(edge?.id)
                            }} >
                                {edge?.hidden ?
                                    <EyeInvisibleOutlined /> : <EyeOutlined />
                                }
                            </div>
                            <div>
                                {`Connector ${index + 1}`}
                            </div>
                            <i
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDeleteEdge(edge?.id)
                                }}
                                className={`icon-delete-1 ${style.layerDeleteIcon}`}
                            />
                        </div>)
                })
                }
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
        <aside className={style.aside}>
            <div className={style.preventSelect + ' ' + style.propertyPanelMainContainer}>
                <div className={style.sidebarColapsBtnContainer}>
                    <SettingOutlined className={style.settingsIcon} />
                    <h3>Property</h3>
                </div>
                <div className={style.sidebarMainContainer}>

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
                            {/* <div className='m-b-10' >
                                <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.SECTIONS) }} >
                                    <div>{propertyCategories.SECTIONS}</div>
                                    <i className={(!closedCategories.includes(propertyCategories.SECTIONS) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                </div>

                                {!closedCategories.includes(propertyCategories.SECTIONS) &&
                                    sectionsContent()
                                }
                            </div> */}
                        </>
                    }


                    {selectedNodes?.[0]?.type === 'MatrixChart' &&
                        <div className='m-b-10' >
                            <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.MATRIX) }} >
                                <div>{propertyCategories.MATRIX}</div>
                                <i className={(!closedCategories.includes(propertyCategories.MATRIX) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                            </div>

                            {!closedCategories.includes(propertyCategories.MATRIX) &&
                                matrixContent()
                            }
                        </div>
                    }

                    {selectedNodes?.[0]?.type === 'LineChart' &&
                        <>
                            <div className='m-b-10' >
                                <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.LINE_CHART) }} >
                                    <div>{propertyCategories.LINE_CHART}</div>
                                    <i className={(!closedCategories.includes(propertyCategories.LINE_CHART) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                </div>

                                {!closedCategories.includes(propertyCategories.LINE_CHART) &&
                                    lineChartContent()
                                }
                            </div>
                        </>
                    }

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

                    {edges?.length > 0 ?
                        <div className='m-b-10' >
                            <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.CONNECTORS) }} >
                                <div>{propertyCategories.CONNECTORS}</div>
                                <i className={(!closedCategories.includes(propertyCategories.CONNECTORS) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                            </div>

                            {!closedCategories.includes(propertyCategories.CONNECTORS) &&
                                <div className={style.propertyPanelContainer}>
                                    {connectorsContent()}
                                </div>
                            }
                        </div> : null
                    }

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
                </div>
            </div>
            <FormModal addFormToShape={onSelectForm} onFormResponse={onFormResponse} />
        </aside>
    );
};

export default memo(PropertyPanel);