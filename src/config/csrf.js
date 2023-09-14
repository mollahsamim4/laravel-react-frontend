import axios from "./axios.config";
export const csrf = () => axios.get("/sanctum/csrf-cookie");
