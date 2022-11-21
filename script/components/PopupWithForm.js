import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupId, submitForm) {
    super(popupId);
    this._form = this._popup.querySelector('.pop-up__form');
    this._submitForm = submitForm;
    this._inputs = this._popup.querySelectorAll('.pop-up__input');
  }
  
  _getInputValues() {
    const nameInput = this._inputs[0].value;
    const anotherInput = this._inputs[1].value;
    return [nameInput, anotherInput];
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      const inputList = this._getInputValues();
      this._submitForm(inputList);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}