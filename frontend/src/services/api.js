import axios from "axios";
import { estimateCarbon, simulateCarbon as mockSimulate } from "../utils/helpers";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || ""
});

async function safePost(path, data) {
    if (!API.defaults.baseURL) {
        // no backend URL configured, return mock.
        console.warn("No API URL configured, using mock implementation for", path);
        if (path === "/api/calculate") {
            return { data: estimateCarbon(data) };
        }
        if (path === "/api/simulate") {
            return { data: mockSimulate(data.base_data, data.adjustments) };
        }
    }

    try {
        return await API.post(path, data);
    } catch (err) {
        console.warn("API call failed, falling back to mock:", path, err);
        if (path === "/api/calculate") {
            return { data: estimateCarbon(data) };
        }
        if (path === "/api/simulate") {
            return { data: mockSimulate(data.base_data, data.adjustments) };
        }
        throw err;
    }
}

export const calculateCarbon = (data) => safePost("/api/calculate", data);
export const simulateCarbon = (data) => safePost("/api/simulate", data);

export default API;