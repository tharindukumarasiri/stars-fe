import React, { useState, useEffect } from "react";
import { Table } from 'antd';

import { CommunicationsLogTableHeaders, CommunicationsSubTableHeaders } from '../../utils/tableHeaders'
import Dropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import Input from '../../common/input'
import { getCommunicationLogs, getCommunicationEntities, getCommunicationMessageTypes, getCommunicationMessageStatuses } from "../../services/communicationService";

const CommunicationsLog = () => {
    const [dropDownData, setDropDownData] = useState({ entity: [], status: [], type: [] })
    const [filterTypes, setFilterTypes] = useState({ entity: null, status: null, type: null, fromDate: null, toDate: null })
    const [searchText, setSearchText] = useState('');
    const [communicationsData, setCommunicationsData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getCommunicationLogs({}).then(result => {
                setCommunicationsData(result);
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

    const expandedRowRender = () => {
        return (
            <div className="sub-table-padding">
                <Table
                    columns={CommunicationsSubTableHeaders}
                    dataSource={communicationsData}
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
            "DistributionStatusId": filterTypes?.status?.Id,
            "MessageTypeId": filterTypes?.type?.Id,
            "FromDate": filterTypes.fromDate,
            "ToDate": filterTypes.toDate,
            "SearchText": searchText
        }

        getCommunicationLogs(params).then(result => {
            setCommunicationsData(result);
            setLoading(false);
        });

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
                <div className="filter-by-text">Filter By:</div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={dropDownData.entity}
                        onChange={e => onChangeFilterType(e, 'entity')}
                        selected={JSON.stringify(filterTypes.entity || undefined)}
                        dataName="Name"
                        placeholder="Entity(Tenant/Client)"
                    />
                </div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={dropDownData.status}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={JSON.stringify(filterTypes.status || undefined)}
                        dataName="Name"
                        placeholder="Status"
                    />
                </div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={dropDownData.type}
                        onChange={e => onChangeFilterType(e, 'type')}
                        selected={JSON.stringify(filterTypes.type || undefined)}
                        dataName="Name"
                        placeholder="Type"
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='From Date'
                        value={filterTypes.fromDate}
                        onChange={(date) => onFilterTypeDateChange(date, "fromDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='To Date'
                        value={filterTypes.toDate}
                        onChange={(date) => onFilterTypeDateChange(date, "toDate")}
                        isClearable
                    />
                </div>
                <div className="com-search-input-container">
                    <div className="search-input-container" >
                        <Input placeholder="Search By Name or Org. ID" value={searchText} onChange={onChangeSearchText} endImage='icon-search-1' />
                    </div>
                    <button className="add-btn" onClick={onFilter} >Filters</button>
                </div>

            </div>
            <div className="page-container">
                <div className="tablele-width">
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={communicationsData}
                        scroll={{
                            y: '60vh',
                        }}
                        columns={CommunicationsLogTableHeaders}
                        pagination={false}
                        expandable={{
                            expandedRowRender,
                            defaultExpandedRowKeys: ['0'],
                        }}
                    />
                </div>
            </div>
        </>

    )
}

export default CommunicationsLog;