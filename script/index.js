// Import

import { editButton, addButton, profileName, profileAbout, editPopUp, profileNameInput, aboutInput, addPopUp, pictureNameInput, linkInput, cardSelectors } from './constants.js'
import { Card, addCard } from "./card.js";
import { hideInputErrorAfterReset } from "./formvalidator.js";

//Open pop-up

export function showPopUp(popup) {
  popup.classList.add("pop-up_opened");
}

function openEditPopUp() {
  openPopUp(editPopUp);
  profileNameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function openPopUp(popup) {
  showPopUp(popup);
  document.addEventListener('keydown', closeByEscape);
  resetForm(popup);
}

editButton.addEventListener("click", openEditPopUp);
addButton.addEventListener("click", () => openPopUp(addPopUp));

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

function determineForm(evt) {
  evt.preventDefault();
  if (evt.target.name === 'changeProfileInfo') {
    editProfile();
  } else {
    addPicture();
  }
}

function editProfile() {
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopUp(editPopUp);
}

function addPicture() {
  const card = new Card({
    name: pictureNameInput.value, 
    link: linkInput.value
  }, cardSelectors)
  addCard(card);
  closePopUp(addPopUp);
}

const formList = document.querySelectorAll('.pop-up__form');

formList.forEach((form) => {
  form.addEventListener('submit', determineForm);
})

//Reset form

function resetForm(popup) {
  const form = popup.querySelector('.pop-up__form');
  form.reset();
  hideInputErrorAfterReset(form.querySelector('.pop-up__set'), form.querySelectorAll('.pop-up__input'));
}