import React, { useState, useMemo, useContext, useEffect } from "react";
import { Table, Modal } from 'antd';
import moment from "moment";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useDiagramStore } from './chartDrawingStore'
import style from './chartDrawingStyle.module.scss'

import { CollectionsTableHeaders } from '../../utils/tableHeaders'
import StarDropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import Input from "../../common/input";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { TabContext } from "../../utils/contextStore";
import { useTranslation } from "react-i18next";
import { getContacts } from "../../services/userService";

const diagramTypes = [
    'Flows',
    'Structures and Hiarchies',
    'Data Collection',
    'Data Mapping',
    'Data Object Structure',
    'Data Visualization',
]
const { confirm } = Modal;

const DrawingToolHome = () => {
    const diagramData = useDiagramStore((state) => state.diagramData);
    const loading = useDiagramStore((state) => state.loading);

    const [showModel, setShowModel] = useState(false)
    const [newDiagramData, setNewDiagramData] = useState({ Name: '', TypeCode: '', Description: '', Permission: 'Private', FromDate: '', ToDate: '', Responsible: '', Status: '' });
    const [filterdContacts, setFilteredContacts] = useState([]);
    const [filterTypes, setFilterTypes] = useState({ name: '', startDate: null, endDate: null })

    const { t } = useTranslation();

    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        getContactsList();
    }, [])

    const tableHeaders = useMemo(() => {
        const headers = CollectionsTableHeaders(t);
        headers.push({
            title: '',
            render: (_, { }) => (
                <div className={style.collectionTableIconRow} >
                    <i className="icon-edit table-icon" ></i>
                    <i className="icon-delete table-icon" onClick={onClickDeletCollection}></i>
                </div>
            ),
            width: 160,
        },
        )
        return headers
    }, [diagramData])

    const onClickDeletCollection = (e) => {
        e.stopPropagation();
        showDeleteConfirm();
    }

    const showDeleteConfirm = (record, user) => {
        confirm({
            title: <strong className="red">{t("ARE_YOU_SURE")}?</strong>,
            icon: <ExclamationCircleOutlined />,

            okText: t('YES'),
            okType: 'danger',
            cancelText: t('NO'),

            onOk() {

            },

        });
    };

    const getContactsList = async () => {
        const response = await getContacts();
        const options = response ? response.map((user) => {
            return {
                key: user.PartyTId,
                label: user.Name,
                value: user.Name
            };
        }) : [];

        setFilteredContacts(options);
    };

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
        setShowModel(pre => !pre);
        setNewDiagramData({ Name: '', TypeCode: '', Description: '', Permission: 'Private', FromDate: '', ToDate: '', Responsible: '', Status: '' })
    }

    const onSave = () => {
        if (newDiagramData.Name !== '') {
            toggleModal()
            // changeActiveTab(NAVIGATION_PAGES.CHART_DRAWING, { name: newDiagramData.Name }, true, newDiagramData.Name)
            changeActiveTab(NAVIGATION_PAGES.COLLECTION_DETAILS, { name: newDiagramData.Name }, true, newDiagramData.Name)
        }
    }

    const onClickRow = (params) => {
        // changeActiveTab(NAVIGATION_PAGES.CHART_DRAWING, { ...params }, true, params.name)
        changeActiveTab(NAVIGATION_PAGES.COLLECTION_DETAILS, { ...params }, true, params.name)
    }

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewDiagramData({ ...newDiagramData, [elementName]: e.target.value })
    }

    const onNewElementDateChange = (date, elementName) => {
        setNewDiagramData({ ...newDiagramData, [elementName]: moment(date).local().format('YYYY-MM-DD') })
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
                    <button className="add-btn" onClick={toggleModal} >Create Collection</button>
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
                title="Create Collection"
                visible={showModel}
                centered={true}
                closeIcon={< i className='icon-close close-icon' />}
                okText="Save"
                onOk={onSave}
                onCancel={toggleModal}
                width={1000}
            >
                <div className="g-row">
                    <div className="g-col-6">
                        <Input
                            value={newDiagramData?.Name || ''}
                            placeholder='Name'
                            onChange={(e) => onNewElementChange(e, 'Name')} />
                        <StarDropdown
                            placeholder="TYPE"
                            values={diagramTypes}
                            onChange={(e) => onNewElementChange(e, 'TypeCode')}
                            selected={newDiagramData.TypeCode || ''}
                        />
                        <Input lines={3} placeholder="DESCRIPTION" value={newDiagramData.Description || ''} onChange={(e) => onNewElementChange(e, 'Description')} />
                        <StarDropdown values={['PUBLIC', 'PRIVATE']} onChange={(e) => onNewElementChange(e, 'Permission')} selected={newDiagramData.Permission || 'PRIVATE'} placeholder="PERMISSION_TYPE" />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput placeholder={t('FROM_DATE')} value={newDiagramData.FromDate ? new Date(newDiagramData.FromDate) : ''} minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'FromDate')} />
                        <DatePickerInput placeholder={t('DUE_DATE')} value={newDiagramData.ToDate ? new Date(newDiagramData.ToDate) : ''} minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'ToDate')} />
                        <StarDropdown
                            values={filterdContacts.map(a => a.label)}
                            onChange={(e) => onNewElementChange(e, 'Responsible')}
                            selected={newDiagramData.Responsible || ''}
                            placeholder={"RESPONSIBLE_USER"}
                        />
                        <StarDropdown values={['OPEN', 'CLOSE']} onChange={(e) => onNewElementChange(e, 'Status')} selected={newDiagramData.Status || ''} placeholder="STATUS" />
                    </div>
                </div>
                <div className="n-float" />
                <div className="n-float" />
            </Modal>
        </div>
    )
}

export default DrawingToolHome;