import React, { useState, useMemo, useContext, useEffect } from "react";
import { Tabs, Badge, Tooltip, Table, Modal, message } from 'antd';
import { formatDate } from "../../utils";
import Dropdown from "../../common/dropdown";
import DropdownMultiSelect from "../../common/dropdownMultiSelect";
import Input from "../../common/input"
import DatePickerInput from "../../common/datePickerInput"
import NavigationCard from "../../common/navigationCard"
import EmptyTableView from "../../Views/SupplierRole/Components/emptyTableView";
import { sectionTableHeaders, membersTableHeaders } from "../../utils/constants";
import { addNewSection, getAllMembers, addNewMember, editProject, getSections, editSection } from "../../services/operationsService"
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";

const { TabPane } = Tabs;

const ProjectDetails = ({ params }) => {
    const [editable, setEditable] = useState(false);
    const [status, setStatus] = useState(params.status);
    const [closedDate, setClosedDate] = useState(params.closedDate);
    const [sectionData, setSectionData] = useState([]);

    const changeStateOfProject = (e) => {
        const newProjectData = { ...params }
        newProjectData.status = e.target.value;
        if (e.target.value.toUpperCase() === 'OPEN') {
            newProjectData.closedDate = '0001-01-01T00:00:00Z';
            setClosedDate('0001-01-01T00:00:00Z')
        } else {
            const currentdate = new Date();
            newProjectData.closedDate = currentdate;
            setClosedDate(currentdate)
        }
        setStatus(e.target.value);
        editProject(newProjectData.id, newProjectData).then(() => {
            setStatus(e.target.value)
            message.success('Change status successful');
        }).catch(() => {
            message.error('Change status faild please try again');
        })
    }

    return (
        <>
            <div className="g-row m-t-20 m-b-20 m-l-20">
                <div className="g-col-3 fl body-text">Project ID: <strong>{params.operationId}</strong></div>
                <div className="g-col-3 fl body-text">Name: <strong>{params.name}</strong></div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card">
                    <TabPane tab="GENERAL" key="1">
                        <div className="g-row m-l-20 m-r-20 p-a-20">
                            <div className="g-col-2">
                                <div className="body-text-bold">Type</div>
                                <div className="body-text">{params.type}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">Description</div>
                                <div className="body-text">{params.description}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">From Date</div>
                                <div className="body-text m-b-20">{formatDate(params.fromDate)}</div>
                                <div className="body-text-bold m-t-20 p-t-20">Due Date</div>
                                <div className="body-text">{formatDate(params.toDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">Closed Date</div>
                                <div className="body-text">{formatDate(closedDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">Permission Type</div>
                                <div className="body-text m-b-20">{params.permission}</div>
                                <div className="body-text-bold m-t-20 p-t-20">Responsible</div>
                                <div className="body-text">{params.responsible}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">Status</div>
                                {editable ?
                                    <Dropdown values={['Open', 'Close']} onChange={changeStateOfProject} selected={status?.toUpperCase() === 'OPEN' ? 'Open' : 'Close'} placeholder="Status" />
                                    : <Badge status={status?.toUpperCase() === 'OPEN' ? "success" : "default"} text={status?.toUpperCase() === 'OPEN' ? "Open" : "Close"} />
                                }
                            </div>
                        </div>
                        <i className="icon-edit detail-edit-icon" onClick={() => setEditable(prev => !prev)} ></i>
                    </TabPane>
                    <TabPane tab="SECTION" key="2">
                        <SectionView projectName={params.name} projectId={params.operationId} id={params.id} sectionData={sectionData} setSectionData={setSectionData} />
                    </TabPane>
                    <TabPane tab="MEMBERS" key="3">
                        <MembersView id={params.id} sectionId={params.sections[0]?.id || ''} sectionData={sectionData} setSectionData={setSectionData} />
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

const SectionView = (props) => {
    const { changeActiveTab } = useContext(TabContext)
    const [tableView, setTableView] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newSectionData, setNewSectionData] = useState({ name: '', description: '', purpose: '', fromDate: '', toDate: '', responsible: '', status: '' });
    const [editData, setEditData] = useState(false);

    useEffect(() => {
        getSections(props.id).then((data) => { props.setSectionData(data || []) })
    }, []);

    const tableHeaders = useMemo(() => {
        const headers = sectionTableHeaders.map(a => { return { ...a } })

        headers.push({
            title: '',
            render: (_, record) => (
                <>
                    <div className="fl blue border-blue m-t-5 m-r-20 p-x-5 hover-hand"
                        onClick={() => { onClickSection(record) }}
                    ><i className="icon-search serch-table-icon blue" />Search Engine</div>
                    <i className="icon-edit table-icon blue fl" onClick={(e) => {
                        e.stopPropagation();
                        setEditData(true);
                        setNewSectionData(record);
                        setModalVisible(true);
                    }} />
                </>
            )
        })

        return headers

    }, [props.sectionData])

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setNewSectionData({});
    };

    const handleOk = () => {
        if (editData) {
            editSection(props.id, newSectionData.id, newSectionData).then(() => {
                getSections(props.id).then(result => {
                    props.setSectionData(result);
                    message.success('Edit section successful');
                }).catch(() => {
                    message.warning('Updated data fetch fail please reload');
                })
                setEditData(false);
                toggleModal();
            }).catch(() => {
                message.error('Edit section failed please try again');
            })
        } else {
            addNewSection(props.id, newSectionData).then(() => {
                getSections(props.id).then(result => {
                    props.setSectionData(result);
                    message.success('Create section successful');
                }).catch(() => {
                    message.warning('Updated data fetch fail please reload');
                })
                toggleModal();
            }).catch(() => {
                message.error('Create section failed please try again');
            })
        }


    };

    const onClickSection = (section) => {
        changeActiveTab(NAVIGATION_PAGES.BUYER_PROJECT_SEARCH, { proId: props.id, projectId: props.projectId, projectName: props.projectName, sectionId: section.id, sectionName: section.name })
    }

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewSectionData({ ...newSectionData, [elementName]: e.target.value })
    }

    const onNewElementDateChange = (date, elementName) => {
        setNewSectionData({ ...newSectionData, [elementName]: date })
    }

    return (
        <div>
            <h3 className="icon-plus-circled hover-hand m-l-10" onClick={toggleModal} >Add Section</h3>
            <Tooltip title="Tile View">
                <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)} ></i>
            </Tooltip>
            <Tooltip title="Grid View">
                <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)} ></i>
            </Tooltip>
            <h3 className="p-t-20 m-b-20 m-l-10 fl">Sections List</h3>

            {tableView ?
                <Table
                    rowKey={(record) => record.id}
                    dataSource={props.sectionData}
                    columns={tableHeaders}
                    pagination={false}
                    locale={{ emptyText: <EmptyTableView tableName="Sections" onButtonClick={toggleModal} /> }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => onClickSection(record),
                        };
                    }}
                />

                : <div className="g-row">
                    {props.sectionData.length > 0 ?
                        props.sectionData.map((section, index) => {
                            return (
                                <div key={index}>
                                    <NavigationCard name={section.name} cardColour={"bg-blue-purple"} value={section.id} onClick={() => onClickSection(section)} />
                                </div>
                            )
                        }) : <EmptyTableView tableName="Sections" onButtonClick={toggleModal} />
                    }
                </div>
            }
            <Modal
                title="Add Section"
                visible={modalVisible}
                onOk={handleOk}
                okText='Save'
                onCancel={toggleModal}
                centered={true}
                width={1000}
            >
                <div className="g-row">
                    <div className="g-col-6">
                        <Input placeholder="Name (Eg: Furniture, PC etc.," value={newSectionData.name || ''} onChange={(e) => onNewElementChange(e, 'name')} />
                        <Input lines={3} placeholder="Description" value={newSectionData.description || ''} onChange={(e) => onNewElementChange(e, 'description')} />
                        <Input placeholder="Purpose" value={newSectionData.purpose || ''} onChange={(e) => onNewElementChange(e, 'purpose')} />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput placeholder={'From Date'} value={newSectionData.fromDate ? new Date(newSectionData.fromDate) : ''} onChange={(date) => onNewElementDateChange(date, 'fromDate')} />
                        <DatePickerInput placeholder={'Due Date'} value={newSectionData.toDate ? new Date(newSectionData.toDate) : ''} onChange={(date) => onNewElementDateChange(date, 'toDate')} />
                        <Input placeholder="Responsible (Users for this Tenant))" value={newSectionData.responsible || ''} onChange={(e) => onNewElementChange(e, 'responsible')} endImage="icon-managers" />
                        <Dropdown values={['Open', 'Close']} onChange={(e) => onNewElementChange(e, 'status')} selected={newSectionData.status || ''} placeholder="Status" />
                    </div>
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    )
}

