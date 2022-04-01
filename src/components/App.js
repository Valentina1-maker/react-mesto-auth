import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpened: false });
  const [currentUser, setCurrentUser] = useState({ name: "Кошечка" });
  const [cards, setUserCards] = useState([]);

  useEffect(() => {
    Api.getInitialCards()
      .then((res) => {
        setUserCards(res);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setUserCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(card) {
    Api.removeCard(card._id)
      .then(() => {
        setUserCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    Api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardClick({ link, name, isOpened }) {
    setSelectedCard({
      link,
      name,
      isOpened: !isOpened,
    });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpened: false });
  };

  function handleUpdateUser(userData) {
    Api.editProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateAvatar(userAvatar) {
    Api.editAvatar(userAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(newCard) {
    Api.createCard(newCard)
      .then((newCard) => {
        setUserCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
