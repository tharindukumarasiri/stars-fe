import React, { useState, useMemo, useContext, useEffect } from "react";
import { Tabs, Table, Modal, message, AutoComplete } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from "moment";
import { useTranslation } from "react-i18next";

// import { FetchCompanyUsers } from "../../hooks";
import { useDiagramStore } from './chartDrawingStore'
import { diagramTypes, permissionTypes, statuses } from "./DrawingToolHome";
import { formatDate, getKeyByValue } from "../../utils";
import Dropdown from "../../common/dropdown";
import Input from "../../common/input";
import EmptyTableView from "../SupplierRole/Components/emptyTableView";
import { SavedDiagramsTableHeaders, membersTableHeaders } from "../../utils/tableHeaders";
import { getMembers, deleteMember } from "../../services/projectService";
import DatePickerInput from "../../common/datePickerInput";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { getCompanyMembers } from "../../services/userService";
import { FetchCurrentCompany } from "../../hooks";
import style from './chartDrawingStyle.module.scss'
import { getDrawingMembers, addDrawingMembers } from "../../services/drawingService";

const { TabPane } = Tabs;
const { confirm } = Modal;

const CollectionDetails = ({ props, loggedUser }) => {
    const [editable, setEditable] = useState(false);
    const [sectionData, setSectionData] = useState([]);
    const [newCollectionData, setNewCollectionData] = useState({});

    const loading = useDiagramStore((state) => state.loading);
    const collectionData = useDiagramStore((state) => state.collectionData);
    const filterdContacts = useDiagramStore((state) => state.filterdContacts);
    const editCollection = useDiagramStore((state) => state.editCollection);
    const setCurrentCollectionId = useDiagramStore((state) => state.setCurrentCollectionId);

    const { t } = useTranslation();

    const cuurentCollection = useMemo(() => {
        return collectionData.find(collection => collection.Id === props.Id)
    }, [collectionData])

    useEffect(() => {
        const newCollection = { ...cuurentCollection };
        newCollection.RefTableId = getKeyByValue(diagramTypes, cuurentCollection?.RefTableId);
        newCollection.PermissionType = getKeyByValue(permissionTypes, cuurentCollection?.PermissionType);
        newCollection.Responsible = filterdContacts.find((contact) => contact.key === cuurentCollection?.Responsible);
        setNewCollectionData(newCollection)
    }, [cuurentCollection])

    useEffect(() => {
        setCurrentCollectionId(props.Id)
    }, [props])

    const changeStateOfProject = (e) => {
        e.preventDefault();
        const newCollection = { ...cuurentCollection };
        newCollection.RefRecId = cuurentCollection?.RefRecId === 0 ? 1 : 0
        editCollection(newCollection)
    };

    const getResponsiblePerson = () => {
        const respPerson = filterdContacts.find((contact) => contact.key === cuurentCollection?.Responsible);
        return respPerson?.value
    }

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewCollectionData({ ...newCollectionData, [elementName]: e.target.value })
    }

    const onUserChange = (e, elementName) => {
        e.preventDefault();
        setNewCollectionData({ ...newCollectionData, [elementName]: JSON.parse(e.target.value) })
    }

    const onNewElementDateChange = (date, elementName) => {
        setNewCollectionData({ ...newCollectionData, [elementName]: date })
    }

    const onSave = () => {
        if (newCollectionData.Name !== '') {
            const payload = { ...newCollectionData }

            payload.PermissionType = permissionTypes[newCollectionData.PermissionType]
            payload.RefTableId = diagramTypes[newCollectionData.RefTableId]
            payload.Responsible = newCollectionData.Responsible.key

            editCollection(payload).then((response) => {
                setEditable(false)
                message.success("Changes saved successfully");
            }).catch(() => {
                message.error("Create collection failed");
            })
        }
    }

    const getFormattedState = (str) => {
        return str.charAt(0) + str.slice(1).toLowerCase()
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
            <div className="g-row detail-stripe-tab-top">
                <div className="g-col-3 fl body-text">
                    Collection ID : <strong>{cuurentCollection?.Id}</strong>
                </div>
                <div className="g-col-3 fl body-text">
                    Collection Name :
                    {editable ?
                        <div className="m-t-10">
                            <Input
                                value={newCollectionData?.Name || ''}
                                placeholder='Name'
                                onChange={(e) => onNewElementChange(e, 'Name')} />
                        </div>
                        : <strong>{cuurentCollection?.Name}</strong>
                    }
                </div>
            </div>
            <div className="custom-tab-container">
                <Tabs type="card">
                    <TabPane tab={t("GENERAL").toUpperCase()} key="1">
                        <div className="g-row m-l-20 m-r-20 p-a-20">
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("TYPE")}</div>
                                {editable ?
                                    <div className="m-t-10">
                                        <Dropdown
                                            placeholder="TYPE"
                                            values={Object.keys(diagramTypes)}
                                            onChange={(e) => onNewElementChange(e, 'RefTableId')}
                                            selected={newCollectionData.RefTableId || ''}
                                        />
                                    </div>
                                    : <div className="body-text">{getKeyByValue(diagramTypes, cuurentCollection?.RefTableId)}</div>
                                }
                            </div>
                            <div className="g-col-3">
                                <div className="body-text-bold">{t("DESCRIPTION")}</div>
                                {editable ?
                                    <div className="m-t-10">
                                        <Input
                                            lines={3}
                                            placeholder="DESCRIPTION"
                                            value={newCollectionData.Description || ''}
                                            onChange={(e) => onNewElementChange(e, 'Description')} />
                                    </div>
                                    : <div className="body-text">{cuurentCollection?.Description}</div>
                                }
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("FROM_DATE")}</div>
                                {editable ?
                                    <div className="m-t-10">
                                        <DatePickerInput
                                            placeholder={t('FROM_DATE')}
                                            value={newCollectionData.FromDate ? new Date(newCollectionData.FromDate) : ''}
                                            minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'FromDate')} />
                                    </div>
                                    : <div className="body-text m-b-20">{formatDate(cuurentCollection?.FromDate)}</div>
                                }
                                <div className="body-text-bold m-t-20 p-t-20">{t("DUE_DATE")}</div>
                                {editable ?
                                    <div className="m-t-10">
                                        <DatePickerInput
                                            placeholder={t('DUE_DATE')}
                                            value={newCollectionData.ToDate ? new Date(newCollectionData.ToDate) : ''}
                                            minDate={new Date()}
                                            onChange={(date) => onNewElementDateChange(date, 'ToDate')} />
                                    </div>
                                    : <div className="body-text">{formatDate(cuurentCollection?.ToDate)}</div>
                                }
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold">{t("PERMISSION_TYPE")}</div>
                                {editable ?
                                    <div className="m-t-10">
                                        <Dropdown
                                            values={Object.keys(permissionTypes)}
                                            onChange={(e) => onNewElementChange(e, 'PermissionType')}
                                            selected={newCollectionData.PermissionType || 'PRIVATE'}
                                            placeholder="PERMISSION_TYPE" />
                                    </div>
                                    : <div className="body-text m-b-20">{getFormattedState(getKeyByValue(permissionTypes, cuurentCollection?.PermissionType))}</div>
                                }
                                <div className="body-text-bold m-t-20 p-t-20">{t("RESPONSIBLE")}</div>
                                {editable ?
                                    <div className="m-t-10">
                                        <Dropdown
                                            values={filterdContacts}
                                            dataName="value"
                                            onChange={(e) => onUserChange(e, 'Responsible')}
                                            selected={JSON.stringify(newCollectionData.Responsible || undefined)}
                                            placeholder={"RESPONSIBLE_USER"}
                                        />
                                    </div>
                                    : <div className="body-text">{getResponsiblePerson()}</div>
                                }
                            </div>
                            <div className="g-col-2">
                                <div className="body-text-bold m-b-10">{t("STATUS")}</div>
                                <Dropdown
                                    values={Object.keys(statuses)}
                                    onChange={changeStateOfProject}
                                    selected={getKeyByValue(statuses, cuurentCollection?.RefRecId)}
                                    placeholder={"STATUS"}
                                />
                            </div>
                        </div>
                        {editable ?
                            <button className="primary-btn m-l-10 m-r-20" onClick={onSave}>
                                Save changes
                            </button>
                            : <i className="icon-edit detail-edit-icon" onClick={() => setEditable((prev) => !prev)}></i>
                        }
                    </TabPane>
                    <TabPane tab='DRAWINGS' key="2">
                        <DrawingsList collectionId={props.Id} />
                    </TabPane>
                    <TabPane tab={t("MEMBERS").toUpperCase()} key="3">
                        <MembersView
                            id={props.Id}
                            sectionId={props.Sections && props.Sections[0]?.id || ""}
                            sectionData={sectionData}
                            setSectionData={setSectionData}
                            loggedUser={loggedUser}
                            collectionId={props.Id}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

