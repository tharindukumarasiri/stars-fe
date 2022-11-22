import React, { useEffect, useState, useMemo, useContext } from "react";
import { Table, Pagination } from 'antd';
import { TabContext } from "../../utils/contextStore";
import { getTenders } from "../../services/organizationsService";
import { matchinTendersTableHeaders } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import Dropdown from "../../common/dropdown";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { FetchCurrentCompany } from "../../hooks/index"

const pageSize = 10;

const MatchingTenders = () => {
    const { changeActiveTab } = useContext(TabContext);
    const [pageNumber, setpageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [tendersData, setTendersData] = useState([]);
    const [selectedCompany] = FetchCurrentCompany();

    const { t } = useTranslation();

    useEffect(() => {
        if(selectedCompany.companyRegistrationId){
            getTenders(selectedCompany.companyRegistrationId, pageSize, pageNumber, 'english', 'NO').then(result => {
                setTendersData(result.tenders);
                setPageCount(result.totalCount)
            })
        }
    }, [selectedCompany]);

    const onLanguageSelect = () => {

    }

    const tableHeaders = useMemo(() => {
        const headers = matchinTendersTableHeaders.map((a) => {
            return { ...a, title: t(a.title) };
        });

        headers.push({
            title: 'Status',
            dataIndex: 'noticeStatus',
            render: (_, { noticeStatus }) => (
                <div style={{ width: 110 }}>
                    <div className="fl m-r-20">{noticeStatus}</div>
                    <input type="checkbox" className="check-box m-b-20" />
                    <Dropdown values={["English"]}
                        onChange={onLanguageSelect}
                        selected={""}
                        placeholder="Language" />
                </div>
            ),
        });

        return headers;
    }, [tendersData]);

    const onClickTender = (record) => {
        changeActiveTab(NAVIGATION_PAGES.SELLER_TENDER_DETAILS, record)
    }

    return (
        <>
            <Table
                rowKey={(record) => record.id}
                dataSource={tendersData}
                columns={tableHeaders}
                pagination={false}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => onClickTender(record),
                    };
                }}
            />
            <Pagination size="small" className="fr m-t-20 m-b-20" current={pageNumber} onChange={(pageNum) => { setpageNumber(pageNum) }} total={pageCount} showSizeChanger={false} />
        </>
    )

}

export default MatchingTenders;