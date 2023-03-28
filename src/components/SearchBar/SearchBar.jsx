import { useEffect, useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../../context/SearchContext';

import './searchBar.scss'

const SearchBar = () => {
  const { searchFormData, setSearchFormData } = useContext(SearchContext);
  const [showClose, setShowClose] = useState(false);
  const inputRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.altKey && event.keyCode === 13) { // Alt + Enter
        inputRef.current.focus();
        event.preventDefault();
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    if (event.target.value !== '') {
      setShowClose(true);
    } else {
      setShowClose(false);
    }
    setSearchFormData((prevState) => ({
      ...prevState,
      query: event.target.value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate(`/search`);
  };

  const handleClearInput = () => {
    setSearchFormData((prevState) => ({
      ...prevState,
      query: '',
    }));
    setShowClose(false);
  };


  return (
    <form className="search__form" onSubmit={handleFormSubmit}>
      <div className="search-input__area">
        <input
          ref={inputRef}
          value={searchFormData.query}
          type="text"
          role="searchbox"
          placeholder={width < 576 ? `Search` : `Search more than 500 000 games`}
          className="search-input"
          onChange={handleInputChange}
        />
        <div className={showClose ? `search-hotkeys__wrapper hotkeys-hidden` : `search-hotkeys__wrapper`}>
          <div className="search-hotkey">alt</div>
          <span>+</span>
          <div className="search-hotkey">enter</div>
        </div>
        <button className={showClose ? 'search__close-button' : `search__close-button close-hidden`}
                onClick={handleClearInput}
                type="reset">
          <span className="search__close-button__icon"></span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;