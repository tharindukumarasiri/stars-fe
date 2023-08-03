import React, { useState, useMemo, useContext } from "react";
import { Table, Modal } from 'antd';

import { useDiagramStore } from './chartDrawingStore'

import { SavedDiagramsTableHeaders } from '../../utils/tableHeaders'
import StarDropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import Input from "../../common/input";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { TabContext } from "../../utils/contextStore";
import { useTranslation } from "react-i18next";

const diagramTypes = [
    'Flows',
    'Structures and Hiarchies',
    'Data Collection',
    'Data Mapping',
    'Data Object Structure',
    'Data Visualization',
]

const DrawingToolHome = () => {
    const diagramData = useDiagramStore((state) => state.diagramData);
    const loading = useDiagramStore((state) => state.loading);

    const [dropDownData, setDropDownData] = useState({ type: [], status: [] })
    const [showModel, setShowModel] = useState(false)
    const [diagramName, setDiagramName] = useState('');
    const [diagramType, setDiagramType] = useState('');
    const [filterTypes, setFilterTypes] = useState({ startDate: null, endDate: null, type: null, status: null })

    const { t } = useTranslation();

    const { changeActiveTab } = useContext(TabContext);

    const tableHeaders = useMemo(() => {
        const headers = SavedDiagramsTableHeaders(t);
        headers.push({
            title: '',
            render: (_, { }) => (
                <>
                    <i className="icon-edit table-icon" onClick={(e) => { }}></i>
                    <i className="icon-delete table-icon red" onClick={(e) => { }}></i>
                </>
            ),
            width: 80,
        },
        )

        return headers

    }, [diagramData])

    const onChangeFilterType = (e, elementName) => {
        e.preventDefault();
        setFilterTypes({ ...filterTypes, [elementName]: JSON.parse(e.target.value) });
    }

    const onFilterTypeDateChange = (date, elementName) => {
        setFilterTypes({ ...filterTypes, [elementName]: date });
    };

    const onFilter = (e) => {
        e.preventDefault();
    }

    const toggleModal = () => {
        setShowModel(pre => !pre);
        setDiagramName('');
        setDiagramType('');
    }
    const onSave = () => {
        if (diagramName !== '' && diagramType !== '') {
            changeActiveTab(NAVIGATION_PAGES.CHART_DRAWING, { name: diagramName })
        }
    }

    const onNameChange = (e) => {
        e.preventDefault();
        setDiagramName(e.target.value)
    }

    const onChangeType = (e) => {
        e.preventDefault();
        setDiagramType(e.target.value)
    }

    const onClickRow = (params) => {
        changeActiveTab(NAVIGATION_PAGES.CHART_DRAWING, { ...params })
    }

    return (
        <div className={loading ? 'loading-overlay' : ''}>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="com-top-container user-input-box">
                <div className="create-new-btn">
                    <button className="add-btn" onClick={toggleModal} >{t('CREATE_NEW')}</button>
                </div>

                <div className="filter-by-text">{t('FILTER_BY')}:</div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder={t('START_DATE')}
                        value={filterTypes.startDate}
                        onChange={(date) => onFilterTypeDateChange(date, "startDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <DatePickerInput
                        placeholder={t('END_DATE')}
                        value={filterTypes.endDate}
                        onChange={(date) => onFilterTypeDateChange(date, "endDate")}
                        isClearable
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.type}
                        onChange={e => onChangeFilterType(e, 'type')}
                        selected={JSON.stringify(filterTypes.type || undefined)}
                        dataName="Name"
                        placeholder='TYPE'
                    />
                </div>
                <div className="com-drop-down-width">
                    <StarDropdown
                        values={dropDownData.status}
                        onChange={e => onChangeFilterType(e, 'status')}
                        selected={JSON.stringify(filterTypes.status || undefined)}
                        dataName="Name"
                        placeholder='STATUS'
                    />
                </div>
                <button className="add-btn" onClick={onFilter} >{t('FILTERS')}</button>

            </div>
            <div className="page-container">
                <div className="tablele-width">
                    <Table
                        rowKey={(record, index) => index}
                        dataSource={diagramData}
                        scroll={{
                            y: '60vh',
                        }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => onClickRow(record),
                            };
                        }}
                        columns={tableHeaders}
                        pagination={false}
                    />
                </div>
                {/* <div className="action-bar">
                    <div className="flex-center-middle m-t-20">
                        <Pagination size="small" current={pageNumber} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
                    </div>
                </div> */}
            </div>
            <Modal
                title="New Strategy"
                visible={showModel}
                width={350}
                centered={true}
                closeIcon={< i className='icon-close close-icon' />}
                okText="Save"
                onOk={onSave}
                onCancel={toggleModal}
            >
                <div>
                    <Input value={diagramName} placeholder='Name' onChange={onNameChange} />
                    <StarDropdown
                        placeholder='Type'
                        values={diagramTypes}
                        onChange={onChangeType}
                        selected={diagramType}
                    />
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    )
}

export default DrawingToolHome;