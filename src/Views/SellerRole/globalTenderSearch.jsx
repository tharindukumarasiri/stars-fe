import React, { useState, useEffect, useContext } from "react";
import { Table, Pagination } from 'antd';
import { TabContext } from "../../utils/contextStore";
import { levelOneReq } from "../../utils/constants";
import { getCpvCodes, getCitiesByCountry, getAllTenders, getNutsCodes } from "../../services/organizationsService";
import DropdownCPV from "./Components/dropdown";
import Dropdown from "../../common/dropdown"
import CountryDropDown from "./Components/countryDropDown";
import CitiesDropDown from "./Components/citiesDropDown";
import SearchSelectedValues from "./Components/searchSelectedValues";
import gb_flag from "../../assets/images/gb_flag.png"
import { useTranslation } from "react-i18next";
import DatePickerInput from "../../common/datePickerInput";
import { searchTendersTableHeaders } from "../../utils/constants";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { formatDate } from "../../utils";

const noticeTypes = ['All', 'PIN', 'NOTICE', 'AWARD', 'INTENTION', 'BUYER PROFILE', 'DYNAMIC PURCHASING SYSTEM'];
const publicationTypes = ['All', 'NATIONAL', 'EUROPEAN', 'MARKET CONSULTING']
const sortByTypes = ['None', 'Publisher', 'Publication Date', 'Expired Date', 'Country', 'Main CPV']
const pageSize = 10;

