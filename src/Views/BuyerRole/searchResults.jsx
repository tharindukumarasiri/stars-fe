import React, { useEffect, useState, useMemo } from "react";
import { Table } from 'antd';
import { searchResultsTableHeaders } from '../../utils/constants'
import NavigationCard from '../../common/navigationCard'
import { getSearchResults, getSearchResultsByProjAndSec } from '../../services/organizationsService'

const SearchResults = (props) => {
    const [tableView, setTableView] = useState(true);

    const tableHeaders = useMemo(() => {
        const headers = searchResultsTableHeaders.map(a => { return { ...a } })

        headers.push({
            title: '',
            render: (_, record) => (
                <>
                    <button className="primary-btn table-button btn-disabled"><i className="icon-filter" />Purify</button> <br />
                    <button className="primary-btn table-button" onClick={(e) => onUpdate(e, record)} > <i className="icon-update-search" />Update</button>
                </>
            )
        })

        return headers

    }, [props.searchResults])

    const onUpdate = (e, record) => {
        e.preventDefault();
        props.onChangeTab("1", record);
    }

    useEffect(() => {
        getSearchResultsByProjAndSec(props.projectId, props.sectionId).then(data => {
            props.setSearchResults(data)
        })
    }, []);

    return (
        <>
            {tableView ?
                <Table
                    rowKey={(record) => record.id}
                    dataSource={props.searchResults}
                    columns={tableHeaders}
                    pagination={false}

                />

                : <div className="g-row">
                    {props.searchResults?.length > 0 ?
                        props.searchResults.map((section, index) => {
                            return (
                                <div key={index}>
                                    <NavigationCard name={section.name} cardColour={"bg-blue-purple"} value={section.id} />
                                </div>
                            )
                        }) : null
                    }
                </div>
            }
        </>
    )
}

export default SearchResults