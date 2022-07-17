import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyerHome from './Views/buyerHome';
import Search from './Views/search'
import Tabs from "./common/tabComponent/tabs";
import SearchResults from "./Views/searchResults";
import { TabContext } from './utils/contextStore';
import { NAVIGATION_PAGES } from './utils/enums';
import './assets/css/base.scss'

function App() {
    return (
        <Routes>
            <Route path='/buyer' element={<BuyerRole />} />
        </Routes>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

const BuyerRole = () => {
    const [activeTab, setActiveTab] = useState(NAVIGATION_PAGES.BUYER);
    const [openTabs, setOpenTabs] = useState([NAVIGATION_PAGES.BUYER]);

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
        <TabContext.Provider value={{ activeTab: activeTab, changeActiveTab: changeActiveTab, closeTab: closeTab, openTabs: openTabs }}>
            <Tabs>
                <div label={NAVIGATION_PAGES.BUYER}>
                    <div className="page-container">
                        <BuyerHome />
                    </div>
                </div>
                <div label={NAVIGATION_PAGES.SEARCH}>
                    <Search />
                </div>
                <div label={NAVIGATION_PAGES.SEARCHRESULTS}>
                    <div className="page-container">
                        <SearchResults />
                    </div>
                </div>
            </Tabs>
        </TabContext.Provider >
    )
}