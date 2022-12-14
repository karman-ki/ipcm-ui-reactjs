import * as React from 'react';
// import '@aws-amplify/ui-react/styles.css';
import { Routes, Route } from "react-router-dom"

import Login from "./components/login/Login";
import Register from './components/register/Register';

import AppComponent from './components/AppComponent';

import Dashboard from "./components/dashboard/Dashboard";
import Create from "./components/eCRF/Create";
import List from "./components/eCRF/List";
import Inclusion from "./components/inclusion/Inclusion";
// import Profile from "./components/profile/Profile"
import ReferralDb from "./components/referral-db/ReferralDb";
import Sequencing from "./components/sequencing/Sequencing";
import Curation from "./components/curation/Curation";


import "bootstrap/dist/css/bootstrap.min.css";
import '@aws-amplify/ui-react/styles.css';
import './App.css';

const App = () => {

	return (
		<>
			<Routes>
				<Route exact path="login" element={<Login />} />
				<Route path="register" element={<Register />} />

				<Route exact path="/" element={<AppComponent />}>
					<Route index element={<Dashboard />} />
					<Route path="create" element={<Create />} />
					<Route path="inclusion" element={<Inclusion />} />
					<Route path="Curation" element={<Curation />} />
					<Route path="list" element={<List />} />
					<Route path="referralDb" element={<ReferralDb />} />
					<Route path="Sequencing" element={<Sequencing />} />
				</Route>
			</Routes>
		</>

	);
}

export default App;

