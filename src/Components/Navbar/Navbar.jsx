import React from 'react'
import './navbar.css'
import userIcon from '../../assets/user-img.jpg'

const Navbar = () => {
    return (
        <nav>
            <div className='navbar'>
                <div className='row-wrapper'>
                    <div className="navbar-brand">
                        <h2 className="brand-name">DASHBOARD</h2>
                    </div>
                    <div className="dropdown">
                        <button className="drop-btn">Select user &nbsp;
                            <i className="bi bi-chevron-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>
                <div className="user-options">
                    <div className="row-wrapper">
                        <ul className='user-option-list'>
                            <li><i className="bi bi-bell-fill"></i></li>
                            <li><i className="bi bi-gear-fill"></i></li>
                        </ul>
                        <ul className='user-detail'>
                            <li>userName</li>
                            <li><img src={userIcon} width='50' alt="user-profile" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar