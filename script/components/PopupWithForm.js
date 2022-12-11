import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupId, submitForm, userId) {
    super(popupId);
    this._form = this._popup.querySelector('.pop-up__form');
    this._submitForm = submitForm;
    this._inputs = this._popup.querySelectorAll('.pop-up__input');
    this._userId = userId;
    this._submitButton = this._popup.querySelector('.pop-up__submit-button');
  }
  
  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListener() {
    super.setEventListener();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.append('...');
      this._submitForm(this._getInputValues(), this._submitButton, initialText);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}