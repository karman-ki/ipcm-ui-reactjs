import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";

import BrandLogo from '../../assets/images/logo/logo.png';

function Header() {

    const [isOpen, setOpen] = useState(false);
    const user_name = sessionStorage.getItem("name");

    const ToggleSidebar = () => {

        setOpen(current => !current);

        var nav = document.getElementById("nav");
        var con = document.getElementById("content");
        var texts = document.getElementsByClassName("navlink-text")

        if (!isOpen) {
            for(var i = 0;i<texts.length;i++){
                texts[i].style.display = "none";
            }
            nav.style.width = "var(--navbar-min-width)";
            nav.style.backgroundColor = "var(--navbar-background-color)"
            // con.style.marginLeft = "var(--navbar-min-width)";
            con.style.width = "calc(100% - var(--navbar-min-width))"
        } else {
            for(var j = 0;j<texts.length;j++){
                texts[j].style.display = "inline-block";
            }
            nav.style.width = "var(--navbar-max-width)";
            nav.style.backgroundColor = "transparent"
            // con.style.marginLeft = "var(--navbar-max-width)";
            con.style.width = "calc(100% - var(--navbar-max-width))"
        }
    }

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('authenticated');
        sessionStorage.clear();
        navigate("/login");
    }

    return (
        <>
            <div id="header">
                <div className="header-left">
                    <div className="nav-brand">
                        <img className="brand-logo" src={BrandLogo} alt="iPCM logo"></img>
                        <h1 className="main-title" >iPCM Leaderboard</h1>
                    </div>
                    <div id="nav-top">
                        <GiHamburgerMenu onClick={ToggleSidebar} />
                    </div>
                </div>
                <div id="header-logged-in">
                    <div onClick={logout} className="logout-btn">
                        <span className='mr-2'>
                            {user_name}
                        </span>
                        <FiLogIn  size={25} ></FiLogIn>
                    </div>
                    {/* <NavLink to="/profile" className={({ isActive }) => (isActive ? "profile-link active" : 'profile-link')}>
                        <BsPersonSquare />
                        <span>{user_name}</span>
                    </NavLink> */}
                </div>
            </div>
        </>
    );
}

export default Header;
