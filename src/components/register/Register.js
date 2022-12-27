import React, {useState } from "react";
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
			.min(4, 'Too Short!')
			.max(50, 'Too Long!')
			.required('First Name is required'),
		lastname: Yup.string()
			.min(4, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Last Name is required'),
		confirmpassword: Yup.string()
			.required('Please retype your password.')
			.oneOf([Yup.ref('password')], 'Your passwords do not match.'),
		role: Yup.string()
			.required('Role is required'),
		site: Yup.string()
			.required('Site is Required'),
		acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
			
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
		acceptTerms: false,
	  };

	  const [showSite, setShowSite] = useState(false);
	  const [roleVal, setRoleVal] = useState('');
	  
	  const handleChange = (event) => {
		const value = event.target.value;
		if(value !== "" && value !== "Pathologist"){
			setShowSite(true);
		}
		else{
			setShowSite(false);
		}
		setRoleVal(value)
	  };
	  
	 const handleSubmit = (data) => {
		let params = {};
		// const siteName=data["site"]
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
			

    return (
		<>
        <div className="container-register100">
			<div className="row wrap-register100">
				<div className="col-5 pt-5">
					<img className="register100-pic" src={BrandLogo} alt="iPCM logo"/>
                    <h2 className="register-app-title"> iPCM leaderboard</h2>
					<div className="form-group text-left pt-1">
						Already have an account? <a href="/login" className="link-primary auth-link"> LogIn </a>
					</div>
				</div>
				<div className="col-6 pt-2">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						>
						{({ errors, touched, resetForm, props }) => (
							<Form className="register100-form validate-form" id="signupForm">
								<h4 className="register100-form-title font-weight-bold">Register a new account</h4>
								<div className="form-row">
									<div className="form-group col-6">
											<label htmlFor="firstname" className="mandatory"> First Name </label>
											<Field name="firstname" type="firstname" className={ 'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '') }/>
											<ErrorMessage name="firstname" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group col-6">
											<label htmlFor="lastname" className="mandatory"> Last Name </label>
											<Field name="lastname" type="lastname" className={ 'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '') }/>
											<ErrorMessage name="lastname" component="div" className="invalid-feedback" />
									</div>
								</div>	
								<div className="form-group">
									<label htmlFor="emailID" className="mandatory"> Email </label>
									<Field name="emailID" type="email" className={ 'form-control' + (errors.emailID && touched.emailID ? ' is-invalid' : '') }/>
									<ErrorMessage name="emailID" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group">
									<label htmlFor="role" className="mandatory">Role</label>
									<Field as="select" name="role" onChange={handleChange} value={roleVal} type="role" className={ 'form-control' + (errors.role && touched.role ? ' is-invalid' : '') }>
										<option value="">-- Select option --</option>
										<option value="Pathologist">Pathologist</option>
										<option value="Doctor">Doctor</option>
										<option value="Nurse">Nurse</option>
									</Field>
									<ErrorMessage name="role" component="div" className="invalid-feedback" />																																							
								</div>
								{showSite && (
								<div className="form-group">
									<label htmlFor="site" className="mandatory">Site</label>
									<Field as="select" name="site" type="site" className={ 'form-control' + (errors.site && touched.site ? ' is-invalid' : '') }>
										{siteInfo}													
									</Field>
									<ErrorMessage name="site" component="div" className="invalid-feedback" />
								</div>
								)}
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
								<div className="form-group pt-2">
									<div className="custom-checkbox custom-control">
										<Field type="checkbox" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
										<label htmlFor="acceptTerms" className="form-check-label">I agree to the <a href="termsandconditions.html">Terms and Conditions </a></label>
										<ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
									</div>
								</div>
								<div className="form-group pt-3 pb-3">
									<button type="submit" className="btn btn-primary btn-block" id="register">
										Register
									</button>
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