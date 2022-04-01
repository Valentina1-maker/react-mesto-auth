import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const userInfo = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  useEffect(() => {
    setName(userInfo.name);
    setAbout(userInfo.about);
  }, [userInfo, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        placeholder="Имя"
        className="popup__input popup__input_type_name"
        name="username"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        value={name || ""}
        required
      />

      <span className="popup__error name-input-error"></span>

      <input
        type="text"
        id="job-input"
        placeholder="О себе"
        name="userjob"
        className="popup__input popup__input_type_description"
        minLength="2"
        maxLength="200"
        onChange={handleAboutChange}
        value={about || ""}
        required
      />

      <span className="popup__error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
