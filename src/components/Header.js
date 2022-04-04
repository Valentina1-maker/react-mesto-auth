import React from "react";
import logo from "../images/header-logo.svg";

function Header({ mailHandler, buttonText, linkHandler, buttonClass }) {
  return (
    <header className="header root__header">
      <img
        src={logo}
        alt="Здесь должен быть логотип"
        className="header__logo"
      />
      <div className="header__menu">
        <p className="header__mail">{mailHandler}</p>
        <button
          className={`header__button ${buttonClass}`}
          onClick={linkHandler}
        >
          {buttonText}
        </button>
      </div>
    </header>
  );
}

export default Header;
