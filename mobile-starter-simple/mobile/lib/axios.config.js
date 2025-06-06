import _ from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IP_ADDRESS = "10.5.222.148"// change to your ip address
export const axios = _.create({
    baseURL: `http://10.12.73.116:6001/api/v1`,
    timeout: 5000,// 5 seconds
});

// Get the token from AsyncStorage
AsyncStorage.getItem("token")
    .then((token) => {
        if (!token) return;
        // Set the token as the authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    })
    .catch((error) => {
        console.log("Error retrieving token from AsyncStorage:", error);
    });

export default axios;