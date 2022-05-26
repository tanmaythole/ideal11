import React from 'react';
import style from './style.module.css';


const StatCard = ({ children }) => {
    return (
        <div className={style.statCard}>
            {children}
        </div>
    )
}

StatCard.Icon = ({ children }) => {
    return (
        <div className={style.statCardIcon}>
            {children}
        </div>
    )
}

StatCard.Content = ({ children }) => {
    return (
        <div className={style.statCardContent}>
            {children}
        </div>
    )
}
export default StatCard;