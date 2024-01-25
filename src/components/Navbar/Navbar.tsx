import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../config/router';
import './Navbar.scss';

interface Route {
  path: string;
  title: string;
  isHeaderElement: boolean;
}

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <header>
        <nav className='navbar'>
          <div className='logo'>Invent</div>
          <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleActiveClass}>
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
          </div>
          <ul className={`navMenu ${isActive ? 'active' : ''}`}>
            {routes.map((route: Route) => {
              if (route.isHeaderElement) {
                return (
                  <li className='navlink' key={route.title}>
                    <Link to={route.path} className='link'>
                      {route.title}
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
