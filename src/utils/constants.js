import React from "react";
import { formatDate, getDateDiff } from "../utils"
import { Badge } from "antd";
import logo_thumb from "../assets/images/logo_thumb.png"

export const levelOneReq = {
    "level": 1,
    "code": ""
}

export const nacSectionReq = {
    "level": "1",
    "parent": ""
}

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
    {
        title: 'User ID',
        dataIndex: 'id',
    },
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
        title: 'Search ID',
        dataIndex: 'id',
    },
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
        dataIndex: 'searchFilter',
        render: (_, { searchFilter }) => (
            <>
                {
                    searchFilter.countries.length > 0 &&
                    <div className="g-row m-b-5 table-separate">
                        <div className="blue g-col-4" >Country</div>
                        <div className="g-col-8">
                            {searchFilter.countries.map((country, index) => {
                                return (
                                    <div key={index}>
                                        <div className="blue g-col-6" >XXX</div>
                                        <div className="blue g-col-6" >{country}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    searchFilter.regions.length > 0 &&
                    <div className="g-row m-b-5 table-separate">
                        <div className="blue g-col-4" >Region</div>
                        <div className="g-col-8">
                            {searchFilter.regions.map((region, index) => {
                                return (
                                    <div key={index}>
                                        <div className="blue g-col-6" >XXX</div>
                                        <div className="blue g-col-6" >{region}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    searchFilter.cities.length > 0 &&
                    <div className="g-row m-b-5 table-separate">
                        <div className="blue g-col-4" >City</div>
                        <div className="g-col-8">
                            {searchFilter.cities.map((city, index) => {
                                return (
                                    <div key={index}>
                                        <div className="blue g-col-6" >XXX</div>
                                        <div className="blue g-col-6" >{city}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    searchFilter.municipalities.length > 0 &&
                    <div className="g-row m-b-5 table-separate">
                        <div className="blue g-col-4" >Municipality</div>
                        <div className="g-col-8">
                            {searchFilter.municipalities.map((municipality, index) => {
                                return (
                                    <div key={index}>
                                        <div className="blue g-col-6" >XXX</div>
                                        <div className="blue g-col-6" >{municipality}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    searchFilter.cpvs.length > 0 &&
                    <div className="g-row m-b-5 table-separate">
                        <div className="blue g-col-4" >CPV</div>
                        <div className="g-col-8">
                            {searchFilter.cpvs.map((cpv, index) => {
                                return (
                                    <div key={index}>
                                        <div className="blue g-col-6" >{cpv}</div>
                                        <div className="blue g-col-6" >XXX</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    searchFilter.naces.length > 0 &&
                    <div className="g-row m-b-5 table-separate">
                        <div className="blue g-col-4" >NACE</div>
                        <div className="g-col-8">
                            {searchFilter.naces.map((nace, index) => {
                                return (
                                    <div key={index}>
                                        <div className="blue g-col-6" >{nace}</div>
                                        <div className="blue g-col-6" >XXX</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                {
                    searchFilter.unspscs.length > 0 &&
                    <div className="g-row m-b-5 table-separate">
                        <div className="blue g-col-4" >UNSPSC</div>
                        <div className="g-col-8">
                            {searchFilter.unspscs.map((unspsc, index) => {
                                return (
                                    <div key={index}>
                                        <div className="blue g-col-6" >{unspsc}</div>
                                        <div className="blue g-col-6" >XXX</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </>
        )
    },
    {
        title: '#',
        dataIndex: 'results',
        render: (_, { results }) => (
            results.length
        ),
    },
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