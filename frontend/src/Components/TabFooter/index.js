import React from 'react';
import { FaEllipsisH, FaHome, FaShoppingBag, FaUserAlt } from 'react-icons/fa';
import './style.css'

const TabFooter = () => {
    return (
        <div className='TabFooter'>
            <div className='tabSection active'>
                <div className="icon">    
                    <FaHome 
                        size={25}
                    />
                </div>
                <span>Home</span>
            </div>

            <div className='tabSection'>
                <div className="icon">
                    <FaShoppingBag 
                        size={25}
                    />
                </div>
                <span>Portfolio</span>
            </div>

            <div className='tabSection'>
                <div className="icon">  
                    <FaUserAlt 
                        size={25}
                    />
                </div>
                <span>My profile</span>
            </div>

            <div className='tabSection'>
                <div className="icon">  
                    <FaEllipsisH 
                        size={25}
                    />
                </div>
                <span>More</span>
            </div>
        </div>
    )
}

export default TabFooter