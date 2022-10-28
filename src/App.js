/* src/App.js */
import * as React from 'react';
import '@aws-amplify/ui-react/styles.css';
import { Sidebar } from './Sidebar.js'
import { Outlet } from "react-router-dom";
import './index.css';
import Footer from "./Footer"
import Header from "./Header"


const App = () => {

  return (
    <>
      <div id='page-container'>
        <div id='wrapper'>
          <Header />
          <div>
            <div id='content-wrapper'>
              <Sidebar />
              <div id='content'>
                <Outlet />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default App;

