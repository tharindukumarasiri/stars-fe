import React, { useState, useEffect, useMemo } from "react";
import { Tabs, Table, message, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";

import Input from "../../../common/input";
import {
    ReceversCompaniesTableHeaders,
    ReceversCompaniesSubTableHeaders,
    ReceversPersonsTableHeaders,
    ReceversPersonsTableExpandedHeaders,
} from "../../../utils/tableHeaders";
import {
    getCompanies,
    getPersons,
    addPerson,
    updatePerson,
    getGetCountries,
    addCompany,
    updateCompany,
    updateAndSchedule,
} from "../../../services/communicationService";
import { getOrganization } from "../../../services/organizationsService";
import { FetchCurrentUser, FetchCurrentCompany } from "../../../hooks/index";
import Dropdown from "../../../common/dropdown";
import { emailRegEx, phoneRegEx, messageTriggerPoints } from "../../../utils/constants";
import { validatePhoneNumberInput } from "../../../utils";

const { TabPane } = Tabs;

const nameTitles = [
    { id: 1, title: "Mr." },
    { id: 2, title: "Mrs." },
    { id: 3, title: "Ms." },
];

const CompaniesAndPersonsNoBasket = (props) => {
    const { fromDateTime, defaultRecievers, showOnlyDefaultRecievers, updateRecipients, selectedTemplate } = props;
    const [countryList, setCountryList] = useState([]);
    const [currentUser] = FetchCurrentUser();
    const [selectedCompany] = FetchCurrentCompany();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        getGetCountries()
            .then((result) => {
                setCountryList(result);
            })
            .finally(() => setLoading(false));
    }, []);

    const isUpdateBtnDisabled = () => {
        if (fromDateTime) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <div className="custom-tab-container sub-table-nav">
            {loading && (
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <Tabs type="card" style={{ width: "90vw" }}>
                {!showOnlyDefaultRecievers && (
                    <>
                        <TabPane tab={t("COMPANIES")} key="3">
                            <CompaniesPage
                                disableUpdateBtn={isUpdateBtnDisabled}
                                countryList={countryList}
                                currentUser={currentUser}
                                selectedCompany={selectedCompany}
                                updateRecipients={updateRecipients}
                                selectedTemplate={selectedTemplate}
                            />
                        </TabPane>

                        <TabPane tab={t("PERSONS")} key="4">
                            <PersonsPage
                                disableUpdateBtn={isUpdateBtnDisabled}
                                countryList={countryList}
                                currentUser={currentUser}
                                selectedCompany={selectedCompany}
                                updateRecipients={updateRecipients}
                                selectedTemplate={selectedTemplate}
                            />
                        </TabPane>
                    </>
                )}
                {showOnlyDefaultRecievers && (
                    <TabPane tab={t("USERS")} key="5">
                        <div className="default-recivers-content">
                            {defaultRecievers.map((r) => {
                                return (
                                    <div className="row m-2">
                                        <div className="col-2">{`${r.FirstName} ${r.LastName}`}</div>
                                        <div className="col-3">{r.Email}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </TabPane>
                )}
            </Tabs>
        </div>
    );
};

const CompaniesPage = ({ countryList, currentUser, selectedCompany, updateRecipients, selectedTemplate }) => {
    const [allCompaniesData, setAllCompaniesData] = useState([]);
    const [displayCompanies, setDisplayCompanies] = useState([]);
    const [newCompaniesData, setNewCompaniesData] = useState({ orgId: "", name: "", country: null, email: "", phone: "" });
    const [newCompaniesErrors, setNewCompaniesErrors] = useState({ orgId: "", name: "", country: null, email: "", phone: "" });
    const [newUserData, setnewUserData] = useState({ firstname: "", lastname: "", title: null, email: "", mobileNumb: "" });
    const [newUserErrors, setNewUserErrors] = useState({ firstname: "", lastname: "", title: null, email: "", mobileNumb: "" });
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPhone, setNewUserPhone] = useState("");
    const [newUserFieldError, setNewUserFieldError] = useState("");
    const [selectedCompanyToUpdate, setSelectedCompanyToUpdate] = useState({});
    const [checkedCompaniesUsers, setCheckedCompaniesUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            getCompaniesData();
        }
    }, [selectedCompany]);

    const searchOptions = useMemo(() => {
        return (
            allCompaniesData?.map((company) => {
                return (
                    <Select.Option key={company?.Company?.Id} value={JSON.stringify(company)}>
                        {company?.Company.Name}
                    </Select.Option>
                );
            })
        )
    }, [allCompaniesData, displayCompanies])

    const companiesTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesTableHeaders(t)[0].children?.map((a) => {
            return { ...a, title: a.title };
        });

        headers.push(
            {
                title: "Email",
                dataIndex: ["Company", "IsReceiver"],
                render: (_, { Company, IsReceiver }) => (
                    <>
                        {Company?.Email ? (
                            Company?.Email
                        ) : (
                            <div className="blue hover-hand add-user-item " onClick={() => onAddCompanyEmail(Company, IsReceiver)}>
                                {t('ADD_EMAIL')}
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        )}
                    </>
                ),
            },
            {
                title: "Phone",
                dataIndex: ["Company", "IsReceiver"],
                render: (_, { Company, IsReceiver }) => (
                    <>
                        {Company?.Phone ? (
                            Company?.Phone
                        ) : (
                            <div className="blue hover-hand add-user-item " onClick={() => onAddCompanyPhone(Company, IsReceiver)}>
                                {t('ADD_PHONE')}
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        )}
                    </>
                ),
            },
            {
                title: "",
                width: 60,
                dataIndex: ["Company", "IsDisabled"],
                render: (_, { Company, IsDisabled }) => (
                    <>
                        {Company?.Email && emailRegEx.test(Company?.Email) && (selectedTemplate?.MessageTriggerPointId != messageTriggerPoints.CompanyInvitation) && (
                            <input
                                type="checkbox"
                                className="check-box"
                                checked={isCompanyChecked(Company?.PartyTId)}
                                onChange={(e) => onClickCompaniesTableCheckBox(e, Company)}
                                disabled={IsDisabled}
                            />
                        )}
                    </>
                ),
            }
        );

        return [{ title: "Company", children: headers }];
    }, [displayCompanies, checkedCompaniesUsers]);

    const usersTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesSubTableHeaders(t)[0].children?.map((a) => {
            return { ...a, title: a.title };
        });
        headers.push(
            {
                title: "Email",
                dataIndex: ["Person", "CompanyData", "ReceiverId"],
                render: (_, { Person, CompanyData, ReceiverId }) => (
                    <>
                        {Person?.Email ? (
                            Person?.Email
                        ) : (
                            <div className="blue hover-hand add-user-item " onClick={() => onAddUserEmail(CompanyData, Person, ReceiverId)}>
                                Add Email
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        )}
                    </>
                ),
                width: 200,
            },
            {
                title: "Mobile Number",
                dataIndex: ["Person", "CompanyData", "ReceiverId"],
                render: (_, { Person, CompanyData, ReceiverId }) => (
                    <>
                        {Person?.Phone ? (
                            Person?.Phone
                        ) : (
                            <div className="blue hover-hand add-user-item " onClick={() => onAddUserPhoneNumber(CompanyData, Person, ReceiverId)}>
                                Add Phone
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        )}
                    </>
                ),
                width: 200,
            },
            {
                title: "",
                width: 60,
                dataIndex: ["Person", "CompanyData", 'IsDisabled'],
                render: (_, { Person, CompanyData, IsDisabled }) => (
                    <>
                        {Person?.Email && emailRegEx.test(Person?.Email) && (
                            <input
                                type="checkbox"
                                className="check-box"
                                checked={isPersonChecked(CompanyData?.Company?.PartyTId, Person?.PartyTId)}
                                onChange={(e) => onClickUsersTableCheckBox(e, CompanyData?.Company, Person)}
                                disabled={IsDisabled}
                            />
                        )}
                    </>
                ),
            }
        );

        return [{ title: "Users", children: headers }];
    }, [displayCompanies, checkedCompaniesUsers]);

    const isCompanyChecked = (partyId) => {
        const index = checkedCompaniesUsers.findIndex((element) => {
            return element?.IsReceiver && element?.CompanyPartyTId === partyId && !element?.PersonPartyTId;
        });

        if (index < 0) return false;
        else return true;
    };

    const isPersonChecked = (companyPartyId, personId) => {
        const index = checkedCompaniesUsers.findIndex((element) => {
            return element?.IsReceiver && element?.CompanyPartyTId === companyPartyId && element?.PersonPartyTId === personId;
        });

        if (index < 0) return false;
        else return true;
    };

    const onAddCompanyEmail = (companyData, isReceiver) => {
        setSelectedCompanyToUpdate({ isCompany: true, companyData: companyData, isReceiver: isReceiver });
        toggelEmailModal();
    };

    const onAddCompanyPhone = (companyData, isReceiver) => {
        setSelectedCompanyToUpdate({ isCompany: true, companyData: companyData, isReceiver: isReceiver });
        toggelPhoneModal();
    };

    const onAddUserEmail = (companyData, person, isReceiver) => {
        setSelectedCompanyToUpdate({ companyData: companyData, person: person, isReceiver: isReceiver });
        toggelEmailModal();
    };

    const onAddUserPhoneNumber = (companyData, person, isReceiver) => {
        setSelectedCompanyToUpdate({ companyData: companyData, person: person, isReceiver: isReceiver });
        toggelPhoneModal();
    };

    const toggelEmailModal = () => {
        setNewUserEmail("");
        setNewUserFieldError("");
        setEmailModalVisible((pre) => !pre);
    };

    const toggelPhoneModal = () => {
        setNewUserPhone("");
        setNewUserFieldError("");
        setPhoneModalVisible((pre) => !pre);
    };

    const onChangeNewUserEmail = (e) => {
        e.preventDefault();
        setNewUserFieldError("");
        setNewUserEmail(e.target.value);
    };

    const onChangeNewUserPhone = (e) => {
        e.preventDefault();
        setNewUserFieldError("");
        setNewUserPhone(validatePhoneNumberInput(e.target.value));
    };

    const onAddEmail = () => {
        if (!emailRegEx.test(newUserEmail)) {
            setNewUserFieldError(t('INVALID_EMAIL'));
            return;
        }

        setLoading(true);
        if (selectedCompanyToUpdate?.isCompany) {
            const params = {
                Company: selectedCompanyToUpdate?.companyData,
                SelectedCompanyPartyId: selectedCompany?.companyPartyId,
                UserId: currentUser?.Id,
                IsReceiver: selectedCompanyToUpdate?.isReceiver,
            };

            params.Company.Email = newUserEmail;

            updateCompany(params)
                .then(() => {
                    message.success(t('MSG_COMPANY_UPDATE_SUCCESS'));
                    setLoading(false);
                    getCompaniesData();
                })
                .catch(() => {
                    setLoading(false);
                    message.error(t('COMPANY_UPDATE_FAIL'));
                });
        } else {
            const params = {
                Person: selectedCompanyToUpdate.person,
                SelectedCompany: selectedCompanyToUpdate.companyData?.Company,
                CompanyPartyId: selectedCompany?.companyPartyId,
                UserId: currentUser?.Id,
                IsReceiver: selectedCompanyToUpdate?.isReceiver,
            };

            params.Person.Email = newUserEmail;

            updatePerson(params)
                .then(() => {
                    message.success(t('USER_UPDATE_SUCCESS'));
                    setLoading(false);
                    getCompaniesData();
                })
                .catch(() => {
                    setLoading(false);
                    message.error(t('USER_UPDATE_FAIL'));
                });
        }

        setSelectedCompanyToUpdate({});
        toggelEmailModal();
    };

    const onAddPhone = () => {
        if (!phoneRegEx.test(newUserPhone)) {
            setNewUserFieldError(t('INVALID_PHONE_NUMBER'));
            return;
        }

        setLoading(true);
        if (selectedCompanyToUpdate?.isCompany) {
            const params = {
                Company: selectedCompanyToUpdate?.companyData,
                SelectedCompanyPartyId: selectedCompany?.companyPartyId,
                UserId: currentUser?.Id,
                IsReceiver: selectedCompanyToUpdate?.isReceiver,
            };

            params.Company.Phone = newUserPhone;

            updateCompany(params)
                .then(() => {
                    message.success(t('MSG_COMPANY_UPDATE_SUCCESS'));
                    setLoading(false);
                    getCompaniesData();
                })
                .catch(() => {
                    setLoading(false);
                    message.error(t('COMPANY_UPDATE_FAIL'));
                });
        } else {
            const params = {
                Person: selectedCompanyToUpdate.person,
                SelectedCompany: selectedCompanyToUpdate.companyData?.Company,
                CompanyPartyId: selectedCompany?.companyPartyId,
                UserId: currentUser?.Id,
                IsReceiver: selectedCompanyToUpdate?.isReceiver,
            };

            params.Person.Phone = newUserPhone;

            updatePerson(params)
                .then(() => {
                    message.success(t('USER_UPDATE_SUCCESS'));
                    setLoading(false);
                    getCompaniesData();
                })
                .catch(() => {
                    setLoading(false);
                    message.error(t('USER_UPDATE_FAIL'));
                });
        }

        setSelectedCompanyToUpdate({});
        toggelPhoneModal();
    };

    const onClickUsersTableCheckBox = (e, company, person) => {
        const newList = [...checkedCompaniesUsers];
        if(e.target.checked && selectedTemplate?.MessageTriggerPointId === messageTriggerPoints.CompanyInvitation){
            let existingPersonForSameCompanyIndex = checkedCompaniesUsers.findIndex(p => p.CompanyPartyTId === company?.PartyTId);
            if(existingPersonForSameCompanyIndex > -1){
                message.error(t('MSG_ONLY_ONE_RECIEVER_FOR_TENANT_INVITATION'));
                return;
            }
        }
        const index = checkedCompaniesUsers.findIndex((element) => {
            return (
                element?.IsReceiver && element?.CompanyPartyTId === company?.PartyTId && element?.PersonPartyTId === person?.PartyTId
            );
        });

        if (e.target.checked) {
            const personDataSet = {
                CompanyPartyTId: company?.PartyTId,
                PersonPartyTId: person?.PartyTId,
                Name: person?.Name,
                Email: person?.Email,
                IsReceiver: true,
            };

            if (index < 0)
                newList.push(personDataSet);
        } else {
            if (index > -1)
                newList.splice(index, 1);
        }

        setCheckedCompaniesUsers(newList);
        updateRecipients(newList);
    };

    const onClickCompaniesTableCheckBox = (e, company) => {
        const newList = [...checkedCompaniesUsers];
        const index = checkedCompaniesUsers.findIndex((element) => {
            return element?.IsReceiver && element?.CompanyPartyTId === company?.PartyTId && !element?.PersonPartyTId;
        });

        if (e.target.checked) {
            const companyDataSet = {
                CompanyPartyTId: company?.PartyTId,
                PersonPartyTId: null,
                Name: company?.Name,
                Email: company?.Email,
                IsReceiver: true,
            };

            if (index < 0) newList.push(companyDataSet);
        } else {
            if (index > -1) newList.splice(index, 1);
        }

        setCheckedCompaniesUsers(newList);
        updateRecipients(newList);
    };

    const getCompaniesData = () => {
        setLoading(true);
        getCompanies("", selectedCompany?.companyPartyId, "", selectedTemplate?.MessageTriggerPointId).then((result) => {
            const newDisplay = displayCompanies?.map(company => {
                return result?.Value?.find(c => c?.Company?.Id === company?.Company?.Id)
            })

            setDisplayCompanies(newDisplay);
            setAllCompaniesData(result?.Value);

        }).finally(() => setLoading(false));
    };

    const onSearchCompanies = (inputValue, option) => {
        return JSON.parse(option?.value)?.Company?.Name.toLowerCase().includes(inputValue.toLowerCase());
    };

    const onChangeNewUserData = (e, type) => {
        e.preventDefault();
        setNewUserErrors((pre) => ({ ...pre, [type]: "" }));
        if (type === "mobileNumb") {
            setnewUserData((pre) => ({ ...pre, [type]: validatePhoneNumberInput(e.target.value) }));
        } else {
            setnewUserData((pre) => ({ ...pre, [type]: e.target.value }));
        }
    };

    const onChangeNewUserTitle = (e) => {
        e.preventDefault();
        setnewUserData((pre) => ({ ...pre, title: JSON.parse(e.target.value) }));
        setNewUserErrors((pre) => ({ ...pre, title: "" }));
    };

    const validateFields = () => {
        let validation = true;
        if (!newUserData.firstname) {
            setNewUserErrors((pre) => ({ ...pre, firstname: t('PLEASE_ENTER_NAME') }));
            validation = false;
        }
        if (!newUserData.lastname) {
            setNewUserErrors((pre) => ({ ...pre, lastname: t('PLEASE_ENTER_NAME') }));
            validation = false;
        }
        if (!newUserData.title) {
            setNewUserErrors((pre) => ({ ...pre, title: t('PLEASE_SELECT_TITLE') }));
            validation = false;
        }
        if (!emailRegEx.test(newUserData.email) || !newUserData.email) {
            setNewUserErrors((pre) => ({ ...pre, email: t('INVALID_EMAIL') }));
            validation = false;
        }
        if (!phoneRegEx.test(newUserData.mobileNumb) || !newUserData.mobileNumb) {
            setNewUserErrors((pre) => ({ ...pre, mobileNumb: t('INVALID_MOBILE') }));
            validation = false;
        }

        return validation;
    };

    const onAddUser = (companyData) => {
        if (validateFields()) {
            setLoading(true);
            const params = {
                Person: {
                    Name: newUserData.firstname + " " + newUserData.lastname,
                    TitleTId: newUserData.title?.id,
                    TitleTName: newUserData.title?.title,
                    FirstName: newUserData.firstname,
                    MiddleName: null,
                    LastName: newUserData.lastname,
                    CountryTId: companyData?.CountryTId,
                    CountryTName: companyData?.CountryTName,
                    Email: newUserData.email,
                    Phone: newUserData.mobileNumb,
                },
                SelectedCompany: companyData,
                CompanyPartyId: selectedCompany?.companyPartyId,
            };

            addPerson(params)
                .then(() => {
                    setnewUserData({ firstname: "", lastname: "", title: null, email: "", mobileNumb: "" });
                    setNewUserErrors({ firstname: "", lastname: "", title: null, email: "", mobileNumb: "" });
                    message.success(t('MSG_CREATE_USER_SUCCESS'));
                    getCompaniesData();
                })
                .catch(() => message.error(t('MSG_CREATE_USER_FAILED')));
        }
    };

    const expandedRowRender = (parentRow) => {
        const addNewMember = () => {
            return (
                <div className="recivers-user-footer user-input-box">
                    <div className="basket-new-user-input">
                        <Input
                            placeholder="FIRST_NAME"
                            value={newUserData.firstname}
                            onChange={(e) => onChangeNewUserData(e, "firstname")}
                            error={newUserErrors.firstname}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input
                            placeholder="LAST_NAME"
                            value={newUserData.lastname}
                            onChange={(e) => onChangeNewUserData(e, "lastname")}
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
                        <Input
                            placeholder="EMAIL"
                            value={newUserData.email}
                            onChange={(e) => onChangeNewUserData(e, "email")}
                            error={newUserErrors.email}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input
                            placeholder="MOBILE_NUMBER"
                            value={newUserData.mobileNumb}
                            onChange={(e) => onChangeNewUserData(e, "mobileNumb")}
                            error={newUserErrors.mobileNumb}
                        />
                    </div>
                    <i className="icon-plus-circled blue basket-table-icon hover-hand" onClick={() => onAddUser(parentRow?.Company)} />
                </div>
            );
        };

        return (
            <div className="recivers-sub-table-padding">
                <Table
                    rowKey={(record, index) => index}
                    columns={usersTableHeaders}
                    dataSource={parentRow?.Persons?.map((person) => {
                        person.CompanyData = parentRow;
                        return person;
                    })}
                    pagination={false}
                    footer={addNewMember}
                />
            </div>
        );
    };

    const onChangeNewOrgData = (e, type) => {
        e.preventDefault();
        setNewCompaniesErrors((pre) => ({ ...pre, [type]: "" }));
        if (type === "phone") {
            setNewCompaniesData((pre) => ({ ...pre, [type]: validatePhoneNumberInput(e.target.value) }));
        } else {
            setNewCompaniesData((pre) => ({ ...pre, [type]: e.target.value }));
        }
    };

    const onChangeCountry = (e) => {
        e.preventDefault();
        setNewCompaniesErrors((pre) => ({ ...pre, country: "" }));
        setNewCompaniesData((pre) => ({ ...pre, country: JSON.parse(e.target.value) }));
    };

    const validateCompanyFields = () => {
        let validation = true;
        if (!newCompaniesData.name) {
            setNewCompaniesErrors((pre) => ({ ...pre, name: t('PLEASE_ENTER_NAME') }));
            validation = false;
        }
        if (!newCompaniesData.orgId) {
            setNewCompaniesErrors((pre) => ({ ...pre, orgId: t('PLEASE_ENTER_ORG_ID') }));
            validation = false;
        }
        if (!newCompaniesData.country?.alpha2) {
            setNewCompaniesErrors((pre) => ({ ...pre, country: t('PLEASE_SELECT_COUNTRY') }));
            validation = false;
        }
        if (!phoneRegEx.test(newCompaniesData.phone) || !newCompaniesData.phone) {
            setNewCompaniesErrors((pre) => ({ ...pre, phone: t('INVALID_PHONE_NUMBER') }));
            validation = false;
        }
        if (!emailRegEx.test(newCompaniesData.email) || !newCompaniesData.email) {
            setNewCompaniesErrors((pre) => ({ ...pre, email: t('INVALID_EMAIL') }));
            validation = false;
        }

        return validation;
    };
    const onAddCompany = () => {
        if (validateCompanyFields()) {
            setLoading(true);
            if(newCompaniesData.country?.alpha2 === "NO"){
                getOrganization(newCompaniesData.orgId, newCompaniesData.country?.alpha2)
                .then((result) => {
                    if (result) {
                        addCompanyData();
                        setNewCompaniesErrors({ orgId: "", name: "", country: null, email: "", phone: "" });
                    } else {
                        setLoading(false);
                        message.error(t('MSG_ENTER_VALID_ORGID_AND_COUNTRY'));
                        setNewCompaniesErrors((pre) => ({ ...pre, orgId: t('INVALLID_ORG_ID') }));
                    }
                })
                .catch(() => setLoading(false));
            }
            else{
                addCompanyData();
            }
           
        }
    };

    const addCompanyData = () => {
        const params = {
            Company: {
                Name: newCompaniesData.name,
                CompanyRegistrationID: newCompaniesData.orgId,
                CompanyTypeTId: 1, //organization
                CountryTId: newCompaniesData.country?.Id,
                CountryTCode: newCompaniesData.country?.alpha2,
                CountryTName: newCompaniesData.country?.Name,
                Email: newCompaniesData.email,
                Phone: newCompaniesData.phone,
                CreatedUserId: currentUser?.Id,
            },
            SelectedCompanyPartyId: selectedCompany?.companyPartyId,
        };
        addCompany(params)
            .then((result) => {
                const newDisplayCompanies = JSON.parse(JSON.stringify(displayCompanies))
                newDisplayCompanies.push({'Company': result});
                setDisplayCompanies(newDisplayCompanies);
                message.success(t('MSG_COMPANY_CREATE_SUCCESS'));
                setLoading(false);
                setNewCompaniesData({ orgId: "", name: "", country: null, email: "", phone: "" });
            })
            .catch(() => {
                message.error(t('MSG_COMPANY_CREATE_FAIL'));
                setLoading(false);
            });
    };

    const onSelectSearchCompany = (values) => {
        const companyList = values.map((company) => {
            return JSON.parse(company);
        });

        setDisplayCompanies(companyList);
    };

    const addNewCompany = () => {
        return (
            <div className="recivers-companies-footer user-input-box">
                <div className="basket-new-company-input">
                    <Input
                        placeholder="ORG_ID"
                        value={newCompaniesData.orgId}
                        onChange={(e) => onChangeNewOrgData(e, "orgId")}
                        error={newCompaniesErrors.orgId}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input
                        placeholder="NAME"
                        value={newCompaniesData.name}
                        onChange={(e) => onChangeNewOrgData(e, "name")}
                        error={newCompaniesErrors.name}
                    />
                </div>
                <div className="user-drop-down basket-new-company-input">
                    <Dropdown
                        values={countryList}
                        onChange={onChangeCountry}
                        selected={JSON.stringify(newCompaniesData.country || undefined)}
                        placeholder="COUNTRY"
                        dataName="Name"
                        error={newCompaniesErrors.country}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input
                        placeholder="EMAIL"
                        value={newCompaniesData.email}
                        onChange={(e) => onChangeNewOrgData(e, "email")}
                        error={newCompaniesErrors.email}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input
                        placeholder="PHONE"
                        value={newCompaniesData.phone}
                        onChange={(e) => onChangeNewOrgData(e, "phone")}
                        error={newCompaniesErrors.phone}
                    />
                </div>
                <i className="icon-plus-circled blue basket-companies-table-icon hover-hand" onClick={onAddCompany} />
            </div>
        );
    };

    return (
        <div className={loading ? "loading-overlay" : ""}>
            {loading && (
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <div className="recivers-top-container m-b-20">
                <div className="companies-search-input-containers user-input-box m-r-10">
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder={t('SEARCH')}
                        onChange={onSelectSearchCompany}
                        showArrow
                        style={{ width: "100%", overflow: "visible" }}
                        filterOption={onSearchCompanies}
                    >
                        {searchOptions}
                    </Select>
                </div>
                <button className="add-btn m-r-10 disable-div">{t('ADD_NEW')}</button>
                <button className="add-btn m-r-10 disable-div">{t('UPLOAD')}</button>
            </div>

            <div className="receivers-tablele-width expandable-table-btn">
                <Table
                    rowKey={(record, index) => index}
                    dataSource={displayCompanies}
                    scroll={{
                        y: "40vh",
                        x: "70vw",
                    }}
                    columns={companiesTableHeaders}
                    pagination={false}
                    expandable={{
                        expandedRowRender,
                    }}
                    footer={addNewCompany}
                />
            </div>
            <Modal title={t('ADD_EMAIL_ADRESS')} visible={emailModalVisible}
                onOk={onAddEmail}
                okText={t('OK')}
                onCancel={toggelEmailModal}
                cancelText={t('CANCEL')}
                closeIcon={< i className='icon-close close-icon' />}>
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
    );
};

//Person >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const newPersonObject = {
    firstName: "",
    lastName: "",
    title: null,
    country: null,
    email: "",
    mobileNumb: "",
    companyPartyId: "",
    companyName: "",
};

