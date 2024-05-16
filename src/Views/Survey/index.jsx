import React, { useState, useRef, useEffect } from 'react';
import Tabs, { changeTab, tabClose } from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import { useTranslation } from "react-i18next";
import FormBuilder from '../../common/formBuilder'
import SurveyHome from './SurveyHome'
import { FetchCurrentUser } from "../../hooks/index";

const Survey = ({ openTab = NAVIGATION_PAGES.SURVEY_HOME }) => {
    const [activeTab, setActiveTab] = useState(openTab);
    const [openTabs, setOpenTabs] = useState([openTab]);
    const [params, setParams] = useState({})

    const haveUnsavedDataRef = useRef(false);
    const shouldBeClosed = useRef({ state: false, tab: '' });

    // const [selectedCompany] = FetchCurrentCompany();
    const [currentUser] = FetchCurrentUser();

    const { t } = useTranslation();

    useEffect(() => {
        if (currentUser?.Id) {

        }
    }, [currentUser])

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
        })
    };

    const closeTab = (tab) => {
        tabClose({ tab, openTabs, haveUnsavedDataRef, shouldBeClosed, setOpenTabs })
    }

    const setHaveUnsavedDataRef = (value) => {
        haveUnsavedDataRef.current = value
    }

    return (
        <TabContext.Provider
            value={{
                params,
                activeTab,
                changeActiveTab,
                closeTab,
                openTabs,
                haveUnsavedDataRef,
                setHaveUnsavedDataRef,
            }}>
            <Tabs>
                <div label="Survey" id={NAVIGATION_PAGES.SURVEY_HOME} >
                    <SurveyHome />
                </div>
                <div id={NAVIGATION_PAGES.SURVEY_CREATE} >
                    <FormBuilder />
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default Survey;