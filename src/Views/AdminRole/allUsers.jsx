import React, { useState, useMemo, useContext } from "react";
import { Table, Modal, Switch, Dropdown, Menu, message } from 'antd';

import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { usersTableHeaders } from '../../utils/tableHeaders'
import StarDropdown from "../../common/dropdown";
import Input from '../../common/input'

const emaiRegEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const actions = (
    <Menu>
        <Menu.Item>Send Invitation</Menu.Item>
        <Menu.Item>Send Messege</Menu.Item>
        <Menu.Item>Mark Active</Menu.Item>
        <Menu.Item>Mark Inactive</Menu.Item>
    </Menu>
);

const newUserDataObj = { firstName: '', lastName: '', country: 'Norway', telephone: '', email: '', role: 'Client Admin', sendInvitation: false, template: '' }

const usersData = [ //remove
    {
        id: 'UA111',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Active',
    },
    {
        id: 'UA112',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Inactive',
    },
    {
        id: 'UA113',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Inactive',
    },
    {
        id: 'UA114',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Active',
    },
    {
        id: 'UA115',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Inactive',
    },
    {
        id: 'UA116',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Active',
    },
    {
        id: 'UA117443',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Active',
    },
    {
        id: 'UA118',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Active',
    },
    {
        id: 'UA1144',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Active',
    },
    {
        id: 'UA1173t',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Active',
    },
    {
        id: 'UA1183',
        title: 'Mr',
        userName: 'Xxxxxx',
        firstName: 'Xxxxxx',
        lastName: 'Xxxxxx',
        country: 'Norway',
        email: 'some@gmail.com',
        phone: '+63 4547758',
        companies: ['ABC', 'Element Logic', 'AS', 'GGEoff', 'Apple', 'Samsung', 'Toshiba'],
        roles: ['Client Admin', 'Admin', 'User', 'User Admin'],
        cId: 'Xxxxxx',
        status: 'Active',
    },

]

const clients = ['ABC.AS', 'Trond', 'Hetti', '']

const AllUsers = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [users, setUsers] = useState(usersData)
    const [searchText, setSearchText] = useState('');
    const [searchClientsText, setSearchClientsText] = useState('');
    const [newUserFirstPage, setNewUserFirstPage] = useState(true);
    const [newUserData, setNewUserData] = useState(newUserDataObj);
    const [newUserErrors, setNewUserErrors] = useState(newUserDataObj)

    const { changeActiveTab } = useContext(TabContext);

    const tableHeaders = useMemo(() => {
        const headers = usersTableHeaders.map(a => { return { ...a, title: a.title } })
        headers.push({
            title: '',
            fixed: 'right',
            width: 60,
            render: (_, record) => (
                <input type="checkbox" className="check-box" onClick={(e) => { e.stopPropagation() }} />
            )
        })

        return headers

    }, [users])

    const filterdClients = useMemo(() => {
        if (searchClientsText) {
            const filterdList = clients.filter(client => client.toLocaleLowerCase().includes(searchClientsText.toLocaleLowerCase()));
            return filterdList
        } else return []
    }, [searchClientsText])

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

    const onChangeRole = (e) => {
        setNewUserData({ ...newUserData, role: e.target.value })
    }

    const onToggle = (val) => {
        setNewUserData({ ...newUserData, sendInvitation: val })
    }

    const onChangeTemplate = (e) => {
        setNewUserData({ ...newUserData, template: e.target.value })
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
        } else if (!emaiRegEx.test(newUserData.email)) {
            setNewUserErrors(pre => ({ ...pre, email: 'Invalid email adress' }))
            validation = false
        }

        return validation;
    }

    const onOk = () => {
        setNewUserErrors(newUserDataObj);
        if (newUserFirstPage) {
            if (validateFields()) {
                setNewUserFirstPage(false);
            }
        } else {
            message.success('Create user successful')
            setModalVisible(false);
            setNewUserFirstPage(true);
        }
    }

    const onClickUserRow = (params) => {
        changeActiveTab(NAVIGATION_PAGES.ALL_USER_DETAILS, params)
    }

    return (
        <div className="page-container">
            <div className="top-container">
                <button className="add-btn m-r-20" onClick={toggleModal} ><i className="icon-plus-circled m-r-10" />Add New User</button>
                <div className="search-input-container" >
                    <Input placeholder="Search By Name or Org. ID" value={searchText} onChange={onChangeSearchText} endImage='icon-search-1' />
                </div>
                <button className="add-btn" >Filters</button>
            </div>
            <div className="tablele-width">
                <Table
                    rowKey={(record) => record?.id}
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
                    pagination={{
                        position: ['bottomCenter'],
                    }}
                />
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
                                    <Input placeholder="First Name" value={newUserData.firstName} onChange={(e) => onChangeNewUserField(e, 'firstName')} error={newUserErrors.firstName} />
                                </div>
                                <div className="g-col-5 m-l-20">
                                    <Input placeholder="Telephone" value={newUserData.telephone} onChange={onChangeTelephoneNum} error={newUserErrors.telephone} />
                                </div>
                            </div>
                            <div className="g-row m-t-5">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <Input placeholder="Last Name" value={newUserData.lastName} onChange={(e) => onChangeNewUserField(e, 'lastName')} error={newUserErrors.lastName} />
                                </div>
                                <div className="g-col-5 m-l-20">
                                    <Input placeholder="Email" value={newUserData.email} onChange={(e) => onChangeNewUserField(e, 'email')} error={newUserErrors.email} />
                                </div>
                            </div>
                            <div className="g-row m-t-5">
                                <div className="g-col-5 m-l-20 m-r-20">
                                    <Input placeholder="Country" value={newUserData.country} disabled />
                                </div>
                                <div className="g-col-5 m-l-20">
                                    {/* <StarDropdown
                                        values={['Client Admin', 'Admin', 'User', 'User Admin']}
                                        onChange={onChangeRole}
                                        selected={newUserData.role}
                                        placeholder="Assign a Role"
                                    /> */}
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
                                            values={["My Template 1", "Admin Template"]}
                                            onChange={onChangeTemplate}
                                            selected={newUserData.template}
                                            placeholder="Select Template"
                                        />
                                    </div>
                                }
                            </div>
                        </div> :
                        <>
                            <div className="n-float" />

                            <div className="top-container m-t-20" style={{ height: 40 }}>
                                <div className="search-input-container" >
                                    <Input placeholder="Search Existing Client/s" value={searchClientsText} onChange={onChangeSearchClientsText} endImage='icon-search-1' />
                                </div>
                                <button className="add-btn" >Filters</button>
                            </div>

                            {filterdClients.map(client => {
                                return (
                                    <div className="g-row m-t-20 search-item">
                                        <div className="g-col-4 m-l-20 m-r-20 blue flex-center-middle">
                                            {client}
                                        </div>
                                        <div className="g-col-4 m-l-20">
                                            <StarDropdown
                                                values={["Site Admin"]}
                                                onChange={onChangeRole}
                                                selected={newUserData.role}
                                                placeholder="Role?"
                                            />
                                        </div>
                                        <div className="g-col-1 m-l-20">
                                            <input type="checkbox" className="check-box" />
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </>
                    }
                    <div className="n-float" />
                </div>
            </Modal>
        </div>
    )
}

export default AllUsers;