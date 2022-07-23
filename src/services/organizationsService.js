import config from './config.json'
import http from './httpService'

export async function searchOrganization(params) {
    const { data } = await http.post(config.ORGANIZATIONS, params);
    return data;
}
export async function getOrganization(id = '"927379759"') {
    const { data } = await http.post(config.GET_ORGANIZATIONS, id, { headers: { 'Content-Type': 'application/json', } });
    return data;
}

export async function getCountries() {
    const { data } = await http.get(config.COUNTRIES);
    return data;
}

export async function getRegions(name) {
    const { data } = await http.post(config.REGIONS, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

export async function getMunicipalities(name) {
    const { data } = await http.post(config.MUNICIPALITIES, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

export async function getCities(name) {
    const { data } = await http.post(config.CITIES, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

export async function getUnspscCodes(params) {
    const { data } = await http.post(config.UNSPSC_CODES, params);
    return data;
}
export async function updateUnspscCodes(id = 927379759, params) {
    const { data } = await http.post(`${config.UPDATE_UNSPSC}${id}`, params);
    return data;
}

export async function getCpvCodes(params) {
    const { data } = await http.post(config.CPV_CODES, params);
    return data;
}

export async function getNacCodes(params) {
    const { data } = await http.post(config.NAC_CODES, params);
    return data;
}