const profileInfo = document.querySelector(".profile");

const editButton = profileInfo.querySelector(".profile__edit-button");
const addButton = profileInfo.querySelector(".profile__add-button");

// Pop Up constants

const editPopUp = document.querySelector("#pop-up_edit");
const editForm = editPopUp.querySelector(".pop-up__form");

const addPopUp = document.querySelector("#pop-up_add");
const addForm = addPopUp.querySelector(".pop-up__form");

const openCardPopUp = document.querySelector("#pop-up_open");

// Selectors

const cardSelectors = {
  image: '.card__image',
  name: '.card__place-name',
  likeButton: '.card__like-button',
  deleteButton: '.card__delete-button',
  template: '#card-template'
}

const formSelectors = {
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__submit-button',
  inactiveButtonClass: 'pop-up__submit-button_inactive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error_active'
}

export { 
  editButton, 
  addButton, 
  editForm, 
  addPopUp, 
  addForm,
  cardSelectors, 
  formSelectors
};