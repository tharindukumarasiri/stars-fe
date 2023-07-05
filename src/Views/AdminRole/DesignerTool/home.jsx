import React, { useState, useMemo } from "react";
import { Table, message, Pagination } from 'antd';
import StarDropdown from "../../../common/dropdown";
import DatePickerInput from "../../../common/datePickerInput";
import Input from "../../../common/input";
import { NAVIGATION_PAGES } from "../../../utils/enums";
import { DesignerTableHeaders } from '../../../utils/tableHeaders';
import { useTranslation } from "react-i18next";

export function home(props) {
    const [loading, setLoading] = useState(false);
    const [dropDownSelected, setDropDownSelected] = useState({ status: null, type: null, fromDate: null, toDate: null });
    const [dropDownData, setDropDownData] = useState({ status: [], type: [] });
    const [searchText, setSearchText] = useState("");

    const tableData = [];
    const pageNumber = 1;
    const totalResults = 0;

    const { t } = useTranslation();

    const onFilterTypeDateChange = (date, elementName) => {
        setDropDownSelected({ ...dropDownSelected, [elementName]: date });
    };

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setDropDownSelected({ ...dropDownSelected, [elementName]: JSON.parse(e.target.value) });
    };

    const createNew = () => {
        changeActiveTab(NAVIGATION_PAGES.NEW_COMMUNICATION);
    };

    const onFilter = () => {
        const params = {
            StatusId: dropDownSelected?.status?.Id,
            TypeId: dropDownSelected?.type?.Id,
            FromDate: dropDownSelected.fromDate,
            ToDate: dropDownSelected.toDate,
            SearchText: searchText,
            PageSize: pageSize,
            PageCount: 1,
        };

        //getData(params)
        //setPageNumber(1);
    };

    const onChangePage = () => {

    }

    const tableHeaders = useMemo(() => {
        const headers = DesignerTableHeaders(t);
        
        return headers

    }, [tableData]);

    return (
        <>
            <div className="com-top-container user-input-box">
                {loading && (
                    <div className="loading center-loading">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
                <button className="add-btn m-r-20 com-drop-down-width" onClick={createNew}>
                    {t("CREATE_NEW")}
                </button>
                <div className="filter-by-text m-l-20">{t("FILTER_BY")}:</div>

                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder="FROM_DATE"
                        value={dropDownSelected.fromDate}
                        onChange={(date) => onFilterTypeDateChange(date, "fromDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder="TO_DATE"
                        value={dropDownSelected.toDate}
                        onChange={(date) => onFilterTypeDateChange(date, "toDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.status}
                        onChange={(e) => onChangeFilterType(e, "status")}
                        selected={JSON.stringify(dropDownSelected.status || undefined)}
                        dataName="Name"
                        placeholder="STATUS"
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.type}
                        onChange={(e) => onChangeFilterType(e, "type")}
                        selected={JSON.stringify(dropDownSelected.type || undefined)}
                        dataName="Name"
                        placeholder="TYPE"
                    />
                </div>
                <div className="com-search-input-container">
                    <div className="search-input-container">
                        <Input placeholder="NAME" value={searchText} onChange={onChangeSearchText} endImage="icon-search-1" />
                    </div>
                    <button className="add-btn" onClick={onFilter}>
                        {t("FILTERS")}
                    </button>
                </div>
            </div>

            <div className="page-container">
                <div className="tablele-width">
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={tableData}
                        scroll={{
                            y: "60vh",
                        }}
                        columns={tableHeaders}
                        pagination={false}
                    />
                </div>
            </div>
            <div className="action-bar p-t-10 p-r-10">
                <div className="flex-center-middle m-t-10">
                    <Pagination size="small" current={pageNumber} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
                </div>               
            </div>
        </>
    );
}
