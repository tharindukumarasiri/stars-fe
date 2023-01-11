import React, { useEffect, useState, } from "react";
import { Table, Pagination } from 'antd';
import { removeSearch } from "../../services/organizationsService";
import { searchResultsListTableHeaders } from "../../utils/tableHeaders";
const pageSize = 10

const SearchResultsList = (props) => {
    const [loading, setLoading] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [actPage, setActPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        setLoading(true);

        removeSearch(props.searchResults[0]?.id, getRemovalRequest(1)).then(result => {
            setLoading(false);
            setOrganizations(result.organizations);
            setPageCount(result.total);
        }).catch(() => {
            setOrganizations([]);
            setLoading(false);
            setPageCount(0);
        });
    }, [props]);

    const getRemovalRequest = (pageNumber) => {
        const searchResultsSet = {
            "searchCriteria": props?.searchResults[0]?.searchFilter || {},
            "removeCritieria": props?.searchResults[1]?.removeCriteria || {}
        }
        searchResultsSet.searchCriteria.pageNo = pageNumber;

        return searchResultsSet
    }

    const callremoveOrganization = (pageNo) => {
        removeSearch(props.searchResults[0]?.id, getRemovalRequest(pageNo)).then(result => {
            setLoading(false);
            setOrganizations(result.organizations);
            setPageCount(result.total);
        }).catch(error => {
            setLoading(false);
        });
    }

    const onChangePage = (pageNumber) => {
        let pageNo;
        window.scrollTo(0, 0);
        setLoading(true);

        switch (pageNumber) {
            case 'prev':
                pageNo = actPage - 1;
                setActPage(actPage - 1);
                break;
            case 'next':
                pageNo = actPage + 1;
                setActPage(actPage + 1);
                break;
            default:
                pageNo = pageNumber;
                setActPage(pageNumber);
        }

        callremoveOrganization(pageNo);
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
            <div className="h1">{`Total Companies: ${pageCount}`}</div>
            <Table
                rowKey={(record) => record?.id}
                dataSource={organizations}
                columns={searchResultsListTableHeaders}
                pagination={false}
            />
            <div className="flex-center-middle m-t-20">
                <Pagination size="small" current={actPage} onChange={(pageNum) => { onChangePage(pageNum) }} total={pageCount} showSizeChanger={false} />
            </div>
        </div>
    )
}

export default SearchResultsList;