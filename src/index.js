import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, } from "react-router-dom";
import { Button, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend';

import 'antd/dist/antd.css';
import 'assets/css/base.scss';

import BuyerRole from "./Views/BuyerRole";
import SupplireRole from "./Views/SupplierRole";
import SellerRole from "./Views/SellerRole";
import AdminRole from "./Views/AdminRole";
import ChartDrawing from "./Views/ChartDrawing";
import Survey from "Views/Survey";

import { NAVIGATION_PAGES } from './utils/enums';

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'no'],
        fallbackLng: 'en',
        // debug: false,
        // Options for language detector
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag'],
            caches: ['cookie'],
        },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json',
        },
    })

const getItem = (label, key, icon) => {
    return {
        key,
        label,
        icon
    };
}

const menuItems = [
    getItem('Buyer', '/buyer'),
    getItem('Supplier', '/supplier'),
    getItem('Seller', '/seller'),
    getItem('eConnect', '/eConnect'),
    getItem('Users', '/users'),
    getItem('Templates', '/template'),
    getItem('Drawing Tool', '/drawing'),
    getItem('Survey', '/Survey'),
];

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/buyer' element={<BuyerRole />} />
            <Route path='/Buyer/Projects' element={<BuyerRole />} />
            <Route path='Buyer/Search' element={<BuyerRole />} />

            <Route path='/supplier' element={<SupplireRole />} />
            <Route path='/seller' element={<SellerRole />} />
            <Route path='/eConnect' element={<AdminRole openTab={NAVIGATION_PAGES.E_CONNECT_HOME} />} />
            <Route path='/users' element={<AdminRole openTab={NAVIGATION_PAGES.ALL_USERS} />} />
            <Route path='/template' element={<AdminRole openTab={NAVIGATION_PAGES.ADMIN_TEMPLATES} />} />
            <Route path='/drawing' element={<ChartDrawing openTab={NAVIGATION_PAGES.DRAWING_TOOL_HOME} />} />
            <Route path='/Survey' element={<Survey openTab={NAVIGATION_PAGES.SURVEY_HOME} />} />
        </Routes>
    )
}

const NavHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/buyer']}
            style={{ height: 50, flex: "auto", alignItems: 'center', backgroundColor: '#0592D9' }}
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => {
                navigate(key)
            }}
        />
    )
}

const SideMenu = () => {
    const [collapsed, setCollapsed] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
                type="primary"
                onClick={toggleCollapsed}

            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
                style={{ width: collapsed ? 48 : 250, flex: "auto", backgroundColor: '#034F75' }}
                onClick={({ key }) => {
                    navigate(key)
                }}
                defaultSelectedKeys={['/buyer']}
                selectedKeys={[location.pathname]}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                items={menuItems}
            />
        </div>
    )
}

const App = () => {
    return (
        <>
            <NavHeader />
            <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 50px)', backgroundColor: 'white' }} >
                <SideMenu />
                <AppRouter />
            </div>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.StrictMode>
);
