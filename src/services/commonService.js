import axios from "axios";

const BASE_URL = "http://localhost:8500/ipcm-api/";

const API_URL = BASE_URL + 'iPCM/'

class CommonService {

	async referralList(params){
		const response = await axios.post(API_URL + 'referral_list', params);
		return response.data
	}
	
	async sequencedList(params){
		const response = await axios.post(API_URL + 'sequence_list', params);
		return response.data
	}   

}

export default new CommonService(); 