import * as React from 'react';
// import '@aws-amplify/ui-react/styles.css';

import { Outlet, Navigate } from "react-router-dom";

import Header from "../layout/header/Header";
import Sidebar from '../layout/sidebar/Sidebar';
import Footer from "../layout/footer/Footer";

const AppComponent = () => {

  const isAuthenticated = sessionStorage.getItem("authenticated");

	if (!isAuthenticated) {
		return <Navigate to="/login" />
	}

  return (
	<>
	  <div id='page-container'>
		<div id='wrapper'>
			<Header />
			<div id='content-wrapper'>
			  <Sidebar />
			  <div id='content'>
				<Outlet />
			  </div>
			</div>
			<Footer />
		</div>
	  </div>
	</>
  );
}

export default AppComponent;