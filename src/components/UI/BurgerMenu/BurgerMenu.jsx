import { NavLink } from 'react-router-dom';

import './burgerMenu.scss';

const BurgerMenu = ({isOpen, toggleMenu}) => {
  return (
    <nav className="burger-menu">
      <button onClick={toggleMenu} className="burger-menu__button">
        <span className="burger-menu__button-bar" />
        <span className="burger-menu__button-bar" />
        <span className="burger-menu__button-bar" />
      </button>
      {isOpen && (
        <div className="burger-menu__container">
          <ul className="burger-menu__list">
            <div className="burger-menu__list-col">
              <div className="burger-menu__list-title">Menu</div>
              <li className="burger-menu__item">
                <NavLink to="/" 
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Home</NavLink>
              </li>
              <li className="burger-menu__item">
                <NavLink to="/games" 
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Popular Games</NavLink>
              </li>
              <li className="burger-menu__item">
                <NavLink to="/games-by-rating" 
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Games by rating</NavLink>
              </li>
              <li className="burger-menu__item">
                <NavLink to="/games-by-metacritic" 
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Games by metacritic</NavLink>
              </li>
              <li className="burger-menu__item">
                <NavLink to="/developers" 
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Developers</NavLink>
              </li>
              <li className="burger-menu__item">
                <NavLink to="/publishers" 
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Publishers</NavLink>
              </li>
              <li className="burger-menu__item">
                <NavLink to="/genres" 
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Genres</NavLink>
              </li>
              <li className="burger-menu__item">
                <NavLink to="/platforms"  
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Platforms</NavLink>
              </li>
              <li className="burger-menu__item">
                <NavLink to="/tags" 
                        className={({ isActive }) =>
                        isActive ? "burger-menu__link--active" : "burger-menu__link" 
                        }
                        onClick={toggleMenu}
                        >Tags</NavLink>
              </li>
            </div>
          </ul>
          <div className="burger-menu__close-wrapper" onClick={toggleMenu} role="button" tabIndex={0}>
            <div className="burger-menu__close">
              <span className="burger-menu__close-bar" />
              <span className="burger-menu__close-bar" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default BurgerMenu;