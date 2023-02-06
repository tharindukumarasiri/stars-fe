import config from './config.json';
import http from './httpService';
import { getAuthHeader } from '../utils';

export async function getUser() {
    const url = process.env.LOCAL_API + config.GET_USER;
    const { data } = await http.get(url, getAuthHeader());
    return data;
}

export async function getPerson() {
    const url = process.env.LOCAL_API + config.GET_USER_PERSON;
    const { data } = await http.get(url, getAuthHeader());
    return data;
}

export async function getSelectedCompany() {
    const url = process.env.LOCAL_API + config.GET_SELECTED_COMPANY;
    const { data } = await http.get(url, getAuthHeader());
    if (data) {        
        localStorage.setItem('tenant-id', data.tenantId);
        localStorage.setItem('tenant-db', data.databaseName)
    }
    return data;
}

//Example param: { id: company.id }
export async function getCompanyUsers(params) {
    const url = process.env.LOCAL_API + config.GET_COMPANY_USERS;
    const { data } = await http.get(url, { params }, getAuthHeader());
    return data;
}

export async function getCompanyMembers() {
    const url = process.env.LOCAL_API + config.GET_COMPANY_MEMBERS;
    const { data } = await http.get(url, getAuthHeader());
    return data;
}

export async function getContacts() {
    const url = process.env.LOCAL_API + config.GET_CONTACTS;
    const { data } = await http.get(url, getAuthHeader());
    return data;
}

export async function getLanguage() {
    const url = process.env.LOCAL_API + config.GET_LANGUAGE;
    const { data } = await http.get(url, getAuthHeader());
    return data;
}

export async function getAllUsers(searchText = '') {
    const url = process.env.LOCAL_API + config.GET_ALL_USERS + searchText;
    const { data } = await http.get(url, getAuthHeader());
    return data;
}
