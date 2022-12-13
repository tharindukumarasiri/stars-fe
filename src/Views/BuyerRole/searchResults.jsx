import React from "react";
import { Table, message } from 'antd';
import { searchResultsTableHeaders } from '../../utils/tableHeaders'
import { deleteSearch } from '../../services/organizationsService'

const SearchResults = (props) => {
    const onDelete = (e) => {
        e.preventDefault();
        deleteSearch(props?.searchResults[0]).then(() => {
            if (props?.searchResults.length === 2) {
                deleteSearch(props?.searchResults[1]).then(() => {
                    message.success("Delete results successful")
                    props.getSearchResults();
                }).catch(() => {
                    message.success("Delete results fail")
                })
            } else {
                message.success("Delete results successful")
                props.getSearchResults();
            }
        }).catch(() => {
            message.success("Delete results fail")
        })
    }

    return (
        <div className="g-row">
            <div className="g-col-10">
                <Table
                    rowKey={(record) => record?.id}
                    dataSource={props.searchResults}
                    columns={searchResultsTableHeaders}
                    pagination={false}
                />
            </div>
            {props.searchResults.length > 0 &&
                <div className="g-col-2">
                    <div className="fr m-t-20 p-t-20">If you want to do a fresh search..</div>
                    <button className="primary-btn m-r-20" onClick={(e) => onDelete(e)} >Delete this Result</button>
                </div>
            }
        </div>
    )
}

export default SearchResults