import React, { useState, useEffect, useMemo, } from "react";
import { Tabs, Table, message, Modal, Select } from 'antd';
import { useTranslation } from "react-i18next";

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
    updateBasketReceivers
} from "../../../services/communicationService";
import { getOrganization } from "../../../services/organizationsService";
import { FetchCurrentUser, FetchCurrentCompany } from "../../../hooks/index"
import Dropdown from "../../../common/dropdown";
import { emailRegEx, phoneRegEx } from "../../../utils/constants";
import { validatePhoneNumberInput } from "../../../utils";

const { TabPane } = Tabs;

const nameTitles = [{ id: 1, title: 'Mr.' }, { id: 2, title: 'Mrs.' }, { id: 3, title: 'Ms.' },]
const userObj = { firstname: '', lastname: '', title: null, email: '', mobileNumb: '' }

const CompaniesAndPersons = (props) => {
    const { basketId, basketDetails, defaultRecievers, showOnlyDefaultRecievers, updateRecipients } = props;
    const [countryList, setCountryList] = useState([])
    const [currentUser] = FetchCurrentUser();
    const [selectedCompany] = FetchCurrentCompany();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        getGetCountries().then(result => {
            setCountryList(result);
        }).finally(() => setLoading(false));
    }, [])

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
                        <TabPane tab={t("COMPANIES")} key="3">
                            <CompaniesPage
                                basketId={basketId}
                                countryList={countryList}
                                currentUser={currentUser}
                                selectedCompany={selectedCompany}
                                updateRecipients={updateRecipients}
                                selectedTemplate={props?.selectedTemplate}
                            />
                        </TabPane>

                        <TabPane tab={t("PERSONS_CAPS")} key="4">
                            <PersonsPage
                                basketId={basketId}
                                countryList={countryList}
                                currentUser={currentUser}
                                selectedCompany={selectedCompany}
                                updateRecipients={updateRecipients}
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

const companyObj = { orgId: '', name: '', country: null, email: '', phone: '' }

