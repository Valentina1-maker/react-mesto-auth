import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddCardPopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmitCard(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmitCard}
    >
      <input
        type="text"
        id="card-input"
        placeholder="Название"
        className="popup__input popup__input_type_name-card"
        name="cardname"
        minLength="2"
        maxLength="30"
        onChange={handleNameChange}
        value={name}
        required
      />

      <span className="popup__error card-input-error"></span>

      <input
        type="url"
        id="link-input"
        placeholder="Ссылка на картинку"
        name="linkcard"
        className="popup__input popup__input_type_link"
        onChange={handleLinkChange}
        value={link}
        required
      />

      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddCardPopup;
