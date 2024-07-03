import React, { useMemo, useState } from "react";
import { Modal, AutoComplete, message, Switch, Tooltip } from "antd";

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
    { id: ReferenceTypes.companies, type: 'Company' },
]

const initialInitialData = { typeOfInfo: '', number: '', name: '', source: false }

const ReferenceModal = ({ nodes, setNodes }) => {
    const [editMode, setEditMode] = useState(false);
    const [editRecord, setEditRecord] = useState('');
    const [inputData, setinputData] = useState(initialInitialData);
    const [selectedType, setSelectedType] = useState("")
    const [filterdType, setFilterdType] = useState(ReferenceTypesDropDown[0])
    const [sortedType, setSortedType] = useState(SortTypes.none)
    const [sortedColumn, setSortedColumn] = useState("")
    const [showFilter, setShowFilter] = useState(false)

    const referenceModalId = useNodeDataStore((state) => state.referenceModalId);
    const setReferenceModalId = useNodeDataStore((state) => state.setReferenceModalId);

    const referenceData = useDiagramStore((state) => state.referenceData);

    const toggleFilter = () => setShowFilter(pre => !pre)

    const closeModal = () => {
        setReferenceModalId('');
        setinputData(initialInitialData);
        setEditMode(false);
        setEditRecord('')
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

                        const index = newReference.findIndex((item) => { return (item.typeOfInfo === inputData.typeOfInfo && item.number.toString() === inputData.number.toString()) })

                        if (index < 0) {
                            newReference.push(inputData)

                            setEditMode(false)
                            setinputData(initialInitialData)
                        } else if (editRecord) {
                            newReference[index] = inputData

                            setEditMode(false)
                            setinputData(initialInitialData)
                            setEditRecord("")
                        } else {
                            message.success('Already Added');
                        }

                        newNode.data = {
                            ...node.data,
                            reference: newReference
                        }
                        return newNode
                    } else return node
                })
            )
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
        setEditRecord(data?.typeOfInfo + data?.number.toString())
    }

    const typeDataSource = useMemo(() => {
        let result = [];

        for (let key in referenceData) {
            if (Array.isArray(referenceData[key]) && referenceData[key]?.length > 0) {
                const itemType = ReferenceTypesDropDown.find(refType => refType.id === key)

                const newRefData = {
                    value: itemType.type,
                    id: key
                }
                result.push(newRefData)
            }
        }

        return result;
    }, [referenceData, filterdType])

    const numberDataSource = useMemo(() => {
        if (!selectedType) return []

        return referenceData[selectedType]

    }, [referenceData, selectedType])

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

    const onChangeTypeOfInfo = (value) => {
        setinputData((pre) => ({ ...pre, typeOfInfo: value }));
    }

    const onChangeNumber = (value) => {
        setinputData((pre) => ({ ...pre, number: value }));
    }

    const onChangeName = (e) => {
        e.preventDefault();
        setinputData((pre) => ({ ...pre, name: e.target.value }));
    }

    const toggleInputSource = () => {
        setinputData((pre) => ({ ...pre, source: !pre.source }));
    }

    const onSelectTypeOfInfo = (value, options) => {
        setSelectedType(options?.id)
    }

    const onSelectNumber = (value, options) => {
        setinputData((pre) => ({ ...pre, name: options?.Name }));
    }

    const editRow = () => {
        return (
            <tr>
                <td>
                    {editRecord ?
                        inputData.typeOfInfo :
                        <AutoComplete
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
                        />
                    }
                </td>
                <td>
                    {editRecord ?
                        inputData.number :
                        <AutoComplete
                            value={inputData.number}
                            options={numberDataSource}
                            placeholder={filterdType.type}
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
                        />
                    }

                </td>
                <td>
                    <input type="text"
                        value={inputData.name}
                        onChange={onChangeName}
                    />
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
            <button className="m-b-20" onClick={onAddReferenceBtnClick} disabled={editMode}>Add Reference</button>

            <table>
                <tr>
                    <th className={style.tableHeaderRowContainer}>
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
                    </th>
                    <th>
                        <div className={style.tableHeaderRowContainer}>
                            Number
                            <Tooltip title='Sort by number'>
                                <div className={style.sortIconContainer} onClick={() => onSortTable(sortColumns.Number)}>
                                    <i className={`icon-arrow-up ${sortedType === SortTypes.asc && sortedColumn === sortColumns.Number && 'blue'}`} />
                                    <i className={`icon-arrow-down ${sortedType === SortTypes.des && sortedColumn === sortColumns.Number && 'blue'}`} />
                                </div>
                            </Tooltip>
                        </div>
                    </th>
                    <th>Name</th>
                    <th>Source</th>
                    <th width="10%"></th>
                </tr>

                {editMode && !editRecord &&
                    editRow()
                }

                {selectedNodeReferanceData?.map((data) => {
                    if (editRecord === data.typeOfInfo + data?.number.toString()) {
                        return editRow()
                    } else {
                        return (
                            <tr key={data?.typeOfInfo + data?.number.toString()}>
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

            {selectedNodeReferanceData?.length === 0 &&
                <div className={`${style.referenceTableContainer} flex-center-middle`}>
                    No reference yet. Start off adding...
                </div>
            }
            <div className="n-float" />
        </Modal>
    )
}

export default ReferenceModal;