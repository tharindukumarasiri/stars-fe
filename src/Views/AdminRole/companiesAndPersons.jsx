import React, { useState, useEffect, useMemo } from "react";
import { Tabs, Table, Pagination, message, Modal } from 'antd';

import Input from '../../common/input'
import {
    ReceversCompaniesTableHeaders,
    ReceversCompaniesSubTableHeaders,
    ReceversPersonsTableHeaders,
    ReceversPersonsTableExpandedHeaders
} from '../../utils/tableHeaders'
import {
    getCompanies,
    getPersons,
    addPerson,
    updatePerson,
    getGetCountries,
    addCompany,
    updateCompany,
    getCommunicationBasket,
    updateAndSchedule
} from "../../services/communicationService";
import { getOrganization } from "../../services/organizationsService";
import { FetchCurrentUser, FetchCurrentCompany } from "../../hooks/index"
import Dropdown from "../../common/dropdown";
import { emailRegEx } from "../../utils/constants";

const { TabPane } = Tabs;

const nameTitles = [{ id: 1, title: 'Mr.' }, { id: 2, title: 'Mrs.' }, { id: 3, title: 'Ms.' },]

const CompaniesAndPersons = ({ basketId }) => {
    const [countryList, setCountryList] = useState([])
    const [basketData, setBasketData] = useState([])
    const [selectedBasket, setSelectedBasket] = useState()
    const [currentUser] = FetchCurrentUser();
    const [selectedCompany] = FetchCurrentCompany();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGetCountries().then(result => {
            setCountryList(result);
        }).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (selectedCompany?.companyPartyId && !basketId) {
            setLoading(true)
            const params = {
                "PageSize": 1000,
                "PageCount": 0,
                "CompanyPartyId": selectedCompany?.companyPartyId
            }

            getCommunicationBasket(params).then(result => {
                setBasketData(result?.Value);
            }).finally(() => setLoading(false))
        }
    }, [selectedCompany])

    const onChangeBasket = (e) => {
        e.preventDefault();
        setSelectedBasket(JSON.parse(e.target.value))
    }

    const basketDropDown = () => {
        if (basketId) {
            return null;
        } else {
            return (
                <div className="user-drop-down m-r-20" style={{ width: 250 }}>
                    <Dropdown
                        values={basketData}
                        onChange={onChangeBasket}
                        selected={JSON.stringify(selectedBasket || undefined)}
                        placeholder="Basket"
                        dataName="Name"
                    />
                </div>
            )
        }
    }

    return (
        <div className="custom-tab-container sub-table-nav">
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <Tabs type="card" style={{ width: '90vw' }} >
                <TabPane tab="COMPANIES" key="3">
                    <CompaniesPage
                        basketId={basketId ? basketId : selectedBasket?.Id}
                        countryList={countryList}
                        currentUser={currentUser}
                        selectedCompany={selectedCompany}
                        basketDropDown={basketDropDown}
                    />
                </TabPane>

                <TabPane tab="PERSONS" key="4">
                    <PersonsPage
                        basketId={basketId ? basketId : selectedBasket?.Id}
                        countryList={countryList}
                        currentUser={currentUser}
                        selectedCompany={selectedCompany}
                        basketDropDown={basketDropDown}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}

