import config from './config.json'
import http from './httpService'

//Organization
export async function searchOrganization(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.ORGANIZATIONS, params);
    return data;
}
export async function searchOrganizationByCPV(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.ORGANIZATIONS_BY_CPV, params);
    return data;
}
export async function searchOrganizationByNACE(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.ORGANIZATIONS_BY_NACE, params);
    return data;
}
export async function searchOrganizationByUNSPSC(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.ORGANIZATIONS_BY_UNSPSC, params);
    return data;
}
export async function searchOrganizationMunicipality(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.ORGANIZATIONS_BY_MUNICIPALITY, params);
    return data;
}

export async function removeSearch(searchId, params) {
    const { data } = await http.post(`${process.env.SDC_SEARCH_API + config.REMOVE_SEARCH}${searchId}`, params);
    return data;
}

export async function removeAllOrganizationIds(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.REMOVE_ALL_ORG_IDS, params);
    return data;
}

export async function removeSearchAccumulateCpv(searchId, params) {
    const { data } = await http.post(`${process.env.SDC_SEARCH_API + config.REMOVE_SEARCH_ACCUMULATE_CPV}${searchId}`, params);
    return data;
}

export async function removeSearchAccumulateNace(searchId, params) {
    const { data } = await http.post(`${process.env.SDC_SEARCH_API + config.REMOVE_SEARCH_ACCUMULATE_NACE}${searchId}`, params);
    return data;
}

export async function getOrganization(id) {
    const { data } = await http.get(`${process.env.SDC_SEARCH_API + config.GET_ORGANIZATIONS}/${id}/NO`);
    return data;
}

export async function updateOrganization(organization) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.UPDATE_ORGANIZATION, organization, { headers: { 'Content-Type': 'application/json', } });
    return data;
}

export async function getSearchResults() {
    const { data } = await http.get(process.env.SDC_PROJECT_API + config.GET_SEARCH_RESULT);
    return data;
}
export async function getSearchResultsByProjAndSec(proId, secId) {
    const { data } = await http.get(`${process.env.SDC_PROJECT_API + config.GET_SEARCH_RESULT_BY_PROID_SECID}${proId}&secId=${secId}`);
    return data;
}
export async function addNewSearchResult(params) {
    const { data } = await http.post(process.env.SDC_PROJECT_API + config.ADD_SEARCH_RESULT, params);
    return data;
}

export async function getOrganizationTypes(countryCode, languageCode) {
    const { data } = await http.get(`${process.env.SDC_SEARCH_API + config.GET_ORGANIZATION_TYPES}${countryCode}/${languageCode}`);
    return data;
}

export async function deleteSearch(params) {
    const { data } = await http.delete(process.env.SDC_PROJECT_API + config.DELETE_SEARCH, { data: params });
    return data;
}

//Countries
// export async function getCountries() {
//     const { data } = await http.get(config.COUNTRIES);
//     return data;
// }

//Regions
export async function getRegions(name) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.REGIONS, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Municipalities
export async function getMunicipalities(name) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.MUNICIPALITIES, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Cities
export async function getCities(name) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.CITIES, name, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

export async function getCitiesByCountry(country) {
    const { data } = await http.get(`${process.env.SDC_SEARCH_API + config.CITIES_BY_COUNTRY}${country}`);
    return data;
}

//Unspsc Codes
export async function getUnspscCodes(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.UNSPSC_CODES, params);
    return data;
}
export async function updateUnspscCodes(id, params) {
    const { data } = await http.post(`${process.env.SDC_SEARCH_API + config.UPDATE_UNSPSC}${id}`, params);
    return data;
}
export async function searchUnspscCodes(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.SEARCH_UNSPSC_CODES, params, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Cpv Codes
export async function getCpvCodes(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.CPV_CODES, params);
    return data;
}
export async function updateCpvCodes(id, params) {
    const { data } = await http.post(`${process.env.SDC_SEARCH_API + config.UPDATE_CPV}${id}`, params);
    return data;
}
export async function searchCpvCodes(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.SEARCH_CPV_CODES, params, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//Nac Codes
export async function getNacCodes(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.NAC_CODES, params);
    return data;
}
export async function updateNaceCodes(id, params) {
    const { data } = await http.post(`${process.env.SDC_SEARCH_API + config.UPDATE_NACE}${id}`, params);
    return data;
}
export async function searchNaceCodes(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.SEARCH_NACE_CODES, params, { headers: { 'Content-Type': 'application/json' } });
    return data;
}

//NUTS Codes
export async function getAllNutsCountries() {
    const { data } = await http.get(process.env.SDC_SEARCH_API + config.GET_NUTS_COUNTRIES);
    return data;
}
export async function getNutsCodes(countryCode, level) {
    const { data } = await http.get(`${process.env.SDC_SEARCH_API + config.GET_NUTS_COUNTRIES}/${countryCode}/level/${level}`);
    return data;
}
export async function updateNutsCodes(id, params) {
    const { data } = await http.post(`${process.env.SDC_SEARCH_API + config.UPDATE_NUTS}${id}`, params);
    return data;
}

//Seller 
export async function getAllTenders({ pageSize, index, language = '', searchText = '', country = '', cities = '', cpvs = '', noticeType = '', nutsCode = '', postalCode = '', publicationType = '', referenceNo = '', publishedDateFrom = '', publishedDateTo = '', expiryDateFrom = '', expiryDateTo = '', sortBy = '', sortDirection = 'asc', serviceProvider = '' } = {}) {
    const { data } = await http.get(`${process.env.SDC_SEARCH_API + config.GET_ALL_TENDERS}${language}&searchText=${searchText}&country=${country}&cities=${cities}&cpvs=${cpvs}&nutsCode=${nutsCode}&postalCode=${postalCode}&noticeType=${noticeType}&publicationType=${publicationType}&referenceNo=${referenceNo}&publishedDateFrom=${publishedDateFrom}&publishedDateTo=${publishedDateTo}&expiryDateFrom=${expiryDateFrom}&expiryDateTo=${expiryDateTo}&sortBy=${sortBy}&sortDirection=${sortDirection}&serviceProvider=${serviceProvider}&pageSize=${pageSize}&index=${index}`);
    return data;
}

export async function getTenders(orgId, pageSize, index, language, country) {
    const { data } = await http.get(`${process.env.SDC_SEARCH_API + config.GET_TENDERS}${orgId}?country=${country}&pageSize=${pageSize}&index=${index}&language=${language}`);
    return data;
}

export async function getTendersByNoticeNumber(noticeNumber) {
    const { data } = await http.get(`${process.env.SDC_SEARCH_API + config.GET_TENDER_BY_NOTICE_NUMBER}${noticeNumber}`);
    return data;
}

export async function updateTenementCPV(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.UPDATE_TENENT_CPV, params);
    return data;
}

export async function getTenementCPV(id, country) {
    const { data } = await http.get(`${process.env.SDC_SEARCH_API + config.GET_TENENT_CPV}${id}&country=${country}`);
    return data;
}

export async function updateTenantTenderMarker(params) {
    const { data } = await http.post(process.env.SDC_SEARCH_API + config.UPDATE_TENENT_TENDER_MARKER, params);
    return data;
}

export async function getSubscribedPartyTsByTenantId(id) {
    const { data } = await http.get(`${config.GET_SUBSCRIBED_USERS}${id}`);
    return data;
}

export async function getNotSubscribedPartyTsByTenantId(id) {
    const { data } = await http.get(`${config.GET_NOT_SUBSCRIBED_USERS}${id}`);
    return data;
}