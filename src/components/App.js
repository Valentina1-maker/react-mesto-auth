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
import { Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register"
import { Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as Auth from './Auth'
import InfoTooltip from "./InfoTooltip"
import doneImage from "../images/done-image.svg"
import nopeImage from "../images/nope-image.svg"


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpened: false });
  const [currentUser, setCurrentUser] = useState({ name: "Кошечка" });
  const [cards, setUserCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false)
  const [infoPic, setInfoPic] = useState(null)
  const [infoText, setInfoText] = useState(null)
  
  
  const history = useHistory();

  

  const tokenCheck = () => {
    const token = localStorage.getItem('token') //получаем сохраненные данные
    if (token) {
      Auth.getToken(token)
      .then(({data:{email}}) => {
        if (email) {
          setUserEmail(email)
          setLoggedIn(true)
          history.push('/')
        }
      })
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [])

  const handleLogin = (email, password) => {
    Auth.login(email, password)
      .then(res => {
        if (res.token) {
          console.log(res.token)
          localStorage.setItem('token', res.token)
          setUserEmail(email)
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch(err => console.log(err))
  }

  const handleRegister = (email, password) => {
    Auth.register(email, password)
    .then((res) => {
      if (res.data.email) {
        setInfoText('Вы успешно зарегистрировались!')
        setInfoPic(doneImage)
        handleInfoPopup()
        setTimeout(() => {
          handleLogin(email, password);
        }, 100)}
      })
    .catch(err => {console.log(err)
    setInfoText('Что-то пошло не так! Попробуйте ещё раз.')
    setInfoPic(nopeImage)
    handleInfoPopup()})
  }

  const onSignOut = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    setUserEmail('')
  }

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

  const handleInfoPopup = () => {
    setIsInfoPopupOpen(!isInfoPopupOpen)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpened: false });
    setIsInfoPopupOpen(false)
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
        <Switch>
          <ProtectedRoute exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onSignOut={onSignOut}
            mailHandler={userEmail}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
             />

          <Route path="/sign-up">
            <Register handleRegister={handleRegister}/>
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin}/>
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>

        </Switch>

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

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoPopupOpen}
          infoPic={infoPic}
          infoText={infoText}
          />
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
