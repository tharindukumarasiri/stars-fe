import React, { useState, useEffect, useMemo, useContext } from "react";
import { Modal, Table, Tooltip, Switch, message, Pagination } from 'antd';

import { CommunicationBasketsTableHeaders } from '../../../utils/tableHeaders'
import StarDropdown from "../../../common/dropdown";
import DatePickerInput from "../../../common/datePickerInput";
import Input from '../../../common/input'
import { NAVIGATION_PAGES } from "../../../utils/enums";
import { TabContext } from "../../../utils/contextStore";
import {
    getCommunicationBasket,
    getCommunicationBasketTypes,
    getCommunicationBasketStatuses,
    addCommunicationBasket,
    getCommunicationMessageTypes,
    deleteCommunicationBasket
} from "../../../services/communicationService";
import { getTenantMessageTemplates } from "../../../services/templateService";
import { FetchCurrentUser, FetchCurrentCompany } from "../../../hooks/index"
import TimeConfig from "../Components/timeConfig";

const pageSize = 10;

const CommunicationBaskets = () => {
    const [dropDownData, setDropDownData] = useState({ type: [], status: [], comType: [] })
    const [filterTypes, setFilterTypes] = useState({ startDate: null, endDate: null, type: null, status: null })
    const [communicationsData, setCommunicationsData] = useState([])
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [configModalVisible, setConfigModalVisible] = useState(false);
    const [newGroupData, setNewGroupData] = useState({ name: '', basketType: true, communicationType: null, description: '' });
    const [newGroupDataErrors, setNewGroupDataErrors] = useState({ name: '', communicationType: '' });
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [configBasketId, setConfigBasketId] = useState('');

    const [currentUser] = FetchCurrentUser();
    const [selectedCompany] = FetchCurrentCompany();

    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        getCommunicationBasketTypes().then(result => {
            setDropDownData(pre => ({ ...pre, type: result }))
        })
        getCommunicationBasketStatuses().then(result => {
            setDropDownData(pre => ({ ...pre, status: result }))
        })
    }, []);

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            getTenantMessageTemplates(selectedCompany?.companyPartyId, 1).then(result => {
                setDropDownData(pre => ({ ...pre, comType: result.Value }))
            })
            getCommunicationBasketData()
        }
    }, [selectedCompany]);

    const getCommunicationBasketData = (pgNumb = pageNumber) => {
        setLoading(true)
        const params = {
            "BasketStatusId": filterTypes?.status?.Id,
            "BasketTypeId": filterTypes?.type?.Id,
            "FromDate": filterTypes.startDate,
            "ToDate": filterTypes.endDate,
            "PageSize": pageSize,
            "PageCount": pgNumb,
            "CompanyPartyId": selectedCompany?.companyPartyId
        }

        getCommunicationBasket(params).then(result => {
            setCommunicationsData(result?.Value);
            setTotalResults(result?.Key);
        }).finally(() => setLoading(false))
    }

    const onLogClick = (e, Id) => {
        e.stopPropagation();
        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_LOG, { "basketId": Id })
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        setLoading(true);
        const payload = [currentUser?.PartyId, id];

        deleteCommunicationBasket(payload).then(() => {
            message.success('Delete Successful');
            getCommunicationBasketData();
        }).catch(() => {
            setLoading(false);
            message.error('Delete failed');
        })
    }

    const onConfig = (e, id) => {
        e.stopPropagation();
        toggleConfigModal();
        setConfigBasketId(id)
    }

    const tableHeaders = useMemo(() => {
        const headers = CommunicationBasketsTableHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: 'Logs',
            dataIndex: 'Id',
            render: (_, { Id }) => (
                <i className=" icon-log basket-table-icon blue hover-hand" onClick={(e) => onLogClick(e, Id)} />
            ),
            width: 80,

        }, {
            title: 'Config.',
            dataIndex: ['FromDateTime', 'ToDateTime', 'Id'],
            render: (_, { FromDateTime, ToDateTime, Id }) => (
                <i className={(FromDateTime || ToDateTime) ? 'icon-config basket-table-icon hover-hand green' : 'icon-config basket-table-icon hover-hand  blue'}
                    onClick={(e) => onConfig(e, Id)} />
            ),
            width: 80,
        }, {
            title: '',
            dataIndex: ['BasketStatus', 'Id'],
            render: (_, { BasketStatus, Id }) => (
                <>
                    {BasketStatus?.Name === "CLOSED" ?
                        <Tooltip title='Archive' >
                            <i className="icon-archive basket-table-icon hover-hand" />
                        </Tooltip> :
                        <i className="icon-delete-1 basket-table-icon red hover-hand"
                            onClick={(e) => onDelete(e, Id)}
                        />
                    }
                </>
            ),
            width: 80,
        },
        )

        return headers

    }, [communicationsData, currentUser])

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setFilterTypes({ ...filterTypes, [elementName]: JSON.parse(e.target.value) });
    }

    const onFilterTypeDateChange = (date, elementName) => {
        setFilterTypes({ ...filterTypes, [elementName]: date });
    };

    const onFilter = (e) => {
        e.preventDefault();
        getCommunicationBasketData();
        setPageNumber(0);
    }

    const toggleModal = () => {
        setModalVisible(pre => !pre)
    }

    const toggleConfigModal = () => {
        setConfigModalVisible(pre => !pre)
    }

    const onUpdateSuccess = () => {
        toggleConfigModal();
        getCommunicationBasketData();
    }

    const validateFields = () => {
        let validation = true
        if (!newGroupData.name) {
            setNewGroupDataErrors(pre => ({ ...pre, name: 'Name cannot be empty' }))
            validation = false
        }
        if (!newGroupData.communicationType) {
            setNewGroupDataErrors(pre => ({ ...pre, communicationType: 'Please select a template' }))
            validation = false
        }

        return validation;
    }

    const onOk = () => {
        if (validateFields()) {
            setLoading(true);
            const params = {
                "Name": newGroupData.name,
                "BasketTypeId": newGroupData.basketType ? 1 : 2,
                "MessageTypeId": JSON.parse(newGroupData?.communicationType)?.Id,
                "Description": newGroupData.description,
                "CompanyPartyId": selectedCompany?.companyPartyId
            }

            addCommunicationBasket(params).then(() => {
                toggleModal();
                message.success("Create basket successful");
                setNewGroupData({ name: '', basketType: true, communicationType: null, description: '' })
                getCommunicationBasketData();
            }).catch(() => {
                message.error("Create basket failed please try again");
                setLoading(false);
            })
        }
    }

    const onChangePage = (page) => {
        setLoading(true);
        const pageNumb = page - 1
        const params = {
            "BasketStatusId": filterTypes?.status?.Id,
            "BasketTypeId": filterTypes?.type?.Id,
            "FromDate": filterTypes.startDate,
            "ToDate": filterTypes.endDate,
            "PageSize": pageSize,
            "PageCount": pageNumb
        }

        setPageNumber(pageNumb)
        getCommunicationBasketData();
    }

    const onChangeNewGroupField = (e, fieldName) => {
        e.preventDefault();
        setNewGroupData({ ...newGroupData, [fieldName]: e.target.value })
    }

    const onToggle = (val) => {
        setNewGroupData({ ...newGroupData, basketType: val })
    }

    const onClickRow = (params) => {
        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS, params)
    }

    return (
        <>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="com-top-container user-input-box">
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
                <div className="flex-center-middle m-t-20">
                    <Pagination size="small" current={pageNumber + 1} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
                </div>
            </div>

            <Modal title={"Basket Config."}
                visible={configModalVisible}
                onCancel={toggleConfigModal}
                centered={true}
                footer={null}
                width={470} >
                <div className="user-input-box create-basket-container" >
                    <TimeConfig Id={configBasketId} onUpdateSuccess={onUpdateSuccess} />
                    <div className="n-float" />
                </div>
            </Modal>

            <Modal title={"Create New Group"}
                visible={modalVisible}
                onCancel={toggleModal}
                okText='Done'
                onOk={onOk}
                centered={true}
                width={470} >
                <div className="user-input-box create-basket-container" >
                    <div className="m-b-10">
                        <Input placeholder="Basket Name"
                            value={newGroupData.name}
                            onChange={(e) => onChangeNewGroupField(e, 'name')}
                            error={newGroupDataErrors?.name}
                        />
                    </div>
                    <div className="m-b-10">Basket Type</div>
                    <div className="m-b-10">
                        <Switch
                            checkedChildren='One Time'
                            unCheckedChildren='Recurrning'
                            checked={newGroupData.basketType}
                            onChange={onToggle}
                        />
                    </div>

                    <div className="group-hint-text m-b-10">You can set configuration once basket is created</div>
                    <div className="m-b-10">
                        <StarDropdown
                            values={dropDownData.comType}
                            onChange={(e) => onChangeNewGroupField(e, 'communicationType')}
                            selected={newGroupData.communicationType}
                            dataName="DisplayName"
                            placeholder="Communication Template"
                            error={newGroupDataErrors.communicationType}
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