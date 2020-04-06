import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logo from '../assets/logo.jpg';
import camera from '../assets/camera.png';

export default function Header() {
    return (
        <div id='main-header'>
            <div className='header-content'>
                    <Link to='/'>
                        <img src={logo} className='logo' alt="InstaRocket"/>
                    </Link>
                    <Link  to='/new'>
                        <img src={camera}  className='logo' alt="Enviar publicação"/>
                    </Link>
            </div>
        </div>
    )
}
