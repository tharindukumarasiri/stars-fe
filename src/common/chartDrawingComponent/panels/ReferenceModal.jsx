import React, { useState } from "react";
import { Modal, Table, Tabs } from "antd";

import { useNodeDataStore } from '../store'
import Dropdown from '../../dropdown';
import { ContactPersonsTableHeaders, SelectedContactPersonsTableHeaders } from "../../../utils/tableHeaders";
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'

const { TabPane } = Tabs

const ReferenceTypes = [
    { id: 1, type: 'Work Instructions' },
    { id: 2, type: 'Systems' },
]

const Categories = [
    { id: 1, type: 'Instructions' },
    { id: 2, type: 'Employees' },
]

const ReferenceModal = () => {
    const referenceModalId = useNodeDataStore((state) => state.referenceModalId);
    const setReferenceModalId = useNodeDataStore((state) => state.setReferenceModalId);

    const referenceData = useDiagramStore((state) => state.referenceData);

    const [dropdownSelected, setDropdownSelected] = useState({ RefType: undefined, category: undefined })

    const closeModal = () => setReferenceModalId('');

    const onSelectReferenceType = (e) => {
        e.preventDefault();
        setDropdownSelected(pre => ({ ...pre, RefType: JSON.parse(e.target.value) }))
    }

    const onSelectCategory = (e) => {
        e.preventDefault();
        setDropdownSelected(pre => ({ ...pre, category: JSON.parse(e.target.value) }))
    }

    const dataSource = () => {
        switch (dropdownSelected?.RefType?.id) {
            case 1:
                return referenceData?.workInstructions
            case 2:
                return referenceData?.softwareSystems
            default:
                return []
        }
    }

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
                        values={ReferenceTypes}
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
                        columns={ContactPersonsTableHeaders()}
                        dataSource={dataSource()}
                        pagination={false}
                    />
                </div>
                <div className="g-col-6">
                    <Tabs type="card">
                        <TabPane tab="Work Instructions" key="1">
                            <div className="tablele-width">
                                <Table
                                    columns={SelectedContactPersonsTableHeaders()}
                                    dataSource={[{ Id: '112' }]}
                                    pagination={false}
                                />
                            </div>
                        </TabPane>
                        <TabPane tab='Systems' key="2">
                            <div>

                            </div>
                        </TabPane>
                        <TabPane tab='Forms' key="3">
                            <div>

                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <div className="n-float" />
        </Modal>
    )
}

export default ReferenceModal;