import React, { useState, useEffect, useMemo } from "react";
import { Tabs, Table, message, Modal, Tooltip, Select } from 'antd';

import Input from '../../../common/input'
import {
    ReceversCompaniesTableHeaders,
    ReceversCompaniesSubTableHeaders,
    ReceversPersonsTableHeaders,
    ReceversPersonsTableExpandedHeaders
} from '../../../utils/tableHeaders'
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
} from "../../../services/communicationService";
import { getOrganization } from "../../../services/organizationsService";
import { FetchCurrentUser, FetchCurrentCompany } from "../../../hooks/index"
import Dropdown from "../../../common/dropdown";
import { emailRegEx, phoneRegEx } from "../../../utils/constants";
import { validatePhoneNumberInput } from "../../../utils";

const { TabPane } = Tabs;

const nameTitles = [{ id: 1, title: 'Mr.' }, { id: 2, title: 'Mrs.' }, { id: 3, title: 'Ms.' },]

const CompaniesAndPersons = (props) => {
    const { basketId, fromDateTime, defaultRecievers, showOnlyDefaultRecievers } = props;
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

        console.log("showOnlyDefaultRecievers: " + showOnlyDefaultRecievers);
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

    const isUpdateBtnDisabled = () => {
        if (fromDateTime) {
            return false;
        } else if (selectedBasket?.FromDateTime) {
            return false;
        } else {
            return true;
        }
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
                {(!showOnlyDefaultRecievers) &&
                    <>
                        <TabPane tab="COMPANIES" key="3">
                            <CompaniesPage
                                basketId={basketId ? basketId : selectedBasket?.Id}
                                disableUpdateBtn={isUpdateBtnDisabled}
                                countryList={countryList}
                                currentUser={currentUser}
                                selectedCompany={selectedCompany}
                                basketDropDown={basketDropDown}
                            />
                        </TabPane>

                        <TabPane tab="PERSONS" key="4">
                            <PersonsPage
                                basketId={basketId ? basketId : selectedBasket?.Id}
                                disableUpdateBtn={isUpdateBtnDisabled}
                                countryList={countryList}
                                currentUser={currentUser}
                                selectedCompany={selectedCompany}
                                basketDropDown={basketDropDown}
                            />
                        </TabPane>
                    </>
                }
                {
                    showOnlyDefaultRecievers &&
                    <TabPane tab="USERS" key="5">

                        {
                            defaultRecievers.map(r => {
                                return (
                                    <div className="row m-2">
                                        <div className="col-2">{`${r.FirstName} ${r.LastName}`}</div>
                                        <div className="col-3">{r.Email}</div>
                                    </div>)
                            })
                        }

                    </TabPane>
                }
            </Tabs>
        </div>
    )
}

