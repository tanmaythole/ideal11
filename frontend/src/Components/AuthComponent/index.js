import React from 'react'
import style from './style.module.css';
import logo from '../../assets/images/logo.png'

const AuthComponent = (props) => {
    return (
        <div className={style.authComponent}>
            <img
                src={logo}
                className={style.logo}
                alt="MyIdeal11"
            />
            {props.children}
        </div>
    )
}

export default AuthComponent;