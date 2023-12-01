import React, { useState, useRef } from 'react';
import Tabs, { changeTab, tabClose } from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import DrawingTool from '../../common/chartDrawingComponent';
import { FetchCurrentCompany } from "../../hooks/index";
import { useTranslation } from "react-i18next";
import DrawingToolHome from './DrawingToolHome';
import CollectionDetails from './CollectionDetails';

const ChartDrawing = ({ openTab = NAVIGATION_PAGES.DRAWING_TOOL_HOME }) => {
    const [activeTab, setActiveTab] = useState(openTab);
    const [openTabs, setOpenTabs] = useState([openTab]);
    const [params, setParams] = useState({})
    const haveUnsavedDataRef = useRef(false);
    const shouldBeClosed = useRef({ state: false, tab: '' });
    const [selectedCompany] = FetchCurrentCompany();
    const { t } = useTranslation();

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
                <div label="Drawing Tool" id={NAVIGATION_PAGES.DRAWING_TOOL_HOME} >
                    <DrawingToolHome />
                </div>
                <div id={NAVIGATION_PAGES.COLLECTION_DETAILS} >
                    <CollectionDetails />
                </div>
                <div id={NAVIGATION_PAGES.CHART_DRAWING} >
                    <DrawingTool />
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default ChartDrawing;