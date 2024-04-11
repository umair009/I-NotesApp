import React, { useState, useContext } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { toggleContext } from '../../Context'

const Navbar = () => {
    const theme = useContext(toggleContext);
    function lightTheme() {
        if (theme.toggle === 'dark') {
            theme.setToggle('light')
            document.body.style.backgroundColor = '#dfdfdf';
        } else { }
    }
    function darkTheme() {
        if (theme.toggle === 'light') {
            theme.setToggle('dark')
            document.body.style.backgroundColor = '#333';
        } else { }
    }
    return (
        <>
            <div className='NavbarSection'>
                {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> */}
                <nav className="navbar navbar-expand-lg navColor">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">I-Notes</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <div className='light' onClick={lightTheme}></div>
                                    <div className='dark' onClick={darkTheme}></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
