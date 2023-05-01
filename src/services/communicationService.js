import config from './config.json';
import http from './httpService';

export async function getCommunicationsList(params) {
    const { data } = await http.post(config.GET_COMMUNICATIONS, params);
    return data;
}

export async function getCommunicationLogs(params) {
    const { data } = await http.post(config.GET_COMMUNICATION_LOGS, params);
    return data;
}

export async function getCommunicationLogsByBasket(params) {
    const { data } = await http.post(config.GET_COMMUNICATION_LOGS_BY_BASKET, params);
    return data;
}

export async function getCommunicationLogsSubLvl(messageQueueId) {
    const { data } = await http.get(`${config.GET_COMMUNICATION_LOGS_SUB_LVL}${messageQueueId}`);
    return data;
}

export async function deleteCommunicationLogs(params) {
    //params => int array 1st element logged in user id
    const { data } = await http.put(config.DELETE_COMMUNICATION_LOGS, params);
    return data;
}

export async function getCommunicationEntities() {
    const { data } = await http.get(config.GET_COMMUNICATION_ENTITIES);
    return data;
}

export async function getCommunicationEntitiesWithRoles(companyPartyId) {
    const { data } = await http.get(`${config.GET_COMMUNICATION_ENTITIES_WITH_ROLES}${companyPartyId}`);
    return data;
}

export async function getCommunicationMessageTypes() {
    const { data } = await http.get(config.GET_COMMUNICATION_MESSAGE_TYPES);
    return data;
}

export async function getCommunicationMessageStatuses() {
    const { data } = await http.get(config.GET_COMMUNICATIONS_MESSAGE_STATUSES);
    return data;
}

export async function getCommunicationBasket(params) {
    const { data } = await http.post(config.GET_COMMUNICATION_BASKET, params);
    return data;
}

export async function addCommunicationBasket(params) {
    const { data } = await http.post(config.ADD_COMMUNICATION_BASKET, params);
    return data;
}

export async function getCommunicationBasketTypes() {
    const { data } = await http.get(config.GET_COMMUNICATION_BASKET_TYPES);
    return data;
}

export async function getCommunicationBasketStatuses() {
    const { data } = await http.get(config.GET_COMMUNICATION_BASKET_STATUSES);
    return data;
}

export async function configureCommunicationBasket(params) {
    const { data } = await http.put(config.CONFIG_COMMUNICATION_BASKET, params);
    return data;

}
export async function deleteCommunicationBasket(params) {
    const { data } = await http.put(config.DELETE_COMMUNICATION_BASKET, params);
    return data;
}

export async function getCompanies(basketId = '', companyPartyId, searchText = '', triggerPointId = '' ) {
    const { data } = await http.get(`${config.GET_COMPANIES}${companyPartyId}&communicationBasketId=${basketId}&searchText=${searchText}&triggerPointId=${triggerPointId}`);
    return data;
}

export async function getAllCompanies(companyPartyId, searchText = '', pageNumber = 0, pageSize = 10 ) {
    const { data } = await http.get(`${config.GET_ALL_COMPANIES}${companyPartyId}`);
    return data;
}

export async function addCompany(params) {
    const { data } = await http.post(config.ADD_COMPANY, params);
    return data;
}

export async function updateCompany(params) {
    const { data } = await http.put(config.UPDATE_COMPANY, params);
    return data;
}

export async function getPersons(companyPartyId, communicationBasketId = '', messageTemplateId = '', searchText = '', pageNumber = 0, pageSize = 10 ) {
    const { data } = await http.get(`${config.GET_PERSONS}${companyPartyId}&communicationBasketId=${communicationBasketId}&messageTemplateId=${messageTemplateId}`);
    return data;
}

export async function addPerson(params) {
    const { data } = await http.post(config.ADD_PERSON, params);
    return data;
}

export async function updatePerson(params) {
    const { data } = await http.put(config.UPDATE_PERSON, params);
    return data;
}

export async function updateAndSchedule(params) {
    const { data } = await http.post(config.UPDATE_AND_SHEDULE, params);
    return data;
}

export async function sendImmediately(params) {
    const { data } = await http.post(config.SEND_IMMEDIATELY, params);
    return data;
}

export async function companyJoinSendImmediately(params) {
    const { data } = await http.post(config.COMPANY_JOIN_SEND_IMMEDIATELY, params);
    return data;
}

export async function getGetCountries() {
    const { data } = await http.get(config.GET_COUNTRIES);
    return data;
}