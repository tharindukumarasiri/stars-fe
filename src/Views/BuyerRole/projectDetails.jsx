import React, { useState, useMemo, useContext, useEffect } from "react";
import { Tabs, Tooltip, Table, Modal, message, AutoComplete } from "antd";
import { formatDate } from "../../utils";
import Dropdown from "../../common/dropdown";
import Input from "../../common/input";
import DatePickerInput from "../../common/datePickerInput";
import NavigationCard from "../../common/navigationCard";
import EmptyTableView from "../../Views/SupplierRole/Components/emptyTableView";
import { sectionTableHeaders, membersTableHeaders } from "../../utils/tableHeaders";
import {
    addNewSection,
    getAllMembers,
    addNewMember,
    addMembers,
    editProject,
    getSections,
    editSection,
} from "../../services/operationsService";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { getCompanyMembers } from "../../services/userService";
import { FetchCurrentCompany } from "../../hooks";
import moment from "moment";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const ProjectDetails = ({ params }) => {
    const [editable, setEditable] = useState(false);
    const [status, setStatus] = useState(params.status);
    const [closedDate, setClosedDate] = useState(params.closedDate);
    const [sectionData, setSectionData] = useState([]);
    const { t } = useTranslation();

    const changeStateOfProject = (e) => {
        const newProjectData = { ...params };
        newProjectData.status = e.target.value;
        if (e.target.value.toUpperCase() === "OPEN") {
            newProjectData.closedDate = "0001-01-01T00:00:00Z";
            setClosedDate("0001-01-01T00:00:00Z");
        } else {
            const currentdate = new Date();
            newProjectData.closedDate = currentdate;
            setClosedDate(currentdate);
        }
        setStatus(e.target.value);
        editProject(newProjectData.id, newProjectData)
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
                    {t("Project ID")}: <strong>{params.operationId}</strong>
                </div>
                <div className="g-col-3 fl body-text">
                    {t("Name")}: <strong>{params.name}</strong>
                </div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card">
                    <TabPane tab={t("GENERAL")} key="1">
                        <div className="g-row m-l-20 m-r-20 p-a-20">
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Type")}</div>
                                <div className="body-text">{params.type}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Description")}</div>
                                <div className="body-text">{params.description}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("From Date")}</div>
                                <div className="body-text m-b-20">{formatDate(params.fromDate)}</div>
                                <div className="body-text-bold m-t-20 p-t-20">{t("Due Date")}</div>
                                <div className="body-text">{formatDate(params.toDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Closed Date")}</div>
                                <div className="body-text">{formatDate(closedDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("Permission Type")}</div>
                                <div className="body-text m-b-20">{params.permission}</div>
                                <div className="body-text-bold m-t-20 p-t-20">{t("Responsible")}</div>
                                <div className="body-text">{params.responsible}</div>
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
                            projectName={params.name}
                            projectId={params.operationId}
                            id={params.id}
                            projectToDate={params.toDate}
                            sectionData={sectionData}
                            setSectionData={setSectionData}
                            projectStatus={status}
                        />
                    </TabPane>
                    <TabPane tab={t("MEMBERS")} key="3">
                        <MembersView
                            id={params.id}
                            sectionId={params.sections[0]?.id || ""}
                            sectionData={sectionData}
                            setSectionData={setSectionData}
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
        name: "",
        description: "",
        purpose: "",
        fromDate: "",
        toDate: "",
        responsible: "",
        status: "",
    });
    const [editData, setEditData] = useState(false);
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
    };

    const handleOk = () => {
        const newSectionDataUpdate = { ...newSectionData, closedDate: newSectionData.status?.toUpperCase() === "CLOSE" ? new Date() : '0001-01-01T00:00:00Z' };
        const index = props.sectionData.findIndex(sec => sec.name === newSectionData.name);

        if (!newSectionData.name) {
            message.error("Section name cannot be empty");
        } else if (index > -1) {
            message.error("Section name already exists");
            return;
        } else {
            if (editData) {
                editSection(props.id, newSectionData.id, newSectionDataUpdate)
                    .then(() => {
                        getSections(props.id)
                            .then((result) => {
                                props.setSectionData(result);
                                message.success("Edit section successful");
                            })
                            .catch(() => {
                                message.warning("Updated data fetch fail please reload");
                            });
                        setEditData(false);
                        toggleModal();
                    })
                    .catch(() => {
                        message.error("Edit section failed please try again");
                    });
            } else {
                addNewSection(props.id, newSectionDataUpdate)
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
            sectionId: section.id,
            sectionName: section.name,
            projectStatus: props.projectStatus,
            sectionStatus: section.status,
        });
    };

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewSectionData({ ...newSectionData, [elementName]: e.target.value });
    };

    const onNewElementDateChange = (date, elementName) => {
        setNewSectionData({ ...newSectionData, [elementName]: date });
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
                                        name={section.name}
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
                title={t("Add Section")}
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
                            value={newSectionData.name || ""}
                            onChange={(e) => onNewElementChange(e, "name")}
                        />
                        <Input
                            lines={3}
                            placeholder="Description"
                            value={newSectionData.description || ""}
                            onChange={(e) => onNewElementChange(e, "description")}
                        />
                        <Input
                            placeholder="Purpose"
                            value={newSectionData.purpose || ""}
                            onChange={(e) => onNewElementChange(e, "purpose")}
                        />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput
                            placeholder={"From Date"}
                            value={newSectionData.fromDate ? new Date(newSectionData.fromDate) : ""}
                            onChange={(date) => onNewElementDateChange(date, "fromDate")}
                            minDate={new Date()}
                        />
                        <DatePickerInput
                            placeholder={"Due Date"}
                            value={newSectionData.toDate ? new Date(newSectionData.toDate) : ""}
                            onChange={(date) => onNewElementDateChange(date, "toDate")}
                            minDate={new Date()}
                            maxDate={props.projectToDate !== "0001-01-01T00:00:00Z" ? new Date(props.projectToDate) : false}
                        />
                        <Dropdown
                            values={["Open", "Close"]}
                            onChange={(e) => onNewElementChange(e, "status")}
                            selected={newSectionData.status || ""}
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
        name: "",
        sections: [],
        responsible: "",
        email: "",
        toDate: null,
        phone: "",
        company: "",
        status: "active",
    });

    const [companyUsers, setCompanyUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterdUsers, setFilteredUsers] = useState([]);
    const [text, setText] = useState("");
    const [selectedCompany] = FetchCurrentCompany();

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
                            deleteMember(record);
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
        getAllMembers(props.id).then((data) => setMembersData(data));
    }, []);

    const toggleModal = () => {
        setAddMemberData({
            name: "",
            sections: [],
            responsible: "",
            email: "",
            toDate: null,
            phone: "",
            company: "",
            status: "active",
            partyId: "",
        });
        setModalVisible(!modalVisible);
    };

    const addMember = () => {
        toggleModal();
    };

    const deleteMember = (member) => {
        let members = membersData.filter((m) => m.partyId !== member.partyId);

        addMembers(props.id, members)
            .then(() => {
                getAllMembers(props.id)
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
        const sectionIds = [];
        addMemberData.sections.map((val) => sectionIds.push(val.id));

        if (!selectedUser || Object.keys(selectedUser).length === 0) {
            message.warning("Please select a user");
            return;
        }

        const membersWithId = {
            ...addMemberData,
            sections: sectionIds,
            name: selectedUser?.value,
            fromDate: moment().toISOString(),
            email: selectedUser?.email,
            company: selectedCompany.name,
            partyId: selectedUser?.key,
        };

        let member = membersData.find((m) => m.partyId === selectedUser?.key);
        if (!member) {
            let members = [...membersData, membersWithId];

            addMembers(props.id, members)
                .then(() => {
                    getAllMembers(props.id)
                        .then((result) => {
                            setMembersData(result);
                            setSelectedUser({});
                            setText("");
                            setAddMemberData({ sections: [], responsible: "", fromDate: "", toDate: "", name: "", partyId: "", email: "" });
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
        } else {
            message.warning("Member already added");
        }
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
                                    <NavigationCard name={member.name} cardColour={"bg-blue-purple"} value={"name"} />
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
