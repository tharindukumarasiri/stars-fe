import config from './config.json';
import http from './httpService';
import { getAuthHeader } from '../utils';

export async function getUser() {
    const url = process.env.LOCAL_API + config.GET_USER;
    const { data } = await http.get(url, getAuthHeader());
    let user = { ...data.user, roles: data.roles}    
    return user;
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

export async function getAllUsers(companyId, searchText = '', pageNumber = '1') {
    const url = process.env.LOCAL_API + config.GET_ALL_USERS + companyId + '&searchText=' + searchText + '&pageNo=' + pageNumber + '&pageSize=10';
    const { data } = await http.get(url, getAuthHeader());
    return data;
}

export async function addUser(params) {
    const url = process.env.LOCAL_API + config.ADD_USER;
    const { data } = await http.post(url, params, getAuthHeader());
    return data;
}

export async function updateUser(params) {
    const url = process.env.LOCAL_API + config.UPDATE_USER;
    const { data } = await http.put(url, params, getAuthHeader());
    return data;
}

export async function activateUsers(params) {
    const url = process.env.LOCAL_API + config.ACTIVATE_USERS;
    const { data } = await http.put(url, params, getAuthHeader());
    return data;
}

export async function deActivateUsers(params) {
    const url = process.env.LOCAL_API + config.DEACTIVATE_USERS;
    const { data } = await http.put(url, params, getAuthHeader());
    return data;
}
export async function activateRoleUser(params) {
    const url = process.env.LOCAL_API + config.ACTIVATE_ROLES_USER;
    const { data } = await http.post(url, params, getAuthHeader());
    return data;
}

export async function deActivateRoleUser(params) {
    const url = process.env.LOCAL_API + config.DEACTIVATE_ROLES_USER;
    const { data } = await http.put(url, params, getAuthHeader());
    return data;
}

export async function deleteUser(params) {
    const url = process.env.LOCAL_API + config.DELETE_USER;
    const { data } = await http.delete(url, { data: params }, getAuthHeader());
    return data;
}
