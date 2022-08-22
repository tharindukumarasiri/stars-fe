import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePickerInput.scss"

const DatePickerInput = ({ value, onChange, placeholder } = {}) => {

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
            selected={value}
            onChange={date => onChange(date)}
            customInput={<InputView />}
            placeholderText={placeholder}
        />
    )
}

export default DatePickerInput;