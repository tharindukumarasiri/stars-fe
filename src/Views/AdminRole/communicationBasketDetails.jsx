import React, { useState } from "react";
import { Tabs, Dropdown, Menu } from 'antd';

import newsletter from "../../assets/images/newsletter.png"
import DatePickerInput from "../../common/datePickerInput";
import StarDropdown from "../../common/dropdown";
import { formatDate } from "../../utils";
import Input from '../../common/input'

const { TabPane } = Tabs;

const recurringTypes = [
    { key: 'MON_TO_FRI', Name: 'Monday to Friday' },
    { key: 'DAILY', Name: 'Daily' },
    { key: 'WEEKLY', Name: 'Weekly' },
    { key: 'MONTHLY', Name: 'Monthly' },
    { key: 'YEARLY', Name: 'Yearly' },
    { key: 'CUSTOM', Name: 'Custom' },
]

const actions = (
    <Menu>
        <Menu.Item>Act 1</Menu.Item>
    </Menu>
);

const CommunicationBasketDetails = (props) => {
    const [oneTimeType, setOneTimeType] = useState(true);
    const [oneTimeData, setoneTimeData] = useState({ date: null, time: null });
    const [recurringeData, setRecurringeData] = useState({ startDate: null, endDate: null, time: null, week: '' });
    const [timesList, setTimesList] = useState([]);
    const [customRecurringDate, setCustomRecurringDate] = useState('')

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

    const onChangeCustomDateInput = (e) => {
        setCustomRecurringDate(e.target.value);
    }

    return (
        <>
            <div className="com-top-container">
                <div className="com-drop-down-width m-l-20">
                    Basket ID
                    <div className="body-text-bold">{props?.Id}</div>
                </div>
                <div className="com-drop-down-width">
                    Basket Name
                    <div className="body-text-bold">{props?.Id}</div>
                </div>
                <div className="com-drop-down-width">
                    Created Date
                    <div className="body-text-bold">{props?.Id}</div>
                </div>
                <div className="com-drop-down-width">
                    Basket Type
                    <div className="body-text-bold">{props?.Id}</div>
                </div>
                <div className="com-drop-down-width">
                    Communication Type
                    <div className="body-text-bold">{props?.Id}</div>
                </div>
                <div className="com-drop-down-width">
                    Status
                    <div className="body-text-bold">{props?.Id}</div>
                </div>

            </div>
            <div className="page-container">
                <div className="custom-tab-container">
                    <Tabs type="card" style={{ width: '90vw' }} >
                        <TabPane tab="GENERAL" key="1">
                            <div className="basket-details-container">
                                <img src={newsletter} className="newsletter-img" />
                                <div className="basket-geneal-txt-container">
                                    <h2 className="text-left m-b-15">Newsletter</h2>
                                    <div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt quis nostrud exercitatn. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore e
                                    </div>
                                </div>
                                <div className="general-content-container">
                                    <div className="general-btns-container">
                                        <div className="hover-hand m-r-20 p-r-20">
                                            <i className="icon-summary basket-table-icon blue" /> View Logs
                                        </div>
                                        <div className="hover-hand m-l-20">
                                            <i className="icon-config basket-table-icon blue" alt='img' /> Config
                                        </div>
                                    </div>
                                    <div className="general-type-container">
                                        <div className="text-center">Type</div>
                                        <div className="m-t-20">
                                            <input
                                                type="radio" id="OneTime" name="OneTime"
                                                checked={oneTimeType} className="m-l-20"
                                                onChange={() => { setOneTimeType(pre => !pre) }} />
                                            <label className="p-r-20 p-l-20" htmlFor="OneTime">One Time</label>
                                            <input
                                                type="radio" id="Recurring" name="Recurring"
                                                checked={!oneTimeType} className="m-l-20"
                                                onChange={() => { setOneTimeType(pre => !pre) }} />
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
                                                    dateFormat="h:mm aa"
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
                                                            dateFormat="h:mm aa"
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
                                                                    {formatDate(time, "h:mm a")}
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
                                                {recurringeData.week?.key === 'CUSTOM' &&
                                                    <div className="user-input-box m-t-15">
                                                        <Input placeholder="Dates" value={customRecurringDate} onChange={onChangeCustomDateInput} />
                                                    </div>
                                                }
                                            </div>
                                        }

                                    </div>
                                </div>
                                <Dropdown
                                    overlay={actions} placement="topRight" arrow
                                >
                                    <button className="primary-btn select-actions-btn" >Seletct Action</button>
                                </Dropdown>
                            </div>
                        </TabPane>
                        <TabPane tab="RECEVERS" key="2">

                        </TabPane>
                    </Tabs>
                </div>

            </div>


        </>
    )
}

export default CommunicationBasketDetails;