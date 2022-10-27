import config from './config.json'
import http from './httpService'

//Organization
export async function searchOrganization(params) {
    const { data } = await http.post(config.ORGANIZATIONS, params);
    return data;
}
export async function searchOrganizationByCPV(params) {
    const { data } = await http.post(config.ORGANIZATIONS_BY_CPV, params);
    return data;
}
export async function searchOrganizationByNACE(params) {
    const { data } = await http.post(config.ORGANIZATIONS_BY_NACE, params);
    return data;
}
export async function searchOrganizationByUNSPSC(params) {
    const { data } = await http.post(config.ORGANIZATIONS_BY_UNSPSC, params);
    return data;
}

export async function removeSearch(searchId, params) {
    const { data } = await http.post(`${config.REMOVE_SEARCH}${searchId}`, params);
    return data;
}

export async function removeAllOrganizationIds(params) {
    const { data } = await http.post(config.REMOVE_ALL_ORG_IDS, params);
    return data;
}

export async function removeSearchAccumulateCpv(searchId, params) {
    const { data } = await http.post(`${config.REMOVE_SEARCH_ACCUMULATE_CPV}${searchId}`, params);
    return data;
}

export async function removeSearchAccumulateNace(searchId, params) {
    const { data } = await http.post(`${config.REMOVE_SEARCH_ACCUMULATE_NACE}${searchId}`, params);
    return data;
}

export async function getOrganization(id) {
    const { data } = await http.post(config.GET_ORGANIZATIONS, id, { headers: { 'Content-Type': 'application/json', } });
    return data;
}

export async function updateOrganization(organization) {
    const { data } = await http.post(config.UPDATE_ORGANIZATION, organization, { headers: { 'Content-Type': 'application/json', } });
    return data;
}

export async function getSearchResults() {
    const { data } = await http.get(config.GET_SEARCH_RESULT);
    return data;
}
export async function getSearchResultsByProjAndSec(proId, secId) {
    const { data } = await http.get(`${config.GET_SEARCH_RESULT_BY_PROID_SECID}${proId}&secId=${secId}`);
    return data;
}
export async function addNewSearchResult(params) {
    const { data } = await http.post(config.ADD_SEARCH_RESULT, params);
    return data;
}

export async function deleteSearch(params) {
    const { data } = await http.delete(config.DELETE_SEARCH, { data: params });
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
export async function updateUnspscCodes(id, params) {
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
export async function updateCpvCodes(id, params) {
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
export async function updateNaceCodes(id, params) {
    const { data } = await http.post(`${config.UPDATE_NACE}${id}`, params);
    return data;
}
export async function searchNaceCodes(params) {
    const { data } = await http.post(config.SEARCH_NACE_CODES, params, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//NUTS Codes
export async function getAllNutsCountries() {
    const { data } = await http.get(config.GET_NUTS_COUNTRIES);
    return data;
}
export async function getNutsCodes(countryCode, level) {
    const { data } = await http.get(`${config.GET_NUTS_COUNTRIES}/${countryCode}/level/${level}`);
    return data;
}
export async function updateNutsCodes(id, params) {
    const { data } = await http.post(`${config.UPDATE_NUTS}${id}`, params);
    return data;
}