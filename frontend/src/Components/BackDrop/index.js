import React from 'react'
import style from './style.module.css';

const BackDrop = (props) => {
    return (
        <div className={style.backdrop}>
            {props.children}
        </div>
    )
}

export default BackDrop;