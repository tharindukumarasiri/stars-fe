import React, { useState, useEffect, useMemo } from "react";
import { Table, Modal } from 'antd';
import CreateTemplate from "./createTemplate";
import { TemplateTableHeaders } from "../../utils/tableHeaders";
import { getTenantMessageTemplates } from "../../services/templateService";
import { FetchCurrentCompany } from "../../hooks/index";
import Input from "../../common/input";
import { Tabs } from 'antd';
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const Templates = () => {
    const [savedTemplates, setSavedTemplates] = useState([]);  
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedCompany] = FetchCurrentCompany();    
    const [notificationTemplates, setNotificationTemplates] = useState([]);
    const [landingPageTemplates, setLandingPageTemplates] = useState([]);
    const [communicationTemplates, setCommunicationTemplates] = useState([]);
    const [editTemplate, setEditTemplate] = useState(null);
    const { t } = useTranslation();

    const tableHeaders = useMemo(() => {
        const headers = TemplateTableHeaders.map(a => { return { ...a, title: t(a.title) } })
        headers.push({
            title: '',
            render: (_, record) => (
                <>
                    <i className="icon-edit table-icon" onClick={(e) => {
                        e.stopPropagation();
                        setEditTemplate(record);
                        setModalVisible(true);

                    }}></i>
                    <i className="icon-delete table-icon" onClick={(e) => {
                        e.stopPropagation();
                        //showDeleteConfirm(record)
                    }}></i>                  
                </>
            )
        })

        return headers

    }, [])

    const getSavedTemplates = () => {
        getTenantMessageTemplates(selectedCompany.tenantId).then(result => {
            setSavedTemplates(result);
            setNotificationTemplates(result.filter(i => i.MessageTypeId === 2));
            setLandingPageTemplates(result.filter(i => i.MessageTypeId === 1));
            setCommunicationTemplates(result.filter(i => i.MessageTypeId === 3));
            setLoading(false);
        }).catch(() => setLoading(false))
    }

    useEffect(() => {
        if(selectedCompany && selectedCompany.tenantId)
            getSavedTemplates()
    }, [selectedCompany]);


    const toggaleTemplateCreater = () => { setModalVisible(prev => !prev) }

    const createNewTemplateClick = () => {
        toggaleTemplateCreater();
        setEditTemplate(null);
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
            <div className="m-t-20 m-l-20">
                <button className="primary-btn m-r-20" style={{ float: 'left' }} onClick={createNewTemplateClick} >Create New</button>
                <div className="g-col-2 fl">
                    <Input value={''} placeholder='Search' onChange={() => { }} endImage={'icon-search-1'} />
                </div>
                <button className="primary-btn" style={{ float: 'left' }} onClick={() => { }} >Filters</button>
            </div>
            <div className="n-float"></div>
            <div className="page-container">
                <div className="custom-tab-container">
                    <Tabs type="card" style={{ width: '90vw' }} >
                        <TabPane tab="Notification templates" key="1">
                            <Table
                                rowKey={(record) => record?.id}
                                dataSource={notificationTemplates}
                                columns={tableHeaders}
                                pagination={false}
                            />
                        </TabPane>
                        <TabPane tab="landing pages templates" key="2">
                            <Table
                                rowKey={(record) => record?.id}
                                dataSource={landingPageTemplates}
                                columns={tableHeaders}
                                pagination={false}
                            />
                        </TabPane>
                        <TabPane tab="Business Communication Template" key="3">
                            <Table
                                rowKey={(record) => record?.id}
                                dataSource={communicationTemplates}
                                columns={tableHeaders}
                                pagination={false}
                            />
                        </TabPane>
                    </Tabs>
                </div>

            </div>
            <Modal title={"Create New Template"}
                visible={modalVisible}
                footer={[]}
                onCancel={toggaleTemplateCreater}
                centered={true} width={2000}>
                <div className="g-row">
                    <CreateTemplate closeModal={toggaleTemplateCreater} getSavedTemplates={getSavedTemplates} editTemplate={editTemplate} />
                    <div className="editor-name" />
                </div>
                <div className="n-float" />
            </Modal>
        </>
    )
}

export default Templates;