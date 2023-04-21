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
    // const [editable, setEditable] = useState(false);
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
                message.success(t('MSG_CHANGE_STATUS_SUCCESS'));
            })
            .catch(() => {
                message.error(t('MSG_CHANGE_STATUS_FAIL'));
            });
    };   

    return (
        <>
            <div className="g-row detail-stripe-tab-top">
                <div className="g-col-3 fl body-text">
                    {t("PROJECT_ID")}: <strong>{projectCodeFormat(params.Id)}</strong>
                </div>
                <div className="g-col-3 fl body-text">
                    {t("NAME")}: <strong>{params.Name}</strong>
                </div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card">
                    <TabPane tab={t("GENERAL").toUpperCase()} key="1">
                        <div className="g-row m-l-20 m-r-20 p-a-20">
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("TYPE")}</div>
                                <div className="body-text">{params.TypeCode}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("DESCRIPTION")}</div>
                                <div className="body-text">{params.Description}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("FROM_DATE")}</div>
                                <div className="body-text m-b-20">{formatDate(params.FromDate)}</div>
                                <div className="body-text-bold m-t-20 p-t-20">{t("DUE_DATE")}</div>
                                <div className="body-text">{formatDate(params.ToDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("CLOSED_DATE")}</div>
                                <div className="body-text">{formatDate(closedDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("PERMISSION_TYPE")}</div>
                                <div className="body-text m-b-20">{params.Permission}</div>
                                <div className="body-text-bold m-t-20 p-t-20">{t("RESPONSIBLE")}</div>
                                <div className="body-text">{params.Responsible}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold m-b-10">{t("STATUS")}</div>
                                <Dropdown
                                    values={["OPEN", "CLOSE"]}
                                    onChange={changeStateOfProject}
                                    selected={status?.toUpperCase() === "OPEN" ? "OPEN" : "CLOSE"}
                                    placeholder={"STATUS"}
                                />
                            </div>
                        </div>
                        {/* <i className="icon-edit detail-edit-icon" onClick={() => setEditable((prev) => !prev)}></i> */}
                    </TabPane>
                    <TabPane tab={t("SECTION").toUpperCase()} key="2">
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
                    <TabPane tab={t("MEMBERS").toUpperCase()} key="3">
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
        const headers = sectionTableHeaders(t);

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
                        { t('SEARCH_ENGINE')}
                    </div>
                    <i
                        className="icon-edit table-icon blue fl"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (props.projectStatus?.toUpperCase() === "CLOSE") {
                                message.error(t('MSG_CANT_EDIT_CLOSED_PROJECTS'))
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
            message.error(t("MSG_SECTION_NAME_EMPTY"));
        } else if (index > -1 && !editData) {
            message.error(t("MSG_SECTION_NAME_EXISTS"));
            return;
        } else {
            if (editData) {
                updateSection(newSectionDataUpdate, loggedUser.PartyId)
                    .then(() => {
                        getSections(props.id)
                            .then((result) => {
                                props.setSectionData(result);
                                message.success(t("MSG_SECTION_SAVE_SUCCESS"));
                            })
                            .catch(() => {
                                message.warning(t("MSG_SECTION_SAVE_WARNING"));
                            });
                        toggleModal();
                    })
                    .catch(() => {
                        message.error(t("MSG_SECTION_SAVE_FAIL"));
                    });
            } else {
                addNewSection({ ...newSectionDataUpdate, ProjectTId: projectId }, loggedUser.PartyId)
                    .then(() => {
                        getSections(props.id)
                            .then((result) => {
                                props.setSectionData(result);
                                message.success(t('MSG_SECTION_SAVE_SUCCESS'));
                            })
                            .catch(() => {
                                message.warning(t('MSG_SECTION_SAVE_WARNING'));
                            });
                        toggleModal();
                    })
                    .catch(() => {
                        message.error(t('MSG_SECTION_SAVE_FAIL'));
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
            message.error(t('MSG_CANT_EDIT_CLOSED_PROJECTS'))
        } else {
            toggleModal();
        }
    }

    return (
        <div>
            <div className="g-row">
                <div className="g-col-6">
                    <h3 className="icon-plus-circled hover-hand m-l-10 fl" onClick={onAddSection}>
                        {t("ADD_SECTION")}
                    </h3>
                </div>
                <div className="g-col-6">
                    <Tooltip title={t('TILE_VIEW')}>
                        <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)}></i>
                    </Tooltip>
                    <Tooltip title={t('GRID_VIEW')}>
                        <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)}></i>
                    </Tooltip>
                </div>
            </div>
            <h3 className="p-t-20 m-b-20 m-l-10 fl">{t("SECTION_LIST")}</h3>

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
                title={editData ? t('UPDATE_SECTION') :  t('ADD_SECTION') }
                visible={modalVisible}
                onOk={handleOk}
                okText={t("SAVE")}
                onCancel={toggleModal}
                cancelText={t("CANCEL")}
                centered={true}
                width={1000}
                closeIcon={< i className='icon-close close-icon'/>}
            >
                <div className="g-row">
                    <div className="g-col-6">
                        <Input
                            placeholder={t('NAME_PLACEhOLDER')}
                            value={newSectionData.Name || ""}
                            onChange={(e) => onNewElementChange(e, "Name")}
                        />
                        <Input
                            lines={3}
                            placeholder={t('DESCRIPTION')}
                            value={newSectionData.Description || ""}
                            onChange={(e) => onNewElementChange(e, "Description")}
                        />
                        <Input
                            placeholder={t('PURPOSE')}
                            value={newSectionData.Purpose || ""}
                            onChange={(e) => onNewElementChange(e, "Purpose")}
                        />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput
                            placeholder={t('FROM_DATE')}
                            value={newSectionData.FromDate ? new Date(newSectionData.FromDate) : ""}
                            onChange={(date) => onNewElementDateChange(date, "FromDate")}
                            minDate={new Date()}
                            maxDate={props.projectToDate !== null ? new Date(props.projectToDate) : false}
                        />
                        <DatePickerInput
                            placeholder={t('DUE_DATE')}
                            value={newSectionData.ToDate ? new Date(newSectionData.ToDate) : ""}
                            onChange={(date) => onNewElementDateChange(date, "ToDate")}
                            minDate={new Date()}
                            maxDate={props.projectToDate !== null ? new Date(props.projectToDate) : false}
                        />
                        <Dropdown
                            values={["OPEN", "CLOSE"]}
                            onChange={(e) => onNewElementChange(e, "Status")}
                            selected={newSectionData.Status || ""}
                            placeholder={'STATUS'}
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
        const headers = membersTableHeaders(t)

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
            message.error(t('MSG_CANT_EDIT_CLOSED_PROJECTS'))
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
                        message.success(t('MSG_DELETE_MEMBER_SUCESS'));
                    })
                    .catch(() => {
                        message.warning(t('MSG_DELETE_MEMBER_WARNING'));
                    });

            })
            .catch(() => {
                message.error(t('MSG_DELETE_MEMBER_FAIL'));
            });
    };

    const handleOk = () => {
        //const sectionIds = [];
        //addMemberData.sections.map((val) => sectionIds.push(val.id));

        if (!selectedUser || Object.keys(selectedUser).length === 0) {
            message.warning(t('MSG_SELECT_USER'));
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
               
        addNewMember(member, loggedUser.PartyId)
                .then(() => {
                    getMembers(props.id)
                        .then((result) => {
                            setMembersData(result);
                            setSelectedUser({});
                            setText("");
                            setAddMemberData({ Sections: [], Responsible: "", FromDate: "", ToDate: null, Name: "", PartyId: "", Email: "" });
                            message.success(t("MSG_ADD_MEMBER_SUCCESS"));
                        })
                        .catch(() => {
                            message.warning(t("MSG_ADD_MEMBER_WARNING"));
                        });
                    toggleModal();
                })
                .catch(() => {
                    message.error(t("MSG_ADD_MEMBER_FAIL"));
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
                {t("ADD_MEMBER")}
            </h3>
            <Tooltip title={t('TILE_VIEW')}>
                <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)}></i>
            </Tooltip>
            <Tooltip title={t('GRID_VIEW')}>
                <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)}></i>
            </Tooltip>
            <h3 className="p-t-20 m-b-20 m-l-10 fl">{t("MEMBERS_LIST")}</h3>

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
                        <EmptyTableView tableName={t("MEMBERS")} onButtonClick={addMember} />
                    )}
                </div>
            )}
            <Modal title={t('ADD_MEMBER')} 
            visible={modalVisible} 
            onOk={handleOk} 
            okText={t("ADD")} 
            onCancel={toggleModal} 
            cancelText={t("CANCEL")} 
            centered={true}
            closeIcon={< i className='icon-close close-icon'/>}>
                <div className="g-row">
                    <AutoComplete
                        value={text}
                        options={filterdUsers}
                        onSelect={onUserSelect}
                        onSearch={onUserSearch}
                        onChange={onUserChange}
                        style={{ width: "100%", marginBottom: 10 }}
                        className="mb-2"
                        placeholder={t('SEARCH_USER')}
                    />
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    );
};

export default ProjectDetails;
