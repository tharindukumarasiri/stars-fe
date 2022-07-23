import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import 'assets/css/base.scss'

import BuyerRole from "./Views/BuyerRole";
import SupplireRole from "./Views/SupplierRole"

function App() {
    return (
        <Routes>
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

