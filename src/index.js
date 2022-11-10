import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Dashboard from "./Dashboard";
import Inclusion from "./Inclusion"
import Curation from "./Curation"
import Create from "./Create"
import List from "./List"
import Referral from "./Referral"
import Sequencing from "./Sequencing"
import Profile from "./Profile"

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
