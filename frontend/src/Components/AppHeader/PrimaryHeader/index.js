import React from 'react'
import { FaBars, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../Header'

const PrimaryHeader = () => {
    let navigate = useNavigate();
    
    return (
        <Header>
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
        </Header>
    )
}

export default PrimaryHeader;