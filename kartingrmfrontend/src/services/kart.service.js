import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/karts/');
}

const create = data => {
    return httpClient.post("/api/karts/", data);
}

const getById = id => {
    return httpClient.get(`/api/karts/${id}`);
}

const getByKartId = kartId => {
    return httpClient.get(`/api/karts/${kartId}`);
} 

const update = data => {
    return httpClient.put('/api/karts/', data);
}

const remove = id => {
    return httpClient.delete(`/api/karts/${id}`);
}

const getByModel = model => {
    return httpClient.get(`/api/akrts/${model}`);
}

const getByStatus = status => {
    return httpClient.get(`/api/akrts/${status}`);
}

export default {getAll, create, getById, getByKartId, update, remove, getByModel, getByStatus};