const PersonsPage = ({ countryList, currentUser, selectedCompany, updateRecipients, selectedTemplate }) => {
    const [personsData, setPersonsData] = useState();
    const [displayPersons, setDisplayPersons] = useState();
    const [newPersonData, setnewPersonData] = useState(newPersonObject);
    const [newPersonErrors, setNewPersonErrors] = useState(newPersonObject);
    const [selectedFieldToUpdate, setSelectedFieldToUpdate] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTextField, setModalTextField] = useState({});
    const [loading, setLoading] = useState(true);
    const [checkedPersons, setCheckedPersons] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            getPersonsData();
        }
    }, [selectedCompany]);

    const personsTableHeaders = useMemo(() => {
        const headers = (ReceversPersonsTableHeaders(t))?.map(a => { return { ...a, title: a.title } })
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
                dataIndex: ['Person', 'IsDisabled', 'CompanyContacts'],
                render: (_, { Person, IsDisabled, CompanyContacts }) => (
                    <>
                        {Person?.Email && emailRegEx.test(Person?.Email) && !(selectedTemplate?.MessageTriggerPointId === 1 && CompanyContacts?.length === 0) &&
                            <input type="checkbox" className="check-box"
                                checked={isPersonChecked(Person?.PartyTId)}
                                onChange={(e) => onClickPersonsTableCheckBox(e, Person)}
                                disabled={IsDisabled}
                            />
                        }
                    </>
                )
            })

        return headers
    }, [displayPersons, checkedPersons]);

    const PersonsExpandedHeaders = useMemo(() => {
        const headers = ReceversPersonsTableExpandedHeaders(t);
        headers.push({
            title: '',
            width: 60,
            dataIndex: ['Company', 'IsDisabled'],
            render: (_, { Company, IsDisabled }) => (
                <>
                    {Company?.Email && emailRegEx.test(Company?.Email) &&
                        <input type="checkbox" className="check-box"
                            checked={isCompanyChecked(Company?.PartyTId)}
                            onChange={(e) => onClickPersonsTableCompanyCheckBox(e, Company)}
                            disabled={IsDisabled}
                        />
                    }
                </>
            )
        })

        return headers
    }, [displayPersons, checkedPersons]);

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
                setModalTextField({ ...modalTextField, error: t('INVALID_EMAIL') });
                return;
            }
        } else {
            if (!phoneRegEx.test(modalTextField?.value)) {
                setModalTextField({ ...modalTextField, error: t('INVALID_PHONE_NUMBER') });
                return;
            }
        }

        setLoading(true);
        if (selectedFieldToUpdate?.isPerson) {
            const params = {
                "Person": selectedFieldToUpdate?.personData,
                "CommunicationBasketId": null,
                "UserId": currentUser?.Id,
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
                message.success(t('MSG_PERSON_UPDATE_SUCCESS'))
                setLoading(false);
                getPersonsData();
            }).catch(() => {
                setLoading(false);
                message.error(t('MSG_PERSON_UPDATE_FAIL'))
            })
        } else {

        }

        setSelectedFieldToUpdate({});
        toggelModal()
    }

    const onClickPersonsTableCheckBox = (e, person) => {
        const newList = [...checkedPersons];

        if (e.target.checked) {
            const companyDataSet = {
                CompanyPartyTId: null,
                PersonPartyTId: person?.PartyTId,
                Name: person?.Name,
                Email: person?.Email,
                IsReceiver: true,
            };

            newList.push(companyDataSet);
        } else {
            const index = checkedPersons.findIndex((element) => {
                return element?.IsReceiver && !element?.CompanyPartyTId && element?.PersonPartyTId === person?.PartyTId;
            });

            if (index > -1) {
                newList.splice(index, 1);
            }
        }

        setCheckedPersons(newList);
        updateRecipients(newList);
    };

    const onClickPersonsTableCompanyCheckBox = (e, company) => {
        const newList = [...checkedPersons];

        if (e.target.checked) {
            const companyDataSet = {
                CompanyPartyTId: company?.PartyTId,
                PersonPartyTId: null,
                Name: company?.Name,
                Email: company?.Email,
                IsReceiver: true,
            };

            newList.push(companyDataSet);
        } else {
            const index = checkedPersons.findIndex((element) => {
                return element?.IsReceiver && element?.CompanyPartyTId === company?.PartyTId && !element?.PersonPartyTId;
            });

            if (index > -1) {
                newList.splice(index, 1);
            }
        }

        setCheckedPersons(newList);
        updateRecipients(newList);
    };

    const getPersonsData = (dispPersons = displayPersons) => {
        setLoading(true);
        getPersons(selectedCompany?.companyPartyId)
            .then((result) => {
                setPersonsData(result?.Value);

                const newDisplay = dispPersons?.map(person => {
                    return result?.Value?.find(p => p?.Person?.Id === person?.Person?.Id)
                })
                setDisplayPersons(newDisplay)
            })
            .finally(() => setLoading(false));
    };

    const onChangeNewPersonData = (e, type) => {
        e.preventDefault();
        setNewPersonErrors((pre) => ({ ...pre, [type]: '' }));
        if (type === "mobileNumb") {
            setnewPersonData((pre) => ({ ...pre, [type]: validatePhoneNumberInput(e.target.value) }));
        } else {
            setnewPersonData((pre) => ({ ...pre, [type]: e.target.value }));
        }
    };

    const onChangeNewUserTitle = (e) => {
        e.preventDefault();
        setNewPersonErrors((pre) => ({ ...pre, title: '' }));
        setnewPersonData((pre) => ({ ...pre, title: JSON.parse(e.target.value) }));
    };

    const onChangeNewPersonCountry = (e) => {
        e.preventDefault();
        setNewPersonErrors((pre) => ({ ...pre, country: '' }));
        setnewPersonData((pre) => ({ ...pre, country: JSON.parse(e.target.value) }));
    };

    const validateFields = () => {
        let validation = true
        if (!newPersonData.firstName) {
            setNewPersonErrors(pre => ({ ...pre, firstName: t('FIRST_NAME_EMPTY') }))
            validation = false;
        }
        if (!newPersonData.lastName) {
            setNewPersonErrors(pre => ({ ...pre, lastName: t('LAST_NAME_EMPTY') }))
            validation = false;
        }
        if (!emailRegEx.test(newPersonData.email) || !newPersonData.email) {
            setNewPersonErrors(pre => ({ ...pre, email: t('INVALID_EMAIL') }))
            validation = false
        }
        if (!newPersonData.title) {
            setNewPersonErrors(pre => ({ ...pre, title: t('PLEASE_SELECT_TITLE') }))
            validation = false
        }
        if (!newPersonData.country) {
            setNewPersonErrors(pre => ({ ...pre, country: t('PLEASE_SELECT_COUNTRY') }))
            validation = false
        }
        if (!phoneRegEx.test(newPersonData.mobileNumb) || !newPersonData.mobileNumb) {
            setNewPersonErrors(pre => ({ ...pre, mobileNumb:  t('INVALID_PHONE_NUMBER') }))
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
                "CommunicationBasketId": null,
                "CompanyPartyId": selectedCompany?.companyPartyId
            }

            addPerson(params).then((result) => {
                const newDisplayPersons = displayPersons ? JSON.parse(JSON.stringify(displayPersons || undefined)) : []
                newDisplayPersons.push({'Person': result })
                setDisplayPersons(newDisplayPersons)
                
                setnewPersonData(newPersonObject);
                setNewPersonErrors(newPersonObject)
                message.success(t('MSG_PERSON_CREATE_SUCCESS'));
                setLoading(false);

                getPersonsData(newDisplayPersons);
            }).catch(() => {
                setLoading(false);
                message.error(t('MSG_PERSON_CREATE_FAIL'))
            })
        }
    };

    const addNewPerson = () => {
        return (
            <div className="recivers-user-footer user-input-box" style={{ marginLeft: 165 }}>
                <div style={{ width: 150 }}>
                    <Input placeholder="FIRST_NAME"
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
    };

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

    const isCompanyChecked = (partyId) => {
        const index = checkedPersons.findIndex((element) => {
            return element?.IsReceiver && element?.CompanyPartyTId === partyId && !element?.PersonPartyTId;
        });

        if (index < 0) return false;
        else return true;
    };

    const isPersonChecked = (personId) => {
        const index = checkedPersons.findIndex((element) => {
            return element?.IsReceiver && element?.PersonPartyTId === personId;
        });

        if (index < 0) return false;
        else return true;
    };

    const onSelectSearchPerson = (values) => {
        const personList = values.map((person) => {
            return JSON.parse(person);
        });

        setDisplayPersons(personList);
    };

    const onSearchPerson = (inputValue, option) => {
        return (JSON.parse(option?.value)?.Person?.Name?.toLowerCase().includes(inputValue.toLowerCase()) ||
            JSON.parse(option?.value)?.Person?.FirstName?.toLowerCase().includes(inputValue.toLowerCase()) ||
            JSON.parse(option?.value)?.Person?.LastName?.toLowerCase().includes(inputValue.toLowerCase()));
    };

    return (
        <>
            {loading && (
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <div className="recivers-top-container m-b-20">
                <div className="companies-search-input-containers user-input-box m-r-10">
                    {/* <Input placeholder="Search" value={searchCompaniesText} onChange={onChangesearchCompaniesText} endImage='icon-search-1' /> */}
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="SEARCH"
                        onChange={onSelectSearchPerson}
                        showArrow
                        style={{ width: "100%", overflow: "visible" }}
                        filterOption={onSearchPerson}
                    >
                        {personsData?.map((person) => {
                            return (
                                <Select.Option key={person?.Person?.Id} value={JSON.stringify(person)}>
                                    {person?.Person.Name || person?.Person.FirstName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </div>
                <button className="add-btn m-r-10 disable-div">{t('ADD_NEW')}</button>
                <button className="add-btn m-r-10 disable-div">{t('UPLOAD')}</button>
            </div>

            <div className="receivers-tablele-width expandable-table-btn">
                <Table
                    rowKey={(record, index) => index}
                    dataSource={displayPersons}
                    scroll={{
                        y: "40vh",
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
    );
};

export default CompaniesAndPersonsNoBasket;
