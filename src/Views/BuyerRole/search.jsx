import React, { useState, useEffect, useContext, useMemo } from "react";
import { message, Pagination, Modal, Tooltip, Menu, Dropdown as AntDropdown } from "antd";
import { levelOneReq, nacSectionReq, numberOfEmployeesList } from "../../utils/constants";
import gb_flag from "../../assets/images/gb_flag.png";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
    getNutsCodes,
    getNutsCodesByParent,
    searchOrganization,
    getUnspscCodes,
    getCpvCodes,
    getNacCodes,
    addNewSearchResult,
    searchOrganizationByCPV,
    searchOrganizationByNACE,
    searchOrganizationByUNSPSC,
    searchOrganizationMunicipality,
    removeSearch,
    deleteSearch,
    removeSearchAccumulateCpv,
    removeSearchAccumulateNace,
    removeSearchAccumulateUNSPSC,
    getOrganizationTypes,
    removeSearchAccumulateMunicipality,
} from "../../services/organizationsService";
import { getAllProjects, addNewSection, addNewProject } from "../../services/projectService";
import { getContacts } from "../../services/userService";
import DropdownList from "./Components/dropdownList";
import Dropdown from "./Components/dropdown";
import DropdownSelect from "../../common/dropdown";
import SearchSelectedValues from "./Components/searchSelectedValues";
import DatePickerInput from "../../common/datePickerInput";
import { useTranslation } from "react-i18next";
import Input from "../../common/input";
import moment from "moment";

const { confirm } = Modal;

const pageSize = 10;

let noSearchResults = false;

