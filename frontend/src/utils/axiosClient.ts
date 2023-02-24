import axios from "axios";
import queryString from 'query-string';

// public axiosClient
export const publicAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    params: (params: Record<string, any>) => {
        return queryString.stringify(params);
    },
    paramsSerializer: {
        serialize: (params) => queryString.stringify(params, { arrayFormat: 'bracket' })
    },
})

// private axiosClient
export const privateAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: {
        encode: (params) => queryString.stringify(params)
    }
});
