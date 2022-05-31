import React, { useState } from 'react'
import { FaBars, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BackDrop from '../../BackDrop';
import Sidebar from '../../Sidebar';
import Header from '../Header'

const PrimaryHeader = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    let navigate = useNavigate();

    const handleClose = () => {
        setShowSidebar(false);
    }
    
    return (
        <>
            <Sidebar show={showSidebar} handleClose={handleClose} />
            <BackDrop show={showSidebar} handleClose={handleClose} />
            <Header>
                <FaBars 
                    size={25}
                    color="#fff"
                    className='icon'
                    onClick={() => setShowSidebar(true)}
                />
                <span>MyIdeal11</span>
                <FaWallet 
                    size={25}
                    color="#fff"
                    className='icon'
                    onClick={() => navigate('/wallet')}
                />
            </Header>
        </>
    )
}

export default PrimaryHeader;