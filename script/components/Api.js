export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers['Content-Type'];
  }

  getUserInfo(setUserInfoFromApi) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      setUserInfoFromApi({ name: data.name, about: data.about, avatar: data.avatar, userId: data._id });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getCard(renderApiArray) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      const initialCards = [];
      data.forEach(item => initialCards.push({ name: item.name, link: item.link, id: item._id, numberOfLikes: item.likes, ownerId: item.owner._id }));
      renderApiArray(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  editProfileInfo({ name, about }, renderLoading, popup) {
    renderLoading(true, popup);
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popup)
    });
  }

  editAvatar({ avatar }, renderLoading, popup) {
    renderLoading(true, popup);
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popup)
    });
  }

  addCardInApi(renderApiArray, { name, link }, renderLoading, popup) {
    renderLoading(true, popup);
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      const initialCards = [{ name: data.name, link: data.link, id: data._id, numberOfLikes: data.likes, ownerId: data.owner._id }];
      renderApiArray(initialCards);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popup)
    });
  }

  deleteCardInApi(cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  likeCard(cardId, numberOfLikes) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      numberOfLikes.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  removeLike(cardId, numberOfLikes) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      numberOfLikes.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}