import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/receipt/');
}

const getById = id => {
    return httpClient.get(`/api/receipt/id/${id}`);
}
const getByRentId = id => {
    return httpClient.get(`/api/receipt/rent/${id}`);
}
const create= data => {
    return httpClient.post("/api/receipt/", data);
}

const update = data => {
    return httpClient.put('/api/receipt/', data);
}

const remove = id => {
    return httpClient.delete(`/api/receipt/${id}`);
}


export default {getAll, getById, getByRentId, create, update, remove};