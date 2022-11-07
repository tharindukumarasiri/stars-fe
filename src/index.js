import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
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


const NavBar = () => {
    return (
        <nav >
            <NavLink className="navbar-brand" to="/buyer">Buyer</NavLink>
            <br />
            <br />
            <NavLink className="navbar-brand" to="/supplier">Supplier</NavLink>
            <br />
            <br />
            <NavLink className="navbar-brand" to="/seller">Seller</NavLink>
            <br />
            <br />
            <NavLink className="navbar-brand" to="/admin">Admin</NavLink>
        </nav>
    )
}

function App() {
    return (
        <Routes>
            <Route path='/' element={<NavBar />} />
            <Route path='/buyer' element={<BuyerRole />} />
            <Route path='/supplier' element={<SupplireRole />} />
            <Route path='/seller' element={<SellerRole />} />
            <Route path='/admin' element={<AdminRole />} />
        </Routes>
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
