import React, { useState, useEffect, useContext } from "react";
import gb_flag from "../assets/images/gb_flag.png"
import logo_thumb from "../assets/images/logo_thumb.png"
import rating from "../assets/images/rating.png"
import Model from "../common/model";
import Pagination from "../common/pagination";
import { TabContext } from "../utils/contextStore";
import { NAVIGATION_PAGES } from "../utils/enums";
import { getCountries, getRegions, getMunicipalities, searchOrganization } from "../services/organizationsService";

const pageSize = 10;

export default function Search() {
    const [searchForm, setSerachForm] = useState({ Market: true, ProductGroups: false, Profession: false });
    const [searchText, setSerachText] = useState("");
    const [selectedMarketCriteria, setSelectedMarketCriteria] = useState({ selectedCountries: [], selectedRegions: [], selectedCities: [], selectedMunicipalities: [] });
    const [countries, setCountries] = useState([{ "name": "Norway", "alpha3Code": "NOR" }]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([{ "name": "OSLO", "code": "OSL" }, { "name": "SANDEFJORD", "code": "STC" }, { "name": "ANDEBU", "code": "AND" }, { "name": "STOKKE", "code": "STO" }, { "name": "MELSOMVIK", "code": "MEL" }]);
    const [municipalities, setMunicipalities] = useState([{ "name": "OSLO", "code": "OSL" }, { "name": "SANDEFJORD", "code": "STC" }]);
    const [organizations, setOrganizations] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [actPage, setActPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [multiSelectOpen, setMultiSelectOpen] = useState({ unspGroup: false, cpvGroup: false })
    const [selectedProductGroupesCriteria, setSelectedProductGroupesCriteria] = useState({ segmant: [], family: [], unspClass: [], comClass: [], division: [], unspGroup: [], cpvClass: [], category: [], subCategory: [] })
    const [selectedProfessionCriteria, setSelectedProfessionCriteria] = useState({ section: [], divition: [], profGroup: [], profClass: [] })
    const [showModel, setShowModel] = useState(false);
    const { changeActiveTab } = useContext(TabContext)

    useEffect(() => {
        // getCountries().then(result => { setCountries(result) });
        getRegions().then(result => { setRegions(result) });
        // getMunicipalities().then(result => { setMunicipalities(result) });
    }, []);

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
        if (searchText !== '') {
            setShowModel(true);
        }
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

    const handleDropdownSelect = (e, selectedList, setSelectedState, criteriaName, multiSelect) => {
        e.preventDefault();
        const index = selectedList[criteriaName].indexOf(e.target.value)
        if (index < 0) {
            const newSelectedCriteria = [...selectedList[criteriaName]];
            newSelectedCriteria.push(e.target.value);
            setSelectedState({ ...selectedList, [criteriaName]: newSelectedCriteria });
        } else if (multiSelect) {
            const newSelectedCriteria = [...selectedList[criteriaName]];
            newSelectedCriteria.splice(index, 1);
            setSelectedState({ ...selectedList, [criteriaName]: newSelectedCriteria });
        }
    }

    const getDropdown = ({ placeholder, dataList, criteriaName, selectedList, setSelectedState, keyName, multiSelect = false } = {}) => {
        return (
            <>
                {getDropdownBar(placeholder, dataList, keyName, selectedList, setSelectedState, criteriaName, multiSelect)}
                {getDropdownSelection(criteriaName, selectedList, setSelectedState)}
            </>
        )
    }

    const getDropdownBar = (placeholder, dataList, keyName, selectedList, setSelectedState, criteriaName, multiSelect) => {
        const multiOnclick = () => {
            setMultiSelectOpen({ ...multiSelectOpen, [criteriaName]: !multiSelectOpen[criteriaName] });
        }

        if (!multiSelect) {
            return (
                <select className="dropdown-list" onChange={(e) => handleDropdownSelect(e, selectedList, setSelectedState, criteriaName, false)} value={"0"}>
                    <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                    {
                        dataList.map(item => {
                            return <option value={item.name} key={item[keyName]}>{item.name}</option>
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
                                            <input type="checkbox" className="check-box p-r-10" value={item.name} key={item[keyName]} checked={selectedList[criteriaName].indexOf(item.name) > -1} onChange={(e) => handleDropdownSelect(e, selectedList, setSelectedState, criteriaName, true)} />
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

    const getDropdownSelection = (criteriaName, selectedList, setSelectedState) => {
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

    const getSearchRequest = (pageNumber) => {
        return ({
            "name": searchText,
            "countries": selectedMarketCriteria.selectedCountries,
            "regions": selectedMarketCriteria.selectedRegions,
            "cities": selectedMarketCriteria.selectedCities,
            "municipalities": selectedMarketCriteria.selectedMunicipalities,
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
                        {getDropdown({ placeholder: 'Country', dataList: countries, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedCountries", keyName: "alpha3Code" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Region', dataList: regions, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedRegions", keyName: "code" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Municipality', dataList: municipalities, selectedList: selectedMarketCriteria, setSelectedState: setSelectedMarketCriteria, criteriaName: "selectedMunicipalities", keyName: "code" })}
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
                            {getDropdown({ placeholder: 'Segmant', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "segmant", keyName: "" })}
                        </div>
                        <div className="g-col-3">
                            {getDropdown({ placeholder: 'Family', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "family", keyName: "" })}
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
                            {getDropdown({ placeholder: 'Division', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "division", keyName: "" })}
                        </div>
                        <div className="g-col-2">
                            {getDropdown({ placeholder: 'Group', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "unspGroup", keyName: "", multiSelect: true })}
                        </div>
                        <div className="g-col-2">
                            {getDropdown({ placeholder: 'Class', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "cpvClass", keyName: "" })}
                        </div>
                        <div className="g-col-2">
                            {getDropdown({ placeholder: 'Category', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "category", keyName: "" })}
                        </div>
                        <div className="g-col-3">
                            {getDropdown({ placeholder: 'Sub Category', dataList: [], selectedList: selectedProductGroupesCriteria, setSelectedState: setSelectedProductGroupesCriteria, criteriaName: "subCategory", keyName: "" })}
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
                        {getDropdown({ placeholder: 'Section', dataList: [], selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, criteriaName: "section", keyName: "" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Division', dataList: [], selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, criteriaName: "divition", keyName: "" })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Group', dataList: [], selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, criteriaName: "profGroup", keyName: "", multiSelect: true })}
                    </div>
                    <div className="g-col-3">
                        {getDropdown({ placeholder: 'Class', dataList: [], selectedList: selectedProfessionCriteria, setSelectedState: setSelectedProfessionCriteria, criteriaName: "profClass", keyName: "" })}
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