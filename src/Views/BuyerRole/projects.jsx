import React, { useContext, useEffect, useState, useMemo } from "react";
import { Table, Modal, message, Tooltip, AutoComplete } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Input from "../../common/input";
import Dropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import {getAllProjects, addNewProject, updateProject, deleteProject } from "../../services/projectService";
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
        const headers = projectScreenTableHeaders.map(a => { return { ...a, title: t(a.title) } })
        headers.push({
            title: '',
            render: (_, record) => (
                <>
                    <i className="icon-edit table-icon" onClick={(e) => {
                        e.stopPropagation();
                        if (record.Status === "Open") {
                            toggleModal();
                            setNewProjectData(record);
                            setEditData(true);
                        } else {
                            message.warning('Cannot edit Closed projects ');
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
            title: <>{t("Are you sure")} <strong className="red">{t('delete')}</strong> {t("this Project?")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <div>
                <div className="body-text">{t("All data will be lost on")}</div>
                <div className="body-text">{t("Project ID")}: <strong>{projectCodeFormat(data.Id)}</strong></div>
                <div className="body-text">{t("Name")}: <strong>{data.Name}</strong></div>
            </div>,
            okText: t('Yes'),
            okType: 'danger',
            cancelText: t('No'),

            onOk() {
                deleteProject(data, loggedUser.PartyId).then(() => {
                    getAllProjects().then(result => {
                        setProjectsData(result);
                        message.success(t('Delete project successful'));
                    }).catch(() => {
                        message.warning('Updated data fetch fail please reload');
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
            message.error("project name cannot be empty");
        } else if (index > -1 && !editData) {
            message.error("project name already exists");
            return;
        } else {
            if (editData) {
                
                updateProject(newProjectData, loggedUser.PartyId).then(() => {
                    getAllProjects().then(result => {
                        setProjectsData(result);
                        message.success('Edit project successful');
                    }).catch(() => {
                        message.warning('Updated data fetch fail please reload');
                    })
                    toggleModal();
                })
            } else {                           
                
                addNewProject(newProjectData, loggedUser.PartyId).then(() => {
                    getAllProjects().then(result => {
                        setProjectsData(result);
                        message.success('Create project successful');
                    }).catch(() => {
                        message.warning('Updated data fetch fail please reload');
                    })    
                    toggleModal();
                }).catch(() => {
                    message.error('Create project failed please try again');
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
                <div className="g-col-6"> <h3 className="icon-plus-circled hover-hand fl" onClick={toggleModal} >{t("Create Project")}</h3></div>
                <div className="g-col-6">
                    <Tooltip title="Tile View">
                        <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)} ></i>
                    </Tooltip>
                    <Tooltip title="Grid View">
                        <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)} ></i>
                    </Tooltip>
                </div>
            </div>
            <h3 className="p-t-20 m-b-20 fl">{t("Projects List")}</h3>

            {tableView ?
                <Table
                    rowKey={(record) => record.id}
                    dataSource={projectsData}
                    columns={tableHeaders}
                    pagination={false}
                    locale={{ emptyText: <EmptyTableView tableName="Projects" onButtonClick={toggleModal} /> }}
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
                        }) : <EmptyTableView tableName="Projects" onButtonClick={toggleModal} />
                    }
                </div>
            }
            <Modal
                title={t("Create New Search Project")}
                visible={modalVisible}
                onOk={handleOk}
                okText={t('Save')}
                onCancel={toggleModal}
                cancelText={t("Cancel")}
                centered={true}
                width={1000}
            >
                <div className="g-row">
                    <div className="g-col-6">
                        <Input placeholder="Name (Eg: Furniture, PC, etc...)" value={newProjectData.Name || ''} onChange={(e) => onNewElementChange(e, 'Name')} />
                        <Dropdown values={['Research project', 'Procurement project']} onChange={(e) => onNewElementChange(e, 'TypeCode')} selected={newProjectData.TypeCode || 'Research project'} placeholder="Type" />
                        <Input lines={3} placeholder="Description" value={newProjectData.Description || ''} onChange={(e) => onNewElementChange(e, 'Description')} />
                        <Dropdown values={['Public', 'Private']} onChange={(e) => onNewElementChange(e, 'Permission')} selected={newProjectData.Permission || 'Private'} placeholder="Permission Type" />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput placeholder={'From Date'} value={newProjectData.FromDate ? new Date(newProjectData.FromDate) : ''} minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'FromDate')} />
                        <DatePickerInput placeholder={'Due Date'} value={newProjectData.ToDate ? new Date(newProjectData.ToDate) : ''} minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'ToDate')} />
                        <AutoComplete
                            value={newProjectData.Responsible || ''}
                            options={filterdContacts}
                            onSelect={onContactSelect}
                            onSearch={onContactSearch}
                            onChange={onContactChange}
                            style={{ width: '100%', marginBottom: 10 }}
                            className='mb-2'
                            placeholder={t("Responsible (Users for this Tenant)")} />
                        <Dropdown values={['Open', 'Close']} onChange={(e) => onNewElementChange(e, 'Status')} selected={newProjectData.Status || ''} placeholder="Status" />
                    </div>
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    )

}

export default Projects;