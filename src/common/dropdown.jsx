import React from "react";
import { useTranslation } from "react-i18next";

const Dropdown = ({ values, selected = '', onChange, placeholder, disabled = false, dataName = '' }) => {
    const { t } = useTranslation();

    const hintTextStyle = selected ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    const containerStyle = disabled ? 'input-container m-b-10 disable-div' : 'input-container m-b-10'
    return (
        <div className={containerStyle}>
            <div className={hintTextStyle}>{t(placeholder)}</div>
            <select className="dropdown-list" onChange={onChange} value={t(selected) || '0'} disabled={disabled}>
                {placeholder &&
                    <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{t(placeholder)}</option>
                }
                {
                    values.map((item, index) => {
                        return <option value={dataName ? JSON.stringify(item) : item} key={index}>{dataName ? item[dataName] : item}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Dropdown;