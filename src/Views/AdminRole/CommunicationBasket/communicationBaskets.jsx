import React, { useState, useEffect, useMemo, useContext } from "react";
import { Modal, Table, Tooltip, message, Pagination } from 'antd';

import { CommunicationBasketsTableHeaders } from '../../../utils/tableHeaders'
import StarDropdown from "../../../common/dropdown";
import DatePickerInput from "../../../common/datePickerInput";
import Input from '../../../common/input'
import { NAVIGATION_PAGES } from "../../../utils/enums";
import { TabContext } from "../../../utils/contextStore";
import {
    getCommunicationBasket,
    getCommunicationBasketStatuses,
    addCommunicationBasket,
    deleteCommunicationBasket,
} from "../../../services/communicationService";
import { GetCommunicationTemplatesByTenant } from "../../../services/templateService";
import { FetchCurrentUser, FetchCurrentCompany } from "../../../hooks/index"
import TimeConfig from "../Components/timeConfig";
import { useTranslation } from "react-i18next";

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
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [configBasketId, setConfigBasketId] = useState('');
    const {t} = useTranslation();

    const [currentUser] = FetchCurrentUser();
    const [selectedCompany] = FetchCurrentCompany();
    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        getCommunicationBasketStatuses().then(result => {
            setDropDownData(pre => ({ ...pre, status: result }))
        })
    }, []);

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            GetCommunicationTemplatesByTenant(selectedCompany?.companyPartyId, 1).then(result => {
                setDropDownData(pre => ({ ...pre, comType: result }))
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
            message.success(t('DELETE_SUCCESSFUL'));
            getCommunicationBasketData();
        }).catch(() => {
            setLoading(false);
            message.error(t('DELETE_FAILED'));
        })
    }

    const onConfig = (e, id) => {
        e.stopPropagation();
        toggleConfigModal();
        setConfigBasketId(id)
    }

    const tableHeaders = useMemo(() => {
        const headers = CommunicationBasketsTableHeaders(t);
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
        setPageNumber(1);
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
                "MessageTypeId": JSON.parse(newGroupData?.communicationType)?.MessageTypeId,
                "Description": newGroupData.description,
                "CompanyPartyId": selectedCompany?.companyPartyId
            }

            addCommunicationBasket(params).then(() => {
                toggleModal();
                message.success(t('CREATE_BASKET_SUCESS'));
                setNewGroupData({ name: '', basketType: true, communicationType: null, description: '' })
                getCommunicationBasketData();
            }).catch(() => {
                message.error(t('CREATE_BASKET_FAILED'));
                setLoading(false);
            })
        }
    }

    const onChangePage = (pageNumb) => {
        setLoading(true);
        setPageNumber(pageNumb)
        getCommunicationBasketData();
    }

    const onChangeNewGroupField = (e, fieldName) => {
        e.preventDefault();
        setNewGroupData({ ...newGroupData, [fieldName]: e.target.value })
    }

    const onToggle = (val) => {
        setNewGroupData({ ...newGroupData, basketType: !newGroupData.basketType })
    }

    const onClickRow = (params) => {
        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS, params)
    }

    return (
        <div className={loading ? 'loading-overlay' : ''}>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="com-top-container user-input-box">
                <div className="create-new-btn">
                    <button className="add-btn" onClick={toggleModal} >{t('CREATE_NEW')}</button>
                </div>

                <div className="filter-by-text">{t('FILTER_BY')}:</div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder={t('START_DATE')}
                        value={filterTypes.startDate}
                        onChange={(date) => onFilterTypeDateChange(date, "startDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder={t('END_DATE')}
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
                        placeholder='TYPE'
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.status}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={JSON.stringify(filterTypes.status || undefined)}
                        dataName="Name"
                        placeholder='STATUS'
                    />
                </div>
                <button className="add-btn" onClick={onFilter} >{t('FILTERS')}</button>

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
                <div className="action-bar">
                    <div className="flex-center-middle m-t-20">
                        <Pagination size="small" current={pageNumber} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
                    </div>
                </div>
            </div>

            <Modal title={t('BASKET_CONFIG')}
                visible={configModalVisible}
                onCancel={toggleConfigModal}
                centered={true}
                footer={null}
                width={470}
                closeIcon={< i className='icon-close close-icon' />}>
                <div className="user-input-box create-basket-container" >
                    <TimeConfig Id={configBasketId} onUpdateSuccess={onUpdateSuccess} />
                    <div className="n-float" />
                </div>
            </Modal>

            <Modal title={t('CREATE_NEW_BASKET')}
                visible={modalVisible}
                cancelText={t('CANCEL')}
                onCancel={toggleModal}
                okText={t('DONE')}
                onOk={onOk}
                centered={true}
                width={470}
                closeIcon={< i className='icon-close close-icon' />}>
                <div className="user-input-box create-basket-container" >
                    <div className="m-b-10">
                        <Input placeholder='BASKET_NAME'
                            value={newGroupData.name}
                            onChange={(e) => onChangeNewGroupField(e, 'name')}
                            error={newGroupDataErrors?.name}
                        />
                    </div>
                    <div className="m-b-10">{t('BASKET_TYPE')}</div>
                    <div className="m-b-10">
                        <input type="radio" id="OneTime" name="OneTime" checked={newGroupData.basketType} onChange={onToggle} />{" "}
                        <label className="p-r-20 p-l-20 m-r-20" htmlFor="OneTime">
                            {t('ONE_TIME')}
                        </label>
                        <input type="radio" id="Recurring" name="Recurring" checked={!newGroupData.basketType} onChange={onToggle} />{" "}
                        <label className="p-r-20 p-l-20 m-r-20" htmlFor="Recurring">
                            {t('RECURRING')}
                        </label>
                    </div>

                    <div className="group-hint-text m-b-10">{t('BASKET_CONFIG_MSG')}</div>
                    <div className="m-b-10">
                        <StarDropdown
                            values={dropDownData.comType}
                            onChange={(e) => onChangeNewGroupField(e, 'communicationType')}
                            selected={newGroupData.communicationType}
                            dataName="DisplayName"
                            placeholder='COMMUNICATION_TEMPLATE'
                            error={newGroupDataErrors.communicationType}
                        />
                    </div>
                    <div className="m-b-10">
                        <Input placeholder="DESCRIPTION" value={newGroupData.description} onChange={(e) => onChangeNewGroupField(e, 'description')} lines={5} />
                    </div>
                    <div className="n-float" />
                </div>
            </Modal>
        </div>

    )
}

export default CommunicationBaskets;