import http from "../http-common";

const getAll = () => {
    return http.get("/organizers/all");
}

const get = (id) => {
    return http.get(`/organizers/${id}`);
}

const create = (data) => {
    return http.post("/organizers/add", data);
}

const update = (id, data) => {
    return http.put(`/organizers/${id}`, data);
}

const remove = (id) => {
    return http.delete(`/organizers/${id}`);
}

const getEvents = (id) => {
    return http.get(`/organizers/${id}/events`);
}

const organizerService = {
    getAll,
    get,
    create,
    update,
    remove,
    getEvents
};

export default organizerService;