import http from "../http-common";

const getAll = () => {
    return http.get("/events/all");
}

const get = (id) => {
    return http.get(`/events/${id}`);
}

const create = (data) => {
    return http.post("/events/add", data);
}

const update = (id, data) => {
    return http.put(`/events/${id}`, data);
}

const remove = (id) => {
    return http.delete(`/events/${id}`);
}

const getGuests = (id) => {
    return http.get(`/events/${id}/guests`);
}

const addGuest = (id, data) => {
    return http.post(`/events/${id}/addGuest`, data);
}

const addService = (id, data) => {
    return http.post(`/events/${id}/addService`, data);
}

const getServices = (id) => {
    return http.get(`/events/${id}/services`);
}

const getReviews = (id) => {
    return http.get(`/events/${id}/reviews`);
}

const eventService = {
    getAll,
    get,
    create,
    update,
    remove,
    getGuests,
    addGuest,
    addService,
    getServices,
    getReviews
};

export default eventService;
