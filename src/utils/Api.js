class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  createCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then((res) => this._checkResponse(res));
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  editProfile(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then((res) => this._checkResponse(res));
  }

  toggleLike(cardId, isDelete) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isDelete ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  editAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar["avatar"],
      }),
    }).then(this._checkResponse);
  }
}

export default new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-35",
  headers: {
    Authorization: "a4d309a8-d7ef-4235-aee4-eee535ca4905",
    "Content-Type": "application/json",
  },
});
