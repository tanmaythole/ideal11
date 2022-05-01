import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthContainer = () => {
    const isLoggedIn = useSelector(state => state.loginReducer);

    return isLoggedIn?(
        <>
            <Navigate to='/trading' />
        </>
    ):(
        <div>
            <Outlet />
        </div>
    )
}

export default AuthContainer;