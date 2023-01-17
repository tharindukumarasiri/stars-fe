import React, { useState } from 'react';
import "./styles.scss"
import CommunicationsHome from './communicationsHome';
import Tabs from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import { FetchCurrentCompany } from "../../hooks/index";

const Communications = () => {
    
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.BUYER_HOME);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.BUYER_HOME]);
    const [params, setParams] = useState({})
    const [selectedCompany] = FetchCurrentCompany();

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
                <div label={"eConnect"} id={NAVIGATION_PAGES.BUYER_HOME} >
                    <div className="page-container">
                        <CommunicationsHome />
                    </div>
                </div>

                <div label={"BUYER2"} id="BUYER2" >
                    <div className="page-container">
                        <CommunicationsHome />
                    </div>
                </div>
               


            </Tabs>
        </TabContext.Provider >
    )
}

export default Communications;