const CompaniesPage = ({ basketId, countryList, currentUser, selectedCompany, basketDropDown }) => {
    const [searchCompaniesText, setsearchCompaniesText] = useState('');
    const [companiesData, setCompaniesData] = useState();
    const [newCompaniesData, setNewCompaniesData] = useState({ orgId: '', name: '', country: null, email: '', phone: '' });
    const [newUserData, setnewUserData] = useState({ firstname: '', lastname: '', title: null, email: '', mobileNumb: '' });
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState('')
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [newUserPhone, setNewUserPhone] = useState('')
    const [selectedCompanyToUpdate, setSelectedCompanyToUpdate] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedCompany?.companyPartyId && basketId) {
            getCompaniesData();
        }
    }, [selectedCompany, basketId])

    const companiesTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesTableHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: '',
            width: 60,
            dataIndex: ['IsReceiver', 'Company'],
            render: (_, { IsReceiver, Company }) => (
                <input type="checkbox" className="check-box" checked={IsReceiver} onChange={(e) => onClickCompaniesTableCheckBox(e, Company)} />
            )
        })

        return headers

    }, [companiesData])

    const usersTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesSubTableHeaders[0].children?.map(a => { return { ...a, title: a.title } })
        headers.push(
            {
                title: 'Email',
                dataIndex: ['Value', 'CompanyData', 'Key'],
                render: (_, { Value, CompanyData, Key }) => (
                    <>
                        {Value?.Email ? Value?.Email :
                            <div className="blue hover-hand add-user-item " onClick={() => onAddUserEmail(CompanyData, Value, Key)} >
                                Add Email
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        }
                    </>
                ),
                width: 200
            },
            {
                title: 'Mobile Number',
                dataIndex: ['Value', 'CompanyData', 'Key'],
                render: (_, { Value, CompanyData, Key }) => (
                    <>
                        {Value?.Phone ? Value?.Phone :
                            <div className="blue hover-hand add-user-item " onClick={() => onAddUserPhoneNumber(CompanyData, Value, Key)} >
                                Add Phone
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        }
                    </>
                ),
                width: 200
            },
            {
                title: '',
                width: 60,
                dataIndex: ['Value', 'CompanyData', 'Key'],
                render: (_, { Value, CompanyData, Key }) => (
                    <input type="checkbox" className="check-box" checked={Key} onChange={(e) => onClickUsersTableCheckBox(e, CompanyData, Value)} />
                )
            })

        return [{ title: 'Users', children: headers }]

    }, [companiesData]);

    const onAddUserEmail = (companyData, person, isReceiver) => {
        setSelectedCompanyToUpdate({ 'companyData': companyData, 'person': person, 'isReceiver': isReceiver });
        toggelEmailModal();
    }

    const onAddUserPhoneNumber = (companyData, person, isReceiver) => {
        setSelectedCompanyToUpdate({ 'companyData': companyData, 'person': person, 'isReceiver': isReceiver });
        toggelPhoneModal();
    }

    const toggelEmailModal = () => {
        setNewUserEmail('');
        setEmailModalVisible(pre => !pre);
    }

    const toggelPhoneModal = () => {
        setNewUserPhone('');
        setPhoneModalVisible(pre => !pre);
    }

    const onChangeNewUserEmail = (e) => {
        e.preventDefault();
        setNewUserEmail(e.target.value);
    }

    const onChangeNewUserPhone = (e) => {
        e.preventDefault();
        setNewUserPhone(e.target.value);
    }

    const onAddEmail = () => {
        setLoading(true);
        const params = {
            "Person": selectedCompanyToUpdate.person,
            "SelectedCompany": selectedCompanyToUpdate.companyData?.Company,
            "CommunicationBasketId": basketId,
            "CompanyPartyId": selectedCompany?.companyPartyId,
            "UserPartyId": currentUser?.PartyId,
            "IsReceiver": selectedCompanyToUpdate?.isReceiver
        }

        params.Person.Email = newUserEmail;

        updatePerson(params).then(() => {
            message.success('User update success')
            setLoading(false);
            getCompaniesData();
        }).catch(() => {
            setLoading(false);
            message.error('User update failed')
        })

        setSelectedCompanyToUpdate({});
        toggelEmailModal()
    }

    const onAddPhone = () => {
        setLoading(true);
        const params = {
            "Person": selectedCompanyToUpdate.person,
            "SelectedCompany": selectedCompanyToUpdate.companyData?.Company,
            "CommunicationBasketId": basketId,
            "CompanyPartyId": selectedCompany?.companyPartyId,
            "UserPartyId": currentUser?.PartyId,
            "IsReceiver": selectedCompanyToUpdate?.isReceiver
        }

        params.Person.Phone = newUserPhone;

        updatePerson(params).then(() => {
            message.success('User update success')
            setLoading(false);
            getCompaniesData();
        }).catch(() => {
            setLoading(false);
            message.error('User update failed')
        })

        setSelectedCompanyToUpdate({});
        toggelPhoneModal()
    }

    const onClickUsersTableCheckBox = (e, Company, person) => {
        setLoading(true)
        const params = {
            "EntityPartyId": selectedCompany?.companyPartyId,
            "EntityName": selectedCompany?.name,
            "CommunicationBasketId": basketId,
            "UserPartyId": currentUser?.PartyId,
            "BasketReceivers": [{
                "CompanyPartyTId": Company?.PartyTId,
                "PersonPartyTId": person?.PartyTId,
                "Name": person?.Name,
                "Email": person?.Email,
                "IsReceiver": e.target.checked
            }]
        }

        updateAndSchedule(params).then(() => {
            getCompaniesData();
        }).catch(() => setLoading(false))
    }

    const onClickCompaniesTableCheckBox = (e, company) => {
        setLoading(true)
        const params = {
            "EntityPartyId": selectedCompany?.companyPartyId,
            "EntityName": selectedCompany?.name,
            "CommunicationBasketId": basketId,
            "UserPartyId": currentUser?.PartyId,
            "BasketReceivers": [{
                "CompanyPartyTId": company?.PartyTId,
                "PersonPartyTId": null,
                "Name": company?.Name,
                "Email": company?.Email,
                "IsReceiver": e.target.checked
            }]
        }

        updateAndSchedule(params).then(() => {
            getCompaniesData();
        }).catch(() => setLoading(false))
    }

    const getCompaniesData = (pageNumb = pageNumber) => {
        if (basketId) {
            setLoading(true);
            getCompanies(basketId, selectedCompany?.companyPartyId, searchCompaniesText, pageNumb).then(result => {
                setCompaniesData(result?.Value)
                setTotalResults(result?.Key)
            }).finally(() => setLoading(false))
        }
    }

    const onChangesearchCompaniesText = (e) => {
        e.preventDefault();
        setsearchCompaniesText(e.target.value);
    }

    const onSearchCompanies = () => {
        setLoading(true);
        setPageNumber(0)
        getCompaniesData(0);
    }

    const onChangePage = (page) => {
        const pageNumb = page - 1

        getCompaniesData(pageNumb);
        setPageNumber(pageNumb)
    }

    const onChangeNewUserData = (e, type) => {
        e.preventDefault();
        setnewUserData(pre => ({ ...pre, [type]: e.target.value }))
    }

    const onChangeNewUserTitle = (e) => {
        e.preventDefault();
        setnewUserData(pre => ({ ...pre, title: JSON.parse(e.target.value) }))
    }

    const validateFields = () => {
        let validation = true
        if (!newUserData.firstname || !newUserData.lastname) {
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

    const onAddUser = (companyData) => {
        if (validateFields()) {
            setLoading(true);
            const params = {
                "Person": {
                    "Name": newUserData.firstname + " " + newUserData.lastname,
                    "TitleTId": newUserData.title?.id,
                    "TitleTName": newUserData.title?.title,
                    "FirstName": newUserData.firstname,
                    "MiddleName": null,
                    "LastName": newUserData.lastname,
                    "CountryTId": companyData?.CountryTId,
                    "CountryTName": companyData?.CountryTName,
                    "Email": newUserData.email,
                    "Phone": newUserData.mobileNumb
                },
                "SelectedCompany": companyData,
                "CommunicationBasketId": basketId,
                "CompanyPartyId": selectedCompany?.companyPartyId
            }

            addPerson(params).then(() => {
                setnewUserData({ firstname: '', lastname: '', title: null, email: '', mobileNumb: '' });
                message.success('User created');
                getCompaniesData();
            }).catch(() => message.error('Create user failed please try again'))
        }
    }

    const expandedRowRender = (parentRow) => {
        const addNewMember = () => {
            return (
                <div className="recivers-user-footer user-input-box">
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.firstname} onChange={(e) => onChangeNewUserData(e, 'firstname')} />
                    </div>
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.lastname} onChange={(e) => onChangeNewUserData(e, 'lastname')} />
                    </div>
                    <div className="user-drop-down" style={{ width: 100 }}>
                        <Dropdown
                            values={nameTitles}
                            onChange={onChangeNewUserTitle}
                            selected={JSON.stringify(newUserData.title || undefined)}
                            placeholder="Xxx"
                            dataName="title"
                        />
                    </div>
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.email} onChange={(e) => onChangeNewUserData(e, 'email')} />
                    </div>
                    <div style={{ width: 200 }}>
                        <Input placeholder="Xxx" value={newUserData.mobileNumb} onChange={(e) => onChangeNewUserData(e, 'mobileNumb')} />
                    </div>
                    <i className="icon-plus-circled blue basket-table-icon hover-hand" onClick={() => onAddUser(parentRow?.Company)} />
                </div>
            )
        }

        return (
            <div className="recivers-sub-table-padding">
                <Table
                    rowKey={(record, index) => index}
                    columns={usersTableHeaders}
                    dataSource={parentRow?.Persons?.map(person => {
                        person.CompanyData = parentRow;
                        return person
                    })}
                    pagination={false}
                    footer={addNewMember}
                />
            </div>
        );
    };

    const onChangeNewOrgData = (e, type) => {
        e.preventDefault();
        setNewCompaniesData(pre => ({ ...pre, [type]: e.target.value }))
    }

    const onChangeCountry = (e) => {
        e.preventDefault();
        setNewCompaniesData(pre => ({ ...pre, country: JSON.parse(e.target.value) }))
    }

    const validateCompanyFields = () => {
        let validation = true
        if (!newCompaniesData.name) {
            message.error('Please enter name')
            validation = false
        } else if (!newCompaniesData.orgId) {
            message.error('Please enter Organization Id')
            validation = false
        } else if (!newCompaniesData.country?.alpha2) {
            message.error('Please select a country')
            validation = false
        } else if (!newCompaniesData.phone) {
            message.error('Please enter phone number')
            validation = false
        } else if (!emailRegEx.test(newCompaniesData.email) || !newCompaniesData.email) {
            message.error('Invalid email adress')
            validation = false
        }

        return validation;
    }
    const onAddCompany = () => {
        if (validateCompanyFields()) {
            setLoading(true)
            getOrganization(newCompaniesData.orgId, newCompaniesData.country?.alpha2).then(result => {
                if (result) {
                    addCompanyData()
                } else {
                    setLoading(false)
                    message.error("Please enter a valid organization Id and relevant country")
                }
            }).catch(() => setLoading(false));
        }
    }

    const addCompanyData = () => {
        const params = {
            "Company": {
                "Name": newCompaniesData.name,
                "CompanyId": newCompaniesData.orgId,
                "CompanyTypeTId": 1, //organization
                "CountryTId": newCompaniesData.country?.Id,
                "CountryTCode": newCompaniesData.country?.alpha2,
                "CountryTName": newCompaniesData.country?.Name,
                "Email": newCompaniesData.email,
                "Phone": newCompaniesData.phone,
                "CreatedUserPartyId": currentUser?.PartyId
            },
            "CommunicationBasketId": basketId,
            "SelectedCompanyPartyId": selectedCompany?.companyPartyId
        }
        addCompany(params).then(() => {
            message.success('Company created')
            setLoading(false)
            setNewCompaniesData({ orgId: '', name: '', country: null, email: '', phone: '' })
        }).catch(() => {
            message.error('Company creation failed')
            setLoading(false)
        })
    }

    const addNewCompany = () => {
        return (
            <div className="recivers-companies-footer user-input-box">
                <div style={{ width: 200 }}>
                    <Input placeholder="Xxx" value={newCompaniesData.orgId} onChange={(e) => onChangeNewOrgData(e, 'orgId')} />
                </div>
                <div style={{ width: 200 }}>
                    <Input placeholder="Xxx" value={newCompaniesData.name} onChange={(e) => onChangeNewOrgData(e, 'name')} />
                </div>
                <div className="user-drop-down" style={{ width: 200 }}>
                    <Dropdown
                        values={countryList}
                        onChange={onChangeCountry}
                        selected={JSON.stringify(newCompaniesData.country || undefined)}
                        placeholder="Xxx"
                        dataName="Name"
                    />
                </div>
                <div style={{ width: 200 }}>
                    <Input placeholder="Xxx" value={newCompaniesData.email} onChange={(e) => onChangeNewOrgData(e, 'email')} />
                </div>
                <div style={{ width: 200 }}>
                    <Input placeholder="Xxx" value={newCompaniesData.phone} onChange={(e) => onChangeNewOrgData(e, 'phone')} />
                </div>
                <i className="icon-plus-circled blue basket-companies-table-icon hover-hand" onClick={onAddCompany} />
            </div>
        )
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
            <div className="recivers-top-container m-b-20">
                {
                    basketDropDown()
                }
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
                        y: '50vh',
                        x: '70vw'
                    }}
                    columns={companiesTableHeaders}
                    pagination={false}
                    expandable={{
                        expandedRowRender,
                    }}
                    footer={addNewCompany}
                />
            </div>
            <div className="flex-center-middle m-t-20">
                <Pagination size="small" current={pageNumber + 1} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
            </div>
            <Modal
                title={'Add user email'}
                visible={emailModalVisible}
                onOk={onAddEmail}
                onCancel={toggelEmailModal}
            >
                <div className="user-input-box">
                    <Input value={newUserEmail} onChange={onChangeNewUserEmail} />
                </div>
            </Modal>
            <Modal
                title={'Edit user data'}
                visible={phoneModalVisible}
                onOk={onAddPhone}
                onCancel={toggelPhoneModal}
            >
                <div className="user-input-box">
                    <Input value={newUserPhone} onChange={onChangeNewUserPhone} />
                </div>
            </Modal>
        </div>
    )
}

