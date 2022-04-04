import React from "react";

function InfoTooltip({ isOpen, onClose, infoPic, infoText }) {
  return (
    <div
      className={`popup root__popup root__popup_type_info  ${
        isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content popup__content_info">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img className="popup__result-img" src={infoPic} />
        <h2 className="popup__result-text">{infoText}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
