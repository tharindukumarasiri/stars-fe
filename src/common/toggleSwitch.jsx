import React from "react";
import "../assets/css/_toggle-switch.scss"
import { useTranslation } from 'react-i18next'

const ToggleSwitch = ({ label, value, onChange }) => {
    const { t } = useTranslation();

    return (
        <div className="g-row">
            <div className="g-col-3 m-r-10">{t(label)}</div>
            <div className="g-col-5 toggle-switch">
                <input type="checkbox" className="checkbox" checked={value} onChange={onChange}
                    name={label} id={label} />
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
};

export default ToggleSwitch;