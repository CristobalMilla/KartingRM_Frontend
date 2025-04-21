import axios from "axios";

const kartingRMBackendServer = import.meta.env.VITE_KARTINGRM_BACKEND_SERVER;
const kartingRMBackendPort = import.meta.env.VITE_KARTINGRM_BACKEND_PORT;

console.log(kartingRMBackendServer);
console.log(kartingRMBackendPort);

export default axios.create({
    baseURL: `http://${kartingRMBackendServer}:${kartingRMBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});