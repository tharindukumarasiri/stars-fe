import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import Search from "./search";
import SearchResults from "./searchResults";
import SearchResultList from "./searchResultList";
import { getSearchResultsByProjAndSec } from "../../services/organizationsService"
import { useTranslation } from 'react-i18next'

const { TabPane } = Tabs;

const SectionSearch = ({ params }) => {
    const [searchResults, setSearchResults] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        getSearchResults();
    }, []);

    const getSearchResults = () => {
        getSearchResultsByProjAndSec(params.proId, params.sectionId).then(data => {
            setSearchResults(data)
        })
    }

    return (
        <>
            <div className="g-row m-t-20 m-b-20 m-l-20">
                <div className="g-col-3 fl body-text">{t("Project ID")}: <strong>{params.projectId}</strong></div>
                <div className="g-col-3 fl body-text">{t("Name")}: <strong>{params.projectName}</strong></div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card" >
                    <TabPane tab={t("SEARCH")} key="1">
                        <Search sectionSearch={true} projectId={params.proId} searchResults={searchResults} sectionId={params.sectionId} getSearchResults={getSearchResults} projectStatus={params.projectStatus} sectionStatus={params.sectionStatus} />
                    </TabPane>
                    <TabPane tab={t("REMOVAL CRITERIA")} key="2">
                        <Search removeSearch={true} sectionSearch={true} searchResults={searchResults} projectId={params.proId} sectionId={params.sectionId} getSearchResults={getSearchResults} projectStatus={params.projectStatus} sectionStatus={params.sectionStatus} />
                    </TabPane>
                    <TabPane tab={t("RESULT LIST")} key="3">
                        <SearchResultList searchResults={searchResults} projectId={params.proId} sectionId={params.sectionId} />
                    </TabPane>
                    <TabPane tab={t("ALL CRITERIA")} key="4">
                        <SearchResults searchResults={searchResults} getSearchResults={getSearchResults} projectId={params.proId} sectionId={params.sectionId} />
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default SectionSearch;