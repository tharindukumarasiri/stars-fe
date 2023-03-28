import React, { useState, useMemo, useContext, useEffect } from "react";
import { Table, Modal, Switch, Dropdown, Menu, message, Pagination } from 'antd';

import { TabContext, UserContext } from "../../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../../utils/enums";
import { usersTableHeaders } from '../../../utils/tableHeaders'
import StarDropdown from "../../../common/dropdown";
import Input from '../../../common/input'
import { addUser, updateUser, activateUsers, deActivateUsers } from "../../../services/userService";
import { getMessageTemplatesNewUserInvitation } from "../../../services/templateService";
import { getCommunicationEntitiesWithRoles } from "../../../services/communicationService";
import { emailRegEx } from "../../../utils/constants";

const newUserDataObj = { firstName: '', lastName: '', telephone: '', email: '', role: '', sendInvitation: false, template: null }

const AllUsers = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    // const [searchClientsText, setSearchClientsText] = useState('');//TO be enabled in the future
    const [newUserFirstPage, setNewUserFirstPage] = useState(true);
    const [newUserData, setNewUserData] = useState(newUserDataObj);
    const [newUserErrors, setNewUserErrors] = useState(newUserDataObj);
    const [newCreatedUserData, setNewCreatedUserData] = useState()
    const [existingClients, setExistingClients] = useState([]);
    const [selecteduserRoles, setSelecteduserRoles] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const { changeActiveTab } = useContext(TabContext);
    const { getUsersData, users, totalResults, pageNumber, setPageNumber,
        usersLoading, searchText, setSearchText, selectedCompany, currentUser, savedTemplates, setSavedTemplates } = useContext(UserContext);

    useEffect(() => {
        getCommunicationEntitiesWithRoles().then(result => {
            setExistingClients(result)
        })
    }, []);

    useEffect(() => {
        setLoading(usersLoading)
    }, [usersLoading]);

    useEffect(() => {
        if (selectedCompany?.companyPartyId && users.length === 0) {
            getMessageTemplatesNewUserInvitation(selectedCompany?.companyPartyId).then(result => {
                setSavedTemplates(result);
            })
            getUsersData();
        }
    }, [selectedCompany])

    const onChangePage = (page) => {
        const pageNumb = page - 1
        setPageNumber(pageNumb)
        getUsersData(pageNumb);
    }

    const onActivate = () => {
        setLoading(true);
        activateUsers(selectedUsers).then(() => {
            message.success("Users activated")
            getUsersData();
        }).catch(() => {
            message.error("Users activaion failed")
            setLoading(false)
        })
    }

    const onDeActivate = () => {
        setLoading(true);
        const userLisyPayload = [currentUser?.PartyId].concat(selectedUsers)

        deActivateUsers(userLisyPayload).then(() => {
            message.success("Users deactivated")
            getUsersData();
        }).catch(() => {
            message.error("Users deactivaion failed")
            setLoading(false)
        })
    }

    const onSendMessage = () => {
        props.changeActiveTab(NAVIGATION_PAGES.NEW_COMMUNICATION);
    }

    const actions = (
        <Menu>
            <Menu.Item disabled>Send Invitation</Menu.Item>
            <Menu.Item onClick={onSendMessage}>Send Message</Menu.Item>
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
        if (props.setSelectedUsers) {
            let selected = users.filter(i => newUsers.includes(i.UserId));
            props.setSelectedUsers(selected);
            props.setShowOnlyDefaultRecievers(true);
        }
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

    // const filterdClients = useMemo(() => { //TO be enabled in the future
    //     if (searchClientsText) {
    //         const filterdList = existingClients?.filter(client => client?.Name.toLocaleLowerCase().includes(searchClientsText.toLocaleLowerCase()));
    //         return filterdList
    //     } else return []
    // }, [searchClientsText])

    const onSearch = () => {
        setPageNumber(0);
        getUsersData(0);
    }

    const toggleModal = () => {
        setModalVisible(pre => !pre)
        setNewUserFirstPage(true);
        // setSearchClientsText('');//TO be enabled in the future
        setNewUserData(newUserDataObj)
        setNewUserErrors(newUserDataObj)
    }

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    // const onChangeSearchClientsText = (e) => { //TO be enabled in the future
    //     e.preventDefault();
    //     setSearchClientsText(e.target.value)
    // }

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

    // const onChangeRole = (roles, client) => { //TO be enabled in the future
    //     const newRoles = []

    //     selecteduserRoles.forEach((item) => {
    //         if (item?.EntityPartyId !== client?.CompanyPartyId) {
    //             newRoles.push(item);
    //         }
    //     })

    //     if (roles?.length > 0) {
    //         const newAdditions = [];
    //         roles.forEach((role) => {
    //             const params = {
    //                 "EntityPartyId": client?.CompanyPartyId,
    //                 "UserPartyId": currentUser?.PartyId,
    //                 "UserId": currentUser?.Id,
    //                 "RoleId": role?.value,
    //                 "RoleName": role?.label,
    //                 "IsActive": !newUserData?.sendInvitation
    //             }
    //             newAdditions.push(params)
    //         });
    //         newRoles.push(...newAdditions)
    //     }
    //     setSelecteduserRoles(newRoles);
    // }

    // const onRoleCheckBoxClick = (e) => { //TO be enabled in the future
    //     const value = JSON.parse(e.target.value);
    //     let newRoles = [...selecteduserRoles]

    //     const firstIndex = selecteduserRoles.findIndex(role => {
    //         return (
    //             role?.EntityPartyId === value?.CompanyPartyId
    //         )
    //     });

    //     if (firstIndex < 0) {
    //         const role = {
    //             "EntityPartyId": value?.CompanyPartyId,
    //             "UserPartyId": currentUser?.PartyId,
    //             "UserId": currentUser?.Id,
    //             "RoleId": 1,
    //             "IsActive": !newUserData?.sendInvitation
    //         }
    //         newRoles.push(role)
    //     } else {
    //         const tempRoles = []
    //         selecteduserRoles.forEach((item) => {
    //             if (item?.EntityPartyId !== value?.CompanyPartyId) {
    //                 tempRoles.push(item);
    //             }
    //         })

    //         newRoles = tempRoles;
    //     }

    //     setSelecteduserRoles(newRoles);
    // }

    const onSelectRole = (e, role) => {
        const newSelectedRoles = JSON.parse(JSON.stringify(selecteduserRoles))
        if (e.target.checked) {
            const params = {
                "EntityPartyId": selectedCompany?.companyPartyId,
                "UserPartyId": currentUser?.PartyId,
                "UserId": currentUser?.Id,
                "RoleId": role?.Key,
                "RoleName": role?.Value,
                "IsActive": !newUserData?.sendInvitation
            }
            newSelectedRoles.push(params)
        } else {
            const index = selecteduserRoles.findIndex(selctRole => {
                return (
                    selctRole?.RoleId === role?.Key
                )
            })
            newSelectedRoles.splice(index, 1);
        }

        setSelecteduserRoles(newSelectedRoles)
    }

    const getCurrentCompanyRoles = () => {
        const roles = existingClients?.find(client => client?.CompanyPartyId === selectedCompany?.companyPartyId)

        return roles?.Roles.map(role => {
            return (
                <div className="role-select-row blue">
                    {role?.Value?.toUpperCase() === 'USER' ?
                        <span className="check-box-placeholder-hidden"></span> :
                        <input type="checkbox" className="check-box"
                            checked={selecteduserRoles.findIndex(selctRole => {
                                return (
                                    selctRole?.RoleId === role?.Key
                                )
                            }) > -1}
                            onChange={(e) => onSelectRole(e, role)} />
                    }
                    {role?.Value}
                </div>
            )
        })
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
        if (newUserData.sendInvitation && !newUserData?.template) {
            setNewUserErrors(pre => ({ ...pre, sendInvitation: 'Please select a template' }))
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
                    Key: selectedCompany?.companyPartyId,
                    Value: {
                        "Email": newUserData.email,
                        "UserName": newUserData.email,
                        "FirstName": newUserData.firstName,
                        "LastName": newUserData.lastName,
                        "PhoneNumber": newUserData.telephone,
                        "CreatedUserPartyId": currentUser?.PartyId,
                        "CountryId": currentUser?.CountryId,
                        "CountryCode": currentUser?.CountryCode,
                    }
                }

                addUser(params).then((user) => {
                    setNewCreatedUserData(user);
                    setNewUserFirstPage(false);
                    setLoading(false);
                }).catch(() => message.error('Create user failed please try again'))
            }
        } else {
            setLoading(true)
            const userRoles = existingClients?.find(client => client?.CompanyPartyId === selectedCompany?.companyPartyId)
            const userRole = userRoles?.Roles?.find(role => role?.Value?.toUpperCase() === 'USER')
            const newSelectedRoles = JSON.parse(JSON.stringify(selecteduserRoles))
            const userRoleData = {
                "EntityPartyId": selectedCompany?.companyPartyId,
                "UserPartyId": currentUser?.PartyId,
                "UserId": currentUser?.Id,
                "RoleId": userRole?.Key,
                "RoleName": userRole?.Value,
                "IsActive": !newUserData?.sendInvitation
            }
            newSelectedRoles.push(userRoleData)

            const params = {
                "UserId": newCreatedUserData?.Id,
                "FirstName": newCreatedUserData?.FirstName,
                "LastName": newCreatedUserData?.LastName,
                "Email": newCreatedUserData?.Email,
                "CountryId": newCreatedUserData?.CountryId,
                "PictureFileId": '',
                "LoggedInUserPartyId": currentUser?.PartyId,
                "UserRoles": newSelectedRoles,
                "IsSendEmail": newUserData.sendInvitation,
                "IsActive": false,
                "UserPartyId": newUserData?.PartyId,
                "MessageTemplateId": newUserData?.template?.Id
            }

            updateUser(params).then(() => {
                setLoading(false);
                message.success('New user created')
                getUsersData(0);
                setPageNumber(0);
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
            <div className="action-bar">
                <div className="flex-center-middle m-t-20">
                    <Pagination size="small" current={pageNumber + 1} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
                </div>
                <Dropdown
                    overlay={actions} placement="topRight" arrow
                >
                    <button className="primary-btn actions-btn" >Action</button>
                </Dropdown>
            </div>

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
                                    <Input placeholder="Country" value={currentUser?.CountryCode || ''} onChange={() => { }} disabled />
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
                                            dataName="DisplayName"
                                            error={newUserErrors?.sendInvitation || ''}
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
                            <div className="search-res-conatainer">
                                {getCurrentCompanyRoles()}
                            </div>
                            {/* <div className="top-container m-t-20" style={{ height: 40 }}> //TO be enabled in the future
                                <div className="search-input-container" >
                                    <Input placeholder="Search Existing Client/s" value={searchClientsText} onChange={onChangeSearchClientsText} endImage='icon-search-1' />
                                </div>
                                <button className="add-btn" >Filters</button>
                            </div>

                            <div className="search-res-conatainer">
                                {filterdClients?.map(client => {
                                    return (
                                        <div className="g-row search-item" key={client?.Id}>
                                            <div className="g-col-6  m-r-10 blue ">
                                                {client?.Name}
                                            </div>
                                            <div className="g-col-4">
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
                                            <div className="g-col-2 text-right">
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
                            </div> */}
                        </div>
                    }
                    <div className="n-float" />
                </div>
            </Modal>
        </div>
    )
}

export default AllUsers;