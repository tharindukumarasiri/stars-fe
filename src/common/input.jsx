import React from "react";
import { useTranslation } from "react-i18next";

const Input = ({ value, placeholder = '', onChange, lines = 1, endImage = '', disabled = false, error = '', maxLength = 100, type = "text" }) => {
    const { t } = useTranslation();

    const hintTextStyle = value ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    return (
        <div className="input-container" >
            <div className={hintTextStyle}>{t(placeholder)}</div>
            {lines > 1 ?
                <textarea rows={lines} placeholder={t(placeholder)} value={value} onChange={onChange} maxLength={maxLength} disabled={disabled} className={disabled ? 'disable-div' : ''} />
                : <input type={type} placeholder={t(placeholder)} value={value} onChange={onChange} disabled={disabled} maxLength={maxLength}
                    className={disabled ? 'disable-div' : ''} style={error ? { borderColor: 'red' } : {}} />
            }
            {error &&
                <div className="error-text">
                    {t(error)}
                </div>
            }
            {endImage &&
                <i className={endImage + ' datapicker-icon-x'} />
            }
        </div>
    )
}

export default Input;