const DrawingsList = ({ collectionId }) => {
    const { changeActiveTab } = useContext(TabContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [newDrawingName, setNewDrawingName] = useState('')
    const [editDrawingData, setEditDrawingData] = useState(null)
    // const [companyUsers] = FetchCompanyUsers();

    const getDiagramData = useDiagramStore((state) => state.getDiagramData);
    const getUploadedImages = useDiagramStore((state) => state.getUploadedImages);
    const getReferanceData = useDiagramStore((state) => state.getReferanceData);
    const getFormsData = useDiagramStore((state) => state.getFormsData);
    const diagramData = useDiagramStore((state) => state.diagramData);
    const addDiagram = useDiagramStore((state) => state.addDiagram);
    const saveDiagram = useDiagramStore((state) => state.saveDiagram);
    const deleteDiagram = useDiagramStore((state) => state.deleteDiagram);

    const { t } = useTranslation();

    useEffect(() => {
        getDiagramData(collectionId);
        getUploadedImages();
        getReferanceData();
        getFormsData();
    }, []);

    const tableHeaders = useMemo(() => {
        const headers = SavedDiagramsTableHeaders(t);
        headers.push(
            {
                title: 'Created By',
                dataIndex: 'type',
            },
            {
                title: '',
                render: (_, record) => (
                    <div className={style.collectionTableIconRow} >
                        <i className="icon-edit table-icon" onClick={(e) => {
                            e.stopPropagation();
                            toggleModal(record?.Name);
                            setEditDrawingData(record);
                        }} />
                        <i className="icon-delete table-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                showDeleteConfirm(record)
                            }}></i>
                    </div>
                ),
                width: 160,
            },
        )
        return headers
    }, [diagramData])

    const showDeleteConfirm = (record) => {
        confirm({
            title: <strong className="red">{t("ARE_YOU_SURE")}?</strong>,
            icon: <ExclamationCircleOutlined />,

            okText: t('YES'),
            okType: 'danger',
            cancelText: t('NO'),

            onOk() {
                deleteDiagram(record).then(() => {
                    message.success('Delete diagram success');
                }).catch(() => {
                    message.error('Delete diagram failed');
                })
            },

        });
    };

    const toggleModal = (name = '') => {
        setModalVisible(!modalVisible);
        setNewDrawingName(name);
    };

    const handleOk = () => {
        if (newDrawingName !== '') {
            if (!editDrawingData) {
                const payload = {
                    'CollectionId': collectionId,
                    'Name': newDrawingName,
                    'DrawingContent': 'null',
                }
                addDiagram(payload).then((response) => {
                    changeActiveTab(NAVIGATION_PAGES.CHART_DRAWING, response, true, newDrawingName)
                    toggleModal();
                }).catch(() => {
                    message.error("Create drawing failed");
                })
            } else {
                const payload = {
                    'Id': editDrawingData?.Id,
                    'CollectionId': editDrawingData?.CollectionId,
                    'Name': newDrawingName,
                    'DrawingContent': editDrawingData.DrawingContent,
                }
                saveDiagram(payload).then(() => {
                    setEditDrawingData(null)
                    toggleModal();
                }).catch(() => {
                    message.error("Edit drawing failed");
                })
            }


        }
    };

    const onClickRow = (record) => {
        changeActiveTab(NAVIGATION_PAGES.CHART_DRAWING, record, true, record?.Name)
    };


    const onChangeNewDrawingName = (e) => {
        e.preventDefault();
        setNewDrawingName(e.target.value);
    }

    return (
        <div>
            <div className="g-row">
                <div className="g-col-6 m-b-15">
                    <button className="primary-btn" onClick={() => toggleModal()} >Create Drawing</button>
                </div>
            </div>
            <Table
                rowKey={(record) => record.id}
                dataSource={diagramData}
                columns={tableHeaders}
                pagination={false}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => onClickRow(record),
                    };
                }}
            />

            <Modal
                title={editDrawingData ? 'Edit Drawing' : 'Create Drawing'}
                visible={modalVisible}
                onOk={handleOk}
                okText={t("SAVE")}
                onCancel={() => {
                    setEditDrawingData(null);
                    toggleModal();
                }}
                cancelText={t("CANCEL")}
                centered={true}
                width={400}
                closeIcon={< i className='icon-close close-icon' />}
            >
                <div className="g-row">
                    <Input
                        placeholder='Name'
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
    const [membersData, setMembersData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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
                    key: user.Id,
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
        getDrawingMembers(props.collectionId).then((result) => {
            setMembersData(result);
        })
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

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const addMember = () => {
        toggleModal();
    };

    const deleteProjectMember = (member) => {

        deleteMember(member, loggedUser.Id)
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
            MemberId: selectedUser?.key,
            CollectionId: props.collectionId
        };

        addDrawingMembers(loggedUser.Id, member)
            .then(() => {
                getDrawingMembers(props.collectionId).then((result) => {
                    setMembersData(result);
                })
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
                    key: user.Id,
                    label: user.Name,
                    value: user.Name,
                    email: user.Email,
                });
            }
            if (searchText && user.Name.toLowerCase().search(searchText.toLowerCase()) >= 0) {
                filtered.push({
                    key: user.Id,
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
            <h3 className="p-t-20 m-b-20 m-l-10 fl">{t("MEMBERS_LIST")}</h3>

            <Table
                rowKey={(record) => record.id}
                dataSource={membersData}
                columns={tableHeaders}
            />

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
