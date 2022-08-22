import React from "react";
import { Tabs } from 'antd';
import Search from "./search";

const { TabPane } = Tabs;

const SectionSearch = ({ params }) => {
    return (
        <>
            <div className="g-row m-t-20 m-b-20 m-l-20">
                <div className="g-col-3 fl body-text">Project ID: <strong>{params.projectId}</strong></div>
                <div className="g-col-3 fl body-text">Section ID: <strong>{params.sectionId}</strong></div>
                <div className="g-col-3 fl body-text">Name: <strong>{params.projectName}</strong></div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card">
                    <TabPane tab="SEARCH (CRITERIA)" key="1">
                        <Search searchResultsStyles={'section-search-results-container'} />
                    </TabPane>
                    <TabPane tab="RESULTS" key="2">

                    </TabPane>
                    <TabPane tab="REMOVAL CRITERIA" key="3">

                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default SectionSearch;