import React, { useState, useEffect } from "react";
import { Tabs, Table, Pagination, message } from 'antd';

import newsletter from "../../assets/images/newsletter.png"
import Input from '../../common/input'
import { formatDate } from "../../utils";
import {
    ReceversCompaniesTableHeaders,
    ReceversCompaniesSubTableHeaders,
    ReceversPersonsTableHeaders,
    SearchProjectSectionTableHeaders
} from '../../utils/tableHeaders'
import TimeConfig from "./Components/timeConfig";
import {
    getCompanies,
    getPersons,
    addPerson
} from "../../services/communicationService";
import { addUser, activateRoleUser } from "../../services/userService";
import { FetchCurrentUser } from "../../hooks/index"
import Dropdown from "../../common/dropdown";
import { emailRegEx } from "../../utils/constants";

const { TabPane } = Tabs;

const CommunicationBasketDetails = ({ props }) => {
    const [projectSearchText, setProjectSearchText] = useState('');
    const [projectData, setProjectData] = useState([{ Id: 122 }]);

    const onChangesearchProjectText = (e) => {
        e.preventDefault();
        setProjectSearchText(e.target.value);
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
                                        <CompaniesPage />
                                    </TabPane>

                                    <TabPane tab="PERSONS" key="4">
                                        <PersonsPage />
                                    </TabPane>

                                    <TabPane tab="SEARCH PROJECT SECTION LIST" key="5">
                                        <div className="recivers-top-container m-b-20">
                                            <div className="companies-search-input-containers user-input-box" >
                                                <Input placeholder="Search" value={projectSearchText} onChange={onChangesearchProjectText} endImage='icon-search-1' />
                                            </div>
                                            <button className="add-btn m-r-10" >Filters</button>
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


const CompaniesPage = () => {
    const [searchCompaniesText, setsearchCompaniesText] = useState('');
    const [companiesData, setCompaniesData] = useState();
    const [newUserData, setnewUserData] = useState({ name: '', title: '', email: '', mobileNumb: '' });
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);

    const [currentUser] = FetchCurrentUser();

    useEffect(() => {
        getCompanies().then(result => {
            setCompaniesData(result?.Value)
            setTotalResults(result?.Key)
        }).finally(() => setLoading(false))
    }, [])

    const onChangesearchCompaniesText = (e) => {
        e.preventDefault();
        setsearchCompaniesText(e.target.value);
    }

    const onSearchCompanies = () => {
        setLoading(true);
        getCompanies(searchCompaniesText).then(result => {
            setCompaniesData(result?.Value)
            setTotalResults(result?.Key)
            setPageNumber(0)
        }).finally(() => setLoading(false))
    }

    const onChangePage = (page) => {
        setLoading(true);
        const pageNumb = page - 1

        getCompanies(searchCompaniesText, pageNumb).then(result => {
            setCompaniesData(result?.Value)
            setTotalResults(result?.Key)
            setPageNumber(pageNumb)
        }).finally(() => setLoading(false))
    }

    const onChangeNewUserData = (e, type) => {
        e.preventDefault();
        setnewUserData(pre => ({ ...pre, [type]: e.target.value }))
    }

    const validateFields = () => {
        let validation = true
        if (!newUserData.name) {
            message.error('Name cannot be empty');
            validation = false;
        }
        if (!newUserData.email) {
            message.error('Email cannot be empty');
            validation = false
        } else if (!emailRegEx.test(newUserData.email)) {
            message.error('Invalid email adress');
            validation = false
        }
        if (!newUserData.mobileNumb) {
            message.error('Mobile number cannot be empty');
            validation = false
        }

        return validation;
    }

    const onAddUser = (companyPartyId) => {
        if (validateFields()) {
            setLoading(true);
            const params = {
                "Email": newUserData.email,
                "UserName": newUserData.email,
                "FirstName": newUserData.name,
                "Name": newUserData.name,
                "TitleName": newUserData.title,
                "PhoneNumber": newUserData.mobileNumb,
                "CreatedUserPartyId": currentUser?.PartyId,
                "CountryId": currentUser?.CountryId,
                "CountryCode": currentUser?.CountryCode,
            }

            addUser(params).then(result => {
                const activateParams = {
                    "UserId": result?.Id,
                    "EntityPartyId": companyPartyId,
                    "RoleId": 3, //User,
                    "CreatedUserPartyId": currentUser?.PartyId,
                }
                activateRoleUser(activateParams).then(() => {
                    setnewUserData({ name: '', title: '', email: '', mobileNumb: '' });
                    message.success('User created');
                    getCompanies().then(result => {
                        setCompaniesData(result?.Value)
                        setTotalResults(result?.Key)
                    }).finally(() => setLoading(false))
                })
            }).catch(() => message.error('Create user failed please try again'))
        }
    }

    const expandedRowRender = (parentRow) => {
        const addNewMember = () => {
            return (
                <div className="recivers-user-footer user-input-box">
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.name} onChange={(e) => onChangeNewUserData(e, 'name')} />
                    </div>
                    <div className="user-drop-down" style={{ width: 100 }}>
                        <Dropdown
                            values={["Mr.", "Mrs.", "Ms"]}
                            onChange={(e) => onChangeNewUserData(e, 'title')}
                            selected={newUserData.title}
                            placeholder="Xxx"
                        />
                    </div>
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.email} onChange={(e) => onChangeNewUserData(e, 'email')} />
                    </div>
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.mobileNumb} onChange={(e) => onChangeNewUserData(e, 'mobileNumb')} />
                    </div>
                    <i className="icon-plus-circled blue basket-table-icon hover-hand" onClick={() => onAddUser(parentRow?.Company?.PartyId)} />
                </div>
            )
        }

        return (
            <div className="recivers-sub-table-padding">
                <Table
                    rowKey={(record, index) => index}
                    columns={ReceversCompaniesSubTableHeaders}
                    dataSource={parentRow?.Users}
                    pagination={false}
                    footer={addNewMember}
                />
            </div>
        );
    };

    return (
        <>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
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
                    }}
                />
            </div>
            <div className="flex-center-middle m-t-20">
                <Pagination size="small" current={pageNumber + 1} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
            </div>
        </>
    )
}

