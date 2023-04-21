import React, { useState, useEffect, useMemo } from "react";
import { Table, Modal, message, Pagination } from 'antd';
import { Tabs } from 'antd';
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import CreateTemplate from "./createTemplate";
import { TemplateTableHeaders } from "../../../utils/tableHeaders";
import { getTenantMessageTemplates, deleteMessageTemplate } from "../../../services/templateService";
import { FetchCurrentCompany, FetchCurrentUser } from "../../../hooks/index";
import Input from "../../../common/input";
import * as constants from "../../../utils/constants";

const { confirm } = Modal;
const { TabPane } = Tabs;

const Templates = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedCompany] = FetchCurrentCompany();
    const [notificationTemplates, setNotificationTemplates] = useState([]);
    const [landingPageTemplates, setLandingPageTemplates] = useState([]);
    const [communicationTemplates, setCommunicationTemplates] = useState([]);
    const [editTemplate, setEditTemplate] = useState(null);
    const [currentUser] = FetchCurrentUser();
    const { t } = useTranslation();

    const pageSize = 10;
    const [ntCurrentPageNo, setntCurrentPageNo] = useState(0);
    const [lpCurrentPageNo, setlpCurrentPageNo] = useState(0);
    const [bdCurrentPageNo, setbdCurrentPageNo] = useState(0);
    const [ntTotal, setntTotal] = useState(0);
    const [lpTotal, setlpTotal] = useState(0);
    const [bdTotal, setbdTotal] = useState(0);

    const tableHeaders = useMemo(() => {
        const headers = TemplateTableHeaders(t);
        headers.push({
            title: '',
            render: (_, record) => (
                <>
                    <i className="icon-edit table-icon" onClick={(e) => {
                        e.stopPropagation();
                        setEditTemplate(record);
                        setModalVisible(true);

                    }}></i>
                    { (selectedCompany.companyPartyId === record.CompanyPartyId 
                        //|| (selectedCompany.companyPartyId !== record.CompanyPartyId && currentUser.roles.some(id => id === 1))
                        )
                     && <i className="icon-delete table-icon" onClick={(e) => {
                        e.stopPropagation();
                        showDeleteConfirm(record, currentUser)
                    }}></i> 
                    
                    }
                </>
            )
        })
        console.log(currentUser);
        return headers

    }, [currentUser, selectedCompany])

    const getSavedTemplates = () => {

        setLoading(true);
        
        getTenantMessageTemplates(selectedCompany.companyPartyId, constants.templateType.Notification, ntCurrentPageNo, pageSize).then(result => {
            setNotificationTemplates(result.Value);
            setntTotal(result.Key);
        }).catch(() => setLoading(false))

        getTenantMessageTemplates(selectedCompany.companyPartyId, constants.templateType.LandingPage, lpCurrentPageNo, pageSize).then(result => {
            setLandingPageTemplates(result.Value);
            setlpTotal(result.Key)
        }).catch(() => setLoading(false))

        getTenantMessageTemplates(selectedCompany.companyPartyId, constants.templateType.Communication, bdCurrentPageNo, pageSize).then(result => {
            setCommunicationTemplates(result.Value);
            setbdTotal(result.Key);
        }).catch(() => setLoading(false))

        setLoading(false);
    }

    useEffect(() => {
        if (selectedCompany && selectedCompany.companyPartyId) {
            getSavedTemplates();
        }

    }, [selectedCompany, ntCurrentPageNo, lpCurrentPageNo, bdCurrentPageNo]);

    const toggaleTemplateCreater = () => { setModalVisible(prev => !prev) }

    const createNewTemplateClick = () => {
        toggaleTemplateCreater();
        setEditTemplate(null);
    }

    const showDeleteConfirm = (record, user) => {
        confirm({
            title: <>{t("ARE_YOU_SURE")} <strong className="red">{t('DELETE_SIMPLE')}</strong> {t("THIS_TEMP")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <div>
                <div className="body-text">{t("ALL_DATA_TXT")}</div>
                <div className="body-text">{t("TEMPLATE_NAME")}: <strong>{record.DisplayName}</strong></div>
            </div>,
            okText: t('YES'),
            okType: 'danger',
            cancelText: t('NO'),

            onOk() {                
                deleteMessageTemplate(record.Id, user.PartyId).then(() => {
                    getSavedTemplates();
                    message.success(t('MSG_DELETE_TEMPLATE_SUCCESS'));
                }).catch(() => {
                    message.warning(t('MSG_DELETE_TEMPLATE_FAIL'));
                });
            },

        });
    };

    const onChangePage = (pageNumber, type) => {

        let setActPage = (p) => { };
        switch (type) {
            case constants.templateType.Notification:
                setActPage = setntCurrentPageNo;
                break;
            case constants.templateType.LandingPage:
                setActPage = setlpCurrentPageNo;
                break;
            case constants.templateType.Communication:
                setActPage = setbdCurrentPageNo;
                break;
        }
        switch (pageNumber) {
            case 'prev':
                setActPage((cur) => cur - 1);
                break;
            case 'next':
                setActPage((cur) => cur + 1);
                break;
            default:
                setActPage(pageNumber);
        }
    }


    return (
        <>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div>
                <button className="primary-btn m-r-10" style={{ float: 'left' }} onClick={createNewTemplateClick} >{t('CREATE_NEW')}</button>
                <div className="fl">
                    <Input value={''} placeholder='SEARCH' onChange={() => { }} endImage={'icon-search-1'} />
                </div>
                <button className="primary-btn" style={{ float: 'left' }} onClick={() => { }} >{t('FILTERS')}</button>
            </div>
            <div className="n-float"></div>
            <div className="page-container">
                <div className="custom-tab-container">
                    <Tabs type="card">
                        <TabPane tab={t('USER_NOTIFICATION_TEMPLATES')} key="1">
                            <Table
                                rowKey={(record) => record?.id}
                                dataSource={notificationTemplates}
                                columns={tableHeaders}
                                pagination={false}
                            />
                            <div className="action-bar">
                                <div className="flex-center-middle m-t-20">
                                    <Pagination size="small"
                                        pageSize={pageSize}
                                        current={ntCurrentPageNo}
                                        onChange={(pageNum) => { onChangePage(pageNum, constants.templateType.Notification) }}
                                        total={ntTotal} showSizeChanger={false} />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={t('LANDING_PG_TEMPLATES')} key="2">
                            <Table
                                rowKey={(record) => record?.id}
                                dataSource={landingPageTemplates}
                                columns={tableHeaders}
                                pagination={false}
                            />
                            <div className="action-bar">
                                <div className="flex-center-middle m-t-20">
                                    <Pagination size="small"
                                        pageSize={pageSize}
                                        current={lpCurrentPageNo}
                                        onChange={(pageNum) => { onChangePage(pageNum, constants.templateType.LandingPage) }}
                                        total={lpTotal} showSizeChanger={false} />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={t('BUSINESS_COM_TEMPLATE')} key="3">
                            <Table
                                rowKey={(record) => record?.id}
                                dataSource={communicationTemplates}
                                columns={tableHeaders}
                                pagination={false}
                            />
                            <div className="action-bar">
                                <div className="flex-center-middle m-t-20">
                                    <Pagination size="small"
                                        pageSize={pageSize}
                                        current={bdCurrentPageNo}
                                        onChange={(pageNum) => { onChangePage(pageNum, constants.templateType.Communication) }}
                                        total={bdTotal} showSizeChanger={false} />
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
            <Modal title={t('CREATE_NEW_TEMPLATE')}
                visible={modalVisible}
                footer={[]}
                onCancel={toggaleTemplateCreater}
                width={'95vw'}
                centered={true}
                closeIcon={< i className='icon-close close-icon' />}>
                <div className="g-row">
                    <CreateTemplate closeModal={toggaleTemplateCreater} getSavedTemplates={getSavedTemplates} editTemplate={editTemplate} />
                    {/* <div className="editor-name" /> */}
                </div>
                <div className="n-float" />
            </Modal>
        </>
    )
}

export default Templates;