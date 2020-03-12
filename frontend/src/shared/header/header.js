import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/favicon.png';
import './header.styles.scss';

const Header = () => {
    return (
        <div className='header'>
            <Link to='/' className='logo-holder'>
                <img className='logo-holder' alt='logo' src={logo}></img>
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
                <Link to='/signout' className='route'>
                    Log Out
                </Link>            
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
  });


export default connect(mapStateToProps)(Header);