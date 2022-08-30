import React, { useState, useEffect, useContext } from "react";
import { message, Pagination } from 'antd';
import { levelOneReq, nacSectionReq } from "../../utils/constants";
import gb_flag from "../../assets/images/gb_flag.png"
import logo_thumb from "../../assets/images/logo_thumb.png"
import Model from "../../common/model";
import { TabContext } from "../../utils/contextStore";
import { NAVIGATION_PAGES } from "../../utils/enums";
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
    getSearchResultsByProjAndSec,
    searchOrganizationByCPV,
    searchOrganizationByNACE,
    searchOrganizationByUNSPSC,
} from "../../services/organizationsService";
import DropdownList from "./Components/dropdownList"
import Dropdown from "./Components/dropdown";
import DropdownSelect from "../../common/dropdown"
import { arrayToUpper } from '../../utils/index';
import SearchSelectedValues from "./Components/searchSelectedValues";
import DatePickerInput from "../../common/datePickerInput";
import ToggleSwitch from "../../common/toggleSwitch";

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

    const [selectedResults, setSelectedResults] = useState([])

    const [showModel, setShowModel] = useState(false);

    const { changeActiveTab } = useContext(TabContext)

    useEffect(() => {
        // getCountries().then(result => { setMarketInformationData({...marketInformationData, countries: result}) });
        getUnspscCodes(levelOneReq).then(result => { setUnspscData({ ...unspscData, segmant: result }) });
        getCpvCodes(levelOneReq).then(result => { setCpvData({ ...cpvData, division: result }) })
        getNacCodes(nacSectionReq).then(result => { setProfessionData({ ...professionData, section: result }) });
    }, []);

    useEffect(() => {
        if (props.searchResult?.id) {
            const searchFilter = props.searchResult.searchFilter
            const newOrganizations = []

            props.searchResult.results.map((result) => {
                newOrganizations.push(JSON.parse(result.info))
            })

            setOrganizations(newOrganizations);
            setSerachText(searchFilter.name);
            setSelectedMarketCriteria({ selectedCountries: searchFilter.countries, selectedRegions: searchFilter.regions, selectedCities: searchFilter.cities, selectedMunicipalities: searchFilter.municipalities })

            toggleOpenCriteria('Market', (searchFilter.countries.length > 0 || searchFilter.regions.length > 0 || searchFilter.cities.length > 0 || searchFilter.municipalities.length > 0));
        }
    }, [props.searchResult]);

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

    const onShowResults = (e) => {
        e.preventDefault();
        setOrganizations([]);
        setGrouping({});
        window.scrollTo(0, 0)
        const searchReq = getSearchRequest(1);
        const allSelectedCriteria = searchReq.countries.concat(searchReq.regions, searchReq.cities, searchReq.municipalities, searchReq.cpvs, searchReq.naces, searchReq.unspscs)
        if (allSelectedCriteria.length === 0 && searchText === '') {
            message.warning('Please select criterias to search');
        } else {
            noSearchResults = false;
            setLoading(true);
            setActPage(1);
            switch (selectedGrouping.accumulation) {
                case '':
                case 'None':
                    searchOrganization(searchReq).then(result => {
                        setLoading(false);
                        setOrganizations(result.organizations);
                        setPageCount(Math.ceil(result.total / pageSize));
                    }).catch(error => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                    break;
                case 'CPV Code':
                    searchOrganizationByCPV(searchReq).then(result => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(Math.ceil(result.total / pageSize));
                    }).catch(error => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                    break;
                case 'NACE Code':
                    searchOrganizationByNACE(searchReq).then(result => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(Math.ceil(result.total / pageSize));
                    }).catch(error => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                    break;
                case 'UNSPSC Code':
                    searchOrganizationByUNSPSC(searchReq).then(result => {
                        setLoading(false);
                        setGrouping(convertStringObject(result.grouping));
                        setOrganizations(result.organizations);
                        setPageCount(Math.ceil(result.total / pageSize));
                    }).catch(error => {
                        noSearchResults = true;
                        setLoading(false);
                    });
                    break;
                default:
                    break;
            }
        }
    }

    const onSaveResults = (e) => {
        e.preventDefault();
        const searchReq = getSearchRequest(1);
        const allSelectedCriteria = searchReq.countries.concat(searchReq.regions, searchReq.cities, searchReq.municipalities, searchReq.cpvs, searchReq.naces, searchReq.unspscs)
        if (allSelectedCriteria.length === 0 && searchText === '') {
            message.warning('Please select criterias to save');
        } else {
            if (props?.sectionSearch) {
                const saveResultData = {
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
                    "results": selectedResults,
                }

                addNewSearchResult(saveResultData).then(() => {
                    message.success('Save results successful');
                    getSearchResultsByProjAndSec(props.projectId, props.sectionId).then(data => {
                        props.setSearchResults(data)
                    })
                }).catch(() => {
                    message.error('Save results failed please try again');
                })
            } else {
                setShowModel(true);
            }
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

        searchOrganization(getSearchRequest(pageNo)).then(result => {
            setLoading(false);
            setOrganizations(result.organizations);
        });
    }

    const changeCompanyInfoData = (data, dataName) => {
        setSelectedCompanyInfo({ ...selectedCompanyInfo, [dataName]: data })
    }

    const onCheckBox = (e) => {
        const resultSet = JSON.parse(e.target.value)
        const modResultSet = {
            id: resultSet.id,
            organizationId: resultSet.organizationId,
            organizationName: resultSet.organizationName,
            info: JSON.stringify(resultSet)
        }
        const newResultSet = selectedResults.map(a => { return { ...a } })

        const index = selectedResults.findIndex(result => { return result.id === resultSet.id });

        if (index < 0) {
            newResultSet.push(modResultSet);
            setSelectedResults(newResultSet);
        } else {
            newResultSet.splice(index, 1);
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

    const getGroupingCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader("Grouping and Totals", "xxx", () => toggleOpenCriteria('Grouping'), openCriteria.Grouping)}
                {openCriteria.Grouping &&
                    <>
                        <div className="g-row">
                            <div className="g-col-6">
                                <DropdownSelect values={['Company', 'No of accumulated']} placeholder="Results List Type" selected={selectedGrouping.resultType} onChange={onChangeResultListType} />
                            </div>
                            <div className="g-col-6">
                                <DropdownSelect
                                    values={['None', 'CPV Code', 'NACE Code', 'UNSPSC Code']}
                                    placeholder="Accumulation"
                                    selected={selectedGrouping.accumulation}
                                    onChange={onChangeAccumulation}
                                    disabled={selectedGrouping.resultType !== 'No of accumulated'} />
                            </div>
                        </div>
                        <div className="g-row">
                            <div className="g-col-6">
                                {DropdownList({ placeholder: 'Sorting', dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
                            </div>

                        </div>
                    </>

                }
            </div>
        )
    }

    const getCompanyInfoCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader("Company Info.", "xxx", () => toggleOpenCriteria('CompanyInfo'), openCriteria.CompanyInfo)}
                {openCriteria.CompanyInfo &&
                    <>
                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-15">Registration date</div>
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
                                    <div className="g-col-5 m-t-5">Date of incorporation</div>
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
                                        {DropdownList({ placeholder: 'Number of employee', dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
                                    </div>
                                </div>
                            </div>
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5"></div>
                                    <div className="g-col-7">
                                        {DropdownList({ placeholder: 'Organization type', dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
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
                                        {DropdownList({ placeholder: 'Organization id', dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="g-row">
                            <div className="g-col-6">
                                <div className="g-row">
                                    <div className="g-col-5 m-t-5">
                                        Sector code institution
                                    </div>
                                    <div className="g-col-7">
                                        {DropdownList({ placeholder: 'sector code list - select', dataList: [], selectedList: [], setSelectedState: {}, criteriaName: "", keyName: "" })}
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
                {getCriteriaHeader("Market Information", "xxx", () => toggleOpenCriteria('Market'), openCriteria.Market)}
                {openCriteria.Market &&
                    <div className="g-row">
                        <div className="g-col-3">
                            {DropdownList({ placeholder: 'Country', dataList: marketInformationData.countries, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCountries", apiCalls: getRegionsData, keyName: "alpha3Code" })}
                        </div>
                        <div className="g-col-3">
                            {DropdownList({ placeholder: 'Region', dataList: marketInformationData.regions, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedRegions", apiCalls: getMunicipalitiesData, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {DropdownList({ placeholder: 'Municipality', dataList: marketInformationData.municipalities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedMunicipalities", apiCalls: getCityData, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {DropdownList({ placeholder: 'City', dataList: marketInformationData.cities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCities", keyName: "code" })}
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
                    {getCriteriaHeader("Product Groups (UNSPSC/ CPV Codes)", "xxx", () => toggleOpenCriteria('ProductGroups'), openCriteria.ProductGroups)}
                    {openCriteria.ProductGroups &&
                        <>
                            <div className="m-t-5">UNSPSC Codes</div>
                            <div className="g-row">
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Segmant', dataList: unspscData.segmant, dataName: 'title', selectedList: selectedUNSPValues, setSelectedState: setSelectedUNSPValues, selectedRows: selectedUNSPRows, setSelectedRows: setSelectedUNSPRows, apiCalls: getUnspscCodesData, codelevel: 1, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Family', dataList: unspscData.family, dataName: 'title', selectedList: selectedUNSPValues, setSelectedState: setSelectedUNSPValues, selectedRows: selectedUNSPRows, setSelectedRows: setSelectedUNSPRows, apiCalls: getUnspscCodesData, codelevel: 2, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Class', dataList: unspscData.unspClass, dataName: 'title', selectedList: selectedUNSPValues, setSelectedState: setSelectedUNSPValues, selectedRows: selectedUNSPRows, setSelectedRows: setSelectedUNSPRows, apiCalls: getUnspscCodesData, codelevel: 3, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Commodity Class', dataList: unspscData.comClass, dataName: 'title', selectedList: selectedUNSPValues, setSelectedState: setSelectedUNSPValues, selectedRows: selectedUNSPRows, setSelectedRows: setSelectedUNSPRows, codelevel: 4, keyName: "code" })}
                                </div>
                            </div>
                            <SearchSelectedValues selectedValues={selectedUNSPValues} setSelectedValues={setSelectedUNSPValues} selectedRows={selectedUNSPRows} setSelectedRows={setSelectedUNSPRows} apiCalls={getUnspscCodesData} />
                            <div className="fl m-t-15">CPV Codes</div>
                            <div className="g-row">
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: 'Division', dataList: cpvData.division, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 1, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: 'Group', dataList: cpvData.cpvGroup, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 2, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: 'Class', dataList: cpvData.cpvClass, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 3, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: 'Category', dataList: cpvData.category, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 4, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Sub Category', dataList: cpvData.subCategory, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, codelevel: 5, keyName: "code" })}
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
                {getCriteriaHeader("Profession (NACE Codes)", "xxx", () => toggleOpenCriteria('Profession'), openCriteria.Profession)}
                {openCriteria.Profession &&
                    <div>
                        <div className="g-row m-b-10">
                            <div className="g-col-3">
                                {Dropdown({ placeholder: 'Section', dataList: professionData.section, dataName: 'desscription', selectedList: selectedNACValues, setSelectedState: setSelectedNACValues, selectedRows: selectedNACRows, setSelectedRows: setSelectedNACRows, apiCalls: getProfessionData, codelevel: 1, keyName: "code" })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({ placeholder: 'Division', dataList: professionData.divition, dataName: 'desscription', selectedList: selectedNACValues, setSelectedState: setSelectedNACValues, selectedRows: selectedNACRows, setSelectedRows: setSelectedNACRows, apiCalls: getProfessionData, codelevel: 2, keyName: "code" })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({ placeholder: 'Group', dataList: professionData.profGroup, dataName: 'desscription', selectedList: selectedNACValues, setSelectedState: setSelectedNACValues, selectedRows: selectedNACRows, setSelectedRows: setSelectedNACRows, apiCalls: getProfessionData, codelevel: 3, keyName: "code" })}
                            </div>
                            <div className="g-col-3">
                                {Dropdown({ placeholder: 'Class', dataList: professionData.profClass, dataName: 'desscription', selectedList: selectedNACValues, setSelectedState: setSelectedNACValues, selectedRows: selectedNACRows, setSelectedRows: setSelectedNACRows, codelevel: 4, keyName: "code" })}
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
                    {leftText}
                </div>
                <div className="g-col-4"></div>
                <div className="g-col-4">
                    <input type="checkbox" className="check-box m-r-15" />
                    {rightText}
                </div>
            </div>
        )
    }

    const getPeppolCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader("Peppol Documents", "xxx", () => toggleOpenCriteria('Peppol'), openCriteria.Peppol)}
                {openCriteria.Peppol &&
                    <div>
                        <div className="p-y-30">Peppol Documents Post award</div>
                        {getPeppolRow('Invoice & Credit notes:', 'Order confirmation')}
                        {getPeppolRow('Purchase Order', 'Packing slip')}
                        {getPeppolRow('Order Only', 'Catalogue')}

                        <div className="n-float p-y-30">Peppol Documents Post award</div>
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
                        <div className="g-row flex-center-middle m-b-15">
                            <div className="search-bar g-col-10 m-r-10">
                                <i className="search-btn icon-search" onClick={onShowResults}></i>
                                <input type="text" onChange={handleSearch} value={searchText} placeholder="Search by Location, Product or Service" />
                            </div>
                            <div className="g-col-2 g-row hover-hand">
                                <span className="fl g-col-6 m-r-10">English </span>
                                <span className="fl g-col-3"><img src={gb_flag} className="flag-image a-row m-r-5" /></span>
                                <i className="g-col-1 icon-arrow-down fl" />
                            </div>
                        </div>
                        <h4>Narrow down your search by...</h4>
                        {getGroupingCriteria()}
                        {getCompanyInfoCriteria()}
                        {getMarketCriteria()}
                        {getProductGroupsCriteria()}
                        {getProfessionCriteria()}
                        {getPeppolCriteria()}
                        <button className="primary-btn m-l-10" onClick={onShowResults} >Show Result</button>
                        <button className="primary-btn" onClick={() => { changeActiveTab(NAVIGATION_PAGES.BUYER_SEARCHRESULTS) }} >View History</button>
                    </form>
                </div>
            </div>
            <div className="g-col-6" style={{ height: '100%', paddingBottom: 10 }}>
                <div className="page-container" style={{ height: '100%' }}>
                    <div className="title-txt text-center">Results</div>
                    {loading &&
                        <div className="loading">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    }
                    {noSearchResults &&
                        <div className="sub-title-txt text-center" >No Results</div>
                    }
                    {Object.values(grouping).length !== 0 &&
                        <>
                            <div className={props?.sectionSearch ? 'section-search-results-container' : 'search-results-container'}>
                                <div className="g-row">
                                    <div className="g-col-4">Search Criteria</div>
                                    <div className="g-col-2">Criteria Codes</div>
                                    <div className="g-col-3">Criteria Name</div>
                                    <div className="g-col-2">Companies</div>

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
                                {organizations.map(organization => {
                                    return (
                                        <div key={organization?.id} className="search-result-row g-row">
                                            <div className="g-col-1"><img src={logo_thumb} className="logo-thumb" /></div>
                                            <div className="g-col-4">{organization?.organizationName}</div>
                                            <div className="g-col-3"><div>{organization?.businessAddr?.businessCountry ? organization.businessAddr.businessCountry : "No Country"}</div>
                                                <div>{organization?.businessAddr?.city ? organization.businessAddr.city : "No City"}</div></div>
                                            <div className="g-col-3"> <div>{organization?.secCode?.code ? organization.secCode.code : "No Sec Code"}</div>
                                                <div>{organization?.secCode?.description ? organization.secCode.description : "No Description"}</div></div>
                                            <div className="g-col-1"> <input type="checkbox" value={JSON.stringify(organization)} className="check-box" onChange={onCheckBox} /></div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="search-result-pagination-container">
                                <Pagination size="small" current={actPage} onChange={(pageNum) => { onChangePage(pageNum) }} total={pageCount} showSizeChanger={false} />
                            </div>
                        </>
                    }
                    <button className="primary-btn save-button" onClick={onSaveResults} >Save</button>
                    <div className="hint-text" >Rows which are 'checked' will be saved</div>
                </div>
            </div>
            <Model visible={showModel} onCloseModel={onCloseModel} searchCriteria={searchText} />
        </>
    )
}