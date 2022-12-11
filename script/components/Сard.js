export class Card {
  constructor(data, cardSelectors, handleOpenPopUp, openPopupWithConfirmation, userId, likeCard, removeLike) {
    this._link = data.link;
    this._name = data.name;
    this._cardId = data.id;
    this._numberOfLikes = data.numberOfLikes;
    this._ownerId = data.ownerId;
    this._myId = userId;
    this._cardSelectors = cardSelectors;
    this._handleOpenPopUp = handleOpenPopUp;
    this._openPopupWithConfirmation = openPopupWithConfirmation;
    this._likeCard = likeCard;
    this._removeLike = removeLike;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelectors.template).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  like(likeButton) {
    likeButton.classList.toggle("card__like-button_active");
  }

  _open() {
    this._handleOpenPopUp(this._name, this._link);
  }

  delete(card) {
    card.remove();
    card = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains("card__like-button_active")) {
        this._removeLike(this._cardId, this._placeForNumberOfLikes, this._likeButton, this.like);
      } else {
        this._likeCard(this._cardId, this._placeForNumberOfLikes, this._likeButton, this.like);
      };
    });
    if (this._myId === this._ownerId) {
      this._element.querySelector(this._cardSelectors.deleteButton).addEventListener('click', () => {
        this._openPopupWithConfirmation(this.delete, this._element, this._cardId);
      });
    }
    this._element.querySelector(this._cardSelectors.image).addEventListener('click', () => {
      this._open();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    if (this._myId != this._ownerId) {
      this._element.querySelector(this._cardSelectors.deleteButton).remove();
    }
    this._cardImage = this._element.querySelector(this._cardSelectors.image);
    this._likeButton = this._element.querySelector(this._cardSelectors.likeButton);
    if (this._numberOfLikes.some(like => {return like._id === this._myId})) {
      this._likeButton.classList.add("card__like-button_active");
    }
    this._placeForNumberOfLikes = this._element.querySelector(this._cardSelectors.numberOfLikes);
    this._placeForNumberOfLikes.textContent = this._numberOfLikes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(this._cardSelectors.name).textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}