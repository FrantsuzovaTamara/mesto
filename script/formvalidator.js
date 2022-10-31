import { formSelectors } from './constants.js'

class FormValidator {
  constructor(fieldSet, formSelectors) {
    this._fieldSet = fieldSet;
    this._formSelectors = formSelectors;
    this._button = fieldSet.querySelector(this._formSelectors.submitButtonSelector);
    this._inputs = fieldSet.querySelectorAll(this._formSelectors.inputSelector);
  }

  _showInputError(inputElement, errorMessage) {
    this._error = this._fieldSet.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formSelectors.inputErrorClass);
    this._error.textContent = errorMessage;
    this._error.classList.add(this._formSelectors.errorClass);
  }

  hideInputError(inputElement) {
    this._error = this._fieldSet.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formSelectors.inputErrorClass);
    this._error.classList.remove(this._formSelectors.errorClass);
    this._error.textContent = '';
  }

  _checkInputValidity(input) {
    !input.validity.valid
    ? this._showInputError(input, input.validationMessage)
    : this.hideInputError(input);
  }

  _hasInvalidInput() {
    const inputList = Array.from(this._inputs);
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._formSelectors.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._formSelectors.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

Array.from(document.querySelectorAll('.pop-up__form')).forEach((form) => {
  Array.from(form.querySelectorAll('.pop-up__set')).forEach((fieldSet) => {
    const formElement = new FormValidator(fieldSet, formSelectors);
    formElement.enableValidation();
  });
});

export function hideInputErrorAfterReset(form, inputList) {
  const formElement = new FormValidator(form, formSelectors);
  formElement.toggleButtonState();
  inputList.forEach((input) => {
    formElement.hideInputError(input);
  })
}