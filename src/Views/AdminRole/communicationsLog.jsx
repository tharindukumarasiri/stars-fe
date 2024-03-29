import React, { useState, useEffect } from "react";
import { Table, Pagination } from 'antd';

import { CommunicationsLogTableHeaders, CommunicationsSubTableHeaders } from '../../utils/tableHeaders'
import Dropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import Input from '../../common/input'
import { getCommunicationLogs, getCommunicationLogsByBasket, getCommunicationEntities, getCommunicationMessageTypes, getCommunicationMessageStatuses, getCommunicationLogsSubLvl } from "../../services/communicationService";
import { useTranslation } from "react-i18next";
const pageSize = 10;

const CommunicationsLog = ({ props }) => {
    const [dropDownData, setDropDownData] = useState({ entity: [], status: [], type: [] })
    const [filterTypes, setFilterTypes] = useState({ entity: null, status: null, type: null, fromDate: null, toDate: null })
    const [searchText, setSearchText] = useState('');
    const [communicationsData, setCommunicationsData] = useState([])
    const [communicationsDataExpanded, setCommunicationsDataExpanded] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    const getBasketApi = () => {
        if (props?.basketId) {
            const params = {
                "CommunicationBasketId": props?.basketId,
                "PageSize": pageSize,
                "PageCount": 1
            }
            return getCommunicationLogsByBasket(params)
        } else {
            const params = {
                "PageSize": pageSize,
                "PageCount": 1
            }
            return getCommunicationLogs(params)
        }
    }

    useEffect(() => {
        Promise.all([
            getBasketApi().then(result => {
                setCommunicationsData(result?.Value);
                setTotalResults(result?.Key);
            }),
            getCommunicationEntities().then(result => {
                setDropDownData(pre => ({ ...pre, entity: result }))
            }),
            getCommunicationMessageTypes().then(result => {
                setDropDownData(pre => ({ ...pre, type: result }))
            }),
            getCommunicationMessageStatuses().then(result => {
                setDropDownData(pre => ({ ...pre, status: result }))
            })
        ]).finally(() => setLoading(false));

    }, []);

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setFilterTypes({ ...filterTypes, [elementName]: JSON.parse(e.target.value) });
    }

    const onFilterTypeDateChange = (date, elementName) => {
        setFilterTypes({ ...filterTypes, [elementName]: date });
    };

    const expandedRowRender = (parentRow) => {
        const dataObj = communicationsDataExpanded?.find(row => row?.id === parentRow?.Id)

        return (
            <div className="sub-table-padding">
                <Table
                    columns={CommunicationsSubTableHeaders(t)}
                    dataSource={dataObj?.data}
                    pagination={false}
                    showHeader={false}
                />
            </div>
        );
    };

    const onFilter = () => {
        setLoading(true)

        const params = {
            "TenantId": filterTypes?.entity?.Id,
            "StatusId": filterTypes?.status?.Id,
            "MessageTypeId": filterTypes?.type?.Id,
            "FromDate": filterTypes.fromDate,
            "ToDate": filterTypes.toDate,
            "SearchText": searchText,
            "PageSize": pageSize,
            "PageCount": 1
        }

        getCommunicationLogs(params).then(result => {
            setCommunicationsData(result?.Value);
            setTotalResults(result?.Key);
            setLoading(false);
            setPageNumber(1);
        });

    }

    const onChangePage = (pageNumb) => {
        setLoading(true);

        const params = {
            "TenantId": filterTypes?.entity?.Id,
            "StatusId": filterTypes?.status?.Id,
            "MessageTypeId": filterTypes?.type?.Id,
            "FromDate": filterTypes.fromDate,
            "ToDate": filterTypes.toDate,
            "SearchText": searchText,
            "PageSize": pageSize,
            "PageCount": pageNumb
        }

        getCommunicationLogs(params).then(result => {
            setCommunicationsData(result?.Value);
            setTotalResults(result?.Key);
            setLoading(false);
            setPageNumber(pageNumb);
        });
    }

    const onExpand = (expanded, rowData) => {
        const index = communicationsDataExpanded.findIndex(row => row.id === rowData?.Id)
        if (expanded && index < 0) {
            setLoading(true)
            getCommunicationLogsSubLvl(rowData?.Id).then(result => {
                const newData = [...communicationsDataExpanded];
                newData.push({ id: rowData?.Id, data: result });
                setCommunicationsDataExpanded(newData);
            }).finally(() => setLoading(false))
        }
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
                <div className="filter-by-text">{t('FILTER_BY')}:</div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={dropDownData.entity}
                        onChange={e => onChangeFilterType(e, 'entity')}
                        selected={JSON.stringify(filterTypes.entity || undefined)}
                        dataName="Name"
                        placeholder="ENTITY_TENANT_CLIENT"
                    />
                </div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={dropDownData.status}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={JSON.stringify(filterTypes.status || undefined)}
                        dataName="Name"
                        placeholder="STATUS"
                    />
                </div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={dropDownData.type}
                        onChange={e => onChangeFilterType(e, 'type')}
                        selected={JSON.stringify(filterTypes.type || undefined)}
                        dataName="Name"
                        placeholder="TYPE"
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='FROM_DATE'
                        value={filterTypes.fromDate}
                        onChange={(date) => onFilterTypeDateChange(date, "fromDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='TO_DATE'
                        value={filterTypes.toDate}
                        onChange={(date) => onFilterTypeDateChange(date, "toDate")}
                        isClearable
                    />
                </div>
                <div className="com-search-input-container">
                    <div className="search-input-container" >
                        <Input placeholder="SEARCH_NAME_ORG" value={searchText} onChange={onChangeSearchText} endImage='icon-search-1' />
                    </div>
                    <button className="add-btn" onClick={onFilter} >{t('FILTERS')}</button>
                </div>

            </div>
            <div className="page-container">
                <div className="tablele-width expandable-table-btn">
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={communicationsData}
                        scroll={{
                            y: '60vh',
                        }}
                        columns={CommunicationsLogTableHeaders(t)}
                        pagination={false}
                        expandable={{
                            expandedRowRender,
                            defaultExpandedRowKeys: ['0'],
                            onExpand,
                        }}
                    />
                </div>
                <div className="action-bar p-t-10 p-r-10">
                    <div className="flex-center-middle m-t-10">
                        <Pagination size="small" current={pageNumber} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
                    </div>
                </div>
            </div>
        </>

    )
}

export default CommunicationsLog;