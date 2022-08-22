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
        title: 'section ID',
        dataIndex: 'id',
    },
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
            <img src={logo_thumb} className="logo-thumb" />
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
        title: 'Responsible',
        dataIndex: 'responsible',
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