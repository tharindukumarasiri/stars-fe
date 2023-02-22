import React from "react";
import { formatDate, getDateDiff, getCountryFlag, projectCodeFormat } from "../utils"
import { Badge, Tooltip } from "antd";
import logo_thumb from "../assets/images/logo_thumb.png"

export const projectScreenTableHeaders = [
    {
        title: 'Project Code',
        dataIndex: 'Id',
             render: (_, { Id }) => (
                projectCodeFormat(Id)
        ),
        
    },
    {
        title: 'Name',
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
        title: 'OperationType',
        dataIndex: 'TypeCode',
    },
    {
        title: 'From Date',
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
        title: 'Due Date',
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
        title: 'Closed Date',
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
        title: 'Responsible',
        dataIndex: 'Responsible',
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        render: (_, { Status }) => (
            <Badge status={Status?.toUpperCase() === 'OPEN' ? "success" : "default"} text={Status?.toUpperCase() === 'OPEN' ? "Open" : "Close"} />
        )
    },
];

export const sectionTableHeaders = [
    {
        title: 'Name',
        dataIndex: 'Name',
    },
    {
        title: 'Desription',
        dataIndex: 'Description',

    },
    {
        title: 'Purpose',
        dataIndex: 'Purpose',
    },
    {
        title: 'From Date',
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
        title: 'To Date',
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
        title: 'Status',
        dataIndex: 'Status',
        render: (_, { Status }) => (
            <Badge status={Status?.toUpperCase() === 'OPEN' ? "success" : "default"} text={Status?.toUpperCase() === 'OPEN' ? "Open" : "Close"} />
        )
    },
    {
        title: 'Closed Date',
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

export const membersTableHeaders = [
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
        title: 'Name',
        dataIndex: 'Name',
    },
    {
        title: 'Email',
        dataIndex: 'Email',
    },
    {
        title: 'Assigned Date',
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
        title: 'Last Date',
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
        title: 'Status',
        dataIndex: 'Status',
        render: (_, { Status }) => (
            <Badge status={Status === 'active' || Status === 'Open' ? "success" : "default"} text={Status === 'active' || Status === 'Open' ? "Open" : "Close"} />
        )
    },
];

export const searchResultsTableHeaders = [
    {
        title: 'Date',
        dataIndex: 'createdDate',
        render: (_, { createdDate }) => (
            formatDate(createdDate)
        )
    },
    {
        title: <div className="g-row">
            <div className="g-col-4">Search Criteria</div>
            <div className="g-col-4">Criteria Codes</div>
            <div className="g-col-4">Criteria Name</div>
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
                        <div className={searchFilter.regions.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >Region</div>
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
                        <div className={searchFilter.cities.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >City</div>
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
                        <div className={searchFilter.municipalities.length === 0 || parentSearchId ? "red g-col-4" : "blue g-col-4"} >Municipality</div>
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
                        <div className="blue g-col-4" >Company Info</div>
                        <div className="g-col-8">
                            {searchFilter?.sectorCode &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.sectorCode}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >Sector code</div>
                                </div>
                            }
                            {removeCriteria?.sectorCode &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.sectorCode}</div>
                                    <div className="red g-col-6" >Sector code</div>
                                </div>
                            }

                            {searchFilter?.active &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.active}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >Active</div>
                                </div>
                            }

                            {searchFilter?.registrationDateFrom &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.registrationDateFrom}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >Registration Date From</div>
                                </div>
                            }
                            {removeCriteria?.registrationDateFrom &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.registrationDateFrom}</div>
                                    <div className="red g-col-6" >Registration Date From</div>
                                </div>
                            }

                            {searchFilter?.registrationDateTo &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.registrationDateTo}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >Registration Date TO</div>
                                </div>
                            }
                            {removeCriteria?.registrationDateTo &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.registrationDateTo}</div>
                                    <div className="red g-col-6" >Registration Date To</div>
                                </div>
                            }

                            {searchFilter?.inCorporationDateFrom &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.inCorporationDateFrom}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >inCorporation Date From</div>
                                </div>
                            }
                            {removeCriteria?.inCorporationDateFrom &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.inCorporationDateFrom}</div>
                                    <div className="red g-col-6" >inCorporation Date From</div>
                                </div>
                            }

                            {searchFilter?.inCorporationDateTo &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.inCorporationDateTo}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >inCorporation Date To</div>
                                </div>
                            }
                            {removeCriteria?.inCorporationDateTo &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.inCorporationDateTo}</div>
                                    <div className="red g-col-6" >inCorporation Date To</div>
                                </div>
                            }

                            {searchFilter?.noOfEmployeesFrom &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.noOfEmployeesFrom}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >Number Of Employees From</div>
                                </div>
                            }
                            {removeCriteria?.noOfEmployeesFrom &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.noOfEmployeesFrom}</div>
                                    <div className="red g-col-6" >Number Of Employees From</div>
                                </div>
                            }

                            {searchFilter?.noOfEmployeesTo &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.noOfEmployeesTo}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >Number Of Employees To</div>
                                </div>
                            }
                            {removeCriteria?.noOfEmployeesTo &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.noOfEmployeesTo}</div>
                                    <div className="red g-col-6" >Number Of Employees To</div>
                                </div>
                            }

                            {searchFilter?.organizationTypeCode &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.organizationTypeCode}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >Organization Type</div>
                                </div>
                            }
                            {removeCriteria?.organizationTypeCode &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.organizationTypeCode}</div>
                                    <div className="red g-col-6" >Organization Type</div>
                                </div>
                            }

                            {searchFilter?.organizationId &&
                                <div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{searchFilter?.organizationId}</div>
                                    <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >Organization Id</div>
                                </div>
                            }
                            {removeCriteria?.organizationId &&
                                <div>
                                    <div className="red g-col-6" >{removeCriteria?.organizationId}</div>
                                    <div className="red g-col-6" >Organization Id</div>
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

export const searchResultsListTableHeaders = [
    {
        title: 'Company Name',
        dataIndex: 'organizationName',
    },
    {
        title: 'Organisation ID',
        dataIndex: 'organizationId',
    },
    {
        title: 'Country',
        dataIndex: 'businessAddr',
        render: (_, { businessAddr }) => (
            businessAddr?.businessCountry
        ),
    },
    {
        title: 'City',
        dataIndex: 'businessAddr',
        render: (_, { businessAddr }) => (
            businessAddr?.city
        ),
    },
];

export const matchinTendersTableHeaders = [
    {
        title: 'Document Number',
        dataIndex: 'noticeNumber',
        width: 130,
        sorter: (a, b) => a?.noticeNumber?.split("_")[0] - b?.noticeNumber?.split("_")[0],
        defaultSortOrder: 'ascend',
    },
    {
        title: 'Buyer Title',
        dataIndex: 'buyerTitle',
    },
    {
        title: 'Buyer short description',
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
        title: 'Publication Date',
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
        title: 'Deadline',
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
        title: 'CPV Name',
        dataIndex: 'cpv',
        render: (_, { cpv }) => (
            cpv[0]?.desscription
        ),
    },
    {
        title: 'Published By \n(Buyer Name)',
        dataIndex: 'buyerDetails',
        render: (_, { buyerDetails }) => (
            buyerDetails?.name
        ),
    },
    {
        title: 'Country',
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
        title: 'Municipality / City',
        dataIndex: 'buyerDetails',
        render: (_, { buyerDetails }) => (
            buyerDetails?.city
        ),
    },
    {
        title: 'Service Provider',
        dataIndex: 'serviceProvider',
    },
    {
        title: 'Status',
        dataIndex: 'noticeStatus',
    },
];

export const searchTendersTableHeaders = [
    {
        title: 'Document Number',
        dataIndex: 'noticeNumber',
        width: 130,
        fixed: 'left',
    },
    {
        title: 'Buyer Title',
        dataIndex: 'buyerTitle',
        width: 200,
    },
    {
        title: 'Buyer short description',
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
        title: 'Publication Date',
        dataIndex: 'publicationDate',
        width: 120,
    },
    {
        title: 'Deadline',
        dataIndex: 'deletionDate',
        width: 120,
    },
    {
        title: 'CPV Name',
        dataIndex: 'cpv',
        width: 130,
        render: (_, { cpv }) => (
            cpv[0]?.desscription
        ),
    },
    {
        title: 'Status',
        dataIndex: 'noticeStatus',
        width: 100,
    },
];

export const searchTendersTableHeadersExpanded = [
    {
        title: 'Document Number',
        dataIndex: 'noticeNumber',
        fixed: 'left',
        width: 130,
    },
    {
        title: 'Buyer Title',
        dataIndex: 'buyerTitle',
        width: 180,
    },
    {
        title: 'Buyer short\n description',
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
        title: 'Publication Date',
        dataIndex: 'publicationDate',
        width: 120,
    },
    {
        title: 'Deadline',
        dataIndex: 'deletionDate',
        width: 120,
    },
    {
        title: 'CPV Name',
        dataIndex: 'cpv',
        width: 130,
        render: (_, { cpv }) => (
            cpv[0]?.desscription
        ),
    },
    {
        title: 'Published By \n(Buyer Name)',
        dataIndex: 'buyerDetails',
        width: 150,
        render: (_, { buyerDetails }) => (
            buyerDetails?.name
        ),
    },
    {
        title: 'Country',
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
        title: 'Municipality/ City',
        dataIndex: 'buyerDetails',
        render: (_, { buyerDetails }) => (
            buyerDetails?.city
        ),
        width: 100,
    },
    {
        title: 'Service Provider',
        dataIndex: 'serviceProvider',
        width: 90,
    },
    {
        title: 'Status',
        dataIndex: 'noticeStatus',
        width: 80,
    },
];

export const usersTableHeaders = [
    {
        title: 'User ID',
        dataIndex: 'UserId',
        fixed: 'left',
        width: 100,
    },
    {
        title: 'Title',
        dataIndex: 'TitleName',
        width: 60,
    },
    {
        title: 'User Name',
        dataIndex: 'UserName',
        width: 170,
    },
    {
        title: 'First Name',
        dataIndex: 'FirstName',
        width: 110,
    },
    {
        title: 'Last Name',
        dataIndex: 'LastName',
        width: 110,
    },
    {
        title: 'Country',
        dataIndex: 'CountryName',
        width: 100,
    },
    {
        title: 'Email',
        dataIndex: 'Email',
        width: 170,
    },
    {
        title: 'Phone',
        width: 135,
        dataIndex: 'PhoneNumber',
    },
    {
        title: 'Assigned Companies',
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
        title: 'Assigned Roles',
        dataIndex: 'UserRoles',
        width: 150,
        ellipsis: {
            showTitle: false,
        },
        render: (UserRoles) => (
            <Tooltip placement="topLeft" title={UserRoles?.map(item => { return item?.RoleName + ', ' })}>
                {UserRoles?.map(item => { return item?.RoleName + ', ' })}
            </Tooltip>
        ),
    },
    {
        title: 'Culture ID',
        dataIndex: 'CultureCode',
        width: 110,
    },
    {
        title: 'Status',
        dataIndex: 'IsActive',
        width: 100,
        fixed: 'right',
        render: (IsActive) => (
            <>
                {IsActive ?
                    <div>
                        <a style={{ color: 'green' }}>&#x25CF;</a> Active
                    </div> :
                    <div>
                        <a className="grey">&#x25CF;</a> Inactive
                    </div>
                }
            </>
        ),
    },
]

export const TemplateTableHeaders = [
    {
        title: 'ID',
        dataIndex: 'Id',
    },
    {
        title: 'Name',
        dataIndex: 'DisplayName',
    },
    {
        title: 'Date Created',
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        )
    },
    {
        title: 'Default Language',
        dataIndex: 'LanguageMessageTemplates',
    },
    {
        title: 'Trigger Point',
        dataIndex: 'MessageTriggerPoint',
    },
    {
        title: 'Message Medium',
        dataIndex: 'MessageMedium',
    },
]

