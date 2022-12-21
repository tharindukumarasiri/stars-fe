import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePickerInput.scss"
import { formatDate } from "../utils";
import { useTranslation } from 'react-i18next'

const DatePickerInput = ({ value, onChange, placeholder, minDate = false, maxDate = false, isClearable = false } = {}) => {
    const { t } = useTranslation();

    const years = (startYear) => {
        var currentYear = new Date().getFullYear() + 1, years = [];
        startYear = startYear || 1980;
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        return years;
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const date = formatDate(value) === "01/01/0001" ? "" : value
    const InputView = forwardRef(({ value, onClick, placeholder }, ref) => (
        <div className="datapicker-input m-b-10" onClick={onClick} ref={ref}>
            <div className={value ? "input-hint-text-visible" : "input-hint-text-hidden"}>{placeholder}</div>
            <div >
                {value ? value : placeholder}
                {!value && <i className="icon-calander datapicker-icon" />}
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
            isClearable={isClearable}

            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div className="flex-justify-center">
                    <button onClick={(e) => {e.preventDefault(); decreaseMonth() }} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <select
                        value={formatDate(date, "YYYY")}
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years().map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={formatDate(date, "MMMM")}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                        style={{ width: 120 }}
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button onClick={(e) => {e.preventDefault(); increaseMonth() }} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button>
                </div>
            )}
        />
    )
}

export default DatePickerInput;