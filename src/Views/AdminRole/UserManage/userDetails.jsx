import React, { useRef, useState, useEffect, useContext } from "react";
import { Switch, Collapse, message } from 'antd';

import Dropdown from "../../../common/dropdown"
import image_thumb from "../../../assets/images/image_thumb.png"
import { updateUser } from "../../../services/userService";
import Input from '../../../common/input'
import { getGetCountries } from "../../../services/communicationService";
import { UserContext } from "../../../utils/contextStore";

const { Panel } = Collapse;

const UserDetails = ({ props }) => {
    const getChecked = () => {
        return props?.UserRoles?.map(role => {
            return { ...role, disabled: role?.DeletedUserPartyId === null && role?.IsActive === false }
        })
    }
    const [status, setStatus] = useState(props?.IsActive ? "Active" : "Inactive");
    const [userData, setUserData] = useState({ firstName: props?.FirstName, lastName: props?.LastName, userName: props?.UserName, country: { Id: props?.CountryId, Name: props?.CountryName } })
    const [selectedFile, setSelectedFile] = useState(props?.PictureFileId || null);
    const [updateUserRoles, setUpdateUserRoles] = useState([]);
    const [checked, setChecked] = useState(getChecked());
    const [countryList, setCountryList] = useState([])
    const [editDetails, setEditDetails] = useState(false);
    const [loading, setLoading] = useState(false);

    const UPLOAD_BTN_REF = useRef(null);

    const { getUsersData, currentUser } = useContext(UserContext);

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
        "LoggedInUserPartyId": status === "Active" ? null : currentUser?.PartyId,
        "UserPartyId": props?.UserPartyId
    }

    useEffect(() => {
        getGetCountries().then(result => {
            setCountryList(result);
        })
    }, [])

    const onChangeStatus = (e) => {
        setLoading(true)
        setStatus(e.target.value);

        const params = userReqParams;
        params.LoggedInUserPartyId = e.target.value === "Active" ? null : currentUser?.PartyId;

        updateUser(params).then(() => {
            setLoading(false);
            getUsersData();
        }).catch(() => {
            message.error('Update failed please try again')
            setLoading(false);
        })
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
                message.error('Update failed please try again')
                setLoading(false);
            })
        };
        reader.onerror = error => {
            message.error('Image upload failed');
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
            <Panel header={header} key={key} extra={panelSwitch()}>
                <div className="m-b-20">Role/s</div>
                <div className="user-details-pannerl-container">
                    {checked?.map((role) => {
                        // const isChecked = checked.find(check => { return check?.EntityName === role?.EntityName && check?.RoleName === role?.RoleName })?.IsActive
                        const isChecked = role?.DeletedUserPartyId === null && role?.IsActive !== null
                        const isDisabled = role?.DeletedUserPartyId === null && props?.UserRoles?.find(usrRole => { return usrRole?.EntityPartyId === role?.EntityPartyId && usrRole?.RoleId === role?.RoleId })?.IsActive === false

                        return (
                            <>
                                <div className="user-details-item">
                                    <div className={`user-details-item-content ${role?.disabled && 'disable-div'}`}>
                                        <input type="checkbox" className="check-box"
                                            checked={isChecked}
                                            onChange={(e) => { onCheckRole(e, role) }} />
                                        {role?.RoleName}
                                    </div>
                                    {isDisabled &&
                                        <div className="blue hover-hand" onClick={() => onEdit(role)} >Edit</div>
                                    }
                                </div>
                            </>
                        )
                    })}
                </div>
            </Panel>
        )
    }

    const panelSwitch = () => {
        const toggleOn = checked?.findIndex(role => { return role?.IsActive === true }) > -1;

        return (
            <div onClick={(event) => {
                if (toggleOn)
                    event.stopPropagation();
            }}>
                <Switch
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                    checked={toggleOn}
                    onChange={onToggle}
                />
            </div>
        )
    }

    const onToggle = (value) => {
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
        params.IsSendEmail = null;

        updateUser(params).then(() => {
            message.success('User data updated')
            setLoading(false);
            setEditDetails(false);
            getUsersData();
        }).catch(() => {
            message.error('User data update failed please try again')
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
                        <div>
                            <div className="m-b-20">
                                User ID
                                <div className="bold">{props?.UserId}</div>
                            </div>
                            <div className="m-b-20 p-t-10">
                                FIrst Name
                                {editDetails ?
                                    <Input placeholder="First Name"
                                        value={userData.firstName}
                                        onChange={(e) => onChangeUserData(e, 'firstName')}
                                    /> :
                                    <div className="bold">{userData.firstName}</div>
                                }
                            </div>
                            <div className="p-t-10">
                                Last Name
                                {editDetails ?
                                    <Input placeholder="Last Name"
                                        value={userData.lastName}
                                        onChange={(e) => onChangeUserData(e, 'lastName')}
                                    /> :
                                    <div className="bold">{userData.lastName}</div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="m-b-20 m-t-20">
                                User Name
                                {editDetails ?
                                    <Input placeholder="User Name"
                                        value={userData.userName}
                                        onChange={(e) => onChangeUserData(e, 'userName')}
                                    /> :
                                    <div className="bold">{userData.userName}</div>
                                }
                            </div>
                            <div className="p-t-10">
                                Country
                                {editDetails ?
                                    <div className="user-drop-down" style={{ width: 200 }}>
                                        <Dropdown
                                            values={countryList}
                                            onChange={onChangeCountry}
                                            selected={JSON.stringify(userData.country || undefined)}
                                            placeholder="Country"
                                            dataName="Name"
                                        />
                                    </div> :
                                    <div className="bold">{userData.country?.Name}</div>
                                }
                            </div>
                        </div>
                        <div>
                            <div className="m-t-20">
                                <Dropdown
                                    values={["Active", "Inactive"]}
                                    onChange={onChangeStatus}
                                    selected={status}
                                    placeholder="Status"
                                />
                            </div>
                        </div>
                    </div>
                    <i type="file" className="icon-edit upload-image-btn hover-hand" onClick={() => setEditDetails(true)} />
                </div>
                <div className="user-data-table-container">
                    <div className="m-b-20">Assigned company/ies</div>
                    <Collapse>
                        {getPanel(props?.Company?.Value)}
                    </Collapse>
                </div>
            </div>
            <div className="details-btn-container">
                <button className="primary-btn" onClick={onUpdate} >Update</button>
            </div>
        </div>
    )
}

export default UserDetails;