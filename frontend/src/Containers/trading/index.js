import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import TabFooter from '../../Components/TabFooter';
import './style.css';

const Trading = () => {
    const isLoggedIn = useSelector(state => state.loginReducer);

    return isLoggedIn?(
        <>
            <Outlet />
        </>
    ):(
        <Navigate to='login' />
    )
}

export default Trading;