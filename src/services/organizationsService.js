import config from './config.json'
import http from './httpService'

//Organization
export async function searchOrganization(params) {
    const { data } = await http.post(config.ORGANIZATIONS, params);
    return data;
}
export async function getOrganization(id = '"927379759"') {
    const { data } = await http.post(config.GET_ORGANIZATIONS, id, { headers: { 'Content-Type': 'application/json', } });
    return data;
}

//Countries
export async function getCountries() {
    const { data } = await http.get(config.COUNTRIES);
    return data;
}

//Regions
export async function getRegions(name) {
    const { data } = await http.post(config.REGIONS, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Municipalities
export async function getMunicipalities(name) {
    const { data } = await http.post(config.MUNICIPALITIES, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Cities
export async function getCities(name) {
    const { data } = await http.post(config.CITIES, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Unspsc Codes
export async function getUnspscCodes(params) {
    const { data } = await http.post(config.UNSPSC_CODES, params);
    return data;
}
export async function updateUnspscCodes(id = 927379759, params) {
    const { data } = await http.post(`${config.UPDATE_UNSPSC}${id}`, params);
    return data;
}
export async function searchUnspscCodes(params) {
    const { data } = await http.post(config.SEARCH_UNSPSC_CODES, params, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Cpv Codes
export async function getCpvCodes(params) {
    const { data } = await http.post(config.CPV_CODES, params);
    return data;
}
export async function updateCpvCodes(id = 927379759, params) {
    const { data } = await http.post(`${config.UPDATE_CPV}${id}`, params);
    return data;
}
export async function searchCpvCodes(params) {
    const { data } = await http.post(config.SEARCH_CPV_CODES, params, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Nac Codes
export async function getNacCodes(params) {
    const { data } = await http.post(config.NAC_CODES, params);
    return data;
}
export async function updateNaceCodes(id = 927379759, params) {
    const { data } = await http.post(`${config.UPDATE_NACE}${id}`, params);
    return data;
}
export async function searchNaceCodes(params) {
    const { data } = await http.post(config.SEARCH_NACE_CODES, params, { headers: { 'Content-Type': 'application/json' } });
    return data;
}