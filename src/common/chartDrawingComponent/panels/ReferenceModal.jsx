import React, { useEffect, useMemo, useState } from "react";
import { Modal, message, Switch, Tooltip, Pagination } from "antd";
import { MenuOutlined } from '@ant-design/icons';

import { useNodeDataStore } from '../store'
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import { ReferenceTypes } from "../../../utils/constants";

import style from '../DndStyles.module.scss'

const SortTypes = {
    asc: 'asc',
    des: 'des',
    none: 'none'
}

const sortColumns = {
    TypeOfInfo: 'typeOfInfo',
    Number: 'number',
}

const ReferenceTypesDropDown = [
    { id: 'all', type: 'ALL' },
    { id: ReferenceTypes.workInstructions, type: 'Work Instruction' },
    { id: ReferenceTypes.softwareSystems, type: 'System' },
    { id: ReferenceTypes.agreements, type: 'Agreement' },
    { id: ReferenceTypes.contactPersons, type: 'Contact Person' },
    { id: ReferenceTypes.contactPersonsByCompanies, type: 'Contact Person of the Company' },
    { id: ReferenceTypes.companies, type: 'Company' },
]

const initialInitialData = { typeOfInfo: '', number: '', name: '', source: false }

const lookupType = {
    TYPE: 'TYPE',
    ID: 'Id'
}

