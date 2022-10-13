import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePickerInput.scss"
import { formatDate } from "../utils";
import { useTranslation } from 'react-i18next'

const DatePickerInput = ({ value, onChange, placeholder, minDate = false, maxDate = false } = {}) => {
    const { t } = useTranslation();

    const date = formatDate(value) === "01/01/0001" ? "" : value
    const InputView = forwardRef(({ value, onClick, placeholder }, ref) => (
        <div className="datapicker-input m-b-10" onClick={onClick} ref={ref}>
            <div className={value ? "input-hint-text-visible" : "input-hint-text-hidden"}>{placeholder}</div>
            <div >
                {value ? value : placeholder}
                <i className="icon-calander datapicker-icon"></i>
            </div>
        </div>
    ));

    return (
        <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            selected={date}
            onChange={date => onChange(date)}
            customInput={<InputView />}
            placeholderText={t(placeholder)}
        />
    )
}

export default DatePickerInput;