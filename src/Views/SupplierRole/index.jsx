import React, { useState } from 'react';
import SupplierHome from './supplierHome';
import Tabs from "common/tabComponent";
import { TabContext } from 'utils/contextStore';
import "./styles.scss"
import { NAVIGATION_PAGES } from 'utils/enums';
import Summary from './summary';
import Unspsc from './unspsc';

const SupplireRole = () => {
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.SUPPLIER_HOME);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.SUPPLIER_HOME]);
    const [organizationData, setOrganizationData] = useState({})

    const changeActiveTab = (tab) => {
        if (openTabs.indexOf(tab) < 0) {
            const newOpenTabs = Array.from(openTabs)
            newOpenTabs.push(tab);
            setOpenTabs(newOpenTabs);
        }
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

    return (
        <TabContext.Provider value={{ activeTab: activeTab, changeActiveTab: changeActiveTab, closeTab: closeTab, openTabs: openTabs, organizationData: organizationData, setOrganizationData: setOrganizationData }}>
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
            </Tabs>
        </TabContext.Provider >
    )
}

export default SupplireRole;