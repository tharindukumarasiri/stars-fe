import React, { useState, memo, useMemo } from 'react';
import {
    SettingOutlined,
    AlignCenterOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined
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
    arrowColor
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
    const onChangeTextBold = () => setBold(!textBold)
    const onChangeTextColor = (color) => setTextColor(color?.rgb)
    const onChangeMarker = (value) => setMarkerType(value)

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
                                    styles={colorPickerStyles}
                                />
                            </div> : null
                        }
                    </div>
                </div>

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
            </div>
        )
    }

    const layersContent = () => {
        return (
            <div className={style.layerContainer}>
                <div className='flex-align-center'>
                    {selectedNodes?.length > 1 ?
                        <div className={style.groupLayersBtn} onClick={onGroupNodes}>
                            Group
                        </div> : null
                    }
                </div>


                {
                    nodes.map(node => {
                        return (
                            <div key={node?.id} className={`${style.layerItemContainer} ${node?.selected ? style.layerItemSelected : ''}`}>
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
                                {node?.id}
                            </div>
                        )
                    })
                }
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
        </aside>
    );
};

export default memo(PropertyPanel);