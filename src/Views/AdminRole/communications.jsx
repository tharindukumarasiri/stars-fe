import React, { useState } from "react";
import { Table } from 'antd';

import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { CommunicationsTableHeaders, CommunicationsSubTableHeaders } from '../../utils/tableHeaders'
import Dropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import Input from '../../common/input'

const Communications = () => {
    const [filterTypes, setFilterTypes] = useState({ entity: '', status: '', type: '', fromDate: null, toDate: null })
    const [searchText, setSearchText] = useState('');

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setFilterTypes({ ...filterTypes, [elementName]: e.target.value });
    }

    const onFilterTypeDateChange = (date, elementName) => {
        setFilterTypes({ ...filterTypes, [elementName]: date });
    };

    const expandedRowRender = () => {
        return (
            <div className="sub-table-padding">
                <Table
                    columns={CommunicationsSubTableHeaders}
                    dataSource={[{ Id: 'sdcsc' }]}
                    pagination={false}
                    showHeader={false}
                />
            </div>
        );
    };

    return (
        <>
            <div className="com-top-container">
                <div className="filter-by-text">Filter By:</div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={['aa', 'bb']}
                        onChange={e => onChangeFilterType(e, 'entity')}
                        selected={filterTypes.entity}
                        placeholder="Entity"
                    />
                </div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={['aa', 'bb']}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={filterTypes.status}
                        placeholder="Status"
                    />                </div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={['aa', 'bb']}
                        onChange={e => onChangeFilterType(e, 'type')}
                        selected={filterTypes.type}
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
                    />                </div>
                <div className="com-search-input-container">
                    <div className="search-input-container" >
                        <Input placeholder="Search By Name or Org. ID" value={searchText} onChange={onChangeSearchText} endImage='icon-search-1' />
                    </div>
                    <button className="add-btn" >Filters</button>
                </div>

            </div>
            <div className="page-container">
                <div className="tablele-width">
                    <Table
                        rowKey={(record) => record?.id}
                        dataSource={[{ Id: 'ddd' }]}
                        scroll={{
                            y: '60vh',
                        }}
                        columns={CommunicationsTableHeaders}
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

export default Communications;