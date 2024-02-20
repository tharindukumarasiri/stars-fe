import React, { useState, memo, useMemo } from 'react';
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
    getId
} from '../utils';
import { useNodeDataStore } from '../store'
import Dropdown from '../../dropdown';
import CustomDropdown from '../../customDropdown';

import style from '../DndStyles.module.scss'

const propertyCategories = {
    APPEARANCE: 'Appearance',
    LAYERS: 'Layers',
    REFERENCE: 'Reference'
}

const colorPickerStyles = { right: 0, top: 80 };

const PropertyPanel = ({ nodes, selectedNodes = [], selectedEdges = [], setNodes, setEdges }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [colorPickerVisible, setColorPickerVisible] = useState('')
    const [closedCategories, setClosedCategories] = useState([]);

    const changeTextData = useNodeDataStore((state) => state.onTextChange);
    const selectedNodeId = useNodeDataStore((state) => state.selectedNodeId);
    const textdata = useNodeDataStore((state) => state.textdata).find(item => item.id === selectedNodeId);

    const onTextChange = (value) => changeTextData(selectedNodeId, value)

    const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === selectedNodeId);
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const onChangeChartData = (value) => changeChartData(selectedNodeId, value)

    const backgroundColor = textdata?.backgroundColor || '#ffffff'
    const setBackgroundColor = (value) => onTextChange({ backgroundColor: value })

    const borderColor = textdata?.borderColor || 'black'
    const setBorderColor = (value) => onTextChange({ borderColor: value })

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

    const columnsCount = chartData?.columnsCount || 1
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value })

    const sectionBackgroundColor = chartData?.sectionBackgroundColor || '#EAEAEA'
    const setSectionBackgroundColor = (value) => onChangeChartData({ sectionBackgroundColor: value })

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
    const onChangeBorderColor = (color) => setBorderColor(color?.rgb)
    const onChangeSectionColor = (color) => setSectionBackgroundColor(color?.rgb)
    const onChangeTextBold = () => setBold(!textBold)
    const onChangeTextColor = (color) => setTextColor(color?.rgb)
    const onChangeMarker = (value) => setMarkerType(value)
    const onSectionsCountIncrese = () => setSectionsCount(sectionsCount + 1);
    const onSectionsCountDecrease = () => setSectionsCount(sectionsCount - 1 > 0 ? sectionsCount - 1 : 0);

    const onSectionsCountChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setSectionsCount(Number(number))
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

    const handleCheckboxCLick = (e) => {
        e?.stopPropagation()
        setHideTools(e.target?.checked)
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


                {(selectedNodes?.length === 1 && selectedNodes?.[0].type === 'MatrixChart') ?
                    <>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Background
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
                                <input className={style.hexCodeInput} type="text" value={rgbToHex(backgroundColor)} />
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Title Background
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
                            <div className={style.flex6}>
                                <input className={style.hexCodeInput} type="text" value={rgbToHex(borderColor)} />
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Section Background
                            </div>
                            <div className={style.flex2} onClick={() => showColorPicker(colorPickerTypes.SECTION_BG)}>
                                <div className={style.colorIcon} style={{ backgroundColor: getRgbaColor(sectionBackgroundColor) }} />
                                {colorPickerVisible === colorPickerTypes.SECTION_BG ?
                                    <div className={style.sketchPickerContainer}>
                                        <ColorPicker
                                            color={borderColor}
                                            onChange={onChangeSectionColor}
                                            onMouseLeave={onMouseLeave}
                                            styles={colorPickerStyles}
                                        />
                                    </div> : null
                                }
                            </div>
                            <div className={style.flex6}>
                                <input className={style.hexCodeInput} type="text" value={rgbToHex(sectionBackgroundColor)} />
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
                            <div className={style.flex6}>
                                <input className={style.hexCodeInput} type="text" value={rgbToHex(backgroundColor)} />
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
                                <input className={style.hexCodeInput} type="text" value={rgbToHex(borderColor)} />
                            </div>
                            <div className={style.flex2}>
                                <AlignCenterOutlined className={style.toolBarIcon} />
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

    const referenceContent = () => {
        return (
            <div className={style.referenceContainer}>
                <input type="radio" id="Link" name="Link" checked={true} onChange={() => { }} />{" "}
                <label className="p-r-20 p-l-20 m-r-20 m-b-10" htmlFor="Link">
                    Link
                </label>
                <input type="radio" id="Internal" name="Internal" checked={false} onChange={() => { }} />{" "}
                <label className="p-r-20 p-l-20 m-r-20" htmlFor="Internal">
                    Internal
                </label>
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

                            <div className='m-b-10' >
                                <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.REFERENCE) }} >
                                    <div>{propertyCategories.REFERENCE}</div>
                                    <i className={(!closedCategories.includes(propertyCategories.REFERENCE) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                </div>

                                {!closedCategories.includes(propertyCategories.REFERENCE) &&
                                    <div className={style.propertyPanelContainer}>
                                        {referenceContent()}
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>

        </aside>
    );
};

export default memo(PropertyPanel);