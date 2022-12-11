import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupId, deleteCardInApi) {
    super(popupId);
    this._deleteCardInApi = deleteCardInApi;
    this._deleteButton = this._popup.querySelector('.pop-up__agree-button');
  }

  open(deleteCardOnPage, card, cardId) {
    super.open();
    this._deleteCardOnPage = deleteCardOnPage;
    this._cardId = cardId
    this._card = card;
  }

  setEventListener() {
    super.setEventListener();
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardInApi(this._cardId, this._card, this._deleteCardOnPage)
    })
  }
}