import React from 'react'
import logo from '../../assets/images/logo.png';
import style from './style.module.css';

const NoDataComponent = ({ children }) => {
    return (
        <div className={style.noDataComponent}>
            <img src={logo} />
            {children}
        </div>
    )
}

export default NoDataComponent;