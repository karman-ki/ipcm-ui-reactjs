import { NavLink } from "react-router-dom";
import { RiRocket2Line } from "react-icons/ri";
import React from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoDashboard } from "react-icons/go";
import { CgList } from "react-icons/cg";
import { BiTestTube } from "react-icons/bi";
import { TbDna2 } from "react-icons/tb";
import { BsFillPersonCheckFill } from "react-icons/bs";
// import './index.css';


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
            <span className="navlink-text">Sequenced</span>
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
