import React from 'react'
import SidebarItem from "./SidebarItem"
import items from "./sidebarMenuData";

import './Sidebar.css';


export default function Sidebar (){
    return (
        <div className='navbar'  id="nav">
			<nav id="nav-content">
          		{ items.map((item, index) => <SidebarItem key={index} item={item} />) }
			</nav>
        </div>
    )
}
