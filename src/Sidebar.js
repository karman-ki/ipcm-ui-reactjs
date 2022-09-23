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








import './index.css';


function showDropdown(id) {
  var dropdown = document.getElementsByClassName("dropdown")[id];
  var dropContent = document.getElementsByClassName("dropdown-content")[id];
  var icon = document.getElementsByClassName("dropdown-icon")[id];


  if (dropContent.style.display != "block") {
    dropContent.style.display = "block";
    icon.classList.add("dropdown-icon-rotated");
    dropdown.style.color = "var(--accent-color)";

  } else {
    dropContent.style.display = "none";
    icon.classList.remove("dropdown-icon-rotated");
    dropdown.style.color = "var(--navbar-text-color)";
  }
}

function hideDropdowns() {
  var dropdowns = document.getElementsByClassName("dropdown");
  var dropContents = document.getElementsByClassName("dropdown-content");
  var icons = document.getElementsByClassName("dropdown-icon");
  var i;

  for (i = 0; i < dropContents.length; i++) {
    dropContents[i].style.display = "none";
    icons[i].classList.remove("dropdown-icon-rotated");
    dropdowns[i].style.color = "var(--navbar-text-color)";
  }

}


export function Sidebar() {

  
  /*
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })

      var nav = document.getElementById("nav");

      if(dimensions.width<768) {
        if()
        nav.classList.add("navbar-top");
      } else {}
    }

    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })*/


  return (
    <div className='navbar' id="nav">
      <div id="nav-content">
        
        <div className="nav-items" >

          <NavLink exact="true" className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/" onClick={hideDropdowns}>
            <GoDashboard />
            <span>Dashboard</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/create" onClick={hideDropdowns}>
            <AiOutlinePlusCircle />
            <span>Create eCRF</span>
          </NavLink>

          <hr className="nav-divider"></hr>

          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/inclusion">
            <AiOutlineSync />
            <span>Inclusion</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/list" onClick={hideDropdowns}>
            <CgList />
            <span>eCRF List</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/referral" >
            <BiTestTube />
            <span>Referral DB</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/sequencing" >
            <TbDna2 />
            <span>Sequencing</span>
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "nav-link active" : 'nav-link')} to="/curation" onClick={hideDropdowns}>
            <RiRocket2Line />
            <span>Curation</span>
          </NavLink>

          
        </div>
      </div>

    </div >
  );
}
