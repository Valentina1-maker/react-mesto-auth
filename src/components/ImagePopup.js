import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup root__popup root__popup_type_image  ${
        card.isOpened ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content popup__content_image">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <figure>
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__image-description">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
export default ImagePopup;
