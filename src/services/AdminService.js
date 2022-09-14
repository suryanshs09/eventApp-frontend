import http from "../http-common";

const getAll = () => {
    return http.get("/admins/all");
}

const get = (id) => {
    return http.get(`/admins/${id}`);
}

const create = (data) => {
    return http.post("/admins/add", data);
}

const update = (id, data) => {
    return http.put(`/admins/${id}`, data);
}

const remove = (id) => {
    return http.delete(`/admins/${id}`);
}

const adminService = {
    getAll,
    get,
    create,
    update,
    remove
};

export default adminService;