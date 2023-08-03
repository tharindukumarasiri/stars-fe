import React from "react";
import { useTranslation } from "react-i18next";

const Dropdown = ({ values, selected = '', onChange, placeholder, disabled = false, dataName = '', iconName = '', valueName, error = '' }) => {
    const { t } = useTranslation();

    const hintTextStyle = selected ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    const containerStyle = disabled ? 'input-container m-b-10 disable-div' : 'input-container m-b-10'
    return (
        <div className={containerStyle}>
            <div className={hintTextStyle}>{t(placeholder)}</div>
            <select className="dropdown-list" onChange={onChange} value={selected || '0'} disabled={disabled}  style={error ? { borderColor: 'red' } : {}}>
                {placeholder &&
                    <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{t(placeholder)}</option>
                }
                {
                    values?.map((item, index) => {
                        if(valueName){
                            return <option value={item[valueName]} key={index}>{dataName ? t(item[dataName]) : t(item)}</option>
                        }
                        else
                            return (
                                <option value={dataName ? JSON.stringify(item) : item} key={index} className={"fa fa-email"}>
                                    {iconName ? <i className={iconName} /> : null}
                                    {dataName ? t(item[dataName]) : t(item)}
                                </option>
                            )
                    })
                }
            </select>
            {error &&
                <div className="error-text">
                    {t(error)}
                </div>
            }
        </div>
    )
}

export default Dropdown;