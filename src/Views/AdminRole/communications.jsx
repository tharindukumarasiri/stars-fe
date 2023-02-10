import React, { useState, useEffect, useMemo } from "react";
import { Table, Tabs, Dropdown, Menu } from 'antd';

import StarDropdown from "../../common/dropdown";
import Input from '../../common/input'
import { CommunicationsTableHeaders } from '../../utils/tableHeaders'
import DatePickerInput from "../../common/datePickerInput";
import { getCommunicationsList, getCommunicationMessageTypes, getCommunicationMessageStatuses } from "../../services/communicationService";

const { TabPane } = Tabs;

const actions = (
    <Menu>
        <Menu.Item>Remind</Menu.Item>
        <Menu.Item>Manage</Menu.Item>
        <Menu.Item>Archive</Menu.Item>
        <Menu.Item>Delete</Menu.Item>
    </Menu>
);

const Communications = () => {
    const [dropDownData, setDropDownData] = useState({ status: [], type: [] })
    const [dropDownSelected, setDropDownSelected] = useState({ status: null, type: null, fromDate: null, toDate: null })
    const [searchText, setSearchText] = useState('');
    const [communicationsData, setCommunicationsData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getCommunicationsList({}).then(result => {
                setCommunicationsData(result);
            }),
            getCommunicationMessageTypes().then(result => {
                setDropDownData(pre => ({ ...pre, type: result }))
            }),
            getCommunicationMessageStatuses().then(result => {
                setDropDownData(pre => ({ ...pre, status: result }))
            })
        ]).finally(() => setLoading(false));

    }, []);

    const tableHeaders = useMemo(() => {
        const headers = CommunicationsTableHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: <input class="star" type="checkbox" disabled />,
            render: (_, record) => (
                <input class="star" type="checkbox" />
            )
        }, {
            title: '',
            render: (_, record) => (
                <input type="checkbox" className="check-box" />
            )
        },
        )

        return headers

    }, [communicationsData])

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setDropDownSelected({ ...dropDownSelected, [elementName]: JSON.parse(e.target.value) });
    }

    const onFilterTypeDateChange = (date, elementName) => {
        setDropDownSelected({ ...dropDownSelected, [elementName]: date });
    };

    const onFilter = () => {
        setLoading(true)

        const params = {
            "DistributionStatusId": dropDownSelected?.status?.Id,
            "MessageTypeId": dropDownSelected?.type?.Id,
            "FromDate": dropDownSelected.fromDate,
            "ToDate": dropDownSelected.toDate,
            "SearchText": searchText
        }

        getCommunicationsList(params).then(result => {
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
                <button className="add-btn m-r-20 com-drop-down-width" >Create New</button>
                <div className="filter-by-text m-l-20">Filter By:</div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.status}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={JSON.stringify(dropDownSelected.status || undefined)}
                        dataName="Name"
                        placeholder="Status"
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.type}
                        onChange={e => onChangeFilterType(e, 'type')}
                        selected={JSON.stringify(dropDownSelected.type || undefined)}
                        dataName="Name"
                        placeholder="Type"
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='From Date'
                        value={dropDownSelected.fromDate}
                        onChange={(date) => onFilterTypeDateChange(date, "fromDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='To Date'
                        value={dropDownSelected.toDate}
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
                <Tabs type="card" style={{ width: '95vw' }} >
                    <TabPane tab="SENT" key="1">
                        <div className="tablele-width">
                            <Table
                                rowKey={(record, index) => index}
                                dataSource={communicationsData}
                                scroll={{
                                    y: '60vh',
                                }}
                                columns={tableHeaders}
                                pagination={false}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="DRAFTS" key="2">
                        <div></div>
                    </TabPane>
                </Tabs>

            </div>
            <Dropdown
                overlay={actions} placement="topRight" arrow
            >
                <button className="primary-btn select-actions-btn" >Seletct Action</button>
            </Dropdown>
        </>
    )
}

export default Communications;