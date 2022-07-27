import React, { useState } from 'react';
import "./styles.scss"
import BuyerHome from './buyerHome';
import Search from './search'
import Tabs from "../../common/tabComponent";
import SearchResults from "./searchResults";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';

const BuyerRole = () => {
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.BUYER_HOME);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.BUYER_HOME]);

    const changeActiveTab = (tab) => {
        if (openTabs.indexOf(tab) < 0) {
            const newOpenTabs = Array.from(openTabs)
            newOpenTabs.push(tab);
            setOpenTabs(newOpenTabs);
        }
        setActiveTab(tab);
    };

    const closeTab = (tab) => {
        const index = openTabs.indexOf(tab)
        if (index > -1 && openTabs.length > 1) {
            const newOpenTabs = Array.from(openTabs)
            newOpenTabs.splice(index, 1)
            setOpenTabs(newOpenTabs)
        }
    }

    return (
        <TabContext.Provider value={{ activeTab: activeTab, changeActiveTab: changeActiveTab, closeTab: closeTab, openTabs: openTabs }}>
            <Tabs>
                <div label={"BUYER"} id={NAVIGATION_PAGES.BUYER_HOME} >
                    <div className="page-container">
                        <BuyerHome />
                    </div>
                </div>
                <div label={"SEARCH"} id={NAVIGATION_PAGES.BUYER_SEARCH}>
                    <Search />
                </div>
                <div label={"SEARCH RESULTS"} id={NAVIGATION_PAGES.BUYER_SEARCHRESULTS}>
                    <div className="page-container">
                        <SearchResults />
                    </div>
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default BuyerRole;