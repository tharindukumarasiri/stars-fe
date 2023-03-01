import React, { useState, useMemo, useContext, useEffect } from "react";
import { Tabs, Tooltip, Table, Modal, message, AutoComplete } from "antd";
import { formatDate, projectCodeFormat } from "../../utils";
import Dropdown from "../../common/dropdown";
import Input from "../../common/input";
import DatePickerInput from "../../common/datePickerInput";
import NavigationCard from "../../common/navigationCard";
import EmptyTableView from "../../Views/SupplierRole/Components/emptyTableView";
import { sectionTableHeaders, membersTableHeaders } from "../../utils/tableHeaders";
import { getSections, addNewSection, updateSection, getMembers, addNewMember, deleteMember, updateProject} from "../../services/projectService";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { getCompanyMembers } from "../../services/userService";
import { FetchCurrentCompany } from "../../hooks";
import moment from "moment";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const ProjectDetails = ({ params, loggedUser }) => {
    const [editable, setEditable] = useState(false);
    const [status, setStatus] = useState(params.Status);
    const [closedDate, setClosedDate] = useState(params.ClosedDate);
    const [sectionData, setSectionData] = useState([]);    
    const { t } = useTranslation();

    const changeStateOfProject = (e) => {
        const newProjectData = { ...params };
        newProjectData.Status = e.target.value;
        if (e.target.value.toUpperCase() === "OPEN") {
            newProjectData.closedDate = null;
            setClosedDate(null);
        } else {
            const currentdate = moment().format('YYYY-MM-DD');
            newProjectData.ClosedDate = currentdate;
            setClosedDate(currentdate);
        }
        setStatus(e.target.value);
        updateProject(newProjectData, loggedUser.PartyId )
            .then(() => {
                setStatus(e.target.value);
                message.success("Change status successful");
            })
            .catch(() => {
                message.error("Change status faild please try again");
            });
    };   

    return (
        <>
            <div className="g-row m-t-20 m-b-20 m-l-20">
                <div className="g-col-3 fl body-text">
                    {t("Project ID")}: <strong>{projectCodeFormat(params.Id)}</strong>
                </div>
                <div className="g-col-3 fl body-text">
                    {t("Name")}: <strong>{params.Name}</strong>
                </div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card">
                    <TabPane tab={t("GENERAL")} key="1">
                        <div className="g-row m-l-20 m-r-20 p-a-20">
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Type")}</div>
                                <div className="body-text">{params.TypeCode}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Description")}</div>
                                <div className="body-text">{params.Description}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("From Date")}</div>
                                <div className="body-text m-b-20">{formatDate(params.FromDate)}</div>
                                <div className="body-text-bold m-t-20 p-t-20">{t("Due Date")}</div>
                                <div className="body-text">{formatDate(params.ToDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Closed Date")}</div>
                                <div className="body-text">{formatDate(closedDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Permission Type")}</div>
                                <div className="body-text m-b-20">{params.Permission}</div>
                                <div className="body-text-bold m-t-20 p-t-20">{t("Responsible")}</div>
                                <div className="body-text">{params.Responsible}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Status")}</div>
                                <Dropdown
                                    values={["Open", "Close"]}
                                    onChange={changeStateOfProject}
                                    selected={status?.toUpperCase() === "OPEN" ? "Open" : "Close"}
                                    placeholder="Status"
                                />
                            </div>
                        </div>
                        <i className="icon-edit detail-edit-icon" onClick={() => setEditable((prev) => !prev)}></i>
                    </TabPane>
                    <TabPane tab={t("SECTION")} key="2">
                        <SectionView
                            projectName={params.Name}
                            projectId={projectCodeFormat(params.Id)}
                            id={params.Id}
                            projectToDate={params.ToDate}
                            sectionData={sectionData}
                            setSectionData={setSectionData}
                            projectStatus={status}
                            loggedUser={loggedUser}
                        />
                    </TabPane>
                    <TabPane tab={t("MEMBERS")} key="3">
                        <MembersView
                            id={params.Id}
                            sectionId={params.Sections && params.Sections[0]?.id || ""}
                            sectionData={sectionData}
                            setSectionData={setSectionData}
                            loggedUser={loggedUser}
                            projectStatus={status}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
};

const SectionView = (props) => {
    const { changeActiveTab } = useContext(TabContext);
    const [tableView, setTableView] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newSectionData, setNewSectionData] = useState({
        Name: "",
        Description: "",
        Purpose: "",
        FromDate: "",
        ToDate: "",
        Responsible: "",
        Status: "",
        ProjectId: 0,
        ProjectTId: 0
    });
    const [editData, setEditData] = useState(false);
    const {loggedUser} = props;
    const projectId = props.id;
    const { t } = useTranslation();

    useEffect(() => {
        getSections(props.id).then((data) => {
            props.setSectionData(data || []);
        });
    }, []);

    const tableHeaders = useMemo(() => {
        const headers = sectionTableHeaders.map((a) => {
            return { ...a, title: t(a.title) };
        });

        headers.push({
            title: "",
            render: (_, record) => (
                <>
                    <div
                        className="fl blue border-blue m-t-5 m-r-20 p-x-5 hover-hand"
                        onClick={() => {
                            onClickSection(record);
                        }}
                    >
                        <i className="icon-search serch-table-icon blue" />
                        Search Engine
                    </div>
                    <i
                        className="icon-edit table-icon blue fl"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (props.projectStatus?.toUpperCase() === "CLOSE") {
                                message.error('Cannot edit closed Projects')
                            } else {
                                setEditData(true);
                                setNewSectionData(record);
                                setModalVisible(true);
                            }

                        }}
                    />
                </>
            ),
        });

        return headers;
    }, [props.sectionData, props.projectStatus]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setNewSectionData({});
        setEditData(false);
    };

    const handleOk = () => {
        const newSectionDataUpdate = { ...newSectionData, ClosedDate: newSectionData.Status?.toUpperCase() === "CLOSE" ? moment().format('YYYY-MM-DD') : null };
        const index = props.sectionData.findIndex(sec => sec.Name === newSectionData.Name);

        if (!newSectionData.Name) {
            message.error("Section name cannot be empty");
        } else if (index > -1 && !editData) {
            message.error("Section name already exists");
            return;
        } else {
            if (editData) {
                updateSection(newSectionDataUpdate, loggedUser.PartyId)
                    .then(() => {
                        getSections(props.id)
                            .then((result) => {
                                props.setSectionData(result);
                                message.success("Edit section successful");
                            })
                            .catch(() => {
                                message.warning("Updated data fetch fail please reload");
                            });
                        toggleModal();
                    })
                    .catch(() => {
                        message.error("Edit section failed please try again");
                    });
            } else {
                addNewSection({ ...newSectionDataUpdate, ProjectTId: projectId }, loggedUser.PartyId)
                    .then(() => {
                        getSections(props.id)
                            .then((result) => {
                                props.setSectionData(result);
                                message.success("Create section successful");
                            })
                            .catch(() => {
                                message.warning("Updated data fetch fail please reload");
                            });
                        toggleModal();
                    })
                    .catch(() => {
                        message.error("Create section failed please try again");
                    });
            }
        }
    };

    const onClickSection = (section) => {
        changeActiveTab(NAVIGATION_PAGES.BUYER_PROJECT_SEARCH, {
            proId: props.id,
            projectId: props.projectId,
            projectName: props.projectName,
            sectionId: section.Id,
            sectionName: section.Name,
            projectStatus: props.projectStatus,
            sectionStatus: section.Status,
        });
    };

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewSectionData({ ...newSectionData, [elementName]: e.target.value });
    };

    const onNewElementDateChange = (date, elementName) => {
        setNewSectionData({ ...newSectionData, [elementName]:  moment(date).local().format('YYYY-MM-DD') });
    };

    const onAddSection = () => {
        if (props.projectStatus?.toUpperCase() === "CLOSE") {
            message.error('Cannot edit closed Projects')
        } else {
            toggleModal();
        }
    }

    return (
        <div>
            <h3 className="icon-plus-circled hover-hand m-l-10" onClick={onAddSection}>
                {t("Add Section")}
            </h3>
            <Tooltip title="Tile View">
                <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)}></i>
            </Tooltip>
            <Tooltip title="Grid View">
                <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)}></i>
            </Tooltip>
            <h3 className="p-t-20 m-b-20 m-l-10 fl">{t("Sections List")}</h3>

            {tableView ? (
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
            ) : (
                <div className="g-row">
                    {props.sectionData.length > 0 ? (
                        props.sectionData.map((section, index) => {
                            return (
                                <div key={index}>
                                    <NavigationCard
                                        name={section.Name}
                                        cardColour={"bg-blue-purple"}
                                        value={section.id}
                                        onClick={() => onClickSection(section)}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <EmptyTableView tableName="Sections" onButtonClick={toggleModal} />
                    )}
                </div>
            )}
            <Modal
                title={editData ? "Update Section" :  "Add Section" }
                visible={modalVisible}
                onOk={handleOk}
                okText={t("Save")}
                onCancel={toggleModal}
                cancelText={t("Cancel")}
                centered={true}
                width={1000}
            >
                <div className="g-row">
                    <div className="g-col-6">
                        <Input
                            placeholder="Name (Eg: Furniture, PC, etc...)"
                            value={newSectionData.Name || ""}
                            onChange={(e) => onNewElementChange(e, "Name")}
                        />
                        <Input
                            lines={3}
                            placeholder="Description"
                            value={newSectionData.Description || ""}
                            onChange={(e) => onNewElementChange(e, "Description")}
                        />
                        <Input
                            placeholder="Purpose"
                            value={newSectionData.Purpose || ""}
                            onChange={(e) => onNewElementChange(e, "Purpose")}
                        />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput
                            placeholder={"From Date"}
                            value={newSectionData.FromDate ? new Date(newSectionData.FromDate) : ""}
                            onChange={(date) => onNewElementDateChange(date, "FromDate")}
                            minDate={new Date()}
                            maxDate={props.projectToDate !== null ? new Date(props.projectToDate) : false}
                        />
                        <DatePickerInput
                            placeholder={"Due Date"}
                            value={newSectionData.ToDate ? new Date(newSectionData.ToDate) : ""}
                            onChange={(date) => onNewElementDateChange(date, "ToDate")}
                            minDate={new Date()}
                            maxDate={props.projectToDate !== null ? new Date(props.projectToDate) : false}
                        />
                        <Dropdown
                            values={["Open", "Close"]}
                            onChange={(e) => onNewElementChange(e, "Status")}
                            selected={newSectionData.Status || ""}
                            placeholder="Status"
                        />
                    </div>
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    );
};

const MembersView = (props) => {
    const [tableView, setTableView] = useState(true);
    const [membersData, setMembersData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [addMemberData, setAddMemberData] = useState({
        Name: "",
        Sections: [],
        Responsible: "",
        Email: "",
        ToDate: null,
        Phone: "",
        Company: "",
        Status: "active",
    });

    const [companyUsers, setCompanyUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterdUsers, setFilteredUsers] = useState([]);
    const [text, setText] = useState("");
    const [selectedCompany] = FetchCurrentCompany();
    const {loggedUser} = props;
    const projectId = props.id;

    const { t } = useTranslation();

    const getUsers = async () => {
        const response = await getCompanyMembers();
        setCompanyUsers(response || []);
        const options = response
            ? response.map((user) => {
                return {
                    key: user.PartyId,
                    label: user.Name,
                    value: user.Name,
                    email: user.Email,
                };
            })
            : [];

        setFilteredUsers(options);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const tableHeaders = useMemo(() => {
        const headers = membersTableHeaders.map((a) => {
            return { ...a, title: t(a.title) };
        });

        headers.push({
            title: "",
            render: (_, record) => (
                <>
                    <i
                        className="icon-delete table-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteProjectMember(record);
                        }}
                    />
                </>
            ),
        });

        return headers;
    }, [props.sectionData, membersData]);

    useEffect(() => {
        getSections(props.id).then((data) => {
            props.setSectionData(data || []);
        });
        getMembers(props.id).then((data) => setMembersData(data));
    }, []);

    const toggleModal = () => {
        setAddMemberData({
            Name: "",
            Sections: [],
            Responsible: "",
            Email: "",
            ToDate: null,
            Phone: "",
            Company: "",
            Status: "active",
            PartyId: "",            
            ProjectTId: projectId
        });
        setModalVisible(!modalVisible);
    };

    const addMember = () => {
        if (props.projectStatus?.toUpperCase() === "CLOSE") {
            message.error('Cannot edit closed Projects')
        } else {
            toggleModal();
        }
    };

    const deleteProjectMember = (member) => {       

        deleteMember(member, loggedUser.PartyId)
            .then(() => {
                getMembers(props.id)
                    .then((result) => {
                        setMembersData(result);
                        message.success("Delete member successful");
                    })
                    .catch(() => {
                        message.warning("Updated data fetch fail please reload");
                    });

            })
            .catch(() => {
                message.error("Delete member failed please try again");
            });
    };

    const handleOk = () => {
        //const sectionIds = [];
        //addMemberData.sections.map((val) => sectionIds.push(val.id));

        if (!selectedUser || Object.keys(selectedUser).length === 0) {
            message.warning("Please select a user");
            return;
        }

        const member = {
            ...addMemberData,            
            Name: selectedUser?.value,
            FromDate: moment().toISOString(),
            ToDate: null,
            Email: selectedUser?.email,
            Company: selectedCompany.name,
            PartyId: selectedUser?.key,
            ProjectTId: projectId
        };
       
        console.log(member)
        addNewMember(member, loggedUser.PartyId)
                .then(() => {
                    getMembers(props.id)
                        .then((result) => {
                            setMembersData(result);
                            setSelectedUser({});
                            setText("");
                            setAddMemberData({ Sections: [], Responsible: "", FromDate: "", ToDate: null, Name: "", PartyId: "", Email: "" });
                            message.success(t("Add member successful"));
                        })
                        .catch(() => {
                            message.warning("Updated data fetch fail please reload");
                        });
                    toggleModal();
                })
                .catch(() => {
                    message.error("Add member failed please try again");
                });
       
    };

    const onUserSelect = (value, option) => {
        setSelectedUser(option);
    };

    const onUserChange = (data) => {
        setText(data);
    };

    const onUserSearch = (searchText) => {
        let filtered = [];
        companyUsers.forEach((user) => {
            if (!searchText) {
                filtered.push({
                    key: user.PartyId,
                    label: user.Name,
                    value: user.Name,
                    email: user.Email,
                });
            }
            if (searchText && user.Name.toLowerCase().search(searchText.toLowerCase()) >= 0) {
                filtered.push({
                    key: user.PartyId,
                    label: user.Name,
                    value: user.Name,
                    email: user.Email,
                });
            }
        });
        setFilteredUsers(filtered);
    };

    return (
        <div>
            <h3 className="icon-plus-circled hover-hand m-l-10" onClick={addMember}>
                {t("Add Member")}
            </h3>
            <Tooltip title="Tile View">
                <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)}></i>
            </Tooltip>
            <Tooltip title="Grid View">
                <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)}></i>
            </Tooltip>
            <h3 className="p-t-20 m-b-20 m-l-10 fl">{t("Members List")}</h3>

            {tableView ? (
                <Table
                    rowKey={(record) => record.id}
                    dataSource={membersData}
                    columns={tableHeaders}
                    locale={{ emptyText: <EmptyTableView tableName="Members" onButtonClick={addMember} /> }}
                />
            ) : (
                <div className="g-row">
                    {membersData.length > 0 ? (
                        membersData.map((member, index) => {
                            return (
                                <div key={index}>
                                    <NavigationCard name={member.Name} cardColour={"bg-blue-purple"} value={"name"} />
                                </div>
                            );
                        })
                    ) : (
                        <EmptyTableView tableName="Members" onButtonClick={addMember} />
                    )}
                </div>
            )}
            <Modal title={"Add Member"} visible={modalVisible} onOk={handleOk} okText={t("Add")} onCancel={toggleModal} cancelText={t("Cancel")} centered={true}>
                <div className="g-row">
                    <AutoComplete
                        value={text}
                        options={filterdUsers}
                        onSelect={onUserSelect}
                        onSearch={onUserSearch}
                        onChange={onUserChange}
                        style={{ width: "100%", marginBottom: 10 }}
                        className="mb-2"
                        placeholder="Search User"
                    />
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    );
};

export default ProjectDetails;
