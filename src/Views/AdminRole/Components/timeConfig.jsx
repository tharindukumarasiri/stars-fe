import React, { useState, forwardRef, useImperativeHandle, useContext } from "react";
import { message } from 'antd';

import { useBasketStore, useTimeConfigStore } from '../adminRoleStore'

import DatePickerInput from "../../../common/datePickerInput";
import { updateCommunicationBasket } from "../../../services/communicationService";
import { UserContext } from '../../../utils/contextStore';
import { formatDate } from "../../../utils";
import { messageTriggerPoints, schedulingTypes, recurringTypes, DaysOfTheWeek } from "../../../utils/constants";

const TimeConfig = forwardRef((props, ref) => {
    const basketDetails = props?.basketDetails

    const getCommunicationBasketData = useBasketStore((state) => state.getCommunicationBasketData);
    const {
        schedulingType, setSchedulingType,
        oneTimeData, setoneTimeData,
        recurringeData, setRecurringeData,
        recurringeDaily, setRecurringeDaily,
        recurringeWeekly, setRecurringeWeekly,
        recurringeMonthly, setRecurringeMonthly
    } = useTimeConfigStore();

    const [fieldErrors, setFieldErrors] = useState({ date: null, startDate: null, endDate: null, time: null });
    const [loading, setLoading] = useState(false);

    const { selectedCompany, currentUser } = useContext(UserContext);

    const onOneTimeDataChange = (value, type) => {
        setFieldErrors(prev => ({ ...prev, [type]: '' }))
        setoneTimeData({ ...oneTimeData, [type]: value })
    }

    const onRecurringDataChange = (value, type) => {
        setFieldErrors(prev => ({ ...prev, [type]: '' }))
        setRecurringeData({ ...recurringeData, [type]: value })
    }

    const getFormattedDateTime = (dateTime) => {
        if(dateTime) {
            return Date.parse(dateTime)
        } else {
            return null
        }
    }

    const validate = () => {
        let validation = true
        setFieldErrors({ date: null, startDate: null, endDate: null, time: null });

        if (schedulingType === schedulingTypes.PLANNED) {
            if (!oneTimeData.date) {
                setFieldErrors(prev => ({ ...prev, date: 'Please select a date' }))
                validation = false
            }
            if (!oneTimeData.time) {
                setFieldErrors(prev => ({ ...prev, time: 'Please select a time' }))
                validation = false
            }
        }

        if (schedulingType === schedulingTypes.RECURRING) {
            if (!recurringeData.startDate) {
                setFieldErrors(prev => ({ ...prev, startDate: 'Please select a date' }))
                validation = false
            }
            if (!recurringeData.endDate) {
                setFieldErrors(prev => ({ ...prev, endDate: 'Please select a date' }))
                validation = false
            }
        }

        return validation;
    }

    useImperativeHandle(ref, () => ({
        onUpdate() {
            if (validate()) {
                setLoading(true);

                const getShedulingParams = () => {
                    if (schedulingType === schedulingTypes.RECURRING) {
                        const getFrequency = () => {
                            switch (recurringeData.recurringType) {
                                case recurringTypes.DALY:
                                    return recurringeDaily.everyDayCount;
                                case recurringTypes.WEEKLY:
                                    return recurringeWeekly.recurEveryCount;
                                case recurringTypes.MONTHLY:
                                    return recurringeMonthly.day;
                                default:
                                    return 1;
                            }
                        }

                        const getNextScheduledDateTime = () => {
                            switch (recurringeData.recurringType) {
                                case recurringTypes.DALY:
                                    return null;
                                case recurringTypes.WEEKLY:
                                    return recurringeWeekly.nextDate;
                                case recurringTypes.MONTHLY:
                                    return recurringeMonthly.nextDate;
                                default:
                                    return null;
                            }
                        }

                        const getTime = () => {
                            switch (recurringeData.recurringType) {
                                case recurringTypes.DALY:
                                    return recurringeDaily.nextTime;
                                case recurringTypes.WEEKLY:
                                    return recurringeWeekly.nextTime;
                                case recurringTypes.MONTHLY:
                                    return recurringeMonthly.nextTime;
                                default:
                                    return null;
                            }
                        }

                        const getBasketRecurringTypeId = () => {
                            switch (recurringeData.recurringType) {
                                case recurringTypes.DALY:
                                    return 1;
                                case recurringTypes.WEEKLY:
                                    return 2;
                                case recurringTypes.MONTHLY:
                                    return 3;
                                default:
                                    return 1;
                            }
                        }

                        const getCustomConfiguration = () => {
                            switch (recurringeData.recurringType) {
                                case recurringTypes.DALY:
                                    return recurringeDaily.nextTime;
                                case recurringTypes.WEEKLY:
                                    const dateList = recurringeWeekly.selectedDays?.map(day => day?.value)
                                    return dateList.toString();
                                case recurringTypes.MONTHLY:
                                    return recurringeMonthly.day;
                                default:
                                    return null;
                            }
                        }

                        const isMonthEnd = recurringeData.recurringType === recurringTypes.MONTHLY ? recurringeMonthly.isEndOfMonth : null

                        return {
                            "FromDateTime": recurringeData.startDate,
                            "ToDateTime": recurringeData.endDate,
                            "NextScheduledDateTime": getNextScheduledDateTime(),
                            "BasketTypeId": 3,
                            "Time": getTime(),
                            "Frequency": getFrequency(),
                            "BasketRecurringTypeId": getBasketRecurringTypeId(),
                            "CustomConfiguration": getCustomConfiguration(),
                            "IsMonthEnd": isMonthEnd
                        }
                    } else {
                        return {
                            "FromDateTime": schedulingType !== schedulingTypes.IMMIDIATE ? oneTimeData.date : null,
                            "Time": schedulingType !== schedulingTypes.IMMIDIATE ? oneTimeData.time : null,
                            "BasketTypeId": schedulingType === schedulingTypes.IMMIDIATE ? 1 : 2,
                            "UserId": currentUser?.Id,
                            "IsDeleteReceivers": oneTimeData.deleteReciver
                        }
                    }
                }

                const params = {
                    CommunicationBasket: {
                        ...getShedulingParams(),
                        "Id": props?.Id || 0,
                        "Name": basketDetails?.name,
                        "Description": basketDetails?.description,
                        "BasketStatusId": basketDetails?.BasketStatusId || null,
                        "MessageTemplateId": basketDetails?.template?.Id,
                        "MessageTypeId": basketDetails?.template?.MessageTypeId,
                        "MessageMediumId": basketDetails?.template?.MessageMediumId,
                        "CompanyPartyId": selectedCompany?.companyId,
                        "UserId": currentUser?.Id,
                        "IsScheduled": true,
                    },
                    Time: formatDate(getShedulingParams().Time, 'HH.mm')
                }

                updateCommunicationBasket(params).then(() => {
                    setLoading(false);
                    message.success('Configuration Success');
                    props?.setCurrentStep(pre => ++pre)

                    const basketParams = {
                        "PageSize": 10,
                        "PageCount": 1,
                        "CompanyPartyId": selectedCompany?.companyId
                    }
                    getCommunicationBasketData(basketParams)
                }).catch(() => {
                    setLoading(false);
                    message.error('Configuration Failed')
                })
            }
        }
    }));


    const changeConfigType = (e) => {
        setoneTimeData({ date: null, time: null, deleteReciver: false });
        setRecurringeData({ startDate: null, endDate: null, recurringType: recurringTypes.DALY });
        setFieldErrors({ date: null, startDate: null, endDate: null, time: null });
        setSchedulingType(e.target.name);
    }

    const changeRecurringType = (e) => {
        setRecurringeData({ ...recurringeData, recurringType: e.target.name })
    }

    const changeRecurringDailyData = (type, value) => {
        setRecurringeDaily({ ...recurringeDaily, [type]: value })
    }

    const onEveryDayCountChange = (e) => {
        e.preventDefault();
        setRecurringeDaily({ ...recurringeDaily, everyDayCount: e.target.value.replace(/[^0-9]+$/gi, '') })
    }

    const onEveryWeekCountChange = (e) => {
        e.preventDefault();
        setRecurringeWeekly({ ...recurringeWeekly, recurEveryCount: e.target.value.replace(/[^0-9]+$/gi, '') })
    }

    const changeRecurringWeeklyData = (type, value) => {
        setRecurringeWeekly({ ...recurringeWeekly, [type]: value })
    }

    const onWeekDayCheckBox = (day) => {
        const newSelectedDays = [...recurringeWeekly.selectedDays]

        const index = newSelectedDays.findIndex(d => d.value === day.value)
        if (index < 0) {
            newSelectedDays.push(day)
        } else {
            newSelectedDays.splice(index, 1)
        }

        setRecurringeWeekly({ ...recurringeWeekly, selectedDays: newSelectedDays })
    }

    const onEveryMonthCountChange = (e, type) => {
        e.preventDefault();
        setRecurringeMonthly({ ...recurringeMonthly, [type]: e.target.value.replace(/[^0-9]+$/gi, '') })
    }

    const changeRecurringMonthlyData = (type, value) => {
        setRecurringeMonthly({ ...recurringeMonthly, [type]: value })
    }

    const recurringContent = () => {
        switch (recurringeData.recurringType) {
            case recurringTypes.DALY:
                return (
                    <div className="time-input-container m-l-20 p-l-20">
                        <div className="g-row">
                            <div className="g-col-4">
                                <input
                                    type="radio" id='EVERY_DAY' name='EVERY_DAY'
                                    checked={recurringeDaily.isEveryDay}
                                    onChange={() => changeRecurringDailyData('isEveryDay', true)} />
                                <label className="p-l-20" htmlFor='EVERY_DAY'>Every</label>
                            </div>
                            <div className="g-col-4">
                                <input
                                    type="text" className={`m-b-20 ${!recurringeDaily.isEveryDay && 'disable-div'}`}
                                    value={recurringeDaily.everyDayCount}
                                    onChange={onEveryDayCountChange} />
                            </div>
                            <div className="g-col-4 text-center">
                                Day/s
                            </div>
                        </div>
                        <div className="g-row m-b-20">
                            <input
                                type="radio" id='EVERY_WEEKLY' name='EVERY_WEEKLY'
                                checked={!recurringeDaily.isEveryDay}
                                onChange={() => changeRecurringDailyData('isEveryDay', false)} />
                            <label className="p-l-20" htmlFor='EVERY_WEEKLY'>Every weekday</label>
                        </div>
                        <div className={`g-row ${recurringeDaily.isEveryDay && 'disable-div'}`}>
                            <DatePickerInput
                                placeholder='Next Time'
                                value={recurringeDaily.nextTime}
                                onChange={(time) => changeRecurringDailyData('nextTime', time)}
                                isClearable
                                timePicker={true}
                                dateFormat="HH.mm"
                            />
                        </div>
                    </div>
                )
            case recurringTypes.WEEKLY:
                return (
                    <div className="recurr-weekly-container m-l-20 p-l-20">
                        <div className="g-row">
                            <div className="g-col-4">
                                Recur every
                            </div>
                            <div className="g-col-4">
                                <input
                                    type="text" className="m-b-20"
                                    value={recurringeWeekly.recurEveryCount}
                                    onChange={onEveryWeekCountChange} />
                            </div>
                            <div className="g-col-4 text-center">
                                week(s) on:
                            </div>
                        </div>
                        <div className="g-row m-b-20">
                            {DaysOfTheWeek.map(day => {
                                return (
                                    <div className="g-col-1 m-r-15" key={day.value}>
                                        <div>{day.label}</div>
                                        <input
                                            type="checkbox"
                                            className="check-box"
                                            checked={recurringeWeekly.selectedDays.some(d => d.value === day.value)}
                                            onChange={() => { onWeekDayCheckBox(day) }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="m-b-20">
                            <DatePickerInput
                                placeholder='Next Date'
                                value={getFormattedDateTime(recurringeWeekly.nextDate)}
                                onChange={(date) => changeRecurringWeeklyData('nextDate', date)}
                                isClearable
                            />
                        </div>
                        <DatePickerInput
                            placeholder='Next Time'
                            value={recurringeWeekly.nextTime}
                            onChange={(time) => changeRecurringWeeklyData('nextTime', time)}
                            isClearable
                            timePicker={true}
                            dateFormat="HH.mm"
                        />
                    </div>
                )
            case recurringTypes.MONTHLY:
                return (
                    <div className="recurr-weekly-container m-l-20 p-l-20">
                        <div className="g-row">
                            <div className="g-col-3">
                                <input
                                    type="radio" id='DAY_INP' name='DAY_INP'
                                    checked={!recurringeMonthly.isEndOfMonth}
                                    onChange={() => changeRecurringMonthlyData('isEndOfMonth', false)} />
                                <label className="p-l-20" htmlFor='DAY_INP'>Day</label>
                            </div>
                            <div className="g-col-2">
                                <input
                                    type="text" className={`m-b-20 ${recurringeMonthly.isEndOfMonth && 'disable-div'}`}
                                    value={recurringeMonthly.day}
                                    onChange={(e) => onEveryMonthCountChange(e, 'day')} />
                            </div>
                            <div className="g-col-9"></div>
                        </div>
                        <div className={`m-b-20 ${recurringeMonthly.isEndOfMonth && 'disable-div'}`}>
                            <DatePickerInput
                                placeholder='Next Date'
                                value={getFormattedDateTime(recurringeMonthly.nextDate)}
                                onChange={(date) => changeRecurringMonthlyData('nextDate', date)}
                                isClearable
                            />
                        </div>
                        <div className={`m-b-20 ${recurringeMonthly.isEndOfMonth && 'disable-div'}`}>
                            <DatePickerInput
                                placeholder='Next Time'
                                value={recurringeMonthly.nextTime}
                                onChange={(time) => changeRecurringMonthlyData('nextTime', time)}
                                isClearable
                                timePicker={true}
                                dateFormat="HH.mm"
                            />
                        </div>
                        <div>
                            <input
                                type="radio" id='END_OF_MONTH' name='END_OF_MONTH'
                                checked={recurringeMonthly.isEndOfMonth}
                                onChange={() => changeRecurringMonthlyData('isEndOfMonth', true)} />
                            <label className="p-l-20" htmlFor='END_OF_MONTH'>End of the Month</label>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    const renderRecurringContent = () => {
        if(basketDetails.template === null ||
            (basketDetails.template?.MessageTriggerPointId !== messageTriggerPoints.CompanyInvitation &&
                basketDetails.template?.MessageTriggerPointId !== messageTriggerPoints.UserInvitationNewUser)){
            return (
                <>
                    <div className="m-b-20">
                        You can schedule a basket to send emails with a time interval
                    </div>
                    <div className="m-b-15 time-input-container">

                        <DatePickerInput
                            placeholder='START_DATE'
                            value={getFormattedDateTime(recurringeData.startDate)}
                            onChange={(date) => onRecurringDataChange(date, 'startDate')}
                            isClearable
                            minDate={new Date()}
                            error={fieldErrors.startDate}
                        />
                        <DatePickerInput
                            placeholder='END_DATE'
                            value={getFormattedDateTime(recurringeData.endDate)}
                            onChange={(date) => onRecurringDataChange(date, 'endDate')}
                            isClearable
                            minDate={new Date()}
                            error={fieldErrors.endDate}
                        />
                    </div>
                    <div className="g-row">
                        <div className="g-col-3 m-b-10 recurring-types-container">
                            <input
                                type="radio" id={recurringTypes.DALY} name={recurringTypes.DALY}
                                checked={recurringeData.recurringType === recurringTypes.DALY} className="m-l-20"
                                onChange={changeRecurringType} />
                            <label className="p-l-20" htmlFor={recurringTypes.DALY}>Daily</label>
                            <input
                                type="radio" id={recurringTypes.WEEKLY} name={recurringTypes.WEEKLY}
                                checked={recurringeData.recurringType === recurringTypes.WEEKLY} className="m-l-20"
                                onChange={changeRecurringType} />
                            <label className="p-l-20" htmlFor={recurringTypes.WEEKLY}>Weekly</label>
                            <input
                                type="radio" id={recurringTypes.MONTHLY} name={recurringTypes.MONTHLY}
                                checked={recurringeData.recurringType === recurringTypes.MONTHLY} className="m-l-20"
                                onChange={changeRecurringType} />
                            <label className="p-l-20" htmlFor={recurringTypes.MONTHLY}>Monthly</label>
                        </div>
                        <div className="g-col-9">
                            {recurringContent()}
                        </div>
                    </div>
                </>
            )
        } else {
            if(schedulingType === schedulingTypes.RECURRING){
                setSchedulingType(schedulingTypes.PLANNED)
            }
            return null
        }
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
                    type="radio" id={schedulingTypes.IMMIDIATE} name={schedulingTypes.IMMIDIATE}
                    checked={schedulingType === schedulingTypes.IMMIDIATE} className="m-l-20"
                    onChange={changeConfigType} />
                <label className="p-r-20 p-l-20" htmlFor={schedulingTypes.IMMIDIATE}>Immidiate</label>
                <input
                    type="radio" id={schedulingTypes.PLANNED} name={schedulingTypes.PLANNED}
                    checked={schedulingType === schedulingTypes.PLANNED} className="m-l-20"
                    onChange={changeConfigType} />
                <label className="p-r-20 p-l-20" htmlFor={schedulingTypes.PLANNED}>Planned</label>
                {
                    basketDetails.template === null ||
                    (basketDetails.template?.MessageTriggerPointId !== messageTriggerPoints.CompanyInvitation &&
                        basketDetails.template?.MessageTriggerPointId !== messageTriggerPoints.UserInvitationNewUser) &&
                    <>
                        <input
                            type="radio" id={schedulingTypes.RECURRING} name={schedulingTypes.RECURRING}
                            checked={schedulingType === schedulingTypes.RECURRING} className="m-l-20"
                            onChange={changeConfigType} />
                        <label className="p-r-20 p-l-20" htmlFor={schedulingTypes.RECURRING}>Recurring</label>
                    </>
                }

            </div>
            {schedulingType !== schedulingTypes.RECURRING ?
                <>
                    {schedulingType === schedulingTypes.IMMIDIATE ?
                        <>
                            <div className="m-b-20">
                                You can send message immideately
                            </div>
                        </>
                        : <>
                            <div className="m-b-20">
                                You can schedule a basket to stat sending emails after 30 minutes.  Make sure you complete scheduling within 30 mintues
                            </div>
                            <div className="m-t-20 m-b-15 time-input-container">
                                <DatePickerInput
                                    placeholder='Start Date'
                                    value={getFormattedDateTime(oneTimeData.date)}
                                    onChange={(date) => onOneTimeDataChange(date, 'date')}
                                    isClearable
                                    minDate={new Date()}
                                    error={fieldErrors.date}
                                />
                                <DatePickerInput
                                    placeholder='Time'
                                    value={oneTimeData.time}
                                    onChange={(time) => onOneTimeDataChange(time, 'time')}
                                    isClearable
                                    timePicker={true}
                                    dateFormat="HH.mm"
                                    error={fieldErrors.time}
                                />
                            </div>
                        </>
                    }
                    <div className="g-row">
                        <input
                            type="checkbox"
                            className="check-box g-col-1"
                            checked={oneTimeData.deleteReciver}
                            onChange={(e) => onOneTimeDataChange(e.target.checked, 'deleteReciver')}
                        />
                        <div className="g-col-11">Delete “Receivers list” after sent</div>
                    </div>
                </>
                : renderRecurringContent()
            }
        </div >
    )
})

export default TimeConfig;