const CompaniesPage = ({ basketId, countryList, currentUser, selectedCompany, updateRecipients, selectedTemplate }) => {
    const [allCompaniesData, setAllCompaniesData] = useState([]);
    // const [companiesData, setCompaniesData] = useState();
    const [displayCompanies, setDisplayCompanies] = useState();
    const [newCompaniesData, setNewCompaniesData] = useState(companyObj);
    const [newCompaniesErrors, setNewCompaniesErrors] = useState(companyObj);
    const [newUserData, setnewUserData] = useState(userObj);
    const [newUserErrors, setNewUserErrors] = useState(userObj);
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPhone, setNewUserPhone] = useState('');
    const [newUserFieldError, setNewUserFieldError] = useState('')
    const [selectedCompanyToUpdate, setSelectedCompanyToUpdate] = useState({});
    const [checkedCompaniesUsers, setCheckedCompaniesUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (selectedCompany?.companyId) {
            setLoading(true)
            getCompaniesData();
            getCompanies('', selectedCompany?.companyId, '', selectedTemplate?.MessageTriggerPointId).then(result => {
                setAllCompaniesData(result?.Value)
                setLoading(false)
            })
        }
    }, [selectedCompany])

    const companiesTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesTableHeaders(t)[0].children?.map(a => { return { ...a, title: a.title } })

        headers.push(
            {
                title: 'Email',
                dataIndex: ['Company', 'IsReceiver'],
                render: (_, { Company, IsReceiver }) => (
                    <>
                        {Company?.Email ? Company?.Email :
                            <div className="blue hover-hand add-user-item " onClick={() => onAddCompanyEmail(Company, IsReceiver)} >
                                {t('ADD_EMAIL')}
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
                                    {t('ADD_PHONE')}
                                    <i className="icon-plus-circled basket-table-icon" />
                                </div>
                        }
                    </>
                ),
            },
            {
                title: '',
                width: 60,
                dataIndex: ['Company', 'IsDisabled'],
                render: (_, { Company, IsDisabled }) => (
                    <>
                        {Company?.Email && emailRegEx.test(Company?.Email) &&
                            <input type="checkbox" className="check-box"
                                checked={isCompanyChecked(Company?.PartyTId)}
                                onChange={(e) => onClickCompaniesTableCheckBox(e, Company)}
                                disabled={IsDisabled}
                            />
                        }
                    </>

                )
            })

        return [{ title: 'Company', children: headers }]

    }, [displayCompanies, checkedCompaniesUsers])

    const usersTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesSubTableHeaders(t)[0].children?.map(a => { return { ...a, title: a.title } })
        headers.push(
            {
                title: 'Email',
                dataIndex: ['Person', 'CompanyData', 'ReceiverId'],
                render: (_, { Person, CompanyData, ReceiverId }) => (
                    <>
                        {Person?.Email ? Person?.Email :
                            <div className="blue hover-hand add-user-item " onClick={() => onAddUserEmail(CompanyData, Person, ReceiverId)} >
                                {t('ADD_EMAIL')}
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        }
                    </>
                ),
                width: 200
            },
            {
                title: 'Mobile Number',
                dataIndex: ['Person', 'CompanyData', 'ReceiverId'],
                render: (_, { Person, CompanyData, ReceiverId }) => (
                    <>
                        {Person?.Phone ? Person?.Phone :
                            <div className="blue hover-hand add-user-item " onClick={() => onAddUserPhoneNumber(CompanyData, Person, ReceiverId)} >
                                {t('ADD_PHONE')}
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
                dataIndex: ['Person', 'CompanyData', 'IsDisabled'],
                render: (_, { Person, CompanyData, IsDisabled }) => (
                    <>
                        {Person?.Email && emailRegEx.test(Person?.Email) &&
                            <input type="checkbox" className="check-box"
                                checked={isPersonChecked(CompanyData?.Company?.PartyTId, Person?.PartyTId)}
                                onChange={(e) => onClickUsersTableCheckBox(e, CompanyData?.Company, Person)}
                                disabled={IsDisabled}
                            />
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
                "SelectedCompanyPartyId": selectedCompany?.companyId,
                "UserId": currentUser?.Id,
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
                "CompanyPartyId": selectedCompany?.companyId,
                "UserId": currentUser?.Id,
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
                "SelectedCompanyPartyId": selectedCompany?.companyId,
                "UserId": currentUser?.Id,
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
                "CompanyPartyId": selectedCompany?.companyId,
                "UserId": currentUser?.Id,
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
        updateRecipients(newList)
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
        updateRecipients(newList)
    }

    const getCompaniesData = () => {
        if (basketId) {
            setLoading(true);
            getCompanies(basketId, selectedCompany?.companyId, '', selectedTemplate?.MessageTriggerPointId).then(result => {
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
            setNewUserErrors(pre => ({ ...pre, firstname: 'NAME_ERROR' }))
            validation = false;
        }
        if (!newUserData.lastname) {
            setNewUserErrors(pre => ({ ...pre, lastname: 'NAME_ERROR' }))
            validation = false;
        }
        if (!newUserData.title) {
            setNewUserErrors(pre => ({ ...pre, title: 'SELECT_TITLE_ERROR' }))
            validation = false;
        }
        if (!emailRegEx.test(newUserData.email) || !newUserData.email) {
            setNewUserErrors(pre => ({ ...pre, email: 'INVALID_EMAIL' }))
            validation = false
        }
        if (!phoneRegEx.test(newUserData.mobileNumb) || !newUserData.mobileNumb) {
            setNewUserErrors(pre => ({ ...pre, mobileNumb: 'MOBILE_NUMBER_ERROR' }))
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
                "CompanyPartyId": selectedCompany?.companyId
            }

            addPerson(params).then(() => {
                setnewUserData(userObj);
                setNewUserErrors(userObj)
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
                        <Input placeholder="FIRST_NAME" value={newUserData.firstname}
                            onChange={(e) => onChangeNewUserData(e, 'firstname')}
                            error={newUserErrors.firstname}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input placeholder="LAST_NAME" value={newUserData.lastname}
                            onChange={(e) => onChangeNewUserData(e, 'lastname')}
                            error={newUserErrors.lastname}
                        />
                    </div>
                    <div className="user-drop-down" style={{ width: 150 }}>
                        <Dropdown
                            values={nameTitles}
                            onChange={onChangeNewUserTitle}
                            selected={JSON.stringify(newUserData.title || undefined)}
                            placeholder="TITLE"
                            dataName="title"
                            error={newUserErrors.title}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input placeholder="EMAIL" value={newUserData.email}
                            onChange={(e) => onChangeNewUserData(e, 'email')}
                            error={newUserErrors.email}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input placeholder="MOBILE_NUMBER" value={newUserData.mobileNumb}
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
            setNewCompaniesErrors(pre => ({ ...pre, name: 'NAME_ERROR' }))
            validation = false
        }
        if (!newCompaniesData.orgId) {
            setNewCompaniesErrors(pre => ({ ...pre, orgId: 'ORG_ID_ERROR' }))
            validation = false
        }
        if (!newCompaniesData.country?.alpha2) {
            setNewCompaniesErrors(pre => ({ ...pre, country: 'SELECT_COUNTRY_ERROR' }))
            validation = false
        }
        if (!phoneRegEx.test(newCompaniesData.phone) || !newCompaniesData.phone) {
            setNewCompaniesErrors(pre => ({ ...pre, phone: 'PHONE_NUMBER_ERROR' }))
            validation = false
        }
        if (!emailRegEx.test(newCompaniesData.email) || !newCompaniesData.email) {
            setNewCompaniesErrors(pre => ({ ...pre, email: 'INVALID_EMAIL' }))
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
                "CompanyRegistrationID": newCompaniesData.orgId,
                "CompanyTypeTId": 1, //organization
                "CountryTId": newCompaniesData.country?.Id,
                "CountryTCode": newCompaniesData.country?.alpha2,
                "CountryTName": newCompaniesData.country?.Name,
                "Email": newCompaniesData.email,
                "Phone": newCompaniesData.phone,
                "CreatedUserId": currentUser?.Id
            },
            "CommunicationBasketId": basketId,
            "SelectedCompanyPartyId": selectedCompany?.companyId
        }
        addCompany(params).then(() => {
            message.success('Company created')
            setLoading(false)
            setNewCompaniesData(companyObj)
            setNewCompaniesErrors(companyObj)
        }).catch(() => {
            message.error('Company creation failed')
            setLoading(false)
        })
    }

    const onUpdate = () => {
        setLoading(true)
        const params = {
            "EntityPartyId": selectedCompany?.companyId,
            "EntityName": selectedCompany?.name,
            "CommunicationBasketId": basketId,
            "UserId": currentUser?.Id,
            "BasketReceivers": checkedCompaniesUsers
        }

        updateBasketReceivers(params).then(() => {
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
                <div className="basket-new-company-input" style={{ width: 150 }}>
                    <Input placeholder='ORG_ID'
                        value={newCompaniesData.orgId}
                        onChange={(e) => onChangeNewOrgData(e, 'orgId')}
                        error={newCompaniesErrors.orgId}
                    />
                </div>
                <div className="basket-new-company-input" style={{ width: 150 }}>
                    <Input placeholder='NAME'
                        value={newCompaniesData.name}
                        onChange={(e) => onChangeNewOrgData(e, 'name')}
                        error={newCompaniesErrors.name}
                    />
                </div>
                <div className="basket-new-company-input" style={{ width: 150 }}>
                    <Dropdown
                        values={countryList}
                        onChange={onChangeCountry}
                        selected={JSON.stringify(newCompaniesData.country || undefined)}
                        placeholder='COUNTRY'
                        dataName="Name"
                        error={newCompaniesErrors.country}
                    />
                </div>
                <div className="basket-new-company-input" style={{ width: 150 }}>
                    <Input placeholder='EMAIL' value={newCompaniesData.email}
                        onChange={(e) => onChangeNewOrgData(e, 'email')}
                        error={newCompaniesErrors.email}
                    />
                </div>
                <div className="basket-new-company-input" style={{ width: 150 }}>
                    <Input placeholder='PHONE'
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
                <div className="companies-search-input-containers user-input-box m-r-10" >
                    {/* <Input placeholder="Search" value={searchCompaniesText} onChange={onChangesearchCompaniesText} endImage='icon-search-1' /> */}
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder={t('SEARCH')}
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
                {/* <button className="add-btn m-r-10 disable-div" >{t('ADD_NEW')}</button>
                <button className="add-btn m-r-10 disable-div" >{t('UPLOAD')}</button> */}
                <button className="add-btn" onClick={onUpdate}>{t('UPDATE')}</button>
            </div>

            <div className="receivers-tablele-width expandable-table-btn">
                <Table
                    rowKey={(record, index) => index}
                    dataSource={displayCompanies}
                    scroll={{
                        y: '40vh',
                    }}
                    columns={companiesTableHeaders}
                    pagination={false}
                    expandable={{
                        expandedRowRender,
                    }}
                    footer={addNewCompany}
                />
            </div>
            <Modal
                title={t('ADD_EMAIL_ADRESS')}
                visible={emailModalVisible}
                onOk={onAddEmail}
                okText={t('OK')}
                onCancel={toggelEmailModal}
                cancelText={t('CANCEL')}
                closeIcon={< i className='icon-close close-icon' />}
            >
                <div className="user-input-box">
                    <Input value={newUserEmail} onChange={onChangeNewUserEmail} error={newUserFieldError} />
                </div>
            </Modal>
            <Modal
                title={t('ADD_PHONE_NUMBER')}
                visible={phoneModalVisible}
                onOk={onAddPhone}
                okText={t('OK')}
                onCancel={toggelPhoneModal}
                cancelText={t('CANCEL')}
                closeIcon={< i className='icon-close close-icon' />}
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

const PersonsPage = ({ basketId, countryList, currentUser, selectedCompany, updateRecipients }) => {
    const [allPersonsData, setAllPersonsData] = useState();
    const [displayPersons, setDisplayPersons] = useState();
    const [selectedFieldToUpdate, setSelectedFieldToUpdate] = useState({});
    const [checkedPersonsCompanies, setCheckedPersonsCompanies] = useState();
    const [newPersonData, setnewPersonData] = useState(newPersonObject);
    const [newPersonErrors, setNewPersonErrors] = useState(newPersonObject);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTextField, setModalTextField] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        if (selectedCompany?.companyId) {
            getPersonsData();
            getAllPersons();
        }
    }, [selectedCompany])

    const getAllPersons = () => {
        getPersons(selectedCompany?.companyId, '').then(result => {
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
        const headers = ReceversPersonsTableHeaders(t);
        headers.push(
            {
                title: 'Email',
                dataIndex: ['Person', 'IsReceiver'],
                render: (_, { Person, IsReceiver }) => (
                    <>
                        {Person?.Email ? Person?.Email :
                            <div className="blue hover-hand add-user-item " onClick={() => onAddPersonEmail(Person, IsReceiver)} >
                                {t('ADD_EMAIL')}
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
                                    {t('ADD_PHONE')}
                                    <i className="icon-plus-circled basket-table-icon" />
                                </div>
                        }
                    </>
                ),
            },
            {
                title: '',
                width: 60,
                dataIndex: ['Person', 'BasketReceiverId', 'IsDisabled'],
                render: (_, { Person, BasketReceiverId, IsDisabled }) => (
                    <>
                        {Person?.Email && emailRegEx.test(Person?.Email) &&
                            <input type="checkbox" className='check-box'
                                checked={isPersonChecked(Person?.PartyTId)}
                                onChange={(e) => onClickPersonsTableCheckBox(e, Person, BasketReceiverId)}
                                disabled={IsDisabled}
                            />
                        }
                    </>
                )
            })

        return headers

    }, [displayPersons, checkedPersonsCompanies])

    const PersonsExpandedHeaders = useMemo(() => {
        const headers = ReceversPersonsTableExpandedHeaders(t);
        headers.push({
            title: '',
            width: 60,
            dataIndex: ['BasketReceiverId', 'Company', 'PersonData', 'IsDisabled'],
            render: (_, { BasketReceiverId, Company, PersonData, IsDisabled }) => (
                <>
                    {Company?.Email && emailRegEx.test(Company?.Email) &&
                        <input type="checkbox" className="check-box"
                            checked={isCompanyChecked(Company?.PartyTId, PersonData)}
                            onChange={(e) => onClickCompanyCheckBox(e, Company, PersonData?.Person, BasketReceiverId)}
                            disabled={IsDisabled}
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
                "UserId": currentUser?.Id,
                "IsReceiver": selectedFieldToUpdate?.isReceiver,
                "CompanyPartyId": selectedCompany?.companyId,
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
            //     "CompanyPartyId": selectedCompany?.companyId,
            //     "UserId": currentUser?.Id,
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
        updateRecipients(newList)
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
        updateRecipients(newList)
    }

    const onUpdate = () => {
        setLoading(true)
        const params = {
            "EntityPartyId": selectedCompany?.companyId,
            "EntityName": selectedCompany?.name,
            "CommunicationBasketId": basketId,
            "UserId": currentUser?.Id,
            "BasketReceivers": checkedPersonsCompanies
        }

        updateBasketReceivers(params).then(() => {
            getPersonsData();
        }).catch(() => setLoading(false))
    }

    const getPersonsData = () => {
        setLoading(true);
        getPersons(selectedCompany?.companyId, basketId).then(result => {
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
            setNewPersonErrors(pre => ({ ...pre, firstname: 'FIRST_NAME_CANNOT_BE_EMPTY' }))
            validation = false;
        }
        if (!newPersonData.lastName) {
            setNewPersonErrors(pre => ({ ...pre, lastName: 'LAST_NAME_CANNOT_BE_EMPTY' }))
            validation = false;
        }
        if (!emailRegEx.test(newPersonData.email) || !newPersonData.email) {
            setNewPersonErrors(pre => ({ ...pre, email: 'INVALID_EMAIL' }))
            validation = false
        }
        if (!newPersonData.title) {
            setNewPersonErrors(pre => ({ ...pre, title: 'SELECT_TITLE_ERROR' }))
            validation = false
        }
        if (!newPersonData.country) {
            setNewPersonErrors(pre => ({ ...pre, country: 'SELECT_COUNTRY_ERROR' }))
            validation = false
        }
        if (!newPersonData.mobileNumb) {
            setNewPersonErrors(pre => ({ ...pre, mobileNumb: 'MOBILE_NUMBER_ERROR' }))
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
                "CompanyPartyId": selectedCompany?.companyId
            }

            addPerson(params).then(() => {
                setnewPersonData(newPersonObject);
                setNewPersonErrors(newPersonObject)
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
                    <Input placeholder='FIRST_NAME'
                        value={newPersonData.firstName}
                        onChange={(e) => onChangeNewPersonData(e, 'firstName')}
                        error={newPersonErrors.firstName}
                    />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="LAST_NAME"
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
                        placeholder="TITLE"
                        dataName="title"
                        error={newPersonErrors.title}
                    />
                </div>
                <div className="user-drop-down" style={{ width: 150 }}>
                    <Dropdown
                        values={countryList}
                        onChange={onChangeNewPersonCountry}
                        placeholder="COUNTRY"
                        selected={JSON.stringify(newPersonData.country || undefined)}
                        dataName="Name"
                        error={newPersonErrors.country}
                    />
                </div>
                <div style={{ width: 200 }}>
                    <Input placeholder="EMAIL"
                        value={newPersonData.email}
                        onChange={(e) => onChangeNewPersonData(e, 'email')}
                        error={newPersonErrors.email}
                    />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="MOBILE_NUMBER"
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
                <div className="companies-search-input-containers user-input-box m-r-10" >
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder={t('SEARCH')}
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
                {/* <button className="add-btn m-r-10 disable-div" >{t('ADD_NEW')}</button>
                <button className="add-btn m-r-10 disable-div" >{t('UPLOAD')}</button> */}
                <button className="add-btn" onClick={onUpdate}>{t('UPDATE')}</button>
            </div>

            <div className="receivers-tablele-width expandable-table-btn">
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
            <Modal
                title={t(selectedFieldToUpdate?.isEmail ? 'ADD_EMAIL_ADRESS' : 'ADD_PHONE_NUMBER')}
                visible={modalVisible}
                onOk={onOkModal}
                okText={t('OK')}
                onCancel={toggelModal}
                cancelText={t('CANCEL')}
                closeIcon={< i className='icon-close close-icon' />}
            >
                <div className="user-input-box">
                    <Input value={modalTextField?.value || ''} onChange={onChangeModalTextField} error={modalTextField?.error || ''} />
                </div>
            </Modal>
        </>
    )
}

export default CompaniesAndPersons;