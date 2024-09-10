import React, { useState, useMemo, useContext, useEffect } from "react";
import { Table, Modal, Dropdown, Menu, message, Pagination } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

import { TabContext, UserContext } from "../../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../../utils/enums";
import { usersTableHeaders } from '../../../utils/tableHeaders'
import StarDropdown from "../../../common/dropdown";
import Input from '../../../common/input'
import { addUser, updateUser, activateUsers, deActivateUsers, deleteUser } from "../../../services/userService";
import { getMessageTemplatesNewUserInvitation } from "../../../services/templateService";
import { getCommunicationEntitiesWithRoles } from "../../../services/communicationService";
import { emailRegEx } from "../../../utils/constants";

const { confirm } = Modal;

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
    const { t } = useTranslation();

    const { changeActiveTab } = useContext(TabContext);
    const { getUsersData, users, totalResults, pageNumber, setPageNumber,
        usersLoading, searchText, setSearchText, selectedCompany, currentUser, savedTemplates, setSavedTemplates } = useContext(UserContext);

    useEffect(() => {
        setLoading(usersLoading)
    }, [usersLoading]);

    useEffect(() => {
        if (selectedCompany?.companyPartyId && users.length === 0) {
            getMessageTemplatesNewUserInvitation(selectedCompany?.companyPartyId).then(result => {
                setSavedTemplates(result);
            })
            getCommunicationEntitiesWithRoles(selectedCompany?.companyPartyId).then(result => {
                setExistingClients(result)
            })
            getUsersData();
        }
    }, [selectedCompany])

    const isUserAdmin = useMemo(() => {
        return (currentUser?.roles?.findIndex(role => role?.Name === 'Super Administrator') === -1)
    }, [currentUser])

    const onChangePage = (pageNum) => {
        setPageNumber(pageNum)
        getUsersData(pageNum);
    }

    const onActivate = () => {
        setLoading(true);
        const userListPayload = [selectedCompany?.companyPartyId].concat(selectedUsers)

        activateUsers(userListPayload).then(() => {
            message.success(t('MSG_USERS_ACTIVATED'));
            getUsersData();
        }).catch(() => {
            message.error(t('MSG_USERS_ACTIVATE_FAIL'))
            setLoading(false)
        })
    }

    const onDeActivate = () => {
        setLoading(true);
        const userLisyPayload = [selectedCompany?.companyPartyId].concat(selectedUsers)

        deActivateUsers(userLisyPayload).then(() => {
            message.success(t('MSG_USERS_DEACTIVATE_SUCESS'))
            getUsersData();
        }).catch(() => {
            message.error(t('MSG_USERS_DEACTIVATE_FAIL'))
            setLoading(false)
        })
    }

    const onSendMessage = () => {
        changeActiveTab(NAVIGATION_PAGES.NEW_COMMUNICATION);
    }

    const onDeleteUser = () => {
        confirm({
            title: (
                <>
                    {t("ARE_YOU_SURE")} <strong className="red">{t("DELETE")}</strong>{" "}
                    {t("USERS_SINGLE")}
                </>
            ),
            icon: <ExclamationCircleOutlined />,
            okText: t("YES"),
            okType: "danger",
            cancelText: t("NO"),
            onOk() {
                setLoading(true);
                const userLisyPayload = [selectedCompany?.companyPartyId, currentUser?.Id].concat(selectedUsers)

                deleteUser(userLisyPayload).then(() => {
                    message.success(t('DELETE_SUCCESSFUL'))
                    getUsersData();
                    setSelectedUsers([]);
                }).catch(() => {
                    message.error(t('DELETE_FAILED'))
                    setLoading(false)
                })
            },
        });
    }

    const actions = (
        <Menu>
            <Menu.Item disabled key={1}>{t('SEND_INVITATION')}</Menu.Item>
            <Menu.Item onClick={onSendMessage} key={2}>{t('SEND_MESSAGE')}</Menu.Item>
            <Menu.Item onClick={onActivate} hidden={isUserAdmin} key={3}>{t('MARK_ACTIVE')}</Menu.Item>
            <Menu.Item onClick={onDeActivate} hidden={isUserAdmin} key={4}>{t('MARK_INACTIVE')}</Menu.Item>
            <Menu.Item onClick={onDeleteUser} hidden={isUserAdmin} key={5}>{t('DELETE')}</Menu.Item>
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
        const headers = usersTableHeaders(t);
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
        setPageNumber(1);
        getUsersData(1);
    }

    const toggleModal = () => {
        setModalVisible(pre => !pre)
        setNewUserFirstPage(true);
        // setSearchClientsText('');//TO be enabled in the future
        setNewUserErrors(newUserDataObj)
        setNewUserData({ ...newUserDataObj, template: savedTemplates[0] })
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
        if (result?.length < 15) {
            setNewUserData({ ...newUserData, telephone: result })
        }
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
    //                 "UserId": currentUser?.Id,
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
    //             "UserId": currentUser?.Id,
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
                "UserId": currentUser?.Id,
                "UserId": currentUser?.Id,
                "RoleId": role?.Key,
                "RoleName": role?.Value,
                "IsActive": false
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
                        <input type="checkbox" className="check-box" checked={true} disabled onChange={() => { }} /> :
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

    // const onToggle = (val) => {
    //     setNewUserData({ ...newUserData, sendInvitation: val })
    // }

    const onChangeTemplate = (e) => {
        setNewUserData({ ...newUserData, template: JSON.parse(e.target.value) })
    }

    const validateFields = () => {
        let validation = true
        if (!newUserData.firstName) {
            setNewUserErrors(pre => ({ ...pre, firstName: t('FIRST_NAME_CANNOT_BE_EMPTY') }))
            validation = false
        }
        if (!newUserData.lastName) {
            setNewUserErrors(pre => ({ ...pre, lastName: t('LAST_NAME_CANNOT_BE_EMPTY') }))
            validation = false
        }
        if (!newUserData.telephone) {
            setNewUserErrors(pre => ({ ...pre, telephone: t('TELEPHONE_CANNOT_BE_EMPTY') }))
            validation = false
        }
        if (!newUserData.email) {
            setNewUserErrors(pre => ({ ...pre, email: t('EMAIL_CANNOT_BE_EMPTY') }))
            validation = false
        } else if (!emailRegEx.test(newUserData.email)) {
            setNewUserErrors(pre => ({ ...pre, email: t('INVALID_EMAIL') }))
            validation = false
        }
        // if (newUserData.sendInvitation && !newUserData?.template) {
        //     setNewUserErrors(pre => ({ ...pre, sendInvitation: t('EMPTY_TEMPLATE') }))
        //     validation = false
        // }

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
                        "CreatedUserId": currentUser?.Id,
                        "CountryId": currentUser?.CountryId,
                        "CountryCode": currentUser?.CountryCode,
                    }
                }

                addUser(params).then((user) => {
                    setNewCreatedUserData(user);
                    setNewUserFirstPage(false);
                    setLoading(false);
                }).catch((error) => {
                    if (error?.response?.status === 409) {
                        setNewUserErrors(pre => ({ ...pre, email: 'Email already exists' }))
                    } else {
                        message.error(t('MSG_CREATE_USER_FAILED'))
                    }
                })
            }
        } else {
            setLoading(true)
            const userRoles = existingClients?.find(client => client?.CompanyPartyId === selectedCompany?.companyPartyId)
            const userRole = userRoles?.Roles?.find(role => role?.Value?.toUpperCase() === 'USER')
            const newSelectedRoles = JSON.parse(JSON.stringify(selecteduserRoles))
            const userRoleData = {
                "EntityPartyId": selectedCompany?.companyPartyId,
                "UserId": currentUser?.Id,
                "UserId": currentUser?.Id,
                "RoleId": userRole?.Key,
                "RoleName": userRole?.Value,
                "IsActive": false
            }
            newSelectedRoles.push(userRoleData)

            const params = {
                "UserId": newCreatedUserData?.Id,
                "FirstName": newCreatedUserData?.FirstName,
                "LastName": newCreatedUserData?.LastName,
                "Email": newCreatedUserData?.Email,
                "CountryId": newCreatedUserData?.CountryId,
                "PictureFileId": '',
                "LoggedInUserId": currentUser?.Id,
                "UserRoles": newSelectedRoles,
                // "IsSendEmail": true,
                "IsActive": false,
                "UserId": newUserData?.Id,
                "MessageTemplateId": newUserData?.template?.Id
            }

            updateUser(params).then(() => {
                setLoading(false);
                message.success(t('MSG_CREATE_USER_SUCCESS'))
                getUsersData(1);
                setPageNumber(1);
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
                <button className="add-btn m-r-20" onClick={toggleModal} ><i className="icon-plus-circled m-r-10" />{t('ADD_NEW_USER')}</button>
                <div className="search-input-container" >
                    <Input placeholder={t('SEARCH_BY_ORG_NAME')} value={searchText} onChange={onChangeSearchText} endImage='icon-search-1' />
                </div>
                <button className="add-btn" onClick={onSearch} >{t('SEARCH')}</button>
                <div className={selectedUsers?.length === 0 ? 'disable-div fr' : 'fr'}>
                    <Dropdown
                        overlay={actions} placement="topRight" arrow
                    >
                        <button className="primary-btn actions-btn-on-top" >{t('ACTION')}</button>
                    </Dropdown>
                </div>
            </div>
            {users?.length > 0 &&
                <div className="tablele-width">
                    <Table
                        rowKey={(record) => record?.UserId}
                        dataSource={users}
                        scroll={{
                            y: '65vh',
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
            }
            <div className="action-bar">
                <div className="flex-center-middle m-t-10">
                    <Pagination size="small" current={pageNumber} onChange={onChangePage} total={totalResults} showSizeChanger={false} />
                </div>
            </div>

            <Modal title={t('CREATE_NEW_USER')}
                visible={modalVisible}
                onCancel={toggleModal}
                cancelText={t('CANCEL')}
                okText={newUserFirstPage ? t('NEXT') : t('DONE')}
                onOk={onOk}
                centered={true}
                closeIcon={< i className='icon-close close-icon' />}>
                <div className="user-input-box" >
                    <div className="g-row flex-center-middle">
                        <div className={newUserFirstPage ? "g-col-5 text-center blue" : "g-col-5 text-center"}>{t('USER_INFO')}</div>
                        <i className="icon-circle-arrow-r2 g-col-2 text-center blue arrow-icon-lg" />
                        <div className={newUserFirstPage ? "g-col-5 text-center" : "g-col-5 text-center blue"}>{t('CLIENT_INFO')}</div>
                    </div>
                    {newUserFirstPage ?
                        <div>
                            <div className="g-row m-t-20">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <Input placeholder={t('FIRST_NAME')} value={newUserData.firstName}
                                        onChange={(e) => onChangeNewUserField(e, 'firstName')}
                                        error={newUserErrors.firstName} />
                                </div>
                                <div className="g-col-5 m-l-20">
                                    <Input placeholder={t('PHONE')} value={newUserData.telephone}
                                        onChange={onChangeTelephoneNum} error={newUserErrors.telephone} />
                                </div>
                            </div>
                            <div className="g-row m-t-5">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <Input placeholder={t('LAST_NAME')} value={newUserData.lastName}
                                        onChange={(e) => onChangeNewUserField(e, 'lastName')} error={newUserErrors.lastName} />
                                </div>
                                <div className="g-col-5 m-l-20">
                                    <Input placeholder={t('EMAIL')} value={newUserData.email}
                                        onChange={(e) => onChangeNewUserField(e, 'email')} error={newUserErrors.email} />
                                </div>
                            </div>
                            <div className="g-row m-t-5">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <Input placeholder={t('COUNTRY')} value={currentUser?.CountryCode || ''} onChange={() => { }} disabled />
                                </div>
                                <div className="g-col-5 m-l-20">
                                </div>
                            </div>
                            <div className="g-row m-t-5">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <StarDropdown
                                        values={savedTemplates}
                                        onChange={onChangeTemplate}
                                        selected={JSON.stringify(newUserData?.template || undefined)}
                                        placeholder={t('SELECT_TEMPLATE')}
                                        dataName="DisplayName"
                                    // error={newUserErrors?.sendInvitation || ''}
                                    />
                                </div>
                                <div className="g-col-5 m-l-20">
                                </div>
                            </div>
                            <div className="n-float" />
                            {/* <div className="flex-align-center m-t-20 toggle-container">
                                <div className="m-t-10 m-b-10">{t('SEND_INVITAION')}?</div>
                                <div className="toggle-btn">
                                    <Switch checkedChildren="Yes" unCheckedChildren="No" checked={newUserData.sendInvitation} onChange={onToggle} />
                                </div>
                                {newUserData.sendInvitation &&
                                    <div className="g-col-5 m-t-20">
                                        <StarDropdown
                                            values={savedTemplates}
                                            onChange={onChangeTemplate}
                                            selected={JSON.stringify(newUserData?.template || undefined)}
                                            placeholder={t('SELECT_TEMPLATE')}
                                            dataName="DisplayName"
                                            error={newUserErrors?.sendInvitation || ''}
                                        />
                                    </div>
                                }
                            </div> */}
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