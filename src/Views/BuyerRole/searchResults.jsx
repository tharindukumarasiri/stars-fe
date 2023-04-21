import React from "react";
import { Table, message } from 'antd';
import { searchResultsTableHeaders } from '../../utils/tableHeaders'
import { deleteSearch } from '../../services/organizationsService'
import { useTranslation } from "react-i18next";

const SearchResults = (props) => {
    const { t } = useTranslation();
    
    const onDelete = (e) => {
        e.preventDefault();
        deleteSearch(props?.searchResults[0]).then(() => {
            if (props?.searchResults.length === 2) {
                deleteSearch(props?.searchResults[1]).then(() => {
                    message.success(t('MSG_DELETE_SEARCH_SUCESS'))
                    props.getSearchResults();
                }).catch(() => {
                    message.success(t('MSG_DELETE_SEARCH_FAIL'))
                })
            } else {
                message.success(t('MSG_DELETE_SEARCH_SUCESS'))
                props.getSearchResults();
            }
        }).catch(() => {
            message.success(t('MSG_DELETE_SEARCH_FAIL'))
        })
    }

    return (
        <div className="g-row">
            <div className="g-col-10">
                <Table
                    rowKey={(record) => record?.id}
                    dataSource={props.searchResults}
                    columns={searchResultsTableHeaders(t)}
                    pagination={false}
                />
            </div>
            {props.searchResults.length > 0 &&
                <div className="g-col-2">
                    <div className="fr m-t-20 p-t-20">{t('IF_FRESH_SEARCH')}</div>
                    <button className="primary-btn m-r-20" onClick={(e) => onDelete(e)} >{t('DELETE_THIS_RESULT')}</button>
                </div>
            }
        </div>
    )
}

export default SearchResults