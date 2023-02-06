import config from './config.json';
import http from './httpService';
import { getAuthHeader } from '../utils';

export async function updateMessageTemplates(partyId, params) {
    const url =  config.UPDATE_MESSAGE_TEMPLATE + partyId;
    const { data } = await http.post(url, params);
    return data;
}

export async function getMessageTemplates() {
    const { data } = await http.get(config.GET_MESSAGE_TEMPLATE);
    return data;
}

export async function getTenantMessageTemplates(tenantId) {
    const { data } = await http.get(config.GET_TENANT_MESSAGE_TEMPLATE + tenantId);
    return data;
}