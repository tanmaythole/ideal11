import React from 'react';
import './style.css';

const Header = (props) => {
    return (
        <div className='AppHeader'>
            {props.children}
        </div>
    )
}

export default Header;