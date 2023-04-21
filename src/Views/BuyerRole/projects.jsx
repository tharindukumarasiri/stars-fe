import React, { useContext, useEffect, useState, useMemo } from "react";
import { Table, Modal, message, Tooltip, AutoComplete } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Input from "../../common/input";
import Dropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import { getAllProjects, addNewProject, updateProject, deleteProject } from "../../services/projectService";
import { getContacts } from "../../services/userService";
import { projectScreenTableHeaders } from "../../utils/tableHeaders"
import NavigationCard from "../../common/navigationCard"
import { NAVIGATION_PAGES } from "../../utils/enums";
import { TabContext } from "../../utils/contextStore";
import EmptyTableView from "../../Views/SupplierRole/Components/emptyTableView";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { projectCodeFormat } from "../../utils";
const { confirm } = Modal;

const Projects = (props) => {
    const { changeActiveTab } = useContext(TabContext)
    const [projectsData, setProjectsData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [tableView, setTableView] = useState(true)
    const [newProjectData, setNewProjectData] = useState({ Name: '', TypeCode: 'Research project', Description: '', Permission: 'Private', FromDate: '', ToDate: '', Responsible: '', Status: '' });
    const [editData, setEditData] = useState(false);
    const [loading, setLoading] = useState(false);
    const { loggedUser } = props;

    const [companyContacts, setCompanyContacts] = useState([]);
    const [filterdContacts, setFilteredContacts] = useState([]);
    const { t } = useTranslation();

    const tableHeaders = useMemo(() => {
        const headers = projectScreenTableHeaders(t);
        headers.push({
            title: '',
            render: (_, record) => (
                <>
                    <i className="icon-edit table-icon" onClick={(e) => {
                        e.stopPropagation();
                        if (record.Status.toUpperCase() === "OPEN") {
                            toggleModal();
                            setNewProjectData(record);
                            setEditData(true);
                        } else {
                            message.warning(t('MSG_CANNOT_EDIT_CLOSED_PROJECT'));
                        }

                    }}></i>
                    <i className="icon-delete table-icon" onClick={(e) => {
                        e.stopPropagation();
                        showDeleteConfirm(record)
                    }}></i>
                    <i className="icon-circle-arrow-r2 table-icon blue"></i>
                </>
            )
        })

        return headers

    }, [projectsData])

    useEffect(() => {
        setLoading(true);

        getAllProjects().then(result => {
            setProjectsData(result);
            setLoading(false);
        });

        getContactsList();
    }, []);

    const showDeleteConfirm = (data) => {
        confirm({
            title: <>{t("ARE_YOU_SURE")} <strong className="red">{t('DELETE')}</strong> {t("THIS_PROJECT")}?</>,
            icon: <ExclamationCircleOutlined />,
            content: <div>
                <div className="body-text">{t("ALL_DATA_WILLBE_LOST")}</div>
                <div className="body-text">{t("PROJECT_ID")}: <strong>{projectCodeFormat(data.Id)}</strong></div>
                <div className="body-text">{t("NAME")}: <strong>{data.Name}</strong></div>
            </div>,
            okText: t('YES'),
            okType: 'danger',
            cancelText: t('NO'),

            onOk() {
                deleteProject(data, loggedUser.PartyId).then(() => {
                    getAllProjects().then(result => {
                        setProjectsData(result);
                        message.success(t('MSG_DELETE_PROJECT_SUCCESS'));
                    }).catch(() => {
                        message.warning(t('MSG_DELETE_PROJECT_FAIL'));
                    });
                })
            },

        });
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setNewProjectData({ Name: '', TypeCode: 'Research project', Description: '', Permission: 'Private', FromDate: '', ToDate: '', Responsible: '', Status: '' })
        setEditData(false)
    };

    const handleOk = () => {
        const index = projectsData.findIndex(sec => sec.name === newProjectData.Name);

        if (!newProjectData.Name) {
            message.error(t('MSG_PROJECT_NAME_CANNOT_BE_EMPTY'));
        } else if (index > -1 && !editData) {
            message.error(t('MSG_PROJECT_NAME_ALREADY_EXISTS'));
            return;
        } else {
            if (editData) {

                updateProject(newProjectData, loggedUser.PartyId).then(() => {
                    getAllProjects().then(result => {
                        setProjectsData(result);
                        message.success(t('MSG_EDIT_PROJECT_SUCCESS'));
                    }).catch(() => {
                        message.warning(t('MSG_EDIT_PROJECT_FAIL'));
                    })
                    toggleModal();
                })
            } else {

                addNewProject(newProjectData, loggedUser.PartyId).then(() => {
                    getAllProjects().then(result => {
                        setProjectsData(result);
                        message.success(t('MSG_CREATE_PROJECT_SUCCESS'));
                    }).catch(() => {
                        message.warning(t('MSG_CREATE_PROJECT_FAIL'));
                    })
                    toggleModal();
                }).catch(() => {
                    message.error(t('MSG_CREATE_PROJECT_FAIL'));
                })
            }
        }
    };

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewProjectData({ ...newProjectData, [elementName]: e.target.value })
    }

    const onNewElementDateChange = (date, elementName) => {
        setNewProjectData({ ...newProjectData, [elementName]: moment(date).local().format('YYYY-MM-DD') })
    }

    const onClickProject = (params) => {
        changeActiveTab(NAVIGATION_PAGES.BUYER_PROJECT_DETAILS, params)
    }
    const getContactsList = async () => {
        const response = await getContacts();
        setCompanyContacts(response || []);
        const options = response ? response.map((user) => {
            return {
                key: user.PartyTId,
                label: user.Name,
                value: user.Name
            };
        }) : [];

        setFilteredContacts(options);
    };

    const onContactSelect = (value, option) => {
        setNewProjectData({ ...newProjectData, Responsible: value });
    };

    const onContactChange = (data) => {
        setNewProjectData({ ...newProjectData, Responsible: data });
    };

    const onContactSearch = (searchText) => {
        let filtered = [];
        companyContacts.forEach((user) => {
            if (!searchText) {
                filtered.push({
                    key: user.PartyTId,
                    label: user.Name,
                    value: user.Name,
                });
            }
            if (searchText && user.Name.toLowerCase().search(searchText.toLowerCase()) >= 0) {
                filtered.push({
                    key: user.PartyTId,
                    label: user.Name,
                    value: user.Name,
                });
            }
        })
        setFilteredContacts(filtered);
    };

    return (
        <div className={loading && 'loading-overlay'}>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <div className="g-row">
                <div className="g-col-6"> <h3 className="icon-plus-circled hover-hand fl" onClick={toggleModal} >{t("CREATE_PROJECT")}</h3></div>
                <div className="g-col-6">
                    <Tooltip title={t('TILE_VIEW')}>
                        <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)} ></i>
                    </Tooltip>
                    <Tooltip title={t('GRID_VIEW')}>
                        <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)} ></i>
                    </Tooltip>
                </div>
            </div>
            <h3 className="p-t-20 m-b-20 fl">{t("PROJECT_LIST")}</h3>

            {tableView ?
                <Table
                    rowKey={(record) => record.id}
                    dataSource={projectsData}
                    columns={tableHeaders}
                    pagination={false}
                    locale={{ emptyText: <EmptyTableView tableName={t('PROJECTS')} onButtonClick={toggleModal} /> }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => onClickProject(record),
                        };
                    }}
                />
                : <div className="g-row">
                    {projectsData.length > 0 ?
                        projectsData.map((project, index) => {
                            return (
                                <div key={index}>
                                    <NavigationCard name={project.Name} cardColour={"bg-blue-purple"} value={project.Id} onClick={() => onClickProject(project)} />
                                </div>
                            )
                        }) : <EmptyTableView tableName={t('PROJECTS')} onButtonClick={toggleModal} />
                    }
                </div>
            }
            <Modal
                title={t("CREATE_NEW_SEARCH_PROJECT")}
                visible={modalVisible}
                onOk={handleOk}
                okText={t('SAVE')}
                onCancel={toggleModal}
                cancelText={t("CANCEL")}
                centered={true}
                width={1000}
                closeIcon={< i className='icon-close close-icon' />}
            >
                <div className="g-row">
                    <div className="g-col-6">
                        <Input placeholder="NAME_PLACEhOLDER" value={newProjectData.Name || ''} onChange={(e) => onNewElementChange(e, 'Name')} />
                        <Dropdown values={['RESEARCH_PROJECT', 'PROCUREMENT_PROJECT']} onChange={(e) => onNewElementChange(e, 'TypeCode')} selected={newProjectData.TypeCode || 'RESEARCH_PROJECT'} placeholder="TYPE" />
                        <Input lines={3} placeholder="DESCRIPTION" value={newProjectData.Description || ''} onChange={(e) => onNewElementChange(e, 'Description')} />
                        <Dropdown values={['PUBLIC', 'PRIVATE']} onChange={(e) => onNewElementChange(e, 'Permission')} selected={newProjectData.Permission || 'PRIVATE'} placeholder="PERMISSION_TYPE" />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput placeholder={t('FROM_DATE')} value={newProjectData.FromDate ? new Date(newProjectData.FromDate) : ''} minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'FromDate')} />
                        <DatePickerInput placeholder={t('DUE_DATE')} value={newProjectData.ToDate ? new Date(newProjectData.ToDate) : ''} minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'ToDate')} />
                        {/* <AutoComplete
                            value={newProjectData.Responsible || ''}
                            options={filterdContacts}
                            onSelect={onContactSelect}
                            onSearch={onContactSearch}
                            onChange={onContactChange}
                            style={{ width: '100%', marginBottom: 10 }}
                            className='mb-2'
                            placeholder={t("Responsible (Users for this Tenant)")} /> */}
                        <Dropdown
                            values={filterdContacts.map(a => a.label)}
                            onChange={(e) => onNewElementChange(e, 'Responsible')}
                            selected={newProjectData.Responsible || ''}
                            placeholder={"RESPONSIBLE_USER"}
                        />
                        <Dropdown values={['OPEN', 'CLOSE']} onChange={(e) => onNewElementChange(e, 'Status')} selected={newProjectData.Status || ''} placeholder="STATUS" />
                    </div>
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    )

}

export default Projects;