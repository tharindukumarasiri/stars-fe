import React from "react";
import { useTranslation } from "react-i18next";

const Input = ({ value, placeholder = '', onChange, lines = 1, endImage = '', disabled = false }) => {
    const { t } = useTranslation();

    const hintTextStyle = value ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    return (
        <div className="input-container m-b-10">
            <div className={hintTextStyle}>{t(placeholder)}</div>
            {lines > 1 ?
                <textarea rows={lines} placeholder={t(placeholder)} value={value} onChange={onChange} />
                : <input type="text" placeholder={t(placeholder)} value={value} onChange={onChange} disabled={disabled} className={disabled ? 'disable-div' : ''} />
            }
            {endImage &&
                <i className={endImage + ' datapicker-icon'} />
            }
        </div>
    )
}

export default Input;