import React from 'react';
import style from './style.module.css';

const ProfilePart = ({ children, title }) => {
    return (
        <div className={style.profilePart}>
            <div className={style.titleBar}>
                {title}
            </div>
            <div className={style.content}>
                {children}
            </div>
        </div>
    )
}

export default ProfilePart;