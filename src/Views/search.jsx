import React, { useState, useEffect, useContext } from "react";
import gb_flag from "../assets/images/gb_flag.png"
import logo_thumb from "../assets/images/logo_thumb.png"
import rating from "../assets/images/rating.png"
import Model from "../common/model";
import Pagination from "../common/pagination";
import { TabContext } from "../utils/contextStore";
import { NAVIGATION_PAGES } from "../utils/enums";
import { arrayToUpper } from "../utils"
import { getCountries, getRegions, getMunicipalities, searchOrganization, getCities, getCpvCodes, getNacCodes } from "../services/organizationsService";

const pageSize = 10;

export default function Search() {
    const [searchForm, setSerachForm] = useState({ Market: true, ProductGroups: false, Profession: false });
    const [searchText, setSerachText] = useState("");
    const [organizations, setOrganizations] = useState([]);

    // Data from back-end
    const [countries, setCountries] = useState([{ "name": "Norway", "alpha3Code": "NOR" }]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [productGroupesData, setProductGroupesData] = useState({ segmant: [], family: [], unspClass: [], comClass: [], division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] })
    const [professionData, setProfessionData] = useState({ section: [], divition: [], profGroup: [], profClass: [] })

    // Drop Down selected eliments data
    const [selectedMarketCriteria, setSelectedMarketCriteria] = useState({ selectedCountries: [], selectedRegions: [], selectedCities: [], selectedMunicipalities: [] });
    const [selectedProductGroupesCriteria, setSelectedProductGroupesCriteria] = useState({ segmant: [], family: [], unspClass: [], comClass: [], division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] })
    const [selectedProfessionCriteria, setSelectedProfessionCriteria] = useState({ section: [], divition: [], profGroup: [], profClass: [] })

    const [pageCount, setPageCount] = useState(0);
    const [actPage, setActPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const [multiSelectOpen, setMultiSelectOpen] = useState({ profGroup: false, cpvGroup: false })
    const [showModel, setShowModel] = useState(false);

    const { changeActiveTab } = useContext(TabContext)

    useEffect(() => {
        const cpvDivisionReq = {
            "level": 1,
            "code": ""
        }
        const nacSectionReq = {
            "level": "1",
            "parent": ""
        }
        // getCountries().then(result => { setCountries(result) });
        getCpvCodes(cpvDivisionReq).then(result => { setProductGroupesData({ ...productGroupesData, division: result }) });
        getNacCodes(nacSectionReq).then(result => { setProfessionData({ ...professionData, section: result }) });
    }, []);

    //API calls
    const getRegionsData = (countryName) => {
        getRegions(countryName).then(result => { setRegions(result) });
    }

    const getMunicipalitiesData = (regionName) => {
        getMunicipalities(regionName).then(result => { setMunicipalities(result) });
    }

    const getCityData = (MunicipalityName) => {
        getCities(MunicipalityName).then(result => { setCities(result) });
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

        const cpvData = productGroupesData[getCpvName(level - 1)].filter(item => item.desscription === desscription)

        const data = {
            "level": level,
            "code": cpvData[0].code
        }
        getCpvCodes(data).then(result => {
            setProductGroupesData({ ...productGroupesData, [getCpvName(level)]: result })
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
        console.log(data)
        getNacCodes(data).then(result => {
            setProfessionData({ ...professionData, [getProfName(level)]: result })
        });
    }

    const onChangeSearch = (e) => {
        setSerachForm(prev => ({ ...prev, [e.target.value]: !searchForm[e.target.value] }));
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSerachText(e.target.value);
    }

    const onCloseBtnClick = (country, selectedList) => {
        const newSelectedList = [...selectedList];
        newSelectedList.splice(selectedList.indexOf(country), 1)
        return newSelectedList;
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

    const getSerachByItem = (title, value, toolTip, widthSize) => {
        const gridClass = "sub-title-txt g-col-" + widthSize
        return (
            <div className={gridClass}>
                <input className="check-box" type="checkbox" value={value} name="searchBy" checked={searchForm[value]} onChange={onChangeSearch} />
                {title}
                <span className="tooltip-toggle fr" aria-label={toolTip}>
                    <i className="icon-eye color-black" />
                </span>

            </div>
        )
    }

    const handleDropdownSelect = (e, selectedList, setSelectedState, criteriaName, apiCalls, codelevel, multiSelect) => {
        e.preventDefault();
        const index = selectedList[criteriaName].indexOf(e.target.value)
        if (index < 0) {
            if (codelevel > 0) {
                apiCalls(e.target.value, codelevel);

            } else {
                apiCalls(e.target.value);
            }
            const newSelectedCriteria = [...selectedList[criteriaName]];
            newSelectedCriteria.push(e.target.value);
            setSelectedState({ ...selectedList, [criteriaName]: newSelectedCriteria });
        } else if (multiSelect) {
            const newSelectedCriteria = [...selectedList[criteriaName]];
            newSelectedCriteria.splice(index, 1);
            setSelectedState({ ...selectedList, [criteriaName]: newSelectedCriteria });
        }
    }

    const getDropdown = ({ placeholder, dataList, dataName = 'name', criteriaName, selectedList, setSelectedState, keyName, apiCalls = () => { }, codelevel = 0, multiSelect = false } = {}) => {

        const getDropdownBar = () => {
            const multiOnclick = () => {
                setMultiSelectOpen({ ...multiSelectOpen, [criteriaName]: !multiSelectOpen[criteriaName] });
            }

            if (!multiSelect) {
                return (
                    <select className="dropdown-list" onChange={(e) => handleDropdownSelect(e, selectedList, setSelectedState, criteriaName, apiCalls, codelevel, false)} value={"0"}>
                        <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                        {
                            dataList.map(item => {
                                return <option value={item[dataName]} key={item[keyName]}>{item[dataName]}</option>
                            })
                        }
                    </select>
                )
            } else {
                return (
                    <div className="muli-select-container">
                        <select className="dropdown-list" value={"0"} onClick={() => multiOnclick()} onChange={() => { }} >
                            <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                        </select>
                        {multiSelectOpen[criteriaName] &&
                            <div className="multi-select-dropdown-container">
                                {
                                    dataList.map(item => {
                                        return (
                                            <div className="g-col-12" key={item[keyName]}>
                                                <input type="checkbox" className="check-box p-r-10" value={item.name} key={item[keyName]} checked={selectedList[criteriaName].indexOf(item.name) > -1} onChange={(e) => handleDropdownSelect(e, selectedList, setSelectedState, criteriaName, apiCalls, codelevel, true)} />
                                                {item.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                )
            }
        }

        const getDropdownSelection = () => {
            return (
                <>
                    {selectedList[criteriaName]?.length == 0 &&
                        <div className="selected-item" key={'all'}>
                            <i className="close-btn icon-close-small-x m-t-5" onClick={() => { }} > </i>
                            All
                        </div>
                    }
                    {
                        selectedList[criteriaName]?.map(item => {
                            return (
                                <div className="selected-item" key={item}>
                                    <i className="close-btn icon-close-small-x m-t-5" onClick={() => setSelectedState({ ...selectedList, [criteriaName]: onCloseBtnClick(item, selectedList[criteriaName]) })} > </i>
                                    {item}
                                </div>
                            )
                        })
                    }
                </>
            )
        }

        return (
            <div className={dataList.length == 0 ? "disable-div" : ''}>
                {getDropdownBar()}
                {getDropdownSelection()}
            </div>
        )
    }

    const getSearchRequest = (pageNumber) => {
        return ({
            "name": searchText,
            "countries": selectedMarketCriteria.selectedCountries,
            "regions": selectedMarketCriteria.selectedRegions,
            "cities": arrayToUpper(selectedMarketCriteria.selectedCities),
            "municipalities": arrayToUpper(selectedMarketCriteria.selectedMunicipalities),
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

    const getMarketCriteria = () => {
        const containerStyle = searchForm.Market ? "gray-container" : "gray-container disable-div"
        return (
            <div className={containerStyle}>
                <div className="text-left sub-title-txt">Market Information</div>
                <div className="g-row">
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Country', dataList: countries, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCountries", apiCalls: getRegionsData, keyName: "alpha3Code" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Region', dataList: regions, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedRegions", apiCalls: getMunicipalitiesData, keyName: "code" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Municipality', dataList: municipalities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedMunicipalities", apiCalls: getCityData, keyName: "code" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'City', dataList: cities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCities", keyName: "code" })}
                    </div>
                </div>
            </div>
        )
    }

    const getProductGroupsCriteria = () => {
        const containerStyle = searchForm.ProductGroups ? "gray-container" : "gray-container disable-div"
        return (
            <div className="g-col-12">
                <div className={containerStyle}>
                    <div className="text-left sub-title-txt">Product Groups (UNSPSC/ CPV Codes)</div>
                    <div className="m-t-5">UNSPSC Codes</div>
                    <div className="g-row">
                        <div className="g-col-3">
                            {getDropdown({ placeholder: 'Segmant', dataList: productGroupesData.segmant, selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "segmant", keyName: "" })}
                        </div>
                        <div className="g-col-3">
                            {getDropdown({ placeholder: 'Family', dataList: productGroupesData.family, selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "family", keyName: "" })}
                        </div>
                        <div className="g-col-3">
                            {getDropdown({ placeholder: 'Class', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "unspClass", keyName: "" })}
                        </div>
                        <div className="g-col-3">
                            {getDropdown({ placeholder: 'Commodity Class', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "comClass", keyName: "" })}
                        </div>
                    </div>
                    <div className="fl m-t-15">CPV Codes</div>
                    <div className="g-row">
                        <div className="g-col-2">
                            {getDropdown({ placeholder: 'Division', dataList: productGroupesData.division, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "division", apiCalls: getcpvCodesData, codelevel: 2, keyName: "code" })}
                        </div>
                        <div className="g-col-2">
                            {getDropdown({ placeholder: 'Group', dataList: productGroupesData.cpvGroup, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "cpvGroup", apiCalls: getcpvCodesData, codelevel: 3, keyName: "code" })}
                        </div>
                        <div className="g-col-2">
                            {getDropdown({ placeholder: 'Class', dataList: productGroupesData.cpvClass, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "cpvClass", apiCalls: getcpvCodesData, codelevel: 4, keyName: "code" })}
                        </div>
                        <div className="g-col-2">
                            {getDropdown({ placeholder: 'Category', dataList: productGroupesData.category, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "category", apiCalls: getcpvCodesData, codelevel: 5, keyName: "code" })}
                        </div>
                        <div className="g-col-3">
                            {getDropdown({ placeholder: 'Sub Category', dataList: productGroupesData.subCategory, dataName: 'desscription', selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "subCategory", keyName: "code" })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const getProfessionCriteria = () => {
        const containerStyle = searchForm.Profession ? "gray-container" : "gray-container disable-div"
        return (
            <div className={containerStyle}>
                <div className="sub-title-txt">Profession (NACE Codes)</div>
                <div className="g-row">
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Section', dataList: professionData.section, dataName: 'desscription', selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, criteriaName: "section", apiCalls: getProfessionData, codelevel: 2, keyName: "code" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Division', dataList: professionData.divition, dataName: 'desscription', selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, criteriaName: "divition", apiCalls: getProfessionData, codelevel: 3, keyName: "code" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Group', dataList: professionData.profGroup, dataName: 'desscription', selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, criteriaName: "profGroup", apiCalls: getProfessionData, codelevel: 4, keyName: "code" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Class', dataList: professionData.profClass, dataName: 'desscription', selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, criteriaName: "profClass", keyName: "code" })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="g-col-6">
                <div className="page-container m-r-0">
                    <div className="g-row flex-center-middle">
                        <div className="search-bar g-col-10 m-r-10">
                            <i className="search-btn icon-search" onClick={onShowResults}></i>
                            <input type="text" onChange={handleSearch} value={searchText} placeholder="Search by Location, Product or Service" />
                        </div>
                        <div className="g-col-2 g-row">
                            <span className="fl g-col-6 m-r-10">English </span>
                            <span className="fl g-col-3"><img src={gb_flag} className="flag-image a-row m-r-5" /></span>
                            <i className="g-col-1 icon-arrow-down fl" />
                        </div>
                    </div>
                    <h4>Narrow down your search by...</h4>
                    <div className="g-row">
                        {getSerachByItem('Market', 'Market', "xxxxx", '2')}
                        {getSerachByItem('Product Groups (UNSPSC/ CPV Codes)', 'ProductGroups', "xxxxx", '6')}
                        {getSerachByItem('Profession (NACE Codes)', 'Profession', "xxxxx", '4')}
                    </div>
                    <form className="n-float" >
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