import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = ({ selected, setDate, placeholder, dataName } = {}) => {

    const InputView = forwardRef(({ value, onClick, placeholder }, ref) => (
        <div className="datapicker-input" onClick={onClick} ref={ref}>
            {value &&
                <div className="input-hint-text">{placeholder}</div>
            }
            <div >
                {value ? value : placeholder}
                <i className="icon-inventory datapicker-icon"></i>
            </div>
        </div>
    ));

    const onChange = (date) => {
        setDate({ ...selected, [dataName]: date })
    }

    return (
        <DatePicker
            selected={selected[dataName]}
            onChange={(date) => onChange(date)}
            customInput={<InputView />}
            placeholderText={placeholder}
        />
    )
}

export default DatePickerInput;