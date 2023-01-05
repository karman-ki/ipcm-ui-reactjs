import React, {useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import commonService from "../../services/commonService";

import AuthService from "../../services/authService";

const siteInfo = [];	
siteInfo.push(<option key={""} value={""}>{"-- Select option --"}</option>);

AuthService.siteList().then(
    (data) =>{
        const resultSet=data['data'];				
        for (let i = 0; i < resultSet.length; i++)  {								
            siteInfo.push(<option key={resultSet[i].site_id} value={resultSet[i].site_id}>{resultSet[i].site_name}</option>);	
            
        }
    }
) 	
    
    
const cancerTypeInfo=[];
cancerTypeInfo.push(<option key={""} value={""}>{"-- Select option --"}</option>);
commonService.cancerTypeList().then(
    (data)=>{
        //console.log("The data in the CancerType",data)
        const resultSet=data['data'];	           			
        for (let i = 0; i < resultSet.length; i++)  {								
            cancerTypeInfo.push(<option key={resultSet[i].t_id} value={resultSet[i].t_id}>{resultSet[i].tissue_name}</option>);	
            
        }
    }
    
) 	

const cancerSubTypeInfo=[]; 
cancerSubTypeInfo.push(<option key={""} value={""}>{"-- Select option --"}</option>);
                 

function Create() {
    const validationSchema = yup.object().shape({
        studyId: yup
            .string()
            .required("Required"),
        birthDate: yup
            .date()
            .required("Required").nullable,
        hospital: yup
            .string()
            .required("Required"),
        cancerFraction: yup
            .number(),           
        cancerType: yup
            .string(),
        cancerSub: yup
            .string(),
        cancerTissue: yup
            .string(),
        ffpe: yup
            .boolean(),
        cytology: yup
            .boolean(),
        cfDna: yup
            .boolean(),
        germlineDna: yup
            .boolean(),
        bloodCollected: yup
            .boolean()
    });

    const [birthDate, setBirthDate] = useState(null);


const initialValues = {
    studyId: '',
    birthDate: null,
    hospital: '',
    cancerFraction: '',
    cancerType: '',
    cancerSub:'',
    cancerTissue:'',
    ffpe: '',
    cytology: '',
    cfDna: '',
    germlineDna:'',
    bloodCollected: '',
  };
  const [cancerType, setCancerType] = useState('');



  const handleChange = (event) => {
    const value = event.target.value;
    const tissue_id = value;
    const params = { "ts_id" : tissue_id};  
    console.log("The value in handle change",params)               
    commonService.cancerSubTypeList(params).then(
        (response)=>{
            console.log("The data in cancersubtype", response)
            const resultSet=response['data'];				
            for (let i = 0; i < resultSet.length; i++)  {								
                cancerSubTypeInfo.push(<option key={resultSet[i].sub_type_code} value={resultSet[i].sub_type_code}>{resultSet[i].sub_type_name}</option>);	
            }
        }
    ) 
    setCancerType(value)
};

  const handleSubmit = (data) => {
    let params = {};
    // const siteName=data["site"]
    params["study_id"] = data["studyId"];
   // params["birth_date"] = data["birthDate"];
    params["hospital"] = data["hospital"];
    
    AuthService.eCRFCreate(params).then(
        (response) => {
            if(response['status']){
                const msg = response['message'];
                toast.success(msg, {
                    position: toast.POSITION.TOP_RIGHT
                });

            }else{
                const msg = response['message'];
                toast.error(msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        },(error) => {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
			
        })			
  }
    

    return (
    <>
    <div class="content-wrapper">		
		<div class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1 class="m-0 text-dark">Create eCRF</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item active">Create eCRF</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
		
        <div className="col-6 pt-2">
            <Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
                        onSubmit={handleSubmit}
						>
                {({ errors, touched, resetForm, props }) => (
							<Form className="register100-form validate-form" id="eCRFForm">
								
								<div className="form-row">
									<div className="form-group col-6">
											<label htmlFor="studyId" className="mandatory"> Study ID </label>
											<Field name="studyId" type="studyId" className={ 'form-control' + (errors.studyId && touched.studyId ? ' is-invalid' : '') }/>
											<ErrorMessage name="studyId" component="div" className="invalid-feedback" />
									</div>
                                   
                                    <div className="form-group col-6">
                                        <label htmlFor="cancerType" >Cancer Type</label>
                                        <Field as="select" name="cancerType" onChange={handleChange} value={cancerType} className={ 'form-control' + (errors.cancerType && touched.cancerType ? ' is-invalid' : '') }>
                                          {cancerTypeInfo} 												
                                        </Field>
                                        <ErrorMessage name="cancerType" component="div" className="invalid-feedback" />
								    </div>
                                </div>
                                
                                <div className="form-row">
									<div className="form-group col-6">
                                    <label htmlFor="birthDate" className="mandatory"> Birth date </label>
                                    <DatePicker 
                                    selected={birthDate}
                                    onChange={(date) => setBirthDate(date)}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    />
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="cancerSub">Cancer Sub Type</label>
                                        <Field as="select" name="cancerSub"  className={ 'form-control' + (errors.cancerSub && touched.cancerSub ? ' is-invalid' : '') }>
                                        {cancerSubTypeInfo}
                                        </Field>
                                        <ErrorMessage name="cancerSub" component="div" className="invalid-feedback" />
								    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label htmlFor="hospital" className="mandatory">Hospital</label>
                                        <Field as="select" name="hospital" className={ 'form-control' + (errors.hospital && touched.hospital ? ' is-invalid' : '') }>
                                            {siteInfo}													
                                        </Field>
                                        <ErrorMessage name="hospital" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="cancerTissue">Cancer Tissue Type</label>	
                                        		
                                            <label>
                                                <Field type="checkbox" name="checked" value="FFPE" />
                                                FFPE
                                                <Field type="checkbox" name="checked" value="Cytology" />
                                                Cytology
                                                <Field type="checkbox" name="checked" value="cfDNA" />
                                                cfDNA
                                            </label>
                                           
                                        <label> 
                                            <Field type ="checkbox" name="checked" value="germlineDna"/>
                                            Germline DNA
                                        </label> 
                                        <div>
                                        <label>
                                           <Field type="checkbox" name="checked" value="bloodCollected"/>
                                            Blood Collected Before Treatment Start
                                        </label>
                                        </div>
                                    </div>    
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label htmlFor="cancerFraction" className="mandatory">Cancer Cell Fraction</label>
                                        <Field as="text" name="cancerFraction" className={ 'form-control' + (errors.cancerFraction && touched.cancerFraction ? ' is-invalid' : '') }>											
                                        </Field>
                                        <ErrorMessage name="cancerFraction" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group pt-3 pb-3">
									<button type="submit" className="btn btn-primary btn-block" id="submit">
										Submit
									</button>
								</div>
							</Form>
						)}
					</Formik>
                     <div className=" col-12 footer">
					<strong>iPCM Leaderboard</strong> &copy;2022, All rights reserved.
				</div>
			   	</div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
	</div></>
    
    );  
}
export default Create; 