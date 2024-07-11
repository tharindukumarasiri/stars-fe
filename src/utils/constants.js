import React from "react";

export const emailRegEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const phoneRegEx =
    /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,8}$/;

export const levelOneReq = {
    "level": 1,
    "code": ""
}

export const nacSectionReq = {
    "level": "1",
    "parent": ""
}

export const markTendersitems = [
    {
        label: 'New',
        value: 'NEW',
        icon: <i className="icon-tender-new green" />,
    },
    {
        label: 'Open for consideration',
        value: 'OPEN_FOR_CONSIDERATION',
        icon: <i className="icon-tender-open blue-dark" />,
    },
    {
        label: 'Decided to reply with a proposal',
        value: 'PROPOSAL',
        icon: <i className="icon-tender-proposal blue-purple" />,
    },
    {
        label: 'Not relevant',
        value: 'NOT_RELEVANT',
        icon: <i className="icon-tender-not-relevant" />,
    },
    {
        label: 'Closed',
        value: 'CLOSED',
        icon: <i className="icon-tender-closed red" />,
    },
];

export const numberOfEmployeesList = [
    '0 to 50',
    '50 to 100',
    '100 to 500',
    '500 to 2000',
    'more than 2000'
]

export const organizationTypes = [
    'ANNA',
    'ANS',
    'AS',
    'ASA',
    'BA',
    'BRL',
    'DA',
    'ENK',
    'ESEK',
    'FLI',
    'IKS',
    'KBO',
    'KIRK',
    'KS',
    'KTRF',
    'NUF',
    'ORGL',
    'PRE',
    'SA',
    'SAM',
    'SF',
    'STI',
    'SÆR',
    'UTLA',
    'VPFO'
]

export const templateType = {
    Notification: 1,
    LandingPage: 2,
    Communication: 3
}

export const messageTriggerPoints = {
    UserInvitationNewUser: 1,
    CompanyInvitation: 11
}

export const schedulingTypes = {
    IMMIDIATE: 'IMMIDIATE',
    PLANNED: 'PLANNED',
    RECURRING: 'RECURRING'
}

export const recurringTypes = {
    DALY: 'DALY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY'
}

export const DaysOfTheWeek = [
    { value: '1', label: 'Mo' },
    { value: '2', label: 'Tu' },
    { value: '3', label: 'We' },
    { value: '4', label: 'Th' },
    { value: '5', label: 'Fr' },
    { value: '6', label: 'Sa' },
    { value: '7', label: 'Su' },
]

export const ReferenceTypes = {
    workInstructions: 'workInstructions',
    softwareSystems: 'softwareSystems',
    agreements: 'agreements',
    contactPersons: 'contactPersons',
    contactPersonsByCompanies: 'contactPersonsByCompanies',
    companies: 'companies'
}