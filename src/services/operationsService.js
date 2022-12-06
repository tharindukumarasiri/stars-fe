import config from './config.json'
import http from './httpService'

//Projects
export async function getAllProjects() {
    const { data } = await http.get(process.env.SDC_PROJECT_API + config.OPERATIONS);
    return data;
}

export async function addNewProject(params) {
    const { data } = await http.post(process.env.SDC_PROJECT_API + config.ADD_OPERATION, params);
    return data;
}

export async function editProject(proId, params) {
    const { data } = await http.post(`${process.env.SDC_PROJECT_API + config.EDIT_OPERATION}${proId}`, params);
    return data;
}

export async function deleteProject(proId) {
    const { data } = await http.post(`${process.env.SDC_PROJECT_API + config.DELETE_OPERATION}${proId}`);
    return data;
}

//Sections
export async function getSections(proId) {
    const { data } = await http.post(`${process.env.SDC_PROJECT_API + config.SECTIONS}${proId}`);
    return data;
}

export async function addNewSection(opId, params) {
    const { data } = await http.post(`${process.env.SDC_PROJECT_API + config.ADD_SECTION}${opId}`, params);
    return data;
}

export async function editSection(opId, secId, params) {
    const { data } = await http.post(`${process.env.SDC_PROJECT_API + config.EDIT_SECTION}${opId}&secId=${secId}`, params);
    return data;
}

//Members
export async function getAllMembers(proId) {
    const { data } = await http.post(`${process.env.SDC_PROJECT_API + config.MEMBERS}${proId}`);
    return data;
}

export async function addNewMember(opId, secId, params) {
    const { data } = await http.post(`${process.env.SDC_PROJECT_API + config.ADD_MEMBER}${opId}&secId=${secId}`, params);
    return data;
}

export async function addMembers(opId, params) {
    const { data } = await http.post(`${process.env.SDC_PROJECT_API + config.ADD_MEMBERS}${opId}`, params);
    return data;
}