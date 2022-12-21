import config from './config.json';
import http from './httpService';
import { getAuthHeader } from '../utils';



export async function updateMessageTemplates(partyId, params) {
    const url =  config.UPDATE_MESSAGE_TEMPLATE + partyId;
    const { data } = await http.post(url, params);
    return data;
}