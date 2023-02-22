import React, { useState, useEffect, useMemo, useContext } from "react";
import { Modal, Table, Tooltip, Switch, message, Pagination } from 'antd';

import { CommunicationBasketsTableHeaders } from '../../utils/tableHeaders'
import StarDropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import Input from '../../common/input'
import { NAVIGATION_PAGES } from "../../utils/enums";
import { TabContext } from "../../utils/contextStore";
import {
    getCommunicationBasket,
    getCommunicationBasketTypes,
    getCommunicationBasketStatuses,
    addCommunicationBasket,
    getCommunicationMessageTypes,
    deleteCommunicationBasket
} from "../../services/communicationService";
import { FetchCurrentUser } from "../../hooks/index"

const pageSize = 10
const firstReqParams = {
    "PageSize": pageSize,
    "PageCount": 0
}

const CommunicationBaskets = () => {
    const [dropDownData, setDropDownData] = useState({ type: [], status: [], comType: [] })
    const [filterTypes, setFilterTypes] = useState({ startDate: null, endDate: null, type: null, status: null })
    const [communicationsData, setCommunicationsData] = useState([])
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newGroupData, setNewGroupData] = useState({ name: '', basketType: true, communicationType: null, description: '' });
    const [newGroupDataErrors, setNewGroupDataErrors] = useState({ name: '' });
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const [currentUser] = FetchCurrentUser();
    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        Promise.all([
            getCommunicationBasket(firstReqParams).then(result => {
                setCommunicationsData(result?.Value);
                setTotalResults(result?.Key);
            }),
            getCommunicationBasketTypes().then(result => {
                setDropDownData(pre => ({ ...pre, type: result }))
            }),
            getCommunicationBasketStatuses().then(result => {
                setDropDownData(pre => ({ ...pre, status: result }))
            }),
            getCommunicationMessageTypes().then(result => {
                setDropDownData(pre => ({ ...pre, comType: result }))
            }),
        ]).finally(() => setLoading(false));
    }, []);

    const onLogClick = (e, Id) => {
        e.stopPropagation();
        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_LOG, { "basketId": Id })
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        setLoading(true);
        const payload = [currentUser?.PartyId, id];
        const params = {
            "BasketStatusId": filterTypes?.status?.Id,
            "BasketTypeId": filterTypes?.type?.Id,
            "FromDate": filterTypes.startDate,
            "ToDate": filterTypes.endDate,
            "PageSize": pageSize,
            "PageCount": pageNumber
        }

        deleteCommunicationBasket(payload).then(() => {
            getCommunicationBasket(params).then(result => {
                setCommunicationsData(result?.Value);
                setTotalResults(result?.Key);
                message.success('Delete Successful');
                setLoading(false);
            });
        }).catch(() => {
            setLoading(false);
            message.error('Delete failed');
        })
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
            dataIndex: ['FromDateTime', 'ToDateTime'],
            render: (_, { FromDateTime, ToDateTime }) => (
                <i className={(FromDateTime || ToDateTime) ? 'icon-config basket-table-icon hover-hand green' : 'icon-config basket-table-icon hover-hand  blue'} />
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

    }, [communicationsData])

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setFilterTypes({ ...filterTypes, [elementName]: JSON.parse(e.target.value) });
    }

    const onFilterTypeDateChange = (date, elementName) => {
        setFilterTypes({ ...filterTypes, [elementName]: date });
    };

    const onFilter = (e) => {
        e.preventDefault();
        setLoading(true);
        const params = {
            "BasketStatusId": filterTypes?.status?.Id,
            "BasketTypeId": filterTypes?.type?.Id,
            "FromDate": filterTypes.startDate,
            "ToDate": filterTypes.endDate,
            "PageSize": pageSize,
            "PageCount": pageNumber
        }

        getCommunicationBasket(params).then(result => {
            setCommunicationsData(result);
        }).finally(() => setLoading(false));
    }

    const toggleModal = () => {
        setModalVisible(pre => !pre)
    }

    const validateFields = () => {
        let validation = true
        if (!newGroupData.name) {
            setNewGroupDataErrors(pre => ({ ...pre, name: 'Name cannot be empty' }))
            validation = false
        }
        if (!newGroupData.communicationType) {
            message.error('Communication type cannot be empty')
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
                "Description": newGroupData.description
            }

            addCommunicationBasket(params).then(() => {
                toggleModal();
                message.success("Create basket successful");
                getCommunicationBasket(firstReqParams).then(result => {
                    setCommunicationsData(result);
                }).finally(() => setLoading(false));
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

        getCommunicationBasket(params).then(result => {
            setCommunicationsData(result?.Value);
            setLoading(false)
            setPageNumber(pageNumb)
            setTotalResults(result?.Key)
        }).catch(() => setLoading(false))
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
                <div className="flex-center-middle m-t-20">
                    <Pagination size="small" current={pageNumber + 1} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
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