export const CommunicationsLogTableHeaders = [
    {
        title: 'Communication ID',
        dataIndex: 'Id',
    },
    {
        title: 'Link ID',
        dataIndex: 'CorrelationId',
    },
    {
        title: 'Type',
        dataIndex: 'MessageTemplate',
        render: (_, { MessageTemplate }) => (
            MessageTemplate?.MessageMedium?.Name
        ),
        width: 150
    },
    {
        title: 'From',
        dataIndex: 'From',
    },
    {
        title: 'To',
        dataIndex: 'To',
        sorter: true,
        width: 150
    },
    {
        title: 'Date',
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
        title: 'Description',
        dataIndex: 'MessageSubject',
    },
    {
        title: 'Notification Type',
        dataIndex: 'MessageType',
        render: (_, { MessageType }) => (
            MessageType?.Name
        )
    },
    {
        title: 'Workflow Status',
        dataIndex: 'WorkflowStatus',
        render: (_, { WorkflowStatus }) => (
            WorkflowStatus?.Name
        ),
    },
    {
        title: 'Distribution Status',
        dataIndex: 'MessageStatus',
        render: (_, { MessageStatus }) => (
            MessageStatus?.Name
        ),
        sorter: true,
    },
]

export const CommunicationsSubTableHeaders = [
    {
        title: 'From',
        dataIndex: 'From',
    },
    {
        title: 'To',
        dataIndex: 'To',
    },
    {
        title: 'Date',
        dataIndex: 'CreatedDateTime',
        render: (_, { CreatedDateTime }) => (
            formatDate(CreatedDateTime)
        ),
    },
    {
        title: 'Description',
        dataIndex: 'MessageSubject',
    },
    {
        title: 'Notification Type',
        dataIndex: 'MessageType',
        render: (_, { MessageType }) => (
            MessageType?.Name
        )
    },
    {
        title: 'Workflow Status',
        dataIndex: 'WorkflowStatus',
        render: (_, { WorkflowStatus }) => (
            WorkflowStatus?.Name
        ),
    },
    {
        title: 'Distribution Status',
        dataIndex: 'MessageStatus',
        render: (_, { MessageStatus }) => (
            MessageStatus?.Name
        ),
    },
]

