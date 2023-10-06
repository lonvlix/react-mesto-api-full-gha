import headerLogo from '../images/logo.svg';
import { Link, Routes, Route } from "react-router-dom";
import React from "react";

const Header = ({ userEmail, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    setIsMenuOpen(false);
    onSignOut();
  };

    return (

      <header className="header">
        <div className="header__container">
        <img className="header__logo" src={headerLogo} alt="логотип Место" />

        <div
        className={`header__menu ${isMenuOpen ? "header__menu_opened" : ""}`}
      >
        <span className="header__mail">{userEmail}</span>
        <button className="header__sign-out" onClick={handleSignOut}>
          Выйти
        </button>
        </div>
        
        
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <button
                  className={`header__button ${
                    isMenuOpen ? "header__button_opened" : ""
                  }`}
                  onClick={() => handleToggleMenu()}
                ></button>
                <nav className="header__nav">
                  <span className="header__mail">{userEmail}</span>
                  <button
                    className="header__sign-out"
                    onClick={() => onSignOut()}
                  >
                    Выйти
                  </button>
                </nav>
              </>
            }
          />
        </Routes>

      </div>
     
      </header>

    );
  }

  export default Header;