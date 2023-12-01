import React, { useState, useMemo, useContext, useEffect } from "react";
import { Tabs, Tooltip, Table, Modal, message, AutoComplete } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useDiagramStore } from './chartDrawingStore'

import { formatDate, projectCodeFormat } from "../../utils";
import Dropdown from "../../common/dropdown";
import Input from "../../common/input";
import NavigationCard from "../../common/navigationCard";
import EmptyTableView from "../SupplierRole/Components/emptyTableView";
import { SavedDiagramsTableHeaders, membersTableHeaders } from "../../utils/tableHeaders";
import { getSections, getMembers, addNewMember, deleteMember, updateProject } from "../../services/projectService";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { getCompanyMembers } from "../../services/userService";
import { FetchCurrentCompany } from "../../hooks";
import moment from "moment";
import { useTranslation } from "react-i18next";
import style from './chartDrawingStyle.module.scss'

const { TabPane } = Tabs;
const { confirm } = Modal;

const CollectionDetails = ({ props, loggedUser }) => {
    // const [editable, setEditable] = useState(false);
    const [status, setStatus] = useState(props?.Status);
    const [closedDate, setClosedDate] = useState(props.ClosedDate);
    const [sectionData, setSectionData] = useState([]);
    const { t } = useTranslation();

    const changeStateOfProject = (e) => {
        const newProjectData = { ...props };
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
        updateProject(newProjectData, loggedUser.PartyId)
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
                    Collection ID : <strong>{projectCodeFormat(props.Id)}</strong>
                </div>
                <div className="g-col-3 fl body-text">
                    Collection Name : <strong>{props.Name}</strong>
                </div>
                <div className="g-col-3 fl body-text">
                    Responsible : <strong>{props.Name}</strong>
                </div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card">
                    <TabPane tab={t("GENERAL").toUpperCase()} key="1">
                        <div className="g-row m-l-20 m-r-20 p-a-20">
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("TYPE")}</div>
                                <div className="body-text">{props.TypeCode}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("DESCRIPTION")}</div>
                                <div className="body-text">{props.Description}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("FROM_DATE")}</div>
                                <div className="body-text m-b-20">{formatDate(props.FromDate)}</div>
                                <div className="body-text-bold m-t-20 p-t-20">{t("DUE_DATE")}</div>
                                <div className="body-text">{formatDate(props.ToDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("CLOSED_DATE")}</div>
                                <div className="body-text">{formatDate(closedDate)}</div>
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("PERMISSION_TYPE")}</div>
                                <div className="body-text m-b-20">{props.Permission}</div>
                                <div className="body-text-bold m-t-20 p-t-20">{t("RESPONSIBLE")}</div>
                                <div className="body-text">{props.Responsible}</div>
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
                    <TabPane tab='DRAWINGS' key="2">
                        <DrawingsList
                            projectName={props.Name}
                            projectId={projectCodeFormat(props.Id)}
                            id={props.Id}
                            projectToDate={props.ToDate}
                            sectionData={sectionData}
                            setSectionData={setSectionData}
                            projectStatus={status}
                            loggedUser={loggedUser}
                        />
                    </TabPane>
                    <TabPane tab={t("MEMBERS").toUpperCase()} key="3">
                        <MembersView
                            id={props.Id}
                            sectionId={props.Sections && props.Sections[0]?.id || ""}
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

const DrawingsList = (props) => {
    const { changeActiveTab } = useContext(TabContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [newDrawingName, setNewDrawingName] = useState('')

    const diagramData = useDiagramStore((state) => state.diagramData);

    const { t } = useTranslation();

    useEffect(() => {
        getSections(props.id).then((data) => {
            props.setSectionData(data || []);
        });
    }, []);

    const tableHeaders = useMemo(() => {
        const headers = SavedDiagramsTableHeaders(t);
        headers.push({
            title: '',
            render: (_, { }) => (
                <div className={style.collectionTableIconRow} >
                    <i className="icon-edit table-icon" ></i>
                    <i className="icon-delete table-icon" onClick={onClickDeletCollection}></i>
                </div>
            ),
            width: 160,
        },
        )
        return headers
    }, [diagramData])

    const onClickDeletCollection = (e) => {
        e.stopPropagation();
        showDeleteConfirm();
    }

    const showDeleteConfirm = (record, user) => {
        confirm({
            title: <strong className="red">{t("ARE_YOU_SURE")}?</strong>,
            icon: <ExclamationCircleOutlined />,

            okText: t('YES'),
            okType: 'danger',
            cancelText: t('NO'),

            onOk() {

            },

        });
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setNewDrawingName('');
    };

    const handleOk = () => {
        if (newDrawingName !== '') {
            changeActiveTab(NAVIGATION_PAGES.CHART_DRAWING, { name: newDrawingName }, true, newDrawingName)
            toggleModal();
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


    const onChangeNewDrawingName = (e) => {
        e.preventDefault();
        setNewDrawingName(e.target.value);
    }

    return (
        <div>
            <div className="g-row">
                <div className="g-col-6 m-b-15">
                    <div className="primary-btn" onClick={toggleModal} >Create Drawing</div>
                </div>
            </div>
            <Table
                rowKey={(record) => record.id}
                dataSource={diagramData}
                columns={tableHeaders}
                pagination={false}
                locale={{ emptyText: <EmptyTableView tableName="Drawings" onButtonClick={toggleModal} /> }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => onClickSection(record),
                    };
                }}
            />

            <Modal
                title='Create  Drawing'
                visible={modalVisible}
                onOk={handleOk}
                okText={t("SAVE")}
                onCancel={toggleModal}
                cancelText={t("CANCEL")}
                centered={true}
                width={400}
                closeIcon={< i className='icon-close close-icon' />}
            >
                <div className="g-row">
                    <Input
                        placeholder={t('NAME_PLACEhOLDER')}
                        value={newDrawingName}
                        onChange={onChangeNewDrawingName}
                    />
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
    const { loggedUser } = props;
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
            <div className="fl">
                <div className="primary-btn" onClick={addMember} ><i className="icon-plus-circled"></i>{t("ADD_MEMBER")}</div>
            </div>
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
                closeIcon={< i className='icon-close close-icon' />}>
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

export default CollectionDetails;
