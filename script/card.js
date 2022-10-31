import { cardsSection, openCardPopUp, fullImage, textUnderImage, cardSelectors } from './constants.js';
import { initialCards } from './cards.js';
import { showPopUp } from './index.js';

class Card {
  constructor(data, cardSelectors) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelectors = cardSelectors;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelectors.template).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _like() {
    this._element.querySelector(this._cardSelectors.likeButton).classList.toggle("card__like-button_active");
  }

  _delete() {
    this._element.remove();
  }

  _open() {
    fullImage.src = this._link;
    fullImage.alt = this._name;
    textUnderImage.textContent = this._name;
    showPopUp(openCardPopUp);
  }

  _setEventListeners() {
    this._element.querySelector(this._cardSelectors.likeButton).addEventListener('click', () => {
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
    this._element.querySelector(this._cardSelectors.image).src = this._link;
    this._element.querySelector(this._cardSelectors.image).alt = this._name;
    this._element.querySelector(this._cardSelectors.name).textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, cardSelectors);
  addCard(card)
})

function addCard(card) {
  const cardElement = card.generateCard();
  cardsSection.prepend(cardElement);
}

export { Card, addCard };