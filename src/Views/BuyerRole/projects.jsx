import React, { useContext, useEffect, useState, useMemo } from "react";
import { Table, Modal, message, Tooltip, AutoComplete } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Input from "../../common/input";
import Dropdown from "../../common/dropdown";
import DatePickerInput from "../../common/datePickerInput";
import { getAllProjects, addNewProject, editProject, deleteProject } from "../../services/operationsService"
import { getContacts } from "../../services/userService";
import { projectScreenTableHeaders } from "../../utils/constants"
import NavigationCard from "../../common/navigationCard"
import { NAVIGATION_PAGES } from "../../utils/enums";
import { TabContext } from "../../utils/contextStore";
import EmptyTableView from "../../Views/SupplierRole/Components/emptyTableView";
import { useTranslation } from "react-i18next";
const { confirm } = Modal;

const Projects = () => {
    const { changeActiveTab } = useContext(TabContext)
    const [projectsData, setProjectsData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [tableView, setTableView] = useState(true)
    const [newProjectData, setNewProjectData] = useState({ name: '', type: '', description: '', permission: '', fromDate: '', toDate: '', responsible: '', status: '' });
    const [editData, setEditData] = useState(false);
    const [loading, setLoading] = useState(false);

    const [companyContacts, setCompanyContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [filterdContacts, setFilteredContacts] = useState([]);
    const [contactName, setContactName] = useState('');
    const { t } = useTranslation();

    const tableHeaders = useMemo(() => {
        const headers = projectScreenTableHeaders.map(a => { return { ...a, title: t(a.title) } })
        headers.push({
            title: '',
            render: (_, record) => (
                <>
                    <i className="icon-edit table-icon" onClick={(e) => {
                        e.stopPropagation();
                        if (record.status === "Open") {
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
                <div className="body-text">{t("Project ID")}: <strong>{data.operationId}</strong></div>
                <div className="body-text">{t("Name")}: <strong>{data.name}</strong></div>
            </div>,
            okText: t('Yes'),
            okType: 'danger',
            cancelText: t('No'),

            onOk() {
                deleteProject(data.id).then(() => {
                    getAllProjects().then(result => {
                        setProjectsData(result);
                        message.success(t('Delete project successful'));
                    }).catch(() => {
                        message.warning('Updated data fetch fail please reload');
                    })
                })
            },

        });
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        setNewProjectData({})
    };

    const handleOk = () => {
        if (editData) {
            editProject(newProjectData.id, newProjectData).then(() => {
                getAllProjects().then(result => {
                    setProjectsData(result);
                    message.success('Edit project successful');
                }).catch(() => {
                    message.warning('Updated data fetch fail please reload');
                })
                setEditData(false);
                toggleModal();
            })
        } else {
            addNewProject(newProjectData).then(() => {
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
    };

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewProjectData({ ...newProjectData, [elementName]: e.target.value })
    }

    const onNewElementDateChange = (date, elementName) => {
        setNewProjectData({ ...newProjectData, [elementName]: date })
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
        setSelectedContact(option);
        setNewProjectData({ ...newProjectData, responsible: value });
    };

    const onContactChange = (data) => {
        setContactName(data);
        setNewProjectData({ ...newProjectData, responsible: data });
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
        <div>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            <h3 className="icon-plus-circled hover-hand" onClick={toggleModal} >{t("Create Project")}</h3>
            <Tooltip title="Tile View">
                <i className="icon-tile-view grid-view-icon fr hover-hand" onClick={() => setTableView(false)} ></i>
            </Tooltip>
            <Tooltip title="Grid View">
                <i className="icon-grid-view list-view-icon fr hover-hand" onClick={() => setTableView(true)} ></i>
            </Tooltip>
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
                                    <NavigationCard name={project.name} cardColour={"bg-blue-purple"} value={project.operationId} onClick={() => onClickProject(project)} />
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
                        <Input placeholder="Name (Eg: Furniture, PC, etc...)" value={newProjectData.name || ''} onChange={(e) => onNewElementChange(e, 'name')} />
                        <Dropdown values={['Resarch project', 'Procurement project']} onChange={(e) => onNewElementChange(e, 'type')} selected={newProjectData.type || ''} placeholder="Type" />
                        <Input lines={3} placeholder="Description" value={newProjectData.description || ''} onChange={(e) => onNewElementChange(e, 'description')} />
                        <Dropdown values={['Public', 'Private']} onChange={(e) => onNewElementChange(e, 'permission')} selected={newProjectData.permission || ''} placeholder="Permission Type" />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput placeholder={'From Date'} value={newProjectData.fromDate ? new Date(newProjectData.fromDate) : ''} minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'fromDate')} />
                        <DatePickerInput placeholder={'Due Date'} value={newProjectData.toDate ? new Date(newProjectData.toDate) : ''} minDate={new Date()} onChange={(date) => onNewElementDateChange(date, 'toDate')} />
                        <AutoComplete
                            value={newProjectData.responsible || ''}
                            options={filterdContacts}
                            onSelect={onContactSelect}
                            onSearch={onContactSearch}
                            onChange={onContactChange}
                            style={{ width: '100%', marginBottom: 10 }}
                            className='mb-2'
                            placeholder={t("Responsible (Users for this Tenant)")} />
                        <Dropdown values={['Open', 'Close']} onChange={(e) => onNewElementChange(e, 'status')} selected={newProjectData.status || ''} placeholder="Status" />
                    </div>
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    )

}

export default Projects;