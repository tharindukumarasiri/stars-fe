import React, { useState, useEffect, useMemo, useContext } from "react";
import { Table, Tooltip, message, Pagination } from 'antd';

import { useUserStore, useBasketStore, useTimeConfigStore } from '../adminRoleStore'

import { CommunicationBasketsTableHeaders } from '../../../utils/tableHeaders'
import StarDropdown from "../../../common/dropdown";
import DatePickerInput from "../../../common/datePickerInput";
import { NAVIGATION_PAGES } from "../../../utils/enums";
import { TabContext } from "../../../utils/contextStore";
import {
    getCommunicationBasketStatuses,
    getCommunicationBasketTypes,
    deleteCommunicationBasket,
} from "../../../services/communicationService";
import { useTranslation } from "react-i18next";
import { schedulingTypes, recurringTypes } from "../../../utils/constants";

const scheduleType = (typeId) => {
    switch (typeId) {
        case 1:
            return schedulingTypes.IMMIDIATE
        case 2:
            return schedulingTypes.PLANNED
        case 3:
            return schedulingTypes.RECURRING
        default:
            return schedulingTypes.IMMIDIATE
    }
}

const getBasketRecurringTypeId = (typeId) => {
    switch (typeId) {
        case 1:
            return recurringTypes.DALY;
        case 2:
            return recurringTypes.WEEKLY;
        case 3:
            return recurringTypes.MONTHLY;
        default:
            return recurringTypes.DALY;
    }
}

const pageSize = 10;

const CommunicationBaskets = () => {
    const selectedCompany = useUserStore((state) => state.selectedCompany);
    const currentUser = useUserStore((state) => state.currentUser);

    const communicationsData = useBasketStore((state) => state.communicationBasketData);
    const getCommunicationsData = useBasketStore((state) => state.getCommunicationBasketData);
    const totalResults = useBasketStore((state) => state.communicationBasketTotalResults);
    const loading = useBasketStore((state) => state.loading);
    const setLoading = useBasketStore((state) => state.setLoading);
    const pageNumber = useBasketStore((state) => state.pageNumber);
    const setPageNumber = useBasketStore((state) => state.setPageNumber);

    const setSchedulingType = useTimeConfigStore((state) => state.setSchedulingType);
    const setoneTimeData = useTimeConfigStore((state) => state.setoneTimeData);
    const setRecurringeData = useTimeConfigStore((state) => state.setRecurringeData);
    const setRecurringeDaily = useTimeConfigStore((state) => state.setRecurringeDaily);
    const setRecurringeWeekly = useTimeConfigStore((state) => state.setRecurringeWeekly);
    const resetTimeConfigs = useTimeConfigStore((state) => state.resetTimeConfigs);

    const [dropDownData, setDropDownData] = useState({ type: [], status: [] })
    const [filterTypes, setFilterTypes] = useState({ startDate: null, endDate: null, type: null, status: null })

    const { t } = useTranslation();

    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        getCommunicationBasketStatuses().then(result => {
            setDropDownData(pre => ({ ...pre, status: result }))
        })
        getCommunicationBasketTypes().then(result => {
            setDropDownData(pre => ({ ...pre, type: result }))
        })
    }, []);

    useEffect(() => {
        if (selectedCompany?.companyPartyId && communicationsData.length === 0) {
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

        getCommunicationsData(params)
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

    const tableHeaders = useMemo(() => {
        const headers = CommunicationBasketsTableHeaders(t);
        headers.push({
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
        resetTimeConfigs()
        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS, {})
    }

    const onChangePage = (pageNumb) => {
        setLoading(true);
        setPageNumber(pageNumb)
        getCommunicationBasketData(pageNumb);
    }

    const onClickRow = (params) => {
        setSchedulingType(scheduleType(params?.BasketTypeId));
        setoneTimeData({
            date: params?.FromDateTime || null,
            time: null,
            deleteReciver: params?.IsDeleteReceivers || false
        });
        setRecurringeData({
            startDate: params?.FromDateTime || null,
            endDate: params?.ToDateTime || null,
            recurringType: getBasketRecurringTypeId(params?.BasketRecurringTypeId)
        });
        setRecurringeDaily({
            isEveryDay: true,
            everyDayCount: params?.Frequency || 1,
            nextTime: null
        });
        setRecurringeWeekly({
            recurEveryCount: params?.Frequency || 1,
            selectedDays: [],
            nextDate: params?.NextScheduledDateTime || null,
            nextTime: null
        })

        changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS, { ...params })
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
        </div>

    )
}

export default CommunicationBaskets;