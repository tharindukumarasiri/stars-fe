import config from './config.json'
import http from './httpService'

export async function getAllCollections(userId) {
    const { data } = await http.get(`${config.GET_DRAWING_COLLECTIONS}${userId}`);
    return data;
}

export async function addNewCollection(userId, payload) {
    const { data } = await http.post(`${config.ADD_DRAWING_COLLECTIONS}${userId}`, payload);
    return data;
}

export async function updateCollection(userId, payload) {
    const { data } = await http.put(`${config.UPDATE_DRAWING_COLLECTION}${userId}`, payload);
    return data;
}

export async function deleteCollection(userId, payload) {
    const { data } = await http.delete(`${config.DELETE_DRAWING_COLLECTION}${payload?.Id}&userId=${userId}`, { data: payload });
    return data;
}

export async function getAllDrawings(collectionId) {
    const { data } = await http.get(`${config.GET_DRAWING_ITEMS}${collectionId}`);
    return data;
}

export async function addNewDrawing(userId, payload) {
    const { data } = await http.post(`${config.ADD_DRAWING_ITEM}${userId}`, payload);
    return data;
}

export async function updateDrawing(userId, payload) {
    const { data } = await http.put(`${config.UPDATE_DRAWING_ITEM}${userId}`, payload);
    return data;
}

export async function deleteDrawing(userId, payload) {
    const { data } = await http.delete(`${config.DELETE_DRAWING_ITEM}${payload?.Id}&userId=${userId}`, { data: payload });
    return data;
}

export async function getDrawingImages(userId) {
    const { data } = await http.get(`${config.GET_DRAWING_IMAGES}${userId}`);
    return data;
}

export async function addNewDrawingImage(userId, payload) {
    const { data } = await http.post(`${config.ADD_DRAWING_IMAGE}${userId}`, payload);
    return data;
}

export async function getWorkInstructions() {
    const { data } = await http.get(config.GET_WORK_INSTRUCTIONS);
    return data;
}

export async function getSoftwareSystems() {
    const { data } = await http.get(config.GET_SOFTWARE_SYSTEMS);
    return data;
}

export async function getForms(userId) {
    const { data } = await http.get(`${config.GET_FORMS}`);
    return data;
}

export async function addNewForm(userId, payload) {
    const { data } = await http.post(`${config.ADD_FORM}${userId}`, payload);
    return data;
}