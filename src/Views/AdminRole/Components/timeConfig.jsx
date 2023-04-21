import React, { useState, useEffect  } from "react";
import { Select, message } from 'antd';
import { useTranslation } from "react-i18next";

import DatePickerInput from "../../../common/datePickerInput";
import StarDropdown from "../../../common/dropdown";
import { configureCommunicationBasket } from "../../../services/communicationService";
import { formatDate } from "../../../utils";
import { FetchCurrentUser } from "../../../hooks/index"

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
    const [fieldErrors, setFieldErrors] = useState({ date: null, startDate: null, endDate: null, time: null, week: '', custRecurring: '' });
    const [timesList, setTimesList] = useState([]);
    const [customRecurringDate, setCustomRecurringDate] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentUser] = FetchCurrentUser();

    const {t} = useTranslation();

    useEffect(() => {
        if(currentUser?.PartyId){
            setLoading(false);
        }
    },[currentUser])

    const onOneTimeDataChange = (value, type) => {
        setFieldErrors(prev => ({ ...prev, [type]: '' }))
        setoneTimeData({ ...oneTimeData, [type]: value })
    }

    const onRecurringDataChange = (value, type) => {
        setFieldErrors(prev => ({ ...prev, [type]: '' }))
        setRecurringeData({ ...recurringeData, [type]: value })
    }

    const onAddTime = () => {
        setFieldErrors(prev => ({ ...prev, time: '' }))
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
        setFieldErrors(prev => ({ ...prev, custRecurring: '' }))
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

    const validate = () => {
        let validation = true
        setFieldErrors({ date: null, startDate: null, endDate: null, time: null, week: '', custRecurring: '' });
        if (oneTimeType) {
            if (!oneTimeData.date) {
                setFieldErrors(prev => ({ ...prev, date: 'Please select a date' }))
                validation = false
            }
            if (!oneTimeData.time) {
                setFieldErrors(prev => ({ ...prev, time: 'Please select a time' }))
                validation = false
            }
        } else {
            if (!recurringeData.startDate) {
                setFieldErrors(prev => ({ ...prev, startDate: 'Please select a date' }))
                validation = false
            }
            if (timesList.length === 0) {
                setFieldErrors(prev => ({ ...prev, time: 'Please select and add time/s' }))
                validation = false
            }
            if (!recurringeData.week) {
                setFieldErrors(prev => ({ ...prev, week: 'Please select repeat method' }))
                validation = false
            }
            if (recurringeData.week?.key === 6 && customRecurringDate.length === 0) {
                setFieldErrors(prev => ({ ...prev, custRecurring: 'Please select date(s)' }))
                validation = false
            }
        }

        return validation
    }

    const onUpdate = () => {
        if (validate()) {
            setLoading(true);
            const params = {
                "Id": props?.Id,
                "FromDateTime": oneTimeType ? oneTimeData.date : recurringeData.startDate,
                "ToDateTime": recurringeData.endDate,
                "BasketTypeId": oneTimeType ? 1 : 2,
                "Times": getFormatedTimeList(),
                "BasketRecurringTypeId": recurringeData.week?.key,
                "CustomConfiguration": customRecurringDate.toString(),
                "UserPartyId": currentUser?.PartyId
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
    }

    const changeConfigType = () => {
        setoneTimeData({ date: null, time: null });
        setRecurringeData({ startDate: null, endDate: null, time: null, week: '' });
        setFieldErrors({ date: null, startDate: null, endDate: null, time: null, week: '', custRecurring: '' });
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
                <label className="p-r-20 p-l-20" htmlFor="OneTime">{t('ONE_TIME')}</label>
                <input
                    type="radio" id="Recurring" name="Recurring"
                    checked={!oneTimeType} className="m-l-20"
                    onChange={changeConfigType} />
                <label className="p-r-20 p-l-20" htmlFor="Recurring">{t('RECURRING')}</label>
            </div>
            {oneTimeType ?
                <div className="m-t-20">
                    <DatePickerInput
                        placeholder='DATE'
                        value={oneTimeData.date}
                        onChange={(date) => onOneTimeDataChange(date, 'date')}
                        isClearable
                        minDate={new Date()}
                        error={fieldErrors.date}
                    />
                    <DatePickerInput
                        placeholder='TIME'
                        value={oneTimeData.time}
                        onChange={(time) => onOneTimeDataChange(time, 'time')}
                        isClearable
                        timePicker={true}
                        dateFormat="HH.mm"
                        error={fieldErrors.time}
                    />
                </div> :
                <div className="m-t-20">
                    <DatePickerInput
                        placeholder='START_DATE'
                        value={recurringeData.startDate}
                        onChange={(date) => onRecurringDataChange(date, 'startDate')}
                        isClearable
                        minDate={new Date()}
                        error={fieldErrors.startDate}
                    />
                    <DatePickerInput
                        placeholder='END_DATE'
                        value={recurringeData.endDate}
                        onChange={(date) => onRecurringDataChange(date, 'endDate')}
                        isClearable
                        minDate={new Date()}
                    />
                    <div className="m-t-20">Time</div>
                    <div className="time-picker-container">
                        <div className="time-picker-width">
                            <DatePickerInput
                                placeholder='TIME'
                                value={recurringeData.time}
                                onChange={(time) => onRecurringDataChange(time, 'time')}
                                isClearable
                                timePicker={true}
                                dateFormat="HH.mm"
                                error={fieldErrors.time}
                            />
                        </div>
                        <i className="icon-plus-circled time-picker-btn" onClick={onAddTime} />
                    </div>
                    {timesList.length > 0 &&
                        <div className="closable-time-item-container">
                            {timesList.map(time => {
                                return (
                                    <div className="closable-time-item">
                                        <i className="icon-x-bold blue hover-hand" onClick={() => onDeleteTime(time)} />
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
                            placeholder="REPEAT"
                            error={fieldErrors.week}
                        />
                    </div>
                    {recurringeData.week?.key === 6 &&
                        <>
                            <div className="user-input-box m-t-15">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder={t('SELECT_DATES')}
                                    onChange={onChangeDayOfTheWeek}
                                    options={DaysOfTheWeek}
                                    showArrow
                                    style={{ width: '100%' }}
                                />
                            </div>
                            {fieldErrors.custRecurring &&
                                <div className="error-text">
                                    {fieldErrors.custRecurring}
                                </div>
                            }
                        </>
                    }
                </div>
            }
            <div className="m-t-20" style={{ alignSelf: 'center' }}>
                <button className="primary-btn" style={{ width: 150 }} onClick={onUpdate} >{t('SET')}</button>
            </div>
            <div className="text-center m-t-20">
                {t('CONFIG_MSG')}
            </div>
        </div >
    )
}

export default TimeConfig;