export default function Search(props) {
    const [openCriteria, setOpenCriteria] = useState({
        Grouping: false,
        CompanyInfo: false,
        Market: false,
        ProductGroups: false,
        Profession: false,
        CreditTerms: false,
        Peppol: false,
    });
    const [searchText, setSerachText] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [grouping, setGrouping] = useState({});

    // Data from back-end
    const [marketInformationData, setMarketInformationData] = useState({ countries: [], regions: [], cities: [], municipalities: [] });
    const [unspscData, setUnspscData] = useState({ segmant: [], family: [], unspClass: [], comClass: [] });
    const [cpvData, setCpvData] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] });
    const [professionData, setProfessionData] = useState({ section: [], divition: [], profGroup: [], profClass: [] });
    const [organizationTypes, setOrganizationTypes] = useState([]);
    const [projectsData, setProjectsData] = useState([])
    // Drop Down selected eliments data
    const [selectedCompanyInfo, setSelectedCompanyInfo] = useState({
        registrationFromDate: null,
        registrationToDate: null,
        incorpFromDate: null,
        active: true,
        incorpToDate: null,
        noOfEmployees: "",
        organizationId: "",
        sectorCode: "",
        organizationType: {},
    });
    const [selectedMarketCriteria, setSelectedMarketCriteria] = useState({
        selectedCountries: [],
        selectedRegions: [],
        selectedCities: [],
        selectedMunicipalities: [],
    });
    const [selectedMarketHierarchy, setSelectedMarketHierarchy] = useState([[]]);
    const [selectedUNSPValues, setSelectedUNSPValues] = useState([[[]]]);
    const [selectedUNSPRows, setSelectedUNSPRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedCPVValues, setSelectedCPVValues] = useState([[[]]]);
    const [selectedCPVRows, setSelectedCPVRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedNACValues, setSelectedNACValues] = useState([[[]]]);
    const [selectedNACRows, setSelectedNACRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedGrouping, setSelectedGrouping] = useState({ resultType: "", accumulation: "", sorting: "" });
    const [marketLastSelectedCodeLvl, setMarketLastSelectedCodeLvl] = useState(0);
    const [selectedPeppol, setSelectedPeppol] = useState({
        invoiceCreditNote: false,
        order: false,
        contract: false,
        orderResponse: false,
        advice: false,
        catalog: false,
        proposals: false,
    });

    const [selectedMarketValues, setSelectedMarketValues] = useState([[[]]]);
    const [selectedMarketRows, setSelectedMarketRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedProject, setSelectedProject] = useState();
    const [newSectionData, setNewSectionData] = useState({
        Name: "",
        Description: "",
        Purpose: "",
        FromDate: "",
        ToDate: "",
        Status: "",
        ProjectTId: 0
    });
    const [newSectionDataError, setNewSectionDataError] = useState({
        Project: "",
        Name: "",
        Purpose: "",
        FromDate: "",
        ToDate: "",
        Status: "",
    });
    const [newProjectData, setNewProjectData] = useState({ Name: '', TypeCode: 'Research project', Description: '', Permission: 'Private', FromDate: '', ToDate: '', Responsible: '', Status: '' });
    const [newProjectDataError, setNewProjectDataError] = useState({ Name: '', FromDate: '', ToDate: '', Responsible: '', Status: '' });
    const [filterdContacts, setFilteredContacts] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [actPage, setActPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [selectedResults, setSelectedResults] = useState([]);
    const [removeAllResultsChecked, setRemoveAllResultsChecked] = useState(false);
    const [removeCriteriaObj, setRemoveCriteriaObj] = useState({});

    const [showModel, setShowModel] = useState(false);
    const [createProjectModalVisible, setCreateProjectModalVisible] = useState(false);
    const { t } = useTranslation();

    const { changeActiveTab } = useContext(TabContext);

    useEffect(() => {
        getNutsCodes(0, 0).then((result) => setMarketInformationData({ ...marketInformationData, countries: result }));
        getUnspscCodes(levelOneReq).then((result) => {
            setUnspscData({ ...unspscData, segmant: result });
        });
        getCpvCodes(levelOneReq).then((result) => {
            setCpvData({ ...cpvData, division: result });
        });
        getNacCodes(nacSectionReq).then((result) => {
            setProfessionData({ ...professionData, section: result });
        });
        // getPerson().then(result => {
        getOrganizationTypes("NO", "EN").then((result) => {
            setOrganizationTypes(result);
        });
        // })
    }, []);

    useEffect(() => {
        if (props?.searchResults?.length > 0) {
            const searchResultsSet = props?.searchResults[0];

            setLoading(true);
            const removalReq = {
                searchCriteria: props?.searchResults[0]?.searchFilter || {},
                removeCritieria: props?.searchResults[1]?.removeCriteria || {},
            };
            removalReq.searchCriteria.pageNo = 1;

            setSelectedResults(searchResultsSet?.removeCriteria?.organizationIds || []);

            removeSearch(props.searchResults[0]?.id, removalReq)
                .then((result) => {
                    setLoading(false);
                    setOrganizations(result.organizations);
                    setPageCount(result.total);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
        if (!props?.projectId) {
            setLoading(true);
            getAllProjects().then(result => {
                setProjectsData(result);
                setLoading(false);
            });

            getContacts().then(response => {
                const options = response ? response.map((user) => {
                    return {
                        key: user.PartyTId,
                        label: user.Name,
                        value: user.Name
                    };
                }) : [];

                setFilteredContacts(options);
            })
        }
    }, [props]);

    useEffect(() => {
        if (selectedGrouping.accumulation && (getAllSelectedCriteriaLength() !== 0 || searchText !== "")) {
            onShowResults();
        }
    }, [selectedGrouping.accumulation]);

    //API calls
    const getCountryCodes = (country, level, parent) => {
        const getCountryName = (lvl) => {
            switch (lvl) {
                case 1:
                    return "regions";
                case 2:
                    return "cities";
                case 3:
                    return "municipalities";
                default:
                    break;
            }
        };

        if (level > 0) {
            getNutsCodesByParent(country, parent).then((result) => {
                const uniqueResult = result.filter((item) => {
                    const ind = marketInformationData[getCountryName(level + 1)].findIndex((res) => {
                        return res.code === item.code;
                    });
                    if (ind === -1) {
                        return true;
                    } else {
                        return false;
                    }
                });

                const newResult = marketInformationData[getCountryName(level + 1)].concat(uniqueResult);

                setMarketInformationData({ ...marketInformationData, [getCountryName(level + 1)]: newResult });
            });
        } else {
            getNutsCodes(country, level + 1).then((result) => {
                setMarketInformationData({ ...marketInformationData, regions: result, cities: [], municipalities: [] });
            });
        }
    };

    const getCountryCodes2 = (obj, level) => {
        const getCountryName = (lvl) => {
            switch (lvl) {
                case 1:
                    return "regions";
                case 2:
                    return "cities";
                case 3:
                    return "municipalities";
                default:
                    break;
            }
        };

        if (level > 1) {
            getNutsCodesByParent(obj.country, obj.code).then((result) => {
                const uniqueResult = result.filter((item) => {
                    const ind = marketInformationData[getCountryName(level)].findIndex((res) => {
                        return res.code === item.code;
                    });
                    if (ind === -1) {
                        return true;
                    } else {
                        return false;
                    }
                });

                const newResult = marketInformationData[getCountryName(level)].concat(uniqueResult);

                setMarketInformationData({ ...marketInformationData, [getCountryName(level)]: newResult });
            });
        } else {
            getNutsCodes(obj.code, level).then((result) => {
                setMarketInformationData({ ...marketInformationData, regions: result, cities: [], municipalities: [] });
            });
        }
    };

    const getUnspscCodesData = (title, level) => {
        const getUnspscName = (lvl) => {
            switch (lvl) {
                case 1:
                    return "segmant";
                case 2:
                    return "family";
                case 3:
                    return "unspClass";
                case 4:
                    return "comClass";
                default:
                    break;
            }
        };

        const selectedUnspscData = unspscData[getUnspscName(level - 1)].filter((item) => item.title === title);

        const data = {
            level: level,
            code: selectedUnspscData[0].code,
        };

        getUnspscCodes(data).then((result) => {
            setUnspscData({ ...unspscData, [getUnspscName(level)]: result });
            if (level === 2) {
                setUnspscData({
                    ...unspscData,
                    [getUnspscName(level)]: result,
                    [getUnspscName(level + 1)]: [],
                    [getUnspscName(level + 2)]: [],
                });
            } else {
                setUnspscData({ ...unspscData, [getUnspscName(level)]: result });
            }
        });
    };

    const getcpvCodesData = (desscription, level) => {
        const getCpvName = (lvl) => {
            switch (lvl) {
                case 1:
                    return "division";
                case 2:
                    return "cpvGroup";
                case 3:
                    return "cpvClass";
                case 4:
                    return "category";
                case 5:
                    return "subCategory";
                default:
                    break;
            }
        };

        const selectedCpvData = cpvData[getCpvName(level - 1)].filter((item) => item.desscription === desscription);

        const data = {
            level: level,
            code: selectedCpvData[0].code,
        };

        getCpvCodes(data).then((result) => {
            if (level === 2) {
                setCpvData({
                    ...cpvData,
                    [getCpvName(level)]: result,
                    [getCpvName(level + 1)]: [],
                    [getCpvName(level + 2)]: [],
                    [getCpvName(level + 3)]: [],
                });
            } else {
                setCpvData({ ...cpvData, [getCpvName(level)]: result });
            }
        });
    };

    const getProfessionData = (desscription, level) => {
        const getProfName = (lvl) => {
            switch (lvl) {
                case 1:
                    return "section";
                case 2:
                    return "divition";
                case 3:
                    return "profGroup";
                case 4:
                    return "profClass";
                default:
                    break;
            }
        };

        const profData = professionData[getProfName(level - 1)].filter((item) => item.desscription === desscription);
        const data = {
            level: level.toString(),
            parent: profData[0].code,
        };

        getNacCodes(data).then((result) => {
            if (level === 2) {
                setProfessionData({
                    ...professionData,
                    [getProfName(level)]: result,
                    [getProfName(level + 1)]: [],
                    [getProfName(level + 2)]: [],
                });
            } else {
                setProfessionData({ ...professionData, [getProfName(level)]: result });
            }
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSerachText(e.target.value);
    };

    const getAllSelectedCriteriaLength = () => {
        const searchReq = getSearchRequest(1);
        const allSelectedCriteria = searchReq.countries.concat(
            searchReq.regions,
            searchReq.cities,
            searchReq.municipalities,
            searchReq.cpvs,
            searchReq.naces,
            searchReq.unspscs,
            searchReq.peppol,
            searchReq.registrationDateFrom,
            searchReq.registrationDateTo,
            searchReq.inCorporationDateFrom,
            searchReq.inCorporationDateTo,
            searchReq.noOfEmployeesFrom,
            searchReq.noOfEmployeesTo,
            searchReq.organizationTypeCode,
            searchReq.organizationId,
            searchReq.sectorCode
        );
        return allSelectedCriteria.length;
    };

    const convertStringObject = (object) => {
        const newObject = {};
        Object.entries(object).forEach(([key, value]) => {
            newObject[key] = JSON.parse(value);
        });
        return newObject;
    };

    const onShowResults = (e = null) => {
        if (e.preventDefault) e.preventDefault();

        if (props?.searchResults?.length > 0 && !props?.removeSearch) {
            confirm({
                title: (
                    <>
                        {t("IF_FRESH_SEARCH")} <strong className="red">{t("DELETE")}</strong>{" "}
                        {t("YOUR_SAVED_CRITERIA")}
                    </>
                ),
                icon: <ExclamationCircleOutlined />,
                okText: t("YES"),
                okType: "danger",
                cancelText: t("NO"),
                onOk() {
                    deleteSearch(props?.searchResults[0])
                        .then(() => {
                            setOrganizations([]);
                            if (props?.searchResults.length === 2) {
                                deleteSearch(props?.searchResults[1])
                                    .then(() => {
                                        message.success(t('MSG_DELETE_SEARCH_SUCESS'));
                                        props.getSearchResults();
                                    })
                                    .catch(() => {
                                        message.success(t('MSG_DELETE_SEARCH_FAIL'));
                                    });
                            } else {
                                message.success(t('MSG_DELETE_SEARCH_SUCESS'));
                                props.getSearchResults();
                            }
                        })
                        .catch(() => {
                            message.success(t('MSG_DELETE_SEARCH_FAIL'));
                        });
                },
            });
        } else {
            setOrganizations([]);
            setGrouping({});
            window.scrollTo(0, 0);
            const searchReq = getSearchRequest(1);
            if (isAllCriteriaEmpty(searchReq) && !props.removeSearch) {
                message.warning(t('MSG_SEARCH_NO_CRITERIA_WARNING'));
            } else {
                noSearchResults = false;
                setLoading(true);
                setActPage(1);
                if (props?.removeSearch) {
                    callremoveOrganization(1);
                } else {
                    callSearchOrganization(1);
                }
            }
        }
    };

    const onReset = () => {
        confirm({
            title: (
                <>
                    {t("IF_YOU_DO_FRESH_SEARCH")} <strong className="red">{t("DELETE")}</strong>{" "}
                    {t("YOUR_SAVED_CRITERIA")}
                </>
            ),
            icon: <ExclamationCircleOutlined />,
            okText: t("Yes"),
            okType: "danger",
            cancelText: t("No"),
            onOk() {
                deleteSearch(props?.searchResults[0])
                    .then(() => {
                        setOrganizations([]);
                        if (props?.searchResults.length === 2) {
                            deleteSearch(props?.searchResults[1])
                                .then(() => {
                                    message.success(t('MSG_DELETE_SEARCH_SUCESS'));
                                    props.resetSearchResults();
                                    props.changeTab("1");
                                })
                                .catch(() => {
                                    message.error(t('MSG_DELETE_SEARCH_FAIL'));
                                });
                        } else {
                            message.success(t('MSG_DELETE_SEARCH_SUCESS'));
                            props.resetSearchResults();
                            props.changeTab("1");
                        }
                    })
                    .catch(() => {
                        message.error(t('MSG_DELETE_SEARCH_FAIL'));
                    });
            },
        });
    };

    const callremoveOrganization = (pageNo) => {
        if (removeAllResultsChecked) {
            //removeAllOrganizationIds(getRemovalRequest(1).searchCriteria).then(result => {
            const removeRequest = getRemovalRequest(pageNo);
            //removeRequest.removeCritieria.organizationIds = result
            //setSelectedResults(result);

            switch (selectedGrouping.accumulation) {
                case "":
                case "None":
                    removeSearch(props.searchResults[0]?.id, removeRequest)
                        .then((result) => {
                            setLoading(false);
                            setOrganizations(result.organizations);
                            setPageCount(result.total);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                case "CPV Code":
                    removeSearchAccumulateCpv(props.searchResults[0]?.id, removeRequest)
                        .then((result) => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                case "NACE Code":
                    removeSearchAccumulateNace(props.searchResults[0]?.id, removeRequest)
                        .then((result) => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                case "UNSPSC Code":
                    removeSearchAccumulateUNSPSC(props.searchResults[0]?.id, removeRequest)
                        .then((result) => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                case "Municipality (Market)":
                    removeSearchAccumulateMunicipality(props.searchResults[0]?.id, removeRequest)
                        .then((result) => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                default:
                    removeSearch(props.searchResults[0]?.id, removeRequest)
                        .then((result) => {
                            setLoading(false);
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
            }
            //})
        } else {
            switch (selectedGrouping.accumulation) {
                case "":
                case "None":
                    removeSearch(props.searchResults[0]?.id, getRemovalRequest(pageNo))
                        .then((result) => {
                            setLoading(false);
                            setOrganizations(result.organizations);
                            setPageCount(result.total);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                case "CPV Code":
                    removeSearchAccumulateCpv(props.searchResults[0]?.id, getRemovalRequest(pageNo, "cpvs"))
                        .then((result) => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                case "NACE Code":
                    removeSearchAccumulateNace(props.searchResults[0]?.id, getRemovalRequest(pageNo, "naces"))
                        .then((result) => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                case "UNSPSC Code":
                    removeSearchAccumulateUNSPSC(props.searchResults[0]?.id, getRemovalRequest(pageNo, "unspscs"))
                        .then((result) => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                case "Municipality (Market)":
                    removeSearchAccumulateMunicipality(props.searchResults[0]?.id, getRemovalRequest(pageNo, "municipalities"))
                        .then((result) => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
                default:
                    removeSearch(props.searchResults[0]?.id, getRemovalRequest(pageNo))
                        .then((result) => {
                            setLoading(false);
                            setOrganizations(result.organizations);
                            setPageCount(result.groupTotal);
                        })
                        .catch((error) => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                    break;
            }
        }
    };

    const callSearchOrganization = (pageNo) => {
        switch (selectedGrouping.accumulation) {
            case "":
            case "None":
                searchOrganization(getSearchRequest(pageNo))
                    .then((result) => {
                        setLoading(false);
                        setOrganizations(result.organizations);
                        setPageCount(result.total);
                    })
                    .catch((error) => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                break;
            case "CPV Code":
                searchOrganizationByCPV(getSearchRequest(pageNo))
                    .then((result) => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(result.groupTotal);
                    })
                    .catch((error) => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                break;
            case "NACE Code":
                searchOrganizationByNACE(getSearchRequest(pageNo))
                    .then((result) => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(result.groupTotal);
                    })
                    .catch((error) => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                break;
            case "UNSPSC Code":
                searchOrganizationByUNSPSC(getSearchRequest(pageNo))
                    .then((result) => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(result.groupTotal);
                    })
                    .catch((error) => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                break;
            case "Municipality (Market)":
                searchOrganizationMunicipality(getSearchRequest(pageNo))
                    .then((result) => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(result.groupTotal);
                    })
                    .catch((error) => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                break;
            default:
                break;
        }
    };

    const saveButtonText = useMemo(() => {
        if (!props?.removeSearch && props?.searchResults?.length > 0) {
            return t('REFRESH');
        } else {
            return t('SAVE');
        }
    }, [props]);

    const isAllCriteriaEmpty = (searchReq) => {
        const allSelectedCriteria = searchReq.countries.concat(
            searchReq.regions,
            searchReq.cities,
            searchReq.municipalities,
            searchReq.cpvs,
            searchReq.naces,
            searchReq.unspscs,
            searchReq.peppol
        );

        if (
            allSelectedCriteria.length === 0 &&
            searchReq.name === "" &&
            searchReq.active == null &&
            !searchReq.registrationDateFrom &&
            !searchReq.registrationDateTo &&
            !searchReq.inCorporationDateFrom &&
            !searchReq.inCorporationDateTo &&
            searchReq.noOfEmployeesFrom == null &&
            searchReq.noOfEmployeesTo == null &&
            !searchReq.organizationTypeCode &&
            !searchReq.organizationId &&
            !searchReq.sectorCode
        ) {
            return true;
        } else return false;
    };

    const onSaveResults = (e) => {
        if (e.preventDefault) e.preventDefault();

        if (props?.searchResults?.length > 0 && !props?.removeSearch) {
            deleteSearch(props?.searchResults[0])
                .then(() => {
                    setOrganizations([]);
                    if (props?.searchResults.length === 2) {
                        deleteSearch(props?.searchResults[1])
                            .then(() => {
                                message.success(t('MSG_DELETE_SEARCH_SUCESS'));
                                props.getSearchResults();
                            })
                            .catch(() => {
                                message.success(t('MSG_DELETE_SEARCH_FAIL'));
                            });
                    } else {
                        message.success(t('MSG_DELETE_SEARCH_SUCESS'));
                        props.getSearchResults();
                    }
                })
                .catch(() => {
                    message.success(t('MSG_DELETE_SEARCH_FAIL'));
                });
        } else {
            const searchReq = getSearchRequest(1);

            if (isAllCriteriaEmpty(searchReq) && !props?.removeSearch) {
                message.warning(t('MSG_SELECT_CRITERIA_TO_SAVE'));
            } else if (
                props?.sectionSearch &&
                (props?.projectStatus?.toUpperCase() === "CLOSE" || props?.sectionStatus?.toUpperCase() === "CLOSE")
            ) {
                message.warning(t('MSG_CANNOT_SAVE_RESULTS_CLOSED_PROJECT'));
            } else {
                if (props?.sectionSearch) {
                    addNewSearchResult(getSaveResultData())
                        .then(() => {
                            message.success(t('MSG_SAVE_SEARCH_SUCESS'));
                            setSelectedResults([]);
                            props.getSearchResults();
                        })
                        .catch(() => {
                            message.error(t('MSG_SAVE_SEARCH_FAIL'));
                        });
                } else {
                    toggleModal();
                }
            }
        }
    };

    const getMarketCodes = (marketList) => {
        return marketList.map((val) => {
            return val.code;
        });
    };

    const getMarketCodeObjs = (marketList) => {
        return marketList.map((val) => {
            return { code: val.code, name: val.name };
        });
    };

    const getSaveResultData = () => {
        if (props?.removeSearch) {
            return {
                id: props?.searchResults[1]?.id || null,
                parentSearchId: props?.searchResults[0]?.id,
                projectId: props.projectId,
                sectionId: props.sectionId,
                createdDate: new Date(),
                searchFilter: {
                    countries: getMarketCodes(selectedMarketCriteria.selectedCountries),
                    regions: getMarketCodes(selectedMarketCriteria.selectedRegions),
                    cities: getMarketCodes(selectedMarketCriteria.selectedCities),
                    municipalities: getMarketCodes(selectedMarketCriteria.selectedMunicipalities),
                    cpvs: getFilterdCodes(selectedCPVValues),
                    naces: getFilterdCodes(selectedNACValues),
                    unspscs: getFilterdCodes(selectedUNSPValues),
                    peppol: getSelectedPepolTypes(),
                    active: getActiveStatus(),
                    registrationDateFrom: selectedCompanyInfo.registrationFromDate,
                    registrationDateTo: selectedCompanyInfo.registrationToDate,
                    inCorporationDateFrom: selectedCompanyInfo.incorpFromDate,
                    inCorporationDateTo: selectedCompanyInfo.incorpToDate,
                    noOfEmployeesFrom: getNoOfEmployees().from,
                    noOfEmployeesTo: getNoOfEmployees().to,
                    organizationTypeCode: selectedCompanyInfo.organizationType?.code || "",
                    organizationId: selectedCompanyInfo.organizationId,
                    sectorCode: selectedCompanyInfo.sectorCode,

                    _countries: selectedMarketCriteria.selectedCountries,
                    _regions: selectedMarketCriteria.selectedRegions,
                    _cities: selectedMarketCriteria.selectedCities,
                    _municipalities: selectedMarketCriteria.selectedMunicipalities,
                    _cpvs: getFilterdCodesObj(selectedCPVValues),
                    _naces: getFilterdCodesObj(selectedNACValues),
                    _unspscs: getFilterdCodesObj(selectedUNSPValues),
                },
                removeCriteria: {
                    organizationIds: selectedResults,
                    isRemoveAll: removeAllResultsChecked,
                },
            };
        } else {
            return {
                projectId: props?.projectId,
                sectionId: props?.sectionId,
                createdDate: new Date(),
                searchFilter: {
                    name: searchText,
                    countries: getMarketCodes(selectedMarketCriteria.selectedCountries),
                    regions: getMarketCodes(selectedMarketCriteria.selectedRegions),
                    cities: getMarketCodes(selectedMarketCriteria.selectedCities),
                    municipalities: getMarketCodes(selectedMarketCriteria.selectedMunicipalities),
                    cpvs: getFilterdCodes(selectedCPVValues),
                    naces: getFilterdCodes(selectedNACValues),
                    unspscs: getFilterdCodes(selectedUNSPValues),
                    peppol: getSelectedPepolTypes(),
                    active: getActiveStatus(),
                    registrationDateFrom: selectedCompanyInfo.registrationFromDate,
                    registrationDateTo: selectedCompanyInfo.registrationToDate,
                    inCorporationDateFrom: selectedCompanyInfo.incorpFromDate,
                    inCorporationDateTo: selectedCompanyInfo.incorpToDate,
                    noOfEmployeesFrom: getNoOfEmployees().from,
                    noOfEmployeesTo: getNoOfEmployees().to,
                    organizationTypeCode: selectedCompanyInfo.organizationType?.code || "",
                    organizationId: selectedCompanyInfo.organizationId,
                    sectorCode: selectedCompanyInfo.sectorCode,

                    _countries: selectedMarketCriteria.selectedCountries,
                    _regions: selectedMarketCriteria.selectedRegions,
                    _cities: selectedMarketCriteria.selectedCities,
                    _municipalities: selectedMarketCriteria.selectedMunicipalities,
                    _cpvs: getFilterdCodesObj(selectedCPVValues),
                    _naces: getFilterdCodesObj(selectedNACValues),
                    _unspscs: getFilterdCodesObj(selectedUNSPValues),
                },
            };
        }
    };

    const getNoOfEmployees = () => {
        switch (selectedCompanyInfo.noOfEmployees) {
            case "0 to 50":
                return { from: 0, to: 50 };
            case "50 to 100":
                return { from: 50, to: 100 };
            case "100 to 500":
                return { from: 100, to: 500 };
            case "500 to 2000":
                return { from: 500, to: 2000 };
            case "more than 2000":
                return { from: 2000, to: 0 };
            default:
                return { from: null, to: null };
        }
    };

    const getActiveStatus = () => {
        switch (selectedCompanyInfo.active) {
            case "Active":
                return true;
            case "Inactive":
                return false;
            default:
                return null;
        }
    };

    const getSearchRequest = (pageNumber) => {
        return {
            name: searchText,
            countries: getMarketCodes(selectedMarketCriteria.selectedCountries),
            regions: getMarketCodes(selectedMarketCriteria.selectedRegions),
            cities: getMarketCodes(selectedMarketCriteria.selectedCities),
            municipalities: getMarketCodes(selectedMarketCriteria.selectedMunicipalities),
            cpvs: getFilterdCodes(selectedCPVValues),
            naces: getFilterdCodes(selectedNACValues),
            unspscs: getFilterdCodes(selectedUNSPValues),
            peppol: getSelectedPepolTypes(),
            active: getActiveStatus(),
            registrationDateFrom: selectedCompanyInfo.registrationFromDate,
            registrationDateTo: selectedCompanyInfo.registrationToDate,
            inCorporationDateFrom: selectedCompanyInfo.incorpFromDate,
            inCorporationDateTo: selectedCompanyInfo.incorpToDate,
            noOfEmployeesFrom: getNoOfEmployees().from,
            noOfEmployeesTo: getNoOfEmployees().to,
            organizationTypeCode: selectedCompanyInfo.organizationType?.code || "",
            organizationId: selectedCompanyInfo.organizationId,
            sectorCode: selectedCompanyInfo.sectorCode,
            pageSize: pageSize,
            pageNo: pageNumber,

            _countries: selectedMarketCriteria.selectedCountries,
            _regions: selectedMarketCriteria.selectedRegions,
            _cities: selectedMarketCriteria.selectedCities,
            _municipalities: selectedMarketCriteria.selectedMunicipalities,
            _cpvs: getFilterdCodesObj(selectedCPVValues),
            _naces: getFilterdCodesObj(selectedNACValues),
            _unspscs: getFilterdCodesObj(selectedUNSPValues),
        };
    };

    const getRemovalRequest = (pageNumber, removeCritieria = "organizationIds") => {
        setRemoveCriteriaObj((removeCriteriaObj) => ({ ...removeCriteriaObj, [removeCritieria]: selectedResults }));
        if (getAllSelectedCriteriaLength() === 0) {
            const searchResultsSet = props?.searchResults[props?.searchResults?.length - 1];

            return {
                searchCriteria: {
                    name: searchResultsSet?.searchFilter.name || "",
                    countries: searchResultsSet?.searchFilter.countries || null,
                    regions: searchResultsSet?.searchFilter.regions || null,
                    cities: searchResultsSet?.searchFilter.cities || null,
                    municipalities: searchResultsSet?.searchFilter.municipalities || null,
                    cpvs: searchResultsSet?.searchFilter.cpvs || null,
                    naces: searchResultsSet?.searchFilter.naces || null,
                    unspscs: searchResultsSet?.searchFilter.unspscs || null,
                    active: getActiveStatus(),
                    registrationDateFrom: selectedCompanyInfo.registrationFromDate,
                    registrationDateTo: selectedCompanyInfo.registrationToDate,
                    inCorporationDateFrom: selectedCompanyInfo.incorpFromDate,
                    inCorporationDateTo: selectedCompanyInfo.incorpToDate,
                    noOfEmployeesFrom: getNoOfEmployees().from,
                    noOfEmployeesTo: getNoOfEmployees().to,
                    organizationTypeCode: selectedCompanyInfo.organizationType?.code || "",
                    organizationId: selectedCompanyInfo.organizationId,
                    sectorCode: selectedCompanyInfo.sectorCode,
                    peppol: getSelectedPepolTypes(),
                    pageSize: pageSize,
                    pageNo: pageNumber,

                    _countries: searchResultsSet?.searchFilter.__countries || null,
                    _regions: searchResultsSet?.searchFilter._regions || null,
                    _cities: searchResultsSet?.searchFilter._cities || null,
                    _municipalities: searchResultsSet?.searchFilter._municipalities || null,
                    _cpvs: searchResultsSet?.searchFilter._cpvs || null,
                    _naces: searchResultsSet?.searchFilter._naces || null,
                    _unspscs: searchResultsSet?.searchFilter._unspscs || null,
                },
                removeCritieria: { ...removeCriteriaObj, [removeCritieria]: selectedResults },
            };
        } else {
            return {
                searchCriteria: {
                    name: "",
                    countries: getMarketCodes(selectedMarketCriteria.selectedCountries),
                    regions: getMarketCodes(selectedMarketCriteria.selectedRegions),
                    cities: getMarketCodes(selectedMarketCriteria.selectedCities),
                    municipalities: getMarketCodes(selectedMarketCriteria.selectedMunicipalities),
                    cpvs: getFilterdCodes(selectedCPVValues),
                    naces: getFilterdCodes(selectedNACValues),
                    unspscs: getFilterdCodes(selectedUNSPValues),
                    active: getActiveStatus(),
                    registrationDateFrom: selectedCompanyInfo.registrationFromDate,
                    registrationDateTo: selectedCompanyInfo.registrationToDate,
                    inCorporationDateFrom: selectedCompanyInfo.incorpFromDate,
                    inCorporationDateTo: selectedCompanyInfo.incorpToDate,
                    noOfEmployeesFrom: getNoOfEmployees().from,
                    noOfEmployeesTo: getNoOfEmployees().to,
                    organizationTypeCode: selectedCompanyInfo.organizationType?.code || "",
                    organizationId: selectedCompanyInfo.organizationId,
                    sectorCode: selectedCompanyInfo.sectorCode,
                    peppol: getSelectedPepolTypes(),
                    pageSize: pageSize,
                    pageNo: pageNumber,

                    _countries: selectedMarketCriteria.selectedCountries,
                    _regions: selectedMarketCriteria.selectedRegions,
                    _cities: selectedMarketCriteria.selectedCities,
                    _municipalities: selectedMarketCriteria.selectedMunicipalities,
                    _cpvs: getFilterdCodesObj(selectedCPVValues),
                    _naces: getFilterdCodesObj(selectedNACValues),
                    _unspscs: getFilterdCodesObj(selectedUNSPValues),
                },
                removeCritieria: { ...removeCriteriaObj, [removeCritieria]: selectedResults },
            };
        }
    };

    const getSelectedPepolTypes = () => {
        let types = [];
        if (selectedPeppol.invoiceCreditNote) {
            types.push("invoice");
            types.push("creditnote");
        }
        if (selectedPeppol.order) {
            types.push("order");
        }
        if (selectedPeppol.catalog) {
            types.push("catalog");
        }
        return types;
    };

    const getFilterdCodes = (selectedValues) => {
        let filterdCodeList = [];

        for (let mainRowIndex = 0; selectedValues.length > mainRowIndex; mainRowIndex++) {
            const secondArr = selectedValues[mainRowIndex];
            let tempCodeList = [];
            for (let secondRowIndex = 1; secondArr.length > secondRowIndex; secondRowIndex++) {
                const valuesArr = selectedValues[mainRowIndex][secondRowIndex];
                if (typeof valuesArr[valuesArr.length - 1].code === "string") {
                    tempCodeList.push(valuesArr[valuesArr.length - 1].code);
                }
            }
            if (tempCodeList.length === 0 && selectedValues[mainRowIndex][0].code != undefined) {
                filterdCodeList.push(selectedValues[mainRowIndex][0].code);
            } else {
                filterdCodeList = filterdCodeList.concat(tempCodeList);
            }
        }
        return filterdCodeList;
    };

    const getFilterdCodesObj = (selectedValues) => {
        let filterdCodeList = [];

        for (let mainRowIndex = 0; selectedValues.length > mainRowIndex; mainRowIndex++) {
            const secondArr = selectedValues[mainRowIndex];
            let tempCodeList = [];
            for (let secondRowIndex = 1; secondArr.length > secondRowIndex; secondRowIndex++) {
                const valuesArr = selectedValues[mainRowIndex][secondRowIndex];
                if (typeof valuesArr[valuesArr.length - 1].code === "string") {
                    tempCodeList.push({ code: valuesArr[valuesArr.length - 1].code, name: valuesArr[valuesArr.length - 1].value });
                }
            }
            if (tempCodeList.length === 0 && selectedValues[mainRowIndex][0].code != undefined) {
                filterdCodeList.push({ code: selectedValues[mainRowIndex][0].code, name: selectedValues[mainRowIndex][0].value });
            } else {
                filterdCodeList = filterdCodeList.concat(tempCodeList);
            }
        }
        return filterdCodeList;
    };

    const onChangePage = (pageNumber) => {
        let pageNo;
        window.scrollTo(0, 0);
        setLoading(true);

        switch (pageNumber) {
            case "prev":
                pageNo = actPage - 1;
                setActPage(actPage - 1);
                break;
            case "next":
                pageNo = actPage + 1;
                setActPage(actPage + 1);
                break;
            default:
                pageNo = pageNumber;
                setActPage(pageNumber);
        }

        if (props?.removeSearch) {
            callremoveOrganization(pageNo);
        } else {
            callSearchOrganization(pageNo);
        }
    };

    const changeCompanyInfoData = (data, dataName) => {
        setSelectedCompanyInfo({ ...selectedCompanyInfo, [dataName]: data });
    };

    const onChangeOrgType = (e) => {
        setSelectedCompanyInfo({ ...selectedCompanyInfo, organizationType: JSON.parse(e.target.value) });
    };

    const onChangeOrgId = (e) => {
        e.preventDefault();
        setSelectedCompanyInfo({ ...selectedCompanyInfo, organizationId: e.target.value });
    };

    const onChangeSectorCode = (e) => {
        e.preventDefault();
        setSelectedCompanyInfo({ ...selectedCompanyInfo, sectorCode: e.target.value });
    };

    const onCheckBox = (e) => {
        const newResultSet = [...selectedResults];
        const index = selectedResults.indexOf(e.target.value);

        if (index < 0) {
            newResultSet.push(e.target.value);
            setSelectedResults(newResultSet);
        } else {
            newResultSet.splice(index, 1);
            setSelectedResults(newResultSet);
        }
    };

    const onSelectAllCheckBox = (e) => {
        const allResultsSet = organizations.map((organization) => {
            return organization.organizationId;
        });

        if (e.target.checked) {
            const newResultSet = selectedResults.concat(allResultsSet);
            setSelectedResults(newResultSet);
        } else {
            const newResultSet = selectedResults.filter((organization) => {
                return !allResultsSet?.includes(organization);
            });
            setSelectedResults(newResultSet);
        }
    };

    const toggleModal = () => {
        setShowModel(pre => !pre);
        setNewSectionData({
            Name: "",
            Description: "",
            Purpose: "",
            FromDate: "",
            ToDate: "",
            Status: "",
            ProjectTId: 0
        })
    }

    const validate = () => {
        let validation = true;
        if (!selectedProject) {
            setNewSectionDataError(pre => ({ ...pre, Project: 'Select a project' }));
            validation = false;
        }
        if (newSectionData?.Name === "") {
            setNewSectionDataError(pre => ({ ...pre, Name: 'NAME_ERROR' }));
            validation = false;
        }
        if (newSectionData?.Purpose === "") {
            setNewSectionDataError(pre => ({ ...pre, Purpose: 'Please enter purpose' }));
            validation = false;
        }
        if (newSectionData?.FromDate === "") {
            setNewSectionDataError(pre => ({ ...pre, FromDate: 'Please select date' }));
            validation = false;
        }
        if (newSectionData?.ToDate === "") {
            setNewSectionDataError(pre => ({ ...pre, ToDate: 'Please select date' }));
            validation = false;
        }
        if (newSectionData?.Status === "") {
            setNewSectionDataError(pre => ({ ...pre, Status: 'Please select status' }));
            validation = false;
        }

        return validation;
    };

    const onSelectProject = (e) => {
        e.preventDefault();
        setNewSectionDataError(pre => ({ ...pre, Project: '' }));
        setSelectedProject(JSON.parse(e.target.value));
    }

    const onSaveResultsWithSection = () => {
        if (projectsData?.length === 0) {
            toggleCreateProjModal()
            return
        }
        if (validate()) {
            setLoading(true)
            const newSectionDataUpdate = { ...newSectionData, ClosedDate: newSectionData.Status?.toUpperCase() === "CLOSE" ? moment().format('YYYY-MM-DD') : null };

            addNewSection({ ...newSectionDataUpdate, ProjectTId: selectedProject?.Id }, props?.currentUser?.PartyId)
                .then((result) => {
                    const saveResObj = getSaveResultData()
                    saveResObj.projectId = selectedProject?.Id
                    saveResObj.sectionId = result?.Id

                    addNewSearchResult(saveResObj)
                        .then(() => {
                            message.success(t('MSG_SAVE_SEARCH_SUCESS'));
                            setSelectedResults([]);
                            setLoading(false);
                            toggleModal();
                        })
                        .catch(() => {
                            message.error(t('MSG_SAVE_SEARCH_FAIL'));
                            setLoading(false)
                        });
                })
                .catch(() => {
                    message.error(t('MSG_SECTION_SAVE_FAIL'));
                    setLoading(false)
                });
        }
    }

    const onNewElementChange = (e, elementName) => {
        e.preventDefault();
        setNewSectionData({ ...newSectionData, [elementName]: e.target.value });
        setNewSectionDataError(pre => ({ ...pre, [elementName]: '' }));
    };

    const onNewElementDateChange = (date, elementName) => {
        setNewSectionData({ ...newSectionData, [elementName]: moment(date).local().format('YYYY-MM-DD') });
        setNewSectionDataError(pre => ({ ...pre, [elementName]: '' }));
    };

    const toggleCreateProjModal = () => {
        setCreateProjectModalVisible(pre => !pre);
        setNewProjectData({ Name: '', TypeCode: 'Research project', Description: '', Permission: 'Private', FromDate: '', ToDate: '', Responsible: '', Status: '' })
    }

    const validateNewProject = () => {
        let validation = true;

        if (newProjectData?.Name === '') {
            setNewProjectDataError(pre => ({ ...pre, Name: 'NAME_ERROR' }));
            validation = false;
        }
        if (newProjectData?.FromDate === '') {
            setNewProjectDataError(pre => ({ ...pre, FromDate: 'Please select a data' }));
            validation = false;
        }
        if (newProjectData?.ToDate === '') {
            setNewProjectDataError(pre => ({ ...pre, ToDate: 'Please select a data' }));
            validation = false;
        }
        if (newProjectData?.Responsible === '') {
            setNewProjectDataError(pre => ({ ...pre, Responsible: 'Please slect a responsible person' }));
            validation = false;
        }
        if (newProjectData?.Status === '') {
            setNewProjectDataError(pre => ({ ...pre, Status: 'Please slect Status' }));
            validation = false;
        }

        return validation;
    }

    const onCreateProject = () => {
        if (validateNewProject()) {
            setLoading(true)
            addNewProject(newProjectData, props?.currentUser?.PartyId).then(() => {
                getAllProjects().then(result => {
                    setProjectsData(result);
                    message.success(t('MSG_CREATE_PROJECT_SUCCESS'));
                    setLoading(false)
                    toggleCreateProjModal()
                }).catch(() => {
                    message.warning(t('MSG_CREATE_PROJECT_FAIL'));
                    setLoading(false)
                })
            }).catch(() => {
                message.error(t('MSG_CREATE_PROJECT_FAIL'));
            })
        }
    }

    const onNewProjElementChange = (e, elementName) => {
        e.preventDefault();
        setNewProjectData({ ...newProjectData, [elementName]: e.target.value });
        setNewProjectDataError(pre => ({ ...pre, [elementName]: '' }));
    }

    const onNewProjElementDateChange = (date, elementName) => {
        setNewProjectData({ ...newProjectData, [elementName]: moment(date).local().format('YYYY-MM-DD') });
        setNewProjectDataError(pre => ({ ...pre, [elementName]: '' }));
    }

    const getCriteriaHeader = (header, tooltip, onClickHeader, expanded) => {
        const expandIcon = expanded ? "icon-minus fr" : "icon-minus-1 fr";
        return (
            <div className="text-left sub-title-txt hover-hand" onClick={() => onClickHeader()}>
                {header}
                <Tooltip title={tooltip}>
                    <i className="icon-question color-black m-l-5" />
                </Tooltip>
                <i className={expandIcon} />
            </div>
        );
    };

    const toggleOpenCriteria = (criteriaName, state = null) => {
        setOpenCriteria({ ...openCriteria, [criteriaName]: state || !openCriteria[criteriaName] });
    };

    const onChangeResultListType = (e) => {
        e.preventDefault();
        if (e.target.value === "Company") {
            setSelectedResults([]);
            setSelectedGrouping({ ...selectedGrouping, resultType: e.target.value, accumulation: "None" });
        } else {
            setSelectedGrouping({ ...selectedGrouping, resultType: e.target.value });
        }
    };

    const onChangeAccumulation = (e) => {
        e.preventDefault();
        setSelectedGrouping({ ...selectedGrouping, accumulation: e.target.value });
        setSelectedResults([]);
    };

    const disableSaveBtn = useMemo(() => {
        return props?.removeSearch && selectedResults?.length < 1 && getAllSelectedCriteriaLength() === 0;
    }, [selectedResults, selectedMarketCriteria, selectedCPVValues, selectedNACValues, selectedUNSPValues]);

    const getGroupingCriteria = () => {
        return (
            <div className="searh-result-header" style={{ top: props?.sectionSearch ? 200 : 60 }}>
                <div className="text-left sub-title-txt">
                    {t('GROUPING_AND_TOTALS')}
                    <span className="tooltip-toggle" aria-label={"XXX"}>
                        <i className="icon-question color-black m-l-5" />
                    </span>
                </div>
                <div className="g-row">
                    <div className="g-col-4">
                        <DropdownSelect
                            values={["COMPANY", "NO_OF_ACCUMULATED"]}
                            placeholder={t('RESULT_LIST_TYPE')}
                            selected={selectedGrouping.resultType}
                            onChange={onChangeResultListType}
                        />
                    </div>
                    <div className="g-col-4">
                        <DropdownSelect
                            values={["None", "CPV Code", "NACE Code", "UNSPSC Code", "Municipality (Market)"]}
                            placeholder={t('ACCUMULATION')}
                            selected={selectedGrouping.accumulation}
                            onChange={onChangeAccumulation}
                            disabled={selectedGrouping.resultType !== "NO_OF_ACCUMULATED"}
                        />
                    </div>
                    <div className="g-col-4">
                        {/* <DropdownSelect values={[]} placeholder="Sorting" selected={''} onChange={() => { }} disabled /> */}
                    </div>
                </div>
            </div>
        );
    };

    const getCompanyInfoCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(
                    t("COMPANY_INFO"),
                    t('COMPANY_INFO_TOOLTIP'),
                    () => toggleOpenCriteria("CompanyInfo"),
                    openCriteria.CompanyInfo
                )}
                {openCriteria.CompanyInfo && (
                    <>
                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-15">{t("REGISTRATION_DATE")}</div>
                                    <div className="g-col-7">
                                        <DatePickerInput
                                            placeholder={t('FROM_DATE')}
                                            value={selectedCompanyInfo.registrationFromDate}
                                            onChange={(date) => changeCompanyInfoData(date, "registrationFromDate")}
                                            isClearable={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        <DatePickerInput
                                            placeholder={t('TO_DATE')}
                                            value={selectedCompanyInfo.registrationToDate}
                                            onChange={(date) => changeCompanyInfoData(date, "registrationToDate")}
                                            isClearable={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-5">{t("DATE_OF_INCOORPORATION")}</div>
                                    <div className="g-col-7">
                                        <DatePickerInput
                                            placeholder={t('FROM_DATE')}
                                            value={selectedCompanyInfo.incorpFromDate}
                                            onChange={(date) => changeCompanyInfoData(date, "incorpFromDate")}
                                            isClearable={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        <DatePickerInput
                                            placeholder={t('TO_DATE')}
                                            value={selectedCompanyInfo.incorpToDate}
                                            onChange={(date) => changeCompanyInfoData(date, "incorpToDate")}
                                            isClearable={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5" />
                                    <div className="g-col-7">
                                        <DropdownSelect
                                            values={numberOfEmployeesList}
                                            placeholder={t('NO_OF_EMPLOYEES')}
                                            selected={selectedCompanyInfo.noOfEmployees}
                                            onChange={(e) => changeCompanyInfoData(e.target.value, "noOfEmployees")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        <DropdownSelect
                                            values={organizationTypes}
                                            placeholder={t('ORGANIZATION_TYPE')}
                                            dataName="description"
                                            selected={
                                                selectedCompanyInfo.organizationType?.code
                                                    ? JSON.stringify(selectedCompanyInfo.organizationType)
                                                    : ""
                                            }
                                            onChange={onChangeOrgType}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-5">{t('STATUS')}</div>
                                    <div className="g-col-7">
                                        <DropdownSelect
                                            values={["ALL", "ACTIVE", "INACTIVE"]}
                                            selected={selectedCompanyInfo?.active}
                                            onChange={(e) => changeCompanyInfoData(e.target.value, "active")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        <Input
                                            placeholder={t('ORGANIZATION_ID')}
                                            value={selectedCompanyInfo.organizationId}
                                            onChange={onChangeOrgId}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-5">{t("SECTOR_CODE_INSTITUTION")}</div>
                                    <div className="g-col-7">
                                        <Input
                                            placeholder={t('SECTOR_CODE')}
                                            value={selectedCompanyInfo.sectorCode}
                                            onChange={onChangeSectorCode}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    const getMarketCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(
                    t("MARKET_INFORMATION"),
                    t("MARKET_INFORMATION_TOOLTIP"),
                    () => toggleOpenCriteria("Market"),
                    openCriteria.Market
                )}
                {openCriteria.Market && (
                    <div className="g-row">
                        <div className="g-col-3">
                            <DropdownList
                                placeholder={t("COUNTRY")}
                                dataList={marketInformationData.countries}
                                selectedList={selectedMarketCriteria}
                                setSelectedState={setSelectedMarketCriteria}
                                criteriaName="selectedCountries"
                                apiCalls={getCountryCodes}
                                selectedMarketHierarchy={selectedMarketHierarchy}
                                setSelectedMarketHierarchy={setSelectedMarketHierarchy}
                                marketLastSelectedCodeLvl={marketLastSelectedCodeLvl}
                                setMarketLastSelectedCodeLvl={setMarketLastSelectedCodeLvl}
                                codeLevel={0}
                            />
                        </div>
                        <div className="g-col-3">
                            <DropdownList
                                placeholder={t("LEVEL_1")}
                                dataList={marketInformationData.regions}
                                selectedList={selectedMarketCriteria}
                                setSelectedState={setSelectedMarketCriteria}
                                criteriaName="selectedRegions"
                                apiCalls={getCountryCodes}
                                selectedMarketHierarchy={selectedMarketHierarchy}
                                setSelectedMarketHierarchy={setSelectedMarketHierarchy}
                                marketLastSelectedCodeLvl={marketLastSelectedCodeLvl}
                                setMarketLastSelectedCodeLvl={setMarketLastSelectedCodeLvl}
                                codeLevel={1}
                            />
                        </div>
                        <div className="g-col-3">
                            <DropdownList
                                placeholder={t("LEVEL_2")}
                                dataList={marketInformationData.cities}
                                selectedList={selectedMarketCriteria}
                                setSelectedState={setSelectedMarketCriteria}
                                criteriaName="selectedCities"
                                apiCalls={getCountryCodes}
                                selectedMarketHierarchy={selectedMarketHierarchy}
                                setSelectedMarketHierarchy={setSelectedMarketHierarchy}
                                marketLastSelectedCodeLvl={marketLastSelectedCodeLvl}
                                setMarketLastSelectedCodeLvl={setMarketLastSelectedCodeLvl}
                                codeLevel={2}
                            />
                        </div>
                        <div className="g-col-3">
                            <DropdownList
                                placeholder={t("LEVEL_3")}
                                dataList={marketInformationData.municipalities}
                                selectedList={selectedMarketCriteria}
                                setSelectedState={setSelectedMarketCriteria}
                                criteriaName="selectedMunicipalities"
                                selectedMarketHierarchy={selectedMarketHierarchy}
                                setSelectedMarketHierarchy={setSelectedMarketHierarchy}
                                marketLastSelectedCodeLvl={marketLastSelectedCodeLvl}
                                setMarketLastSelectedCodeLvl={setMarketLastSelectedCodeLvl}
                                codeLevel={3}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const setMarketSearchCriteria = () => {
        let countries = [];
        let regions = [];
        let cities = [];
        let municipalities = [];

        selectedMarketValues.map((node) => {
            if (node[0].code) countries.push({ code: node[0].code });

            if (node.length > 1) {
                for (let i = 1; i <= node.length; i++) {
                    if (Array.isArray(node[i])) {
                        if (node[i].length >= 2) {
                            regions.push({ code: node[i][1].code });
                        }
                        if (node[i].length >= 3) {
                            cities.push({ code: node[i][2].code });
                        }
                        if (node[i].length >= 4) {
                            municipalities.push({ code: node[i][3].code });
                        }
                    }
                }
            }
        });

        let newCriteria = {
            ...selectedMarketCriteria,
            selectedCountries: countries,
            selectedRegions: regions,
            selectedCities: cities,
            selectedMunicipalities: municipalities,
        };
        setSelectedMarketCriteria(newCriteria);
    };

    useEffect(() => {
        setMarketSearchCriteria();
    }, [selectedMarketValues]);

    const getMarketTreeCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(
                    t("MARKET_INFORMATION"),
                    t("MARKET_INFORMATION_TOOLTIP"),
                    () => toggleOpenCriteria("Market"),
                    openCriteria.Market
                )}
                {openCriteria.Market && (
                    <>
                        <div className="g-row">
                            <div className="g-col-3">
                                {Dropdown({
                                    placeholder: t("COUNTRY"),
                                    dataList: marketInformationData.countries,
                                    dataName: "name",
                                    selectedList: selectedMarketValues,
                                    setSelectedState: setSelectedMarketValues,
                                    selectedRows: selectedMarketRows,
                                    setSelectedRows: setSelectedMarketRows,
                                    apiCalls: getCountryCodes2,
                                    useObjectForApi: true,
                                    codelevel: 1,
                                    keyName: "code",
                                })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({
                                    placeholder: t("LEVEL_1"),
                                    dataList: marketInformationData.regions,
                                    dataName: "name",
                                    selectedList: selectedMarketValues,
                                    setSelectedState: setSelectedMarketValues,
                                    selectedRows: selectedMarketRows,
                                    setSelectedRows: setSelectedMarketRows,
                                    apiCalls: getCountryCodes2,
                                    useObjectForApi: true,
                                    codelevel: 2,
                                    keyName: "code",
                                })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({
                                    placeholder: t("LEVEL_2"),
                                    dataList: marketInformationData.cities,
                                    dataName: "name",
                                    selectedList: selectedMarketValues,
                                    setSelectedState: setSelectedMarketValues,
                                    selectedRows: selectedMarketRows,
                                    setSelectedRows: setSelectedMarketRows,
                                    apiCalls: getCountryCodes2,
                                    useObjectForApi: true,
                                    codelevel: 3,
                                    keyName: "code",
                                })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({
                                    placeholder: t("LEVEL_3"),
                                    dataList: marketInformationData.municipalities,
                                    dataName: "name",
                                    selectedList: selectedMarketValues,
                                    setSelectedState: setSelectedMarketValues,
                                    selectedRows: selectedMarketRows,
                                    setSelectedRows: setSelectedMarketRows,
                                    apiCalls: getCountryCodes2,
                                    useObjectForApi: true,
                                    codelevel: 4,
                                    keyName: "code",
                                })}
                            </div>
                        </div>
                        <SearchSelectedValues
                            selectedValues={selectedMarketValues}
                            setSelectedValues={setSelectedMarketValues}
                            selectedRows={selectedMarketRows}
                            setSelectedRows={setSelectedMarketRows}
                            useObjectForApi={true}
                            apiCalls={getCountryCodes2}
                        />
                    </>
                )}
            </div>
        );
    };

    const getProductGroupsCriteria = () => {
        return (
            <div className="g-col-12">
                <div className="gray-container">
                    {getCriteriaHeader(
                        t("PRODUCT_GROUPS"),
                        t("PRODUCT_GROUPS_TOOLTIP"),
                        () => toggleOpenCriteria("ProductGroups"),
                        openCriteria.ProductGroups
                    )}
                    {openCriteria.ProductGroups && (
                        <>
                            <div className="m-t-5">{t("UNSPSC_CODES")}</div>
                            <div className="g-row">
                                <div className="g-col-3">
                                    {Dropdown({
                                        placeholder: t("SEGMENT"),
                                        dataList: unspscData.segmant,
                                        dataName: "title",
                                        selectedList: selectedUNSPValues,
                                        setSelectedState: setSelectedUNSPValues,
                                        selectedRows: selectedUNSPRows,
                                        setSelectedRows: setSelectedUNSPRows,
                                        apiCalls: getUnspscCodesData,
                                        codelevel: 1,
                                        keyName: "code",
                                    })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({
                                        placeholder: t("FAMILY"),
                                        dataList: unspscData.family,
                                        dataName: "title",
                                        selectedList: selectedUNSPValues,
                                        setSelectedState: setSelectedUNSPValues,
                                        selectedRows: selectedUNSPRows,
                                        setSelectedRows: setSelectedUNSPRows,
                                        apiCalls: getUnspscCodesData,
                                        codelevel: 2,
                                        keyName: "code",
                                    })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({
                                        placeholder: t("CLASS"),
                                        dataList: unspscData.unspClass,
                                        dataName: "title",
                                        selectedList: selectedUNSPValues,
                                        setSelectedState: setSelectedUNSPValues,
                                        selectedRows: selectedUNSPRows,
                                        setSelectedRows: setSelectedUNSPRows,
                                        apiCalls: getUnspscCodesData,
                                        codelevel: 3,
                                        keyName: "code",
                                    })}
                                </div>
                                <div className="g-col-4">
                                    {Dropdown({
                                        placeholder: t("COMMODITY_CLASS"),
                                        dataList: unspscData.comClass,
                                        dataName: "title",
                                        selectedList: selectedUNSPValues,
                                        setSelectedState: setSelectedUNSPValues,
                                        selectedRows: selectedUNSPRows,
                                        setSelectedRows: setSelectedUNSPRows,
                                        codelevel: 4,
                                        keyName: "code",
                                    })}
                                </div>
                            </div>
                            <SearchSelectedValues
                                selectedValues={selectedUNSPValues}
                                setSelectedValues={setSelectedUNSPValues}
                                selectedRows={selectedUNSPRows}
                                setSelectedRows={setSelectedUNSPRows}
                                apiCalls={getUnspscCodesData}
                            />
                            <div className="fl m-t-15">{t('CPV_CODES')}</div>
                            <div className="g-row">
                                <div className="g-col-2">
                                    {Dropdown({
                                        placeholder: t("DIVISION"),
                                        dataList: cpvData.division,
                                        dataName: "desscription",
                                        selectedList: selectedCPVValues,
                                        setSelectedState: setSelectedCPVValues,
                                        selectedRows: selectedCPVRows,
                                        setSelectedRows: setSelectedCPVRows,
                                        apiCalls: getcpvCodesData,
                                        codelevel: 1,
                                        keyName: "code",
                                    })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({
                                        placeholder: t("GROUP"),
                                        dataList: cpvData.cpvGroup,
                                        dataName: "desscription",
                                        selectedList: selectedCPVValues,
                                        setSelectedState: setSelectedCPVValues,
                                        selectedRows: selectedCPVRows,
                                        setSelectedRows: setSelectedCPVRows,
                                        apiCalls: getcpvCodesData,
                                        codelevel: 2,
                                        keyName: "code",
                                    })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({
                                        placeholder: t("CLASS"),
                                        dataList: cpvData.cpvClass,
                                        dataName: "desscription",
                                        selectedList: selectedCPVValues,
                                        setSelectedState: setSelectedCPVValues,
                                        selectedRows: selectedCPVRows,
                                        setSelectedRows: setSelectedCPVRows,
                                        apiCalls: getcpvCodesData,
                                        codelevel: 3,
                                        keyName: "code",
                                    })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({
                                        placeholder: t("CATEGORY"),
                                        dataList: cpvData.category,
                                        dataName: "desscription",
                                        selectedList: selectedCPVValues,
                                        setSelectedState: setSelectedCPVValues,
                                        selectedRows: selectedCPVRows,
                                        setSelectedRows: setSelectedCPVRows,
                                        apiCalls: getcpvCodesData,
                                        codelevel: 4,
                                        keyName: "code",
                                    })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({
                                        placeholder: t("SUB_CATEGORY"),
                                        dataList: cpvData.subCategory,
                                        dataName: "desscription",
                                        selectedList: selectedCPVValues,
                                        setSelectedState: setSelectedCPVValues,
                                        selectedRows: selectedCPVRows,
                                        setSelectedRows: setSelectedCPVRows,
                                        codelevel: 5,
                                        keyName: "code",
                                    })}
                                </div>
                            </div>
                            <SearchSelectedValues
                                selectedValues={selectedCPVValues}
                                setSelectedValues={setSelectedCPVValues}
                                selectedRows={selectedCPVRows}
                                setSelectedRows={setSelectedCPVRows}
                                apiCalls={getcpvCodesData}
                            />
                        </>
                    )}
                </div>
            </div>
        );
    };

    const getProfessionCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(
                    t("PROFESSION_NACE_CODES"),
                    t("PROFESSION_NACE_CODES_TOOLTIP"),
                    () => toggleOpenCriteria("Profession"),
                    openCriteria.Profession
                )}
                {openCriteria.Profession && (
                    <div>
                        <div className="g-row m-b-10">
                            <div className="g-col-3">
                                {Dropdown({
                                    placeholder: t("SECTION"),
                                    dataList: professionData.section,
                                    dataName: "desscription",
                                    selectedList: selectedNACValues,
                                    setSelectedState: setSelectedNACValues,
                                    selectedRows: selectedNACRows,
                                    setSelectedRows: setSelectedNACRows,
                                    apiCalls: getProfessionData,
                                    codelevel: 1,
                                    keyName: "code",
                                })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({
                                    placeholder: t("DIVISION"),
                                    dataList: professionData.divition,
                                    dataName: "desscription",
                                    selectedList: selectedNACValues,
                                    setSelectedState: setSelectedNACValues,
                                    selectedRows: selectedNACRows,
                                    setSelectedRows: setSelectedNACRows,
                                    apiCalls: getProfessionData,
                                    codelevel: 2,
                                    keyName: "code",
                                })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({
                                    placeholder: t("GROUP"),
                                    dataList: professionData.profGroup,
                                    dataName: "desscription",
                                    selectedList: selectedNACValues,
                                    setSelectedState: setSelectedNACValues,
                                    selectedRows: selectedNACRows,
                                    setSelectedRows: setSelectedNACRows,
                                    apiCalls: getProfessionData,
                                    codelevel: 3,
                                    keyName: "code",
                                })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({
                                    placeholder: t("CLASS"),
                                    dataList: professionData.profClass,
                                    dataName: "desscription",
                                    selectedList: selectedNACValues,
                                    setSelectedState: setSelectedNACValues,
                                    selectedRows: selectedNACRows,
                                    setSelectedRows: setSelectedNACRows,
                                    codelevel: 4,
                                    keyName: "code",
                                })}
                            </div>
                        </div>
                        <SearchSelectedValues
                            selectedValues={selectedNACValues}
                            setSelectedValues={setSelectedNACValues}
                            selectedRows={selectedNACRows}
                            setSelectedRows={setSelectedNACRows}
                            apiCalls={getProfessionData}
                        />
                    </div>
                )}
            </div>
        );
    };

    const onPeppolCheckBoxSelect = (e, label) => {
        switch (label) {
            case "PEPPOL_INVOICE_AND_CREDIT_NOTES":
                setSelectedPeppol({ ...selectedPeppol, invoiceCreditNote: e.target.checked });
                break;
            case "PEPPOL_ORDER_RESPONSE":
                setSelectedPeppol({ ...selectedPeppol, orderResponse: e.target.checked });
                break;
            case "PEPPOL_ORDER":
                setSelectedPeppol({ ...selectedPeppol, order: e.target.checked });
                break;
            case "PEPPOL_DISPATCH_ADVISE":
                setSelectedPeppol({ ...selectedPeppol, advice: e.target.checked });
                break;
            case "PEPPOL_CONTRACT":
                setSelectedPeppol({ ...selectedPeppol, contract: e.target.checked });
                break;
            case "PEPPOL_CATALOGUE":
                setSelectedPeppol({ ...selectedPeppol, catalog: e.target.checked });
                break;
            case "PEPPOL_PROPOSALS":
                setSelectedPeppol({ ...selectedPeppol, proposals: e.target.checked });
                break;
            default:
                break;
        }
    };

    const getPeppolRow = (leftText, rightText) => {
        return (
            <div className="g-row m-b-20">
                <div className="g-col-4">
                    <input type="checkbox" className="fl check-box m-r-15" onChange={(e) => onPeppolCheckBoxSelect(e, leftText)} />
                    <div className="fl">{t(leftText)}</div>
                </div>
                <div className="g-col-4"></div>
                {rightText && (
                    <div className="g-col-4">
                        <input type="checkbox" className="fl check-box m-r-15" onChange={(e) => onPeppolCheckBoxSelect(e, rightText)} />
                        <div className="fl">{t(rightText)}</div>
                    </div>
                )}
            </div>
        );
    };

    const getPeppolCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(
                    t("PEPPOL_DOCUMENTS"),
                    t("PEPPOL_DOCUMENTS_TOOLTIP"),
                    () => toggleOpenCriteria("Peppol"),
                    openCriteria.Peppol
                )}
                {openCriteria.Peppol && (
                    <div>
                        <div className="p-y-30">{t("PEPPOL_DOCUMENTS_POST_AWARD")}</div>
                        {getPeppolRow("PEPPOL_INVOICE_AND_CREDIT_NOTES", "PEPPOL_ORDER_RESPONSE")}
                        {getPeppolRow("PEPPOL_ORDER", "PEPPOL_DISPATCH_ADVISE")}
                        {getPeppolRow("PEPPOL_CONTRACT", "PEPPOL_CATALOGUE")}

                        <div className="n-float p-y-30">{t("PEPPOL_DOCUMENTS_PRE_AWARD")}</div>
                        {getPeppolRow("PEPPOL_PROPOSALS")}
                    </div>
                )}
            </div>
        );
    };

    const actions = (
        <Menu>
            <Menu.Item key={1}
                onClick={onShowResults}
                disabled={selectedResults?.length === 0 && !removeAllResultsChecked}>
                <Tooltip title={t("ROWS_CHECKED_REMOVED")}>
                    {t("REMOVE")}
                </Tooltip>
            </Menu.Item>
            <Menu.Item key={2} onClick={onReset} >{t('REFRESH')}</Menu.Item>
            <Menu.Item key={3} onClick={onSaveResults} >{t('SAVE')}</Menu.Item>
        </Menu>
    );

    return (
        <div className={loading && "loading-overlay"}>
            <div className="g-col-6 ">
                <div className="bg-white buyer-search-crieteria-container">
                    <form onSubmit={onShowResults}>
                        {!props?.removeSearch && (
                            <div className="g-row flex-center-middle m-b-15">
                                <div className="search-bar g-col-10 m-r-10">
                                    <i className="search-btn icon-search" onClick={onShowResults}></i>
                                    <input
                                        type="text"
                                        onChange={handleSearch}
                                        value={searchText}
                                        placeholder={t("SEARCH_BY_LOCATION")}
                                    />
                                </div>
                                <div className="g-col-2 g-row hover-hand">
                                    <span className="fl g-col-6 m-r-10">English </span>
                                    <span className="fl g-col-3">
                                        <img src={gb_flag} className="flag-image fl m-r-5" />
                                    </span>
                                    <i className="g-col-1 icon-arrow-down fl" />
                                </div>
                            </div>
                        )}
                        <p>{t("NARROW_DOWN_YOUR_SEARCH")}</p>
                        {getCompanyInfoCriteria()}
                        {/* {getMarketCriteria()} */}
                        {getMarketTreeCriteria()}
                        {getProductGroupsCriteria()}
                        {getProfessionCriteria()}
                        {getPeppolCriteria()}
                        <div className="action-bar">
                            <div className="g-row">
                                <div className="g-col-6">
                                    <button className="primary-btn m-l-10" onClick={onShowResults}>
                                        {props?.removeSearch ? t("FILTER_RESULT") : t("SHOW_RESULT")}
                                    </button>
                                    {!props?.sectionSearch && (
                                        <button
                                            className="primary-btn"
                                            onClick={() => {
                                                changeActiveTab(NAVIGATION_PAGES.BUYER_SEARCHRESULTS);
                                            }}
                                        >
                                            {t("VIEW_HISTORY")}
                                        </button>
                                    )}
                                </div>
                                <div className="g-col-6">
                                    {props.removeSearch ?
                                        <AntDropdown
                                            overlay={actions} placement="topRight" arrow
                                        >
                                            <button className="primary-btn save-button fr" >Select Action</button>
                                        </AntDropdown>
                                        : <button className="primary-btn save-button fr" onClick={onSaveResults} disabled={disableSaveBtn}>
                                            {t(saveButtonText)}
                                        </button>
                                    }

                                    {/* {props.removeSearch && <div className="fr m-r-20 m-t-10">{t("ROWS_CHECKED_REMOVED")}</div>} */}
                                    {!props.removeSearch && props?.searchResults?.length > 0 && (
                                        <div className="fr m-r-20 m-t-10">{t("IF_YOU_DO_FRESH_SEARCH")}</div>
                                    )}

                                    <div className="buyer-search-result-pagination-container fl">
                                        <Pagination
                                            size="small"
                                            current={actPage}
                                            onChange={(pageNum) => {
                                                onChangePage(pageNum);
                                            }}
                                            total={pageCount}
                                            showSizeChanger={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="g-col-6 bg-white">
                <div>
                    <div className="title-txt text-center">{t("RESULTS")}</div>
                    {getGroupingCriteria()}
                    {loading && (
                        <div className="loading">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                    {noSearchResults && (
                        <div className="sub-title-txt text-center">{removeAllResultsChecked ? t('ALL_RESULTS_REMOVED') : t("NO_RESULTS")}</div>
                    )}
                    {Object.values(grouping).length !== 0 && (
                        <>
                            <div className={props?.sectionSearch ? "section-search-results-container" : "search-results-container"}>
                                {/* {props.removeSearch &&
                                    <>
                                        <div className="fr selectAll-checkbox">
                                            Select All Records
                                            <input type="checkbox" checked={removeAllResultsChecked} className="check-box m-l-20" onChange={() => { setRemoveAllResultsChecked(prev => !prev) }} />
                                        </div>
                                    </>
                                } */}
                                <div className="g-row">
                                    <div className="g-col-3">{t("SEARCH_CRITERIA")}</div>
                                    <div className="g-col-2">{t("CRITERIA_CODES")}</div>
                                    <div className="g-col-3">{t("CRITERIA_NAME")}</div>
                                    <div className="g-col-2">{t("COMPANIES")}</div>
                                </div>
                                {Object.entries(grouping).map(([key, value]) => {
                                    return (
                                        <div className="search-result-row g-row" key={key}>
                                            <div className="g-col-3 body-text-bold blue">{key}</div>
                                            <div className="g-col-9">
                                                {value.map((group, index) => {
                                                    return (
                                                        <div key={index}>
                                                            {typeof group._id === "object" ? (
                                                                <div className="g-row">
                                                                    <div className="g-col-3 body-text blue">
                                                                        {Object.values(group._id)[0]}
                                                                    </div>
                                                                    <div className="g-col-3 body-text blue">
                                                                        {Object.values(group._id)[1]}
                                                                    </div>
                                                                    <div className="g-col-1 body-text blue">
                                                                        {Object.values(group._id)[2]}
                                                                    </div>
                                                                    <div className="g-col-4 body-text blue">{group?.count}</div>
                                                                    {props.removeSearch && (
                                                                        <input
                                                                            className="g-col-1 check-box"
                                                                            type="checkbox"
                                                                            onChange={onCheckBox}
                                                                            value={Object.values(group._id)[0]}
                                                                            checked={selectedResults?.includes(Object.values(group._id)[0])}
                                                                        />
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="g-col-4 body-text blue">{group._id}</div>
                                                                    {/* <div className="g-col-4 body-text blue">XXX</div> */}
                                                                    <div className="g-col-4 body-text blue">{group?.count}</div>
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                    {organizations?.length > 0 && (
                        <>
                            <div className={props?.sectionSearch ? "section-search-results-container" : "search-results-container"}>
                                {props.removeSearch && (
                                    <>
                                        <div className="fr selectAll-checkbox">
                                            {t('SELECT_PAGE')}
                                            <input
                                                type="checkbox"
                                                key={"SelectAllCheckBox2"}
                                                className="check-box m-l-20"
                                                onChange={onSelectAllCheckBox}
                                            />
                                        </div>
                                    </>
                                )}
                                {organizations.map((organization) => {
                                    return (
                                        <div key={organization?.id} className="search-result-row g-row">
                                            <div className="g-col-6">
                                                <div>{organization?.organizationName}</div>
                                                <div>{organization?.businessAddress?.country || ""}</div>
                                            </div>
                                            <div className="g-col-6">
                                                <div>{organization?.organizationId}</div>
                                                <div>{organization?.businessAddress?.city}</div>
                                            </div>
                                            {props.removeSearch && (
                                                <div className="g-col-1">
                                                    {" "}
                                                    <input
                                                        type="checkbox"
                                                        value={organization.organizationId}
                                                        checked={selectedResults?.includes(organization.organizationId)}
                                                        className="check-box"
                                                        onChange={onCheckBox}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {projectsData?.length === 0 ?
                <Modal
                    title="No saved projects"
                    visible={showModel}
                    width={350}
                    centered={true}
                    closeIcon={< i className='icon-close close-icon' />}
                    footer={null}
                >
                    <div className="g-row">
                        <div className="g-col-6">
                            <button className="secondary-btn m-r-10" onClick={toggleModal} disabled={disableSaveBtn}>
                                {t('CANCEL')}
                            </button>
                        </div>
                        <div className="g-col-6">
                            <button className="primary-btn fl" onClick={onSaveResultsWithSection} disabled={disableSaveBtn}>
                                {t('CREATE_NEW')}
                            </button>
                        </div>
                    </div>
                    <div className="n-float" />
                </Modal>
                : <Modal
                    title={"Save Search Result"}
                    visible={showModel}
                    onOk={onSaveResultsWithSection}
                    okText={t('SAVE')}
                    onCancel={toggleModal}
                    cancelText={t('CANCEL')}
                    width={1000}
                    centered={true}
                    closeIcon={< i className='icon-close close-icon' />}
                >
                    <>
                        <DropdownSelect
                            values={projectsData}
                            onChange={onSelectProject}
                            selected={JSON.stringify(selectedProject || undefined)}
                            dataName="Name"
                            placeholder={t('PROJECT')}
                            error={newSectionDataError.Project}
                        />
                        <div className="g-row">
                            <div className="g-col-6 m-b-20">
                                <div className="m-b-10">
                                    <Input
                                        placeholder={t('NAME_PLACEhOLDER')}
                                        value={newSectionData.Name || ""}
                                        onChange={(e) => onNewElementChange(e, "Name")}
                                        error={newSectionDataError.Name}
                                    />
                                </div>
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
                                    error={newSectionDataError.Purpose}
                                />
                            </div>
                            <div className="g-col-6 m-b-20">
                                <DatePickerInput
                                    placeholder={t('FROM_DATE')}
                                    value={newSectionData.FromDate ? new Date(newSectionData.FromDate) : ""}
                                    onChange={(date) => onNewElementDateChange(date, "FromDate")}
                                    minDate={new Date()}
                                    maxDate={selectedProject?.ToDate !== null ? new Date(selectedProject?.ToDate) : false}
                                    error={newSectionDataError.FromDate}
                                />
                                <DatePickerInput
                                    placeholder={t('DUE_DATE')}
                                    value={newSectionData.ToDate ? new Date(newSectionData.ToDate) : ""}
                                    onChange={(date) => onNewElementDateChange(date, "ToDate")}
                                    minDate={new Date()}
                                    maxDate={selectedProject?.ToDate !== null ? new Date(selectedProject?.ToDate) : false}
                                    error={newSectionDataError.ToDate}
                                />
                                <DropdownSelect
                                    values={["OPEN", "CLOSE"]}
                                    onChange={(e) => onNewElementChange(e, "Status")}
                                    selected={newSectionData.Status || ""}
                                    placeholder={'STATUS'}
                                    error={newSectionDataError.Status}
                                />
                            </div>
                        </div>
                    </>
                </Modal>
            }

            <Modal
                title={t("CREATE_NEW_SEARCH_PROJECT")}
                visible={createProjectModalVisible}
                onOk={onCreateProject}
                okText={t('SAVE')}
                onCancel={toggleCreateProjModal}
                cancelText={t("CANCEL")}
                centered={true}
                width={1000}
                closeIcon={< i className='icon-close close-icon' />}
            >
                <div className="g-row">
                    <div className="g-col-6">
                        <Input
                            placeholder="NAME_PLACEhOLDER"
                            value={newProjectData.Name || ''}
                            onChange={(e) => onNewProjElementChange(e, 'Name')}
                            error={newProjectDataError?.Name}
                        />
                        <DropdownSelect values={['RESEARCH_PROJECT', 'PROCUREMENT_PROJECT']} onChange={(e) => onNewProjElementChange(e, 'TypeCode')} selected={newProjectData.TypeCode || 'RESEARCH_PROJECT'} placeholder="TYPE" />
                        <Input lines={3} placeholder="DESCRIPTION" value={newProjectData.Description || ''} onChange={(e) => onNewProjElementChange(e, 'Description')} />
                        <DropdownSelect values={['PUBLIC', 'PRIVATE']} onChange={(e) => onNewProjElementChange(e, 'Permission')} selected={newProjectData.Permission || 'PRIVATE'} placeholder="PERMISSION_TYPE" />
                    </div>
                    <div className="g-col-6">
                        <DatePickerInput
                            placeholder={t('FROM_DATE')}
                            value={newProjectData.FromDate ? new Date(newProjectData.FromDate) : ''}
                            minDate={new Date()}
                            onChange={(date) => onNewProjElementDateChange(date, 'FromDate')}
                            error={newProjectDataError?.FromDate}
                        />
                        <DatePickerInput
                            placeholder={t('DUE_DATE')}
                            value={newProjectData.ToDate ? new Date(newProjectData.ToDate) : ''} minDate={new Date()}
                            onChange={(date) => onNewProjElementDateChange(date, 'ToDate')}
                            error={newProjectDataError?.ToDate}
                        />
                        <DropdownSelect
                            values={filterdContacts.map(a => a.label)}
                            onChange={(e) => onNewProjElementChange(e, 'Responsible')}
                            selected={newProjectData.Responsible || ''}
                            placeholder={"RESPONSIBLE_USER"}
                            error={newProjectDataError?.Responsible}
                        />
                        <DropdownSelect
                            values={['OPEN', 'CLOSE']}
                            onChange={(e) => onNewProjElementChange(e, 'Status')}
                            selected={newProjectData.Status || ''}
                            placeholder="STATUS"
                            error={newProjectDataError?.Status}
                        />
                    </div>
                </div>
                <div className="n-float" />
            </Modal>
        </div>
    );
}
