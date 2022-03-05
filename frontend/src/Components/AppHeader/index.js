import React from 'react'
import './style.css';
import { FaBars, FaWallet } from 'react-icons/fa';

const AppHeader = () => {
    return (
        <div className='AppHeader'>
            <FaBars 
                size={25}
                color="#fff"
                className='icon'
            />
            <span>MyIdeal11</span>
            <FaWallet 
                size={25}
                color="#fff"
                className='icon'
            />
        </div>
    )
}

export default AppHeader;