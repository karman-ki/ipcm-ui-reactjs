/* src/App.js */
import * as React from 'react';
import '@aws-amplify/ui-react/styles.css';
import { Outlet } from "react-router-dom";
import './index.css';
import Header from "./layout/header/Header"
import { Sidebar } from './layout/sidebar/Sidebar'
import Footer from "./layout/footer/Footer"


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

