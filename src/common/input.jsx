import React from "react";

const Input = ({ value, placeholder = '', onChange, lines = 1, endImage = '', disabled = false }) => {
    const hintTextStyle = value ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    return (
        <div className="input-container m-b-10">
            <div className={hintTextStyle}>{placeholder}</div>
            {lines > 1 ?
                <textarea rows={lines} placeholder={placeholder} value={value} onChange={onChange} />
                : <input type="text" placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} className={disabled ? 'disable-div' : ''} />
            }
            {endImage &&
                <i className={endImage + ' datapicker-icon'} />
            }
        </div>
    )
}

export default Input;