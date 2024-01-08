import config from './config.json'
import http from './httpService'

export async function getAllCollections() {
    const { data } = await http.get(config.GET_DRAWING_COLLECTIONS);
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

export async function getAllDrawings() {
    const { data } = await http.get(config.GET_DRAWING_ITEMS);
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