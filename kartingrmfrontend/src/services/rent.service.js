import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/rent/');
}

const getById = id => {
    return httpClient.get(`/api/rent/id/${id}`);
}

const getByRentCode = code => {
    return httpClient.get(`/api/rent/code/${code}`);
} 

const createComplete= data => {
    return httpClient.post("/api/rent/complete", data);
}
const createNoTotal = data => {
    return httpClient.post("/api/rent/nototal", data);
}
const getAvailableSlots = (data) => {
    return httpClient.post("/api/rent/availableSlots", data);
}
const update = data => {
    return httpClient.put('/api/rent/', data);
}

const remove = id => {
    return httpClient.delete(`/api/rent/${id}`);
}


export default {getAll, getById, getByRentCode, createComplete, createNoTotal, getAvailableSlots, update, remove};