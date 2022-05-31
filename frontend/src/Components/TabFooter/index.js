import React from 'react';
import { FaHome, FaSearchengin, FaShoppingBag, FaUserAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css'

const TabFooter = () => {
    const location = useLocation();
    let navigate = useNavigate();

    const TabChange = (tab) => {
        switch (tab) {
            case 'portfolio':
                navigate('/trading/portfolio');
                break;

            case 'profile':
                navigate('/profile');
                break;

            case 'prediction':
                navigate('/prediction');
                break;

            default:
                navigate('/trading');
                break;
        }
    }

    return (
        <div className='TabFooter'>
            <div className={`tabSection ${location.pathname==='/trading'?'active':''}`} onClick={() => TabChange('home')}>
                <div className="icon">    
                    <FaHome 
                        size={22}
                    />
                </div>
                <span>Home</span>
            </div>

            <div className={`tabSection ${location.pathname==='/trading/portfolio'?'active':''}`} onClick={() => TabChange('portfolio')}>
                <div className="icon">
                    <FaShoppingBag 
                        size={22}
                    />
                </div>
                <span>Portfolio</span>
            </div>

            <div className={`tabSection ${location.pathname==='/profile'?'active':''}`} onClick={() => TabChange('profile')}>
                <div className="icon">  
                    <FaUserAlt 
                        size={22}
                    />
                </div>
                <span>My profile</span>
            </div>

            <div className={`tabSection ${location.pathname==='/prediction'?'active':''}`} onClick={() => TabChange('prediction')}>
                <div className="icon">  
                    <FaSearchengin 
                        size={22}
                    />
                </div>
                <span>Prediction</span>
            </div>
        </div>
    )
}

export default TabFooter