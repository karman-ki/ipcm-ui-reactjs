import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Dashboard from "./components/dashboard/Dashboard";
import Inclusion from "./components/inclusion/Inclusion"
import Curation from "./components/curation/Curation"
import Create from "./components/eCRF/Create"
import List from "./components/eCRF/List"
import Referral from "./components/referral-db/Referral"
import Sequencing from "./components/sequencing/Sequencing"
import Profile from "./components/profile/Profile"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import reportWebVitals from './reportWebVitals';
// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
// Amplify.configure(awsExports);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<Create />} />
          <Route path="inclusion" element={<Inclusion />} />
          <Route path="Curation" element={<Curation />} />
          <Route path="list" element={<List />} />
          <Route path="referral" element={<Referral />} />
          <Route path="sequencing" element={<Sequencing />} />
          <Route path="profile" element={<Profile />} />

          {/*<Route path="*" element={<NoPage />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
