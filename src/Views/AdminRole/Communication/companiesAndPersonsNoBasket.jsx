import React, { useState, useEffect, useMemo } from "react";
import { Tabs, Table, message, Modal, Tooltip, Select } from "antd";

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
import { emailRegEx, phoneRegEx } from "../../../utils/constants";
import { validatePhoneNumberInput } from "../../../utils";

const { TabPane } = Tabs;

const nameTitles = [
    { id: 1, title: "Mr." },
    { id: 2, title: "Mrs." },
    { id: 3, title: "Ms." },
];

const CompaniesAndPersonsNoBasket = (props) => {
    const { fromDateTime, defaultRecievers, showOnlyDefaultRecievers, updateRecipients } = props;
    const [countryList, setCountryList] = useState([]);
    const [currentUser] = FetchCurrentUser();
    const [selectedCompany] = FetchCurrentCompany();
    const [loading, setLoading] = useState(true);

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
                        <TabPane tab="COMPANIES" key="3">
                            <CompaniesPage
                                disableUpdateBtn={isUpdateBtnDisabled}
                                countryList={countryList}
                                currentUser={currentUser}
                                selectedCompany={selectedCompany}
                                updateRecipients={updateRecipients}
                            />
                        </TabPane>

                        <TabPane tab="PERSONS" key="4">
                            <PersonsPage
                                disableUpdateBtn={isUpdateBtnDisabled}
                                countryList={countryList}
                                currentUser={currentUser}
                                selectedCompany={selectedCompany}
                                updateRecipients={updateRecipients}
                            />
                        </TabPane>
                    </>
                )}
                {showOnlyDefaultRecievers && (
                    <TabPane tab="USERS" key="5">
                        {defaultRecievers.map((r) => {
                            return (
                                <div className="row m-2">
                                    <div className="col-2">{`${r.FirstName} ${r.LastName}`}</div>
                                    <div className="col-3">{r.Email}</div>
                                </div>
                            );
                        })}
                    </TabPane>
                )}
            </Tabs>
        </div>
    );
};

