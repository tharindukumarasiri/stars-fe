import React, { useState, useEffect, useContext, useMemo } from "react";
import { message, Pagination, Modal } from 'antd';
import { levelOneReq, nacSectionReq } from "../../utils/constants";
import gb_flag from "../../assets/images/gb_flag.png"
import Model from "../../common/model";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
    getCountries,
    getRegions,
    getMunicipalities,
    searchOrganization,
    getCities,
    getUnspscCodes,
    getCpvCodes,
    getNacCodes,
    addNewSearchResult,
    searchOrganizationByCPV,
    searchOrganizationByNACE,
    searchOrganizationByUNSPSC,
    removeSearch,
    deleteSearch,
    removeSearchAccumulateCpv,
    removeSearchAccumulateNace,
    removeAllOrganizationIds,
} from "../../services/organizationsService";
import DropdownList from "./Components/dropdownList"
import Dropdown from "./Components/dropdown";
import DropdownSelect from "../../common/dropdown"
import { arrayToUpper } from '../../utils/index';
import SearchSelectedValues from "./Components/searchSelectedValues";
import DatePickerInput from "../../common/datePickerInput";
import ToggleSwitch from "../../common/toggleSwitch";
import { useTranslation } from 'react-i18next'
const { confirm } = Modal;

const pageSize = 10;

let noSearchResults = false;

