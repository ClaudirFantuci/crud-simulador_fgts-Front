import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="navbar-menu">
                    <li className={location.pathname === '/' ? 'active' : ''}>
                        <Link to="/">
                            Nova Simulação
                        </Link>
                    </li>
                    <li className={location.pathname === '/simulacoes' ? 'active' : ''}>
                        <Link to="/simulacoes">
                            Minhas Simulações
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;