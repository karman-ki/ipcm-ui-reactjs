import { NavLink } from "react-router-dom";
import React, { useState } from 'react'
import BrandLogo from './logo.png'
import { BsPersonSquare } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";


function Login () {
    var login = document.getElementById("header-login");
    var loggedIn = document.getElementById("header-logged-in");

    if(loggedIn.style.display != "flex") {
        loggedIn.style.display = "flex";
        login.style.display = "none";
    }

}

function Header() {

    const [isOpen, setOpen] = useState(false);

    const ToggleSidebar = () => {

        setOpen(current => !current);

        var nav = document.getElementById("nav");
        var con = document.getElementById("content");
        var texts = document.getElementsByClassName("navlink-text")

        if (!isOpen) {
            //navCon.style.display = "none";
            for(var i = 0;i<texts.length;i++){
                texts[i].style.display = "none";
            }
            nav.style.width = "var(--navbar-min-width)";
            nav.style.backgroundColor = "var(--navbar-background-color)"
            con.style.marginLeft = "var(--navbar-min-width)";
            con.style.width = "calc(100% - var(--navbar-min-width))"
        } else {
            //navCon.style.display = "block";
            for(var i = 0;i<texts.length;i++){
                texts[i].style.display = "inline-block";
            }
            nav.style.width = "var(--navbar-max-width)";
            nav.style.backgroundColor = "transparent"
            con.style.marginLeft = "var(--navbar-max-width)";
            con.style.width = "calc(100% - var(--navbar-max-width))"
        }
    }

    return (
        <>
            <div id="header">
                <div className="header-left">
                    <div className="nav-brand">
                        <img className="brand-logo" src={BrandLogo}></img>
                        <h1 className="main-title" >iPCM Leaderboard</h1>
                    </div>
                    <div id="nav-top">
                        <GiHamburgerMenu onClick={ToggleSidebar} />
                    </div>
                </div>
                <div id="header-login">
                    <div onClick={Login} className="profile-link">
                        <FiLogIn></FiLogIn>
                        <span>Login</span>
                    </div>
                </div>
                <div id="header-logged-in">
                    Logged in as
                    <NavLink to="/profile" className={({ isActive }) => (isActive ? "profile-link active" : 'profile-link')}>
                        <BsPersonSquare />
                        <span>Kalle Kalleson</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Header;
