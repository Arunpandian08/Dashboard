import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import userIcon from '../../assets/user-img.jpg'

const Navbar = ({ selectedUser }) => {
    return (
        <nav>
            <div className='navbar'>
                <div className='row-wrapper'>
                    <div className="navbar-brand">
                        <NavLink to='/' className="brand-name">DASHBOARD</NavLink>
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
                            {selectedUser ? (
                                <li key={selectedUser.id}>
                                    {selectedUser.name}
                                </li>
                            ) : ('User')}
                            <li><img src={userIcon} width='50' alt="user-profile" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar