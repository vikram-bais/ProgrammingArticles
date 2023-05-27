const axios = require('axios');

const url = '';

export const createPost = async (post) => {
    try {
        return await axios.post(url +'/create', post)
    } catch (error) {
        console.log("error while creating Post", error)
    }
}

export const updatePost = async (id, post) => {
    try {
        return await axios.post(url +'/update/'+id, post)
    } catch (error) {
        console.log("error while update Post", error)
    }
}

export const deletePost = async (id) => {
    try {
        return await axios.post(url +'/delete/'+id)
    } catch (error) {
        console.log("error while delete Post", error)
    }
}


export const getAllPost = async (param) => {
    try {
        let response = await axios.get(url+'/posts'+param);
        return response.data;

    } catch (error) {
        console.log("error while getAllPost", error)
    }
}

export const getPost = async (id) => {
    try {
        let response = await axios.post(url+'/post/'+id)
        return response.data;
    } catch (error) {
        console.log("error while getPost ", error);
    }
}

export const uploadFile = async (data) => {
    try {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }
        let response = await axios.post(url+'/upload/file',
            data,
            axiosConfig
        )
        return response
    } catch (error) {
        console.log("error whole uploadFile", error)
    }
}


export const getByUsername = async () => {
    try {
        const axiosConfig = {
            params: {
                'username': localStorage.getItem('username')
            }
        }
        let response = await axios.get(url+'/posts',
            axiosConfig
        )
        return response.data
    } catch (error) {
        console.log("error whole getByUsername", error)
    }
}



export const loginUser = async (data) => {
    try {
        let response = await axios.post(url+'/login', data)
        localStorage.setItem('token', response.data.authToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('status', "loggedin");

        return true
    } catch (error) {
        console.log("error whole loginUser", error)
        return false
    }
}

export const signinUser = async (data) => {
    try {
        let response = await axios.post(url+'/signin', data)
        return true
    } catch (error) {
        console.log("error whole uploadFile", error)
        return false
    }
}