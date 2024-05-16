import React from "react";
import { formatDate, getDateDiff, getCountryFlag, projectCodeFormat } from "../utils"
import { Badge, Tooltip, Switch } from "antd";
import logo_thumb from "../assets/images/logo_thumb.png";

const t = (text) => text;

export const projectScreenTableHeaders = (t) => [
    {
        title: t('PROJECT_CODE'),
        dataIndex: 'Id',
        render: (_, { Id }) => (
            projectCodeFormat(Id)
        ),

    },
    {
        title: t('NAME'),
        dataIndex: 'Name',
    },
    // {
    //     title: 'Company ID',
    //     dataIndex: 'compId',
    //     render: (_, record) => (
    //         '9732154'
    //     ),
    // },
    {
        title: t('OPERATION_TYPE'),
        dataIndex: 'TypeCode',
    },
    {
        title: t('FROM_DATE'),
        dataIndex: 'FromDate',
        sorter: (a, b) => {
            if (getDateDiff(a.FromDate, b.FromDate) > 0)
                return 1
            else
                return -1
        },
        render: (_, { FromDate }) => (
            formatDate(FromDate)
        ),
    },
    {
        title: t('DUE_DATE'),
        dataIndex: 'ToDate',
        sorter: (a, b) => {
            if (getDateDiff(a.ToDate, b.ToDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { ToDate }) => (
            formatDate(ToDate)
        ),
    },
    {
        title: t('CLOSED_DATE'),
        dataIndex: 'ClosedDate',
        sorter: (a, b) => {
            if (getDateDiff(a.ClosedDate, b.ClosedDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { ClosedDate }) => (
            formatDate(ClosedDate)
        ),
    },
    {
        title: t('RESPONSIBLE'),
        dataIndex: 'Responsible',
    },
    {
        title: t('STATUS'),
        dataIndex: 'Status',
        render: (_, { Status }) => (
            <Badge status={Status?.toUpperCase() === 'OPEN' ? "success" : "default"} text={Status?.toUpperCase() === 'OPEN' ? t('OPEN') : t('CLOSE')} />
        )
    },
];

export const sectionTableHeaders = (t) => [
    {
        title: t('NAME'),
        dataIndex: 'Name',
    },
    {
        title: t('DESCRIPTION'),
        dataIndex: 'Description',

    },
    {
        title: t('PURPOSE'),
        dataIndex: 'Purpose',
    },
    {
        title: t('FROM_DATE'),
        dataIndex: 'FromDate',
        sorter: (a, b) => {
            if (getDateDiff(a.FromDate, b.FromDate) > 0)
                return 1
            else
                return -1
        },
        render: (_, { FromDate }) => (
            formatDate(FromDate)
        ),
    },
    {
        title: t('TO_DATE'),
        dataIndex: 'ToDate',
        sorter: (a, b) => {
            if (getDateDiff(a.ToDate, b.ToDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { ToDate }) => (
            formatDate(ToDate)
        ),
    },
    {
        title: t('STATUS'),
        dataIndex: 'Status',
        render: (_, { Status }) => (
            <Badge status={Status?.toUpperCase() === 'OPEN' ? "success" : "default"} text={Status?.toUpperCase() === 'OPEN' ? t('OPEN') : t('CLOSE')} />
        )
    },
    {
        title: t('CLOSED_DATE'),
        dataIndex: 'ClosedDate',
        sorter: (a, b) => {
            if (getDateDiff(a.ClosedDate, b.ClosedDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { ClosedDate }) => (
            formatDate(ClosedDate)
        ),
    },
];

export const membersTableHeaders = (t) => [
    // {
    //     title: 'User ID',
    //     dataIndex: 'id',
    // },
    {
        title: '',
        render: (_) => (
            <img src={logo_thumb} className="logo-thumb" alt="img" />
        )
    },
    {
        title: t('NAME'),
        dataIndex: 'Name',
    },
    {
        title: t('EMAIL'),
        dataIndex: 'Email',
    },
    {
        title: t('ASSIGNED_DATE'),
        dataIndex: 'FromDate',
        sorter: (a, b) => {
            if (getDateDiff(a.FromDate, b.FromDate) > 0)
                return 1
            else
                return -1
        },
        render: (_, { FromDate }) => (
            formatDate(FromDate)
        ),
    },
    {
        title: t('LAST_DATE'),
        dataIndex: 'ToDate',
        sorter: (a, b) => {
            if (getDateDiff(a.ToDate, b.ToDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { ToDate }) => (
            formatDate(ToDate)
        ),
    },

    {
        title: t('STATUS'),
        dataIndex: 'Status',
        render: (_, { Status }) => (
            <Badge status={Status === 'active' || Status === 'Open' ? "success" : "default"} text={Status === 'active' || Status === 'Open' ? t('OPEN') : t('CLOSE')} />
        )
    },
];

export const searchResultsTableHeaders = (t) => [
    {
        title: t('DATE'),
        dataIndex: 'createdDate',
        render: (_, { createdDate }) => (
            formatDate(createdDate)
        )
    },
    {
        title: <div className="g-row">
            <div className="g-col-4">{t('SEARCH_CRITERIA')}</div>
            <div className="g-col-4">{t('CRITERIA_CODES')}</div>
            <div className="g-col-4">{t('CRITERIA_NAME')}</div>
        </div>,
        dataIndex: ['searchFilter', 'removeCriteria', 'parentSearchId'],
        render: (_, { searchFilter, removeCriteria, parentSearchId }) => (
            <>
                {
                    (searchFilter.countries.length > 0 || removeCriteria?.countries?.length > 0) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className={searchFilter.countries.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >Country</div>
                        <div className="g-col-8">
                            {searchFilter._countries?.map((country, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{country.code}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{country.name}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?._countries?.map((country, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{country.code}</div>
                                        <div className="red g-col-6" >{country.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    (searchFilter.regions.length > 0 || removeCriteria?.regions?.length > 0) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className={searchFilter.regions.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >{t('REGION')}</div>
                        <div className="g-col-8">
                            {searchFilter._regions?.map((region, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{region.code}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{region.name}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.regions?.map((region, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{region.name}</div>
                                        <div className="red g-col-6" >{region.code}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    (searchFilter.cities.length > 0 || removeCriteria?.cities?.length > 0) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className={searchFilter.cities.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >{t('CITY')}</div>
                        <div className="g-col-8">
                            {searchFilter._cities?.map((city, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{city.code}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{city.name}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?._cities?.map((city, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{city.code}</div>
                                        <div className="red g-col-6" >{city.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    (searchFilter.municipalities.length > 0 || removeCriteria?.municipalities?.length > 0) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className={searchFilter.municipalities.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >{t('MUNICIPALITY')}</div>
                        <div className="g-col-8">
                            {searchFilter._municipalities?.map((municipality, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{municipality.code}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{municipality.name}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.municipalities?.map((municipality, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{municipality.code}</div>
                                        <div className="red g-col-6" >{municipality.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    (searchFilter.cpvs.length > 0 || removeCriteria?.cpvs?.length > 0) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className={searchFilter.cpvs.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >CPV</div>
                        <div className="g-col-8">
                            {searchFilter._cpvs?.map((cpv, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{cpv.code}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{cpv.name}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?._cpvs?.map((cpv, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{cpv.code}</div>
                                        <div className="red g-col-6" >{cpv.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    (searchFilter.naces.length > 0 || removeCriteria?.naces?.length > 0) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className={searchFilter.naces.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >NACE</div>
                        <div className="g-col-8">
                            {searchFilter._naces?.map((nace, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{nace.code}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{nace.name}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?._naces?.map((nace, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{nace.code}</div>
                                        <div className="red g-col-6" >{nace.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    (searchFilter.unspscs.length > 0 || removeCriteria?.unspscs?.length > 0) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className={searchFilter.unspscs.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >UNSPSC</div>
                        <div className="g-col-8">
                            {searchFilter._unspscs?.map((unspsc, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{unspsc.code}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{unspsc.name}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?._unspscs?.map((unspsc, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{unspsc.code}</div>
                                        <div className="red g-col-6" >{unspsc.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    (searchFilter.peppol.length > 0 || removeCriteria?.peppol?.length > 0) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className={searchFilter.peppol.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >Peppol</div>
                        <div className="g-col-8">
                            {searchFilter.peppol.map((pep, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} ></div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{pep}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.peppol?.map((pep, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" ></div>
                                        <div className="red g-col-6" >{pep}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    (searchFilter?.sectorCode || removeCriteria?.sectorCode ||
                        searchFilter?.active ||
                        searchFilter?.registrationDateFrom || removeCriteria?.registrationDateFrom ||
                        searchFilter?.registrationDateTo || removeCriteria?.registrationDateTo ||
                        searchFilter?.inCorporationDateFrom || removeCriteria?.inCorporationDateFrom ||
                        searchFilter?.inCorporationDateTo || removeCriteria?.inCorporationDateTo ||
                        searchFilter?.noOfEmployeesFrom || removeCriteria?.noOfEmployeesFrom ||
                        searchFilter?.noOfEmployeesTo || removeCriteria?.noOfEmployeesTo ||
                        searchFilter?.organizationTypeCode || removeCriteria?.organizationTypeCode ||
                        searchFilter?.organizationId || removeCriteria?.organizationId) &&
                    <div className="g-row m-b-5 table-separate">
                        <div className="blue g-col-4" >{t('COMPANY_INFO')}</div>
                        <div className="g-col-8">
                            {searchFilter?.sectorCode &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.sectorCode}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('SECTOR_CODE')}</div>
                                </div>
                            }
                            {removeCriteria?.sectorCode &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.sectorCode}</div>
                                    <div className="red g-col-6" >{t('SECTOR_CODE')}</div>
                                </div>
                            }

                            {searchFilter?.active &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.active}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('STATUS')}</div>
                                </div>
                            }

                            {searchFilter?.registrationDateFrom &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.registrationDateFrom}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('REGISTRATION_DATE_FROM')}</div>
                                </div>
                            }
                            {removeCriteria?.registrationDateFrom &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.registrationDateFrom}</div>
                                    <div className="red g-col-6" >{t('REGISTRATION_DATE_FROM')}</div>
                                </div>
                            }

                            {searchFilter?.registrationDateTo &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.registrationDateTo}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('REGISTRATION_DATE_TO')}</div>
                                </div>
                            }
                            {removeCriteria?.registrationDateTo &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.registrationDateTo}</div>
                                    <div className="red g-col-6" >{t('REGISTRATION_DATE_TO')}</div>
                                </div>
                            }

                            {searchFilter?.inCorporationDateFrom &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.inCorporationDateFrom}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('INCORPORATION_DATE_FROM')}</div>
                                </div>
                            }
                            {removeCriteria?.inCorporationDateFrom &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.inCorporationDateFrom}</div>
                                    <div className="red g-col-6" >{t('INCORPORATION_DATE_FROM')}</div>
                                </div>
                            }

                            {searchFilter?.inCorporationDateTo &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.inCorporationDateTo}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('INCORPORATION_DATE_TO')}</div>
                                </div>
                            }
                            {removeCriteria?.inCorporationDateTo &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.inCorporationDateTo}</div>
                                    <div className="red g-col-6" >{t('INCORPORATION_DATE_TO')}</div>
                                </div>
                            }

                            {searchFilter?.noOfEmployeesFrom &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.noOfEmployeesFrom}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('NUMBER_OF_EMPLOYEES_FROM')}</div>
                                </div>
                            }
                            {removeCriteria?.noOfEmployeesFrom &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.noOfEmployeesFrom}</div>
                                    <div className="red g-col-6" >{t('NUMBER_OF_EMPLOYEES_FROM')}</div>
                                </div>
                            }

                            {searchFilter?.noOfEmployeesTo &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.noOfEmployeesTo}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('NUMBER_OF_EMPLOYEES_TO')}</div>
                                </div>
                            }
                            {removeCriteria?.noOfEmployeesTo &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.noOfEmployeesTo}</div>
                                    <div className="red g-col-6" >{t('NUMBER_OF_EMPLOYEES_TO')}</div>
                                </div>
                            }

                            {searchFilter?.organizationTypeCode &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.organizationTypeCode}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('ORGANIZATION_TYPE')}</div>
                                </div>
                            }
                            {removeCriteria?.organizationTypeCode &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.organizationTypeCode}</div>
                                    <div className="red g-col-6" >{t('ORGANIZATION_TYPE')}</div>
                                </div>
                            }

                            {searchFilter?.organizationId &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.organizationId}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{t('ORGANIZATION_ID')}</div>
                                </div>
                            }
                            {removeCriteria?.organizationId &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.organizationId}</div>
                                    <div className="red g-col-6" >{t('ORGANIZATION_ID')}</div>
                                </div>
                            }

                        </div>
                    </div>
                }
                {removeCriteria?.organizationIds?.length > 0 &&
                    <div>
                        <div className="red g-col-6" >{`Removed organization count: ${removeCriteria.organizationIds.length}`}</div>
                    </div>
                }
            </>
        )
    },
    // {
    //     title: '#',
    //     dataIndex: 'results',
    //     render: (_, { results }) => (
    //         results.length
    //     ),
    // },
    // {
    //     title: 'Companies',
    //     dataIndex: 'results',
    //     render: (_, { results }) => (
    //         <>
    //             {results.map((result, index) => {
    //                 if (index < 5)
    //                     return (
    //                         <>
    //                             {result.organizationName} <br />
    //                         </>
    //                     )
    //             })}
    //             {results.length > 5 &&
    //                 <i className="icon-more blue m-l-20 p-l-20"></i>
    //             }
    //         </>
    //     ),
    // },
];

export const searchResultsListTableHeaders = (t) => [
    {
        title: t('COMPANY_NAME'),
        dataIndex: 'organizationName',
    },
    {
        title: t('ORGANIZATION_ID'),
        dataIndex: 'organizationId',
    },
    {
        title: t('COUNTRY'),
        dataIndex: 'businessAddr',
        render: (_, { businessAddr }) => (
            businessAddr?.businessCountry
        ),
    },
    {
        title: t('CITY'),
        dataIndex: 'businessAddr',
        render: (_, { businessAddr }) => (
            businessAddr?.city
        ),
    },
];

export const matchinTendersTableHeaders = (t) => [
    {
        title: t('DOCUMENT_NUMBER'),
        dataIndex: 'noticeNumber',
        width: 130,
        sorter: (a, b) => a?.noticeNumber?.split("_")[0] - b?.noticeNumber?.split("_")[0],
        defaultSortOrder: 'ascend',
    },
    {
        title: t('BUYER_TITLE'),
        dataIndex: 'buyerTitle',
    },
    {
        title: t('BUYER_SHORT_DESCRIPTION'),
        dataIndex: 'buyerShortDescription',
        ellipsis: {
            showTitle: false,
        },
        render: (buyerShortDescription) => (
            <Tooltip placement="topLeft" title={buyerShortDescription}>
                {buyerShortDescription}
            </Tooltip>
        ),
    },
    {
        title: t('PUBLICATION_DATE'),
        dataIndex: 'publicationDate',
        sorter: (a, b) => {
            if (getDateDiff(a.publicationDate, b.publicationDate) > 0)
                return 1
            else
                return -1
        },
        width: 130,
    },
    {
        title: t('DEADLINE'),
        dataIndex: 'deletionDate',
        sorter: (a, b) => {
            if (getDateDiff(a.deletionDate, b.deletionDate) > 0)
                return 1
            else
                return -1
        },
        width: 130,
    },
    {
        title: t('CPV_NAME'),
        dataIndex: 'cpv',
        render: (_, { cpv }) => (
            cpv[0]?.desscription
        ),
    },
    {
        title: t('PUBLISHED_BY_BUYER_NAME'),
        dataIndex: 'buyerDetails',
        render: (_, { buyerDetails }) => (
            buyerDetails?.name
        ),
    },
    {
        title: t('COUNTRY'),
        dataIndex: ['countryName', 'countryCode'],
        render: (_, { countryName, countryCode }) => (
            <div>
                <img src={getCountryFlag(countryCode)} className="flag-image fl m-r-5" />
                {countryName}
            </div>
        ),
        width: 160,
    },
    {
        title: `${t('MUNICIPALITY')} / ${t('CITY')}'`,
        dataIndex: 'buyerDetails',
        render: (_, { buyerDetails }) => (
            buyerDetails?.city
        ),
    },
    {
        title: t('SERVICE_PROVIDER'),
        dataIndex: 'serviceProvider',
    },
    {
        title: t('STATUS'),
        dataIndex: 'noticeStatus',
    },
];

export const searchTendersTableHeaders = (t) => [
    {
        title: t('DOCUMENT_NUMBER'),
        dataIndex: 'noticeNumber',
        width: 130,
        fixed: 'left',
    },
    {
        title: t('BUYER_TITLE'),
        dataIndex: 'buyerTitle',
        width: 200,
    },
    {
        title: t('BUYER_SHORT_DESCRIPTION'),
        dataIndex: 'buyerShortDescription',
        ellipsis: {
            showTitle: false,
        },
        width: 130,
        render: (buyerShortDescription) => (
            <Tooltip placement="topLeft" title={buyerShortDescription}>
                {buyerShortDescription}
            </Tooltip>
        ),
    },
    {
        title: t('PUBLICATION_DATE'),
        dataIndex: 'publicationDate',
        width: 120,
    },
    {
        title: t('DEADLINE'),
        dataIndex: 'deletionDate',
        width: 120,
    },
    {
        title: t('CPV_NAME'),
        dataIndex: 'cpv',
        width: 130,
        render: (_, { cpv }) => (
            cpv[0]?.desscription
        ),
    },
    {
        title: t('STATUS'),
        dataIndex: 'noticeStatus',
        width: 100,
    },
];

export const searchTendersTableHeadersExpanded = (t) => [
    {
        title: t('DOCUMENT_NUMBER'),
        dataIndex: 'noticeNumber',
        fixed: 'left',
        width: 130,
    },
    {
        title: t('BUYER_TITLE'),
        dataIndex: 'buyerTitle',
        width: 180,
    },
    {
        title: t('BUYER_SHORT_DESCRIPTION'),
        dataIndex: 'buyerShortDescription',
        width: 130,
        ellipsis: {
            showTitle: false,
        },
        render: (buyerShortDescription) => (
            <Tooltip placement="topLeft" title={buyerShortDescription}>
                {buyerShortDescription}
            </Tooltip>
        ),
    },
    {
        title: t('PUBLICATION_DATE'),
        dataIndex: 'publicationDate',
        width: 120,
    },
    {
        title: t('DEADLINE'),
        dataIndex: 'deletionDate',
        width: 120,
    },
    {
        title: t('CPV_NAME'),
        dataIndex: 'cpv',
        width: 130,
        render: (_, { cpv }) => (
            cpv[0]?.desscription
        ),
    },
    {
        title: t('PUBLISHED_BY_BUYER_NAME'),
        dataIndex: 'buyerDetails',
        width: 150,
        render: (_, { buyerDetails }) => (
            buyerDetails?.name
        ),
    },
    {
        title: t('COUNTRY'),
        dataIndex: ['countryName', 'countryCode'],
        render: (_, { countryName, countryCode }) => (
            <div>
                <img src={getCountryFlag(countryCode)} className="flag-image fl m-r-5" />
                {countryName}
            </div>
        ),
        width: 160,
    },
    {
        itle: `${t('MUNICIPALITY')} / ${t('CITY')}'`,
        dataIndex: 'buyerDetails',
        render: (_, { buyerDetails }) => (
            buyerDetails?.city
        ),
        width: 100,
    },
    {
        title: t('SERVICE_PROVIDER'),
        dataIndex: 'serviceProvider',
        width: 90,
    },
    {
        title: t('STATUS'),
        dataIndex: 'noticeStatus',
        width: 80,
    },
];

export const usersTableHeaders = (t) => [
    {
        title: t('USER_ID'),
        dataIndex: 'UserId',
        fixed: 'left',
        width: 100,
    },
    {
        title: t('TITLE'),
        dataIndex: 'TitleName',
        width: 60,
    },
    {
        title: t('USER_NAME'),
        dataIndex: 'UserName',
        width: 170,
    },
    {
        title: t('FIRST_NAME'),
        dataIndex: 'FirstName',
        width: 110,
    },
    {
        title: t('LAST_NAME'),
        dataIndex: 'LastName',
        width: 110,
    },
    {
        title: t('COUNTRY'),
        dataIndex: 'CountryName',
        width: 100,
    },
    {
        title: t('EMAIL'),
        dataIndex: 'Email',
        width: 170,
    },
    {
        title: t('PHONE'),
        width: 135,
        dataIndex: 'PhoneNumber',
    },
    {
        title: t('ASSIGNED_COMPANIES'),
        dataIndex: 'Companies',
        width: 200,
        ellipsis: {
            showTitle: false,
        },
        render: (Companies) => (
            <Tooltip placement="topLeft" title={Companies?.map(item => { return item?.Value + ', ' })}>
                {Companies?.map(item => { return item?.Value + ', ' })}
            </Tooltip>
        ),
    },
    {
        title: t('ASSIGNED_ROLES'),
        dataIndex: 'Roles',
        width: 150,
        ellipsis: {
            showTitle: false,
        },
        render: (Roles) => (
            <Tooltip placement="topLeft" title={Roles?.map((item, index) => { return ((index !== 0 ? ', ' : '') + item?.Value) })}>
                {Roles?.map((item, index) => { return ((index !== 0 ? ', ' : '') + item?.Value) })}
            </Tooltip>
        ),
    },
    {
        title: t('CULTURE_ID'),
        dataIndex: 'CultureCode',
        width: 110,
    },
    {
        title: t('STATUS'),
        dataIndex: 'IsActive',
        width: 100,
        fixed: 'right',
        render: (IsActive) => (
            <>
                {IsActive ?
                    <div>
                        <a style={{ color: 'green' }}>&#x25CF;</a> {t('ACTIVE')}
                    </div> :
                    <div>
                        <a className="grey">&#x25CF;</a> {t('INACTIVE')}
                    </div>
                }
            </>
        ),
    },
]

export const TemplateTableHeaders = (t) => [
    {
        title: t('ID'),
        dataIndex: 'Id',
    },
    {
        title: t('NAME'),
        dataIndex: 'DisplayName',
    },
    {
        title: t('DATE_CREATED'),
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        )
    },
    {
        title: t('DEFAULT_LANGUAGE'),
        dataIndex: 'LanguageMessageTemplates',
    },
    {
        title: t('TRIGGER_POINT'),
        dataIndex: 'MessageTriggerPoint',
        render: (_, { MessageTriggerPoint }) => (
            MessageTriggerPoint?.DisplayName
        ),
    },
    {
        title: t('MESSAGE_MEDIUM'),
        dataIndex: 'MessageMedium',
    },
]

export const CommunicationsLogTableHeaders = (t) => [
    {
        title: t('COMMUNICATION_ID'),
        dataIndex: 'Id',
        width: 100
    },
    {
        title: t('TYPE'),
        dataIndex: 'MessageTemplate',
        render: (_, { MessageTemplate }) => (
            MessageTemplate?.MessageMedium?.Name
        ),
        width: 100
    },
    {
        title: t('FROM'),
        dataIndex: 'From',
        width: 250
    },
    {
        title: t('TO'),
        dataIndex: 'To',
        sorter: true,
        width: 250
    },
    {
        title: t('DATE'),
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        ),
        sorter: (a, b) => {
            if (getDateDiff(a.CreatedDateTime, b.CreatedDateTime) > 0)
                return 1
            else
                return -1
        },
        width: 150
    },
    {
        title: t('DESCRIPTION'),
        dataIndex: 'MessageSubject',
        width: 170
    },
    {
        title: t('NOTIFICATION_TYPE'),
        dataIndex: 'MessageType',
        render: (_, { MessageType }) => (
            MessageType?.Name
        ),
        width: 170
    },
    {
        title: t('WORKFLOW_STATUS'),
        dataIndex: 'WorkflowStatus',
        render: (_, { WorkflowStatus }) => (
            WorkflowStatus?.Name
        ),
        width: 100
    },
    {
        title: t('DISTRIBUTION_STATUS'),
        dataIndex: 'MessageStatus',
        render: (_, { MessageStatus }) => (
            MessageStatus?.Name
        ),
        sorter: true,
        width: 100
    },
]

export const CommunicationsSubTableHeaders = (t) => [
    {
        title: t('DATE'),
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        ),
        width: 150
    },
    {
        title: t('DESCRIPTION'),
        dataIndex: 'MessageSubject',
        width: 170
    },
    {
        title: t('NOTIFICATION_TYPE'),
        dataIndex: 'MessageType',
        render: (_, { MessageType }) => (
            MessageType?.Name
        ),
        width: 170
    },
    {
        title: t('WORKFLOW_STATUS'),
        dataIndex: 'Response',
        width: 100
    },
    {
        title: t('DISTRIBUTION_STATUS'),
        dataIndex: 'MessageStatus',
        render: (_, { MessageStatus }) => (
            MessageStatus?.Name
        ),
        width: 100
    },
]

export const CommunicationsTableHeaders = (t) => [
    {
        title: t('MESSAGE_ID'),
        dataIndex: 'Id',
        sorter: (a, b) => a.Id - b.Id,
    },
    {
        title: t('SUBJECT'),
        dataIndex: 'MessageSubject',
    },
    {
        title: t('TO'),
        dataIndex: 'To',
        sorter: true,
    },
    {
        title: t('DATE'),
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        ),
        sorter: (a, b) => {
            if (getDateDiff(a.CreatedDateTime, b.CreatedDateTime) > 0)
                return 1
            else
                return -1
        },
    },
    {
        title: t('MESSAGE_TYPE'),
        dataIndex: 'MessageType',
        render: (_, { MessageType }) => (
            MessageType?.Name
        ),
        sorter: true,
    },
    {
        title: t('EMAIL'),
        dataIndex: 'FromName',
    },
    {
        title: t('MESSAGE_METHOD'),
        dataIndex: 'MessageTemplate',
        render: (_, { MessageTemplate }) => (
            MessageTemplate?.MessageMedium?.Name
        ),
        sorter: true,
    },
    {
        title: t('STATUS'),
        dataIndex: 'WorkflowStatus',
        render: (_, { WorkflowStatus }) => (
            WorkflowStatus?.Name
        ),
    },
]

export const CommunicationBasketsTableHeaders = (t) => [
    {
        title: t('BASKET_ID'),
        dataIndex: 'Id',
    },
    {
        title: t('BASKET_NAME'),
        dataIndex: 'Name',
        sorter: true,
    },
    {
        title: t('CREATED_DATE'),
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        ),
        sorter: (a, b) => {
            if (getDateDiff(a.CreatedDateTime, b.CreatedDateTime) > 0)
                return 1
            else
                return -1
        },
    },
    {
        title: t('COMMUNICATION_TYPE'),
        dataIndex: 'CommunicationType',
        render: (_, { CommunicationType }) => (
            CommunicationType?.Name
        ),
    },
    {
        title: t('BASKET_TYPE'),
        dataIndex: 'BasketType',
        render: (_, { BasketType }) => (
            BasketType?.Name
        ),
    },
    {
        title: t('START_DATE'),
        dataIndex: 'FromDateTime',
        render: (_, { FromDateTime }) => (
            formatDate(FromDateTime)
        ),
    },
    {
        title: t('END_DATE'),
        dataIndex: 'ToDateTime',
        render: (_, { ToDateTime }) => (
            formatDate(ToDateTime)
        ),
    },
    {
        title: 'Sent Date (Last)',
        dataIndex: 'LastRunDateTime',
        render: (_, { LastRunDateTime }) => (
            formatDate(LastRunDateTime)
        ),
        sorter: true,
    },
    {
        title: t('STATUS'),
        dataIndex: 'BasketStatus',
        render: (_, { BasketStatus }) => (
            BasketStatus?.Name
        ),
        sorter: true,
    },
]

export const ReceversCompaniesTableHeaders = (t) => [
    {
        title: t('COMPANY'),
        children: [
            {
                title: t('ORGANIZATION_ID'),
                dataIndex: 'Company',
                render: (_, { Company }) => (
                    Company?.CompanyId
                ),
            },
            {
                title: t('NAME'),
                dataIndex: 'Company',
                render: (_, { Company }) => (
                    Company?.Name
                ),
            },
            {
                title: t('COUNTRY'),
                dataIndex: 'Company',
                render: (_, { Company }) => (
                    Company?.CountryTName
                ),
            },
        ]
    }
]

export const ReceversCompaniesSubTableHeaders = (t) => [
    {
        title: t('USERS'),
        children: [
            {
                title: t('ID'),
                dataIndex: 'Person',
                render: (_, { Person }) => (
                    Person?.Id
                ),
                width: 120
            },
            {
                title: t('FIRST_NAME'),
                dataIndex: 'Person',
                render: (_, { Person }) => (
                    Person?.FirstName
                ),
                width: 200
            },
            {
                title: t('LAST_NAME'),
                dataIndex: 'Person',
                render: (_, { Person }) => (
                    Person?.LastName
                ),
                width: 200
            },
            {
                title: t('TITLE'),
                dataIndex: 'Person',
                render: (_, { Person }) => (
                    Person?.TitleTName
                ),
                width: 100
            },
        ]
    }
]

export const ReceversPersonsTableHeaders = (t) => [
    {
        title: t('ID'),
        dataIndex: 'Person',
        render: (_, { Person }) => (
            Person?.Id
        ),
        width: 120
    },
    {
        title: t('FIRST_NAME'),
        dataIndex: 'Person',
        render: (_, { Person }) => (
            Person?.FirstName
        ),
    },
    {
        title: t('LAST_NAME'),
        dataIndex: 'Person',
        render: (_, { Person }) => (
            Person?.LastName
        ),
    },
    {
        title: t("TITLE"),
        dataIndex: 'Person',
        render: (_, { Person }) => (
            Person?.TitleTName
        ),
    },
    {
        title: t('COUNTRY'),
        dataIndex: 'Person',
        render: (_, { Person }) => (
            Person?.CountryTName
        ),
    },
]

export const ReceversPersonsTableExpandedHeaders = (t) => [
    {
        title: t('ORGANIZATION_ID'),
        dataIndex: 'Company',
        render: (_, { Company }) => (
            Company?.CompanyRegistrationID
        ),
    },
    {
        title: t('NAME'),
        dataIndex: 'Company',
        render: (_, { Company }) => (
            Company?.Name
        ),
    },
    {
        title: t('COUNTRY'),
        dataIndex: 'Company',
        render: (_, { Company }) => (
            Company?.CountryTName
        ),
    },
    {
        title: t('EMAIL'),
        dataIndex: 'Company',
        render: (_, { Company }) => (
            Company?.Email
        ),
    },
    {
        title: t('PHONE'),
        dataIndex: 'Company',
        render: (_, { Company }) => (
            Company?.Phone
        ),
    },
]

export const SavedDiagramsTableHeaders = (t) => [
    {
        title: 'ID',
        dataIndex: 'Id',
        width: 130
    },
    {
        title: 'Drawing/s',
        dataIndex: 'Name',
    },
    {
        title: 'Created Date',
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        ),
    },
]

export const CollectionsTableHeaders = (t) => [
    {
        title: 'ID',
        dataIndex: 'Id',
        width: 130
    },
    {
        title: 'Collection/s',
        dataIndex: 'Name',
    },
    {
        title: 'Created Date',
        dataIndex: 'CreatedDateTime',
        sorter: (a, b) => {
            if (getDateDiff(a.CreatedDateTime, b.CreatedDateTime) > 0)
                return 1
            else
                return -1
        },
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        ),
    },
]

export const ContactPersonsTableHeaders = (t) => [
    {
        title: 'ID',
        dataIndex: 'Id',
        width: 130
    },
    {
        title: 'Name',
        dataIndex: 'Name',
    },
    {
        title: 'Category',
        dataIndex: 'CreatedDateTime',
    },
]

export const SelectedContactPersonsTableHeaders = (t) => [
    {
        title: 'Table Id',
        dataIndex: 'Id',
        width: 130
    },
    {
        title: 'Name',
        dataIndex: 'Name',
    },
    {
        title: 'Show',
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            <div className="toggle-btn">
                <Switch />
            </div>
        ),
    },
    {
        title: 'API Source Code Name',
        dataIndex: 'Name',
    },
    {
        title: 'DB',
        dataIndex: 'Name',
    },
]

export const SurveyTableHeaders = [
    {
        title: 'Survey Id',
        dataIndex: 'Id',
        width: 130
    },
    {
        title: 'Name',
        dataIndex: 'Name',
    },
    {
        title: 'Description',
        dataIndex: 'CreatedDateTime',
    },
    {
        title: 'Start Date',
        dataIndex: 'Name',
    },
    {
        title: 'End Date',
        dataIndex: 'Name',
    },
]
