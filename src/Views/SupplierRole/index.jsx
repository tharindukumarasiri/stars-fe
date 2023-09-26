import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { notification } from 'antd';
import SupplierHome from './supplierHome';
import Tabs from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import "./styles.scss"
import { NAVIGATION_PAGES, ROUTES } from '../../utils/enums';
import Summary from './summary';
import Unspsc from './unspsc';
import Cpv from './cpv';
import Nace from './nace';
import Market from './market';
import { FetchCurrentCompany } from "../../hooks/index";
import { useTranslation } from "react-i18next";

const SupplireRole = () => {
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.SUPPLIER_HOME);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.SUPPLIER_HOME]);
    const [organizationData, setOrganizationData] = useState({})
    const haveUnsavedDataRef = useRef(false);
    const shouldBeClosed = useRef({ state: false, tab: '' });
    const [selectedCompany] = FetchCurrentCompany();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const changeActiveTab = (tab) => {
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
            const btn = <button className="primary-btn" onClick={onLeaveBtn} >Leave</button>
            const closeIcon = <i className="close-icon icon-close hover-hand" />;

            const args = {
                message: t('LEAVE_PAGE'),
                description:
                    t('WARNING_LOOSE_CHANGES'),
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
            if (openTabs.indexOf(tab) < 0) {
                const newOpenTabs = Array.from(openTabs)
                newOpenTabs.push(tab);
                setOpenTabs(newOpenTabs);
            }
            setActiveTab(tab);
            navigate(ROUTES[tab]);
        }
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
        <TabContext.Provider value={{
            activeTab,
            changeActiveTab,
            closeTab,
            openTabs,
            organizationData,
            setOrganizationData,
            haveUnsavedDataRef,
            setHaveUnsavedDataRef,
        }}>
            <Tabs>
                <div label={t("SUPPLIER")} id={NAVIGATION_PAGES.SUPPLIER_HOME}>
                    <div className="page-container">
                        <SupplierHome />
                    </div>
                </div>
                <div label={t('SUMMARY')} id={NAVIGATION_PAGES.SUPPLIER_SUMMARY}>
                    <Summary />
                </div>
                <div label={"UNSPSC"} id={NAVIGATION_PAGES.SUPPLIER_UNSPSC}>
                    <Unspsc />
                </div>
                <div label={"CPV"} id={NAVIGATION_PAGES.SUPPLIER_CPV}>
                    <Cpv />
                </div>
                <div label={"NACE"} id={NAVIGATION_PAGES.SUPPLIER_NACE}>
                    <Nace />
                </div>
                <div label={t('MARKET_VIEW')} id={NAVIGATION_PAGES.SUPPLIER_MARKET}>
                    <Market />
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default SupplireRole;