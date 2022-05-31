import React from 'react'
import { Link } from 'react-router-dom';
import style from './style.module.css';
import user from '../../assets/images/user.png';
import { FaHome, FaShoppingBag, FaUserAlt, FaWallet } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../store/actions';


const Sidebar = (props) => {
    const isOpen = props.show?style.open:"";
    let dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(setLogout());
    }

    const onclick = () => {
        props.handleClose();
    }
    return (
        <div className={`${style.sidebar} ${isOpen}`}>
            <div className={style.userProfile}>
                <img 
                    src={user} 
                    className={style.userIcon}
                />
                <div className={style.userInfo}>
                    <h3>User Name</h3>
                    <Link onClick={onclick} to="/profile">Profile</Link>
                </div>
            </div>
            <div className={style.sidebarMenu}>
                <ul>
                    <Link onClick={onclick} to="/">
                        <FaHome
                            size={24}
                        />
                        <li>Home</li>
                    </Link>
                    <Link onClick={onclick} to="/profile">
                        <FaUserAlt
                            size={24}
                        />
                        <li>Profile</li>
                    </Link>
                    <Link onClick={onclick} to="/trading/portfolio">
                        <FaShoppingBag
                            size={24}
                        />
                        <li>Portfolio</li>
                    </Link>
                    <Link onClick={onclick} to="/wallet">
                        <FaWallet
                            size={24}
                        />
                        <li>Wallet</li>
                    </Link>
                </ul>
                <Link onClick={logout} to="/login">
                    <FiLogOut
                        size={24}
                    />
                    <li>
                        Logout
                    </li>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar;