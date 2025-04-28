import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/feeTypes/');
}

const getById = id => {
    return httpClient.get(`/api/feeTypes/${id}`);
}

const create= data => {
    return httpClient.post("/api/feeTypes/", data);
}

const update = data => {
    return httpClient.put('/api/feeTypes/', data);
}

const remove = id => {
    return httpClient.delete(`/api/feeTypes/${id}`);
}


export default {getAll, getById, create, update, remove};