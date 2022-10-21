import { NavLink } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { AiOutlineSync } from "react-icons/ai";
import { RiRocket2Line } from "react-icons/ri";
import { VscGraphLine } from "react-icons/vsc";
import { RiTestTubeLine } from "react-icons/ri";
import { VscFile } from "react-icons/vsc";
import { MdOutlineTableChart } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { BsCardChecklist } from "react-icons/bs";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImFilesEmpty } from "react-icons/im";
import { MdOutlineEventNote } from "react-icons/md";
import { ImHourGlass } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import Hamburger from 'hamburger-react'
import React, { useState } from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoDashboard } from "react-icons/go";
import { CgList } from "react-icons/cg";
import { BiTestTube } from "react-icons/bi";
import { TbDna2 } from "react-icons/tb";
import { BsFillPersonCheckFill } from "react-icons/bs";

import './index.css';


export function Sidebar() {

 
  return (
    <div className='navbar' id="nav">
      <div id="nav-content">
        
        <div className="nav-items" >

          <NavLink exact="true" className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/" >
            <GoDashboard className="nav-img"/>
            <span className="navlink-text">Dashboard</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/create" >
            <AiOutlinePlusCircle className="nav-img"/>
            <span className="navlink-text">Create eCRF</span>
          </NavLink>

          <hr className="nav-divider"></hr>

          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/inclusion">
            <BsFillPersonCheckFill className="nav-img"/>
            <span className="navlink-text">Inclusion</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/list" >
            <CgList className="nav-img"/>
            <span className="navlink-text">eCRF List</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/referral" >
            <BiTestTube className="nav-img"/>
            <span className="navlink-text">Referral DB</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/sequencing" >
            <TbDna2 className="nav-img"/>
            <span className="navlink-text">Sequencing</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/curation" >
            <RiRocket2Line className="nav-img"/>
            <span className="navlink-text">Curation</span>
          </NavLink>

          
        </div>
      </div>

    </div >
  );
}
