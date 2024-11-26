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
                    <form className="search">
                        <input type="text" className="input" />
                        <i className="bi bi-search"></i>
                    </form>
                </div>
                <div className="user-options">
                    <div className="row-wrapper">
                        <ul className='user-option-list'>
                            <li>
                                <i className="bi bi-bell-fill notification"></i>
                                <span></span>
                            </li>
                            <li><i className="bi bi-gear-fill settings"></i></li>
                        </ul>
                        <ul className='user-detail'>
                            <li>Mrs. Dennis Schulist</li>
                            <li><img src={userIcon} width='50' alt="user-profile" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar