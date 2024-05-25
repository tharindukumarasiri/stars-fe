import React, { useMemo, useState } from "react";
import { Modal, Table, Tabs, message } from "antd";

import { useNodeDataStore } from '../store'
import Dropdown from '../../dropdown';
import { WorkInstructionsTableHeaders, SoftwareSystemsTableHeaders, SelectedReferanceTableHeaders } from "../../../utils/tableHeaders";
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import { ReferenceTypes } from "../../../utils/constants";
const { TabPane } = Tabs

const ReferenceTypesDropDown = [
    { id: ReferenceTypes.workInstructions, type: 'Work Instructions' },
    { id: ReferenceTypes.softwareSystems, type: 'Systems' },
]

const Categories = [
    { id: 1, type: 'Instructions' },
    { id: 2, type: 'Employees' },
]

const ReferenceModal = ({ nodes, setNodes }) => {
    const referenceModalId = useNodeDataStore((state) => state.referenceModalId);
    const setReferenceModalId = useNodeDataStore((state) => state.setReferenceModalId);

    const referenceData = useDiagramStore((state) => state.referenceData);

    const [dropdownSelected, setDropdownSelected] = useState({ RefType: undefined, category: undefined })
    const [activeKey, setActiveKey] = useState(ReferenceTypesDropDown[0].id);

    const closeModal = () => setReferenceModalId('');
    const onChangeTab = (key) => { setActiveKey(key); }

    const onSelectReferenceType = (e) => {
        e.preventDefault();
        setDropdownSelected(pre => ({ ...pre, RefType: JSON.parse(e.target.value) }))
    }

    const onSelectCategory = (e) => {
        e.preventDefault();
        setDropdownSelected(pre => ({ ...pre, category: JSON.parse(e.target.value) }))
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

    const onRemoveReferance = (refType, refId) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === referenceModalId) {
                    const newNode = { ...node }
                    const newReference = JSON.parse(JSON.stringify(node?.data?.reference || []))

                    const index = newReference.findIndex((item) => {return item.id === refId && item.type === refType })

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
        referenceData[dropdownSelected?.RefType?.id] || []
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
            width={'95vw'}
            centered={true}
            closeIcon={< i className='icon-close close-icon' />}>
            <div className="g-row">
                <div className="g-col-3">
                    <Dropdown
                        values={ReferenceTypesDropDown}
                        onChange={onSelectReferenceType}
                        dataName='type'
                        selected={JSON.stringify(dropdownSelected.RefType)}
                        placeholder='Reference Type'
                    />
                </div>

                <div className="g-col-3">
                    <Dropdown
                        values={Categories}
                        onChange={onSelectCategory}
                        dataName='type'
                        selected={JSON.stringify(dropdownSelected.category)}
                        placeholder='Select Category'
                    />
                </div>
            </div>
            <div className="g-row">
                <div className="g-col-6">
                    <Table
                        columns={tableHeaders}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </div>
                <div className="g-col-6">
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
                </div>
            </div>
            <div className="n-float" />
        </Modal>
    )
}

export default ReferenceModal;