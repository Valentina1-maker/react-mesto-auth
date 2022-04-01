import React, { useEffect, useState } from "react";
//import Api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const userInfo = React.useContext(CurrentUserContext);

  return (
    <main className="content root__content">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${userInfo.avatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__title">{userInfo.name}</h1>
          <button
            type="button"
            onClick={onEditProfile}
            className="profile__edit-button"
          ></button>
          <p className="profile__description">{userInfo.about}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__button"
        ></button>
      </section>
      <section className="places">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
