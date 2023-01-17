import config from './config.json';
import http from './httpService';

export async function getCommunicationsList(params) {
    const { data } = await http.post(config.GET_COMMUNICATIONS, params);
    return data;
}

export async function getCommunicationEntities() {
    const { data } = await http.get(config.GET_COMMUNICATION_ENTITIES);
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