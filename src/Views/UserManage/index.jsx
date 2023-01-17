import React, { useState } from 'react';
import "./styles.scss"
import UserManageHome from './userManageHome';
import Tabs from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import { FetchCurrentCompany } from "../../hooks/index";

const UserManage = () => {
    
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
                <div label={"Users"} id={NAVIGATION_PAGES.BUYER_HOME} >
                    <div className="page-container">
                        <UserManageHome />
                    </div>
                </div>

                <div label={"Users2"} id="Users2" >
                    <div className="page-container">
                        <UserManageHome />
                    </div>
                </div>
               


            </Tabs>
        </TabContext.Provider >
    )
}

export default UserManage;