import React from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../store/actions';
import style from './style.module.css';

const AlertMessage = (props) => {
    let alert = useSelector(state => state.alertReducer);

    let dispatch = useDispatch();
    let styleComponent = {}

    switch (alert.type) {
        case 'success':
            styleComponent = {
                background: "green",
                color: "#fff"
            }
            break;
        
        case 'danger':
            styleComponent = {
                background: "red",
                color: "#fff"
            }
            break;
        
        case 'warning':
            styleComponent = {
                background: "yellow",
                color: "#333"
            }
            break;
        default:
            break;
    }
    
    const closeMessage = () => {
        dispatch(resetAlert());
    }

    return Object.keys(alert).length?(
        <div className={style.alert}>
            <div className={style.alertBox} style={styleComponent}>
                <h5>
                    {alert.title}
                </h5>
                <p>
                    {alert.message}
                </p>
                <MdClose 
                    className={style.closeIcon}
                    onClick={closeMessage}
                />
            </div>
        </div>
    ): <></>
}

export default AlertMessage;