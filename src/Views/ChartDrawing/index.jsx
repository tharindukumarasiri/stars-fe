import React, { useState, useRef } from 'react';
import Tabs from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import DrawingTool from '../../common/chartDrawingComponent';
import { FetchCurrentCompany } from "../../hooks/index";
import { useTranslation } from "react-i18next";
import DrawingToolHome from './DrawingToolHome';

const ChartDrawing = ({ openTab = NAVIGATION_PAGES.DRAWING_TOOL_HOME }) => {
    const [activeTab, setActiveTab] = useState(openTab);
    const [openTabs, setOpenTabs] = useState([openTab]);
    const [params, setParams] = useState({})
    const haveUnsavedDataRef = useRef(false);
    const shouldBeClosed = useRef({ state: false, tab: '' });
    const [selectedCompany] = FetchCurrentCompany();
    const { t } = useTranslation();

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
        const index = openTabs.indexOf(tab);
        if (haveUnsavedDataRef.current) {
            shouldBeClosed.current = { state: true, tab };
        } else if (index > -1 && openTabs.length > 0) {
            const newOpenTabs = Array.from(openTabs)
            newOpenTabs.splice(index, 1)
            setOpenTabs(newOpenTabs)
        }
    }

    const setHaveUnsavedDataRef = (value) => {
        haveUnsavedDataRef.current = value
    }

    return (
        <TabContext.Provider
            value={{
                activeTab,
                changeActiveTab,
                closeTab,
                openTabs,
                haveUnsavedDataRef,
                setHaveUnsavedDataRef,
            }}>
            <Tabs>
                <div label="Biz Designer List" id={NAVIGATION_PAGES.DRAWING_TOOL_HOME} >
                    <DrawingToolHome />
                </div>
                <div label={params[NAVIGATION_PAGES.CHART_DRAWING]?.name} id={NAVIGATION_PAGES.CHART_DRAWING} >
                    <DrawingTool props={params[NAVIGATION_PAGES.CHART_DRAWING]} />
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default ChartDrawing;