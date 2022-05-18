import React from 'react'
import './style.css';
import { FaBars, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

const AppHeader = () => {
    let navigate = useNavigate();
    return (
        <>
            <Sidebar />
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
                    onClick={() => navigate('/wallet')}
                />
            </div>
        </>
    )
}

export default AppHeader;