import http from "../http-common";

const getAll = () => {
    return http.get("/services/all");
}

const get = (id) => {
    return http.get(`/services/${id}`);
}

const create = (data) => {
    return http.post("/services/add", data);
}

const update = (id, data) => {
    return http.put(`/services/${id}`, data);
}

const remove = (id) => {
    return http.delete(`/services/${id}`);
}

const getEvents = (id) => {
    return http.get(`/services/${id}/events`);
}

const serviceService = {
    getAll,
    get,
    create,
    update,
    remove,
    getEvents
};

export default serviceService;