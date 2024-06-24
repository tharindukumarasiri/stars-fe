import React, { useState, useMemo, useContext, useEffect } from "react";
import { Table, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useDiagramStore } from './chartDrawingStore'
import style from './chartDrawingStyle.module.scss'

import { getKeyByValue } from "../../utils";
import { CollectionsTableHeaders } from '../../utils/tableHeaders'
import StarDropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import Input from "../../common/input";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { TabContext } from "../../utils/contextStore";
import { useTranslation } from "react-i18next";

const { confirm } = Modal;

export const diagramTypes = { //RefTableId
    'Research': 0,
    'Procurement': 1
}

export const permissionTypes = {
    'PRIVATE': 0,
    'PUBLIC': 1
}

export const statuses = { //RefRecId
    'OPEN': 0,
    'CLOSE': 1
}

const newCollectionPayload = {
    Name: '',
    Description: '',
    PermissionType: 'PRIVATE',
    FromDate: '',
    ToDate: '',
    Responsible: '',
    RefTableId: '',
    RefRecId: ''
}

const DrawingToolHome = () => {
    const loading = useDiagramStore((state) => state.loading);
    const collectionData = useDiagramStore((state) => state.collectionData);
    const addCollection = useDiagramStore((state) => state.addCollection);
    const deleteCollection = useDiagramStore((state) => state.deleteCollection);
    const filterdContacts = useDiagramStore((state) => state.filterdContacts);
    const getContactsList = useDiagramStore((state) => state.getContactsList);

    const [showModel, setShowModel] = useState(false)
    const [newCollectionData, setNewCollectionData] = useState(newCollectionPayload);
    const [newCollectionDataErrors, setNewCollectionDataErrors] = useState(newCollectionPayload);
    const [filterTypes, setFilterTypes] = useState({ name: '', startDate: null, endDate: null })

    const { t } = useTranslation();

    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        getContactsList();
    }, [])

    const getResponsiblePerson = (ResponsiblePersonId) => {
        const respPerson = filterdContacts.find((contact) => contact.key === ResponsiblePersonId);
        return respPerson?.value
    }

    const tableHeaders = useMemo(() => {
        const headers = CollectionsTableHeaders(t);
        headers.push(
            {
                title: 'Responsible',
                dataIndex: 'Responsible',
                render: (_, { Responsible }) => (
                    getResponsiblePerson(Responsible)
                ),
                sorter: (a, b) => {
                    if (a.Responsible < b.Responsible) { return -1; }
                    if (a.Responsible > b.Responsible) { return 1; }
                    return 0;
                },
            },
            {
                title: 'Type',
                dataIndex: 'RefTableId',
                render: (_, { RefTableId }) => (
                    getKeyByValue(diagramTypes, RefTableId)
                ),
                sorter: (a, b) => a.RefTableId - b.RefTableId,
                width: 130,
            },
            {
                title: '',
                render: (_, record) => (
                    <div className={style.collectionTableIconRow} >
                        <i className="icon-edit table-icon" ></i>
                        <i className="icon-delete table-icon" onClick={(e) => {
                            e.stopPropagation();
                            showDeleteConfirm(record)
                        }}></i>
                    </div>
                ),
                width: 160,
            },
        )
        return headers
    }, [collectionData, filterdContacts])

    const showDeleteConfirm = (record) => {
        confirm({
            title: <strong className="red">{t("ARE_YOU_SURE")}?</strong>,
            icon: <ExclamationCircleOutlined />,

            okText: t('YES'),
            okType: 'danger',
            cancelText: t('NO'),

            onOk() {
                deleteCollection(record).then(() => {
                    message.success('Delete collection success');
                }).catch(() => {
                    message.error('Delete collection failed');
                })
            },

        });
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
        setNewCollectionData(newCollectionPayload)
        setNewCollectionDataErrors(newCollectionPayload)
    }

    const validateFields = () => {
        let validation = true
        if (!newCollectionData.Name) {
            setNewCollectionDataErrors(pre => ({ ...pre, Name: "Please enter name" }))
            validation = false
        }
        if (!newCollectionData.RefTableId) {
            setNewCollectionDataErrors(pre => ({ ...pre, RefTableId: "Please select a type" }))
            validation = false
        }
        if (!newCollectionData.FromDate) {
            setNewCollectionDataErrors(pre => ({ ...pre, FromDate: "Please select date" }))
            validation = false
        }
        if (!newCollectionData.Responsible) {
            setNewCollectionDataErrors(pre => ({ ...pre, Responsible: "Please select a responsible person" }))
            validation = false
        }
        if (!newCollectionData.RefRecId) {
            setNewCollectionDataErrors(pre => ({ ...pre, RefRecId: "Please select a status" }))
            validation = false
        }

        return validation;
    }

    const onSave = () => {
        if (validateFields()) {
            const payload = { ...newCollectionData }

            payload.PermissionType = permissionTypes[newCollectionData.PermissionType]
            payload.RefTableId = diagramTypes[newCollectionData.RefTableId]
            payload.RefRecId = statuses[newCollectionData.RefRecId]
            payload.Responsible = newCollectionData.Responsible.key

            addCollection(payload).then((response) => {
                toggleModal();
                changeActiveTab(NAVIGATION_PAGES.COLLECTION_DETAILS, response, true, newCollectionData.Name)
            }).catch(() => {
                message.error("Create collection failed");
            })
        }
    }

    const onClickRow = (params) => {
        changeActiveTab(NAVIGATION_PAGES.COLLECTION_DETAILS, { ...params }, true, params.Name)
    }

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewCollectionData({ ...newCollectionData, [elementName]: e.target.value })
        setNewCollectionDataErrors({ ...newCollectionDataErrors, [elementName]: '' })
    }

    const onUserChange = (e, elementName) => {
        e.preventDefault();
        setNewCollectionData({ ...newCollectionData, [elementName]: JSON.parse(e.target.value) })
        setNewCollectionDataErrors({ ...newCollectionDataErrors, [elementName]: '' })
    }

    const onNewElementDateChange = (date, elementName) => {
        setNewCollectionData({ ...newCollectionData, [elementName]: date })
        setNewCollectionDataErrors({ ...newCollectionDataErrors, [elementName]: '' })
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
                        dataSource={collectionData}
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
                            value={newCollectionData?.Name || ''}
                            placeholder='Name'
                            onChange={(e) => onNewElementChange(e, 'Name')}
                            error={newCollectionDataErrors?.Name}
                        />
                        <StarDropdown
                            placeholder="TYPE"
                            values={Object.keys(diagramTypes)}
                            onChange={(e) => onNewElementChange(e, 'RefTableId')}
                            selected={newCollectionData.RefTableId || ''}
                            error={newCollectionDataErrors?.RefTableId}
                        />
                        <Input
                            lines={3}
                            placeholder="DESCRIPTION"
                            value={newCollectionData.Description || ''}
                            onChange={(e) => onNewElementChange(e, 'Description')}
                        />
                        <StarDropdown
                            values={Object.keys(permissionTypes)}
                            onChange={(e) => onNewElementChange(e, 'PermissionType')}
                            selected={newCollectionData.PermissionType || 'PRIVATE'}
                            placeholder="PERMISSION_TYPE"
                        />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput
                            placeholder={t('FROM_DATE')}
                            value={newCollectionData.FromDate ? new Date(newCollectionData.FromDate) : ''}
                            minDate={new Date()}
                            onChange={(date) => onNewElementDateChange(date, 'FromDate')}
                            error={newCollectionDataErrors?.FromDate}
                        />
                        <DatePickerInput
                            placeholder={t('DUE_DATE')}
                            value={newCollectionData.ToDate ? new Date(newCollectionData.ToDate) : ''}
                            minDate={new Date()}
                            onChange={(date) => onNewElementDateChange(date, 'ToDate')}
                        />
                        <StarDropdown
                            values={filterdContacts}
                            dataName="value"
                            onChange={(e) => onUserChange(e, 'Responsible')}
                            selected={JSON.stringify(newCollectionData.Responsible || undefined)}
                            placeholder={"RESPONSIBLE_USER"}
                            error={newCollectionDataErrors?.Responsible}
                        />
                        <StarDropdown
                            values={Object.keys(statuses)}
                            onChange={(e) => onNewElementChange(e, 'RefRecId')}
                            selected={newCollectionData.RefRecId || ''}
                            placeholder="STATUS"
                            error={newCollectionDataErrors?.RefRecId}
                        />
                    </div>
                </div>
                <div className="n-float" />
                <div className="n-float" />
            </Modal>
        </div>
    )
}

export default DrawingToolHome;