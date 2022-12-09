import { Popup } from "./Popup.js";

export class PopupAgreement extends Popup {
  constructor(popupId) {
    super(popupId);
    this._deleteButton = this._popup.querySelector('.pop-up__agree-button');
  }

  open(deleteCardOnPage, card, cardId, deleteCardInApi) {
    super.open();
    this._deleteCardOnPage = deleteCardOnPage;
    this._deleteCardInApi = deleteCardInApi;
    this._cardId = cardId
    this._card = card;
  }

  setEventListener() {
    super.setEventListener();
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardOnPage(this._card, this._cardId, this._deleteCardInApi);
      this.close();
    })
  }
}