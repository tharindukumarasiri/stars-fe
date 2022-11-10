import React, { useEffect, useState, useMemo, useContext } from "react";
import { Table, Pagination } from 'antd';
import { TabContext } from "../../utils/contextStore";
import Input from "../../common/input";
import { getTenders } from "../../services/organizationsService";
import { matchinTendersTableHeaders } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import Dropdown from "../../common/dropdown";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { FetchCurrentCompany } from "../../hooks/index"

const pageSize = 10;

const MatchingTenders = () => {
    const { changeActiveTab } = useContext(TabContext);
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setpageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [tendersData, setTendersData] = useState([]);
    const [selectedCompany] = FetchCurrentCompany();

    const { t } = useTranslation();

    useEffect(() => {
        getTenders(selectedCompany.orgId, pageSize, pageNumber, 'english', 'NO').then(result => {
            setTendersData(result.tenders);
            setPageCount(result.totalCount)
        })
    }, []);

    const onLanguageSelect = () => {

    }

    const tableHeaders = useMemo(() => {
        const headers = matchinTendersTableHeaders.map((a) => {
            return { ...a, title: t(a.title) };
        });

        headers.push({
            title: 'State',
            render: (_, record) => (
                <div style={{ width: 110 }}>
                    <div className="fl m-r-20">Notice</div>
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

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    const onClickTender = (record) => {
        changeActiveTab(NAVIGATION_PAGES.SELLER_TENDER_DETAILS, record)
    }

    return (
        <>
            <div className="g-row">
                <div className="g-col-4">
                    <Input value={searchText} placeholder='Search by Location, Product or Service' onChange={onChangeSearchText} endImage={'icon-search-1'} />
                </div>
                <div className="g-col-2">
                    <Dropdown values={["Norway"]}
                        onChange={onLanguageSelect}
                        selected={""}
                        placeholder="Country" />
                </div>
                <div className="fr">New Tender</div>


            </div>
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