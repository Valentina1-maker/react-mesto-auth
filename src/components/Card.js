import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUserId = useContext(CurrentUserContext)._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUserId;
  const isLiked = card.likes.some((i) => i._id === currentUserId);

  const cardDeleteButtonClassName = `place__delete-btn ${
    isOwn ? "" : "place__delete-btn_none"
  }`;

  const cardLikeButtonClassName = `place__like ${
    isLiked ? "place__like_active" : ""
  }`;

  return (
    <div className="place">
      <img
        src={card.link}
        className="place__img"
        onClick={handleClick}
        alt={card.name}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="place__text">
        <h3 className="place__title">{card.name}</h3>
        <div className="place__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
