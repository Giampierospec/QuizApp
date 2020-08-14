import axios from "axios";
import Swal from "sweetalert2";

export const ROLES = [
    { role: "admin" },
    { role: "normal" }
];
const renderError = (e) => {
    let err = e;
    if (err.response)
        err = err.response.data;
    Swal.fire({
        title: "An error has ocurred",
        icon: "error",
        text: err
    });
};

export const putData = async (apiUrl, values, history) => {
    try {
        await axios.put(apiUrl, values);
        history.push('/');
    } catch (e) {
        renderError(e);
    }
};