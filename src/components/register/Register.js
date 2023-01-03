import React, {useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';

import BrandLogo from '../../assets/images/logo/logo.png';
import AuthService from "../../services/authService";

function Register() {

	const [siteOption, setSiteOption] = useState(null);
	const [showSite, setShowSite] = useState(false);

	const roleOption = [
		{ value: "Pathologist", label: "Pathologist" },
		{ value: "Doctor", label: "Doctor" },
		{ value: "Nurse", label: "Nurse" }
	];
	
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
		firstName: Yup.string()
			.min(4, 'Too Short!')
			.max(50, 'Too Long!')
			.required('First Name is required'),
		lastName: Yup.string()
			.min(4, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Last Name is required'),
		confirmpassword: Yup.string()
			.required('Please retype your password.')
			.oneOf([Yup.ref('password')], 'Your passwords do not match.'),
		role:Yup.string()
			.required('Role is required'),
		site:Yup.string()
			.required('Site is required'),
		acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
			
		});
	

	const isAuthenticated = sessionStorage.getItem("authenticated");

	if (isAuthenticated) {
		return <Navigate to="/Login" />
	}

	const initialValues = {
		emailID: '',
		password: '',
		firstName: '',
		lastName: '',
		confirmpassword: '',
		role: '',
		site:'',
		acceptTerms: false,
	};

	const handleSubmit = (data, {resetForm}) => {

		let params = {};
		params["email_id"] = data["emailID"];
		params["pwd"] = data["password"];
		params["first_name"] = data["firstName"];
		params["last_name"] = data["lastName"];
		params["role"]= data["role"];
		params["site"]= ( data["site"] === '-' ? '': data["site"]);
		AuthService.userRegisteration(params).then(
			(response) => {
				if(response['status']){
					const msg = response['message'];
					toast.success(msg, {
						position: toast.POSITION.TOP_RIGHT
					});
					resetForm({})
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

	useEffect(() => {	
		const siteInfo = []
		AuthService.siteList().then(
			(data) =>{
				const resultSet=data['data'];				
				for (let i = 0; i < resultSet.length; i++)  {								
					siteInfo.push({"label": resultSet[i].site_name, "value" :resultSet[i].site_id})
				}
				setSiteOption(siteInfo);
			}
		) 
	},[])

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
							{({ values, errors, touched, setFieldValue, resetForm, props }) => (
								<Form className="register100-form validate-form" id="signupForm">
									<h4 className="register100-form-title font-weight-bold">Register a new account</h4>
									<div className="form-row">
										<div className="form-group col-6">
												<label htmlFor="firstName" className="mandatory"> First Name </label>
												<Field
													id="firstName"
													name="firstName" 
													placeholder="First Name"
													type="text"
													className={ 'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '') }
												/>
												<ErrorMessage name="firstName" component="div" className="invalid-feedback" />
										</div>
										<div className="form-group col-6">
												<label htmlFor="lastName" className="mandatory"> Last Name </label>
												<Field
													id="lastName"
													name="lastName"
													placeholder="Last Name"
													type="text"
													className={ 'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '') }
												/>
												<ErrorMessage name="lastName" component="div" className="invalid-feedback" />
										</div>
									</div>	
									<div className="form-group">
										<label htmlFor="emailID" className="mandatory"> Email </label>
										<Field 
											name="emailID" 
											type="email"
											placeholder="Email-Id"
											className={ 'form-control' + (errors.emailID && touched.emailID ? ' is-invalid' : '') }
										/>
										<ErrorMessage name="emailID" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<label htmlFor="role" className="mandatory">Role</label> 
										<Select
											name="role"
											options={roleOption}
											placeholder="-- Select Role Option --"
											onChange={(option) => {
												const opt_val = option.value
												setFieldValue("role", opt_val);
												if(opt_val !== "" && opt_val !== "Pathologist"){
													setShowSite(true);
													setFieldValue("site", "");
												} else{
													setShowSite(false);
													setFieldValue("site", "-");
												}
											}}
											className={ '' + (errors.role && touched.role ? ' is-invalid' : '') }
										/>
										<ErrorMessage name="role" component="div" className="invalid-feedback" />
									</div>
									{showSite && (
									<div className="form-group">
										<label htmlFor="site" className="mandatory">Site</label>
										<Select
											name="site"
											options={siteOption}
											placeholder="-- Select Site Option --"
											onChange={(option) => {
												setFieldValue("site", option.value);
											}}
											className={ '' + (errors.site && touched.site ? ' is-invalid' : '') }
										/>
										<ErrorMessage name="site" component="div" className="invalid-feedback" />
									</div>
									)}
									<div className="form-group">
										<label htmlFor="password" className="mandatory"> Password </label>
										<Field 
											name="password" 
											type="password" 
											className={ 'form-control' + (errors.password && touched.password ? ' is-invalid' : '') }
											placeholder="Password"
										/>
										<ErrorMessage name="password" component="div" className="invalid-feedback" />
									</div>
									<div className="form-group">
										<label htmlFor="confirmpassword" className="mandatory"> Confirm Password </label>
										<Field 
											name="confirmpassword" 
											type="password" 
											className={ 'form-control' + (errors.confirmpassword && touched.confirmpassword ? ' is-invalid' : '') }
											placeholder="Confirm Password"
										/>
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