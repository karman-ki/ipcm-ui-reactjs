import React, { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

import BrandLogo from '../../assets/images/logo/logo.png';
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
	
function Register() {

	const navigate = useNavigate();
	const [authenticated, setauthenticated] = useState(false);

	//Field validation using Yup hook
		const validationSchema = Yup.object().shape({
		emailID: Yup.string()
			.required('Email is required')
			.email('Email is invalid'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters')
			.max(15, 'Password must not exceed 15 characters')
			.matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
			.matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
			.matches(/^(?=.*[0-9])/, 'Must contain at least one number')
			.matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
		firstname: Yup.string()
			.min(6, 'Too Short!')
			.max(50, 'Too Long!')
			.required('First Name is required'),
		lastname: Yup.string()
			.min(6, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Last Name is required'),
		confirmpassword: Yup.string()
			.required('Please retype your password.')
			.oneOf([Yup.ref('password')], 'Your passwords do not match.'),
		role: Yup.string()
			.required('Role is required'),
		site: Yup.string()
			.required('Site is Required')
		});
	

	const isAuthenticated = sessionStorage.getItem("authenticated");

	if (isAuthenticated) {
		return <Navigate to="/Login" />
	}

	const initialValues = {
		emailID: '',
		password: '',
		firstname: '',
		lastname: '',
		confirmpassword: '',
		role:'',
		site:'',
	  };		
	  
	 const handleSubmit = (data) => {
		let params = {};
		const siteName=data["site"]
		params["email_id"] = data["emailID"];
		params["pwd"] = data["password"];
		params["first_name"] = data["firstname"];
		params["last_name"] = data["lastname"];
		params["role"]= data["role"];
		params["site"]= data["site"];
		
		
		AuthService.userRegisteration(params).then(
			(response) => {
				if(response['status']){
					const msg = response['message'];
					toast.success(msg, {
						position: toast.POSITION.TOP_RIGHT
					});
					navigate("/login");							
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
			console.log("SiteInformation",siteInfo)

    return (
		<>
        <div className="container-login100">
			<div className="row wrap-login100">
				<div className="col-7">
					<img className="login-logo" src={BrandLogo}></img>
                    <h2 className="login-app-title"> iPCM leaderboard</h2>
				</div>
				<div className="col-5">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						>
						{({ errors, touched, resetForm }) => (
							<Form className="login100-form validate-form" id="signupForm">
								<h4 className="login100-form-title font-weight-bold">Register a new account</h4>
								<div className="form-group">
									<label htmlFor="firstname" className="mandatory"> First Name </label>
									<Field name="firstname" type="firstname" className={ 'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '') }/>
									<ErrorMessage name="firstname" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group">
									<label htmlFor="lastname" className="mandatory"> Last Name </label>
									<Field name="lastname" type="lastname" className={ 'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '') }/>
									<ErrorMessage name="lastname" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group">
									<label htmlFor="emailID" className="mandatory"> Email </label>
									<Field name="emailID" type="email" className={ 'form-control' + (errors.emailID && touched.emailID ? ' is-invalid' : '') }/>
									<ErrorMessage name="emailID" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group">
								<label htmlFor="role" className="mandatory">Role</label>
								<Field as="select" name="role" type="role" className={ 'form-control' + (errors.role && touched.role ? ' is-invalid' : '') }>
								<option value="">-- Select option --</option>
								<option value="Pathologist">Pathologist</option>
								<option value="Doctor">Doctor</option>
								<option value="Nurse">Nurse</option>
								</Field>
								<ErrorMessage name="role" component="div" className="invalid-feedback" />																																							
								</div>
									
								<div className="form-group">
								<label htmlFor="site" className="mandatory">Site</label>
								<Field as="select" name="site" type="site" className={ 'form-control' + (errors.site && touched.site ? ' is-invalid' : '') }>
									{siteInfo}													
								</Field>
								<ErrorMessage name="site" component="div" className="invalid-feedback" />
								</div>
								
								<div className="form-group">
									<label htmlFor="password" className="mandatory"> Password </label>
									<Field name="password" type="password" className={ 'form-control' + (errors.password && touched.password ? ' is-invalid' : '') }/>
									<ErrorMessage name="password" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group">
									<label htmlFor="confirmpassword" className="mandatory"> Confirm Password </label>
									<Field name="confirmpassword" type="password" className={ 'form-control' + (errors.confirmpassword && touched.confirmpassword ? ' is-invalid' : '') }/>
									<ErrorMessage name="confirmpassword" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group pt-3">
									<button type="submit" className="btn btn-primary" id="signIn">
										Register
									</button>
								</div>
								<div className="form-group">
								Already have an account? <a href="/login" className="link-primary auth-link"> Log In </a>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div className=" col-12 footer">
					<strong>iPCM Leaderboard</strong> &copy;2022, All rights reserved.
				</div>
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
	</>
    );
}

export default Register;