const GlobalTenderSearch = () => {
    const { changeActiveTab } = useContext(TabContext);

    const [marketInformationData, setMarketInformationData] = useState({ countries: [], cities: [] });
    const [cpvData, setCpvData] = useState({ division: [], cpvGroup: [], cpvClass: [], category: [], subCategory: [] });
    const [tendersData, setTendersData] = useState([]);

    const [searchText, setSerachText] = useState("");
    const [nutsCodeText, setnutsCodeText] = useState("");
    const [postalCodeText, setPostalCodeText] = useState("");
    const [selectedMarketCriteria, setSelectedMarketCriteria] = useState({ selectedCountries: [], selectedCities: [] });
    const [selectedCPVValues, setSelectedCPVValues] = useState([[[]]]);
    const [selectedCPVRows, setSelectedCPVRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedTypes, setSelectedTypes] = useState({ notice: 'All', publication: 'All' })
    const [selectedDates, setSelectedDates] = useState({ publishedFrom: '', publishedTo: '', expiryFrom: '', expiryTo: '', })
    const [referenceText, setReferenceText] = useState("");
    const [sortBy, setSortBy] = useState("");

    const [openCriteria, setOpenCriteria] = useState({ Market: false, CPV: false, Type: false });
    const [searchCriteriaVisible, setSearchCriteriaVisible] = useState(true);
    const [pageNumber, setpageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        getNutsCodes(0, 0).then(result => setMarketInformationData({ ...marketInformationData, countries: result }))
        getCpvCodes(levelOneReq).then(result => { setCpvData({ ...cpvData, division: result }) })
        getAllTenders({ pageSize, index: 1 }).then(result => {
            setTendersData(result.tenders);
            setPageCount(result.totalCount);
            setLoading(false);
        }).catch(() => setLoading(false))
    }, []);

    useEffect(() => {
        searchTenders(1);
    }, [sortBy]);

    //Api calles
    const getCitiesData = (countryName) => {
        getCitiesByCountry(countryName).then(result => { setMarketInformationData({ ...marketInformationData, cities: result }) });
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

    const onShowResults = (e) => {
        e.preventDefault();
        setTendersData([])
        searchTenders(1);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setSerachText(e.target.value);
    }

    const handleNutsCode = (e) => {
        e.preventDefault();
        setnutsCodeText(e.target.value);
    }

    const handlePostalCode = (e) => {
        e.preventDefault();
        setPostalCodeText(e.target.value);
    }

    const handleReferenceText = (e) => {
        e.preventDefault();
        setReferenceText(e.target.value);
    }

    const getCountryCodeList = () => {
        return selectedMarketCriteria.selectedCountries.map(value => {
            return value.id
        })
    }

    const searchTenders = (pageNumber) => {
        setpageNumber(pageNumber);
        setLoading(true);

        getAllTenders({
            pageSize,
            index: pageNumber,
            searchText: searchText,
            country: getCountryCodeList().toString(),
            cities: selectedMarketCriteria.selectedCities.toString(),
            nutsCode: nutsCodeText,
            postalCode: postalCodeText,
            cpvs: getFilterdCodes(selectedCPVValues).toString(),
            noticeType: selectedTypes.notice === 'All' ? '' : selectedTypes.notice,
            publicationType: selectedTypes.publication === 'All' ? '' : selectedTypes.publication,
            referenceNo: referenceText,
            publishedDateFrom: formatDate(selectedDates.publishedFrom, 'YYYY-MM-DD'),
            publishedDateTo: formatDate(selectedDates.publishedTo, 'YYYY-MM-DD'),
            expiryDateFrom: formatDate(selectedDates.expiryFrom, 'YYYY-MM-DD'),
            expiryDateTo: formatDate(selectedDates.expiryTo, 'YYYY-MM-DD'),
            sortBy: getSortingOptions(),
        }).then(result => {
            setTendersData(result.tenders);
            setPageCount(result.totalCount);
            setLoading(false);
        }).catch(() => setLoading(false))
    }

    const getCriteriaHeader = (header, onClickHeader, expanded) => {
        const expandIcon = expanded ? 'icon-minus fr' : 'icon-minus-1 fr'
        return (
            <div className="text-left sub-title-txt hover-hand" onClick={() => onClickHeader()}>
                {header}
                <i className={expandIcon} />
            </div>

        )
    }

    const toggleOpenCriteria = (criteriaName, state = null) => {
        setOpenCriteria({ ...openCriteria, [criteriaName]: state || !openCriteria[criteriaName] })
    }

    const getMarketCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(t("Market Information"), () => toggleOpenCriteria('Market'), openCriteria.Market)}
                {openCriteria.Market &&
                    <>
                        <div className="g-row">
                            <div className="g-col-6">
                                <CountryDropDown dataList={marketInformationData.countries} selectedList={selectedMarketCriteria} setSelectedState={setSelectedMarketCriteria} apiCalls={getCitiesData} />
                            </div>
                            <div className="g-col-6">
                                <CitiesDropDown dataList={marketInformationData.cities} selectedList={selectedMarketCriteria} setSelectedState={setSelectedMarketCriteria} />
                            </div>
                        </div>
                        <div className="g-row m-t-20">
                            <div className="g-col-6">
                                <input type="text" onChange={handleNutsCode} value={nutsCodeText} placeholder={"Nuts Code"} />
                            </div>
                            <div className="g-col-6">
                                <input type="text" onChange={handlePostalCode} value={postalCodeText} placeholder={"Postal Code"} />
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }

    const getCPVCriteria = () => {
        return (
            <div className="g-col-12">
                <div className="gray-container">
                    {getCriteriaHeader(t("CPV Codes"), () => toggleOpenCriteria('ProductGroups'), openCriteria.ProductGroups)}
                    {openCriteria.ProductGroups &&
                        <>
                            <div className="g-row">
                                <div className="g-col-2">
                                    {DropdownCPV({ placeholder: t('Division'), dataList: cpvData.division, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 1, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {DropdownCPV({ placeholder: t('Group'), dataList: cpvData.cpvGroup, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 2, keyName: "code" })}
                                </div>
                                <div className="g-col-2">
                                    {DropdownCPV({ placeholder: t('Class'), dataList: cpvData.cpvClass, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 3, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {DropdownCPV({ placeholder: t('Category'), dataList: cpvData.category, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 4, keyName: "code" })}
                                </div>
                                <div className="g-col-3">
                                    {DropdownCPV({ placeholder: t('Sub Category'), dataList: cpvData.subCategory, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, codelevel: 5, keyName: "code" })}
                                </div>
                            </div>
                            <SearchSelectedValues selectedValues={selectedCPVValues} setSelectedValues={setSelectedCPVValues} selectedRows={selectedCPVRows} setSelectedRows={setSelectedCPVRows} apiCalls={getcpvCodesData} />
                        </>
                    }
                </div>
            </div>
        )
    }

    const onTypeSelect = (e, typeName) => {
        e.preventDefault()
        setSelectedTypes({ ...selectedTypes, [typeName]: e.target.value })
    }

    const onChangeDates = (date, dateType) => {
        setSelectedDates({ ...selectedDates, [dateType]: date })
    }

    const onSortBySelect = (e) => {
        e.preventDefault();
        setSortBy(e.target.value);
    }
    const getSortingOptions = () => {
        switch (sortBy) {
            case 'Publisher':
                return 'publisher';
            case 'Publication Date':
                return 'publisheddate';
            case 'Expired Date':
                return 'deletiondate';
            case 'Country':
                return 'country';
            case 'Main CPV':
                return 'cpv';
            default:
                return ''
        }
    }

    const onClickTender = (record) => {
        changeActiveTab(NAVIGATION_PAGES.SELLER_TENDER_DETAILS, record)
    }

    const typesCriteria = () => {
        return (
            <div className="g-col-12">
                <div className="gray-container">
                    <div className="g-row flex-align-center">
                        <div className="text-left sub-title-txt g-col-3">
                            Notice Type
                        </div>
                        <div className="g-col-4">
                            <Dropdown values={noticeTypes} selected={selectedTypes.notice} onChange={(e) => onTypeSelect(e, 'notice')} placeholder='' />
                        </div>
                    </div>
                    <div className="g-row flex-align-center">
                        <div className="text-left sub-title-txt g-col-3">
                            Publicaton Type
                        </div>
                        <div className="g-col-4">
                            <Dropdown values={publicationTypes} selected={selectedTypes.publication} onChange={(e) => onTypeSelect(e, 'publication')} placeholder='' />
                        </div>
                    </div>
                    <div className="g-row fl flex-align-center">
                        <div className="text-left sub-title-txt g-col-3">
                            Reference
                        </div>
                        <div className="g-col-4">
                            <input type="text" onChange={handleReferenceText} value={referenceText} placeholder={"Reference"} />
                        </div>
                    </div>
                    <div className="g-row fl flex-align-center ">
                        <div className="text-left sub-title-txt g-col-3">
                            Published Date
                        </div>
                        <div className="g-col-4 m-t-10">
                            <DatePickerInput placeholder={'From Date'} value={selectedDates.publishedFrom} onChange={(date) => onChangeDates(date, 'publishedFrom')} />
                        </div>
                        <div className="g-col-4 m-t-10">
                            <DatePickerInput placeholder={'To Date'} value={selectedDates.publishedTo} onChange={(date) => onChangeDates(date, 'publishedTo')} />
                        </div>
                    </div>
                    <div className="g-row fl flex-align-center">
                        <div className="text-left sub-title-txt g-col-3">
                            Expiry Date
                        </div>
                        <div className="g-col-4 m-t-10">
                            <DatePickerInput placeholder={'From Date'} value={selectedDates.expiryFrom} onChange={(date) => onChangeDates(date, 'expiryFrom')} />
                        </div>
                        <div className="g-col-4 m-t-10">
                            <DatePickerInput placeholder={'To Date'} value={selectedDates.expiryTo} onChange={(date) => onChangeDates(date, 'expiryTo')} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            {loading &&
                <div className="loading center-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            {searchCriteriaVisible ?
                <div className="g-col-6">
                    < i className="icon-circle-arrow-r2 search-colaps-icon open-pane hover-hand" onClick={() => setSearchCriteriaVisible(prev => !prev)} />
                    <div className="page-container m-r-0">
                        <form onSubmit={onShowResults}>
                            <div className="g-row flex-center-middle m-b-15">
                                <div className="search-bar g-col-10 m-r-10">
                                    <i className="search-btn icon-search" onClick={onShowResults}></i>
                                    <input type="text" onChange={handleSearch} value={searchText} placeholder={"Search by Location, Product or Service"} />
                                </div>
                                <div className="g-col-2 g-row hover-hand">
                                    <span className="fl g-col-6 m-r-10">English </span>
                                    <span className="fl g-col-3"><img src={gb_flag} className="flag-image fl m-r-5" /></span>
                                    <i className="g-col-1 icon-arrow-down fl" />
                                </div>
                            </div>
                            <h4>Narrow down your search by...</h4>
                            {getMarketCriteria()}
                            {getCPVCriteria()}
                            {typesCriteria()}
                            <button className="primary-btn m-l-10" onClick={onShowResults} >Show Result</button>
                        </form>
                    </div>
                </div>
                :
                < i className="icon-circle-arrow-r2 search-colaps-icon hover-hand" onClick={() => setSearchCriteriaVisible(prev => !prev)} />
            }
            <div style={{ height: '100%', paddingBottom: 10 }}>
                <div className="page-container" >
                    <div className="g-row flex-align-center p-b-20 m-b-20 p-t-20">
                        <div className="text-left g-col-1">
                            Sort By
                        </div>
                        <div className="g-col-4">
                            <Dropdown values={sortByTypes} selected={sortBy} onChange={onSortBySelect} placeholder='' />
                        </div>
                    </div>
                    <Table
                        rowKey={(record) => record.id}
                        dataSource={tendersData}
                        columns={searchTendersTableHeaders}
                        pagination={false}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => onClickTender(record),
                            };
                        }}
                    />
                    <Pagination size="small" className="fr m-t-20 m-b-20" current={pageNumber} onChange={(pageNum) => { searchTenders(pageNum) }} total={pageCount} showSizeChanger={false} />
                </div>
            </div>
        </>
    )
}

export default GlobalTenderSearch;