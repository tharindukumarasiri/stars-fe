import React, { useState, useEffect, useMemo, useContext } from "react";
import { Table, Tabs, Dropdown, Menu, message, Pagination } from 'antd';
import { useTranslation } from "react-i18next";

import StarDropdown from "../../../common/dropdown";
import Input from '../../../common/input'
import { CommunicationsTableHeaders } from '../../../utils/tableHeaders'
import DatePickerInput from "../../../common/datePickerInput";
import { getCommunicationsList, getCommunicationMessageTypes, getCommunicationMessageStatuses, deleteCommunicationLogs } from "../../../services/communicationService";
import { FetchCurrentUser } from "../../../hooks/index"
import { NAVIGATION_PAGES } from "../../../utils/enums";
import { TabContext } from "../../../utils/contextStore";

const { TabPane } = Tabs;

const pageSize = 10;
const initialPayload = {
    "PageSize": pageSize,
    "PageCount": 1
}

const Communications = () => {
    const { changeActiveTab } = useContext(TabContext);
    const [dropDownData, setDropDownData] = useState({ status: [], type: [] })
    const [dropDownSelected, setDropDownSelected] = useState({ status: null, type: null, fromDate: null, toDate: null })
    const [searchText, setSearchText] = useState('');
    const [communicationsData, setCommunicationsData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentUser] = FetchCurrentUser();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        Promise.all([
            getCommunicationsList(initialPayload).then(result => {
                setCommunicationsData(result?.Value);
                setTotalResults(result?.Key);
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
        const headers = CommunicationsTableHeaders(t);
        headers.push({
            title: <input className="star" type="checkbox" disabled />,
            render: (_, record) => (
                <input className="star" type="checkbox" />
            )
        }, {
            title: '',
            dataIndex: 'Id',
            render: (_, { Id }) => (
                <input type="checkbox" className="check-box" onChange={(e) => onCheckBox(e, Id)} />
            )
        },
        )

        return headers

    }, [communicationsData, selectedRows]);

    const onCheckBox = (e, value) => {
        const newSelectedRows = [...selectedRows];

        if (e.target.checked) {
            newSelectedRows.push(value);
        } else {
            const index = selectedRows.indexOf(value);
            newSelectedRows.splice(index, 1);
        }

        setSelectedRows(newSelectedRows);
    }

    const onDelete = () => {
        const deleteList = [currentUser?.Id, ...selectedRows]
        setLoading(true);
        const params = {
            "StatusId": dropDownSelected?.status?.Id,
            "MessageTypeId": dropDownSelected?.type?.Id,
            "FromDate": dropDownSelected.fromDate,
            "ToDate": dropDownSelected.toDate,
            "SearchText": searchText,
            "PageSize": pageSize,
            "PageCount": pageNumber
        }
        deleteCommunicationLogs(deleteList).then(() => {
            getCommunicationsList(params).then(result => {
                setCommunicationsData(result?.Value);
                setTotalResults(result?.Key);
                message.success(t('DELETE_SUCCESSFUL'));
            }).finally(() => setLoading(false))
        }).catch(() => {
            setLoading(false);
            message.error(t('DELETE_FAILED'));
        })
    }

    const actions = (
        <Menu>
            <Menu.Item disabled>Remind</Menu.Item>
            <Menu.Item disabled>Manage</Menu.Item>
            <Menu.Item disabled>Archive</Menu.Item>
            <Menu.Item onClick={onDelete}>Delete</Menu.Item>
        </Menu>
    );

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
            "StatusId": dropDownSelected?.status?.Id,
            "MessageTypeId": dropDownSelected?.type?.Id,
            "FromDate": dropDownSelected.fromDate,
            "ToDate": dropDownSelected.toDate,
            "SearchText": searchText,
            "PageSize": pageSize,
            "PageCount": 1
        }

        getCommunicationsList(params).then(result => {
            setCommunicationsData(result?.Value);
            setTotalResults(result?.Value);
            setLoading(false);
            setPageNumber(1);
        });
    }

    const createNew = () => {
        changeActiveTab(NAVIGATION_PAGES.NEW_COMMUNICATION)
    }

    const onChangePage = (pageNumb) => {
        setLoading(true);

        const params = {
            "StatusId": dropDownSelected?.status?.Id,
            "MessageTypeId": dropDownSelected?.type?.Id,
            "FromDate": dropDownSelected.fromDate,
            "ToDate": dropDownSelected.toDate,
            "SearchText": searchText,
            "PageSize": pageSize,
            "PageCount": pageNumb
        }

        getCommunicationsList(params).then(result => {
            setLoading(false)
            setPageNumber(pageNumb)
            setCommunicationsData(result?.Value);
            setTotalResults(result?.Key);
        }).catch(() => setLoading(false))
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
                <button className="add-btn m-r-20 com-drop-down-width" onClick={createNew} >{t('CREATE_NEW')}</button>
                <div className="filter-by-text m-l-20">{t('FILTER_BY')}:</div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.status}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={JSON.stringify(dropDownSelected.status || undefined)}
                        dataName="Name"
                        placeholder="STATUS"
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.type}
                        onChange={e => onChangeFilterType(e, 'type')}
                        selected={JSON.stringify(dropDownSelected.type || undefined)}
                        dataName="Name"
                        placeholder="TYPE"
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='FROM_DATE'
                        value={dropDownSelected.fromDate}
                        onChange={(date) => onFilterTypeDateChange(date, "fromDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder='TO_DATE'
                        value={dropDownSelected.toDate}
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
                <Tabs type="card" style={{ width: '95vw' }} >
                    <TabPane tab={t("SENT")} key="1">
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
                    <TabPane tab={t("DRAFTS")} key="2">
                        <div></div>
                    </TabPane>
                </Tabs>

            </div>
            <div className="action-bar p-t-10 p-r-10">
                <div className="flex-center-middle m-t-10">
                    <Pagination size="small" current={pageNumber} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
                </div>
                <Dropdown
                    overlay={actions} placement="topRight" arrow
                >
                    <button className="primary-btn actions-btn" >{t('SELECT_ACTION')}</button>
                </Dropdown>
            </div>
        </>
    )
}

export default Communications;