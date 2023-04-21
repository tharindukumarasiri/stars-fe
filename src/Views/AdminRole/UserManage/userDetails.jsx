import React, { useRef, useState, useEffect, useContext } from "react";
import { Switch, Collapse, message, Modal } from 'antd';
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import Dropdown from "../../../common/dropdown"
import image_thumb from "../../../assets/images/image_thumb.png"
import { updateUser, activateUsers, deActivateUsers, deleteUser } from "../../../services/userService";
import Input from '../../../common/input'
import { getGetCountries } from "../../../services/communicationService";
import { UserContext, TabContext } from "../../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../../utils/enums";

const { Panel } = Collapse;
const { confirm } = Modal;

let curentUser = {}

const UserDetails = ({ props }) => {
    const [status, setStatus] = useState(props?.IsActive ? "ACTIVE" : "INACTIVE");
    const [userData, setUserData] = useState({ firstName: props?.FirstName, lastName: props?.LastName, userName: props?.UserName, country: { Id: props?.CountryId, Name: props?.CountryName } })
    const [selectedFile, setSelectedFile] = useState(props?.PictureFileId || null);
    const [updateUserRoles, setUpdateUserRoles] = useState([]);
    const [checked, setChecked] = useState([]);
    const [countryList, setCountryList] = useState([])
    const [editDetails, setEditDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const UPLOAD_BTN_REF = useRef(null);

    const { getUsersData, currentUser, users, selectedCompany } = useContext(UserContext);
    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        const curentUserData = users.find(usr => usr?.UserId === props?.UserId)
        const newChecked = curentUserData?.UserRoles?.map(role => {
            return { ...role, disabled: role?.DeletedUserPartyId === null && role?.IsActive === false }
        })
        curentUser = curentUserData
        setChecked(newChecked)
        setStatus(curentUserData?.IsActive ? "ACTIVE" : "INACTIVE")
    }, [users])

    const userReqParams = {
        "UserId": props?.UserId,
        "TitleName": props?.TitleName,
        "UserName": props?.UserName,
        "FirstName": props?.FirstName,
        "LastName": props?.LastName,
        "Email": props?.Email,
        "PhoneNumber": props?.PhoneNumber,
        "CountryId": props?.CountryId,
        "CountryName": props?.CountryName,
        "IsActive": props?.IsActive,
        "PictureFileId": selectedFile,
        "LoggedInUserPartyId": currentUser?.PartyId,
        "UserPartyId": props?.UserPartyId
    }

    useEffect(() => {
        getGetCountries().then(result => {
            setCountryList(result);
        })
    }, [])

    const onChangeStatus = (e) => {
        if (e.target.value === 'ACTIVE') {
            setLoading(true)
            setStatus(e.target.value);

            activateUsers([selectedCompany?.companyPartyId, props?.UserId]).then(() => {
                message.success(t('MSG_USERS_ACTIVATED'));
                getUsersData();
                setLoading(false)
            }).catch(() => {
                message.error(t('MSG_USERS_ACTIVATE_FAIL'))
                setLoading(false)
            })
        } else if (e.target.value === 'INACTIVE') {
            setLoading(true)
            setStatus(e.target.value);

            deActivateUsers([selectedCompany?.companyPartyId, props?.UserId]).then(() => {
                message.success(t('MSG_USERS_DEACTIVATE_SUCESS'))
                getUsersData();
                setLoading(false)
            }).catch(() => {
                message.error(t('MSG_USERS_DEACTIVATE_FAIL'))
                setLoading(false)
            })
        } else if (e.target.value === 'DELETE') {
            confirm({
                title: (
                    <>
                        {t("ARE_YOU_SURE")} <strong className="red">{t("DELETE")}</strong>{" "}
                        {t("USER")}?
                    </>
                ),
                icon: <ExclamationCircleOutlined />,
                okText: t("YES"),
                okType: "danger",
                cancelText: t("NO"),
                onOk() {
                    setLoading(true);
                    const userLisyPayload = [selectedCompany?.companyPartyId, currentUser?.PartyId, props?.UserId]

                    deleteUser(userLisyPayload).then(() => {
                        message.success(t('DELETE_SUCCESSFUL'))
                        getUsersData();
                        changeActiveTab(NAVIGATION_PAGES.ALL_USERS);
                    }).catch(() => {
                        message.error(t('DELETE_FAILED'))
                        setLoading(false)
                    })
                },
            });
        }
    }

    const handleImageUpload = () => {
        UPLOAD_BTN_REF.current.click();
    }

    const onSelectFile = e => {
        setLoading(true);
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            setSelectedFile(reader.result); //base64encoded string

            const params = userReqParams;
            params.PictureFileId = reader.result;

            updateUser(params).then(() => {
                setLoading(false);
                getUsersData();
            }).catch(() => {
                message.error(t('UPDATE_FAIL'))
                setLoading(false);
            })
        };
        reader.onerror = error => {
            message.error(t('IMAGE_UPLOAD_FAIL'));
        };
    }

    const onEdit = (roleData) => {
        if (roleData?.disabled) {
            const newUpdateUserRoles = JSON.parse(JSON.stringify(updateUserRoles));

            const params = {
                "Id": roleData?.Id,
                "EntityPartyId": roleData?.EntityPartyId,
                "EntityName": roleData?.EntityName,
                "RoleId": roleData?.RoleId,
                "RoleName": roleData?.RoleName,
                "CreatedUserPartyId": roleData?.CreatedUserPartyId,
                "UserPartyId": currentUser?.PartyId,
                "IsActive": false
            }

            newUpdateUserRoles.push(params);
            setUpdateUserRoles(newUpdateUserRoles);

            //Update check boxes state
            const newChecked = JSON.parse(JSON.stringify(checked));
            const index = checked.findIndex(role => { return roleData?.EntityName === role?.EntityName && roleData?.RoleName === role?.RoleName })
            const newValue = checked[index];
            newValue.DeletedUserPartyId = null;
            newValue.disabled = false;
            newChecked.splice(index, 1, newValue);
            setChecked(newChecked);
        }
    }

    const onCheckRole = (e, roleData) => {
        // let wasInTheArray = false
        const newUpdateUserRoles = [...updateUserRoles];

        const newChecked = [...checked];
        const index = checked.findIndex(role => { return roleData?.EntityName === role?.EntityName && roleData?.RoleName === role?.RoleName })
        const newValue = checked[index];

        const selectedIndex = updateUserRoles.findIndex(role => {
            return role?.EntityPartyId === roleData?.EntityPartyId && role?.RoleId === roleData?.RoleId
        })

        if (selectedIndex > -1) {
            // wasInTheArray = true;
            newUpdateUserRoles.splice(selectedIndex, 1);
        }

        if (e.target.checked) {
            // if (!wasInTheArray) {
            const params = {
                "Id": roleData?.Id,
                "EntityPartyId": roleData?.EntityPartyId,
                "EntityName": roleData?.EntityName,
                "RoleId": roleData?.RoleId,
                "RoleName": roleData?.RoleName,
                "CreatedUserPartyId": roleData?.CreatedUserPartyId,
                "UserPartyId": currentUser?.PartyId,
                "IsActive": false
            }

            newUpdateUserRoles.push(params);
            // }

            //Update check boxes state
            newValue.DeletedUserPartyId = null;
            newValue.disabled = false;
            newValue.IsActive = true;
            newChecked.splice(index, 1, newValue);
        } else {
            // if (!wasInTheArray) {
            const params = {
                "Id": roleData?.Id,
                "EntityPartyId": roleData?.EntityPartyId,
                "EntityName": roleData?.EntityName,
                "RoleId": roleData?.RoleId,
                "RoleName": roleData?.RoleName,
                "DeletedUserPartyId": currentUser?.PartyId,
                "UserPartyId": currentUser?.PartyId,
                "IsActive": false
            }

            newUpdateUserRoles.push(params);
            // }

            newValue.DeletedUserPartyId = currentUser?.PartyId;
            newValue.IsActive = false;
            newChecked.splice(index, 1, newValue);
            setChecked(newChecked);
        }

        setChecked(newChecked);
        setUpdateUserRoles(newUpdateUserRoles);
    }

    const getPanel = (header, key = 1) => {
        return (
            <Panel header={header} key={key} 
            // extra={panelSwitch()}
            >
                <div className="m-b-20">Role/s</div>
                <div className="user-details-pannerl-container">
                    {checked?.map((role) => {
                        // const isChecked = checked.find(check => { return check?.EntityName === role?.EntityName && check?.RoleName === role?.RoleName })?.IsActive
                        const isChecked = role?.DeletedUserPartyId === null && role?.IsActive !== null
                        const isDisabled = role?.DeletedUserPartyId === null && curentUser?.UserRoles?.find(usrRole => { return usrRole?.EntityPartyId === role?.EntityPartyId && usrRole?.RoleId === role?.RoleId })?.IsActive === false

                        return (
                            <div className={`user-details-item ${role?.RoleName?.toUpperCase() === 'USER' && 'disable-div'}`}>
                                <div className={`user-details-item-content ${role?.disabled && 'disable-div'}`}>
                                    <input type="checkbox" className="check-box"
                                        checked={isChecked}
                                        onChange={(e) => { onCheckRole(e, role) }} />
                                    {role?.RoleName}
                                </div>
                                {isDisabled &&
                                    <div className="blue hover-hand" onClick={() => onEdit(role)} >{t('EDIT')}</div>
                                }
                            </div>
                        )
                    })}
                </div>
            </Panel>
        )
    }

    const panelSwitch = () => { //DO NOT REMOVE 
        const toggleOn = curentUser?.UserRoles?.findIndex(role => role?.IsActive) > -1;

        return (
            // <div onClick={(event) => {
            //     if (toggleOn)
            //         event.stopPropagation();
            // }}>
            <div className="general-btns-container">
                {t('INACTIVE')}
                <div className="expandable-table-btn m-l-10 m-r-10">
                    <Switch
                        checked={toggleOn}
                    // onChange={onToggle}
                    />
                </div>
                {t('ACTIVE')}
            </div>

            // </div>
        )
    }

    const onToggle = (value) => { //Do not remove
        if (!value) {
            const newUpdateUserRoles = []
            const newChecked = JSON.parse(JSON.stringify(checked));

            checked?.map((role) => {
                const index = checked.findIndex(roleLoc => { return roleLoc?.EntityName === role?.EntityName && roleLoc?.RoleName === role?.RoleName })
                const newValue = checked[index];
                newValue.IsActive = false;
                newValue.DeletedUserPartyId = currentUser?.PartyId;
                newChecked.splice(index, 1, newValue);

                const params = {
                    "Id": role?.Id,
                    "EntityPartyId": role?.EntityPartyId,
                    "EntityName": role?.EntityName,
                    "RoleId": role?.RoleId,
                    "RoleName": role?.RoleName,
                    "DeletedUserPartyId": currentUser?.PartyId,
                    "UserPartyId": currentUser?.PartyId,
                    "IsActive": false
                }

                newUpdateUserRoles.push(params);

            });

            setUpdateUserRoles(newUpdateUserRoles);
            setChecked(newChecked);
        }
    }

    const onUpdate = () => {
        setLoading(true)
        const params = userReqParams;

        params.UserName = userData.userName;
        params.FirstName = userData.firstName;
        params.LastName = userData.lastName;
        params.CountryId = userData.country?.Id;
        params.CountryName = userData.country?.Name;
        params.UserRoles = updateUserRoles;
        // params.IsSendEmail = null;

        updateUser(params).then(() => {
            message.success(t('USER_UPDATE_SUCCESS'))
            setLoading(false);
            setEditDetails(false);
            getUsersData();
        }).catch(() => {
            message.error(t('USER_UPDATE_FAIL'))
            setLoading(false);
        })
    }

    const onChangeUserData = (e, fieldName) => {
        e.preventDefault();
        setUserData({ ...userData, [fieldName]: e.target.value })
    }

    const onChangeCountry = (e) => {
        e.preventDefault();
        setUserData(pre => ({ ...pre, country: JSON.parse(e.target.value) }))
    }

    const onEditDetails = () => setEditDetails(pre => !pre)

    return (
        <div className={loading ? 'loading-overlay' : ''}>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="user-details-main-container" >
                <div className="user-data-container">
                    <div className="upload-image-container">
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={UPLOAD_BTN_REF}
                            onChange={onSelectFile}
                        />
                        <div className="user-image-container">
                            <i type="file" className="icon-edit upload-image-btn hover-hand" onClick={handleImageUpload} />
                            <img src={selectedFile ? selectedFile : image_thumb} className="user-image hover-hand" alt="img" onClick={handleImageUpload} />
                        </div>
                    </div>
                    <div className="user-details-container">
                        <div className="">
                            {t('USER_ID')}
                            <div className="bold">{props?.UserId}</div>
                        </div>
                        <div className="m-t-20">
                            {editDetails ?
                                <Input placeholder={'FIRST_NAME'}
                                    value={userData.firstName}
                                    onChange={(e) => onChangeUserData(e, 'firstName')}
                                /> :
                                <>
                                    {t('FIRST_NAME')}
                                    <div className="bold">{userData.firstName}</div>
                                </>
                            }
                        </div>
                        <div className="m-t-20">
                            {editDetails ?
                                <Input placeholder={'LAST_NAME'}
                                    value={userData.lastName}
                                    onChange={(e) => onChangeUserData(e, 'lastName')}
                                /> :
                                <>
                                    {t('LAST_NAME')}
                                    <div className="bold">{userData.lastName}</div>
                                </>
                            }
                        </div>
                        <div className="m-t-20">
                            {editDetails ?
                                <Input placeholder={'USER_NAME'}
                                    value={userData.userName}
                                    onChange={(e) => onChangeUserData(e, 'userName')}
                                /> :
                                <>
                                    {t('USER_NAME')}
                                    <div className="bold">{userData.userName}</div>
                                </>
                            }
                        </div>
                        <div className="m-t-20">
                            {editDetails ?
                                <div className="user-drop-down" >
                                    <Dropdown
                                        values={countryList}
                                        onChange={onChangeCountry}
                                        selected={JSON.stringify(userData.country?.Name ? userData.country : undefined)}
                                        placeholder={'COUNTRY'}
                                        dataName="Name"
                                    />
                                </div> :
                                <>
                                    {t('COUNTRY')}
                                    <div className="bold">{userData.country?.Name}</div>
                                </>
                            }
                        </div>
                        <div className=" m-t-20">
                            {currentUser?.roles?.findIndex(role => role?.Name === 'Super Administrator') > -1 ?
                                <div className="user-drop-down" >
                                    <Dropdown
                                        values={["ACTIVE", "INACTIVE", "DELETE"]}
                                        onChange={onChangeStatus}
                                        selected={status}
                                        placeholder={'STATUS'}
                                    />
                                </div> :
                                <>
                                    {t('STATUS')}
                                    <div className="bold">{status}</div>
                                </>
                            }
                        </div>
                    </div>
                    <i type="file" className="icon-edit upload-image-btn hover-hand" onClick={onEditDetails} />
                </div>
                <div className="user-data-table-container">
                    <div className="m-b-20">{t('ASSIGNED_COMPANIES')}</div>
                    <Collapse defaultActiveKey={1}>
                        {getPanel(props?.Company?.Value)}
                    </Collapse>
                </div>
            </div>
            <div className="action-bar">
                <button className="primary-btn m-t-10 m-r-20" onClick={onUpdate} >{t('UPDATE')}</button>
            </div>
        </div>
    )
}

export default UserDetails;