import React, { useState, useRef } from 'react';
import { Button, notification } from 'antd';
import SupplierHome from './supplierHome';
import Tabs from "../../common/tabComponent";
import { TabContext } from '../../utils/contextStore';
import "./styles.scss"
import { NAVIGATION_PAGES } from '../../utils/enums';
import Summary from './summary';
import Unspsc from './unspsc';
import Cpv from './cpv';
import Nace from './nace';
import Market from './market';
import { FetchCurrentCompany } from "../../hooks/index";

const SupplireRole = () => {
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.SUPPLIER_HOME);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.SUPPLIER_HOME]);
    const [organizationData, setOrganizationData] = useState({})
    const haveUnsavedDataRef = useRef(false);
    const shouldBeClosed = useRef({ state: false, tab: '' });
    const [selectedCompany] = FetchCurrentCompany();

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
                <div label={"SUPPLIER"} id={NAVIGATION_PAGES.SUPPLIER_HOME}>
                    <div className="page-container">
                        <SupplierHome />
                    </div>
                </div>
                <div label={"SUMMARY"} id={NAVIGATION_PAGES.SUPPLIER_SUMMARY}>
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
                <div label={"MARKET VIEW"} id={NAVIGATION_PAGES.SUPPLIER_MARKET}>
                    <Market />
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}

export default SupplireRole;