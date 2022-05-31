import React from 'react'
import style from './style.module.css';

const BackDrop = (props) => {
    const isOpen = props.show?style.backdrop:"";
    return (
        <div className={isOpen} onClick={() => props.handleClose()}>
            {props.children}
        </div>
    )
}

export default BackDrop;