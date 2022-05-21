import React from 'react';
import style from './style.module.css';

const Button = (props) => {
    const styleComponent = {
        background: props.bg,
        color: props.color,
        margin: props.margin,
        border: props.border
    }

    return (
        <div>
            <button 
                className={`${style.btn}`} 
                style={styleComponent} 
                onClick={props.onclick || null}
            >
                {props.children}
            </button>
        </div>
    )
}

export default Button;