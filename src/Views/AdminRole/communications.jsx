import React, { useState, useEffect } from "react";
import { Table } from 'antd';

import Dropdown from "../../common/dropdown";
import Input from '../../common/input'
import { CommunicationsTableHeaders, } from '../../utils/tableHeaders'

const Communications = () => {
    const [dropDownData, setDropDownData] = useState({ status: [], category: [], type: [] })
    const [dropDownSelected, setDropDownSelected] = useState({ status: null, category: null, type: null })
    const [searchText, setSearchText] = useState('');
    const [communicationsData, setCommunicationsData] = useState([{}])
    const [loading, setLoading] = useState(true);

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setDropDownSelected({ ...dropDownSelected, [elementName]: JSON.parse(e.target.value) });
    }

    const onFilter = (e) => {
        setLoading(false)
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
                        values={dropDownData.status}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={JSON.stringify(dropDownSelected.status)}
                        dataName="Name"
                        placeholder="Status"
                    />
                </div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={dropDownData.category}
                        onChange={e => onChangeFilterType(e, 'category')}
                        selected={JSON.stringify(dropDownSelected.category)}
                        dataName="Name"
                        placeholder="Category"
                    />
                </div>
                <div className="com-drop-down-width">
                    <Dropdown
                        values={dropDownData.type}
                        onChange={e => onChangeFilterType(e, 'type')}
                        selected={JSON.stringify(dropDownSelected.type)}
                        dataName="Name"
                        placeholder="Type"
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
                        columns={CommunicationsTableHeaders}
                        pagination={false}
                    />
                </div>
            </div>
        </>
    )
}

export default Communications;