import React from 'react';
import './style.css';

const SportsNavigation = () => {
    return (
        <div className='sportsNavigation'>
            <div className='sportsCategory active'>
                <span>Cricket</span>
            </div>
            <div className='sportsCategory'>
                <span>Football</span>
            </div>
        </div>
    )
}

export default SportsNavigation;