import React, { useRef, useState, useEffect } from "react";
import { Switch, Table } from 'antd';
import Dropdown from "../../common/dropdown"
import { companiesHeaders } from '../../utils/tableHeaders'
import image_thumb from "../../assets/images/image_thumb.png"

const UserDetails = ({ props }) => {
    const [status, setStatus] = useState(props?.status);
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
                        <i type="file" className="icon-edit upload-image-btn hover-hand" onClick={handleImageUpload} />
                        <img src={selectedFile ? preview : image_thumb} className="logo-thumb user-image hover-hand" alt="img" onClick={handleImageUpload} />
                    </div>
                    <div className="user-details-container">
                        <div>
                            <div className="m-b-20">
                                User ID
                                <div className="bold">{props?.id}</div>
                            </div>
                            <div className="m-b-20 p-t-10">
                                FIrst Name
                                <div className="bold">{props?.firstName}</div>
                            </div>
                            <div className="p-t-10">
                                Last Name
                                <div className="bold">{props?.lastName}</div>
                            </div>
                        </div>
                        <div>
                            <div className="m-b-20">
                                User Name
                                <div className="bold">{props?.userName}</div>
                            </div>
                            <div className="p-t-10">
                                Country
                                <div className="bold">{props?.country}</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                Change Status
                                <Dropdown
                                    values={["Active", "Inactive"]}
                                    onChange={onChangeStatus}
                                    selected={status}
                                    placeholder="Status"
                                />
                            </div>
                            <div className="role-container">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-data-table-container">
                    <div>Assigned company/ies to this user</div>
                    <Table
                        rowKey={(record) => record?.id}
                        dataSource={props?.companies}
                        columns={companiesHeaders}
                        pagination={false}
                    />
                </div>
            </div>
            <div className="details-btn-container">
                <button className="primary-btn m-r-20" >Delete</button>
                <button className="primary-btn" >Update</button>
            </div>
        </>
    )
}

export default UserDetails;