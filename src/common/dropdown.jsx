import React from "react";

const Dropdown = ({ values, selected = '', onChange, placeholder, disabled = false }) => {
    const hintTextStyle = selected ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    const containerStyle = disabled ? 'input-container m-b-10 disable-div' : 'input-container m-b-10'
    return (
        <div className={containerStyle}>
            <div className={hintTextStyle}>{placeholder}</div>
            <select className="dropdown-list" onChange={onChange} value={selected || '0'} disabled={disabled}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                {
                    values.map((item, index) => {
                        return <option value={item} key={index}>{item}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Dropdown;