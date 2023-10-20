import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./styles.scss"
import BuyerHome from './buyerHome';
import Search from './search'
import Tabs, { changeTab, tabClose } from "../../common/tabComponent";
import SearchResults from "./searchResults";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES, ROUTES } from '../../utils/enums';
import Projects from './projects';
import ProjectDetails from './projectDetails';
import SectionSearch from './sectionSearch'
import { FetchCurrentUser } from "../../hooks/index";
import { useTranslation } from 'react-i18next';


const BuyerRole = () => {
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.BUYER_HOME);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.BUYER_HOME]);
    const [params, setParams] = useState({});
    const [currentUser] = FetchCurrentUser();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const changeActiveTab = (tab, params = null, multiple = false, label) => {
        changeTab({
            tab,
            params,
            multiple,
            label,
            openTabs,
            setOpenTabs,
            setActiveTab,
            setParams
        });
        navigate(ROUTES[tab]);
    };

    const closeTab = (tab) => {
        tabClose({ tab, openTabs, setOpenTabs })
    }

    return (
        <TabContext.Provider value={{
            params,
            activeTab,
            changeActiveTab,
            closeTab,
            openTabs
        }}>
            <Tabs>
                <div label={t('BUYER')} id={NAVIGATION_PAGES.BUYER_HOME} >
                    <div className="page-container">
                        <BuyerHome />
                    </div>
                </div>
                <div label={t('SEARCH')} id={NAVIGATION_PAGES.BUYER_SEARCH}>
                    <Search currentUser={currentUser} />
                </div>
                <div label={t('SEARCH_RESULTS')} id={NAVIGATION_PAGES.BUYER_SEARCHRESULTS}>
                    <div className="page-container">
                        <SearchResults />
                    </div>
                </div>
                <div label={t('PROJECTS')} id={NAVIGATION_PAGES.BUYER_PROJECTS}>
                    <div className="page-container">
                        <Projects loggedUser={currentUser} />
                    </div>
                </div>
                <div label={`${t('PROJECT')}: ${params[NAVIGATION_PAGES.BUYER_PROJECT_DETAILS]?.Name}`} id={NAVIGATION_PAGES.BUYER_PROJECT_DETAILS}>
                    <ProjectDetails params={params[NAVIGATION_PAGES.BUYER_PROJECT_DETAILS]} loggedUser={currentUser} />
                </div>
                <div label={`${params[NAVIGATION_PAGES.BUYER_PROJECT_SEARCH]?.projectName} > ${t('SECTION')}: ${params[NAVIGATION_PAGES.BUYER_PROJECT_SEARCH]?.sectionName}`} id={NAVIGATION_PAGES.BUYER_PROJECT_SEARCH}>
                    <SectionSearch params={params[NAVIGATION_PAGES.BUYER_PROJECT_SEARCH]} />
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default BuyerRole;