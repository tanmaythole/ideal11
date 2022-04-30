import React from 'react';
import style from './style.module.css';
import { MdClose } from 'react-icons/md';

const Modal = (props) => {
    const showHideClassName = props.show ? `${style.modal} ${style.displayBlock}` : `${style.modal} ${style.displayNone}`;
    return (
        <div className={showHideClassName}>
            <div className={style.modalMain}>
                {props.children}
            </div>
        </div>
    )
}


Modal.Header = (props) => {
    const styleComponent = {
        background: props.bg,
        color: props.color,
        padding: props.padding,
        fontSize: props.fontSize
    }

    return (
        <div className={style.modalHeader} style={styleComponent}>
            <div>
                {props.children}
            </div>
            <MdClose
                size={20}
                onClick={props.onClose}
                color="red"
                style={{cursor:"pointer"}}
            />
        </div>
    )
}

Modal.Body = (props) => {
    const styleComponent = {
        background: props.bg,
        color: props.color,
        padding: props.padding,
        fontSize: props.fontSize,
        margin: props.margin
    }
    
    return (
        <div className={style.modalBody} style={styleComponent}>
            {props.children}
        </div>
    )
}

export default Modal;