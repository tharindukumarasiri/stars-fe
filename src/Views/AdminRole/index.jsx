import React, { useEffect, useState } from 'react';
import Tabs from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import Templates from './templates';
import Users from './allUsers';
import UserDetails from './userDetails';
import Communications from './communications';
import CommunicationsLog from './communicationsLog';
import CommunicationBaskets from './communicationBaskets';
import CommunicationBasketDetails from './communicationBasketDetails';
import EConnectHome from './eConnectHome';
import { FetchCurrentCompany } from "../../hooks/index";
import "./adminRole.styles.scss";


const AdminRole = ({ openTab = NAVIGATION_PAGES.ADMIN_TEMPLATES }) => {
    const [activeTab, setActiveTab] = useState(openTab);
    const [openTabs, setOpenTabs] = useState([openTab]);
    const [params, setParams] = useState({})
    const [selectedCompany] = FetchCurrentCompany();

    useEffect(() => {
        setActiveTab(openTab);
        setOpenTabs([openTab]);
    }, [openTab])

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
                <div label={"TEMPLATES"} id={NAVIGATION_PAGES.ADMIN_TEMPLATES} >
                    <Templates />
                </div>
                <div label={"USERS"} id={NAVIGATION_PAGES.ALL_USERS} >
                    <Users />
                </div>
                <div label={"USER DETAILED VIEW"} id={NAVIGATION_PAGES.ALL_USER_DETAILS} >
                    <UserDetails props={params[NAVIGATION_PAGES.ALL_USER_DETAILS]} />
                </div>
                <div label={"ECONNECT"} id={NAVIGATION_PAGES.E_CONNECT_HOME} >
                    <EConnectHome />
                </div>
                <div label={"COMMUNICATIONS"} id={NAVIGATION_PAGES.COMMUNICATIONS} >
                    <Communications />
                </div>
                <div label={"COMMUNICATIONS LOG"} id={NAVIGATION_PAGES.COMMUNICATIONS_LOG} >
                    <CommunicationsLog />
                </div>
                <div label={"COMMUNICATION BASKETS"} id={NAVIGATION_PAGES.COMMUNICATIONS_BASKET} >
                    <CommunicationBaskets />
                </div>
                <div label={`BASKET: ${params[NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS]?.Id} ${params[NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS]?.Name}`} id={NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS} >
                    <CommunicationBasketDetails props={params[NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS]} />
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default AdminRole;