export const CommunicationsTableHeaders = [
    {
        title: 'Message ID',
        dataIndex: 'Id',
        sorter: (a, b) => a.Id - b.Id,
    },
    {
        title: 'Subject',
        dataIndex: 'MessageSubject',
    },
    {
        title: 'To',
        dataIndex: 'To',
        sorter: true,
    },
    {
        title: 'Date',
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
        title: 'Message Type',
        dataIndex: 'MessageType',
        render: (_, { MessageType }) => (
            MessageType?.Name
        ),
        sorter: true,
    },
    {
        title: 'Email',
        dataIndex: 'FromName',
    },
    {
        title: 'Message method',
        dataIndex: 'MessageTemplate',
        render: (_, { MessageTemplate }) => (
            MessageTemplate?.MessageMedium?.Name
        ),
        sorter: true,
    },
    {
        title: 'Attachments',
        dataIndex: 'MessageLinks',
    },
]

export const CommunicationBasketsTableHeaders = [
    {
        title: 'Basket ID',
        dataIndex: 'Id',
    },
    {
        title: 'Basket Name',
        dataIndex: 'Name',
        sorter: true,
    },
    {
        title: 'Created Date',
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
        title: 'Basket Type',
        dataIndex: 'BasketType',
        render: (_, { BasketType }) => (
            BasketType?.Name
        ),
    },
    {
        title: 'Communication Type',
        dataIndex: 'CommunicationType',
        render: (_, { CommunicationType }) => (
            CommunicationType?.Name
        ),
    },
    {
        title: 'Basket Type',
        dataIndex: 'BasketType',
        render: (_, { BasketType }) => (
            BasketType?.Name
        ),
    },
    {
        title: 'Start Date',
        dataIndex: 'FromDateTime',
        render: (_, { FromDateTime }) => (
            formatDate(FromDateTime)
        ),
    },
    {
        title: 'End Date',
        dataIndex: 'ToDateTime',
        render: (_, { ToDateTime }) => (
            formatDate(ToDateTime)
        ),
    },
    {
        title: 'Status',
        dataIndex: 'BasketStatus',
        render: (_, { BasketStatus }) => (
            BasketStatus?.Name
        ),
        sorter: true,
    },
]