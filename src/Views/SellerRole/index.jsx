import React, { useState } from 'react';
import "./styles.scss"
import Tabs from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import SellerHome from './sellerHome';
import GetNotified from './getNotified';

const SellerRole = () => {
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.SELLER_HOME);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.SELLER_HOME]);
    const [params, setParams] = useState({})

    const changeActiveTab = (tab, params = null) => {
        if (openTabs.indexOf(tab) < 0) {
            const newOpenTabs = Array.from(openTabs)
            newOpenTabs.push(tab);
            setOpenTabs(newOpenTabs);
        }
        if (params)
            setParams(pre => ({ ...pre, [tab]: params }))
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
                <div label={"SELLER"} id={NAVIGATION_PAGES.SELLER_HOME} >
                    <div className="page-container">
                        <SellerHome />
                    </div>
                </div>
                <div label={"GET NOTIFIED"} id={NAVIGATION_PAGES.SELLER_GET_NOTIFIED}>
                    <div className="page-container">
                        <GetNotified />
                    </div>
                </div>
                <div label={"MATCHING TENDERS"} id={NAVIGATION_PAGES.SELLER_MATCHING_TENDERS}>
                    <div className="page-container">
                    </div>
                </div>
                <div label={"GLOBAL TENDER"} id={NAVIGATION_PAGES.SELLER_GLOBAL_TENDER}>
                    <div className="page-container">
                    </div>
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default SellerRole;