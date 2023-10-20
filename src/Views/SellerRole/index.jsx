import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import "./styles.scss"
import Tabs, { changeTab, tabClose } from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import { NAVIGATION_PAGES, ROUTES } from '../../utils/enums';
import SellerHome from './sellerHome';
import GetNotified from './getNotified';
import MatchingTenders from './matchingTenders';
import TenderDetails from './tenderDetails';
import GlobalTenderSearch from './globalTenderSearch';
import { notification } from 'antd';
import { FetchCurrentCompany } from "../../hooks/index";
import { useTranslation } from "react-i18next";

const SellerRole = ({ openTab = NAVIGATION_PAGES.SELLER_HOME }) => {
    const [activeTab, setActiveTab] = useState(openTab);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.SELLER_HOME]);
    const [params, setParams] = useState({})
    const haveUnsavedDataRef = useRef(false);
    const shouldBeClosed = useRef({ state: false, tab: '' });
    const [selectedCompany] = FetchCurrentCompany();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const changeActiveTab = (tab, params = null, multiple = false, label) => {
        const openNotification = (placement = 'top') => {
            const onLeaveBtn = () => {
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
            }

            const key = `open${Date.now()}`;
            const btn = <button className="primary-btn" onClick={onLeaveBtn} >{t('LEAVE')}</button>
            const closeIcon = <i className="close-icon icon-close hover-hand" />;

            const args = {
                message: t('LEAVE_PAGE'),
                description:
                    t('CHANGES_MADE_NOT_SAVED'),
                duration: 0,
                placement,
                btn,
                key,
                closeIcon,
            };
            notification.warning(args);
        };

        if (haveUnsavedDataRef.current) {
            openNotification()
        } else {
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
            navigate(ROUTES[tab]);
        }
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
                <div label={t('SELLER')} id={NAVIGATION_PAGES.SELLER_HOME} >
                    <div className="">
                        <SellerHome />
                    </div>
                </div>
                <div label={t('GET_NOTIFIED')} id={NAVIGATION_PAGES.SELLER_GET_NOTIFIED}>
                    <div className="">
                        <GetNotified />
                    </div>
                </div>
                <div label={t('MATCHING_TENDERS')} id={NAVIGATION_PAGES.SELLER_MATCHING_TENDERS}>
                    <MatchingTenders />
                </div>
                <div label={t('GLOBAL_TENDER')} id={NAVIGATION_PAGES.SELLER_GLOBAL_TENDER}>
                    <GlobalTenderSearch />
                </div>
                <div label={`${t('MATCHING_TENDERS')}: ${params[NAVIGATION_PAGES.SELLER_TENDER_DETAILS]?.noticeNumber}`} id={NAVIGATION_PAGES.SELLER_TENDER_DETAILS}>
                    <TenderDetails props={params[NAVIGATION_PAGES.SELLER_TENDER_DETAILS]} />
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default SellerRole;