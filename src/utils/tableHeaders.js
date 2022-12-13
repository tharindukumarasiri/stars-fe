import React from "react";
import { formatDate, getDateDiff, getCountryFlag } from "../utils"
import { Badge, Tooltip } from "antd";
import logo_thumb from "../assets/images/logo_thumb.png"

export const projectScreenTableHeaders = [
    {
        title: 'Project ID',
        dataIndex: 'operationId',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Company ID',
        dataIndex: 'compId',
        render: (_, record) => (
            '9732154'
        ),
    },
    {
        title: 'OperationType',
        dataIndex: 'type',
    },
    {
        title: 'From Date',
        dataIndex: 'fromDate',
        sorter: (a, b) => {
            if (getDateDiff(a.fromDate, b.fromDate) > 0)
                return 1
            else
                return -1
        },
        render: (_, { fromDate }) => (
            formatDate(fromDate)
        ),
    },
    {
        title: 'Due Date',
        dataIndex: 'toDate',
        sorter: (a, b) => {
            if (getDateDiff(a.toDate, b.toDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { toDate }) => (
            formatDate(toDate)
        ),
    },
    {
        title: 'Closed Date',
        dataIndex: 'closedDate',
        sorter: (a, b) => {
            if (getDateDiff(a.closedDate, b.closedDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { closedDate }) => (
            formatDate(closedDate)
        ),
    },
    {
        title: 'Responsible',
        dataIndex: 'responsible',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <Badge status={status?.toUpperCase() === 'OPEN' ? "success" : "default"} text={status?.toUpperCase() === 'OPEN' ? "Open" : "Close"} />
        )
    },
];

export const sectionTableHeaders = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Desription',
        dataIndex: 'description',

    },
    {
        title: 'Purpose',
        dataIndex: 'purpose',
    },
    {
        title: 'From Date',
        dataIndex: 'fromDate',
        sorter: (a, b) => {
            if (getDateDiff(a.fromDate, b.fromDate) > 0)
                return 1
            else
                return -1
        },
        render: (_, { fromDate }) => (
            formatDate(fromDate)
        ),
    },
    {
        title: 'To Date',
        dataIndex: 'toDate',
        sorter: (a, b) => {
            if (getDateDiff(a.toDate, b.toDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { toDate }) => (
            formatDate(toDate)
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <Badge status={status?.toUpperCase() === 'OPEN' ? "success" : "default"} text={status?.toUpperCase() === 'OPEN' ? "Open" : "Close"} />
        )
    },
    {
        title: 'Closed Date',
        dataIndex: 'closedDate',
        sorter: (a, b) => {
            if (getDateDiff(a.closedDate, b.closedDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { closedDate }) => (
            formatDate(closedDate)
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
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Assigned Date',
        dataIndex: 'fromDate',
        sorter: (a, b) => {
            if (getDateDiff(a.fromDate, b.fromDate) > 0)
                return 1
            else
                return -1
        },
        render: (_, { fromDate }) => (
            formatDate(fromDate)
        ),
    },
    {
        title: 'Last Date',
        dataIndex: 'toDate',
        sorter: (a, b) => {
            if (getDateDiff(a.toDate, b.toDate) > 0)
                return 1
            else
                return -1
        }, render: (_, { toDate }) => (
            formatDate(toDate)
        ),
    },

    {
        title: 'Status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <Badge status={status === 'active' || status === 'Open' ? "success" : "default"} text={status === 'active' || status === 'Open' ? "Open" : "Close"} />
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
                            {searchFilter.countries.map((country, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >XXX</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{country}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.countries?.map((country, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >XXX</div>
                                        <div className="red g-col-6" >{country}</div>
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
                            {searchFilter.regions.map((region, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >XXX</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{region}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.regions?.map((region, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >XXX</div>
                                        <div className="red g-col-6" >{region}</div>
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
                            {searchFilter.cities.map((city, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >XXX</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{city}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.cities?.map((city, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >XXX</div>
                                        <div className="red g-col-6" >{city}</div>
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
                            {searchFilter.municipalities.map((municipality, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >XXX</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{municipality}</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.municipalities?.map((municipality, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >XXX</div>
                                        <div className="red g-col-6" >{municipality}</div>
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
                            {searchFilter.cpvs.map((cpv, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{cpv}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >XXX</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.cpvs?.map((cpv, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{cpv}</div>
                                        <div className="red g-col-6" >XXX</div>
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
                            {searchFilter.naces.map((nace, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{nace}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >XXX</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.naces?.map((nace, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{nace}</div>
                                        <div className="red g-col-6" >XXX</div>
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
                            {searchFilter.unspscs.map((unspsc, index) => {
                                return (
                                    <div key={index}>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >{unspsc}</div>
                                        <div className={parentSearchId ? "red g-col-6" : "blue g-col-6"} >XXX</div>
                                    </div>
                                )
                            })}
                            {removeCriteria?.unspscs?.map((unspsc, index) => {
                                return (
                                    <div key={index}>
                                        <div className="red g-col-6" >{unspsc}</div>
                                        <div className="red g-col-6" >XXX</div>
                                    </div>
                                )
                            })}
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