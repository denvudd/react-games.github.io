import { useState } from 'react';

import { NavLink } from 'react-router-dom';

import './header.scss';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  console.log(isDropdownOpen);
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__item">
          <NavLink to="/" className="header__item-link">
            <div className="header__logo">GAME</div>
          </NavLink>
        </div>
        <div className="header__item">
          <nav className="header__nav">
            <ul className="header__ul">
              <li className="header__li">
                <NavLink to="/" 
                         className={({ isActive }) =>
                         isActive ? "header__link--active" : "header__link" 
                         }
                         >Home</NavLink>
              </li>
              <li className="header__li dropdown-trigger" 
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
              ><NavLink to="/games" 
                        className={({ isActive }) =>
                        isActive ? "header__link--active" : "header__link" 
                        }
                        >Games</NavLink>

              {isDropdownOpen && (
                <ul className="dropdown">
                  <li className="dropdown__li"><a href="#" className="dropdown__link">Games by rating</a></li>
                  <li className="dropdown__li"><a href="#" className="dropdown__link">Games by genre</a></li>
                  <li className="dropdown__li"><a href="#" className="dropdown__link">Games by platform</a></li>               
                </ul>
              )}
                
              </li>
              <li className="header__li">
                <NavLink to="/developers" 
                         className={({ isActive }) =>
                         isActive ? "header__link--active" : "header__link" 
                         }
                         >Developers</NavLink>
              </li>
              <li className="header__li">
                <NavLink to="/publishers" 
                         className={({ isActive }) =>
                         isActive ? "header__link--active" : "header__link" 
                         }
                         >Publishers</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;