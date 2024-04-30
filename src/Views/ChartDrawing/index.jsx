import React, { useState, useRef, useEffect } from 'react';
import Tabs, { changeTab, tabClose } from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import DrawingTool from '../../common/chartDrawingComponent';
// import { FetchCurrentCompany } from "../../hooks/index";
import { useDiagramStore } from './chartDrawingStore'
import { useTranslation } from "react-i18next";
import DrawingToolHome from './DrawingToolHome';
import CollectionDetails from './CollectionDetails';
import { FetchCurrentUser } from "../../hooks/index";

const ChartDrawing = ({ openTab = NAVIGATION_PAGES.DRAWING_TOOL_HOME }) => {
    const [activeTab, setActiveTab] = useState(openTab);
    const [openTabs, setOpenTabs] = useState([openTab]);
    const [params, setParams] = useState({})

    const setCurrentUser = useDiagramStore((state) => state.setCurrentUser);
    const getCollectionData = useDiagramStore((state) => state.getCollectionData);

    const haveUnsavedDataRef = useRef(false);
    const shouldBeClosed = useRef({ state: false, tab: '' });

    // const [selectedCompany] = FetchCurrentCompany();
    const [currentUser] = FetchCurrentUser();

    const { t } = useTranslation();

    useEffect(() => {
        if (currentUser?.Id){
            setCurrentUser(currentUser).then(() => {
                getCollectionData();
            });
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