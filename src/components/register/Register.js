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


function Register() {

	const navigate = useNavigate();
	const [authenticated, setauthenticated] = useState(false);
	
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
	});

	const isAuthenticated = sessionStorage.getItem("authenticated");

	if (isAuthenticated) {
		return <Navigate to="/" />
	}

	const initialValues = {
		emailID: '',
		password: '',
	  };

	const handleSubmit = (data) => {
		let params = {};
		params["email_id"] = data["emailID"];
		params["pwd"] = data["password"];

		AuthService.loginValidation(params).then(
			(data) => {
				const res_data = data['data'];
				if(res_data.length > 0){
					setauthenticated(true)
				}else{
					const msg = data['message'];
					toast.error(msg, {
						position: toast.POSITION.TOP_RIGHT
					});
				}
			},(error) =>{
				toast.error(error, {
					position: toast.POSITION.TOP_RIGHT
				});
			}
		)
	}

    return (
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
								<h4 className="login100-form-title font-weight-bold">Create New Account</h4>
								<div className="form-group">
									<label htmlFor="emailID" className="mandatory"> Email </label>
									<Field name="emailID" type="email" className={ 'form-control' + (errors.emailID && touched.emailID ? ' is-invalid' : '') }/>
									<ErrorMessage name="emailID" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group pt-3">
									<label htmlFor="password" className="mandatory"> Password 
										<a href="/forgot-password" className="float-right disabled">
											Forgot Password?
										</a>
									</label>
									<Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
									<ErrorMessage name="password" component="div" className="invalid-feedback" />
								</div>
								<div className="form-group pt-3">
									<button type="submit" className="btn btn-primary" id="signIn">
										Login
									</button>
								</div>
								<div className="form-group">
								Already have an account? <a href="/login" className="link-primary auth-link"> Sign In </a>
								</div>
							</Form>
						)}
					</Formik>
				</div>
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
        </div>
    );
}

export default Register;