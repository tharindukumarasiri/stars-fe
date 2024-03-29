import React, { useState, useEffect, useContext, useMemo } from "react";
import { Table, Pagination, Dropdown, Menu } from 'antd';
import { TabContext } from "../../utils/contextStore";
import { levelOneReq } from "../../utils/constants";
import { getCpvCodes, getCitiesByCountry, getAllTenders, getNutsCodes, updateTenantTenderMarker } from "../../services/organizationsService";
import DropdownCPV from "./Components/dropdown";
import DropdownComp from "../../common/dropdown"
import CountryDropDown from "./Components/countryDropDown";
import CitiesDropDown from "./Components/citiesDropDown";
import SearchSelectedValues from "./Components/searchSelectedValues";
import gb_flag from "../../assets/images/gb_flag.png"
import { useTranslation } from "react-i18next";
import DatePickerInput from "../../common/datePickerInput";
import { markTendersitems } from "../../utils/constants";
import { searchTendersTableHeaders, searchTendersTableHeadersExpanded } from "../../utils/tableHeaders";
import { FetchCurrentCompany } from "../../hooks";
import { NAVIGATION_PAGES } from "../../utils/enums";
import { formatDate } from "../../utils";

const noticeTypes = ['All', 'Open', 'Awarded', 'Pin', 'Intention'];
const publicationTypes = ['All', 'BODY_PUBLIC', 'EU_INSTITUTION', 'REGIONAL_AUTHORITY']
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
    const [referenceNoText, setReferenceNoText] = useState("");
    const [selectedMarketCriteria, setSelectedMarketCriteria] = useState({ selectedCountries: [], selectedCities: [] });
    const [selectedCPVValues, setSelectedCPVValues] = useState([[[]]]);
    const [selectedCPVRows, setSelectedCPVRows] = useState({ cuurentRow: 0, preLevel: 0 });
    const [selectedTypes, setSelectedTypes] = useState({ notice: 'All', publication: 'All' })
    const [selectedDates, setSelectedDates] = useState({ publishedFrom: null, publishedTo: null, expiryFrom: null, expiryTo: null, });
    const [selectedSource, setSelectedSource] = useState('');
    const [sortBy, setSortBy] = useState("");

    const [openCriteria, setOpenCriteria] = useState({ Market: false, CPV: false, Type: false, Source: false });
    const [searchCriteriaVisible, setSearchCriteriaVisible] = useState(true);
    const [pageNumber, setpageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const [selectedCompany] = FetchCurrentCompany();

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
        if (sortBy) {
            searchTenders(1);
        }
    }, [sortBy]);

    const handleMenuClick = (noticeNumber, markType) => {
        const params = {
            organizationId: selectedCompany.companyRegistrationId,
            countryCode: 'NO',
            noticeNumber: noticeNumber,
            markerType: markType
        }
        updateTenantTenderMarker(params).then(() => {
            if ('Ok') {
                searchTenders(pageNumber)
            }
        })
    };

    const getMenu = (noticeNumber) => {
        return (
            <Menu>
                {markTendersitems.map((item, index) => {
                    return (<Menu.Item onClick={() => handleMenuClick(noticeNumber, item.value)} key={index}>{item.icon}{item.label}</Menu.Item>)
                })}
            </Menu>
        )
    };

    const getMarkAsIcon = (markAsType) => {
        switch (markAsType) {
            case "NEW":
                return "icon-tender-new green"
            case "OPEN_FOR_CONSIDERATION":
                return "icon-tender-open blue-dark"
            case "PROPOSAL":
                return "icon-tender-proposal blue-purple"
            case "NOT_RELEVANT":
                return "icon-tender-not-relevant"
            case "CLOSED":
                return "icon-tender-closed red"
            default:
                return "icon-tender-new green"
        }
    }

    const tableHeaders = useMemo(() => {
        const headers = searchCriteriaVisible ? searchTendersTableHeaders(t) : searchTendersTableHeadersExpanded(t);

        headers.push({
            title: t('MARK_AS'),
            dataIndex: ['id', 'countryCode', 'noticeNumber', 'markerType'],
            fixed: 'right',
            width: 90,
            render: (_, { noticeNumber, markerType }) => (
                <div onClick={(e) => { e.stopPropagation() }}>
                    <Dropdown
                        overlay={getMenu(noticeNumber)}
                        trigger={['click']}
                    >
                        <div>
                            <i className={getMarkAsIcon(markerType)} />
                            <i className="icon-arrow-down" />
                        </div>
                    </Dropdown>
                </div>
            ),
        });

        return headers;
    }, [tendersData, searchCriteriaVisible]);

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
        setPageCount(0);
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

    const handlereferenceNo = (e) => {
        e.preventDefault();
        setReferenceNoText(e.target.value);
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
            referenceNo: referenceNoText,
            publishedDateFrom: formatDate(selectedDates.publishedFrom, 'YYYY-MM-DD'),
            publishedDateTo: formatDate(selectedDates.publishedTo, 'YYYY-MM-DD'),
            expiryDateFrom: formatDate(selectedDates.expiryFrom, 'YYYY-MM-DD'),
            expiryDateTo: formatDate(selectedDates.expiryTo, 'YYYY-MM-DD'),
            sortBy: getSortingOptions(),
            serviceProvider: selectedSource === 'All' ? '' : selectedSource,
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

    const onChangeSelectedSource = (e) => {
        e.preventDefault()
        setSelectedSource(e.target.value)
    }

    const getSource = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(t("SOURCE"), () => toggleOpenCriteria('Source'), openCriteria.Source)}
                {openCriteria.Source &&
                    <div className="g-row m-t-20">
                        <div className="g-col-4">
                            <DropdownComp values={["All", "Ted", "Doffin"]} selected={selectedSource} onChange={onChangeSelectedSource} placeholder='' />
                        </div>
                    </div>
                }
            </div>
        )
    }

    const getMarketCriteria = () => {
        return (
            <div className="gray-container">
                {getCriteriaHeader(t("MARKET_INFORMATION"), () => toggleOpenCriteria('Market'), openCriteria.Market)}
                {openCriteria.Market &&
                    <>
                        <div className="g-row m-t-20">
                            <div className="g-col-6">
                                <CountryDropDown dataList={marketInformationData.countries} selectedList={selectedMarketCriteria} setSelectedState={setSelectedMarketCriteria} apiCalls={getCitiesData} />
                            </div>
                            <div className="g-col-6">
                                <CitiesDropDown dataList={marketInformationData.cities} selectedList={selectedMarketCriteria} setSelectedState={setSelectedMarketCriteria} />
                            </div>
                        </div>
                        {/* <div className="g-row m-t-20">
                            <div className="g-col-6">
                                <input type="text" onChange={handleNutsCode} value={nutsCodeText} placeholder={"Nuts Code"} />
                            </div>
                            <div className="g-col-6">
                                <input type="text" onChange={handlePostalCode} value={postalCodeText} placeholder={"Postal Code"} />
                            </div>
                        </div> */}
                    </>
                }
            </div>
        )
    }

    const getCPVCriteria = () => {
        return (
            <div className="g-col-12">
                <div className="gray-container">
                    {getCriteriaHeader(t("CPV_CODES"), () => toggleOpenCriteria('ProductGroups'), openCriteria.ProductGroups)}
                    {openCriteria.ProductGroups &&
                        <>
                            <div className="g-row  m-t-20">
                                <div className="g-col-2">
                                    {DropdownCPV({ placeholder: t('DIVISION'), dataList: cpvData.division, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 1, keyName: "code2" })}
                                </div>
                                <div className="g-col-2">
                                    {DropdownCPV({ placeholder: t('GROUP'), dataList: cpvData.cpvGroup, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 2, keyName: "code2" })}
                                </div>
                                <div className="g-col-2">
                                    {DropdownCPV({ placeholder: t('CLASS'), dataList: cpvData.cpvClass, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 3, keyName: "code2" })}
                                </div>
                                <div className="g-col-3">
                                    {DropdownCPV({ placeholder: t('CATEGORY'), dataList: cpvData.category, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, apiCalls: getcpvCodesData, codelevel: 4, keyName: "code2" })}
                                </div>
                                <div className="g-col-3">
                                    {DropdownCPV({ placeholder: t('SUB_CATEGORY'), dataList: cpvData.subCategory, dataName: 'desscription', selectedList: selectedCPVValues, setSelectedState: setSelectedCPVValues, selectedRows: selectedCPVRows, setSelectedRows: setSelectedCPVRows, codelevel: 5, keyName: "code2" })}
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

    const onPageChange = (pageNum) => {
        searchTenders(pageNum)
    }

    const typesCriteria = () => {
        return (
            <div className="g-col-12">
                <div className="gray-container">
                    <div className="g-row flex-align-center">
                        <div className="text-left sub-title-txt g-col-3">
                            {t('NOTICE_TYPE')}
                        </div>
                        <div className="g-col-4">
                            <DropdownComp values={noticeTypes} selected={selectedTypes.notice} onChange={(e) => onTypeSelect(e, 'notice')} placeholder='' />
                        </div>
                    </div>
                    {/* <div className="g-row flex-align-center">
                        <div className="text-left sub-title-txt g-col-3">
                            Publicaton Type
                        </div>
                        <div className="g-col-4">
                            <DropdownComp values={publicationTypes} selected={selectedTypes.publication} onChange={(e) => onTypeSelect(e, 'publication')} placeholder='' />
                        </div>
                    </div> */}
                    <div className="g-row flex-align-center">
                        <div className="text-left sub-title-txt g-col-3">
                            {t('REFERENCE')}
                        </div>
                        <div className="g-col-4">
                            <input type="text" onChange={handlereferenceNo} value={referenceNoText} placeholder={t('DOCUMENT_NUMBER')} />
                        </div>
                    </div>
                    <div className="g-row fl flex-align-center ">
                        <div className="text-left sub-title-txt g-col-3">
                            {t('PUBLISHED_DATE')}
                        </div>
                        <div className="g-col-4 m-t-10">
                            <DatePickerInput placeholder={t('FROM_DATE')} value={selectedDates.publishedFrom} onChange={(date) => onChangeDates(date, 'publishedFrom')} isClearable={true} />
                        </div>
                        <div className="g-col-4 m-t-10">
                            <DatePickerInput placeholder={t('TO_DATE')} value={selectedDates.publishedTo} onChange={(date) => onChangeDates(date, 'publishedTo')} isClearable={true} />
                        </div>
                    </div>
                    <div className="g-row fl flex-align-center">
                        <div className="text-left sub-title-txt g-col-3">
                            {t('EXPIRY_DATE')}
                        </div>
                        <div className="g-col-4 m-t-10">
                            <DatePickerInput placeholder={t('FROM_DATE')} value={selectedDates.expiryFrom} onChange={(date) => onChangeDates(date, 'expiryFrom')} isClearable={true} />
                        </div>
                        <div className="g-col-4 m-t-10">
                            <DatePickerInput placeholder={t('TO_DATE')} value={selectedDates.expiryTo} onChange={(date) => onChangeDates(date, 'expiryTo')} isClearable={true} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={loading ? 'loading-overlay' : ''}>
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
                                    <input type="text" onChange={handleSearch} value={searchText} placeholder={t('SEARCH_BY_PRODUCT_OR_SERVICE')} />
                                </div>
                                <div className="g-col-2 g-row hover-hand">
                                    <span className="fl g-col-6 m-r-10">English </span>
                                    <span className="fl g-col-3"><img src={gb_flag} className="flag-image fl m-r-5" /></span>
                                    <i className="g-col-1 icon-arrow-down fl" />
                                </div>
                            </div>
                            <h4>{t('NARROW_DOWN_YOUR_SEARCH')}</h4>
                            {getSource()}
                            {getMarketCriteria()}
                            {getCPVCriteria()}
                            {typesCriteria()}
                        </form>
                    </div>
                </div>
                :
                < i className="icon-circle-arrow-r2 search-colaps-icon close-pane hover-hand" onClick={() => setSearchCriteriaVisible(prev => !prev)} />
            }
            <div style={{ height: '100%', paddingBottom: 10 }}>
                <div className={searchCriteriaVisible ? "page-container collapsed-table-container g-col-6" : "page-container expanded-table-container"} >
                    {!searchCriteriaVisible &&
                        <div className="g-row m-t-20 p-t-20 fr">
                            <div className="g-col-1"><i className="icon-tender-new green" />{t('NEW')}</div>
                            <div className="g-col-2"><i className="icon-tender-open blue-dark" />{t('OPEN_FOR_CONSIDERATION')}</div>
                            <div className="g-col-3"><i className="icon-tender-proposal blue-purple" />{t('DECIDED_TO_REPLY_WITH_PROPOSAL')}</div>
                            <div className="g-col-2"><i className="icon-tender-not-relevant" />{t('NOT_RELEVANT')}</div>
                            <div className="g-col-1"><i className="icon-tender-closed red" />{t('CLOSED')}</div>
                        </div>
                    }
                    <div className="g-row flex-align-center p-t-20">
                        <div className="text-left g-col-1">
                            {t('SORT_BY')}
                        </div>
                        <div className="g-col-4">
                            <DropdownComp values={sortByTypes} selected={sortBy} onChange={onSortBySelect} placeholder='' />
                        </div>
                    </div>
                    <div className={searchCriteriaVisible ? 'collapsed-table-width' : 'expanded-table-width'}>
                        <Table
                            rowKey={(record) => record.id}
                            dataSource={tendersData}
                            columns={tableHeaders}
                            pagination={false}
                            scroll={{
                                x: '43vw',
                                y: '45vh',
                            }}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => onClickTender(record),
                                };
                            }}
                        />
                    </div>
                    <div className="action-bar">
                        <div className="g-row">
                            {searchCriteriaVisible &&
                                <div className="g-col-6">
                                    <button className="primary-btn m-t-15" onClick={onShowResults} >{t('SHOW_RESULT')}</button>
                                </div>
                            }
                            <div className={searchCriteriaVisible ? "g-col-6" : ""}>
                                <div className="flex-center-middle">
                                    <Pagination size="small" className="fr m-t-20 m-b-20" current={pageNumber} onChange={onPageChange} total={pageCount} showSizeChanger={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalTenderSearch;