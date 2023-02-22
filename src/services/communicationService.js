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

export async function getCommunicationLogsSubLvl(correlationId) {
    const { data } = await http.get(`${config.GET_COMMUNICATION_LOGS_SUB_LVL}${correlationId}`);
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

export async function getCommunicationEntitiesWithRoles() {
    const { data } = await http.get(config.GET_COMMUNICATION_ENTITIES_WITH_ROLES);
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
