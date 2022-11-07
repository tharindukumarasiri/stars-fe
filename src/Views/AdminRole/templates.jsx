import React, { useState } from "react";
import { Table, Modal } from 'antd';
import CreateTemplate from "./createTemplate";
import Input from "../../common/input";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Templates = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggaleTemplateCreater = () => { setModalVisible(prev => !prev) }

    return (
        <>
            <div className="m-t-20 m-l-20">
                <button className="primary-btn m-r-20" style={{ float: 'left' }} onClick={toggaleTemplateCreater} >Create New</button>
                <div className="g-col-2 fl">
                    <Input value={''} placeholder='Search' onChange={() => { }} endImage={'icon-search-1'} />
                </div>
                <button className="primary-btn" style={{ float: 'left' }} onClick={() => { }} >Filters</button>
            </div>
            <div className="n-float"></div>
            <div className="page-container">
                <div className="custom-tab-container">
                    <Tabs type="card" >
                        <TabPane tab="Notification templates" key="1">
                            <NotificationTemplates />
                        </TabPane>
                        <TabPane tab="landing pages templates" key="2">
                        </TabPane>
                        <TabPane tab="Business Communication Template" key="3">
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
                    <CreateTemplate closeModal={toggaleTemplateCreater} />
                    <div className="editor-name" />
                </div>
                <div className="n-float" />
            </Modal>
        </>
    )
}

const NotificationTemplates = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
        },
        {
            title: 'Name',
            dataIndex: 'ID',
        },
        {
            title: 'Date Created',
            dataIndex: 'ID',
        },
        {
            title: 'Default Language',
            dataIndex: 'ID',
        },
        {
            title: 'Trigger Point',
            dataIndex: 'ID',
        },
        {
            title: 'Message Medium',
            dataIndex: 'ID',
        },
    ]
    return (
        <Table
            rowKey={(record) => record?.id}
            dataSource={[]}
            columns={columns}
            pagination={false}
        />
    )
}

export default Templates;