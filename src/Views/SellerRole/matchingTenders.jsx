import React, { useEffect, useState, useMemo, useContext } from "react";
import { Table, Pagination, Dropdown, Menu } from 'antd';
import { TabContext } from "../../utils/contextStore";
import { getTenders, updateTenantTenderMarker } from "../../services/organizationsService";
import { markTendersitems } from "../../utils/constants";
import { matchinTendersTableHeaders } from "../../utils/tableHeaders";
import { useTranslation } from "react-i18next";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { FetchCurrentCompany } from "../../hooks/index"

const pageSize = 10;

const MatchingTenders = () => {
    const { changeActiveTab } = useContext(TabContext);
    const [pageNumber, setpageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [tendersData, setTendersData] = useState([]);
    const [selectedCompany] = FetchCurrentCompany();
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        if (selectedCompany.companyRegistrationId) {
            getTenders(selectedCompany.companyRegistrationId, pageSize, pageNumber, null, 'NO').then(result => {
                setTendersData(result.tenders);
                setPageCount(result.totalCount);
                setLoading(false);
            }).catch(() => { setLoading(false) })
        }
    }, [selectedCompany]);

    const onChangePage = (pageNum) => {
        window.scrollTo(0, 0);

        getTenders(selectedCompany.companyRegistrationId, pageSize, pageNum, null, 'NO').then(result => {
            setTendersData(result.tenders);
            setPageCount(result.totalCount);
            setpageNumber(pageNum)
        })
    }

    const handleMenuClick = (noticeNumber, markType) => {
        const params = {
            organizationId: selectedCompany.companyRegistrationId,
            countryCode: 'NO',
            noticeNumber: noticeNumber,
            markerType: markType
        }
        updateTenantTenderMarker(params).then(() => {
            if ('Ok') {
                getTenders(selectedCompany.companyRegistrationId, pageSize, pageNumber, null, 'NO').then(result => {
                    setTendersData(result.tenders);
                    setPageCount(result.totalCount)
                })
            }
        })
    };


    const getMenu = (noticeNumber) => {
        return (
            <Menu>
                {markTendersitems.map((item, index) => {
                    return (<Menu.Item onClick={() => handleMenuClick(noticeNumber, item.value)} key={index}>{item.icon}{item.label}</Menu.Item>)
                })}
            </Menu>
        )
    };

    const getMarkAsIcon = (markAsType) => {
        switch (markAsType) {
            case "NEW":
                return "icon-tender-new green"
            case "OPEN_FOR_CONSIDERATION":
                return "icon-tender-open blue-dark"
            case "PROPOSAL":
                return "icon-tender-proposal blue-purple"
            case "NOT_RELEVANT":
                return "icon-tender-not-relevant"
            case "CLOSED":
                return "icon-tender-closed red"
            default:
                return "icon-tender-new green"
        }
    }

    const tableHeaders = useMemo(() => {
        const headers = matchinTendersTableHeaders.map((a) => {
            return { ...a, title: t(a.title) };
        });

        headers.push({
            title: 'Mark As',
            dataIndex: ['id', 'countryCode', 'noticeNumber', 'markerType'],
            render: (_, { noticeNumber, markerType }) => (
                <div onClick={(e) => { e.stopPropagation() }}>
                    <Dropdown
                        overlay={getMenu(noticeNumber)}
                        trigger={['click']}
                    >
                        <div>
                            <i className={getMarkAsIcon(markerType)} />
                            <i className="icon-arrow-down" />
                        </div>
                    </Dropdown>
                </div>
            ),
        });

        return headers;
    }, [tendersData]);

    const onClickTender = (record) => {
        changeActiveTab(NAVIGATION_PAGES.SELLER_TENDER_DETAILS, record)
    }

    return (
        <div className={loading && 'loading-overlay'}>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="g-row fr m-l-20 p-l-20">
                <div className="g-col-3" />
                <div className="g-col-1"><i className="icon-tender-new green" />New</div>
                <div className="g-col-2"><i className="icon-tender-open blue-dark" />Open for consideration</div>
                <div className="g-col-3"><i className="icon-tender-proposal blue-purple" />Decided to reply with a proposal</div>
                <div className="g-col-2"><i className="icon-tender-not-relevant" />Not relevant</div>
                <div className="g-col-1"><i className="icon-tender-closed red" />Closed</div>
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
            <Pagination size="small" className="fr m-t-20 m-b-20" current={pageNumber} onChange={onChangePage} total={pageCount} showSizeChanger={false} />
        </div>
    )

}

export default MatchingTenders