const CompaniesPage = ({ basketId, countryList, currentUser, selectedCompany, basketDropDown, disableUpdateBtn }) => {
    const [allCompaniesData, setAllCompaniesData] = useState([]);
    // const [companiesData, setCompaniesData] = useState();
    const [displayCompanies, setDisplayCompanies] = useState();
    const [newCompaniesData, setNewCompaniesData] = useState({ orgId: '', name: '', country: null, email: '', phone: '' });
    const [newCompaniesErrors, setNewCompaniesErrors] = useState({ orgId: '', name: '', country: null, email: '', phone: '' });
    const [newUserData, setnewUserData] = useState({ firstname: '', lastname: '', title: null, email: '', mobileNumb: '' });
    const [newUserErrors, setNewUserErrors] = useState({ firstname: '', lastname: '', title: null, email: '', mobileNumb: '' });
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPhone, setNewUserPhone] = useState('');
    const [newUserFieldError, setNewUserFieldError] = useState('')
    const [selectedCompanyToUpdate, setSelectedCompanyToUpdate] = useState({});
    const [checkedCompaniesUsers, setCheckedCompaniesUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const disableUpdate = disableUpdateBtn();

    useEffect(() => {
        if (selectedCompany?.companyPartyId && basketId) {
            setLoading(true)
            getCompaniesData();
            getCompanies('', selectedCompany?.companyPartyId).then(result => {
                setAllCompaniesData(result?.Value)
                setLoading(false)
            })
        }
    }, [selectedCompany, basketId])

    const companiesTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesTableHeaders[0].children?.map(a => { return { ...a, title: a.title } })

        headers.push(
            {
                title: 'Email',
                dataIndex: ['Company', 'IsReceiver'],
                render: (_, { Company, IsReceiver }) => (
                    <>
                        {Company?.Email ? Company?.Email :
                            <div className="blue hover-hand add-user-item " onClick={() => onAddCompanyEmail(Company, IsReceiver)} >
                                Add Email
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        }
                    </>
                ),
            },
            {
                title: 'Phone',
                dataIndex: ['Company', 'IsReceiver'],
                render: (_, { Company, IsReceiver }) => (
                    <>
                        {
                            Company?.Phone ? Company?.Phone :
                                <div className="blue hover-hand add-user-item " onClick={() => onAddCompanyPhone(Company, IsReceiver)} >
                                    Add Phone
                                    <i className="icon-plus-circled basket-table-icon" />
                                </div>
                        }
                    </>
                ),
            },
            {
                title: '',
                width: 60,
                dataIndex: ['Company'],
                render: (_, { Company }) => (
                    <>
                        {Company?.Email && emailRegEx.test(Company?.Email) &&
                            <input type="checkbox" className="check-box"
                                checked={isCompanyChecked(Company?.PartyTId)}
                                onChange={(e) => onClickCompaniesTableCheckBox(e, Company)}
                            />
                        }
                    </>

                )
            })

        return [{ title: 'Company', children: headers }]

    }, [displayCompanies, checkedCompaniesUsers])

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
                dataIndex: ['Value', 'CompanyData'],
                render: (_, { Value, CompanyData }) => (
                    <>
                        {Value?.Email && emailRegEx.test(Value?.Email) &&
                            <input type="checkbox" className="check-box"
                                checked={isPersonChecked(CompanyData?.Company?.PartyTId, Value?.PartyTId)}
                                onChange={(e) => onClickUsersTableCheckBox(e, CompanyData?.Company, Value)} />
                        }
                    </>
                )
            })

        return [{ title: 'Users', children: headers }]

    }, [displayCompanies, checkedCompaniesUsers]);


    const isCompanyChecked = (partyId) => {
        const index = checkedCompaniesUsers.findIndex(element => {
            return (element?.IsReceiver && element?.CompanyPartyTId === partyId && !element?.PersonPartyTId)
        })

        if (index < 0)
            return false
        else
            return true
    }

    const isPersonChecked = (companyId, personId) => {
        const index = checkedCompaniesUsers.findIndex(element => {
            return (element?.IsReceiver && element?.CompanyPartyTId === companyId && element?.PersonPartyTId === personId)
        })

        if (index < 0)
            return false
        else
            return true
    }

    const onAddCompanyEmail = (companyData, isReceiver) => {
        setSelectedCompanyToUpdate({ 'isCompany': true, 'companyData': companyData, 'isReceiver': isReceiver });
        toggelEmailModal();
    }

    const onAddCompanyPhone = (companyData, isReceiver) => {
        setSelectedCompanyToUpdate({ 'isCompany': true, 'companyData': companyData, 'isReceiver': isReceiver });
        toggelPhoneModal();
    }

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
        setNewUserFieldError('')
        setEmailModalVisible(pre => !pre);
    }

    const toggelPhoneModal = () => {
        setNewUserPhone('');
        setNewUserFieldError('')
        setPhoneModalVisible(pre => !pre);
    }

    const onChangeNewUserEmail = (e) => {
        e.preventDefault();
        setNewUserFieldError('');
        setNewUserEmail(e.target.value);
    }

    const onChangeNewUserPhone = (e) => {
        e.preventDefault();
        setNewUserFieldError('');
        setNewUserPhone(validatePhoneNumberInput(e.target.value));
    }

    const onAddEmail = () => {
        if (!emailRegEx.test(newUserEmail)) {
            setNewUserFieldError('Invalid Email');
            return;
        }

        setLoading(true);
        if (selectedCompanyToUpdate?.isCompany) {
            const params = {
                "Company": selectedCompanyToUpdate?.companyData,
                "CommunicationBasketId": basketId,
                "SelectedCompanyPartyId": selectedCompany?.companyPartyId,
                "UserPartyId": currentUser?.PartyId,
                "IsReceiver": selectedCompanyToUpdate?.isReceiver
            }

            params.Company.Email = newUserEmail;

            updateCompany(params).then(() => {
                message.success('Company update success')
                setLoading(false);
                getCompaniesData();
            }).catch(() => {
                setLoading(false);
                message.error('Company update failed')
            })
        } else {
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
        }

        setSelectedCompanyToUpdate({});
        toggelEmailModal()
    }

    const onAddPhone = () => {
        if (!phoneRegEx.test(newUserPhone)) {
            setNewUserFieldError('Invalid phone number');
            return;
        }

        setLoading(true);
        if (selectedCompanyToUpdate?.isCompany) {
            const params = {
                "Company": selectedCompanyToUpdate?.companyData,
                "CommunicationBasketId": basketId,
                "SelectedCompanyPartyId": selectedCompany?.companyPartyId,
                "UserPartyId": currentUser?.PartyId,
                "IsReceiver": selectedCompanyToUpdate?.isReceiver
            }

            params.Company.Phone = newUserPhone;

            updateCompany(params).then(() => {
                message.success('Company update success')
                setLoading(false);
                getCompaniesData();
            }).catch(() => {
                setLoading(false);
                message.error('Company update failed')
            })
        } else {
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
        }

        setSelectedCompanyToUpdate({});
        toggelPhoneModal()
    }

    const onClickUsersTableCheckBox = (e, company, person) => {
        const newList = [...checkedCompaniesUsers]

        if (e.target.checked) {
            const personDataSet = {
                "CompanyPartyTId": company?.PartyTId,
                "PersonPartyTId": person?.PartyTId,
                "Name": person?.Name,
                "Email": person?.Email,
                "IsReceiver": true
            }

            newList.push(personDataSet);
        } else {
            const index = checkedCompaniesUsers.findIndex(element => {
                return (element?.IsReceiver && element?.CompanyPartyTId === company?.PartyTId && element?.PersonPartyTId === person?.PartyTId)
            })

            newList[index].IsReceiver = false
        }

        setCheckedCompaniesUsers(newList)
    }

    const onClickCompaniesTableCheckBox = (e, company) => {
        const newList = [...checkedCompaniesUsers]

        if (e.target.checked) {
            const companyDataSet = {
                "CompanyPartyTId": company?.PartyTId,
                "PersonPartyTId": null,
                "Name": company?.Name,
                "Email": company?.Email,
                "IsReceiver": true
            }

            newList.push(companyDataSet);
        } else {
            const index = checkedCompaniesUsers.findIndex(element => {
                return (element?.IsReceiver && element?.CompanyPartyTId === company?.PartyTId && !element?.PersonPartyTId)
            })

            newList[index].IsReceiver = false
        }

        setCheckedCompaniesUsers(newList)
    }

    const getCompaniesData = () => {
        if (basketId) {
            setLoading(true);
            getCompanies(basketId, selectedCompany?.companyPartyId, '').then(result => {
                const newCheckedCompaniesUsers = []

                const companiesToShow = result?.Value?.filter(company => {
                    let isPersonReciever = false
                    const companyDataSet = {
                        "CompanyPartyTId": company?.Company?.PartyTId,
                        "PersonPartyTId": null,
                        "Name": company?.Company?.Name,
                        "Email": company?.Company?.Email,
                        "IsReceiver": company?.IsReceiver,
                        "BasketReceiverId": company?.BasketReceiverId || 0
                    }
                    newCheckedCompaniesUsers.push(companyDataSet)

                    if (company?.Persons?.length > 0) {
                        company?.Persons.map(person => {
                            const personDataSet = {
                                "CompanyPartyTId": company?.Company?.PartyTId,
                                "PersonPartyTId": person?.Value.PartyTId,
                                "Name": person?.Value.Name,
                                "Email": person?.Value.Email,
                                "IsReceiver": person?.Key ? true : false,
                                "BasketReceiverId": company?.BasketReceiverId || 0
                            }
                            newCheckedCompaniesUsers.push(personDataSet)

                            if (person?.Key)
                                isPersonReciever = true
                        })
                    }

                    return isPersonReciever || company?.IsReceiver
                })

                setCheckedCompaniesUsers(newCheckedCompaniesUsers)
                // setCompaniesData(result?.Value)
                setDisplayCompanies(companiesToShow)
            }).finally(() => setLoading(false))
        } else {
            message.error('Please select a basket')
        }
    }

    const onSearchCompanies = (inputValue, option) => {
        return JSON.parse(option?.value)?.Company?.Name.toLowerCase().includes(inputValue.toLowerCase());
    }

    const onChangeNewUserData = (e, type) => {
        e.preventDefault();
        setNewUserErrors(pre => ({ ...pre, [type]: '' }))
        if (type === 'mobileNumb') {
            setnewUserData(pre => ({ ...pre, [type]: validatePhoneNumberInput(e.target.value) }))

        } else {
            setnewUserData(pre => ({ ...pre, [type]: e.target.value }))
        }
    }

    const onChangeNewUserTitle = (e) => {
        e.preventDefault();
        setnewUserData(pre => ({ ...pre, title: JSON.parse(e.target.value) }))
        setNewUserErrors(pre => ({ ...pre, title: '' }))
    }

    const validateFields = () => {
        let validation = true
        if (!newUserData.firstname) {
            setNewUserErrors(pre => ({ ...pre, firstname: 'Please enter name' }))
            validation = false;
        }
        if (!newUserData.lastname) {
            setNewUserErrors(pre => ({ ...pre, lastname: 'Please enter name' }))
            validation = false;
        }
        if (!newUserData.title) {
            setNewUserErrors(pre => ({ ...pre, title: 'Please select a title' }))
            validation = false;
        }
        if (!emailRegEx.test(newUserData.email) || !newUserData.email) {
            setNewUserErrors(pre => ({ ...pre, email: 'Invalid email adress' }))
            validation = false
        }
        if (!phoneRegEx.test(newUserData.mobileNumb) || !newUserData.mobileNumb) {
            setNewUserErrors(pre => ({ ...pre, mobileNumb: 'Invalid mobile number' }))
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
                    <div className="basket-new-user-input">
                        <Input placeholder="First name" value={newUserData.firstname}
                            onChange={(e) => onChangeNewUserData(e, 'firstname')}
                            error={newUserErrors.firstname}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input placeholder="Last name" value={newUserData.lastname}
                            onChange={(e) => onChangeNewUserData(e, 'lastname')}
                            error={newUserErrors.lastname}
                        />
                    </div>
                    <div className="user-drop-down" style={{ width: 150 }}>
                        <Dropdown
                            values={nameTitles}
                            onChange={onChangeNewUserTitle}
                            selected={JSON.stringify(newUserData.title || undefined)}
                            placeholder="Title"
                            dataName="title"
                            error={newUserErrors.title}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input placeholder="" value={newUserData.email}
                            onChange={(e) => onChangeNewUserData(e, 'email')}
                            error={newUserErrors.email}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input placeholder="Mobile number" value={newUserData.mobileNumb}
                            onChange={(e) => onChangeNewUserData(e, 'mobileNumb')}
                            error={newUserErrors.mobileNumb}
                        />
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
        setNewCompaniesErrors(pre => ({ ...pre, [type]: '' }))
        if (type === 'phone') {
            setNewCompaniesData(pre => ({ ...pre, [type]: validatePhoneNumberInput(e.target.value) }))
        } else {
            setNewCompaniesData(pre => ({ ...pre, [type]: e.target.value }))
        }
    }

    const onChangeCountry = (e) => {
        e.preventDefault();
        setNewCompaniesErrors(pre => ({ ...pre, country: '' }))
        setNewCompaniesData(pre => ({ ...pre, country: JSON.parse(e.target.value) }))
    }

    const validateCompanyFields = () => {
        let validation = true
        if (!newCompaniesData.name) {
            setNewCompaniesErrors(pre => ({ ...pre, name: 'Please enter Name' }))
            validation = false
        }
        if (!newCompaniesData.orgId) {
            setNewCompaniesErrors(pre => ({ ...pre, orgId: 'Please enter Organization Id' }))
            validation = false
        }
        if (!newCompaniesData.country?.alpha2) {
            setNewCompaniesErrors(pre => ({ ...pre, country: 'Please select a country' }))
            validation = false
        }
        if (!phoneRegEx.test(newCompaniesData.phone) || !newCompaniesData.phone) {
            setNewCompaniesErrors(pre => ({ ...pre, phone: 'Invalid phone number' }))
            validation = false
        }
        if (!emailRegEx.test(newCompaniesData.email) || !newCompaniesData.email) {
            setNewCompaniesErrors(pre => ({ ...pre, email: 'Invalid email adress' }))
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
                    setNewCompaniesErrors(pre => ({ ...pre, orgId: 'Please enter a valid Organization Id' }))
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

    const onUpdate = () => {
        setLoading(true)
        const params = {
            "EntityPartyId": selectedCompany?.companyPartyId,
            "EntityName": selectedCompany?.name,
            "CommunicationBasketId": basketId,
            "UserPartyId": currentUser?.PartyId,
            "BasketReceivers": checkedCompaniesUsers
        }

        updateAndSchedule(params).then(() => {
            getCompaniesData();
        }).catch(() => setLoading(false))
    }

    const onSelectSearchCompany = (values) => {
        const companyList = values.map(company => {
            return JSON.parse(company)
        })

        setDisplayCompanies(companyList)
    }

    const addNewCompany = () => {
        return (
            <div className="recivers-companies-footer user-input-box">
                <div className="basket-new-company-input">
                    <Input placeholder="Org ID"
                        value={newCompaniesData.orgId}
                        onChange={(e) => onChangeNewOrgData(e, 'orgId')}
                        error={newCompaniesErrors.orgId}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input placeholder="Name"
                        value={newCompaniesData.name}
                        onChange={(e) => onChangeNewOrgData(e, 'name')}
                        error={newCompaniesErrors.name}
                    />
                </div>
                <div className="user-drop-down basket-new-company-input">
                    <Dropdown
                        values={countryList}
                        onChange={onChangeCountry}
                        selected={JSON.stringify(newCompaniesData.country || undefined)}
                        placeholder="Country"
                        dataName="Name"
                        error={newCompaniesErrors.country}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input placeholder="Email" value={newCompaniesData.email}
                        onChange={(e) => onChangeNewOrgData(e, 'email')}
                        error={newCompaniesErrors.email}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input placeholder="Phone"
                        value={newCompaniesData.phone}
                        onChange={(e) => onChangeNewOrgData(e, 'phone')}
                        error={newCompaniesErrors.phone}
                    />
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
                <div className="companies-search-input-containers user-input-box m-r-10" >
                    {/* <Input placeholder="Search" value={searchCompaniesText} onChange={onChangesearchCompaniesText} endImage='icon-search-1' /> */}
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Search"
                        onChange={onSelectSearchCompany}
                        showArrow
                        style={{ width: '100%', overflow: 'visible' }}
                        filterOption={onSearchCompanies}
                    >
                        {allCompaniesData?.map((company) => {
                            return <Select.Option key={company?.Company?.Id} value={JSON.stringify(company)}>{company?.Company.Name}</Select.Option>
                        })}
                    </Select>
                </div>
                <button className="add-btn m-r-10 disable-div" >Add New</button>
                <button className="add-btn m-r-10 disable-div" >Upload</button>
            </div>

            <div className="receivers-tablele-width">
                <Table
                    rowKey={(record, index) => index}
                    dataSource={displayCompanies}
                    scroll={{
                        y: '40vh',
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
            <div className="action-bar">
                {disableUpdate ?
                    <Tooltip title='Basket not configured'>
                        <button className="primary-btn actions-btn" disabled={true}>Update</button>
                    </Tooltip> :
                    <button className="primary-btn actions-btn" onClick={onUpdate}>Update</button>
                }

            </div>
            <Modal
                title={'Add email address'}
                visible={emailModalVisible}
                onOk={onAddEmail}
                onCancel={toggelEmailModal}
            >
                <div className="user-input-box">
                    <Input value={newUserEmail} onChange={onChangeNewUserEmail} error={newUserFieldError} />
                </div>
            </Modal>
            <Modal
                title={'Add phone number'}
                visible={phoneModalVisible}
                onOk={onAddPhone}
                onCancel={toggelPhoneModal}
            >
                <div className="user-input-box">
                    <Input value={newUserPhone} onChange={onChangeNewUserPhone} error={newUserFieldError} />
                </div>
            </Modal>
        </div>
    )
}

//Person >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const newPersonObject = { firstName: '', lastName: '', title: null, country: null, email: '', mobileNumb: '', companyId: '', companyName: '' }

const PersonsPage = ({ basketId, countryList, currentUser, selectedCompany, basketDropDown, disableUpdateBtn }) => {
    const [allPersonsData, setAllPersonsData] = useState();
    const [displayPersons, setDisplayPersons] = useState();
    const [selectedFieldToUpdate, setSelectedFieldToUpdate] = useState({});
    const [checkedPersonsCompanies, setCheckedPersonsCompanies] = useState();
    const [newPersonData, setnewPersonData] = useState(newPersonObject);
    const [newPersonErrors, setNewPersonErrors] = useState(newPersonObject);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTextField, setModalTextField] = useState({});
    const disableUpdate = disableUpdateBtn();

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            getPersonsData();
            getAllPersons();
        }
    }, [selectedCompany])

    const getAllPersons = () => {
        getPersons(selectedCompany?.companyPartyId, '').then(result => {
            setAllPersonsData(result?.Value)
        })
    }

    const isPersonChecked = (partyId) => {
        const index = checkedPersonsCompanies.findIndex(element => {
            return (element?.IsReceiver && element?.PersonPartyTId === partyId && !element?.CompanyPartyTId)
        })

        if (index < 0)
            return false
        else
            return true
    }

    const isCompanyChecked = (partyId, personData) => {
        const index = checkedPersonsCompanies.findIndex(element => {
            return (element?.IsReceiver && element?.CompanyPartyTId === partyId && element?.PersonPartyTId === personData?.Person?.PartyTId)
        })

        if (index < 0)
            return false
        else
            return true
    }

    const personsTableHeaders = useMemo(() => {
        const headers = ReceversPersonsTableHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push(
            {
                title: 'Email',
                dataIndex: ['Person', 'IsReceiver'],
                render: (_, { Person, IsReceiver }) => (
                    <>
                        {Person?.Email ? Person?.Email :
                            <div className="blue hover-hand add-user-item " onClick={() => onAddPersonEmail(Person, IsReceiver)} >
                                Add Email
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        }
                    </>
                ),
            },
            {
                title: 'Phone',
                dataIndex: ['Person', 'IsReceiver'],
                render: (_, { Person, IsReceiver }) => (
                    <>
                        {
                            Person?.Phone ? Person?.Phone :
                                <div className="blue hover-hand add-user-item " onClick={() => onAddPersonPhone(Person, IsReceiver)} >
                                    Add Phone
                                    <i className="icon-plus-circled basket-table-icon" />
                                </div>
                        }
                    </>
                ),
            },
            {
                title: '',
                width: 60,
                dataIndex: ['Person', 'BasketReceiverId'],
                render: (_, { Person, BasketReceiverId }) => (
                    <>
                        {Person?.Email && emailRegEx.test(Person?.Email) &&
                            <input type="checkbox" className="check-box"
                                checked={isPersonChecked(Person?.PartyTId)}
                                onChange={(e) => onClickPersonsTableCheckBox(e, Person, BasketReceiverId)}
                            />
                        }
                    </>
                )
            })

        return headers

    }, [displayPersons, checkedPersonsCompanies])

    const PersonsExpandedHeaders = useMemo(() => {
        const headers = ReceversPersonsTableExpandedHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: '',
            width: 60,
            dataIndex: ['BasketReceiverId', 'Company', 'PersonData'],
            render: (_, { BasketReceiverId, Company, PersonData }) => (
                <>
                    {Company?.Email && emailRegEx.test(Company?.Email) &&
                        <input type="checkbox" className="check-box"
                            checked={isCompanyChecked(Company?.PartyTId, PersonData)}
                            onChange={(e) => onClickCompanyCheckBox(e, Company, PersonData?.Person, BasketReceiverId)}
                        />
                    }
                </>
            )
        })

        return headers

    }, [displayPersons, checkedPersonsCompanies])

    const onAddPersonEmail = (personData, isReceiver) => {
        setSelectedFieldToUpdate({ 'isEmail': true, 'isPerson': true, 'personData': personData, 'isReceiver': isReceiver });
        toggelModal();
    }

    const onAddPersonPhone = (personData, isReceiver) => {
        setSelectedFieldToUpdate({ 'isEmail': false, 'isPerson': true, 'personData': personData, 'isReceiver': isReceiver });
        toggelModal();
    }

    const toggelModal = () => {
        setModalVisible(pre => !pre);
        setModalTextField('');
    }

    const onChangeModalTextField = (e) => {
        e.preventDefault()
        setModalTextField({ value: e.target.value, error: '' })
    }

    const onOkModal = () => {
        if (selectedFieldToUpdate?.isEmail) {
            if (!emailRegEx.test(modalTextField?.value)) {
                setModalTextField({ ...modalTextField, error: 'Invalid Email' });
                return;
            }
        } else {
            if (!phoneRegEx.test(modalTextField?.value)) {
                setModalTextField({ ...modalTextField, error: 'Invalid phone number' });
                return;
            }
        }

        setLoading(true);
        if (selectedFieldToUpdate?.isPerson) {
            const params = {
                "Person": selectedFieldToUpdate?.personData,
                "CommunicationBasketId": basketId,
                "UserPartyId": currentUser?.PartyId,
                "IsReceiver": selectedFieldToUpdate?.isReceiver,
                "CompanyPartyId": selectedCompany?.companyPartyId,
                "SelectedCompany": null,
            }

            if (selectedFieldToUpdate?.isEmail) {
                params.Person.Email = modalTextField?.value;
            } else {
                params.Person.Phone = modalTextField?.value;
            }


            updatePerson(params).then(() => {
                message.success('Person update success')
                setLoading(false);
                getPersonsData();
            }).catch(() => {
                setLoading(false);
                message.error('Person update failed')
            })
        } else {
            // const params = {
            //     "Company": selectedCompanyToUpdate.person,
            //     "SelectedCompany": selectedCompanyToUpdate.companyData?.Company,
            //     "CommunicationBasketId": basketId,
            //     "CompanyPartyId": selectedCompany?.companyPartyId,
            //     "UserPartyId": currentUser?.PartyId,
            //     "IsReceiver": selectedCompanyToUpdate?.isReceiver
            // }

            // params.Person.Email = newUserEmail;

            // updatePerson(params).then(() => {
            //     message.success('User update success')
            //     setLoading(false);
            //     getPersonsData();
            // }).catch(() => {
            //     setLoading(false);
            //     message.error('User update failed')
            // })
        }

        setSelectedFieldToUpdate({});
        toggelModal()
    }

    const onClickPersonsTableCheckBox = (e, person, basketReceiverId) => {
        const newList = JSON.parse(JSON.stringify(checkedPersonsCompanies))

        if (e.target.checked) {
            const personDataSet = {
                "CompanyPartyTId": null,
                "PersonPartyTId": person?.PartyTId,
                "Name": person?.Name,
                "Email": person?.Email,
                "IsReceiver": true,
                "BasketReceiverId": basketReceiverId
            }

            newList.push(personDataSet);
        } else {
            const index = checkedPersonsCompanies.findIndex(element => {
                return (element?.IsReceiver && element?.PersonPartyTId === person?.PartyTId && !element?.CompanyPartyTId)
            })

            newList[index].IsReceiver = false
        }

        setCheckedPersonsCompanies(newList)
    }

    const onClickCompanyCheckBox = (e, company, person, basketReceiverId) => {
        const newList = JSON.parse(JSON.stringify(checkedPersonsCompanies))

        if (e.target.checked) {
            const companyDataSet = {
                "CompanyPartyTId": company?.PartyTId,
                "PersonPartyTId": person?.PartyTId,
                "Name": company?.Name,
                "Email": company?.Email,
                "IsReceiver": true,
                "BasketReceiverId": basketReceiverId
            }

            newList.push(companyDataSet);
        } else {
            const index = checkedPersonsCompanies.findIndex(element => {
                return (element?.IsReceiver && element?.CompanyPartyTId === company?.PartyTId && element?.PersonPartyTId === person?.PartyTId)
            })

            newList[index].IsReceiver = false
        }

        setCheckedPersonsCompanies(newList)
    }

    const onUpdate = () => {
        setLoading(true)
        const params = {
            "EntityPartyId": selectedCompany?.companyPartyId,
            "EntityName": selectedCompany?.name,
            "CommunicationBasketId": basketId,
            "UserPartyId": currentUser?.PartyId,
            "BasketReceivers": checkedPersonsCompanies
        }

        updateAndSchedule(params).then(() => {
            getPersonsData();
        }).catch(() => setLoading(false))
    }

    const getPersonsData = () => {
        setLoading(true);
        getPersons(selectedCompany?.companyPartyId, basketId).then(result => {
            const newCheckedPersons = []

            const personsToShow = result?.Value?.filter(person => {
                let isCompanyReciever = false
                const personDataSet = {
                    "CompanyPartyTId": null,
                    "PersonPartyTId": person?.Person?.PartyTId,
                    "Name": person?.Person?.Name,
                    "Email": person?.Person?.Email,
                    "IsReceiver": person?.IsReceiver,
                    "BasketReceiverId": person?.BasketReceiverId
                }
                newCheckedPersons.push(personDataSet)

                if (person?.CompanyContacts?.length > 0) {
                    person?.CompanyContacts.map(company => {
                        const companyDataSet = {
                            "CompanyPartyTId": company?.Company?.PartyTId,
                            "PersonPartyTId": person?.Person?.PartyTId,
                            "Name": company?.Company.Name,
                            "Email": company?.Company.Email,
                            "IsReceiver": company?.IsReceiver,
                            "BasketReceiverId": company?.BasketReceiverId
                        }
                        newCheckedPersons.push(companyDataSet)

                        if (company?.IsReceiver)
                            isCompanyReciever = true
                    })
                }

                return isCompanyReciever || person?.IsReceiver
            })

            setCheckedPersonsCompanies(newCheckedPersons)
            setDisplayPersons(personsToShow)
        }).finally(() => setLoading(false))
    }

    const onSelectSearchPerson = (values) => {
        const personList = values.map(person => {
            return JSON.parse(person)
        })

        setDisplayPersons(personList)
    }

    const onSearchPersons = (inputValue, option) => {
        return JSON.parse(option?.value)?.Person?.Name.toLowerCase().includes(inputValue.toLowerCase());
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
        if (!newPersonData.firstName) {
            setNewPersonErrors(pre => ({ ...pre, firstname: 'First name cannot be empty' }))
            validation = false;
        }
        if (!newPersonData.lastName) {
            setNewPersonErrors(pre => ({ ...pre, lastName: 'Last name cannot be empty' }))
            validation = false;
        }
        if (!emailRegEx.test(newPersonData.email) || !newPersonData.email) {
            setNewPersonErrors(pre => ({ ...pre, email: 'Invalid email' }))
            validation = false
        }
        if (!newPersonData.title) {
            setNewPersonErrors(pre => ({ ...pre, title: 'Please select title' }))
            validation = false
        }
        if (!newPersonData.country) {
            setNewPersonErrors(pre => ({ ...pre, country: 'Please select country' }))
            validation = false
        }
        if (!newPersonData.mobileNumb) {
            setNewPersonErrors(pre => ({ ...pre, mobileNumb: 'Mobile number cannot be empty' }))
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

                getAllPersons();
                getPersonsData(0);
            }).catch(() => message.error('Create user failed please try again'))
        }
    }

    const addNewPerson = () => {
        return (
            <div className="recivers-user-footer user-input-box" style={{ marginLeft: 165 }}>
                <div style={{ width: 150 }}>
                    <Input placeholder="First name"
                        value={newPersonData.firstName}
                        onChange={(e) => onChangeNewPersonData(e, 'firstName')}
                        error={newPersonErrors.firstName}
                    />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Last name"
                        value={newPersonData.lastName}
                        onChange={(e) => onChangeNewPersonData(e, 'lastName')}
                        error={newPersonErrors.lastName}
                    />
                </div>
                <div className="user-drop-down" style={{ width: 150 }}>
                    <Dropdown
                        values={nameTitles}
                        onChange={onChangeNewUserTitle}
                        selected={JSON.stringify(newPersonData.title || undefined)}
                        placeholder="Title"
                        dataName="title"
                        error={newPersonErrors.title}
                    />
                </div>
                <div className="user-drop-down" style={{ width: 150 }}>
                    <Dropdown
                        values={countryList}
                        onChange={onChangeNewPersonCountry}
                        placeholder="Country"
                        selected={JSON.stringify(newPersonData.country || undefined)}
                        dataName="Name"
                        error={newPersonErrors.country}
                    />
                </div>
                <div style={{ width: 200 }}>
                    <Input placeholder="Email"
                        value={newPersonData.email}
                        onChange={(e) => onChangeNewPersonData(e, 'email')}
                        error={newPersonErrors.email}
                    />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Mobile number"
                        value={newPersonData.mobileNumb}
                        onChange={(e) => onChangeNewPersonData(e, 'mobileNumb')}
                        error={newPersonErrors.mobileNumb}
                    />
                </div>
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
                    dataSource={parentRow?.CompanyContacts?.map(company => {
                        company.PersonData = parentRow;
                        return company
                    })}
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
                <div className="companies-search-input-containers user-input-box m-r-10" >
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Search"
                        onChange={onSelectSearchPerson}
                        showArrow
                        style={{ width: '100%', overflow: 'visible' }}
                        filterOption={onSearchPersons}
                    >
                        {allPersonsData?.map((person) => {
                            return <Select.Option key={person?.Person?.Id} value={JSON.stringify(person)}>{person?.Person.Name}</Select.Option>
                        })}
                    </Select>
                </div>
                <button className="add-btn m-r-10 disable-div" >Add New</button>
                <button className="add-btn m-r-10 disable-div" >Upload</button>
            </div>

            <div className="receivers-tablele-width">
                <Table
                    rowKey={(record, index) => index}
                    dataSource={displayPersons}
                    scroll={{
                        y: '40vh',
                    }}
                    expandable={{
                        expandedRowRender,
                    }}
                    columns={personsTableHeaders}
                    pagination={false}
                    footer={addNewPerson}
                />
            </div>
            <div className="action-bar">
                {disableUpdate ?
                    <Tooltip title='Basket not configured'>
                        <button className="primary-btn actions-btn" disabled={true}>Update</button>
                    </Tooltip> :
                    <button className="primary-btn actions-btn" onClick={onUpdate}>Update</button>
                }

            </div>
            <Modal
                title={selectedFieldToUpdate?.isEmail ? 'Add email address' : 'Add phone number'}
                visible={modalVisible}
                onOk={onOkModal}
                onCancel={toggelModal}
            >
                <div className="user-input-box">
                    <Input value={modalTextField?.value || ''} onChange={onChangeModalTextField} error={modalTextField?.error || ''} />
                </div>
            </Modal>
        </>
    )
}

export default CompaniesAndPersons;