export class Card {
  constructor(data, cardSelectors, handleOpenPopUp) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelectors = cardSelectors;
    this._handleOpenPopUp = handleOpenPopUp;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelectors.template).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _like() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _delete() {
    this._element.remove();
    this._element = null;
  }

  _open() {
    this._handleOpenPopUp(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector(this._cardSelectors.deleteButton).addEventListener('click', () => {
      this._delete();
    });
    this._element.querySelector(this._cardSelectors.image).addEventListener('click', () => {
      this._open();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardSelectors.image);
    this._likeButton = this._element.querySelector(this._cardSelectors.likeButton);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(this._cardSelectors.name).textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}