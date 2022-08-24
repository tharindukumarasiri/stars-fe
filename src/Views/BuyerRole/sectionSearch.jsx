import React, { useState } from "react";
import { Tabs } from 'antd';
import Search from "./search";
import SearchResults from "./searchResults";

const { TabPane } = Tabs;

const SectionSearch = ({ params }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState("1")
    const [searchResult, setSearchResult] = useState({})

    const onChangeTab = (key, searchRes = '') => {
        if (searchRes.id) {
            setSearchResult(searchRes);
        } else {
            setSearchResult({});
        }
        setActiveTab(key);
    }

    return (
        <>
            <div className="g-row m-t-20 m-b-20 m-l-20">
                <div className="g-col-3 fl body-text">Project ID: <strong>{params.projectId}</strong></div>
                <div className="g-col-3 fl body-text">Section ID: <strong>{params.sectionId}</strong></div>
                <div className="g-col-3 fl body-text">Name: <strong>{params.projectName}</strong></div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card" activeKey={activeTab} onTabClick={onChangeTab}>
                    <TabPane tab="SEARCH (CRITERIA)" key="1">
                        <Search sectionSearch={true} projectId={params.proId} sectionId={params.sectionId} searchResult={searchResult} setSearchResults={setSearchResults} />
                    </TabPane>
                    <TabPane tab="RESULTS" key="2">
                        <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} onChangeTab={onChangeTab} />
                    </TabPane>
                    <TabPane tab="REMOVAL CRITERIA" key="3">

                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default SectionSearch;