import React, { useState, useEffect, useMemo, useContext } from "react";
import { Modal, Table, Tooltip, Switch } from 'antd';

import { CommunicationBasketsTableHeaders } from '../../utils/tableHeaders'
import StarDropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import Input from '../../common/input'
import { NAVIGATION_PAGES } from "../../utils/enums";
import { TabContext } from "../../utils/contextStore";

const CommunicationBaskets = () => {
    const [dropDownData, setDropDownData] = useState({ type: [], status: [] })
    const [filterTypes, setFilterTypes] = useState({ startDate: null, endDate: null, type: null, status: null })
    const [communicationsData, setCommunicationsData] = useState([{ Id: 0 }])
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newGroupData, setNewGroupData] = useState({ name: '', basketType: 'ONE_TIME', communicationType: '', description: '' });

    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        setLoading(false)
    }, []);

    const tableHeaders = useMemo(() => {
        const headers = CommunicationBasketsTableHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: 'Logs',
            render: (_, record) => (
                <i className=" icon-log basket-table-icon blue hover-hand" />
            )
        }, {
            title: 'Config.',
            render: (_, record) => (
                <i className="icon-config basket-table-icon green hover-hand" />
            )
        }, {
            title: '',
            render: (_, record) => (
                <Tooltip title='Archive' >
                    <i className="icon-archive basket-table-icon hover-hand" />
                </Tooltip>
            )
        },
        )

        return headers

    }, [communicationsData])

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setFilterTypes({ ...filterTypes, [elementName]: JSON.parse(e.target.value) });
    }

    const onFilterTypeDateChange = (date, elementName) => {
        setFilterTypes({ ...filterTypes, [elementName]: date });
    };

    const onFilter = () => {
        setLoading(true)

    }

    const toggleModal = () => {
        setModalVisible(pre => !pre)
    }

    const onOk = () => {
        toggleModal()
    }

    const onChangeNewGroupField = (e, fieldName) => {
        e.preventDefault();
        setNewGroupData({ ...newGroupData, [fieldName]: e.target.value })
    }

    const onClickRow = (params) => {
        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS, params)
    }

    return (
        <>
            <div className="com-top-container user-input-box">
                {loading &&
                    <div className="loading center-loading">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
                <div className="create-new-btn">
                    <button className="add-btn" onClick={toggleModal} >Create New</button>
                </div>

                <div className="filter-by-text">Filter By:</div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='Start Date'
                        value={filterTypes.startDate}
                        onChange={(date) => onFilterTypeDateChange(date, "startDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='End Date'
                        value={filterTypes.endDate}
                        onChange={(date) => onFilterTypeDateChange(date, "endDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.type}
                        onChange={e => onChangeFilterType(e, 'type')}
                        selected={JSON.stringify(filterTypes.type || undefined)}
                        dataName="Name"
                        placeholder="Type"
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.status}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={JSON.stringify(filterTypes.status || undefined)}
                        dataName="Name"
                        placeholder="Status"
                    />
                </div>
                <button className="add-btn" onClick={onFilter} >Filters</button>

            </div>
            <div className="page-container">
                <div className="tablele-width">
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={communicationsData}
                        scroll={{
                            y: '60vh',
                        }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => onClickRow(record),
                            };
                        }}
                        columns={tableHeaders}
                        pagination={false}
                    />
                </div>

            </div>

            <Modal title={"Create New Group"}
                visible={modalVisible}
                onCancel={toggleModal}
                okText='Done'
                onOk={onOk}
                centered={true}
                width={470} >
                <div className="user-input-box create-basket-container" >
                    <div className="m-b-10">Basket ID: </div>
                    <div className="m-b-10">
                        <Input placeholder="Basket Name" value={newGroupData.name} onChange={(e) => onChangeNewGroupField(e, 'name')} />
                    </div>
                    <div className="m-b-10">Basket Type</div>
                    <div className="m-b-10">
                        <Switch
                            checkedChildren='One Time'
                            unCheckedChildren='Recurrning'
                        />
                    </div>

                    <div className="group-hint-text m-b-10">You can set configuration once basket is created</div>
                    <div className="m-b-10">
                        <StarDropdown
                            values={dropDownData.type}
                            onChange={e => onChangeFilterType(e, 'type')}
                            selected={JSON.stringify(filterTypes.type || undefined)}
                            dataName="Name"
                            placeholder="Communication Type"
                        />
                    </div>
                    <div className="m-b-10">
                        <Input placeholder="Description" value={newGroupData.description} onChange={(e) => onChangeNewGroupField(e, 'description')} lines={5} />
                    </div>

                    <div className="n-float" />
                </div>
            </Modal>
        </>

    )
}

export default CommunicationBaskets;