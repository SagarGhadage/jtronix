import axios from "axios";
// export const BACKEND_ENDPOINT = "http://localhost:8082/v1";
export const BACKEND_ENDPOINT = "https://jtronix-kvxp.onrender.com/v1";

export const signUp = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_ENDPOINT}/auth/register`, user)
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const login = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_ENDPOINT}/auth/login`, user)
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}
