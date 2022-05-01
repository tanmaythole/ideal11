import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AppHeader from '../../Components/AppHeader';
import TabFooter from '../../Components/TabFooter';
import './style.css';

const Trading = () => {
    const isLoggedIn = useSelector(state => state.loginReducer);

    return isLoggedIn?(
        <div>
            <AppHeader />
            <Outlet />
            <TabFooter />
        </div>
    ):(
        <Navigate to='login' />
    )
}

export default Trading;