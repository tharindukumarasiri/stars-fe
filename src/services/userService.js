import config from './config.json';
import http from './httpService';
import { getAuthHeader } from '../utils';

export async function getUser() { 
    const url = config.LOCAL_API + config.GET_USER;
    const { data } = await http.get(url, getAuthHeader());
    return data;
}

export async function getPerson() { 
    const url = config.LOCAL_API + config.GET_USER_PERSON;
    const { data } = await http.get(url, getAuthHeader());
    return data;
}

export async function getSelectedCompany() { 
    const url = config.LOCAL_API + config.GET_SELECTED_COMPANY;
    const { data } = await http.get(url, getAuthHeader());
    if(data){
        localStorage.setItem('database_name', data.databaseName)
    }
    return data;
}

//Example param: { id: company.id }
export async function getCompanyUsers(params) {   
    const url = config.LOCAL_API + config.GET_COMPANY_USERS;    
    const { data } = await http.get(url, { params }, getAuthHeader());
    return data;
}

export async function getCompanyMembers() {   
    const url = config.LOCAL_API + config.GET_COMPANY_MEMBERS;    
    const { data } = await http.get(url, getAuthHeader());
    return data;
}