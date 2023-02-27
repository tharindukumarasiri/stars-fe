import React, { useState, } from "react";
import { Select, message } from 'antd';

import DatePickerInput from "../../../common/datePickerInput";
import StarDropdown from "../../../common/dropdown";
import { configureCommunicationBasket } from "../../../services/communicationService";
import { formatDate } from "../../../utils";

const recurringTypes = [
    { key: 1, Name: 'Monday to Friday' },
    { key: 2, Name: 'Daily' },
    { key: 3, Name: 'Weekly' },
    { key: 4, Name: 'Monthly' },
    { key: 5, Name: 'Yearly' },
    { key: 6, Name: 'Custom' },
]

const DaysOfTheWeek = [
    { value: '1', label: 'Monday' },
    { value: '2', label: 'Tuesday' },
    { value: '3', label: 'Wednesday' },
    { value: '4', label: 'Thursday' },
    { value: '5', label: 'Friday' },
    { value: '6', label: 'Saturday' },
    { value: '7', label: 'Sunday' },
]

const TimeConfig = (props) => {
    const [oneTimeType, setOneTimeType] = useState(true);
    const [oneTimeData, setoneTimeData] = useState({ date: null, time: null });
    const [recurringeData, setRecurringeData] = useState({ startDate: null, endDate: null, time: null, week: '' });
    const [timesList, setTimesList] = useState([]);
    const [customRecurringDate, setCustomRecurringDate] = useState([])
    const [loading, setLoading] = useState(false);

    const onOneTimeDataChange = (value, type) => {
        setoneTimeData({ ...oneTimeData, [type]: value })
    }

    const onRecurringDataChange = (value, type) => {
        setRecurringeData({ ...recurringeData, [type]: value })
    }

    const onAddTime = () => {
        const newTimesList = [...timesList];
        if (recurringeData.time && !timesList.includes(recurringeData.time)) {
            newTimesList.push(recurringeData.time)
        }
        setTimesList(newTimesList);
    }

    const onDeleteTime = (time) => {
        const newTimesList = [...timesList];
        newTimesList.splice(timesList.indexOf(time), 1)
        setTimesList(newTimesList);
    }

    const onChangeDayOfTheWeek = (value) => {
        setCustomRecurringDate(value)
    }

    const getFormatedTimeList = () => {
        if (oneTimeType) {
            return [formatDate(oneTimeData.time, 'HH.mm')];
        } else {
            const newList = [];

            timesList.map(time => {
                newList.push(formatDate(time, 'HH.mm'))
            })

            return newList;
        }
    }

    const onUpdate = () => {
        setLoading(true);
        const params = {
            "Id": props?.Id,
            "FromDateTime": oneTimeType ? oneTimeData.date : recurringeData.startDate,
            "ToDateTime": recurringeData.endDate,
            "BasketTypeId": oneTimeType ? 1 : 2,
            "Times": getFormatedTimeList(),
            "BasketRecurringTypeId": recurringeData.week?.key,
            "CustomConfiguration": customRecurringDate.toString()
        }

        configureCommunicationBasket(params).then(() => {
            setLoading(false);
            message.success('Configuration Success');
            props?.onUpdateSuccess()
        }).catch(() => {
            setLoading(false);
            message.error('Configuration Failed')
        })
    }

    const changeConfigType = () => {
        setoneTimeData({ date: null, time: null });
        setRecurringeData({ startDate: null, endDate: null, time: null, week: '' });
        setTimesList([]);
        setCustomRecurringDate([]);
        setOneTimeType(pre => !pre);
    }

    return (
        <div className="time-config-Container">
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="m-t-20">
                <input
                    type="radio" id="OneTime" name="OneTime"
                    checked={oneTimeType} className="m-l-20"
                    onChange={changeConfigType} />
                <label className="p-r-20 p-l-20" htmlFor="OneTime">One Time</label>
                <input
                    type="radio" id="Recurring" name="Recurring"
                    checked={!oneTimeType} className="m-l-20"
                    onChange={changeConfigType} />
                <label className="p-r-20 p-l-20" htmlFor="Recurring">Recurring</label>
            </div>
            {oneTimeType ?
                <div className="m-t-20">
                    <DatePickerInput
                        placeholder='Date'
                        value={oneTimeData.date}
                        onChange={(date) => onOneTimeDataChange(date, 'date')}
                        isClearable
                    />
                    <DatePickerInput
                        placeholder='Time'
                        value={oneTimeData.time}
                        onChange={(time) => onOneTimeDataChange(time, 'time')}
                        isClearable
                        timePicker={true}
                        dateFormat="HH.mm"
                    />
                </div> :
                <div className="m-t-20">
                    <DatePickerInput
                        placeholder='Start Date'
                        value={recurringeData.startDate}
                        onChange={(date) => onRecurringDataChange(date, 'startDate')}
                        isClearable
                    />
                    <DatePickerInput
                        placeholder='End Date'
                        value={recurringeData.endDate}
                        onChange={(date) => onRecurringDataChange(date, 'endDate')}
                        isClearable
                    />
                    <div className="m-t-20">Time</div>
                    <div className="time-picker-container">
                        <div className="time-picker-width">
                            <DatePickerInput
                                placeholder='Time'
                                value={recurringeData.time}
                                onChange={(time) => onRecurringDataChange(time, 'time')}
                                isClearable
                                timePicker={true}
                                dateFormat="HH.mm"
                            />
                        </div>
                        <i className="icon-plus-circled time-picker-btn" onClick={onAddTime} />
                    </div>
                    {timesList.length > 0 &&
                        <div className="closable-time-item-container">
                            {timesList.map(time => {
                                return (
                                    <div className="closable-time-item">
                                        <i className="icon-close-small-x blue hover-hand" onClick={() => onDeleteTime(time)} />
                                        {formatDate(time, 'HH.mm')}
                                    </div>
                                )
                            })}
                        </div>
                    }

                    <div className="user-input-box m-t-15">
                        <StarDropdown
                            values={recurringTypes}
                            onChange={e => onRecurringDataChange(JSON.parse(e.target.value), 'week')}
                            selected={JSON.stringify(recurringeData.week || undefined)}
                            dataName="Name"
                            placeholder="Repeat"
                        />
                    </div>
                    {recurringeData.week?.key === 6 &&
                        <div className="user-input-box m-t-15">
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Select Dates"
                                onChange={onChangeDayOfTheWeek}
                                options={DaysOfTheWeek}
                                showArrow
                                style={{ width: '100%' }}
                            />
                        </div>
                    }
                </div>
            }
            <div className="m-t-20" style={{ alignSelf: 'center' }}>
                <button className="primary-btn" style={{ width: 150 }} onClick={onUpdate} >Set</button>
            </div>
        </div>
    )
}

export default TimeConfig;