const CompaniesPage = ({ countryList, currentUser, selectedCompany, disableUpdateBtn, updateRecipients }) => {
    const [allCompaniesData, setAllCompaniesData] = useState([]);
    const [companiesData, setCompaniesData] = useState();
    const [displayCompanies, setDisplayCompanies] = useState();
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

    const disableUpdate = disableUpdateBtn();

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            setLoading(true);
            //getCompaniesData();
            getCompanies("", selectedCompany?.companyPartyId).then((result) => {
                setAllCompaniesData(result?.Value);
                setLoading(false);
            });
        }
    }, [selectedCompany]);

    const companiesTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesTableHeaders[0].children?.map((a) => {
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
                                Add Email
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
                                Add Phone
                                <i className="icon-plus-circled basket-table-icon" />
                            </div>
                        )}
                    </>
                ),
            },
            {
                title: "",
                width: 60,
                dataIndex: ["Company"],
                render: (_, { Company }) => (
                    <>
                        {Company?.Email && emailRegEx.test(Company?.Email) && (
                            <input
                                type="checkbox"
                                className="check-box"
                                checked={isCompanyChecked(Company?.PartyTId)}
                                onChange={(e) => onClickCompaniesTableCheckBox(e, Company)}
                            />
                        )}
                    </>
                ),
            }
        );

        return [{ title: "Company", children: headers }];
    }, [displayCompanies, checkedCompaniesUsers]);

    const usersTableHeaders = useMemo(() => {
        const headers = ReceversCompaniesSubTableHeaders[0].children?.map((a) => {
            return { ...a, title: a.title };
        });
        headers.push(
            {
                title: "Email",
                dataIndex: ["Value", "CompanyData", "Key"],
                render: (_, { Value, CompanyData, Key }) => (
                    <>
                        {Value?.Email ? (
                            Value?.Email
                        ) : (
                            <div className="blue hover-hand add-user-item " onClick={() => onAddUserEmail(CompanyData, Value, Key)}>
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
                dataIndex: ["Value", "CompanyData", "Key"],
                render: (_, { Value, CompanyData, Key }) => (
                    <>
                        {Value?.Phone ? (
                            Value?.Phone
                        ) : (
                            <div className="blue hover-hand add-user-item " onClick={() => onAddUserPhoneNumber(CompanyData, Value, Key)}>
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
                dataIndex: ["Value", "CompanyData"],
                render: (_, { Value, CompanyData }) => (
                    <>
                        {Value?.Email && emailRegEx.test(Value?.Email) && (
                            <input
                                type="checkbox"
                                className="check-box"
                                checked={isPersonChecked(CompanyData?.Company?.PartyTId, Value?.PartyTId)}
                                onChange={(e) => onClickUsersTableCheckBox(e, CompanyData?.Company, Value)}
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

    const isPersonChecked = (companyId, personId) => {
        const index = checkedCompaniesUsers.findIndex((element) => {
            return element?.IsReceiver && element?.CompanyPartyTId === companyId && element?.PersonPartyTId === personId;
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
            setNewUserFieldError("Invalid Email");
            return;
        }

        setLoading(true);
        if (selectedCompanyToUpdate?.isCompany) {
            const params = {
                Company: selectedCompanyToUpdate?.companyData,
                SelectedCompanyPartyId: selectedCompany?.companyPartyId,
                UserPartyId: currentUser?.PartyId,
                IsReceiver: selectedCompanyToUpdate?.isReceiver,
            };

            params.Company.Email = newUserEmail;

            updateCompany(params)
                .then(() => {
                    message.success("Company update success");
                    setLoading(false);
                    getCompaniesData();
                })
                .catch(() => {
                    setLoading(false);
                    message.error("Company update failed");
                });
        } else {
            const params = {
                Person: selectedCompanyToUpdate.person,
                SelectedCompany: selectedCompanyToUpdate.companyData?.Company,
                CompanyPartyId: selectedCompany?.companyPartyId,
                UserPartyId: currentUser?.PartyId,
                IsReceiver: selectedCompanyToUpdate?.isReceiver,
            };

            params.Person.Email = newUserEmail;

            updatePerson(params)
                .then(() => {
                    message.success("User update success");
                    setLoading(false);
                    getCompaniesData();
                })
                .catch(() => {
                    setLoading(false);
                    message.error("User update failed");
                });
        }

        setSelectedCompanyToUpdate({});
        toggelEmailModal();
    };

    const onAddPhone = () => {
        if (!phoneRegEx.test(newUserPhone)) {
            setNewUserFieldError("Invalid phone number");
            return;
        }

        setLoading(true);
        if (selectedCompanyToUpdate?.isCompany) {
            const params = {
                Company: selectedCompanyToUpdate?.companyData,
                SelectedCompanyPartyId: selectedCompany?.companyPartyId,
                UserPartyId: currentUser?.PartyId,
                IsReceiver: selectedCompanyToUpdate?.isReceiver,
            };

            params.Company.Phone = newUserPhone;

            updateCompany(params)
                .then(() => {
                    message.success("Company update success");
                    setLoading(false);
                    getCompaniesData();
                })
                .catch(() => {
                    setLoading(false);
                    message.error("Company update failed");
                });
        } else {
            const params = {
                Person: selectedCompanyToUpdate.person,
                SelectedCompany: selectedCompanyToUpdate.companyData?.Company,
                CompanyPartyId: selectedCompany?.companyPartyId,
                UserPartyId: currentUser?.PartyId,
                IsReceiver: selectedCompanyToUpdate?.isReceiver,
            };

            params.Person.Phone = newUserPhone;

            updatePerson(params)
                .then(() => {
                    message.success("User update success");
                    setLoading(false);
                    getCompaniesData();
                })
                .catch(() => {
                    setLoading(false);
                    message.error("User update failed");
                });
        }

        setSelectedCompanyToUpdate({});
        toggelPhoneModal();
    };

    const onClickUsersTableCheckBox = (e, company, person) => {
        const newList = [...checkedCompaniesUsers];
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
        getCompanies("", selectedCompany?.companyPartyId)
            .then((result) => {
                const newCheckedCompaniesUsers = [];

                const companiesToShow = result?.Value?.filter((company) => {
                    let isPersonReciever = false;
                    const companyDataSet = {
                        CompanyPartyTId: company?.Company?.PartyTId,
                        PersonPartyTId: null,
                        Name: company?.Company?.Name,
                        Email: company?.Company?.Email,
                        IsReceiver: company?.IsReceiver,
                        BasketReceiverId: company?.BasketReceiverId || 0,
                    };
                    newCheckedCompaniesUsers.push(companyDataSet);

                    if (company?.Persons?.length > 0) {
                        company?.Persons.map((person) => {
                            const personDataSet = {
                                CompanyPartyTId: company?.Company?.PartyTId,
                                PersonPartyTId: person?.Value.PartyTId,
                                Name: person?.Value.Name,
                                Email: person?.Value.Email,
                                IsReceiver: person?.Key ? true : false,
                                BasketReceiverId: company?.BasketReceiverId || 0,
                            };
                            newCheckedCompaniesUsers.push(personDataSet);

                            if (person?.Key) isPersonReciever = true;
                        });
                    }

                    return isPersonReciever || company?.IsReceiver;
                });

                setCheckedCompaniesUsers(newCheckedCompaniesUsers);
                setCompaniesData(result?.Value);
                setDisplayCompanies(companiesToShow);
            })
            .finally(() => setLoading(false));
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
            setNewUserErrors((pre) => ({ ...pre, firstname: "Please enter name" }));
            validation = false;
        }
        if (!newUserData.lastname) {
            setNewUserErrors((pre) => ({ ...pre, lastname: "Please enter name" }));
            validation = false;
        }
        if (!newUserData.title) {
            setNewUserErrors((pre) => ({ ...pre, title: "Please select a title" }));
            validation = false;
        }
        if (!emailRegEx.test(newUserData.email) || !newUserData.email) {
            setNewUserErrors((pre) => ({ ...pre, email: "Invalid email adress" }));
            validation = false;
        }
        if (!phoneRegEx.test(newUserData.mobileNumb) || !newUserData.mobileNumb) {
            setNewUserErrors((pre) => ({ ...pre, mobileNumb: "Invalid mobile number" }));
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
                    message.success("User created");
                    getCompaniesData();
                })
                .catch(() => message.error("Create user failed please try again"));
        }
    };

    const expandedRowRender = (parentRow) => {
        const addNewMember = () => {
            return (
                <div className="recivers-user-footer user-input-box">
                    <div className="basket-new-user-input">
                        <Input
                            placeholder="Xxx"
                            value={newUserData.firstname}
                            onChange={(e) => onChangeNewUserData(e, "firstname")}
                            error={newUserErrors.firstname}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input
                            placeholder="Xxx"
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
                            placeholder="Xxx"
                            dataName="title"
                            error={newUserErrors.title}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input
                            placeholder="Xxx"
                            value={newUserData.email}
                            onChange={(e) => onChangeNewUserData(e, "email")}
                            error={newUserErrors.email}
                        />
                    </div>
                    <div className="basket-new-user-input">
                        <Input
                            placeholder="Xxx"
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
            setNewCompaniesErrors((pre) => ({ ...pre, name: "Please enter Name" }));
            validation = false;
        }
        if (!newCompaniesData.orgId) {
            setNewCompaniesErrors((pre) => ({ ...pre, orgId: "Please enter Organization Id" }));
            validation = false;
        }
        if (!newCompaniesData.country?.alpha2) {
            setNewCompaniesErrors((pre) => ({ ...pre, country: "Please select a country" }));
            validation = false;
        }
        if (!phoneRegEx.test(newCompaniesData.phone) || !newCompaniesData.phone) {
            setNewCompaniesErrors((pre) => ({ ...pre, phone: "Invalid phone number" }));
            validation = false;
        }
        if (!emailRegEx.test(newCompaniesData.email) || !newCompaniesData.email) {
            setNewCompaniesErrors((pre) => ({ ...pre, email: "Invalid email adress" }));
            validation = false;
        }

        return validation;
    };
    const onAddCompany = () => {
        if (validateCompanyFields()) {
            setLoading(true);
            getOrganization(newCompaniesData.orgId, newCompaniesData.country?.alpha2)
                .then((result) => {
                    if (result) {
                        addCompanyData();
                    } else {
                        setLoading(false);
                        message.error("Please enter a valid organization Id and relevant country");
                        setNewCompaniesErrors((pre) => ({ ...pre, orgId: "Please enter a valid Organization Id" }));
                    }
                })
                .catch(() => setLoading(false));
        }
    };

    const addCompanyData = () => {
        const params = {
            Company: {
                Name: newCompaniesData.name,
                CompanyId: newCompaniesData.orgId,
                CompanyTypeTId: 1, //organization
                CountryTId: newCompaniesData.country?.Id,
                CountryTCode: newCompaniesData.country?.alpha2,
                CountryTName: newCompaniesData.country?.Name,
                Email: newCompaniesData.email,
                Phone: newCompaniesData.phone,
                CreatedUserPartyId: currentUser?.PartyId,
            },
            SelectedCompanyPartyId: selectedCompany?.companyPartyId,
        };
        addCompany(params)
            .then(() => {
                message.success("Company created");
                setLoading(false);
                setNewCompaniesData({ orgId: "", name: "", country: null, email: "", phone: "" });
            })
            .catch(() => {
                message.error("Company creation failed");
                setLoading(false);
            });
    };

    const onUpdate = () => {
        //setLoading(true)
        const params = {
            EntityPartyId: selectedCompany?.companyPartyId,
            EntityName: selectedCompany?.name,
            UserPartyId: currentUser?.PartyId,
            BasketReceivers: checkedCompaniesUsers,
        };

        // updateAndSchedule(params).then(() => {
        //     getCompaniesData();
        // }).catch(() => setLoading(false))
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
                        placeholder="Xxx"
                        value={newCompaniesData.orgId}
                        onChange={(e) => onChangeNewOrgData(e, "orgId")}
                        error={newCompaniesErrors.orgId}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input
                        placeholder="Xxx"
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
                        placeholder="Xxx"
                        dataName="Name"
                        error={newCompaniesErrors.country}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input
                        placeholder="Xxx"
                        value={newCompaniesData.email}
                        onChange={(e) => onChangeNewOrgData(e, "email")}
                        error={newCompaniesErrors.email}
                    />
                </div>
                <div className="basket-new-company-input">
                    <Input
                        placeholder="Xxx"
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
                    {/* <Input placeholder="Search" value={searchCompaniesText} onChange={onChangesearchCompaniesText} endImage='icon-search-1' /> */}
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Search"
                        onChange={onSelectSearchCompany}
                        showArrow
                        style={{ width: "100%", overflow: "visible" }}
                        filterOption={onSearchCompanies}
                    >
                        {allCompaniesData?.map((company) => {
                            return (
                                <Select.Option key={company?.Company?.Id} value={JSON.stringify(company)}>
                                    {company?.Company.Name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </div>
                <button className="add-btn m-r-10 disable-div">Add New</button>
                <button className="add-btn m-r-10 disable-div">Upload</button>
            </div>

            <div className="receivers-tablele-width">
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
            <div className="action-bar">
                {disableUpdate ? (
                    <Tooltip title="Basket not configured">
                        <button className="primary-btn actions-btn" disabled={true}>
                            Update
                        </button>
                    </Tooltip>
                ) : (
                    <button className="primary-btn actions-btn" onClick={onUpdate}>
                        Update
                    </button>
                )}
            </div>
            <Modal title={"Add email address"} visible={emailModalVisible} onOk={onAddEmail} onCancel={toggelEmailModal}>
                <div className="user-input-box">
                    <Input value={newUserEmail} onChange={onChangeNewUserEmail} error={newUserFieldError} />
                </div>
            </Modal>
            <Modal title={"Add phone number"} visible={phoneModalVisible} onOk={onAddPhone} onCancel={toggelPhoneModal}>
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
    companyId: "",
    companyName: "",
};

const PersonsPage = ({ countryList, currentUser, selectedCompany, updateRecipients }) => {
    const [searchPersonsText, setSearchPersonsText] = useState("");
    const [personsData, setPersonsData] = useState();
    const [newPersonData, setnewPersonData] = useState(newPersonObject);
    const [loading, setLoading] = useState(true);
    const [checkedPersons, setCheckedPersons] = useState([]);

    useEffect(() => {
        if (selectedCompany?.companyPartyId) {
            getPersonsData();
        }
    }, [selectedCompany]);

    const personsTableHeaders = useMemo(() => {
        const headers = ReceversPersonsTableHeaders?.map((a) => {
            return { ...a, title: a.title };
        });
        headers.push({
            title: "",
            width: 60,
            dataIndex: ["IsReceiver", "Person"],
            render: (_, { Person }) => (
                <input
                    type="checkbox"
                    className="check-box"
                    checked={isPersonChecked(Person?.PartyTId)}
                    onChange={(e) => onClickPersonsTableCheckBox(e, Person)}
                />
            ),
        });

        return headers;
    }, [personsData, checkedPersons]);

    const PersonsExpandedHeaders = useMemo(() => {
        const headers = ReceversPersonsTableExpandedHeaders?.map((a) => {
            return { ...a, title: a.title };
        });
        headers.push({
            title: "",
            width: 60,
            dataIndex: ["IsReceiver", "Company"],
            render: (_, { Company }) => (
                <input
                    type="checkbox"
                    className="check-box"
                    checked={isCompanyChecked(Company?.PartyTId)}
                    onChange={(e) => onClickPersonsTableCompanyCheckBox(e, Company)}
                />
            ),
        });

        return headers;
    }, [personsData, checkedPersons]);

    const onClickPersonsTableCheckBox = (e, person) => {        
        const params = {
            EntityPartyId: selectedCompany?.companyPartyId,
            EntityName: selectedCompany?.name,
            UserPartyId: currentUser?.PartyId,
            BasketReceivers: [
                {
                    CompanyPartyTId: null,
                    PersonPartyTId: person?.PartyTId,
                    Name: person?.Name,
                    Email: person?.Email,
                    IsReceiver: e.target.checked,
                },
            ],
        };

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
        const params = {
            EntityPartyId: selectedCompany?.companyPartyId,
            EntityName: selectedCompany?.name,
            UserPartyId: currentUser?.PartyId,
            BasketReceivers: [
                {
                    CompanyPartyTId: company?.PartyTId,
                    PersonPartyTId: null,
                    Name: company?.Name,
                    Email: company?.Email,
                    IsReceiver: e.target.checked,
                },
            ],
        };

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

    const getPersonsData = () => {
        setLoading(true);
        getPersons(selectedCompany?.companyPartyId, null, searchPersonsText)
            .then((result) => {
                setPersonsData(result?.Value);
            })
            .finally(() => setLoading(false));
    };

    const onSearchPersons = () => {
        getPersonsData(0);
    };

    const onChangesearchPersonsText = (e) => {
        e.preventDefault();
        setSearchPersonsText(e.target.value);
    };

    const onChangeNewPersonData = (e, type) => {
        e.preventDefault();
        setnewPersonData((pre) => ({ ...pre, [type]: e.target.value }));
    };

    const onChangeNewUserTitle = (e) => {
        e.preventDefault();
        setnewPersonData((pre) => ({ ...pre, title: JSON.parse(e.target.value) }));
    };

    const onChangeNewPersonCountry = (e) => {
        e.preventDefault();
        setnewPersonData((pre) => ({ ...pre, country: JSON.parse(e.target.value) }));
    };

    const validateFields = () => {
        let validation = true;
        if (!newPersonData.firstName || !newPersonData.lastName) {
            message.error("Name cannot be empty");
            validation = false;
        }
        if (!newPersonData.email) {
            message.error("Email cannot be empty");
            validation = false;
        } else if (!emailRegEx.test(newPersonData.email)) {
            message.error("Invalid email adress");
            validation = false;
        }
        if (!newPersonData.mobileNumb) {
            message.error("Mobile number cannot be empty");
            validation = false;
        }

        return validation;
    };

    const onAddNewPerson = () => {
        if (validateFields()) {
            setLoading(true);
            const params = {
                Person: {
                    Name: newPersonData.firstName + " " + newPersonData.lastName,
                    TitleTId: newPersonData.title?.id,
                    TitleTName: newPersonData.title?.title,
                    FirstName: newPersonData.firstName,
                    MiddleName: null,
                    LastName: newPersonData.lastName,
                    CountryTId: newPersonData.country?.Id,
                    CountryTName: newPersonData.country?.Name,
                    Email: newPersonData.email,
                    Phone: newPersonData.mobileNumb,
                },
                SelectedCompany: null,
                CompanyPartyId: selectedCompany?.companyPartyId,
            };

            addPerson(params)
                .then(() => {
                    setnewPersonData(newPersonObject);
                    message.success("Person created");

                    getPersonsData(0);
                })
                .catch(() => message.error("Create user failed please try again"));
        }
    };

    const addNewPerson = () => {
        return (
            <div className="recivers-user-footer user-input-box" style={{ marginLeft: 165 }}>
                <div style={{ width: 150 }}>
                    <Input
                        placeholder="First name"
                        value={newPersonData.firstName}
                        onChange={(e) => onChangeNewPersonData(e, "firstName")}
                    />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Last name" value={newPersonData.lastName} onChange={(e) => onChangeNewPersonData(e, "lastName")} />
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
                    <Input placeholder="Xxx" value={newPersonData.email} onChange={(e) => onChangeNewPersonData(e, "email")} />
                </div>
                <div style={{ width: 150 }}>
                    <Input placeholder="Xxx" value={newPersonData.mobileNumb} onChange={(e) => onChangeNewPersonData(e, "mobileNumb")} />
                </div>
                <div style={{ width: 20 }}>
                    <i className="icon-plus-circled blue basket-table-icon hover-hand" onClick={onAddNewPerson} />
                </div>
            </div>
        );
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
                <div className="companies-search-input-containers user-input-box">
                    <Input placeholder="Search" value={searchPersonsText} onChange={onChangesearchPersonsText} endImage="icon-search-1" />
                </div>
                <button className="add-btn m-r-10" onClick={onSearchPersons}>
                    Filters
                </button>
                <button className="add-btn m-r-10 disable-div">Add New</button>
                <button className="add-btn m-r-10 disable-div">Upload</button>
            </div>

            <div className="receivers-tablele-width">
                <Table
                    rowKey={(record, index) => index}
                    dataSource={personsData}
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
        </>
    );
};

export default CompaniesAndPersonsNoBasket;
