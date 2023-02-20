import config from './config.json'
import http from './httpService'

export async function getAllProjects() {
    const { data } = await http.get(process.env.LOCAL_API + config.GET_PROJECTS);
    return data;
}

export async function addNewProject(project, userId) {
    const { data } = await http.post(process.env.LOCAL_API + config.ADD_PROJECT + userId, project);
    return data;
}

export async function updateProject(project, userId) {
    const { data } = await http.patch(process.env.LOCAL_API + config.UPDATE_PROJECT + userId, project);
    return data;
}

export async function deleteProject(project, userId) {
    const { data } = await http.delete(process.env.LOCAL_API + config.DELETE_PROJECT + userId, { data: project});
    return data;
}

export async function getSections(projectId) {
    const { data } = await http.get(`${process.env.LOCAL_API + config.GET_SECTIONS}${projectId}`);
    return data;
}

export async function addNewSection(section, userId) {
    const { data } = await http.post(process.env.LOCAL_API + config.ADD_SECTION + userId, section);
    return data;
}

export async function updateSection(section, userId) {
    const { data } = await http.patch(process.env.LOCAL_API + config.UPDATE_SECTION + userId, section);
    return data;
}

export async function deleteSection(section, userId) {
    const { data } = await http.delete(process.env.LOCAL_API + config.DELETE_SECTION + userId, { data: section});
    return data;
}

export async function getMembers(projectId) {
    const { data } = await http.get(`${process.env.LOCAL_API + config.GET_MEMBERS}${projectId}`);
    return data;
}

export async function addNewMember(member, userId) {
    const { data } = await http.post(process.env.LOCAL_API + config.ADD_MEMBER + userId, member);
    return data;
}

export async function deleteMember(member, userId) {
    const { data } = await http.delete(process.env.LOCAL_API + config.DELETE_MEMBER + userId, { data: member});
    return data;
}