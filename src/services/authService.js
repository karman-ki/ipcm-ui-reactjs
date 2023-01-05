import axios from "axios";

const BASE_URL = "http://localhost:8500/ipcm-api/";

const API_URL = BASE_URL + 'AUTH/'

class AuthService {

    async siteList(){
        const response = await axios.get(API_URL + 'site_list');
        return response.data;
    }

    async userRegisteration(params){
        const response = await axios.post(API_URL + 'register', params);
        return response.data;
    }

    async loginValidation(params){
        const response = await axios.post(API_URL + 'login', params);
        return response.data;
    }
    
}

export default new AuthService(); 