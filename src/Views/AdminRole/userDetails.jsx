import React, { useRef, useState, useEffect } from "react";
import { Switch, Collapse } from 'antd';
import Dropdown from "../../common/dropdown"
import image_thumb from "../../assets/images/image_thumb.png"

const { Panel } = Collapse;

const UserDetails = ({ props }) => {
    const [status, setStatus] = useState(props?.IsActive ? "Active" : "Inactive");
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // to free up memory
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const UPLOAD_BTN_REF = useRef(null);

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const handleImageUpload = () => {
        UPLOAD_BTN_REF.current.click();
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const getPanel = (header, key) => {
        return (
            <Panel header={header} key={key} extra={panelSwitch()}>
                <div className="m-b-20">Role/s</div>
                <div className="user-details-pannerl-container">
                    <div className="user-details-item">
                        <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} /> Client Admin
                    </div>
                    <div className="user-details-item">
                        <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} /> Seller
                    </div>
                    <div className="user-details-item">
                        <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} /> Free User 1
                    </div>
                    <div className="user-details-item">
                        <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} /> Advanced 1
                    </div>
                </div>
                <div className="user-details-pannerl-container">
                    <div className="user-details-item">
                        <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} /> Buyer
                    </div>
                    <div className="user-details-item">
                        <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} /> Supplier
                    </div>
                    <div className="user-details-item">
                        <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} /> Free User 2
                    </div>
                    <div className="user-details-item">
                        <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} /> Advanced 2
                    </div>
                </div>
            </Panel>
        )
    }

    const panelSwitch = () => {
        return (
            <div onClick={(event) => {
                event.stopPropagation();
            }}>
                <Switch
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            </div>
        )
    }

    return (
        <>
            <div className="user-details-main-container" >
                <div className="user-data-container">
                    <div className="upload-image-container">
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={UPLOAD_BTN_REF}
                            onChange={onSelectFile}
                        />
                        <div className="user-image">
                            <i type="file" className="icon-edit upload-image-btn hover-hand" onClick={handleImageUpload} />
                            <img src={selectedFile ? preview : image_thumb} className=" hover-hand" alt="img" onClick={handleImageUpload} />
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
                                <div className="bold">{props?.FirstName}</div>
                            </div>
                            <div className="p-t-10">
                                Last Name
                                <div className="bold">{props?.LastName}</div>
                            </div>
                        </div>
                        <div>
                            <div className="m-b-20 m-t-20">
                                User Name
                                <div className="bold">{props?.UserName}</div>
                            </div>
                            <div className="p-t-10">
                                Country
                                <div className="bold">{props?.CountryName}</div>
                            </div>
                        </div>
                        <div>
                            <div className="m-t-20">
                                Change Status
                                <Dropdown
                                    values={["Active", "Inactive"]}
                                    onChange={onChangeStatus}
                                    selected={status}
                                    placeholder="Status"
                                />
                            </div>
                            {/* <div className="role-container">
                                Change Role
                                <div className="roles-box">
                                    <div className="role-box-header">
                                        <div>Role</div>
                                        <div>On/Off</div>
                                    </div>
                                    <div className="role-box-item">
                                        <div className="m-l-5">Site Admin</div>
                                        <div className="m-r-5">
                                            <Switch
                                                checkedChildren="Yes"
                                                unCheckedChildren="No"
                                            />
                                        </div>
                                    </div>
                                    <div className="role-box-item">
                                        <div className="m-l-5">User 1</div>
                                        <div className="m-r-5">
                                            <Switch
                                                checkedChildren="Yes"
                                                unCheckedChildren="No"
                                            />
                                        </div>
                                    </div>
                                    <div className="role-box-item">
                                        <div className="m-l-5">User 3</div>
                                        <div className="m-r-5">
                                            <Switch
                                                checkedChildren="Yes"
                                                unCheckedChildren="No"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="user-data-table-container">
                    <div className="m-b-20">Assigned company/ies</div>
                    <Collapse
                        defaultActiveKey={['1']}
                    >
                        {props?.Companies.map(company => {
                            return getPanel(company.Value, company.Key)
                        })}
                    </Collapse>
                </div>
            </div>
            <div className="details-btn-container">
                <button className="primary-btn m-r-20" >Cancel</button>
                <button className="primary-btn" >Delete</button>
            </div>
        </>
    )
}

export default UserDetails;