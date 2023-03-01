import React, { useState, useMemo, useContext, useEffect } from "react";
import { Table, Modal, Switch, Dropdown, Menu, message, Select, Pagination } from 'antd';

import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { usersTableHeaders } from '../../utils/tableHeaders'
import StarDropdown from "../../common/dropdown";
import Input from '../../common/input'
import { getAllUsers, addUser, updateUser, activateUsers, deActivateUsers } from "../../services/userService";
import { getTenantMessageTemplates } from "../../services/templateService";
import { getCommunicationEntitiesWithRoles } from "../../services/communicationService";
import { FetchCurrentCompany, FetchCurrentUser } from "../../hooks/index"
import { emailRegEx } from "../../utils/constants";

const newUserDataObj = { firstName: '', lastName: '', telephone: '', email: '', role: '',  sendInvitation: false, template: null }

const AllUsers = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchClientsText, setSearchClientsText] = useState('');
    const [newUserFirstPage, setNewUserFirstPage] = useState(true);
    const [newUserData, setNewUserData] = useState(newUserDataObj);
    const [newUserErrors, setNewUserErrors] = useState(newUserDataObj);
    const [newCreatedUserData, setNewCreatedUserData] = useState()
    const [savedTemplates, setSavedTemplates] = useState([]);
    const [existingClients, setExistingClients] = useState([]);
    const [selecteduserRoles, setSelecteduserRoles] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const [selectedCompany] = FetchCurrentCompany();
    const [currentUser] = FetchCurrentUser();

    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        getAllUsers().then(result => {
            setLoading(false)
            setUsers(result?.Value)
            setTotalResults(result?.Key)
        }).catch(() => setLoading(false))
        getCommunicationEntitiesWithRoles().then(result => {
            setExistingClients(result)
        })
    }, []);

    useEffect(() => {
        if (selectedCompany?.tenantId && savedTemplates.length === 0) {
            getTenantMessageTemplates(selectedCompany?.tenantId).then(result => {
                setSavedTemplates(result.Value);
            })
        }
    }, [selectedCompany])

    const onChangePage = (page) => {
        const pageNumb = page - 1
        setLoading(true);
        getAllUsers(searchText, pageNumb).then(result => {
            setLoading(false)
            setPageNumber(pageNumb)
            setUsers(result?.Value)
            setTotalResults(result?.Key)
        }).catch(() => setLoading(false))
    }

    const onActivate = () => {
        setLoading(true);
        activateUsers(selectedUsers).then(() => {
            getAllUsers(searchText, pageNumber).then(result => {
                message.success("Users activated")
                setLoading(false)
                setUsers(result?.Value)
                setTotalResults(result?.Key)
            }).catch(() => setLoading(false))
        }).catch(() => {
            message.error("Users activaion failed")
            setLoading(false)
        })
    }

    const onDeActivate = () => {
        setLoading(true);
        const userLisyPayload = [currentUser?.PartyId].concat(selectedUsers)

        deActivateUsers(userLisyPayload).then(() => {
            getAllUsers(searchText, pageNumber).then(result => {
                message.success("Users deactivated")
                setLoading(false)
                setUsers(result?.Value)
                setTotalResults(result?.Key)
            }).catch(() => setLoading(false))
        }).catch(() => {
            message.error("Users deactivaion failed")
            setLoading(false)
        })
    }

    const actions = (
        <Menu>
            <Menu.Item>Send Invitation</Menu.Item>
            <Menu.Item>Send Messege</Menu.Item>
            <Menu.Item onClick={onActivate}>Mark Active</Menu.Item>
            <Menu.Item onClick={onDeActivate}>Mark Inactive</Menu.Item>
        </Menu>
    );

    const onClickTableCheckBox = (e) => {
        e.stopPropagation()
        const value = JSON.parse(e.target.value);
        const index = selectedUsers.indexOf(value?.UserId);
        const newUsers = [...selectedUsers];

        if (index < 0) {
            newUsers.push(value?.UserId);
        } else {
            newUsers.splice(index, 1);
        }

        setSelectedUsers(newUsers);
    }

    const tableHeaders = useMemo(() => {
        const headers = usersTableHeaders?.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: '',
            fixed: 'right',
            width: 60,
            render: (_, record) => (
                <input type="checkbox" className="check-box" value={JSON.stringify(record)} onClick={onClickTableCheckBox} />
            )
        })

        return headers

    }, [users, selectedUsers])

    const filterdClients = useMemo(() => {
        if (searchClientsText) {
            const filterdList = existingClients?.filter(client => client?.Name.toLocaleLowerCase().includes(searchClientsText.toLocaleLowerCase()));
            return filterdList
        } else return []
    }, [searchClientsText])

    const onSearch = () => {
        setLoading(true)
        getAllUsers(searchText).then(result => {
            setLoading(false)
            setUsers(result?.Value)
            setTotalResults(result?.Key)
            setPageNumber(0);
        }).catch(() => setLoading(false))
    }

    const toggleModal = () => {
        setModalVisible(pre => !pre)
        setNewUserFirstPage(true);
        setSearchClientsText('');
        setNewUserData(newUserDataObj)
        setNewUserErrors(newUserDataObj)
    }

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    const onChangeSearchClientsText = (e) => {
        e.preventDefault();
        setSearchClientsText(e.target.value)
    }

    const onChangeNewUserField = (e, fieldName) => {
        e.preventDefault();
        setNewUserErrors(pre => ({ ...pre, [fieldName]: '' }))
        setNewUserData({ ...newUserData, [fieldName]: e.target.value })
    }

    const onChangeTelephoneNum = (e) => {
        e.preventDefault();
        setNewUserErrors(pre => ({ ...pre, telephone: '' }))
        const result = e.target.value.replace(/[^-+()0-9]/gi, '');
        setNewUserData({ ...newUserData, telephone: result })
    }

    const onChangeRole = (roles, client) => {
        const newRoles = []

        selecteduserRoles.forEach((item) => {
            if (item?.EntityPartyId !== client?.CompanyPartyId) {
                newRoles.push(item);
            }
        })

        if (roles?.length > 0) {
            const newAdditions = [];
            roles.forEach((role) => {
                const params = {
                    "EntityPartyId": client?.CompanyPartyId,
                    "UserPartyId": currentUser?.PartyId,
                    "UserId": currentUser?.Id,
                    "RoleId": role?.value,
                    "RoleName": role?.label,
                    "IsActive": true
                }
                newAdditions.push(params)
            });
            newRoles.push(...newAdditions)
        }
        setSelecteduserRoles(newRoles);
    }

    const onRoleCheckBoxClick = (e) => {
        const value = JSON.parse(e.target.value);
        let newRoles = [...selecteduserRoles]

        const firstIndex = selecteduserRoles.findIndex(role => {
            return (
                role?.EntityPartyId === value?.CompanyPartyId
            )
        });

        if (firstIndex < 0) {
            const role = {
                "EntityPartyId": value?.CompanyPartyId,
                "UserPartyId": currentUser?.PartyId,
                "UserId": currentUser?.Id,
                "RoleId": 1,
                "IsActive": true
            }
            newRoles.push(role)
        } else {
            const tempRoles = []
            selecteduserRoles.forEach((item) => {
                if (item?.EntityPartyId !== value?.CompanyPartyId) {
                    tempRoles.push(item);
                }
            })

            newRoles = tempRoles;
        }

        setSelecteduserRoles(newRoles);
    }

    const onToggle = (val) => {
        setNewUserData({ ...newUserData, sendInvitation: val })
    }

    const onChangeTemplate = (e) => {
        setNewUserData({ ...newUserData, template: JSON.parse(e.target.value) })
    }

    const validateFields = () => {
        let validation = true
        if (!newUserData.firstName) {
            setNewUserErrors(pre => ({ ...pre, firstName: 'First name cannot be empty' }))
            validation = false
        }
        if (!newUserData.lastName) {
            setNewUserErrors(pre => ({ ...pre, lastName: 'Last name cannot be empty' }))
            validation = false
        }
        if (!newUserData.telephone) {
            setNewUserErrors(pre => ({ ...pre, telephone: 'Telephone cannot be empty' }))
            validation = false
        }
        if (!newUserData.email) {
            setNewUserErrors(pre => ({ ...pre, email: 'Email cannot be empty' }))
            validation = false
        } else if (!emailRegEx.test(newUserData.email)) {
            setNewUserErrors(pre => ({ ...pre, email: 'Invalid email adress' }))
            validation = false
        }

        return validation;
    }

    const onOk = () => {
        setNewUserErrors(newUserDataObj);
        if (newUserFirstPage) {
            if (validateFields()) {
                setLoading(true);
                const params = {
                    "Email": newUserData.email,
                    "UserName": newUserData.email,
                    "FirstName": newUserData.firstName,
                    "LastName": newUserData.lastName,
                    "PhoneNumber": newUserData.telephone,
                    "CreatedUserPartyId": currentUser?.PartyId,
                    "CountryId": currentUser?.CountryId,
                    "CountryCode": currentUser?.CountryCode,
                }

                addUser(params).then((user) => {
                    setNewCreatedUserData(user);
                    setNewUserFirstPage(false);

                    getAllUsers().then(result => {
                        setLoading(false);
                        setUsers(result?.Value)
                        setTotalResults(result?.Key)
                        setPageNumber(0)
                    }).catch(() => setLoading(false))
                }).catch(() => message.error('Create user failed please try again'))
            }
        } else {
            setLoading(true)
            const params = {
                "UserId": newCreatedUserData?.Id,
                "FirstName": newCreatedUserData?.FirstName,
                "LastName": newCreatedUserData?.LastName,
                "Email": newCreatedUserData?.Email,
                "CountryId": newCreatedUserData?.CountryId,
                "PictureFileId": '',
                "LoggedInUserPartyId": currentUser?.PartyId,
                "UserRoles": selecteduserRoles,
                "IsSendEmail": newUserData.sendInvitation
            }

            updateUser(params).then(() => {
                setLoading(false);
                message.success('New user created')
            }).catch(() => {
                setLoading(false);
            })

            setModalVisible(false);
            setNewUserFirstPage(true);
            setSelecteduserRoles([])
        }
    }

    const onClickUserRow = (params) => {
        changeActiveTab(NAVIGATION_PAGES.ALL_USER_DETAILS, params)
    }

    return (
        <div className={loading ? 'page-container loading-overlay' : 'page-container'}>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="top-container">
                <button className="add-btn m-r-20" onClick={toggleModal} ><i className="icon-plus-circled m-r-10" />Add New User</button>
                <div className="search-input-container" >
                    <Input placeholder="Search By Name or Org. Name" value={searchText} onChange={onChangeSearchText} endImage='icon-search-1' />
                </div>
                <button className="add-btn" onClick={onSearch} >Filters</button>
            </div>
            <div className="tablele-width">
                <Table
                    rowKey={(record) => record?.UserId}
                    dataSource={users}
                    scroll={{
                        y: '60vh',
                    }}
                    columns={tableHeaders}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => onClickUserRow(record),
                        };
                    }}
                    pagination={false}
                />
            </div>
            <div className="flex-center-middle m-t-20">
                <Pagination size="small" current={pageNumber + 1} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
            </div>
            <Dropdown
                overlay={actions} placement="topRight" arrow
            >
                <button className="primary-btn actions-btn" >Action</button>
            </Dropdown>

            <Modal title={"Create New User"}
                visible={modalVisible}
                onCancel={toggleModal}
                okText={newUserFirstPage ? 'Next' : 'Done'}
                onOk={onOk}
                centered={true} >
                <div className="user-input-box" >
                    <div className="g-row flex-center-middle">
                        <div className={newUserFirstPage ? "g-col-5 text-center blue" : "g-col-5 text-center"}>User Info</div>
                        <i className="icon-circle-arrow-r2 g-col-2 text-center blue arrow-icon-lg" />
                        <div className={newUserFirstPage ? "g-col-5 text-center" : "g-col-5 text-center blue"}>Client  Info</div>
                    </div>
                    {newUserFirstPage ?
                        <div>
                            <div className="g-row m-t-20">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <Input placeholder="First Name" value={newUserData.firstName}
                                        onChange={(e) => onChangeNewUserField(e, 'firstName')}
                                        error={newUserErrors.firstName} />
                                </div>
                                <div className="g-col-5 m-l-20">
                                    <Input placeholder="Telephone" value={newUserData.telephone}
                                        onChange={onChangeTelephoneNum} error={newUserErrors.telephone} />
                                </div>
                            </div>
                            <div className="g-row m-t-5">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <Input placeholder="Last Name" value={newUserData.lastName}
                                        onChange={(e) => onChangeNewUserField(e, 'lastName')} error={newUserErrors.lastName} />
                                </div>
                                <div className="g-col-5 m-l-20">
                                    <Input placeholder="Email" value={newUserData.email}
                                        onChange={(e) => onChangeNewUserField(e, 'email')} error={newUserErrors.email} />
                                </div>
                            </div>
                            <div className="g-row m-t-5">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <Input placeholder="Country" value={currentUser?.CountryCode || undefined} disabled />
                                </div>
                                <div className="g-col-5 m-l-20">
                                </div>
                            </div>
                            <div className="n-float" />
                            <div className="flex-align-center m-t-20 toggle-container">
                                <div className="m-t-10 m-b-10">Send Invitation?</div>
                                <div className="toggle-btn">
                                    <Switch checkedChildren="Yes" unCheckedChildren="No" checked={newUserData.sendInvitation} onChange={onToggle} />
                                </div>
                                {newUserData.sendInvitation &&
                                    <div className="g-col-5 m-t-20">
                                        <StarDropdown
                                            values={savedTemplates}
                                            onChange={onChangeTemplate}
                                            selected={JSON.stringify(newUserData?.template || undefined)}
                                            placeholder="Select Template"
                                            dataName="Name"
                                        />
                                    </div>
                                }
                            </div>
                        </div> :
                        <div className={loading ? 'loading-overlay' : ''} >
                            <div className="n-float" />
                            {loading &&
                                <div className="loading center-loading">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            }
                            <div className="top-container m-t-20" style={{ height: 40 }}>
                                <div className="search-input-container" >
                                    <Input placeholder="Search Existing Client/s" value={searchClientsText} onChange={onChangeSearchClientsText} endImage='icon-search-1' />
                                </div>
                                <button className="add-btn" >Filters</button>
                            </div>

                            <div className="search-res-conatainer">
                                {filterdClients?.map(client => {
                                    return (
                                        <div className="g-row m-t-20 search-item" key={client?.Id}>
                                            <div className="g-col-4 m-l-20 m-r-20 blue flex-center-middle">
                                                {client?.Name}
                                            </div>
                                            <div className="g-col-4 m-l-20">
                                                <Select
                                                    labelInValue
                                                    mode="multiple"
                                                    allowClear
                                                    placeholder="Select Role"
                                                    onChange={(e) => onChangeRole(e, client)}
                                                    options={client?.Roles}
                                                    fieldNames={{ label: "Value", value: "Key", partyId: "CompanyPartyId" }}
                                                    showArrow
                                                    style={{ width: 166 }}
                                                />
                                            </div>
                                            <div className="g-col-1 m-l-20">
                                                <input type="checkbox" className="check-box"
                                                    value={JSON.stringify(client)}
                                                    checked={selecteduserRoles.findIndex(role => {
                                                        return (
                                                            role?.EntityPartyId === client?.CompanyPartyId
                                                        )
                                                    }) > -1}
                                                    onChange={onRoleCheckBoxClick} />
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    }
                    <div className="n-float" />
                </div>
            </Modal>
        </div>
    )
}

export default AllUsers;