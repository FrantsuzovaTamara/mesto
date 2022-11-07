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
import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js"

// Add cards

function handleOpenPopup(link, name) {
  fullImage.src = link;
  fullImage.alt = name;
  textUnderImage.textContent = name;
  showPopUp(openCardPopUp);
}

initialCards.forEach((item) => {
  const card = createCard(item);
  addCard(card);
})

function addCard(card) {
  cardsSection.prepend(card);
}

function createCard(item) {
  const card = new Card(item, cardSelectors, handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

// Validation

const editFormValidation = new FormValidator(editForm, formSelectors);
const addFormValidation = new FormValidator(addForm, formSelectors);
editFormValidation.enableValidation();
addFormValidation.enableValidation();

//Open pop-up

function showPopUp(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener('keydown', closeByEscape);
}

function openEditPopUp() {
  showPopUp(editPopUp);
  profileNameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  editFormValidation.hideErrorMesseges();
}

editButton.addEventListener("click", openEditPopUp);
addButton.addEventListener("click", () => {
  showPopUp(addPopUp);
  addForm.reset();
  addFormValidation.hideErrorMesseges();
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
  const card = createCard({
    name: pictureNameInput.value, 
    link: linkInput.value
  });
  addCard(card);
  closePopUp(addPopUp);
}

editForm.addEventListener('submit', editProfile);
addForm.addEventListener('submit', addPicture);
