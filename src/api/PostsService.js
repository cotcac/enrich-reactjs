import { http, httpNoAuth } from "../helper/httpCommon";

const getAll = (page) => {
    return httpNoAuth.get("/posts/?page=" + page);
};

const getOne = (id) => {
    return httpNoAuth.get("/posts/" + id);
};

const create = (data) => {
    return http.post("/posts/", data);
};
const update = (id, data) => {
    return http.put(`/posts/${id}/`, data);
};

const search = (query, page) => {
    return httpNoAuth.get("/posts/?search=" + query + "&page=" + page);
};
const topic = (topic, page) => {
    return httpNoAuth.get("/posts?topic=" + topic + "&page=" + page);
};
const PostsService = {
    getAll,
    getOne,
    search,
    create, 
    update,
    topic,
};

export default PostsService;