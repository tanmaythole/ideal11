import React from 'react';
import style from './style.module.css';

const Button = (props) => {
    return (
        <div>
            <button className={style.btn} onClick={props.onclick}>
                {props.children}
            </button>
        </div>
    )
}

export default Button;