const newPersonObject = { firstName: '', lastName: '', title: '', country: null, email: '', mobileNumb: '', companyId: '', companyName: '' }

const PersonsPage = () => {
    const [searchPersonsText, setSearchPersonsText] = useState('');
    const [personsData, setPersonsData] = useState();
    const [newPersonData, setnewPersonData] = useState(newPersonObject);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);

    const [currentUser] = FetchCurrentUser();

    useEffect(() => {
        getPersons().then(result => {
            setPersonsData(result?.Value)
            setTotalResults(result?.Key)
        }).finally(() => setLoading(false))
    }, [])

    const onSearchPersons = () => {
        setLoading(true);
        getPersons(searchPersonsText).then(result => {
            setPersonsData(result?.Value)
            setTotalResults(result?.Key)
            setPageNumber(0)
        }).finally(() => setLoading(false))
    }

    const onChangePage = (page) => {
        setLoading(true);
        const pageNumb = page - 1

        getPersons(searchPersonsText, pageNumb).then(result => {
            setPersonsData(result?.Value)
            setTotalResults(result?.Key)
            setPageNumber(pageNumb)
        }).finally(() => setLoading(false))
    }

    const onChangesearchPersonsText = (e) => {
        e.preventDefault();
        setSearchPersonsText(e.target.value);
    }

    const onChangeNewPersonData = (e, type) => {
        e.preventDefault();
        setnewPersonData(pre => ({ ...pre, [type]: e.target.value }))
    }

    const onChangeNewPersonCountry = (e) => {
        e.preventDefault();
        setnewPersonData(pre => ({ ...pre, country: JSON.parse(e.target.value) }))
    }

    const validateFields = () => {
        let validation = true
        if (!newPersonData.firstName || !newPersonData.lastName) {
            message.error('Name cannot be empty');
            validation = false;
        }
        if (!newPersonData.email) {
            message.error('Email cannot be empty');
            validation = false
        } else if (!emailRegEx.test(newPersonData.email)) {
            message.error('Invalid email adress');
            validation = false
        }
        if (!newPersonData.mobileNumb) {
            message.error('Mobile number cannot be empty');
            validation = false
        }

        return validation;
    }

    const onAddNewPerson = () => {
        if (validateFields()) {
            setLoading(true);
            const params = {
                "Name": newPersonData.firstName + " " + newPersonData.lastName,
                "FirstName": newPersonData.firstName,
                "LastName": newPersonData.lastName,
                "TitleName": newPersonData.title,
                "CountryId": newPersonData.country?.Id,
                "CountryName": newPersonData.country?.Name,
                "Email": newPersonData.email,
                "Phone": newPersonData.mobileNumb,
                "CreatedUserPartyId": currentUser?.PartyId
            }

            addPerson(params).then(() => {
                setnewPersonData(newPersonObject);
                message.success('User created');

                getPersons().then(result => {
                    setPersonsData(result?.Value)
                    setTotalResults(result?.Key)
                    setPageNumber(0);
                }).finally(() => setLoading(false))
            }).catch(() => message.error('Create user failed please try again'))
        }
    }

    const addNewPerson = () => {
        return (
            <div className="recivers-user-footer user-input-box" style={{ marginLeft: 120 }}>
                <div style={{ width: 150 }}>
                    <Input placeholder="First name" value={newPersonData.firstName} onChange={(e) => onChangeNewPersonData(e, 'firstName')} />
                    <Input placeholder="Last name" value={newPersonData.lastName} onChange={(e) => onChangeNewPersonData(e, 'lastName')} />
                </div>
                <div className="user-drop-down" style={{ width: 150 }}>
                    <Dropdown
                        values={["Mr.", "Mrs.", "Ms"]}
                        onChange={(e) => onChangeNewPersonData(e, 'title')}
                        selected={newPersonData.title}
                        placeholder="Xxx"
                    />
                </div>
                <div className="user-drop-down" style={{ width: 150 }}>
                    <Dropdown
                        values={[{ Id: 1, Name: 'Norway' }, { Id: 2, Name: 'Sweeden' }]}
                        onChange={onChangeNewPersonCountry}
                        placeholder="Xxx"
                        selected={JSON.stringify(newPersonData.country || undefined)}
                        dataName="Name"
                    />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.email} onChange={(e) => onChangeNewPersonData(e, 'email')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.mobileNumb} onChange={(e) => onChangeNewPersonData(e, 'mobileNumb')} />
                </div>
                <div style={{ width: 150 }}>
                    {/* <Input placeholder="Xxx" value={newPersonData.companyId} onChange={(e) => onChangeNewPersonData(e, 'companyId')} /> */}
                </div>
                <div style={{ width: 150 }}>
                    {/* <Input placeholder="Xxx" value={newPersonData.companyName} onChange={(e) => onChangeNewPersonData(e, 'companyName')} /> */}
                </div>
                <div style={{ width: 20 }}>
                    <i className="icon-plus-circled blue basket-table-icon hover-hand" onClick={onAddNewPerson} />
                </div>
            </div>
        )
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
            <div className="recivers-top-container m-b-20">
                <div className="companies-search-input-containers user-input-box" >
                    <Input placeholder="Search" value={searchPersonsText} onChange={onChangesearchPersonsText} endImage='icon-search-1' />
                </div>
                <button className="add-btn m-r-10" onClick={onSearchPersons} >Filters</button>
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
            <div className="flex-center-middle m-t-20">
                <Pagination size="small" current={pageNumber + 1} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
            </div>
        </>
    )
}

export default CommunicationBasketDetails;