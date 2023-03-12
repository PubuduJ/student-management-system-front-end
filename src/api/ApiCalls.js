import axios from "axios";

const url = "http://localhost:8080/app/api/students";

export function PostCall(output) {
    return axios.post(url, output);
}

export function GetCall(nic) {
    return axios.get(`${url}/${nic}`);
}

export function DeleteCall(nic) {
    return axios.delete(`${url}/${nic}`);
}

export function PatchCall(nic, output) {
    return axios.patch(`${url}/${nic}`, output);
}