import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';

import './header.scss';


const Header = ({navigate}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__item">
          <NavLink to="/" className="header__logo">
            GAME
          </NavLink>
        </div>
        <div className="header__item header__item__search">
          <SearchBar navigate={navigate}/>
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
                  <li className="dropdown__li">
                    <NavLink to="/games-by-rating">Games by rating</NavLink>
                  </li>
                  <li className="dropdown__li">
                    <NavLink to="/games-by-metacritic">Games by metacritic</NavLink>
                  </li>
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
              <li className="header__li">
                <NavLink to="/genres" 
                         className={({ isActive }) =>
                         isActive ? "header__link--active" : "header__link" 
                         }
                         >Genres</NavLink>
              </li>
              <li className="header__li">
                <NavLink to="/platforms" 
                         className={({ isActive }) =>
                         isActive ? "header__link--active" : "header__link" 
                         }
                         >Platforms</NavLink>
              </li>
              <li className="header__li">
                <NavLink to="/tags" 
                         className={({ isActive }) =>
                         isActive ? "header__link--active" : "header__link" 
                         }
                         >Tags</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;