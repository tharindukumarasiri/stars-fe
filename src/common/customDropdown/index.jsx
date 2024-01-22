import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useOutsideClick } from "../../hooks"
import style from './dropDown.module.scss'

const CustomDropdown = ({ values, selected = '', onChange, hideHintText = false, placeholder, disabled = false, dataName = '', iconName = '', error = '' }) => {
    const { t } = useTranslation();
    const ref = useRef(null)

    const [outsideClicked, resetOutsideClick] = useOutsideClick(ref)

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (outsideClicked) {
            dropdownToggle()
            resetOutsideClick(false)
        }
    }, [outsideClicked])

    const hintTextStyle = selected && !hideHintText ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    const containerStyle = disabled ? 'disable-div' : ''

    const dropdownToggle = () => {
        setIsOpen(pre => !pre)
    }

    const onClickItem = (value) => {
        dropdownToggle();
        onChange(value);
    }

    const getDisplayValue = useMemo(() => {
        if (selected) {
            if (iconName && selected[iconName]) {
                return <i className={`${selected[iconName]} ${style.dropdownSelectedIcon}`} />;
            } else {
                return selected[dataName];
            }
        } else if (placeholder) {
            return placeholder;

        } else {
            if (iconName && values[0][iconName]) {
                return <i className={`${values[0][iconName]} ${style.dropdownSelectedIcon}`} />;
            } else {
                return values[0][dataName]
            }
        }
    }, [selected, placeholder, values])

    const getDropdownList = () => {
        return (
            <div className={style.dropdownListContainer} ref={ref}>
                {values?.map((item, index) => {
                    return (
                        <div className={style.dropdownListItem} key={index}
                            onClick={() => onClickItem(item)}>
                            {iconName && item[iconName] ?
                                <i className={`${item[iconName]} ${style.dropdownIcon}`} />
                                : dataName ? t(item[dataName]) : t(item)}
                        </div>
                    )
                })

                }
            </div>
        )
    }

    return (
        <div className={containerStyle}>
            <div className={hintTextStyle}>{t(placeholder)}</div>
            <div className={style.dropdownContainer} onClick={dropdownToggle}>
                <div className={style.displayValueContainer}>{getDisplayValue}</div>
                <i className={style.dropdownArrowContainer + ' icon-arrow-down'} />
            </div>
            {isOpen &&
                getDropdownList()
            }
            {/* <select className="dropdown-list" onChange={onChange} value={selected || '0'} disabled={disabled} style={error ? { borderColor: 'red' } : {}}>
                {placeholder &&
                    <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{t(placeholder)}</option>
                }
                {
                    values?.map((item, index) => {
                        if (valueName) {
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
            </select> */}
            {error &&
                <div className="error-text">
                    {t(error)}
                </div>
            }
        </div>
    )
}

export default CustomDropdown;