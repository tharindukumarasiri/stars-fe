import React, { useMemo, useState } from "react";
import { Modal, AutoComplete, message } from "antd";

import { useNodeDataStore } from '../store'
import Dropdown from '../../dropdown';
import { WorkInstructionsTableHeaders, SoftwareSystemsTableHeaders, SelectedReferanceTableHeaders } from "../../../utils/tableHeaders";
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import { ReferenceTypes } from "../../../utils/constants";

const ReferenceTypesDropDown = [
    { id: 'all', type: 'ALL' },
    { id: ReferenceTypes.workInstructions, type: 'Work Instructions' },
    { id: ReferenceTypes.softwareSystems, type: 'Systems' },
]


const ReferenceModal = ({ nodes, setNodes }) => {
    const [editMode, setEditMode] = useState(false);

    const referenceModalId = useNodeDataStore((state) => state.referenceModalId);
    const setReferenceModalId = useNodeDataStore((state) => state.setReferenceModalId);

    const referenceData = useDiagramStore((state) => state.referenceData);

    const [dropdownSelected, setDropdownSelected] = useState(ReferenceTypesDropDown[0])
    const [activeKey, setActiveKey] = useState(ReferenceTypesDropDown[0].id);

    const closeModal = () => setReferenceModalId('');
    const onChangeTab = (key) => { setActiveKey(key); }

    const onSelectReferenceType = (e) => {
        e.preventDefault();
        setDropdownSelected(JSON.parse(e.target.value))
    }

    const selectedNodeReferanceData = useMemo(() => {
        const slectedNode = nodes.find(node => node.id === referenceModalId)

        return slectedNode?.data?.reference || []
    }, [nodes, referenceModalId])

    const onAddReferance = (refType, refId) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === referenceModalId) {
                    const newNode = { ...node }
                    const newReference = JSON.parse(JSON.stringify(node?.data?.reference || []))

                    const isExist = newReference.some((item) => { return item.id === refId && item.type === refType })

                    if (isExist) {
                        message.success('Already Added');
                    } else {
                        newReference.push({
                            type: refType,
                            id: refId
                        })

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

    const onAddReferenceBtnClick = () => {
        setEditMode(true)
    }


    const onRemoveReferance = (refType, refId) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === referenceModalId) {
                    const newNode = { ...node }
                    const newReference = JSON.parse(JSON.stringify(node?.data?.reference || []))

                    const index = newReference.findIndex((item) => { return item.id === refId && item.type === refType })

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

    const dataSource = useMemo(() => (
        referenceData[dropdownSelected.id] || []
    ), [referenceData, dropdownSelected])

    const selectedDataSource = useMemo(() => {
        const selectedTabRefData = referenceData[activeKey] || []

        const selectedData = selectedTabRefData.filter((data) => {
            return selectedNodeReferanceData.some(selected => selected.id === data.Id && selected.type === activeKey)
        })

        return selectedData
    }, [referenceData, activeKey, nodes])

    const tableHeaders = useMemo(() => {
        switch (dropdownSelected?.RefType?.id) {
            case ReferenceTypes.workInstructions:
                return WorkInstructionsTableHeaders(onAddReferance);
            case ReferenceTypes.softwareSystems:
                return SoftwareSystemsTableHeaders(onAddReferance);
            default:
                return [];
        }

    }, [dropdownSelected]);

    if (!referenceModalId) return null

    return (
        <Modal
            title='Reference'
            open={referenceModalId}
            footer={[]}
            onCancel={closeModal}
            width={'85vw'}
            centered={true}
            closeIcon={< i className='icon-close close-icon' />}>
            <div className="g-col-3">
                <Dropdown
                    values={ReferenceTypesDropDown}
                    onChange={onSelectReferenceType}
                    dataName='type'
                    selected={JSON.stringify(dropdownSelected)}
                    placeholder='Reference Type/s'
                />
            </div>
            <button className="m-b-20" onClick={onAddReferenceBtnClick} disabled={editMode}>Add Referance</button>
            {editMode &&
                <div className="g-row">

                </div>
            }
            <table>
                <tr>
                    <th>Type of Info</th>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Source</th>
                    <th width="10%"></th>
                </tr>

                {editMode &&
                    <tr>
                        <td>
                            <AutoComplete
                                style={{
                                    width: '100%',
                                }}
                                options={dataSource}
                                placeholder={dropdownSelected.type}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td>
                            <i className="h1 icon-success green hover-hand" />
                        </td>
                    </tr>

                }
                {selectedNodeReferanceData?.map((data) => {
                    return (
                        <tr>
                            <td>{`(${data.Id})`}</td>
                            <td></td>
                            <td>{data.Name}</td>
                            <td></td>
                        </tr>)
                })
                }

            </table>
            {selectedNodeReferanceData?.length === 0 &&
                <div className="flex-center-middle">
                    No reference yet. Start off adding...
                </div>
            }

            {/* <Table
                columns={SelectedReferanceTableHeaders('refType.id', onRemoveReferance)}
                dataSource={dataSource}
                pagination={false}
            /> */}
            {/* <div className="g-col-6">
                    <Tabs
                        type="card"
                        activeKey={activeKey}
                        onChange={onChangeTab}
                    >
                        {ReferenceTypesDropDown.map((refType) => (
                            <TabPane
                                tab={refType.type}
                                key={refType.id}
                            >
                                <div className="tablele-width">
                                    <Table
                                        columns={SelectedReferanceTableHeaders(refType.id, onRemoveReferance)}
                                        dataSource={selectedDataSource}
                                        pagination={false}
                                    />
                                </div>
                            </TabPane>
                        ))}
                    </Tabs>
                </div> */}
            <div className="n-float" />
        </Modal>
    )
}

export default ReferenceModal;