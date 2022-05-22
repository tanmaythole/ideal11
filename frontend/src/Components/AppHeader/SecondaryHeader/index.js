import React from 'react'
import { FaAngleLeft, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const SecondaryHeader = (props) => {
    let navigate = useNavigate();

    return (
        <Header>
            <FaAngleLeft 
                size={25}
                color="#fff"
                className='icon'
                onClick={() => navigate(-1)}
            />
            <span>{props.children}</span>
            <FaWallet
                size={25}
                color="#fff"
                className='icon'
                onClick={() => navigate('/wallet')}
            />
        </Header>
    )
}

export default SecondaryHeader;