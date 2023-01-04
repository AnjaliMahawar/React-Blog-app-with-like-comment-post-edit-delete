import axios from "axios";
import { getItemLocalStorage } from "../Utils/browserServices";
import { baseUrl } from "../Utils/config";
// import { clearLocalStorage, getItemLocalStorage } from "../Utils/browserServices";

const axiosInstance = axios.create({
    baseURL: baseUrl.apiBaseURL
})
axiosInstance.interceptors.request.use(

    async (config: any) => {
        
        let token: string | null = getItemLocalStorage('token')
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
               "content-type": "multipart/form-data",
            }
        }
        else{
            config.headers = {
              
                "Content-Type": "application/json",
            }
        }
        return config
    }
)

axiosInstance.interceptors.response.use(undefined, (error: any) => {
    if (error.message === "Network Error" && !error.response) {
        console.log("Network error - make sure API is running!");
    }
    if (error.response) {
        const { status } = error.response;
        if (status === 404) {
            console.log("Not Found");
        }
        // if (status === 401) {
        //     if (typeof (window) !== "undefined") {
        //         window.location.href = "/";
        //         clearLocalStorage()
        //         console.log("Your session has expired, please login again");
        //     }
        // }
        return error.response;
    } else {
        // throw transformError(error);
        console.log(error)
        return error
    }
})

export default axiosInstance;