import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import 'assets/css/base.scss'

import BuyerRole from "./Views/BuyerRole";
import SupplireRole from "./Views/SupplierRole"

const NavBar = () => {
    return (
        <nav >
            <NavLink className="navbar-brand" to="/buyer">Buyer</NavLink>
            <br />
            <br />
            <NavLink className="navbar-brand" to="/supplier">Supplier</NavLink>
        </nav>
    )
}

function App() {
    return (
        <Routes>
            <Route path='/' element={<NavBar />} />
            <Route path='/buyer' element={<BuyerRole />} />
            <Route path='/supplier' element={<SupplireRole />} />
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

