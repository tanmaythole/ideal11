import React from 'react'
import { Link } from 'react-router-dom';
import style from './style.module.css';

const Sidebar = () => {
    const onclick = () => {
        
    }
    return (
        <div className={`${style.sidebar} ${style.open}`}>
            <div className={style.sidebarMenu}>
                <ul>
                    <li>
                        <Link onClick={onclick} to="header">Home</Link>
                    </li>
                    <li>
                        <Link onClick={onclick} to="about" >About</Link>
                    </li>
                    <li>
                        <Link onClick={onclick} to="services" >Services</Link>
                    </li>
                    <li>
                        <Link onClick={onclick} to="projects" >Projects</Link>
                    </li>
                    <li>
                        <Link onClick={onclick} to="blogs" >Blogs</Link>
                    </li>
                    <li>
                        <Link onClick={onclick} to="contact" >Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;