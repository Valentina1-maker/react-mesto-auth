import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <input
        type="url"
        id="link-avatar"
        placeholder="Ссылка на картинку"
        name="avatar"
        className="popup__input popup__input_type_link"
        defaultValue={""}
        ref={avatarRef}
        required
      />

      <span className="popup__error link-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
