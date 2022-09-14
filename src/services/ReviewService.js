import http from "../http-common";

const getAll = () => {
    return http.get("/reviews/all");
}

const get = (id) => {
    return http.get(`/reviews/${id}`);
}

const create = (id, data) => {
    data.eventId = id;
    return http.post("/reviews/add", data);
}

const update = (id, data) => {
    return http.put(`/reviews/${id}`, data);
}

const remove = (id) => {
    return http.delete(`/reviews/${id}`);
}

const reviewService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default reviewService;