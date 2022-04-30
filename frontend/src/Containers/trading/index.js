import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from '../../Components/AppHeader';
import TabFooter from '../../Components/TabFooter';
import './style.css';

const Trading = () => {
    return (
        <div>
            <AppHeader />
            <Outlet />
            <TabFooter />
        </div>
    )
}

export default Trading;