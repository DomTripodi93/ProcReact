import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/favicon.png';
import './header.styles.scss';

const Header = () => {
    return (
        <div className='header'>
            <Link to='/' className='logo-holder'>
                <img className='logo-holder' src={logo}></img>
            </Link>
            <div className='routes'>
                <Link to='/' className='route'>
                    Home
                </Link>
                <Link to='/schedule' className='route'>
                    Schedule
                    <span className='arrow'></span>
                </Link>
                <Link to='/departments' className='route'>
                    Departments
                </Link>
            </div>
            <div className='edge'>
                <Link to='/logout' className='route'>
                    Log Out
                </Link>            
            </div>
        </div>
    )
}

export default Header;