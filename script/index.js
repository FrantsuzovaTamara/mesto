// Import

import { initialCards } from './cards.js'
import { 
  editButton, 
  addButton, 
  profileName, 
  profileAbout, 
  editPopUp, 
  editForm, 
  profileNameInput, 
  aboutInput, 
  addPopUp, 
  addForm, 
  pictureNameInput, 
  linkInput, 
  openCardPopUp, 
  fullImage, 
  textUnderImage,  
  cardSelectors, 
  formSelectors, 
  cardsSection 
} from './constants.js'
import { Card } from "./card.js";
import { FormValidator, hideErrorMessages } from "./formvalidator.js";

// Add cards

function handleOpenPopup(link, name) {
  fullImage.src = link;
  fullImage.alt = name;
  textUnderImage.textContent = name;
  showPopUp(openCardPopUp);
}

initialCards.forEach((item) => {
  const card = new Card(item, cardSelectors, handleOpenPopup);
  addCard(card)
})

function addCard(card) {
  const cardElement = createCard(card);
  cardsSection.prepend(cardElement);
}

function createCard(card) {
  return card.generateCard();
}

// Validation

Array.from(document.querySelectorAll('.pop-up__form')).forEach((form) => {
    const formElement = new FormValidator(form, formSelectors);
    formElement.enableValidation();
});


function hideInputError(popup) {
  const form = popup.querySelector('.pop-up__form');
  const formElement = new hideErrorMessages(form, formSelectors);
  formElement.enableValidation();
}

//Open pop-up

function showPopUp(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener('keydown', closeByEscape);
}

function openEditPopUp() {
  showPopUp(editPopUp);
  hideInputError(editPopUp);
  profileNameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

editButton.addEventListener("click", openEditPopUp);
addButton.addEventListener("click", () => {
  showPopUp(addPopUp);
  addPopUp.querySelector('.pop-up__form').reset();
  hideInputError(addPopUp);
});

//Close pop-up

function closePopUp(popup) {
  popup.classList.remove("pop-up_opened");
  popup.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector('.pop-up_opened');
    closePopUp(openedPopUp);
  }
}

const popups = document.querySelectorAll('.pop-up')

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('pop-up_opened') || evt.target.classList.contains('pop-up__close-button')) {
      closePopUp(popup);
    }
  })
})

//Submit form

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp(editPopUp);
}

function addPicture(evt) {
  evt.preventDefault();
  const card = new Card({
    name: pictureNameInput.value, 
    link: linkInput.value
  }, cardSelectors, handleOpenPopup)
  addCard(card);
  closePopUp(addPopUp);
}

editForm.addEventListener('submit', editProfile);
addForm.addEventListener('submit', addPicture);
