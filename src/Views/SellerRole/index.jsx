import React, { useState, useRef } from 'react';
import "./styles.scss"
import Tabs from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES } from '../../utils/enums';
import SellerHome from './sellerHome';
import GetNotified from './getNotified';
import MatchingTenders from './matchingTenders';
import TenderDetails from './tenderDetails';
import { Button, notification } from 'antd';

const SellerRole = () => {
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.SELLER_HOME);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.SELLER_HOME]);
    const [params, setParams] = useState({})
    const haveUnsavedDataRef = useRef(false);
    const shouldBeClosed = useRef({ state: false, tab: '' });

    const changeActiveTab = (tab) => {
        const openNotification = (placement = 'top') => {
            const key = `open${Date.now()}`;
            const btn = (
                <Button type="primary" size="small" onClick={() => {
                    notification.close(key)
                    setHaveUnsavedDataRef(false);

                    if (openTabs.indexOf(tab) < 0) {
                        const newOpenTabs = Array.from(openTabs)
                        newOpenTabs.push(tab);
                        setOpenTabs(newOpenTabs);
                    }

                    if (shouldBeClosed.current.state) {
                        closeTab(shouldBeClosed.current.tab);
                        shouldBeClosed.current = { state: false, tab: '' };
                    }
                    setActiveTab(tab);
                }}>
                    Leave
                </Button>
            );
            const args = {
                message: 'Leave page?',
                description:
                    'Changes that you made may not be saved.',
                duration: 0,
                placement,
                btn,
                key,
            };
            notification.warning(args);
        };

        if (haveUnsavedDataRef.current) {
            openNotification()
        } else {
            if (openTabs.indexOf(tab) < 0) {
                const newOpenTabs = Array.from(openTabs)
                newOpenTabs.push(tab);
                setOpenTabs(newOpenTabs);
            }
            setActiveTab(tab);
        }
    };

    const closeTab = (tab) => {
        const index = openTabs.indexOf(tab);
        if (haveUnsavedDataRef.current) {
            shouldBeClosed.current = { state: true, tab };
        } else if (index > -1 && openTabs.length > 1) {
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
                        <MatchingTenders />
                    </div>
                </div>
                <div label={"GLOBAL TENDER"} id={NAVIGATION_PAGES.SELLER_GLOBAL_TENDER}>
                    <div className="page-container">
                    </div>
                </div>
                <div label={`MATCHING TENDERS : ${params.SELLER_TENDER_DETAILS?.receiptionId}`} id={NAVIGATION_PAGES.SELLER_TENDER_DETAILS}>
                    <div className="page-container">
                        <TenderDetails {...params.SELLER_TENDER_DETAILS} />
                    </div>
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default SellerRole;