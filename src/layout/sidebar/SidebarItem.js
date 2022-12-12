import React, { useState } from "react";
import { NavLink } from "react-router-dom";


export default function SidebarItem({item}){
    const [open, setOpen] = useState(false)

    if(item.childrens){
        return (
            <>  
                <div className={open ? "sidebar-item open" : "sidebar-item"}>
                    <div className="sidebar-title">
                        <span>
                            {/* { item.icon && <i className={item.icon}></i> } */}
                            {item.icon}
                            {item.title}    
                        </span> 
                        <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                    </div>
                    <div className="sidebar-content">
                        { item.childrens.map((child, index) => <SidebarItem key={index} item={child} />) }
                    </div>
                </div>
            </>
        )
    }else{       
        return (
            <>  
                {item.parent ? (
                    <div className="menu-parent">
                        <div className="parent-title">
                            <NavLink key={item.title} exact="true" className={({ isActive }) => (isActive ? "menu-parent plain active" : 'menu-parent plain')} to={item.path || "#"} >
                                {item.icon}
                                <span className="navlink-text">
                                {item.title}   
                                </span>  
                            </NavLink>
                        </div>
                    </div>

                ) :(
                    <>
                    <NavLink key={item.title} exact="true" className={({ isActive }) => (isActive ? "sidebar-item plain active" : 'sidebar-item plain')}  to={item.path || "#"} >
                        {item.icon}
                        <span className="navlink-text">
                            {item.title}    
                        </span> 
                    </NavLink>
                    <hr className="nav-divider"></hr>
                    </>
                ) }

            </>
        )
    }
}