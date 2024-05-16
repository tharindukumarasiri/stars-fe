import React, { useState, useContext } from "react";
import { Table } from 'antd';

import { SurveyTableHeaders } from '../../utils/tableHeaders'
import DatePickerInput from "../../common/datePickerInput";
import Input from "../../common/input";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { TabContext } from "../../utils/contextStore";
import { useTranslation } from "react-i18next";

const DrawingToolHome = () => {
    const [filterTypes, setFilterTypes] = useState({ name: '', startDate: null, endDate: null })

    const { t } = useTranslation();

    const { changeActiveTab } = useContext(TabContext);

    const onFilterTypeDateChange = (date, elementName) => {
        setFilterTypes({ ...filterTypes, [elementName]: date });
    };

    const onfilterNameChange = (e) => {
        e.preventDefault();
        onFilterTypeDateChange(e.target.value, 'name')
    }

    const onFilter = (e) => {
        e.preventDefault();
    }

    const toggleModal = () => {
        changeActiveTab(NAVIGATION_PAGES.SURVEY_CREATE, {}, true, 'New Survey')
    }

    const onClickRow = (params) => {
        changeActiveTab(NAVIGATION_PAGES.SURVEY_CREATE, { ...params }, true, params.Name)
    }

    return (
        <div>
            <div className="com-top-container user-input-box">
                <div className="create-new-btn">
                    <button className="add-btn" onClick={toggleModal} >Create Survey</button>
                </div>

                <div className="com-drop-down-width">
                    <Input
                        value={filterTypes?.name || ''}
                        placeholder='Name/ ID'
                        onChange={onfilterNameChange} />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder={t('FROM_DATE')}
                        value={filterTypes.startDate}
                        onChange={(date) => onFilterTypeDateChange(date, "startDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder={t('TO_DATE')}
                        value={filterTypes.endDate}
                        onChange={(date) => onFilterTypeDateChange(date, "endDate")}
                        isClearable
                    />
                </div>
                <button className="add-btn" onClick={onFilter} >{t('FILTERS')}</button>

            </div>
            <div className="page-container">
                <div className="tablele-width">
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={[]}
                        scroll={{
                            y: '60vh',
                        }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => onClickRow(record),
                            };
                        }}
                        columns={SurveyTableHeaders}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default DrawingToolHome;