//Person >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const newPersonObject = { firstName: '', lastName: '', title: null, country: null, email: '', mobileNumb: '', companyId: '', companyName: '' }

const PersonsPage = ({ basketId, countryList, currentUser, selectedCompany, basketDropDown }) => {
    const [searchPersonsText, setSearchPersonsText] = useState('');
    // const [companiesData, setCompaniesData] = useState();
    // const [selectedCompany, setSelectedCompany] = useState(null);
    const [personsData, setPersonsData] = useState();
    const [newPersonData, setnewPersonData] = useState(newPersonObject);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            getPersonsData();
        }
    }, [selectedCompany])

    // useEffect(() => {
    //     if (selectedCompany?.companyPartyId && basketId) {
    //         getCompanies(basketId, selectedCompany?.companyPartyId, '', 0, 1000).then(result => {
    //             setCompaniesData(result?.Value)
    //         }).finally(() => setLoading(false))
    //     }
    // }, [selectedCompany, basketId])

    const personsTableHeaders = useMemo(() => {
        const headers = ReceversPersonsTableHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: '',
            width: 60,
            dataIndex: ['IsReceiver', 'Person'],
            render: (_, { IsReceiver, Person }) => (
                <input type="checkbox" className="check-box" checked={IsReceiver} onChange={(e) => onClickPersonsTableCheckBox(e, Person)} />
            )
        })

        return headers

    }, [personsData])

    const PersonsExpandedHeaders = useMemo(() => {
        const headers = ReceversPersonsTableExpandedHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: '',
            width: 60,
            dataIndex: ['IsReceiver', 'Company'],
            render: (_, { IsReceiver, Company }) => (
                <input type="checkbox" className="check-box" checked={IsReceiver} onChange={(e) => onClickPersonsTableCompanyCheckBox(e, Company)} />
            )
        })

        return headers

    }, [personsData])

    const onClickPersonsTableCheckBox = (e, person) => {
        setLoading(true)
        const params = {
            "EntityPartyId": selectedCompany?.companyPartyId,
            "EntityName": selectedCompany?.name,
            "CommunicationBasketId": basketId,
            "UserPartyId": currentUser?.PartyId,
            "BasketReceivers": [{
                "CompanyPartyTId": null,
                "PersonPartyTId": person?.PartyTId,
                "Name": person?.Name,
                "Email": person?.Email,
                "IsReceiver": e.target.checked
            }]
        }

        updateAndSchedule(params).then(() => {
            getPersonsData();
        }).catch(() => setLoading(false))
    }

    const onClickPersonsTableCompanyCheckBox = (e, company) => {
        setLoading(true)
        const params = {
            "EntityPartyId": selectedCompany?.companyPartyId,
            "EntityName": selectedCompany?.name,
            "CommunicationBasketId": basketId,
            "UserPartyId": currentUser?.PartyId,
            "BasketReceivers": [{
                "CompanyPartyTId": company?.PartyTId,
                "PersonPartyTId": null,
                "Name": company?.Name,
                "Email": company?.Email,
                "IsReceiver": e.target.checked
            }]
        }

        updateAndSchedule(params).then(() => {
            getPersonsData();
        }).catch(() => setLoading(false))
    }

    const getPersonsData = (pageNo = pageNumber) => {
        setLoading(true);
        getPersons(selectedCompany?.companyPartyId, basketId, searchPersonsText, pageNo).then(result => {
            setPersonsData(result?.Value)
            setTotalResults(result?.Key)
        }).finally(() => setLoading(false))
    }

    const onSearchPersons = () => {
        getPersonsData(0);
        setPageNumber(0)
    }

    const onChangePage = (page) => {
        const pageNumb = page - 1

        getPersonsData(pageNumb);
        setPageNumber(pageNumb)
    }

    const onChangesearchPersonsText = (e) => {
        e.preventDefault();
        setSearchPersonsText(e.target.value);
    }

    const onChangeNewPersonData = (e, type) => {
        e.preventDefault();
        setnewPersonData(pre => ({ ...pre, [type]: e.target.value }))
    }

    const onChangeNewUserTitle = (e) => {
        e.preventDefault();
        setnewPersonData(pre => ({ ...pre, title: JSON.parse(e.target.value) }))
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
                "Person": {
                    "Name": newPersonData.firstName + " " + newPersonData.lastName,
                    "TitleTId": newPersonData.title?.id,
                    "TitleTName": newPersonData.title?.title,
                    "FirstName": newPersonData.firstName,
                    "MiddleName": null,
                    "LastName": newPersonData.lastName,
                    "CountryTId": newPersonData.country?.Id,
                    "CountryTName": newPersonData.country?.Name,
                    "Email": newPersonData.email,
                    "Phone": newPersonData.mobileNumb
                },
                "SelectedCompany": null,
                "CommunicationBasketId": basketId,
                "CompanyPartyId": selectedCompany?.companyPartyId
            }

            addPerson(params).then(() => {
                setnewPersonData(newPersonObject);
                message.success('Person created');

                getPersonsData(0);
                setPageNumber(0);
            }).catch(() => message.error('Create user failed please try again'))
        }
    }

    const addNewPerson = () => {
        return (
            <div className="recivers-user-footer user-input-box" style={{ marginLeft: 165 }}>
                <div style={{ width: 150 }}>
                    <Input placeholder="First name" value={newPersonData.firstName} onChange={(e) => onChangeNewPersonData(e, 'firstName')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Last name" value={newPersonData.lastName} onChange={(e) => onChangeNewPersonData(e, 'lastName')} />
                </div>
                <div className="user-drop-down" style={{ width: 150 }}>
                    <Dropdown
                        values={nameTitles}
                        onChange={onChangeNewUserTitle}
                        selected={JSON.stringify(newPersonData.title || undefined)}
                        placeholder="Xxx"
                        dataName="title"
                    />
                </div>
                <div className="user-drop-down" style={{ width: 150 }}>
                    <Dropdown
                        values={countryList}
                        onChange={onChangeNewPersonCountry}
                        placeholder="Xxx"
                        selected={JSON.stringify(newPersonData.country || undefined)}
                        dataName="Name"
                    />
                </div>
                <div style={{ width: 200 }}>
                    <Input placeholder="Xxx" value={newPersonData.email} onChange={(e) => onChangeNewPersonData(e, 'email')} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.mobileNumb} onChange={(e) => onChangeNewPersonData(e, 'mobileNumb')} />
                </div>
                {/* <div style={{ width: 200 }}>
                    <Dropdown
                        values={companiesData?.map(a => a?.Company)}
                        onChange={onChangeNewUserTitle}
                        selected={JSON.stringify(newPersonData.title || undefined)}
                        placeholder="Select Company"
                        dataName="Name"
                    />
                </div> */}
                <div style={{ width: 20 }}>
                    <i className="icon-plus-circled blue basket-table-icon hover-hand" onClick={onAddNewPerson} />
                </div>
            </div>
        )
    }

    const expandedRowRender = (parentRow) => {
        return (
            <div className="recivers-sub-table-padding">
                <Table
                    rowKey={(record, index) => index}
                    columns={PersonsExpandedHeaders}
                    dataSource={parentRow?.CompanyContacts}
                    pagination={false}
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
                {
                    basketDropDown()
                }
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
                        y: '50vh',
                    }}
                    expandable={{
                        expandedRowRender,
                    }}
                    columns={personsTableHeaders}
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

export default CompaniesAndPersons;