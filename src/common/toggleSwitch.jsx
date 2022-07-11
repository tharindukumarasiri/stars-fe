import React from "react";
import "../assets/css/_toggle-switch.scss"

const ToggleSwitch = ({ label }) => {
    return (
        <div className="g-row">
            <div className="g-col-3 m-r-10">{label}</div>
            <div className="g-col-5 toggle-switch">
                <input type="checkbox" className="checkbox"
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