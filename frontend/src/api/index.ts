import axios, { AxiosInstance } from "axios";

const base_url: string = 'http://localhost:4000/api/';

const $host: AxiosInstance = axios.create({
    baseURL: base_url
})

export { $host }