import axios from "axios";

const getDeviceIp = async () => {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");
        return response.data.ip;
    } catch (error) {
        return "";
    }
};

export default getDeviceIp;
