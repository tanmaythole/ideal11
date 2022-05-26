import React from 'react';
import style from './style.module.css';

const InfoBlock = ({ children }) => {
    return (
        <div className={style.infoBlock}>
            {children}
        </div>
    )
}

InfoBlock.Title = ({ children }) => {
    return (
        <div className={style.title}>
            {children}
        </div>
    )
}

InfoBlock.Property = ({ children }) => {
    return (
        <div className={style.property}>
            {children}
        </div>
    )
}

export default InfoBlock;