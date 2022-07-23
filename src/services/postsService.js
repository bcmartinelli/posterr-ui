import axios from 'axios';

const URL = 'http://localhost:3004';

export const getPosts = async () => {
    return axios
    .get(`${URL}/posts?_sort=id&_order=desc`)
    .then(res => {
        return res;
    }).catch(er => {
        console.error(er);
        return [];
    });
}

export const getPostsByUser = async (userId) => {
    return axios
    .get(`${URL}/posts?user.id=${userId}&_sort=id&_order=desc`)
    .then(res => {
        return res;
    }).catch(er => {
        console.error(er);
        return [];
    });
}

export const getProfile = async (username) => {
    return axios
    .get(`${URL}/profile?username=${username}`)
    .then(res => {
        return res;
    }).catch(er => {
        console.error(er);
        return [];
    });
}

export const getCurrentUser = async (idUser) => {
    return axios
    .get(`${URL}/profile?id=${idUser}`)
    .then(res => {
        return res;
    }).catch(er => {
        console.error(er);
    });
}

export const updateFollow = async (obj) => {
    return axios
    .put(`${URL}/profile/${obj.id}`, obj)
    .then(res => {
        return res;
    }).catch(er => {
        console.error(er);
    });
}


export const savePost = async (obj) => {
    return axios
    .post(`${URL}/posts`, obj)
    .then(res => {
        return res;
    }).catch(er => {
        console.error(er);
        return null;
    });
}