export default function Search(props) {
    const [openCriteria, setOpenCriteria] = useState({ Grouping: false, CompanyInfo: false, Market: false, ProductGroups: false, Profession: false, CreditTerms: false, Peppol: false });
    const [searchText, setSerachText] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [grouping, setGrouping] = useState({})

    // Data from back-end
    const [marketInformationData, setMarketInformationData] = useState({ countries: [{ "name": "Norway", "alpha3Code": "NOR" }], regions: [], cities: [], municipalities: [] });
    const [unspscData, setUnspscData] = useState({ segmant: [], family: [], unspClass: [], comClass: [] })
    const [cpvData, setCpvData] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] })
    const [professionData, setProfessionData] = useState({ section: [], divition: [], profGroup: [], profClass: [] })
    // Drop Down selected eliments data
    const [selectedCompanyInfo, setSelectedCompanyInfo] = useState({ registrationFromDate: '', registrationToDate: '', incorpFromDate: '', incorpToDate: '' })
    const [selectedMarketCriteria, setSelectedMarketCriteria] = useState({ selectedCountries: [], selectedRegions: [], selectedCities: [], selectedMunicipalities: [] });
    const [selectedUNSPValues, setSelectedUNSPValues] = useState([[[]]]);
    const [selectedUNSPRows, setSelectedUNSPRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedCPVValues, setSelectedCPVValues] = useState([[[]]]);
    const [selectedCPVRows, setSelectedCPVRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedNACValues, setSelectedNACValues] = useState([[[]]]);
    const [selectedNACRows, setSelectedNACRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedGrouping, setSelectedGrouping] = useState({ resultType: '', accumulation: '', sorting: '' })

    const [pageCount, setPageCount] = useState(0);
    const [actPage, setActPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const [selectedResults, setSelectedResults] = useState([]);
    const [removeAllResultsChecked, setRemoveAllResultsChecked] = useState(false);

    const [showModel, setShowModel] = useState(false);
    const { t } = useTranslation();

    const { changeActiveTab } = useContext(TabContext)

    useEffect(() => {
        // getCountries().then(result => { setMarketInformationData({...marketInformationData, countries: result}) });
        getUnspscCodes(levelOneReq).then(result => { setUnspscData({ ...unspscData, segmant: result }) });
        getCpvCodes(levelOneReq).then(result => { setCpvData({ ...cpvData, division: result }) })
        getNacCodes(nacSectionReq).then(result => { setProfessionData({ ...professionData, section: result }) });
    }, []);

    useEffect(() => {
        if (props?.removeSearch && props?.searchResults?.length > 0) {
            const searchResultsSet = props?.searchResults[0]

            setLoading(true);
            const removalReq = {
                "searchCriteria": {
                    "name": searchResultsSet?.searchFilter.name || "",
                    "countries": searchResultsSet?.searchFilter.countries || null,
                    "regions": searchResultsSet?.searchFilter.regions || null,
                    "cities": searchResultsSet?.searchFilter.cities || null,
                    "municipalities": searchResultsSet?.searchFilter.municipalities || null,
                    "cpvs": searchResultsSet?.searchFilter.cpvs || null,
                    "naces": searchResultsSet?.searchFilter.naces || null,
                    "unspscs": searchResultsSet?.searchFilter.unspscs || null,
                    "pageSize": pageSize,
                    "pageNo": 1,
                },
                "removeCritieria": {
                    "organizationIds": props?.searchResults[1]?.removeCriteria?.organizationIds || null
                }
            }

            setSelectedResults(searchResultsSet?.removeCriteria?.organizationIds || [])

            removeSearch(props.searchResults[0].id, removalReq).then(result => {
                setLoading(false);
                setOrganizations(result.organizations);
                setPageCount(result.total);
            }).catch(() => {
                setLoading(false);
            });
        }
    }, [props]);

    useEffect(() => {
        const searchReq = getSearchRequest(1);
        const allSelectedCriteria = searchReq.countries.concat(searchReq.regions, searchReq.cities, searchReq.municipalities, searchReq.cpvs, searchReq.naces, searchReq.unspscs)
        if (allSelectedCriteria.length !== 0 || searchText !== '') {
            onShowResults();
        }
    }, [selectedGrouping.accumulation]);

    //API calls
    const getRegionsData = (countryName) => {
        getRegions(countryName).then(result => { setMarketInformationData({ ...marketInformationData, regions: result }) });
    }

    const getMunicipalitiesData = (regionName) => {
        getMunicipalities(regionName).then(result => { setMarketInformationData({ ...marketInformationData, municipalities: result }) });
    }

    const getCityData = (MunicipalityName) => {
        getCities(MunicipalityName).then(result => { setMarketInformationData({ ...marketInformationData, cities: result }) });
    }

    const getUnspscCodesData = (title, level) => {

        const getUnspscName = (lvl) => {
            switch (lvl) {
                case 1:
                    return 'segmant';
                case 2:
                    return 'family';
                case 3:
                    return 'unspClass';
                case 4:
                    return 'comClass';
                default:
                    break;
            }
        }

        const selectedUnspscData = unspscData[getUnspscName(level - 1)].filter(item => item.title === title)

        const data = {
            "level": level,
            "code": selectedUnspscData[0].code
        }

        getUnspscCodes(data).then(result => {
            setUnspscData({ ...unspscData, [getUnspscName(level)]: result })
            if (level === 2) {
                setUnspscData({ ...unspscData, [getUnspscName(level)]: result, [getUnspscName(level + 1)]: [], [getUnspscName(level + 2)]: [] })
            } else {
                setUnspscData({ ...unspscData, [getUnspscName(level)]: result })
            }
        });
    }

    const getcpvCodesData = (desscription, level) => {
        const getCpvName = (lvl) => {
            switch (lvl) {
                case 1:
                    return 'division';
                case 2:
                    return 'cpvGroup';
                case 3:
                    return 'cpvClass';
                case 4:
                    return 'category';
                case 5:
                    return 'subCategory';
                default:
                    break;
            }
        }

        const selectedCpvData = cpvData[getCpvName(level - 1)].filter(item => item.desscription === desscription)

        const data = {
            "level": level,
            "code": selectedCpvData[0].code
        }

        getCpvCodes(data).then(result => {
            if (level === 2) {
                setCpvData({ ...cpvData, [getCpvName(level)]: result, [getCpvName(level + 1)]: [], [getCpvName(level + 2)]: [], [getCpvName(level + 3)]: [] })
            } else {
                setCpvData({ ...cpvData, [getCpvName(level)]: result })
            }
        });
    }

    const getProfessionData = (desscription, level) => {
        const getProfName = (lvl) => {
            switch (lvl) {
                case 1:
                    return 'section';
                case 2:
                    return 'divition';
                case 3:
                    return 'profGroup';
                case 4:
                    return 'profClass';
                default:
                    break;
            }
        }

        const profData = professionData[getProfName(level - 1)].filter(item => item.desscription === desscription)
        const data = {
            "level": level.toString(),
            "parent": profData[0].code
        }

        getNacCodes(data).then(result => {
            if (level === 2) {
                setProfessionData({ ...professionData, [getProfName(level)]: result, [getProfName(level + 1)]: [], [getProfName(level + 2)]: [] })
            } else {
                setProfessionData({ ...professionData, [getProfName(level)]: result })
            }
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSerachText(e.target.value);
    }

    const convertStringObject = (object) => {
        const newObject = {}
        Object.entries(object).forEach(([key, value]) => {
            newObject[key] = JSON.parse(value)
        })
        return newObject;
    }

    const onShowResults = (e = null) => {
        if (e)
            e.preventDefault();

        if (props?.searchResults?.length > 0 && !props?.removeSearch) {
            confirm({
                title: <>{t("If you want to do a fresh search")} <strong className="red">{t('delete')}</strong> {t("your saved Criteria and results")}</>,
                icon: <ExclamationCircleOutlined />,
                okText: t('Yes'),
                okType: 'danger',
                cancelText: t('No'),
                onOk() {
                    deleteSearch(props?.searchResults[0]).then(() => {
                        setOrganizations([]);
                        if (props?.searchResults.length === 2) {
                            deleteSearch(props?.searchResults[1]).then(() => {
                                message.success("Delete results successful")
                                props.getSearchResults();
                            }).catch(() => {
                                message.success("Delete results fail")
                            })
                        } else {
                            message.success("Delete results successful")
                            props.getSearchResults();
                        }
                    }).catch(() => {
                        message.success("Delete results fail")
                    })
                },
            });
        } else {
            setOrganizations([]);
            setGrouping({});
            window.scrollTo(0, 0)
            const searchReq = getSearchRequest(1);
            const allSelectedCriteria = searchReq.countries.concat(searchReq.regions, searchReq.cities, searchReq.municipalities, searchReq.cpvs, searchReq.naces, searchReq.unspscs)
            if (allSelectedCriteria.length === 0 && searchText === '' && !props.removeSearch) {
                message.warning('Please select criterias to search');
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
    }

    const callremoveOrganization = (pageNo) => {
        if (removeAllResultsChecked) {
            removeAllOrganizationIds(getRemovalRequest(1).searchCriteria).then(result => {
                const removeRequest = getRemovalRequest(pageNo)
                removeRequest.removeCritieria.organizationIds = result
                setSelectedResults(result);

                switch (selectedGrouping.accumulation) {
                    case '':
                    case 'None':
                        removeSearch(props.searchResults[0].id, removeRequest).then(result => {
                            setLoading(false);
                            setOrganizations(result.organizations);
                            setPageCount(result.total);
                        }).catch(error => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                        break;
                    case 'CPV Code':
                        removeSearchAccumulateCpv(props.searchResults[0].id, removeRequest).then(result => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.total);
                        }).catch(error => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                        break;
                    case 'NACE Code':
                        removeSearchAccumulateNace(props.searchResults[0].id, removeRequest).then(result => {
                            setLoading(false);
                            setGrouping(convertStringObject(result.grouping));
                            setOrganizations(result.organizations);
                            setPageCount(result.total);
                        }).catch(error => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                        break;
                    case 'UNSPSC Code':
                        // searchOrganizationByUNSPSC(getSearchRequest(pageNo)).then(result => {
                        //     setLoading(false);
                        //     setGrouping(convertStringObject(result.grouping));
                        //     setOrganizations(result.organizations);
                        //     setPageCount(result.total);
                        // }).catch(error => {
                        //     noSearchResults = true;
                        //     setLoading(false);
                        // });
                        break;
                    default:
                        removeSearch(props.searchResults[0].id, removeRequest).then(result => {
                            setLoading(false);
                            setOrganizations(result.organizations);
                            setPageCount(result.total);
                        }).catch(error => {
                            noSearchResults = true;
                            setLoading(false);
                        });
                        break;
                }
            })
        } else {
            switch (selectedGrouping.accumulation) {
                case '':
                case 'None':
                    removeSearch(props.searchResults[0].id, getRemovalRequest(pageNo)).then(result => {
                        setLoading(false);
                        setOrganizations(result.organizations);
                        setPageCount(result.total);
                    }).catch(error => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                    break;
                case 'CPV Code':
                    removeSearchAccumulateCpv(props.searchResults[0].id, getRemovalRequest(pageNo)).then(result => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(result.total);
                    }).catch(error => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                    break;
                case 'NACE Code':
                    removeSearchAccumulateNace(props.searchResults[0].id, getRemovalRequest(pageNo)).then(result => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(result.total);
                    }).catch(error => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                    break;
                case 'UNSPSC Code':
                    // searchOrganizationByUNSPSC(getSearchRequest(pageNo)).then(result => {
                    //     setLoading(false);
                    //     setGrouping(convertStringObject(result.grouping));
                    //     setOrganizations(result.organizations);
                    //     setPageCount(result.total);
                    // }).catch(error => {
                    //     noSearchResults = true;
                    //     setLoading(false);
                    // });
                    break;
                default:
                    removeSearch(props.searchResults[0].id, getRemovalRequest(pageNo)).then(result => {
                        setLoading(false);
                        setOrganizations(result.organizations);
                        setPageCount(result.total);
                    }).catch(error => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                    break;
            }
        }


    }

    const callSearchOrganization = (pageNo) => {
        switch (selectedGrouping.accumulation) {
            case '':
            case 'None':
                searchOrganization(getSearchRequest(pageNo)).then(result => {
                    setLoading(false);
                    setOrganizations(result.organizations);
                    setPageCount(result.total);
                }).catch(error => {
                    noSearchResults = true;
                    setLoading(false);
                });
                break;
            case 'CPV Code':
                searchOrganizationByCPV(getSearchRequest(pageNo)).then(result => {
                    setLoading(false);
                    setGrouping(convertStringObject(result.grouping));
                    setOrganizations(result.organizations);
                    setPageCount(result.total);
                }).catch(error => {
                    noSearchResults = true;
                    setLoading(false);
                });
                break;
            case 'NACE Code':
                searchOrganizationByNACE(getSearchRequest(pageNo)).then(result => {
                    setLoading(false);
                    setGrouping(convertStringObject(result.grouping));
                    setOrganizations(result.organizations);
                    setPageCount(result.total);
                }).catch(error => {
                    noSearchResults = true;
                    setLoading(false);
                });
                break;
            case 'UNSPSC Code':
                searchOrganizationByUNSPSC(getSearchRequest(pageNo)).then(result => {
                    setLoading(false);
                    setGrouping(convertStringObject(result.grouping));
                    setOrganizations(result.organizations);
                    setPageCount(result.total);
                }).catch(error => {
                    noSearchResults = true;
                    setLoading(false);
                });
                break;
            default:
                break;
        }
    }

    const saveButtonText = useMemo(() => {
        if (!props?.removeSearch && props?.searchResults?.length > 0) {
            return "Refresh"
        } else {
            return "save"
        }
    }, [props])

    const onSaveResults = (e) => {
        e.preventDefault();
        if (props?.searchResults?.length > 0 && !props?.removeSearch) {
            deleteSearch(props?.searchResults[0]).then(() => {
                setOrganizations([]);
                if (props?.searchResults.length === 2) {
                    deleteSearch(props?.searchResults[1]).then(() => {
                        message.success("Delete results successful")
                        props.getSearchResults();
                    }).catch(() => {
                        message.success("Delete results fail")
                    })
                } else {
                    message.success("Delete results successful")
                    props.getSearchResults();
                }
            }).catch(() => {
                message.success("Delete results fail")
            })
        } else {
            const searchReq = getSearchRequest(1);
            const allSelectedCriteria = searchReq.countries.concat(searchReq.regions, searchReq.cities, searchReq.municipalities, searchReq.cpvs, searchReq.naces, searchReq.unspscs)
            if (allSelectedCriteria.length === 0 && searchText === '' && !props?.removeSearch) {
                message.warning('Please select criterias to save');
            } else if (props?.sectionSearch && (props?.projectStatus.toUpperCase() === "CLOSE" || props?.sectionStatus.toUpperCase() === "CLOSE")) {
                message.warning('Cannot save results for closed projects or sections');
            } else {
                if (props?.sectionSearch) {
                    addNewSearchResult(getSaveResultData()).then(() => {
                        message.success('Save results successful');
                        setSelectedResults([]);
                        props.getSearchResults();
                    }).catch(() => {
                        message.error('Save results failed please try again');
                    })
                } else {
                    setShowModel(true);
                }
            }
        }
    }

    const getSaveResultData = () => {
        if (props?.removeSearch) {
            return ({
                "id": props.searchResults[1]?.id || null,
                "parentSearchId": props.searchResults[0].id,
                "operationId": props.projectId,
                "sectionId": props.sectionId,
                "createdDate": new Date(),
                "searchFilter": {
                    "countries": selectedMarketCriteria.selectedCountries,
                    "regions": selectedMarketCriteria.selectedRegions,
                    "cities": arrayToUpper(selectedMarketCriteria.selectedCities),
                    "municipalities": selectedMarketCriteria.selectedMunicipalities,
                    "cpvs": getFilterdCodes(selectedCPVValues),
                    "naces": getFilterdCodes(selectedNACValues),
                    "unspscs": getFilterdCodes(selectedUNSPValues),
                },
                "removeCriteria": {
                    "organizationIds": selectedResults
                }
            })
        } else {
            return ({
                "operationId": props.projectId,
                "sectionId": props.sectionId,
                "createdDate": new Date(),
                "searchFilter": {
                    "name": searchText,
                    "countries": selectedMarketCriteria.selectedCountries,
                    "regions": selectedMarketCriteria.selectedRegions,
                    "cities": arrayToUpper(selectedMarketCriteria.selectedCities),
                    "municipalities": selectedMarketCriteria.selectedMunicipalities,
                    "cpvs": getFilterdCodes(selectedCPVValues),
                    "naces": getFilterdCodes(selectedNACValues),
                    "unspscs": getFilterdCodes(selectedUNSPValues),
                },
            })
        }
    }

    const onCloseModel = () => {
        setShowModel(false);
    }

    const getSearchRequest = (pageNumber) => {
        return ({
            "name": searchText,
            "countries": selectedMarketCriteria.selectedCountries,
            "regions": selectedMarketCriteria.selectedRegions,
            "cities": arrayToUpper(selectedMarketCriteria.selectedCities),
            "municipalities": selectedMarketCriteria.selectedMunicipalities,
            "cpvs": getFilterdCodes(selectedCPVValues),
            "naces": getFilterdCodes(selectedNACValues),
            "unspscs": getFilterdCodes(selectedUNSPValues),
            "pageSize": pageSize,
            "pageNo": pageNumber,
        })
    }

    const getRemovalRequest = (pageNumber) => {
        const allSelectedCriterias = selectedMarketCriteria.selectedCountries.concat(selectedMarketCriteria.selectedRegions, selectedMarketCriteria.selectedCities, selectedMarketCriteria.selectedMunicipalities, getFilterdCodes(selectedCPVValues), getFilterdCodes(selectedNACValues), getFilterdCodes(selectedUNSPValues))

        if (allSelectedCriterias.length === 0) {
            const searchResultsSet = props?.searchResults[props?.searchResults?.length - 1]

            return ({
                "searchCriteria": {
                    "name": searchResultsSet?.searchFilter.name || "",
                    "countries": searchResultsSet?.searchFilter.countries || null,
                    "regions": searchResultsSet?.searchFilter.regions || null,
                    "cities": searchResultsSet?.searchFilter.cities || null,
                    "municipalities": searchResultsSet?.searchFilter.municipalities || null,
                    "cpvs": searchResultsSet?.searchFilter.cpvs || null,
                    "naces": searchResultsSet?.searchFilter.naces || null,
                    "unspscs": searchResultsSet?.searchFilter.unspscs || null,
                    "pageSize": pageSize,
                    "pageNo": pageNumber,
                },
                "removeCritieria": {
                    "organizationIds": selectedResults
                }
            })
        } else {
            return ({
                "searchCriteria": {
                    "name": "",
                    "countries": selectedMarketCriteria.selectedCountries,
                    "regions": selectedMarketCriteria.selectedRegions,
                    "cities": arrayToUpper(selectedMarketCriteria.selectedCities),
                    "municipalities": selectedMarketCriteria.selectedMunicipalities,
                    "cpvs": getFilterdCodes(selectedCPVValues),
                    "naces": getFilterdCodes(selectedNACValues),
                    "unspscs": getFilterdCodes(selectedUNSPValues),
                    "pageSize": pageSize,
                    "pageNo": pageNumber,
                },
                "removeCritieria": {
                    "organizationIds": selectedResults
                }
            })
        }

    }

    const getFilterdCodes = (selectedValues) => {
        let filterdCodeList = [];

        for (let mainRowIndex = 0; selectedValues.length > mainRowIndex; mainRowIndex++) {
            const secondArr = selectedValues[mainRowIndex];
            let tempCodeList = [];
            for (let secondRowIndex = 1; secondArr.length > secondRowIndex; secondRowIndex++) {
                const valuesArr = selectedValues[mainRowIndex][secondRowIndex];
                if (typeof valuesArr[valuesArr.length - 1].code === 'string') {
                    tempCodeList.push(valuesArr[valuesArr.length - 1].code)
                }
            }
            if (tempCodeList.length === 0 && selectedValues[mainRowIndex][0].code != undefined) {
                filterdCodeList.push(selectedValues[mainRowIndex][0].code)
            } else {
                filterdCodeList = filterdCodeList.concat(tempCodeList)
            }
        }
        return filterdCodeList;
    }

    const onChangePage = (pageNumber) => {
        let pageNo;
        window.scrollTo(0, 0);
        setLoading(true);

        switch (pageNumber) {
            case 'prev':
                pageNo = actPage - 1;
                setActPage(actPage - 1);
                break;
            case 'next':
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
    }

    const changeCompanyInfoData = (data, dataName) => {
        setSelectedCompanyInfo({ ...selectedCompanyInfo, [dataName]: data })
    }

    const onCheckBox = (e) => {
        const newResultSet = [...selectedResults]
        const index = selectedResults.indexOf(e.target.value);

        if (index < 0) {
            newResultSet.push(e.target.value);
            setSelectedResults(newResultSet);
        } else {
            newResultSet.splice(index, 1);
            setSelectedResults(newResultSet);
        }
    }

    const onSelectAllCheckBox = (e) => {
        const allResultsSet = organizations.map(organization => { return organization.organizationId })

        if (e.target.checked) {
            const newResultSet = selectedResults.concat(allResultsSet);
            setSelectedResults(newResultSet);
        } else {
            const newResultSet = selectedResults.filter(organization => { return !allResultsSet?.includes(organization) })
            setSelectedResults(newResultSet);
        }
    }

    const getCriteriaHeader = (header, tooltip, onClickHeader, expanded) => {
        const expandIcon = expanded ? 'icon-minus fr' : 'icon-minus-1 fr'
        return (
            <div className="text-left sub-title-txt hover-hand" onClick={() => onClickHeader()}>
                {header}
                <span className="tooltip-toggle" aria-label={tooltip}>
                    <i className="icon-question color-black m-l-5" />
                </span>
                <i className={expandIcon} />
            </div>

        )
    }

    const toggleOpenCriteria = (criteriaName, state = null) => {
        setOpenCriteria({ ...openCriteria, [criteriaName]: state || !openCriteria[criteriaName] })
    }

    const onChangeResultListType = (e) => {
        e.preventDefault();
        if (e.target.value === 'Company') {
            setSelectedGrouping({ ...selectedGrouping, resultType: e.target.value, accumulation: 'None' })
        } else {
            setSelectedGrouping({ ...selectedGrouping, resultType: e.target.value })
        }
    }

    const onChangeAccumulation = (e) => {
        e.preventDefault();
        setSelectedGrouping({ ...selectedGrouping, accumulation: e.target.value })
    }

    const disableSaveBtn = useMemo(() => {
        const searchReq = getSearchRequest(1);
        const allSelectedCriteria = searchReq.countries.concat(searchReq.regions, searchReq.cities, searchReq.municipalities, searchReq.cpvs, searchReq.naces, searchReq.unspscs)

        return props?.removeSearch && selectedResults?.length < 1 && allSelectedCriteria?.length === 0

    }, [selectedResults, selectedMarketCriteria, selectedCPVValues, selectedNACValues, selectedUNSPValues]);

    const getGroupingCriteria = () => {
        return (
            <div className="gray-container pos-a" style={{ top: props?.sectionSearch ? 200 : 60, width: "47%" }}>
                <div className="text-left sub-title-txt" >
                    Grouping and Totals
                    <span className="tooltip-toggle" aria-label={"XXX"}>
                        <i className="icon-question color-black m-l-5" />
                    </span>
                </div>
                <div className="g-row">
                    <div className="g-col-4">
                        <DropdownSelect values={['Company', 'No of accumulated']} placeholder="Results List Type" selected={selectedGrouping.resultType} onChange={onChangeResultListType} />
                    </div>
                    <div className="g-col-4">
                        <DropdownSelect
                            values={['None', 'CPV Code', 'NACE Code', 'UNSPSC Code']}
                            placeholder="Accumulation"
                            selected={selectedGrouping.accumulation}
                            onChange={onChangeAccumulation}
                            disabled={selectedGrouping.resultType !== 'No of accumulated'} />
                    </div>
                    <div className="g-col-4">
                        {DropdownList({ placeholder: 'Sorting', dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
                    </div>
                </div>
            </div>
        )
    }

    const getCompanyInfoCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(t("Company Info"), "xxx", () => toggleOpenCriteria('CompanyInfo'), openCriteria.CompanyInfo)}
                {openCriteria.CompanyInfo &&
                    <>
                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-15">{t("Registration date")}</div>
                                    <div className="g-col-7">
                                        <DatePickerInput placeholder={'From Date'} value={selectedCompanyInfo.registrationFromDate} onChange={(date) => changeCompanyInfoData(date, 'registrationFromDate')} />
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        <DatePickerInput placeholder={'To Date'} value={selectedCompanyInfo.registrationToDate} onChange={(date) => changeCompanyInfoData(date, 'registrationToDate')} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-5">{t("Date of incorporation")}</div>
                                    <div className="g-col-7">
                                        <DatePickerInput placeholder={'From Date'} value={selectedCompanyInfo.incorpFromDate} onChange={(date) => changeCompanyInfoData(date, 'incorpFromDate')} />
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        <DatePickerInput placeholder={'To Date'} value={selectedCompanyInfo.incorpToDate} onChange={(date) => changeCompanyInfoData(date, 'incorpToDate')} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5" />
                                    <div className="g-col-7">
                                        {DropdownList({ placeholder: t('Number of employee'), dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        {DropdownList({ placeholder: t('Organization type'), dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5" />
                                    <div className="g-col-7 m-t-15">
                                        <ToggleSwitch label={'Active'} />
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        {DropdownList({ placeholder: t('Organization id'), dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-5">
                                        {t("Sector code institution")}
                                    </div>
                                    <div className="g-col-7">
                                        {DropdownList({ placeholder: t('sector code list - select'), dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }

    const getMarketCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(t("Market Information"), "xxx", () => toggleOpenCriteria('Market'), openCriteria.Market)}
                {openCriteria.Market &&
                    <div className="g-row">
                        <div className="g-col-3">
                            {DropdownList({ placeholder: t('Country'), dataList: marketInformationData.countries, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCountries", apiCalls: getRegionsData, keyName: "alpha3Code" })}
                        </div>
                        <div className="g-col-3">
                            {DropdownList({ placeholder: t('Region'), dataList: marketInformationData.regions, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedRegions", apiCalls: getMunicipalitiesData, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {DropdownList({ placeholder: t('Municipality'), dataList: marketInformationData.municipalities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedMunicipalities", apiCalls: getCityData, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {DropdownList({ placeholder: t('City'), dataList: marketInformationData.cities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCities", keyName: "code" })}
                        </div>
                    </div>
                }
            </div>
        )
    }

    const getProductGroupsCriteria = () => {
        return (
            <div className="g-col-12">
                <div className="gray-container">
                    {getCriteriaHeader(t("Product Groups (UNSPSC/ CPV Codes)"), "xxx", () => toggleOpenCriteria('ProductGroups'), openCriteria.ProductGroups)}
                    {openCriteria.ProductGroups &&
                        <>
                            <div className="m-t-5">{t("UNSPSC Codes")}</div>
                            <div className="g-row">
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: t('Segmant'), dataList: unspscData.segmant, dataName: 'title', selectedList: selectedUNSPValues, setSelectedState: setSelectedUNSPValues, selectedRows: selectedUNSPRows, setSelectedRows: setSelectedUNSPRows, apiCalls: getUnspscCodesData, codelevel: 1, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: t('Family'), dataList: unspscData.family, dataName: 'title', selectedList: selectedUNSPValues, setSelectedState: setSelectedUNSPValues, selectedRows: selectedUNSPRows, setSelectedRows: setSelectedUNSPRows, apiCalls: getUnspscCodesData, codelevel: 2, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: t('Class'), dataList: unspscData.unspClass, dataName: 'title', selectedList: selectedUNSPValues, setSelectedState: setSelectedUNSPValues, selectedRows: selectedUNSPRows, setSelectedRows: setSelectedUNSPRows, apiCalls: getUnspscCodesData, codelevel: 3, keyName: "code" })}
                                </div>
                                <div className="g-col-4">
                                    {Dropdown({ placeholder: t('Commodity Class'), dataList: unspscData.comClass, dataName: 'title', selectedList: selectedUNSPValues, setSelectedState: setSelectedUNSPValues, selectedRows: selectedUNSPRows, setSelectedRows: setSelectedUNSPRows, codelevel: 4, keyName: "code" })}
                                </div>
                            </div>
                            <SearchSelectedValues selectedValues={selectedUNSPValues} setSelectedValues={setSelectedUNSPValues} selectedRows={selectedUNSPRows} setSelectedRows={setSelectedUNSPRows} apiCalls={getUnspscCodesData} />
                            <div className="fl m-t-15">CPV Codes</div>
                            <div className="g-row">
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: t('Division'), dataList: cpvData.division, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 1, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: t('Group'), dataList: cpvData.cpvGroup, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 2, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: t('Class'), dataList: cpvData.cpvClass, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 3, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: t('Category'), dataList: cpvData.category, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 4, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: t('Sub Category'), dataList: cpvData.subCategory, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, codelevel: 5, keyName: "code" })}
                                </div>
                            </div>
                            <SearchSelectedValues selectedValues={selectedCPVValues} setSelectedValues={setSelectedCPVValues} selectedRows={selectedCPVRows} setSelectedRows={setSelectedCPVRows} apiCalls={getcpvCodesData} />
                        </>
                    }
                </div>
            </div>
        )
    }

    const getProfessionCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(t("Profession (NACE Codes)"), "xxx", () => toggleOpenCriteria('Profession'), openCriteria.Profession)}
                {openCriteria.Profession &&
                    <div>
                        <div className="g-row m-b-10">
                            <div className="g-col-3">
                                {Dropdown({ placeholder: t('Section'), dataList: professionData.section, dataName: 'desscription', selectedList: selectedNACValues, setSelectedState: setSelectedNACValues, selectedRows: selectedNACRows, setSelectedRows: setSelectedNACRows, apiCalls: getProfessionData, codelevel: 1, keyName: "code" })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({ placeholder: t('Division'), dataList: professionData.divition, dataName: 'desscription', selectedList: selectedNACValues, setSelectedState: setSelectedNACValues, selectedRows: selectedNACRows, setSelectedRows: setSelectedNACRows, apiCalls: getProfessionData, codelevel: 2, keyName: "code" })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({ placeholder: t('Group'), dataList: professionData.profGroup, dataName: 'desscription', selectedList: selectedNACValues, setSelectedState: setSelectedNACValues, selectedRows: selectedNACRows, setSelectedRows: setSelectedNACRows, apiCalls: getProfessionData, codelevel: 3, keyName: "code" })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({ placeholder: t('Class'), dataList: professionData.profClass, dataName: 'desscription', selectedList: selectedNACValues, setSelectedState: setSelectedNACValues, selectedRows: selectedNACRows, setSelectedRows: setSelectedNACRows, codelevel: 4, keyName: "code" })}
                            </div>
                        </div>
                        <SearchSelectedValues selectedValues={selectedNACValues} setSelectedValues={setSelectedNACValues} selectedRows={selectedNACRows} setSelectedRows={setSelectedNACRows} apiCalls={getProfessionData} />
                    </div>
                }
            </div>
        )
    }

    const getPeppolRow = (leftText, rightText) => {
        return (
            <div className="g-row m-b-20">
                <div className="g-col-4">
                    <input type="checkbox" className="check-box m-r-15" />
                    {t(leftText)}
                </div>
                <div className="g-col-4"></div>
                <div className="g-col-4">
                    <input type="checkbox" className="check-box m-r-15" />
                    {t(rightText)}
                </div>
            </div>
        )
    }

    const getPeppolCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(t("Peppol Documents"), "xxx", () => toggleOpenCriteria('Peppol'), openCriteria.Peppol)}
                {openCriteria.Peppol &&
                    <div>
                        <div className="p-y-30">{t("Peppol Documents Post award")}</div>
                        {getPeppolRow('Invoice & Credit notes:', 'Order confirmation')}
                        {getPeppolRow('Purchase Order', 'Packing slip')}
                        {getPeppolRow('Order Only', 'Catalogue')}

                        <div className="n-float p-y-30">{t("Peppol Documents Post award")}</div>
                        {getPeppolRow('Proposals', 'A')}
                        {getPeppolRow('Catalogue', 'B')}
                        {getPeppolRow('Contracts', 'C')}
                    </div>
                }
            </div>
        )
    }

    return (
        <>
            <div className="g-col-6">
                <div className="page-container m-r-0">
                    <form onSubmit={onShowResults}>
                        {!props?.removeSearch &&
                            <div className="g-row flex-center-middle m-b-15">
                                <div className="search-bar g-col-10 m-r-10">
                                    <i className="search-btn icon-search" onClick={onShowResults}></i>
                                    <input type="text" onChange={handleSearch} value={searchText} placeholder={t("Search by Location, Product or Service")} />
                                </div>
                                <div className="g-col-2 g-row hover-hand">
                                    <span className="fl g-col-6 m-r-10">English </span>
                                    <span className="fl g-col-3"><img src={gb_flag} className="flag-image fl m-r-5" /></span>
                                    <i className="g-col-1 icon-arrow-down fl" />
                                </div>
                            </div>
                        }
                        <h4>{t("Narrow down your search by...")}</h4>
                        {getCompanyInfoCriteria()}
                        {getMarketCriteria()}
                        {getProductGroupsCriteria()}
                        {getProfessionCriteria()}
                        {getPeppolCriteria()}
                        <button className="primary-btn m-l-10" onClick={onShowResults} >{props?.removeSearch ? t('Filter Results') : t('Show Result')}</button>
                        {!props?.sectionSearch &&
                            <button className="primary-btn" onClick={() => { changeActiveTab(NAVIGATION_PAGES.BUYER_SEARCHRESULTS) }} >{t("View History")}</button>
                        }
                    </form>
                </div>
            </div>
            <div className="g-col-6" style={{ height: '100%', paddingBottom: 10 }}>
                <div className="page-container" style={{ height: '100%' }}>
                    <div className="title-txt text-center">{t("Results")}</div>
                    {getGroupingCriteria()}
                    {loading &&
                        <div className="loading">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    }
                    {noSearchResults &&
                        <div className="sub-title-txt text-center" >{removeAllResultsChecked ? "All Results Removed" : "No Results"}</div>
                    }
                    {Object.values(grouping).length !== 0 &&
                        <>
                            <div className={props?.sectionSearch ? 'section-search-results-container' : 'search-results-container'}>
                                <div className="g-row">
                                    <div className="g-col-4">{t("Search Criteria")}</div>
                                    <div className="g-col-2">{t("Criteria Codes")}</div>
                                    <div className="g-col-3">{t("Criteria Name")}</div>
                                    <div className="g-col-2">{t("Companies")}</div>

                                </div>
                                {Object.entries(grouping).map(([key, value]) => {
                                    return (
                                        <div className="search-result-row g-row" key={key}>
                                            <div className="g-col-4 body-text-bold blue">{key}</div>
                                            <div className="g-col-8" >
                                                {
                                                    value.map((group, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {typeof group._id === 'object' ?
                                                                    <div className="g-row">
                                                                        <div className="g-col-4 body-text blue">{Object.values(group._id)[0]}</div>
                                                                        <div className="g-col-4 body-text blue">{Object.values(group._id)[1]}</div>
                                                                        <div className="g-col-4 body-text blue">{group.count}</div>
                                                                    </div>
                                                                    : <>
                                                                        <div className="g-col-4 body-text blue">{group._id}</div>
                                                                        <div className="g-col-4 body-text blue">XXX</div>
                                                                        <div className="g-col-4 body-text blue">{group.count}</div>
                                                                    </>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )

                                })

                                }
                            </div>
                            <div className="search-result-pagination-container">
                                <Pagination size="small" current={actPage} onChange={(pageNum) => { onChangePage(pageNum) }} total={pageCount} showSizeChanger={false} />
                            </div>
                        </>
                    }
                    {organizations?.length > 0 &&
                        <>
                            <div className={props?.sectionSearch ? 'section-search-results-container' : 'search-results-container'}>
                                {props.removeSearch &&
                                    <>
                                        <div className="fr selectAll-checkbox">
                                            Select Page
                                            <input type="checkbox" key={'SelectAllCheckBox2'} className="check-box m-l-20" onChange={onSelectAllCheckBox} />
                                        </div>
                                        <div className="fr selectAll-checkbox">
                                            Select All Records
                                            <input type="checkbox" checked={removeAllResultsChecked} className="check-box m-l-20" onChange={() => { setRemoveAllResultsChecked(prev => !prev) }} />
                                        </div>
                                    </>
                                }
                                {organizations.map(organization => {
                                    return (
                                        <div key={organization?.id} className="search-result-row g-row">
                                            <div className="g-col-6"><div>{organization?.organizationName}</div>
                                                <div>{organization?.businessAddr?.businessCountry || ""}</div></div>
                                            <div className="g-col-6"><div>{organization?.organizationId}</div>
                                                <div>{organization?.businessAddr?.city}</div></div>
                                            {props.removeSearch &&
                                                <div className="g-col-1"> <input type="checkbox" value={organization.organizationId} checked={selectedResults?.includes(organization.organizationId)} className="check-box" onChange={onCheckBox} /></div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="search-result-pagination-container">
                                <Pagination size="small" current={actPage} onChange={(pageNum) => { onChangePage(pageNum) }} total={pageCount} showSizeChanger={false} />
                            </div>
                        </>
                    }
                    {props.removeSearch &&
                        <button className="primary-btn remove-button m-r-20" onClick={onShowResults} disabled={selectedResults?.length === 0 && !removeAllResultsChecked} >{t("Remove")}</button>
                    }
                    <button className="primary-btn save-button" onClick={onSaveResults} disabled={disableSaveBtn} >{t(saveButtonText)}</button>
                    {props.removeSearch &&
                        <div className="hint-text" >{t("Rows which are 'checked' will be removed")}</div>
                    }
                    {(!props.removeSearch && props?.searchResults?.length > 0) &&
                        <div className="hint-text" >{t("If you want to do a fresh search...")}</div>
                    }
                </div>
            </div>
            <Model visible={showModel} onCloseModel={onCloseModel} searchCriteria={searchText} />
        </>
    )
}

