import React from 'react';
import style from '../style.module.css';

const Row = ({ children }) => {
    return (
        <div className={style.row}>
            {children}
        </div>
    )
}

export default Row;