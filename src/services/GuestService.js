import http from "../http-common";

const getAll = () => {
    return http.get("/guests/all");
}

const get = (id) => {
    return http.get(`/guests/${id}`);
}

const create = (data) => {
    return http.post("/guests/add", data);
}

const update = (id, data) => {
    return http.put(`/guests/${id}`, data);
}

const remove = (id) => {
    return http.delete(`/guests/${id}`);
}

const getEvents = (id) => {
    return http.get(`/guests/${id}/events`);
}

const guestService = {
    getAll,
    get,
    create,
    update,
    remove,
    getEvents
};

export default guestService;