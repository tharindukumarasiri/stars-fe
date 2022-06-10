import config from './config.json'
import http from './httpService'

export async function searchOrganization(name) {
    const { data } = await http.post(config.ORGANIZATIONS, name);
    return data;
}

export async function getCountries() {
    const { data } = await http.get(config.COUNTRIES);
    return data;
}

export async function getRegions() {
    const { data } = await http.get(config.REGIONS);
    return data;
}

export async function getMunicipalities() {
    const { data } = await http.get(config.MUNICIPALITIES);
    return data;
}