const ReferenceModal = ({ nodes, setNodes, onSave }) => {
    const [editMode, setEditMode] = useState(false);
    const [editRecord, setEditRecord] = useState('');
    const [inputData, setinputData] = useState(initialInitialData);
    const [selectedType, setSelectedType] = useState("")
    const [filterdType, setFilterdType] = useState(ReferenceTypesDropDown[0])
    const [sortedType, setSortedType] = useState(SortTypes.none)
    const [sortedColumn, setSortedColumn] = useState("")
    const [showFilter, setShowFilter] = useState(false)
    const [lookupVisible, setLookupVisible] = useState("")
    const [lookupInputs, setLookupInputs] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [spin, setSpin] = useState(0)

    const referenceModalId = useNodeDataStore((state) => state.referenceModalId);
    const setReferenceModalId = useNodeDataStore((state) => state.setReferenceModalId);

    const referenceData = useDiagramStore((state) => state.referenceData);
    const getReferanceData = useDiagramStore((state) => state.getReferanceData);
    const referenceTypes = useDiagramStore((state) => state.referenceTypes);

    const toggleFilter = () => setShowFilter(pre => !pre)
    const stopSpin = () => setSpin(0)

    useEffect(() => {
        if(referenceModalId){
            getReferanceData()
        }
    },[referenceModalId])

    const onRefreshReferences = () => {
        setSpin(1);
        getReferanceData();
    }

    const closeModal = () => {
        setReferenceModalId('');
        setinputData(initialInitialData);
        setEditMode(false);
        setEditRecord('');
    }

    const onSelectFilterType = (type) => {
        setFilterdType(type)
        toggleFilter()
    }

    const onAddReferenceBtnClick = () => {
        setEditRecord('')
        setinputData(initialInitialData)
        setEditMode(true)
    }

    const toggleTypeLookup = (type = "") => {
        if (lookupVisible) {
            setLookupVisible('');
            setLookupInputs('')
        } else {
            setLookupVisible(type)
            setLookupInputs('')
        }
    }

    const selectedNodeReferanceData = useMemo(() => {
        const slectedNode = nodes.find(node => node.id === referenceModalId)
        let referanceData = slectedNode?.data?.reference || []


        if (filterdType.id !== ReferenceTypesDropDown[0].id) {
            referanceData = referanceData.filter((referance) => (
                referance?.typeOfInfo.toUpperCase().includes(filterdType.type.toUpperCase())
            ))
        }

        if (sortedType === SortTypes.asc) {
            referanceData?.sort((a, b) => {
                return a[sortedColumn]?.toString()?.localeCompare(b[sortedColumn])?.toString()
            })
        }
        if (sortedType === SortTypes.des) {
            referanceData?.sort((a, b) => {
                return b[sortedColumn]?.toString()?.localeCompare(a[sortedColumn])?.toString()
            })
        }

        return referanceData
    }, [nodes, referenceModalId, sortedType, filterdType])

    const onAddReferance = () => {
        if (inputData?.typeOfInfo && inputData?.number) {
            if (!inputData.typeOfInfo.toUpperCase().includes(filterdType.type.toUpperCase())) {
                setFilterdType(ReferenceTypesDropDown[0])
            }

            setNodes((nodes) =>
                nodes.map((node) => {
                    if (node.id === referenceModalId) {
                        const newNode = { ...node }
                        const newReference = JSON.parse(JSON.stringify(node?.data?.reference || []))

                        if(editRecord) {
                            const index = newReference.findIndex((item) => (item.id === editRecord))

                            newReference[index] = {
                                ...newReference[index],
                                ...inputData
                            }
                            setEditRecord("")
                        } else {
                            const data = {
                                ...inputData,
                                type: selectedType,
                                id: `${selectedType}_${+new Date()}`
                            }

                            newReference.push(data)
                        }

                        setEditMode(false)
                        setinputData(initialInitialData)

                        newNode.data = {
                            ...node.data,
                            reference: newReference
                        }
                        return newNode
                    } else return node
                })
            )

            onSave()
        }
    }

    const onRemoveReferance = (data) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === referenceModalId) {
                    const newNode = { ...node }
                    const newReference = JSON.parse(JSON.stringify(node?.data?.reference || []))

                    const index = newReference.findIndex((item) => { return item.typeOfInfo === data?.typeOfInfo })

                    if (index > -1) {
                        newReference.splice(index, 1)
                        newNode.data = {
                            ...node.data,
                            reference: newReference
                        }
                    }

                    return newNode
                } else return node
            })
        )
    }

    const onEditRecord = (data) => {
        setinputData({
            typeOfInfo: data?.typeOfInfo,
            number: data?.number.toString(),
            name: data?.name,
            source: data?.source
        })
        setSelectedType(data?.type)
        setEditRecord(data?.id)
    }

    const onChangePage = (page) => {
        setCurrentPage(page)
    }

    const typeDataSource = useMemo(() => {
        let result = [];

        ReferenceTypesDropDown.map(item => {
            if (item?.id === 'all')
                return

            const newRefData = {
                Id: item.id,
                Name: item?.type
            }

            if (lookupInputs) {
                if (item.type.toUpperCase().includes(lookupInputs.toUpperCase())) {
                    result.push(newRefData)
                }
            } else {
                result.push(newRefData)
            }
        })

        return result;
    }, [lookupInputs])

    const numberDataSource = useMemo(() => {
        if (!selectedType) return []

        let dataList = referenceData[selectedType]

        if (lookupInputs) {
            dataList = dataList?.filter(item => {
                return item?.Name.toUpperCase().includes(lookupInputs.toUpperCase())
            })
        }

        return dataList
    }, [referenceData, selectedType, lookupInputs])

    const onSortTable = (type) => {
        setSortedColumn(type);
        switch (sortedType) {
            case SortTypes.none:
                setSortedType(SortTypes.asc)
                break
            case SortTypes.asc:
                setSortedType(SortTypes.des)
                break
            case SortTypes.des:
                setSortedType(SortTypes.none)
                break
            default:
                break
        }
    }

    const onChangeTypeOfInfo = (e) => {
        e.preventDefault();
        setinputData((pre) => ({ ...pre, typeOfInfo: e.target.value }));
    }

    const onChangeInfoLookupSearch = (e) => {
        e.preventDefault();
        setLookupInputs(e.target.value);
    }

    const onChangeNumber = (e) => {
        e.preventDefault();
        setinputData((pre) => ({ ...pre, number: e.target.value }));
    }

    const onChangeName = (e) => {
        e.preventDefault();
        setinputData((pre) => ({ ...pre, name: e.target.value }));
    }

    const toggleInputSource = () => {
        setinputData((pre) => ({ ...pre, source: !pre.source }));
    }

    const onSelectTypeOfInfo = (options) => {
        setinputData((pre) => ({ ...pre, typeOfInfo: options?.Name }));
        setSelectedType(options?.Id)
        toggleTypeLookup()
    }

    const onSelectNumber = (options) => {
        setinputData((pre) => ({ ...pre, number: options?.Id, name: options?.Name }));
        toggleTypeLookup()
    }

    const lookupWindow = (dataSource, onSelectItem, showItemWithId = false) => {
        const pageCount = (currentPage - 1) * 10
        const paginated = dataSource?.slice(pageCount, pageCount + 10)

        return (
            <div className={style.referenceFilterContainer}
                onMouseLeave={toggleTypeLookup}
            >
                <div className={"input-container " + style.lookupSearchInputWidth} >
                    <input type="text"
                        value={lookupInputs}
                        onChange={onChangeInfoLookupSearch}
                    />
                    <i className='icon-search-1 datapicker-icon-x' />
                </div>
                {paginated?.map(type => {
                    return (
                        <div
                            className={style.lookupItem}
                            key={type?.Id}
                            onClick={() => onSelectItem(type)}
                        >
                            {showItemWithId ?
                                `${type?.Id} : ${type?.Name}` :
                                type?.Name
                            }
                        </div>
                    )
                })}
                <div className="flex-center-middle m-t-20">
                    <Pagination
                        defaultCurrent={currentPage}
                        total={dataSource?.length}
                        size="small"
                        className=" m-b-20"
                        onChange={onChangePage}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        )
    }

    const editRow = () => {
        return (
            <tr>
                <td>
                    {editRecord ?
                        inputData.typeOfInfo :
                        <div className="pos-r">
                            {/* <AutoComplete
                                value={inputData.typeOfInfo}
                                options={typeDataSource}
                                placeholder={filterdType.type}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onSelect={onSelectTypeOfInfo}
                                onChange={onChangeTypeOfInfo}
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                            /> */}
                            <input type="text"
                                value={inputData.typeOfInfo}
                                onChange={onChangeTypeOfInfo}
                                placeholder={filterdType.type}
                            />
                            {lookupVisible === lookupType.TYPE &&
                                lookupWindow(typeDataSource, (type) => onSelectTypeOfInfo(type))
                            }
                            <div className={style.hamburgerContainer} onClick={() => toggleTypeLookup(lookupType.TYPE)}>
                                <MenuOutlined />
                            </div>
                        </div>
                    }
                </td>
                <td>
                    <div className="pos-r">
                            {/* <AutoComplete
                                value={inputData.number}
                                options={numberDataSource}
                                filterOption={(inputValue, option) =>
                                    option.Id.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                fieldNames={{
                                    value: 'Id'
                                }}
                                onSelect={onSelectNumber}
                                onChange={onChangeNumber}
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                            /> */}
                            <input type="text"
                                value={inputData.number}
                                onChange={onChangeNumber}
                            />
                            {lookupVisible === lookupType.ID &&
                                lookupWindow(numberDataSource, (type) => onSelectNumber(type), true)
                            }
                            <div className={style.hamburgerContainer} onClick={() => toggleTypeLookup(lookupType.ID)}>
                                <MenuOutlined />
                            </div>
                    </div>
                </td>
                <td>
                    {editRecord ?
                        inputData.name :
                        <input type="text"
                            value={inputData.name}
                            onChange={onChangeName}
                        />
                    }
                </td>
                <td>
                    <div className="toggle-btn">
                        <Switch checked={inputData.source} onChange={toggleInputSource} />
                    </div>
                </td>
                <td>
                    <i
                        className={`h1 icon-success ${inputData?.typeOfInfo && inputData?.number ? 'green hover-hand' : ''}`}
                        onClick={onAddReferance}
                    />
                </td>
            </tr>
        )
    }

    if (!referenceModalId) return null

    return (
        <Modal
            title='Reference'
            open={referenceModalId}
            footer={[]}
            onCancel={closeModal}
            width={'65vw'}
            centered={true}
            closeIcon={< i className='icon-close close-icon' />}>

            <div className={`m-b-20 ${style.linkTabsContainer}`}>
            <button
                onClick={onAddReferenceBtnClick} 
                disabled={editMode}>Add Reference
            </button>
            <Tooltip title='Refresh References'>
                <i className={`icon-rotate1 close-icon hover-hand ${style.reloadIcon}`} 
                    onAnimationEnd={stopSpin} 
                    onClick={onRefreshReferences}
                    spin={spin} />
            </Tooltip>
            </div>

            <table>
                <tr>
                    <th>
                        <div className={style.tableHeaderRowContainer}>
                            Type of Info
                            <Tooltip title='Sort by Type'>
                                <div className={style.sortIconContainer} onClick={() => onSortTable(sortColumns.TypeOfInfo)}>
                                    <i className={`icon-arrow-up ${sortedType === SortTypes.asc && sortedColumn === sortColumns.TypeOfInfo && 'blue'}`} />
                                    <i className={`icon-arrow-down ${sortedType === SortTypes.des && sortedColumn === sortColumns.TypeOfInfo && 'blue'}`} />
                                </div>
                            </Tooltip>

                            <div>
                                <Tooltip title='Filter by Type'>
                                    <i
                                        className='icon-arrow-down-circled close-icon hover-hand'
                                        onClick={toggleFilter}
                                    />
                                </Tooltip>
                                {showFilter &&
                                    <div className={style.referenceFilterContainer}
                                        onMouseLeave={toggleFilter}
                                    >
                                        {ReferenceTypesDropDown.map(type => {
                                            return (
                                                <div
                                                    className={`${style.filterItem} ${type.id === filterdType.id && 'blue'}`}
                                                    key={type.id}
                                                    onClick={() => onSelectFilterType(type)}
                                                >
                                                    {type.type}
                                                </div>
                                            )
                                        })}
                                    </div>
                                }

                            </div>
                        </div>
                    </th>
                    <th>
                        <div className={style.tableHeaderRowContainer}>
                            Value ID
                            <Tooltip title='Sort by number'>
                                <div className={style.sortIconContainer} onClick={() => onSortTable(sortColumns.Number)}>
                                    <i className={`icon-arrow-up ${sortedType === SortTypes.asc && sortedColumn === sortColumns.Number && 'blue'}`} />
                                    <i className={`icon-arrow-down ${sortedType === SortTypes.des && sortedColumn === sortColumns.Number && 'blue'}`} />
                                </div>
                            </Tooltip>
                        </div>
                    </th>
                    <th>
                        <div className={style.tableHeaderRowContainer}>
                            Name
                        </div>
                    </th>
                    <th>
                        <div className={style.tableHeaderRowContainer}>
                            Source
                        </div>
                    </th>
                    <th width="10%"></th>
                </tr>

                {editMode && !editRecord &&
                    editRow()
                }

                {selectedNodeReferanceData?.map((data) => {
                    if (editRecord === data?.id) {
                        return editRow()
                    } else {
                        return (
                            <tr key={data?.id}>
                                <td>{data?.typeOfInfo}</td>
                                <td>{data?.number}</td>
                                <td>{data?.name}</td>
                                <td>
                                    <div className="toggle-btn">
                                        <Switch checked={data.source} />
                                    </div>
                                </td>
                                <td>
                                    <div className={style.matrixColumnActionRow}>
                                        <Tooltip title='Edit'>
                                            < i className='icon-edit close-icon' onClick={() => onEditRecord(data)} />
                                        </Tooltip>
                                        <Tooltip title='Remove'>
                                            < i className='icon-close close-icon' onClick={() => onRemoveReferance(data)} />
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                })}
                {selectedNodeReferanceData?.length > 0 &&
                    <div className={style.referenceTableContainerPadding} />
                }
            </table>

            {
                selectedNodeReferanceData?.length === 0 &&
                <div className={`${style.referenceTableContainer} flex-center-middle`}>
                    No reference yet. Start off adding...
                </div>
            }
            <div className="n-float" />
        </Modal >
    )
}

export default ReferenceModal;