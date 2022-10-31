// Main constants

const profileInfo = document.querySelector(".profile");

const editButton = profileInfo.querySelector(".profile__edit-button");
const addButton = profileInfo.querySelector(".profile__add-button");
const profileName = profileInfo.querySelector(".profile__name");
const profileAbout = profileInfo.querySelector(".profile__about");

// Pop Up constants

const editPopUp = document.querySelector("#pop-up_edit");

const profileNameInput = editPopUp.querySelector(".pop-up__input_change_name");
const aboutInput = editPopUp.querySelector(".pop-up__input_change_about");

const addPopUp = document.querySelector("#pop-up_add");

const pictureNameInput = addPopUp.querySelector(".pop-up__input_add_name");
const linkInput = addPopUp.querySelector(".pop-up__input_add_link");

const openCardPopUp = document.querySelector("#pop-up_open");

const fullImage = openCardPopUp.querySelector(".pop-up__image");
const textUnderImage = openCardPopUp.querySelector(".pop-up__place-name");

const cardsSection = document.querySelector(".cards");

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
  profileName, 
  profileAbout, 
  editPopUp, 
  profileNameInput, 
  aboutInput, 
  addPopUp, 
  pictureNameInput, 
  linkInput, 
  openCardPopUp, 
  fullImage, 
  textUnderImage,  
  cardSelectors, 
  formSelectors, 
  cardsSection
};