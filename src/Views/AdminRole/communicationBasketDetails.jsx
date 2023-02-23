import React, { useState } from "react";
import { Tabs, Table } from 'antd';

import newsletter from "../../assets/images/newsletter.png"
import Input from '../../common/input'
import { formatDate } from "../../utils";
import { ReceversCompaniesTableHeaders, ReceversCompaniesSubTableHeaders, ReceversPersonsTableHeaders, SearchProjectSectionTableHeaders } from '../../utils/tableHeaders'
import TimeConfig from "./Components/timeConfig";

const { TabPane } = Tabs;

const CommunicationBasketDetails = ({ props }) => {
    const [searchCompaniesText, setsearchCompaniesText] = useState('');
    const [companiesData, setCompaniesData] = useState([{ Id: 122 }]);
    const [usersData, setUsersData] = useState([{ Id: 10 }]);
    const [newUserData, setnewUserData] = useState({ name: '', title: '', email: '', mobileNumb: '' })

    const [searchPersonsText, setSearchPersonsText] = useState('');
    const [personsData, setPersonsData] = useState([{ Id: 122 }]);
    const [newPersonData, setnewPersonData] = useState({ name: '', position: '', country: '', email: '', mobileNumb: '', companyId: '', companyName: '' })

    const [projectSearchText, setProjectSearchText] = useState('');
    const [projectData, setProjectData] = useState([{ Id: 122 }]);

    const [loading, setLoading] = useState(false);

    const onChangesearchCompaniesText = (e) => {
        e.preventDefault();
        setsearchCompaniesText(e.target.value);
    }

    const onSearchCompanies = () => {

    }

    const onExpand = (expanded, rowData) => {

    }

    const onChangeNewUserData = (e, type) => {
        e.preventDefault();
        setnewUserData(pre => ({ ...pre, [type]: e.target.value }))
    }

    const expandedRowRender = (parentRow) => {
        const addNewMember = () => {
            return (
                <div className="recivers-user-footer user-input-box">
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.name} onChange={(e) => onChangeNewUserData(e, 'name')} />
                    </div>
                    <div style={{ width: 100 }}>
                        <Input placeholder="Xxx" value={newUserData.title} onChange={(e) => onChangeNewUserData(e, 'title')} />
                    </div>
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.email} onChange={(e) => onChangeNewUserData(e, 'email')} />
                    </div>
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.mobileNumb} onChange={(e) => onChangeNewUserData(e, 'mobileNumb')} />
                    </div>
                    <i className="icon-plus-circled blue basket-table-icon hover-hand" />
                </div>
            )
        }

        return (
            <div className="recivers-sub-table-padding">
                <Table
                    columns={ReceversCompaniesSubTableHeaders}
                    dataSource={usersData}
                    pagination={false}
                    footer={addNewMember}
                />
            </div>
        );
    };

    const onChangesearchPersonsText = (e) => {
        e.preventDefault();
        setSearchPersonsText(e.target.value);
    }

    const onChangeNewPersonData = (e, type) => {
        e.preventDefault();
        setnewPersonData(pre => ({ ...pre, [type]: e.target.value }))
    }

    const addNewPerson = () => {
        return (
            <div className="recivers-user-footer user-input-box" style={{ marginLeft: 120 }}>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.name} onChange={(e) => onChangeNewPersonData(e, 'name')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.position} onChange={(e) => onChangeNewPersonData(e, 'position')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.country} onChange={(e) => onChangeNewPersonData(e, 'country')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.email} onChange={(e) => onChangeNewPersonData(e, 'email')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.mobileNumb} onChange={(e) => onChangeNewPersonData(e, 'mobileNumb')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.companyId} onChange={(e) => onChangeNewPersonData(e, 'companyId')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.companyName} onChange={(e) => onChangeNewPersonData(e, 'companyName')} />
                </div>
                <div style={{ width: 20 }}>
                    <i className="icon-plus-circled blue basket-table-icon hover-hand" />
                </div>
            </div>
        )
    }

    const onChangesearchProjectText = (e) => {
        e.preventDefault();
        setProjectSearchText(e.target.value);
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
            <div className="com-top-container">
                <div className="com-drop-down-width m-l-20">
                    Basket ID
                    <div className="body-text-bold">{props?.Id}</div>
                </div>
                <div className="com-drop-down-width">
                    Basket Name
                    <div className="body-text-bold">{props?.Name}</div>
                </div>
                <div className="com-drop-down-width">
                    Created Date
                    <div className="body-text-bold">{formatDate(props?.CreatedDateTime)}</div>
                </div>
                <div className="com-drop-down-width">
                    Basket Type
                    <div className="body-text-bold">{props?.BasketType?.Name}</div>
                </div>
                <div className="com-drop-down-width">
                    Communication Type
                    <div className="body-text-bold">{props?.CommunicationType}</div>
                </div>
                <div className="com-drop-down-width">
                    Status
                    <div className="body-text-bold">{props?.BasketStatus?.Name}</div>
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
                                        <TimeConfig Id={props?.Id} />
                                    </div>
                                </div>
                                {/* <Dropdown
                                    overlay={actions} placement="topRight" arrow
                                > */}
                                {/* <button className="primary-btn select-actions-btn" onClick={onUpdate} >Update</button> */}
                                {/* </Dropdown> */}
                            </div>
                        </TabPane>
                        <TabPane tab="RECEVERS" key="2">
                            <div className="custom-tab-container sub-table-nav">
                                <Tabs type="card" style={{ width: '90vw' }} >
                                    <TabPane tab="COMPANIES" key="3">
                                        <div className="recivers-top-container m-b-20">
                                            <div className="companies-search-input-containers user-input-box" >
                                                <Input placeholder="Search" value={searchCompaniesText} onChange={onChangesearchCompaniesText} endImage='icon-search-1' />
                                            </div>
                                            <button className="add-btn m-r-10" onClick={onSearchCompanies} >Filters</button>
                                            <button className="add-btn m-r-10 disable-div" >Add New</button>
                                            <button className="add-btn m-r-10 disable-div" >Upload</button>
                                        </div>

                                        <div className="receivers-tablele-width">
                                            <Table
                                                rowKey={(record, index) => index}
                                                dataSource={companiesData}
                                                scroll={{
                                                    y: '60vh',
                                                    x: '70vw'
                                                }}
                                                columns={ReceversCompaniesTableHeaders}
                                                pagination={false}
                                                expandable={{
                                                    expandedRowRender,
                                                    onExpand,
                                                }}
                                            />
                                        </div>
                                    </TabPane>

                                    <TabPane tab="PERSONS" key="4">
                                        <div className="recivers-top-container m-b-20">
                                            <div className="companies-search-input-containers user-input-box" >
                                                <Input placeholder="Search" value={searchPersonsText} onChange={onChangesearchPersonsText} endImage='icon-search-1' />
                                            </div>
                                            <button className="add-btn m-r-10" onClick={onSearchCompanies} >Filters</button>
                                            <button className="add-btn m-r-10 disable-div" >Add New</button>
                                            <button className="add-btn m-r-10 disable-div" >Upload</button>
                                        </div>

                                        <div className="receivers-tablele-width">
                                            <Table
                                                rowKey={(record, index) => index}
                                                dataSource={personsData}
                                                scroll={{
                                                    y: '60vh',
                                                }}
                                                columns={ReceversPersonsTableHeaders}
                                                pagination={false}
                                                footer={addNewPerson}
                                            />
                                        </div>
                                    </TabPane>

                                    <TabPane tab="SEARCH PROJECT SECTION LIST" key="5">
                                        <div className="recivers-top-container m-b-20">
                                            <div className="companies-search-input-containers user-input-box" >
                                                <Input placeholder="Search" value={projectSearchText} onChange={onChangesearchProjectText} endImage='icon-search-1' />
                                            </div>
                                            <button className="add-btn m-r-10" onClick={onSearchCompanies} >Filters</button>
                                            <button className="add-btn m-r-10" >Import</button>
                                        </div>

                                        <div className="receivers-tablele-width">
                                            <Table
                                                rowKey={(record, index) => index}
                                                dataSource={projectData}
                                                scroll={{
                                                    y: '60vh',
                                                }}
                                                columns={SearchProjectSectionTableHeaders}
                                                pagination={false}
                                            />
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default CommunicationBasketDetails;