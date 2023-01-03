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
	async curationList(params){
		const response = await axios.post(API_URL + 'curation_list', params);
		return response.data
	} 
	async updateCurationList(params){
		const response = await axios.post(API_URL + 'update/curation', params);
		return response.data 
	}
	async uploadPdfReport(params){
		const response = await axios.post(API_URL + 'upload_pdf', params);
		return response.data 
	}
	async eCRFCreate(){
        const response = await axios.post(API_URL + 'create/eCRF');
        return response.data;
    }
    async cancerSubTypeList(){
        const response = await axios.post(API_URL + 'cancer_sub_type_list');
        return response.data;

}
    async cancerTypeList(){
    const response = await axios.get(API_URL + 'cancer_type_list');
    return response.data;

}
	async update_eCRFList(params){
		const response = await axios.post(API_URL + 'eCRF_list', params);
		return response.data 
	}
	async eCRFInfoList(params){
		const response = await axios.post(API_URL + 'eCRF_info', params);
		return response.data 
	}
	async eCRFApprove(params){
		const response = await axios.post(API_URL + 'eCRF_approve', params);
		return response.data 
	}
	async inclusionList(params){
		const response = await axios.post(API_URL + 'process_sample_list', params);
		return response.data 
	}
}

export default new CommonService(); 