const MembersView = (props) => {
    const [tableView, setTableView] = useState(true);
    const [membersData, setMembersData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMemberData, setEditMemberData] = useState({ name: '', email: '', sections: [], assigned: '', responsible: '', status: '' });
    const [addMemberData, setAddMemberData] = useState({ name: '', sections: [], responsible: '', });
    const [editdata, setEditdata] = useState(false);

    const tableHeaders = useMemo(() => {
        const headers = membersTableHeaders.map(a => { return { ...a } })

        headers.splice(4, 0,
            {
                title: 'Assigned Section(s)',
                render: (_, record) => (
                    record?.sections?.map((secId) => {
                        const section = props.sectionData?.find((section) => section.id === secId)
                        return (
                            <>
                                {section?.name || ''}
                                <br />
                            </>
                        )
                    })

                )
            }
        )
        headers.push({
            title: '',
            render: (_, record) => (
                <>
                    <i className="icon-delete table-icon" onClick={(e) => {
                        e.stopPropagation();
                    }} />
                    <i className="icon-edit table-icon" />
                </>
            )
        })

        return headers

    }, [props.sectionData])

    useEffect(() => {
        getSections(props.id).then((data) => { props.setSectionData(data || []) })
        getAllMembers(props.id).then((data) => setMembersData(data))
    }, []);

    const toggleModal = () => {
        setAddMemberData({ name: '', sections: [], responsible: '', fromDate: '', toDate: '' })
        setModalVisible(!modalVisible);
    };

    const addMember = () => {
        setEditdata(false);
        toggleModal()
    }

    const handleOk = () => {
        if (editdata) {
            //TODO edit api call
        } else {
            const sectionIds = [];
            addMemberData.sections.map(val => sectionIds.push(val.id));
            const membersWithId = { ...addMemberData, id: props.sectionId, sections: sectionIds }

            addNewMember(props.id, props.sectionId, membersWithId).then(() => {
                getAllMembers(props.id).then(result => {
                    setMembersData(result);
                    setAddMemberData({ name: '', sections: [], responsible: '', fromDate: '', toDate: '' })
                    message.success('Add member successful');
                }).catch(() => {
                    message.warning('Updated data fetch fail please reload');
                })
                toggleModal();
            }).catch(() => {
                message.error('Add member failed please try again');
            })
        }
    };

    const onClickMember = (params) => {
        const newEditMemberData = { ...params }
        const sectionData = []

        params.sections?.map(secId => {
            const sectionName = props.sectionData?.find((section) => section.id === secId)
            sectionData.push(sectionName)
        })
        newEditMemberData.sections = sectionData;

        setEditMemberData(newEditMemberData);
        setEditdata(true);
        toggleModal();
    }

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setEditMemberData({ ...editMemberData, [elementName]: e.target.value })
    }

    const onNewElementDateChange = (date, elementName) => {
        setEditMemberData({ ...editMemberData, [elementName]: date })
    }

    const onAddMemberChange = (e, elementName) => {
        e.preventDefault();
        setAddMemberData({ ...addMemberData, [elementName]: e.target.value })
    }

    const onAddMemberDateChange = (date, elementName) => {
        setAddMemberData({ ...addMemberData, [elementName]: date })
    }

    return (
        <div>
            <h3 className="icon-plus-circled hover-hand m-l-10" onClick={addMember} >Add Member</h3>
            <Tooltip title="Tile View">
                <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)} ></i>
            </Tooltip>
            <Tooltip title="Grid View">
                <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)} ></i>
            </Tooltip>
            <h3 className="p-t-20 m-b-20 m-l-10 fl">Members List</h3>

            {tableView ?
                <Table
                    rowKey={(record) => record.id}
                    dataSource={membersData}
                    columns={tableHeaders}
                    locale={{ emptyText: <EmptyTableView tableName="Members" onButtonClick={addMember} /> }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => onClickMember(record),
                        };
                    }}
                />

                : <div className="g-row">
                    {membersData.length > 0 ?
                        membersData.map((member, index) => {
                            return (
                                <div key={index}>
                                    <NavigationCard name={member.name} cardColour={"bg-blue-purple"} value={'name'} onClick={() => onClickMember(member)} />
                                </div>
                            )
                        }) : <EmptyTableView tableName="Members" onButtonClick={addMember} />
                    }
                </div>
            }
            <Modal
                title={editdata ? "Member" : 'Add Member'}
                visible={modalVisible}
                onOk={handleOk}
                okText={editdata ? 'Save' : 'Add'}
                onCancel={toggleModal}
                centered={true}
                width={1000}
            >
                <div className="g-row">
                    {editdata ?
                        <>
                            <div className="g-col-6">
                                <Input placeholder="Name" value={editMemberData.name || ''} disabled={true} />
                                <Input placeholder="Email" value={editMemberData.email || ''} disabled={true} />
                                <Input placeholder="Phone" value={editMemberData.phone || ''} disabled={true} />
                                <Input placeholder="Company" value={editMemberData.company || ''} disabled={true} />
                                <DropdownMultiSelect placeholder="Section/s" dataList={props.sectionData} selectedList={editMemberData} setSelectedState={setEditMemberData} criteriaName='sections' containerStyle="member-section-dropdown" />
                            </div>
                            <div className="g-col-6">
                                <DatePickerInput placeholder={'From Date'} value={editMemberData.fromDate ? new Date(editMemberData.fromDate) : ''} onChange={(date) => onNewElementDateChange(date, 'fromDate')} />
                                <DatePickerInput placeholder={'Due Date'} value={editMemberData.toDate ? new Date(editMemberData.toDate) : ''} onChange={(date) => onNewElementDateChange(date, 'toDate')} />
                                <Input placeholder="Responsible" value={editMemberData.responsible} onChange={(e) => onNewElementChange(e, 'responsible')} endImage="icon-managers" />
                                <Dropdown values={['Open', 'Close']} onChange={(e) => onNewElementChange(e, 'status')} selected={editMemberData.status || ''} placeholder="Status" />
                            </div>
                        </> :
                        <>
                            <div className="g-col-6">
                                <Input placeholder="Search User" value={addMemberData.name || ''} endImage='icon-search' onChange={(e) => onAddMemberChange(e, 'name')} />
                                <DropdownMultiSelect placeholder="Section/s" dataList={props.sectionData} selectedList={addMemberData} setSelectedState={setAddMemberData} criteriaName='sections' containerStyle="member-section-dropdown" />
                                <Dropdown values={['Admin', 'User']} onChange={(e) => onAddMemberChange(e, 'responsible')} selected={addMemberData.responsible || ''} placeholder="Responsible" />
                            </div>
                            <div className="g-col-6">
                                <DatePickerInput placeholder={'From Date'} value={addMemberData.fromDate ? new Date(addMemberData.fromDate) : ''} onChange={(date) => onAddMemberDateChange(date, 'fromDate')} />
                                <DatePickerInput placeholder={'To Date'} value={addMemberData.toDate ? new Date(addMemberData.toDate) : ''} onChange={(date) => onAddMemberDateChange(date, 'toDate')} />
                            </div></>

                    }
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    )

}

export default ProjectDetails;