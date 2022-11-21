import "../pages/index.css";
import { initialCards } from '../script/utils/cards.js';
import { 
  editButton, 
  addButton,
  editForm,
  addForm,  
  cardSelectors, 
  formSelectors
} from '../script/utils/constants.js';

import { Card } from "../script/components/Сard.js";
import { Section } from "../script/components/Section.js";
import { PopupWithForm } from "../script/components/PopUpWithForm.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import { UserInfo } from "../script/components/UserInfo.js";
import { FormValidator } from "../script/components/FormValidator.js"

// Add cards

const cardsList = new Section({ data: initialCards, renderer: item => {
  cardsList.setItem(createCard(item));
} }, '.cards');

cardsList.renderItems();

function handleOpenPopup(name, link) {
  const popupOpenCard = new PopupWithImage('#pop-up_open');
  popupOpenCard.open(name, link);
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

//Pop-up

const popupOpenEditInfo = new PopupWithForm('#pop-up_edit', editProfile);
popupOpenEditInfo.setEventListener();
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__about'});
const popupAddCard = new PopupWithForm('#pop-up_add', addCard);
popupAddCard.setEventListener();

editButton.addEventListener("click", () => {
  userInfo.getUserInfo(editForm.querySelectorAll('.pop-up__input'));
  popupOpenEditInfo.open();
  editFormValidation.hideErrorMesseges();
});

addButton.addEventListener("click", () => {
  popupAddCard.open();
  addFormValidation.hideErrorMesseges();
});

//Submit form

function editProfile(inputList) {
  const inputs = { name: inputList[0], about: inputList[1] };
  userInfo.setUserInfo(inputs);
  popupOpenEditInfo.close();
}

function addCard(inputList) {
  const inputs = { name: inputList[0], link: inputList[1] };
  const card = createCard(inputs);
  const newCard = new Section({ data: card }, '.cards');
  newCard.setItem(card);
  popupAddCard.close();
}