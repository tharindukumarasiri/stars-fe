import React, { useEffect, useState } from 'react';
import Tabs from "../../common/tabComponent";
import { TabContext, UserContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import Templates from './Templates/templates';
import Users from './UserManage/allUsers';
import UserDetails from './UserManage/userDetails';
import Communications from './Communication/communications';
import NewCommunication from './Communication/newCommunication'
import CommunicationsLog from './communicationsLog';
import CommunicationBaskets from './CommunicationBasket/communicationBaskets';
import CommunicationBasketDetails from './CommunicationBasket/communicationBasketDetails';
import EConnectHome from './eConnectHome';
import { FetchCurrentCompany } from "../../hooks/index";
import { FetchCurrentUser } from "../../hooks/index"
import { getAllUsers } from "../../services/userService";
import "./adminRole.styles.scss";

const AdminRole = ({ openTab = NAVIGATION_PAGES.ADMIN_TEMPLATES }) => {
    const [activeTab, setActiveTab] = useState(openTab);
    const [openTabs, setOpenTabs] = useState([openTab]);
    const [params, setParams] = useState({})
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showOnlyDefaultRecievers, setShowOnlyDefaultRecievers] = useState(false);

    const [selectedCompany] = FetchCurrentCompany();
    const [currentUser] = FetchCurrentUser();

    //Users States
    const [users, setUsers] = useState([])
    const [totalResults, setTotalResults] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [usersLoading, setUsersLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [savedTemplates, setSavedTemplates] = useState([]);

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

    //User functions
    const getUsersData = (pgNumb = pageNumber) => {
        setUsersLoading(true)
        getAllUsers(selectedCompany?.companyPartyId, searchText, pgNumb).then(result => {
            setUsersLoading(false)
            setUsers(result?.Value)
            setTotalResults(result?.Key)
        }).catch(() => setUsersLoading(false))
    }

    return (
        <TabContext.Provider value={{ activeTab: activeTab, changeActiveTab: changeActiveTab, closeTab: closeTab, openTabs: openTabs }}>
            <UserContext.Provider value={{ getUsersData, users, totalResults, pageNumber, setPageNumber, usersLoading, searchText, setSearchText, selectedCompany, currentUser, savedTemplates, setSavedTemplates }} >
                <Tabs>
                    <div label={"ECONNECT"} id={NAVIGATION_PAGES.E_CONNECT_HOME} >
                        <EConnectHome />
                    </div>
                    <div label={"TEMPLATES"} id={NAVIGATION_PAGES.ADMIN_TEMPLATES} >
                        <Templates />
                    </div>
                    <div label={"USERS"} id={NAVIGATION_PAGES.ALL_USERS} >
                        <Users changeActiveTab={changeActiveTab} setSelectedUsers={setSelectedUsers} setShowOnlyDefaultRecievers={setShowOnlyDefaultRecievers} />
                    </div>
                    <div label={"USER DETAILED VIEW"} id={NAVIGATION_PAGES.ALL_USER_DETAILS} >
                        <UserDetails props={params[NAVIGATION_PAGES.ALL_USER_DETAILS]} />
                    </div>
                    <div label={"COMMUNICATIONS"} id={NAVIGATION_PAGES.COMMUNICATIONS} >
                        <Communications />
                    </div>
                    <div label={"COMMUNICATION BASKETS"} id={NAVIGATION_PAGES.COMMUNICATIONS_BASKET} >
                        <CommunicationBaskets />
                    </div>
                    <div label={`BASKET: ${params[NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS]?.Id} ${params[NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS]?.Name}`} id={NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS} >
                        <CommunicationBasketDetails props={params[NAVIGATION_PAGES.COMMUNICATIONS_BASKET_DETAILS]} />
                    </div>
                    <div label={"COMMUNICATIONS LOG"} id={NAVIGATION_PAGES.COMMUNICATIONS_LOG} >
                        <CommunicationsLog props={params[NAVIGATION_PAGES.COMMUNICATIONS_LOG]} />
                    </div>
                    <div label="NEW COMMUNICATION" id={NAVIGATION_PAGES.NEW_COMMUNICATION} >
                        <NewCommunication defaultRecievers={selectedUsers}
                            updateDefaultRecievers={setSelectedUsers}
                            showOnlyDefaultRecievers={showOnlyDefaultRecievers}
                            closeTab={() => { closeTab(NAVIGATION_PAGES.NEW_COMMUNICATION); changeActiveTab(NAVIGATION_PAGES.COMMUNICATIONS); }} />
                    </div>
                </Tabs>
            </UserContext.Provider>

        </TabContext.Provider >
    )
}

export default AdminRole;