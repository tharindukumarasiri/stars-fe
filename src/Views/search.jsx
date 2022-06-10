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
    const [searchForm, setSerachForm] = useState("Market");
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
    const [multiSelectOpen, setMultiSelectOpen] = useState({ unspscGroup: false, cpvGroup: false })
    const [selectedProductGroupesCriteria, setSelectedProductGroupesCriteria] = useState({ unspscSector: [], unspscGroup: [], cpvSector: [], cpvGroup: [] })
    const [selectedCompanyCriteria, setSelectedCompanyCriteria] = useState({ naceSector: [], naceGroup: [] })
    const [showModel, setShowModel] = useState(false);
    const { changeActiveTab } = useContext(TabContext)

    useEffect(() => {
        // getCountries().then(result => { setCountries(result) });
        getRegions().then(result => { setRegions(result) });
        // getMunicipalities().then(result => { setMunicipalities(result) });
    }, []);

    const onChangeSearch = (e) => {
        setSerachForm(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSerachText(e.target.value);
    }

    const handleCountrySelct = (e) => {
        e.preventDefault();
        if (selectedMarketCriteria.selectedCountries.indexOf(e.target.value) < 0) {
            const newSelectedCountries = [...selectedMarketCriteria.selectedCountries];
            newSelectedCountries.push(e.target.value);
            setSelectedMarketCriteria({ ...selectedMarketCriteria, selectedCountries: newSelectedCountries });
        }
    }

    const handleRegionSelct = (e) => {
        e.preventDefault();
        if (selectedMarketCriteria.selectedRegions.indexOf(e.target.value) < 0) {
            const newSelectedRegions = [...selectedMarketCriteria.selectedRegions];
            newSelectedRegions.push(e.target.value);
            setSelectedMarketCriteria({ ...selectedMarketCriteria, selectedRegions: newSelectedRegions });
        }
    }

    const handleCitySelct = (e) => {
        e.preventDefault();
        if (selectedMarketCriteria.selectedCities.indexOf(e.target.value) < 0) {
            const newSelectedCities = [...selectedMarketCriteria.selectedCities];
            newSelectedCities.push(e.target.value);
            setSelectedMarketCriteria({ ...selectedMarketCriteria, selectedCities: newSelectedCities });
        }
    }

    const handleMunicipalitySelct = (e) => {
        e.preventDefault();
        if (selectedMarketCriteria.selectedMunicipalities.indexOf(e.target.value) < 0) {
            const newSelectedMunicipalities = [...selectedMarketCriteria.selectedMunicipalities];
            newSelectedMunicipalities.push(e.target.value);
            setSelectedMarketCriteria({ ...selectedMarketCriteria, selectedMunicipalities: newSelectedMunicipalities });
        }
    }

    const handleUnspscSectorSelect = (e) => {
        if (selectedProductGroupesCriteria.unspscSector.indexOf(e.target.value) < 0) {
            const newSelectedProductGroupesCriteria = [...selectedProductGroupesCriteria.unspscSector];
            newSelectedProductGroupesCriteria.push(e.target.value);
            setSelectedProductGroupesCriteria({ ...selectedProductGroupesCriteria, unspscSector: newSelectedProductGroupesCriteria });
        }
    }

    const handleUnspscGroupSelect = (value) => {
        const index = selectedProductGroupesCriteria.unspscGroup.indexOf(value);

        if (index < 0) {
            const newSelectedProductGroupesCriteria = [...selectedProductGroupesCriteria.unspscGroup];
            newSelectedProductGroupesCriteria.push(value);
            setSelectedProductGroupesCriteria({ ...selectedProductGroupesCriteria, unspscGroup: newSelectedProductGroupesCriteria });
        } else {
            const newSelectedProductGroupesCriteria = [...selectedProductGroupesCriteria.unspscGroup];
            newSelectedProductGroupesCriteria.splice(index, 1);
            setSelectedProductGroupesCriteria({ ...selectedProductGroupesCriteria, unspscGroup: newSelectedProductGroupesCriteria });
        }
    }

    const handleCPVSectorSelect = (e) => {
        if (selectedProductGroupesCriteria.cpvSector.indexOf(e.target.value) < 0) {
            const newSelectedProductGroupesCriteria = [...selectedProductGroupesCriteria.cpvSector];
            newSelectedProductGroupesCriteria.push(e.target.value);
            setSelectedProductGroupesCriteria({ ...selectedProductGroupesCriteria, cpvSector: newSelectedProductGroupesCriteria });
        }
    }

    const handleCpvGroupSelect = (value) => {
        const index = selectedProductGroupesCriteria.cpvGroup.indexOf(value);

        if (index < 0) {
            const newSelectedProductGroupesCriteria = [...selectedProductGroupesCriteria.cpvGroup];
            newSelectedProductGroupesCriteria.push(value);
            setSelectedProductGroupesCriteria({ ...selectedProductGroupesCriteria, cpvGroup: newSelectedProductGroupesCriteria });
        } else {
            const newSelectedProductGroupesCriteria = [...selectedProductGroupesCriteria.unspscGroup];
            newSelectedProductGroupesCriteria.splice(index, 1);
            setSelectedProductGroupesCriteria({ ...selectedProductGroupesCriteria, unspscGroup: newSelectedProductGroupesCriteria });
        }
    }

    const handleNaceSectorSelect = (e) => {
        if (selectedCompanyCriteria.naceSector.indexOf(e.target.value) < 0) {
            const newSelectedCompanyCriteria = [...selectedCompanyCriteria.naceSector];
            newSelectedCompanyCriteria.push(e.target.value);
            setSelectedCompanyCriteria({ ...selectedCompanyCriteria, naceSector: newSelectedCompanyCriteria });
        }
    }

    const handleNaceGroupSelect = (value) => {
        const index = selectedCompanyCriteria.naceGroup.indexOf(value);
        const newSelectedCompanyCriteria = [...selectedCompanyCriteria.naceGroup];

        if (index < 0) {
            newSelectedCompanyCriteria.push(value);
            setSelectedCompanyCriteria({ ...selectedCompanyCriteria, naceGroup: newSelectedCompanyCriteria });
        } else {
            newSelectedCompanyCriteria.splice(index, 1);
            setSelectedCompanyCriteria({ ...selectedCompanyCriteria, naceGroup: newSelectedCompanyCriteria });
        }
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
        if(searchText !== ''){
            setShowModel(true);
        }
    }

    const onCloseModel = () => {
        setShowModel(false);
    }

    const getDropdown = (placeholder, dataList, handleChange, keyName) => {
        return (
            <select className="dropdown-list" onChange={handleChange} value={"0"}>
                <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                {
                    dataList.map(item => {
                        return <option value={item.name} key={item[keyName]}>{item.name}</option>
                    })
                }
            </select>
        )
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

    const getMultiDropdown = (placeholder, dataList, handleChange, multiSelectOpenName, selectedCriteria, keyName) => {

        const multiOnclick = () => {
            setMultiSelectOpen({ ...multiSelectOpen, [multiSelectOpenName]: !multiSelectOpen[multiSelectOpenName] });
        }

        return (
            <div className="muli-select-container">
                <select className="dropdown-list" value={"0"} onClick={() => multiOnclick()} >
                    <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                </select>
                {multiSelectOpen[multiSelectOpenName] &&
                    <div className="multi-select-dropdown-container">
                        {
                            dataList.map(item => {
                                return (
                                    <div className="g-col-12" key={item[keyName]} onClick={() => handleChange(item.name)}>
                                        <input type="checkbox" className="check-box p-r-10" checked={selectedCriteria[multiSelectOpenName].indexOf(item.name) > -1} />
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

    const getCriteriaView = () => {
        switch (searchForm) {
            case "Market":
                return getMarketCriteria();
            case "ProductGroups":
                return getProductGroupsCriteria();
            case "Company":
                return getCompanyCriteria();

        }
    }

    const getMarketCriteria = () => {
        return (
            <div className="gray-container">
                <div className="text-left p-t-20">Market Information</div>
                <div className="g-row">
                    <div className="g-col-3">
                        {
                            getDropdown('Country', countries, handleCountrySelct, "alpha3Code")
                        }
                        {
                            getDropdownSelection('selectedCountries', selectedMarketCriteria, setSelectedMarketCriteria)
                        }
                    </div>
                    <div className="g-col-3">
                        {
                            getDropdown('Region', regions, handleRegionSelct, "code")
                        }
                        {
                            getDropdownSelection('selectedRegions', selectedMarketCriteria, setSelectedMarketCriteria)
                        }
                    </div>
                    <div className="g-col-3">
                        {
                            getDropdown('City', cities, handleCitySelct, "code")
                        }
                        {
                            getDropdownSelection('selectedCities', selectedMarketCriteria, setSelectedMarketCriteria)
                        }
                    </div>
                    <div className="g-col-3">
                        {
                            getDropdown('Municipality', municipalities, handleMunicipalitySelct, "code")
                        }
                        {
                            getDropdownSelection('selectedMunicipalities', selectedMarketCriteria, setSelectedMarketCriteria)
                        }
                    </div>
                </div>
            </div>
        )
    }

    const getProductGroupsCriteria = () => {
        return (
            <div className="g-col-12">
                <div className="gray-container">
                    <div className="text-left">UNSPSC Codes</div>
                    <div className="g-row">
                        <div className="g-col-5">
                            {
                                getDropdown('Sector', countries, handleUnspscSectorSelect, "alpha3Code")
                            }
                            {
                                getDropdownSelection('unspscSector', selectedProductGroupesCriteria, setSelectedProductGroupesCriteria)
                            }
                        </div>
                        <div className="g-col-7">
                            {
                                getMultiDropdown('Group', regions, handleUnspscGroupSelect, 'unspscGroup', selectedProductGroupesCriteria, "code")
                            }
                            {
                                getDropdownSelection('unspscGroup', selectedProductGroupesCriteria, setSelectedProductGroupesCriteria)
                            }
                        </div>

                    </div>
                </div>
                <div className="gray-container">
                    <div className="text-left">CPV Codes</div>
                    <div className="g-row">
                        <div className="g-col-5">
                            {
                                getDropdown('Sector', countries, handleCPVSectorSelect, "alpha3Code")
                            }
                            {
                                getDropdownSelection('cpvSector', selectedProductGroupesCriteria, setSelectedProductGroupesCriteria)
                            }
                        </div>
                        <div className="g-col-7">
                            {
                                getMultiDropdown('Group', municipalities, handleCpvGroupSelect, 'cpvGroup', selectedProductGroupesCriteria, "code")
                            }
                            {
                                getDropdownSelection('cpvGroup', selectedProductGroupesCriteria, setSelectedProductGroupesCriteria)
                            }
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    const getCompanyCriteria = () => {
        return (
            <div className="gray-container">
                <div className="text-left">NACECode/s</div>
                <div className="g-row">
                    <div className="g-col-5">
                        {
                            getDropdown('Sector', countries, handleNaceSectorSelect, "alpha3Code")
                        }
                        {
                            getDropdownSelection('naceSector', selectedCompanyCriteria, setSelectedCompanyCriteria)
                        }
                    </div>
                    <div className="g-col-7">
                        {
                            getMultiDropdown('Group', regions, handleNaceGroupSelect, 'naceGroup', selectedCompanyCriteria, "code")
                        }
                        {
                            getDropdownSelection('naceGroup', selectedCompanyCriteria, setSelectedCompanyCriteria)
                        }
                    </div>

                </div>
            </div>
        )
    }

    return (
        <>
            <div className="g-col-6">
                <div className="page-container m-r-0">
                    <div className="g-row p-y-15">
                        <div className="g-col-2 text-center">Search By:</div>
                        <div className="g-col-10">
                            <div className="g-col-2 flex-center-middle"><div><input className="m-r-10 " type="radio" value="Market" name="searchBy" checked={searchForm === "Market"} onChange={onChangeSearch} />Market</div></div>
                            <div className="g-col-4 flex-center-middle"><div><input className="m-r-10" type="radio" value="ProductGroups" name="searchBy" checked={searchForm === "ProductGroups"} onChange={onChangeSearch} /> Product Groups</div></div>
                            <div className="g-col-3 flex-center-middle"><div><input className="m-r-10" type="radio" value="Company" name="searchBy" checked={searchForm === "Company"} onChange={onChangeSearch} /> Company</div></div>
                            <div className="g-col-3 flex-center-middle"><div><span className="fl"><img src={gb_flag} className="flag-image a-row m-r-5" /></span><span className="fl">English </span><i className="a-row icon-arrow-down fl" /></div></div>
                        </div>
                    </div>
                    <form className="n-float" >
                        <div className="search-bar">
                            <i className="search-btn icon-search" onClick={onShowResults}></i>
                            <input type="text" onChange={handleSearch} value={searchText} placeholder="Search" />
                        </div>
                        {
                            getCriteriaView()
                        }
                        <button className="primary-btn m-l-10" onClick={onShowResults} >Show Result</button>
                        <button className="primary-btn" onClick={() => {changeActiveTab(NAVIGATION_PAGES.SEARCHRESULTS)}} >View History</button>
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