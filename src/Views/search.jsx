import React, { useState, useEffect, useContext } from "react";
import gb_flag from "../assets/images/gb_flag.png"
import logo_thumb from "../assets/images/logo_thumb.png"
import rating from "../assets/images/rating.png"
import Model from "../common/model";
import Pagination from "../common/pagination";
import { TabContext } from "../utils/contextStore";
import { NAVIGATION_PAGES } from "../utils/enums";
import { getCountries, getRegions, getMunicipalities, searchOrganization, getCities, getUnspscCodes, getCpvCodes, getNacCodes } from "../services/organizationsService";
import Dropdown from "../common/dropdown"

const pageSize = 10;
const levelOneReq = {
    "level": 1,
    "code": ""
}
const nacSectionReq = {
    "level": "1",
    "parent": ""
}

export default function Search() {
    const [openCriteria, setOpenCriteria] = useState({ Market: true, ProductGroups: false, Profession: false });
    const [searchText, setSerachText] = useState("");
    const [organizations, setOrganizations] = useState([]);

    // Data from back-end
    const [marketInformationData, setMarketInformationData] = useState({ countries: [{ "name": "Norway", "alpha3Code": "NOR" }], regions: [], cities: [], municipalities: [] });
    const [unspscData, setUnspscData] = useState({ segmant: [], family: [], unspClass: [], comClass: [] })
    const [cpvData, setCpvData] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] })
    const [professionData, setProfessionData] = useState({ section: [], divition: [], profGroup: [], profClass: [] })

    // Drop Down selected eliments data
    const [selectedMarketCriteria, setSelectedMarketCriteria] = useState({ selectedCountries: [], selectedRegions: [], selectedCities: [], selectedMunicipalities: [] });
    const [selectedProductGroupesCriteria, setSelectedProductGroupesCriteria] = useState({ segmant: [], family: [], unspClass: [], comClass: [], division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] })
    const [selectedUnspscCodes, setSelectedUnspscCodes] = useState([]);
    const [selectedCpvCodes, setSelectedCpvCodes] = useState([]);
    const [selectedProfessionCriteria, setSelectedProfessionCriteria] = useState({ section: [], divition: [], profGroup: [], profClass: [] })
    const [selectedNaceCodes, setSelectedNaceCodes] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [actPage, setActPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const [showModel, setShowModel] = useState(false);

    const { changeActiveTab } = useContext(TabContext)

    useEffect(() => {
        // getCountries().then(result => { setMarketInformationData({...marketInformationData, countries: result}) });
        getUnspscCodes(levelOneReq).then(result => { setUnspscData({ ...unspscData, segmant: result }) });
        getCpvCodes(levelOneReq).then(result => { setCpvData({ ...cpvData, division: result }) })
        getNacCodes(nacSectionReq).then(result => { setProfessionData({ ...professionData, section: result }) });
    }, []);

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

        const getUnspscTitleHeaders = (level) => {
            switch (level) {
                case 1:
                    return ['segmentTitle', 'segmentCode'];
                case 2:
                    return ['familyTitle', 'familyCode'];
                case 3:
                    return ['classTitle', 'classCode'];
                case 4:
                    return ['commodityTitle', 'commodityCode'];
                default:
                    break;
            }
        }

        const selectedUnspscData = unspscData[getUnspscName(level - 1)].filter(item => item[getUnspscTitleHeaders(level - 1)[0]] === title)

        const data = {
            "level": level,
            "code": selectedUnspscData[0][getUnspscTitleHeaders(level - 1)[1]]
        }

        getUnspscCodes(data).then(result => {
            setUnspscData({ ...unspscData, [getUnspscName(level)]: result })
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
            setCpvData({ ...cpvData, [getCpvName(level)]: result })
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
            setProfessionData({ ...professionData, [getProfName(level)]: result })
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSerachText(e.target.value);
    }

    const onShowResults = (e) => {
        setLoading(true);
        setActPage(1);
        e.preventDefault();
        searchOrganization(getSearchRequest(1)).then(result => {
            setLoading(false);
            setOrganizations(result.organizations);
            setPageCount(Math.ceil(result.total / pageSize));
        });
    }

    const onSaveResults = (e) => {
        e.preventDefault();
        setShowModel(true);
    }

    const onCloseModel = () => {
        setShowModel(false);
    }

    const getSearchRequest = (pageNumber) => {
        return ({
            "name": searchText,
            "countries": selectedMarketCriteria.selectedCountries,
            "regions": selectedMarketCriteria.selectedRegions,
            "cities": selectedMarketCriteria.selectedCities,
            "municipalities": selectedMarketCriteria.selectedMunicipalities,
            "cpvs": selectedCpvCodes,
            "naces": selectedNaceCodes,
            "unspscs": selectedUnspscCodes,
            "pageSize": pageSize,
            "pageNo": pageNumber,
        })
    }

    const onChangePage = (pageNumber) => {
        let pageNo;
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

    const getCriteriaHeader = (header, tooltip, onClickHeader) => {
        return (
            <div className="text-left sub-title-txt hover-hand" onClick={() => onClickHeader()}>
                {header}
                <span className="tooltip-toggle" aria-label={tooltip}>
                    <i className="icon-eye color-black" />
                </span>
                <i className="icon-minus fr" />
            </div>

        )
    }

    const toggleOpenCriteria = (criteriaName) => {
        setOpenCriteria({ ...openCriteria, [criteriaName]: !openCriteria[criteriaName] })
    }

    const getMarketCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader("Market Information", "xxx", () => toggleOpenCriteria('Market'))}
                {openCriteria.Market &&
                    <div className="g-row">
                        <div className="g-col-3">
                            {Dropdown({ placeholder: 'Country', dataList: marketInformationData.countries, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCountries", apiCalls: getRegionsData, keyName: "alpha3Code" })}
                        </div>
                        <div className="g-col-3">
                            {Dropdown({ placeholder: 'Region', dataList: marketInformationData.regions, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedRegions", apiCalls: getMunicipalitiesData, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {Dropdown({ placeholder: 'Municipality', dataList: marketInformationData.municipalities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedMunicipalities", apiCalls: getCityData, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {Dropdown({ placeholder: 'City', dataList: marketInformationData.cities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCities", keyName: "code" })}
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
                    {getCriteriaHeader("Product Groups (UNSPSC/ CPV Codes)", "xxx", () => toggleOpenCriteria('ProductGroups'))}
                    {openCriteria.ProductGroups &&
                        <>
                            <div className="m-t-5">UNSPSC Codes</div>
                            <div className="g-row">
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Segmant', dataList: unspscData.segmant, dataName: 'segmentTitle', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedUnspscCodes, setSelectedCodeList: setSelectedUnspscCodes, criteriaName: "segmant", apiCalls: getUnspscCodesData, codelevel: 2, keyName: "segmentCode" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Family', dataList: unspscData.family, dataName: 'familyTitle', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedUnspscCodes, setSelectedCodeList: setSelectedUnspscCodes, criteriaName: "family", apiCalls: getUnspscCodesData, codelevel: 3, keyName: "familyCode" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Class', dataList: unspscData.unspClass, dataName: 'classTitle', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedUnspscCodes, setSelectedCodeList: setSelectedUnspscCodes, criteriaName: "unspClass", apiCalls: getUnspscCodesData, codelevel: 4, keyName: "classCode" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Commodity Class', dataList: unspscData.comClass, dataName: 'commodityTitle', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedUnspscCodes, setSelectedCodeList: setSelectedUnspscCodes, criteriaName: "comClass", keyName: "commodityCode" })}
                                </div>
                            </div>
                            <div className="fl m-t-15">CPV Codes</div>
                            <div className="g-row">
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: 'Division', dataList: cpvData.division, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedCpvCodes, setSelectedCodeList: setSelectedCpvCodes, criteriaName: "division", apiCalls: getcpvCodesData, codelevel: 2, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: 'Group', dataList: cpvData.cpvGroup, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedCpvCodes, setSelectedCodeList: setSelectedCpvCodes, criteriaName: "cpvGroup", apiCalls: getcpvCodesData, codelevel: 3, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: 'Class', dataList: cpvData.cpvClass, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedCpvCodes, setSelectedCodeList: setSelectedCpvCodes, criteriaName: "cpvClass", apiCalls: getcpvCodesData, codelevel: 4, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {Dropdown({ placeholder: 'Category', dataList: cpvData.category, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedCpvCodes, setSelectedCodeList: setSelectedCpvCodes, criteriaName: "category", apiCalls: getcpvCodesData, codelevel: 5, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {Dropdown({ placeholder: 'Sub Category', dataList: cpvData.subCategory, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, selectedCodeList: selectedCpvCodes, setSelectedCodeList: setSelectedCpvCodes, criteriaName: "subCategory", keyName: "code" })}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }

    const getProfessionCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader("Profession (NACE Codes)", "xxx", () => toggleOpenCriteria('Profession'))}
                {openCriteria.Profession &&
                    <div className="g-row">
                        <div className="g-col-3">
                            {Dropdown({ placeholder: 'Section', dataList: professionData.section, dataName: 'desscription', selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, selectedCodeList: selectedNaceCodes, setSelectedCodeList: setSelectedNaceCodes, criteriaName: "section", apiCalls: getProfessionData, codelevel: 2, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {Dropdown({ placeholder: 'Division', dataList: professionData.divition, dataName: 'desscription', selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, selectedCodeList: selectedNaceCodes, setSelectedCodeList: setSelectedNaceCodes, criteriaName: "divition", apiCalls: getProfessionData, codelevel: 3, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {Dropdown({ placeholder: 'Group', dataList: professionData.profGroup, dataName: 'desscription', selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, selectedCodeList: selectedNaceCodes, setSelectedCodeList: setSelectedNaceCodes, criteriaName: "profGroup", apiCalls: getProfessionData, codelevel: 4, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {Dropdown({ placeholder: 'Class', dataList: professionData.profClass, dataName: 'desscription', selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, selectedCodeList: selectedNaceCodes, setSelectedCodeList: setSelectedNaceCodes, criteriaName: "profClass", keyName: "code" })}
                        </div>
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
                        {getMarketCriteria()}
                        {getProductGroupsCriteria()}
                        {getProfessionCriteria()}
                        <button className="primary-btn m-l-10" onClick={onShowResults} >Show Result</button>
                        <button className="primary-btn" onClick={() => { changeActiveTab(NAVIGATION_PAGES.SEARCHRESULTS) }} >View History</button>
                    </form>
                </div>
            </div>
            <div className="g-col-6">
                <div className="page-container">
                    <div className="title-txt text-center">Results</div>
                    {loading &&
                        <div className="loading">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    }
                    <div className="search-results-container">
                        {organizations.map(organization => {
                            return (
                                <div key={organization.id} className="search-result-row g-row">
                                    <div className="g-col-1"><img src={logo_thumb} className="logo-thumb" /></div>
                                    <div className="g-col-3">{organization.organizationName}</div>
                                    <div className="g-col-2"><div>{organization?.businessAddr?.businessCountry ? organization.businessAddr.businessCountry : "No Country"}</div>
                                        <div>{organization?.businessAddr?.city ? organization.businessAddr.city : "No City"}</div></div>
                                    <div className="g-col-2"> <div>{organization?.secCode?.code ? organization.secCode.code : "No Sec Code"}</div>
                                        <div>{organization?.secCode?.description ? organization.secCode.description : "No Description"}</div></div>
                                    <div className="g-col-2"> <div className="m-l-20">Ratings</div>
                                        <img src={rating} /></div>
                                    <div className="g-col-1"><i className="icon-more m-t-20"  ><span className=" tooltip-toggle" aria-label="More..."></span></i></div>
                                    <div className="g-col-1"> <input type="checkbox" value={organization.id} className="check-box" /></div>
                                </div>
                            )
                        })}
                    </div>
                    {organizations.length > 0 &&
                        <Pagination pageNumber={actPage} pageCount={pageCount} onChangePage={(pageNum) => { onChangePage(pageNum) }} />
                    }
                    <button className="primary-btn save-button" onClick={onSaveResults} >Save</button>
                    <div className="hint-text" >Rows which are 'checked' will be saved</div>
                </div>
            </div>
            <Model visible={showModel} onCloseModel={onCloseModel} searchCriteria={searchText} />
        </>
    )
}