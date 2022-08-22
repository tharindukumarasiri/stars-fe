import React from "react";

const Dropdown = ({ values, selected = '', onChange, placeholder }) => {
    const hintTextStyle = selected ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    return (
        <div className="input-container m-b-10">
            <div className={hintTextStyle}>{placeholder}</div>
            <select className="dropdown-list" onChange={onChange} value={selected || '0'}>
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