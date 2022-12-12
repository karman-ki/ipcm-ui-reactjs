import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoDashboard } from "react-icons/go";
import { CgList } from "react-icons/cg";
import { BiTestTube } from "react-icons/bi";
import { TbDna2 } from "react-icons/tb";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { RiRocket2Line } from "react-icons/ri";


const sidebarMenuData = [
    {
        "title": "Dashboard",
        "icon": <GoDashboard className="nav-img"/>,
        "path": "/",
        "parent": true
    },
    {
        "title": "Create eCRF",
        "icon": <AiOutlinePlusCircle className="nav-img"/>,
        "path": "/create",
        "parent": true,
        
    },
    {
        "title": "Inclusion",
        "icon": <BsFillPersonCheckFill className="nav-img"/>,
        "path": "/inclusion",
        "parent": true,
    },
    {
        "title": "eCRF List",
        "icon": <CgList className="nav-img"/>,
        "path": "/list",
        "parent": true,
        
    },
    {
        "title": "Referral DB",
        "icon": <BiTestTube className="nav-img"/>,
        "path": "/referralDb",
        "parent": true
    },
    {
        "title": "Sequenced",
        "icon": <TbDna2 className="nav-img"/>,
        "path": "/Sequencing",
        "parent": true,
        
    },
    {
        "title": "Curation",
        "icon": <RiRocket2Line className="nav-img"/>,
        "path": "/curation",
        "parent": true,
       
    },
]
;

export default sidebarMenuData;