import React from 'react';
import style from './style.module.css';

const Input = (props) => {
    return (
        <div>
            <input 
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                className={style.input}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input;