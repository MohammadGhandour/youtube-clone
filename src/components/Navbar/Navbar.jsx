import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logo } from '../../utils/constants';
import './Navbar.css';
import SearchInput from './SearchInput';

function Navbar({ sideBarOpen, setSideBarOpen }) {

    const homepage = useLocation().pathname === '/';
    // const channelPage = window.location.href.includes('/channel');

    return (
        <header>
            <nav className='row-between'>
                <div className='flex-center'>
                    {homepage &&
                        <i className="fa-solid fa-bars" onClick={() => setSideBarOpen(!sideBarOpen)}></i>
                    }
                    <Link to='/'><img src={logo} alt='logo' className='logo' /></Link>
                </div>
                <SearchInput />
            </nav>
        </header>
    )
}

export default Navbar;
