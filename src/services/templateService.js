import config from './config.json';
import http from './httpService';
import { getAuthHeader } from '../utils';

export async function insertMessageTemplates(partyId, params) {
    const url =  config.INSERT_MESSAGE_TEMPLATE + partyId;
    const { data } = await http.post(url, params);
    return data;
}

export async function updateMessageTemplates(params) {
    const url =  config.UPDATE_MESSAGE_TEMPLATE;
    const { data } = await http.patch(url, params);
    return data;
}

export async function getMessageTemplates() {
    const { data } = await http.get(config.GET_MESSAGE_TEMPLATE);
    return data;
}

export async function getMessageTemplatesNewUserInvitation(companyId) {
    const { data } = await http.get(`${config.GET_MESSAGE_TEMPLATE_NEW_USER_INVITATION}${companyId}`);
    return data;
}

export async function getTenantMessageTemplates(companyId, type, pageNo = 0, pageSize = 100) {
    const { data } = await http.get(config.GET_TENANT_MESSAGE_TEMPLATE + companyId + 
                                     "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&messageTemplateTypeId=" + type);
    return data;
}

export async function deleteMessageTemplate(id, userId) {
    const { data } = await http.delete(config.DELETE_TENANT_MESSAGE_TEMPLATE + id + "&userId=" + userId);
    return data;
}

export async function getTriggerPoints(type) {
    const { data } = await http.get(config.GET_TRIGGER_POINTS + type);
    return data;
}

export async function GetCommunicationTemplatesByTenant(companyId, type){
    const { data } = await http.get(config.GET_TENANT_COMMUNICATION_TEMPLATES + "?companyId=" + companyId + "&path=" + type );
    return data;
}